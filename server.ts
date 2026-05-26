/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { LeadSubmission } from "./src/types";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "20mb" }));

// In-memory data store for leads, representing real database persistence in the preview container
let leadsStore: LeadSubmission[] = [
  {
    id: "lead-01",
    fullName: "Nguyễn Văn Hùng",
    phoneNumber: "0901234567",
    bizType: "Shopee Seller",
    problem: "Nhận công văn truy thu thuế Shopee 3 năm qua trị giá dòng tiền nhận về 4.5 tỷ đồng. Cần hỗ trợ bóc tách chi phí và giải trình gấp với cán bộ chi cục Thuế Quận Gò Vấp.",
    files: [{ name: "so_lieu_doi_soat_shopee_2024.xlsx", size: "1.2MB", type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }],
    status: "NEW",
    createdAt: "2026-05-24T08:30:00Z",
    agentNotes: "Chưa nộp đăng ký hộ kinh doanh cá thể. Cần định hướng kê khai theo Thông tư 88 từ ngày 01/01/2026, loại bỏ phương thuế khoán đã bãi bỏ."
  },
  {
    id: "lead-02",
    fullName: "Trần Thị Lan",
    phoneNumber: "0912987654",
    bizType: "Cho thuê mặt bằng",
    problem: "Cho công ty nước ngoài thuê nhà làm văn phòng giá 45 triệu/tháng. Cần thủ tục đăng ký nộp thuế cho thuê tài sản và mua hóa đơn điện tử lẻ giao cho khách quý này.",
    files: [{ name: "hop_dong_thue_nha_lan.pdf", size: "4.5MB", type: "application/pdf" }],
    status: "CONTACTED",
    createdAt: "2026-05-23T14:15:00Z",
    agentNotes: "Đã rà soát hợp đồng. Công ty đồng ý nộp thay chi phí thuế, cần hướng dẫn lập tờ khai 01/TTS lấy mã định danh đóng tiền."
  },
  {
    id: "lead-03",
    fullName: "Công ty Vận tải An Phát",
    phoneNumber: "0988665544",
    bizType: "Doanh nghiệp nhỏ",
    problem: "Cần tìm công ty đại lý thuế rà soát hóa đơn đầu vào - hóa đơn bất hợp pháp của bên buôn bán bỏ trốn để điều chỉnh kịp thời trước thời gian thanh tra năm nay.",
    files: [],
    status: "RESOLVED",
    createdAt: "2026-05-20T09:00:00Z",
    agentNotes: "Đã hoàn thành làm việc với kiểm tra viên thuế, nộp bổ sung điều chỉnh giảm thuế GTGT đầu vào được khấu trừ, nộp phạt chậm bổ sung an toàn."
  }
];

// 1. API - Health check
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// 2. API - Get active leads (for admin dashboard)
app.get("/api/leads", (req: Request, res: Response) => {
  res.json({ success: true, leads: leadsStore });
});

// 3. API - Submit a new lead
app.post("/api/leads", (req: Request, res: Response) => {
  try {
    const { fullName, phoneNumber, bizType, problem, files } = req.body;
    if (!fullName || !phoneNumber) {
       res.status(400).json({ success: false, message: "Họ tên và số điện thoại là bắt buộc!" });
       return;
    }

    const newLead: LeadSubmission = {
      id: "lead-" + Date.now(),
      fullName,
      phoneNumber,
      bizType: bizType || "Chưa xác định",
      problem: problem || "Cần tư vấn dịch vụ thuế thực chiến",
      files: files || [],
      status: "NEW",
      createdAt: new Date().toISOString(),
      agentNotes: ""
    };

    leadsStore.unshift(newLead);
    res.status(201).json({ success: true, lead: newLead, message: "Yêu cầu của bạn đã được gửi thành công!" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. API - Update a lead (status, notes)
app.put("/api/leads/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, agentNotes } = req.body;
  const leadIndex = leadsStore.findIndex(l => l.id === id);

  if (leadIndex === -1) {
     res.status(404).json({ success: false, message: "Không tìm thấy hồ sơ khách hàng!" });
     return;
  }

  if (status) leadsStore[leadIndex].status = status;
  if (agentNotes !== undefined) leadsStore[leadIndex].agentNotes = agentNotes;

  res.json({ success: true, lead: leadsStore[leadIndex], message: "Cập nhật hồ sơ thành công!" });
});

// 5. API - AI chat with Gemini (Smart assistant)
// Lazy init the GenAI client to prevent startup failure if no key is present.
let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("CẢNH BÁO: Không tìm thấy GEMINI_API_KEY trong biến môi trường.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });
  }
  return aiClient;
}

app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { prompt, history } = req.body;
    if (!prompt) {
       res.status(400).json({ success: false, message: "Vui lòng nhập câu hỏi!" });
       return;
    }

    const api = getAiClient();
    if (!api) {
      // Fallback response with helpful answers in case of missing key to avoid crash and provide seamless UX
       res.json({
        success: true,
        text: `Chào bạn! Tôi là Trợ lý thuế AI của chi nhánh Đại lý Thuế Thành Phố. 

Hiện tại hệ thống AI đang vận hành ở chế độ offline cục bộ (Chờ setup API). Tuy nhiên, tôi có thể cung cấp ngay thông tin theo luật Việt Nam cập nhật mới từ 1/1/2026:
1. **Dịch vụ Kê Khai Thuế theo Thông tư 88**: Vẫn hoàn toàn CÒN HIỆU LỰC và là quy định cốt lõi bắt buộc đối với hộ kinh doanh nộp thuế theo phương pháp kê khai (mở đầy đủ 5 sổ sách kế toán, hóa đơn điện tử).
2. **Ưu đãi thuế Sàn TMĐT**: Được chia làm 2 loại rõ rệt theo luật quản lý thuế:
   - **Có thanh toán qua Sàn (Shopee, TikTok Shop,...)**: Sàn tự thực hiện khấu trừ, kê khai và nộp thuế thay (nộp thuế dùm), chủ shop không cần tự khai thuế quý hay quyết toán cuối năm.
   - **Không thanh toán qua Sàn (bán qua Fb, Zalo, tự COD hoặc chuyển khoản ngoài)**: Chủ shop bắt buộc phải tự nộp và kê khai thuế online định kỳ hàng tháng/hàng quý.
3. **Thuế suất TMĐT**: Nếu tổng doanh thu năm trên 200 triệu đồng (ngưỡng miễn thuế mới tăng từ 100tr lên 200tr), số thuế suất là **1.5%** doanh thu gộp (1% GTGT + 0.5% TNCN).
4. **Mức phạt chậm nộp nợ**: Phạt từ 2-25 triệu đồng tùy theo thời gian quá hạn chậm nộp tờ khai (NĐ 125/2020), kèm tiền chậm nộp 0.03% mỗi ngày phát sinh.

Hãy nhập trọn vẹn yêu cầu của bạn vào form tư vấn của chúng tôi hoặc liên hệ Hotline: **0819.319.919** để Đại lý Thuế Thành Phố xử lý ngay trong ngày!`
      });
      return;
    }

    // Build standard prompt with Vietnamese context
    const serverInstruction = `Bạn là Trợ lý Thuế AI của website "Đại lý Thuế Thành Phố" (dailythuetp.com.vn) - "Trung tâm giải pháp thuế".
Nhiệm vụ của bạn là tư vấn luật thuế Việt Nam một cách ngắn gọn, súc tích, thực tế, không nói lý thuyết sáo rỗng.
Đối tượng phục vụ: Hộ kinh doanh, cá nhân bán hàng online, thương mại điện tử (Shopee, TikTok, Lazada), người cho thuê nhà/mặt bằng, freelancer và doanh nghiệp nhỏ.

Quy tắc ứng xử và tư vấn cập nhật hoàn toàn cho năm 2026 (Thông tư 40, Thông tư 88 và Nghị định 01/2021 sửa đổi):
1. **Dịch vụ Kê khai Thuế theo Thông tư 88**: Luôn luôn CÒN HIỆU LỰC, là xương sống bắt buộc cho tất cả hộ kinh doanh áp dụng phương pháp kê khai bắt buộc mở 5 hệ thống sổ sách cơ bản từ năm 2026 trở đi.
2. **Khai và Quyết toán Thuế sàn TMĐT** phân làm 2 loại chính:
   - **Có thanh toán qua Sàn** (Shopee, TikTok Shop,...): Sàn buộc thực hiện kê khai và nộp thuế thay (kiêm thu nộp thuế dùm). Chủ shop được MIỄN việc tự thực hiện khai thuế hàng tháng/quý và quyết toán thuế cuối năm.
   - **Không thanh toán qua Sàn** (Tự giao dịch, chuyển khoản lẻ, tự COD không liên kết thanh toán của hệ thống sàn): Chủ shop bắt buộc chủ động tự kê khai và quyết toán thuế theo quy định hàng tháng, hàng quý.
3. Ngưỡng doanh thu miễn thuế cho hộ kinh doanh & cá nhân kinh doanh online và người cho thuê nhà tăng từ 100tr/năm lên thành 200tr/năm từ năm 2026. Chỉ nộp thuế khi doanh thu gộp đạt trên 200tr/năm.
4. Thuế suất TMĐT (Shopee/TikTok) là 1.5% tính trên doanh thu gộp gộp (chưa trừ bất cứ phí sàn, phí ship, hay khuyến mãi nào). Thuế suất cho thuê nhà là 10% tính trên doanh thu gộp nhận về.
5. Khi tư vấn về phạt chậm nộp, chỉ ra mức phạt chính từ 2tr-25tr theo Nghị định 125/2020/NĐ-CP và tiền lãi chậm nộp 0.03%/ngày.
6. Đăng ký kinh doanh cho hộ kinh doanh đã liên thông trực tiếp đăng ký kinh doanh và đăng ký thuế thành một bước duy nhất theo Nghị định 141/2026/NĐ-CP (MIỄN lệ phí online).
7. Trả lời bằng tiếng Việt lịch sự, gãy gọn, có danh sách gạch đầu dòng rõ ràng và khuyên người dùng nên gửi hồ sơ thông qua website dailythuetp.com.vn để đại lý thuế soạn gỡ rối.`;

    // Process using chats or generateContent
    // Support simple chat format
    const response = await api.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: serverInstruction,
        temperature: 0.7,
      }
    });

    res.json({ success: true, text: response.text });
  } catch (error: any) {
    console.error("Lỗi gọi Gemini API:", error);
    res.json({
      success: true,
      text: `Chào bạn, Đại lý Thuế Thành Phố sẵn sàng lắng nghe! 

Do kết nối AI bị gián đoạn, chúng tôi xin tóm lược các thông tin thuế thực chiến cơ bản:
- Thuế Shopee/TikTok/Lazada: Có doanh thu > 100tr đóng **1.5%** tổng số tiền khách thanh toán thành công.
- Thuế cho thuê mặt bằng/nhà: Thuế suất **10%** (5% GTGT, 5% TNCN).
- Bạn đang bị rà soát tài khoản bank? Bạn cần gửi ngay yêu cầu và Số điện thoại của mình vào hộp tư vấn ở góc màn hình. Chuyên viên Thuế thực chiến của chúng tôi sẽ bấm máy tư vấn trực diện cho bạn trong 15 phút!`
    });
  }
});

// 6. Vite config integration
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    // Development server with Vite hot middleware integration
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Mounted Vite development middleware");
  } else {
    // Production serving from built files
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static build from /dist folder");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Đại lý Thuế Thành Phố] Server is running on http://localhost:${PORT}`);
  });
}

bootstrap().catch(err => {
  console.error("Lỗi khởi động máy chủ full-stack:", err);
});
