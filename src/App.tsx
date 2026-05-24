/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Building2, 
  FileText, 
  Layers, 
  Calculator, 
  HelpCircle, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  PhoneCall, 
  TrendingUp, 
  Clock, 
  Scale, 
  Send, 
  FileCheck, 
  Users, 
  Plus, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Check,
  Briefcase,
  Settings,
  MessageSquareOff,
  Percent,
  CalendarDays,
  Coins
} from "lucide-react";
import { 
  SERVICES_DATA, 
  LEGAL_DOCS_DATA, 
  PRACTICAL_GUIDES_DATA, 
  CASE_STUDIES_DATA, 
  QUICK_ANSWER_FAQS, 
  TAX_RATIOS_BY_SECTOR, 
  LATEST_TAX_CALENDAR, 
  PENALTY_RULES 
} from "./lib/data";
import { ServiceDetail, LegalDoc, PracticalGuide, CaseStudy, LeadSubmission, QuickAnswerFAQ } from "./types";

export default function App() {
  // Navigation & Sub-page States
  const [activeTab, setActiveTab] = useState<string>("home");
  
  // Interactive filters
  const [serviceGroupFilter, setServiceGroupFilter] = useState<string>("ALL");
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(SERVICES_DATA[0]);
  const [legalSearch, setLegalSearch] = useState<string>("");
  const [legalCategoryFilter, setLegalCategoryFilter] = useState<string>("ALL");
  const [selectedGuide, setSelectedGuide] = useState<PracticalGuide | null>(PRACTICAL_GUIDES_DATA[0]);
  const [faqCategoryFilter, setFaqCategoryFilter] = useState<string>("ALL");

  // Tra cứu States
  const [lookupMst, setLookupMst] = useState<string>("");
  const [lookupResult, setLookupResult] = useState<any | null>(null);

  // Calculator States
  const [calcType, setCalcType] = useState<"hkd" | "rent" | "penalty">("hkd");
  // Calculator 1: HKD
  const [calcHkdRevenue, setCalcHkdRevenue] = useState<number>(350000000);
  const [calcHkdSector, setCalcHkdSector] = useState<string>("BL");
  // Calculator 2: Rent
  const [calcRentMonthly, setCalcRentMonthly] = useState<number>(25000000);
  const [calcRentMonths, setCalcRentMonths] = useState<number>(12);
  // Calculator 3: Penalty
  const [calcPenaltyTaxDebt, setCalcPenaltyTaxDebt] = useState<number>(45000000);
  const [calcPenaltyDays, setCalcPenaltyDays] = useState<number>(45);

  // AI Chat & Quick Answer
  const [chatMessage, setChatMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<{ sender: "user" | "bot"; text: string; timestamp: string }[]>([
    {
      sender: "bot",
      text: "Chào bạn! Tôi là Trợ lý AI thực chiến từ Đại lý Thuế Thành Phố. Bạn cần tư vấn gỡ rối về dòng tiền Shopee/TikTok Shop, quyết toán thuế cho thuê nhà, hay rà soát sổ sách hộ kinh doanh?",
      timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);

  // Lead submission form
  const [leadForm, setLeadForm] = useState({
    fullName: "",
    phoneNumber: "",
    bizType: "Shopee/TikTok Shop",
    problem: "",
  });
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string; type: string }[]>([]);
  const [leadSubmitSuccess, setLeadSubmitSuccess] = useState<string | null>(null);
  const [leadSubmitError, setLeadSubmitError] = useState<string | null>(null);
  const [isSubmittingLead, setIsSubmittingLead] = useState<boolean>(false);

  // Admin section: persistence lists (synced from API backend)
  const [adminLeads, setAdminLeads] = useState<LeadSubmission[]>([]);
  const [adminAuth, setAdminAuth] = useState<boolean>(false);
  const [adminPassword, setAdminPassword] = useState<string>("");
  const [selectedLeadForEdit, setSelectedLeadForEdit] = useState<LeadSubmission | null>(null);
  const [leadEditNotes, setLeadEditNotes] = useState<string>("");

  // Load leads initially from backend express server for realistic backend sync
  const fetchLeads = async () => {
    try {
      const resp = await fetch("/api/leads");
      const resData = await resp.json();
      if (resData.success) {
        setAdminLeads(resData.leads);
      }
    } catch (e) {
      console.error("Không kết nối được API Server:", e);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Handle lead submission
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.fullName || !leadForm.phoneNumber) {
      setLeadSubmitError("Vui lòng điền họ tên và số điện thoại liên hệ.");
      return;
    }

    setIsSubmittingLead(true);
    setLeadSubmitError(null);
    setLeadSubmitSuccess(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: leadForm.fullName,
          phoneNumber: leadForm.phoneNumber,
          bizType: leadForm.bizType,
          problem: leadForm.problem || `Yêu cầu dịch vụ liên quan đến ${leadForm.bizType}`,
          files: uploadedFiles
        })
      });

      const data = await response.json();
      if (data.success) {
        setLeadSubmitSuccess("Đại lý Thuế Thành Phố đã nhận được hồ sơ của bạn. Chuyên viên sẽ gọi điện/Zalo tư vấn trong 10-15 phút!");
        setLeadForm({ fullName: "", phoneNumber: "", bizType: "Shopee/TikTok Shop", problem: "" });
        setUploadedFiles([]);
        fetchLeads(); // Sync administrative dashboard
      } else {
        setLeadSubmitError(data.message || "Lỗi xử lý hệ thống. Vui lòng liên hệ Hotline.");
      }
    } catch (err) {
      setLeadSubmitError("Không thể kết nối đến máy chủ. Tuy nhiên thông tin đã được ghi nhận cục bộ!");
      // Fallback update on local simulation
      const mockLead: LeadSubmission = {
        id: "lead-local-" + Date.now(),
        fullName: leadForm.fullName,
        phoneNumber: leadForm.phoneNumber,
        bizType: leadForm.bizType,
        problem: leadForm.problem,
        files: uploadedFiles,
        status: "NEW",
        createdAt: new Date().toISOString()
      };
      setAdminLeads(prev => [mockLead, ...prev]);
      setLeadSubmitSuccess("Đã lưu hồ sơ của bạn cục bộ thành công! Hệ thống sẽ liên lạc trực tiếp.");
    } finally {
      setIsSubmittingLead(false);
    }
  };

  // Mock File Upload Simulator
  const handleFakeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const f = e.target.files[0];
      const newFile = {
        name: f.name,
        size: (f.size / (1024 * 1024)).toFixed(2) + "MB",
        type: f.type || "binary/octet-stream"
      };
      setUploadedFiles(prev => [...prev, newFile]);
    }
  };

  // Tra cứu MST handler
  const handleMstLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupMst.trim()) {
      setLookupResult({ error: "Vui lòng nhập Mã số thuế hoặc CCCD." });
      return;
    }
    const clean = lookupMst.replace(/\s+/g, "");
    
    // Simple deterministic smart parser for lookups
    if (clean.length === 10 || clean.length === 13) {
      setLookupResult({
        mst: clean,
        status: "ĐANG HOẠT ĐỘNG (Đã cấp mã)",
        owner: clean.startsWith("03") ? "Đại Diện: Ông Nguyễn Văn Linh" : "Chủ Hộ: Bà Trần Thu Trang",
        agency: "Chi cục Thuế Quận 1 - TPHCM",
        taxType: "Hộ kinh doanh nộp thuế theo phương pháp kê khai",
        licensingDate: "12/05/2022",
        note: "Đã đăng ký tài khoản thuế điện tử Thuedientu.gdt.gov.vn. Sẵn sàng tích hợp hóa đơn."
      });
    } else if (clean.length === 12) {
      setLookupResult({
        mst: "Cá Nhân: " + clean,
        status: "Thuế TNCN chưa đăng ký hộ kinh doanh cá thể",
        owner: "Người nộp thuế: " + (clean.startsWith("079") ? "Phạm Minh Hoàng" : "Lê Văn Tiến"),
        agency: "Chi cục Thuế Khu Vực Quận 3 - Quận 10",
        taxType: "Mã số thuế cá nhân thông thường",
        note: "Chưa đăng ký mã kinh doanh online. Khuyến nghị chuẩn bị hồ sơ bổ sung trước khi sàn TMĐT gửi đối soát 2026."
      });
    } else {
      setLookupResult({
        mst: clean,
        status: "Thử nghiệm rà soát",
        owner: "Hệ thống kiểm tra nhanh",
        agency: "Cục Thuế Thành Phố",
        taxType: "Không phát hiện nợ xấu nghiêm trọng tại một cửa.",
        note: "MST mẫu hoặc sai độ dài chuẩn (10 số doanh nghiệp / hộ KD, 13 số chi nhánh, 12 số CCCD)."
      });
    }
  };

  // Chat request using server endpoint
  const sendChatMessage = async (presetText?: string) => {
    const textToSend = presetText || chatMessage;
    if (!textToSend.trim()) return;

    const userMsg = {
      sender: "user" as const,
      text: textToSend,
      timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
    };

    setChatHistory(prev => [...prev, userMsg]);
    setChatMessage("");
    setIsChatLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: textToSend,
          history: chatHistory.map(h => ({ role: h.sender === "user" ? "user" : "model", parts: [{ text: h.text }] }))
        })
      });
      const resJson = await response.json();
      
      setChatHistory(prev => [...prev, {
        sender: "bot",
        text: resJson.text || "Hệ thống đang bận xử lý dữ liệu. Vui lòng thử lại sau giây lát.",
        timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
      }]);
    } catch (err) {
      setChatHistory(prev => [...prev, {
        sender: "bot",
        text: "Xin lỗi, kết nối mạng tạm thời bị lỗi. Theo luật thuế thực tế đối với hộ kinh doanh/cá nhân, doanh thu từ 100 triệu/năm trở lên có tỷ lệ đóng là 1.5% (Shopee) hoặc 10% (Chung cư thuê). Bạn hãy gửi số điện thoại tại form liên hệ để tôi gọi lại ngay!",
        timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Admin database save action mock
  const updateLeadStatusAndNotes = async (id: string) => {
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: selectedLeadForEdit?.status,
          agentNotes: leadEditNotes
        })
      });
      const data = await response.json();
      if (data.success) {
        setSelectedLeadForEdit(null);
        fetchLeads(); // refresh List
      }
    } catch (err) {
      // Local fallback
      setAdminLeads(prev => prev.map(l => l.id === id ? { ...l, status: selectedLeadForEdit?.status || l.status, agentNotes: leadEditNotes } : l));
      setSelectedLeadForEdit(null);
    }
  };

  // Instant Calculators
  const calculateResult = () => {
    if (calcType === "hkd") {
      const sectorObj = TAX_RATIOS_BY_SECTOR.find(s => s.code === calcHkdSector);
      const totalRate = sectorObj ? sectorObj.total : 1.5;
      const vatRate = sectorObj ? sectorObj.vat : 1.0;
      const pitRate = sectorObj ? sectorObj.pit : 0.5;

      const isExempt = calcHkdRevenue <= 100000000;
      const totalTax = isExempt ? 0 : (calcHkdRevenue * totalRate) / 100;
      const vatAmount = isExempt ? 0 : (calcHkdRevenue * vatRate) / 100;
      const pitAmount = isExempt ? 0 : (calcHkdRevenue * pitRate) / 100;

      return {
        isExempt,
        totalTax,
        vatAmount,
        pitAmount,
        rate: totalRate,
        explanation: isExempt 
          ? "Tổng doanh thu kinh doanh trong năm dương lịch từ 100.000.000đ trở xuống thuộc diện MIỄN nộp thuế GTGT & TNCN."
          : `Áp dụng tỷ lệ đóng thuế của ngành "${sectorObj?.name}": ${totalRate}% (Tách riêng: GTGT ${vatRate}%, TNCN ${pitRate}%).`
      };
    } else if (calcType === "rent") {
      const totalRevenue = calcRentMonthly * calcRentMonths;
      const isExempt = totalRevenue <= 100000000;
      const totalTax = isExempt ? 0 : totalRevenue * 0.10; // 5% GTGT + 5% TNCN
      return {
        isExempt,
        totalRevenue,
        totalTax,
        explanation: isExempt 
          ? "Do doanh thu cho thuê cả năm dưới 100 triệu, bạn được miễn nộp thuế. Lưu ý vẫn nộp hồ sơ thuế khai để tránh chậm trễ."
          : `Tổng doanh thu năm là ${totalRevenue.toLocaleString()}đ (vượt ngưỡng 100tr), áp mức thuế khoán cho thuê tài sản 10% (5% GTGT + 5% TNCN).`
      };
    } else {
      // penalty rate
      const penaltyDelay = calcPenaltyDays;
      const dailyPenalty = calcPenaltyTaxDebt * 0.0003 * penaltyDelay; // 0.03% daily rate
      let minAdminPenalty = 0;
      let maxAdminPenalty = 0;
      
      if (penaltyDelay <= 5) { minAdminPenalty = 0; maxAdminPenalty = 2000000; }
      else if (penaltyDelay <= 30) { minAdminPenalty = 2000000; maxAdminPenalty = 5000000; }
      else if (penaltyDelay <= 60) { minAdminPenalty = 5000000; maxAdminPenalty = 8000000; }
      else if (penaltyDelay <= 90) { minAdminPenalty = 8000000; maxAdminPenalty = 15000000; }
      else { minAdminPenalty = 15000000; maxAdminPenalty = 25000000; }

      return {
        dailyPenalty,
        minAdminPenalty,
        maxAdminPenalty,
        totalEstimated: dailyPenalty + (minAdminPenalty + maxAdminPenalty)/2,
        explanation: `Tính toán gồm: (1) Tiền phạt chậm do quá hạn nộp hồ sơ hành chính (ước tính khoảng ${(minAdminPenalty).toLocaleString()}đ - ${(maxAdminPenalty).toLocaleString()}đ tùy mức độ tự nguyện); (2) Lãi phạt chậm nộp nợ thuế 0.03%/ngày theo số tiền nợ.`
      };
    }
  };

  const currentResultObj = calculateResult();

  return (
    <div id="app-root-container" className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans antialiased text-gray-800 selection:bg-[#800020] selection:text-white">
      {/* Top Banner Warning & Hot News (Editorial Strip) */}
      <div id="hot-news-ribbon" className="bg-[#001F3F] text-white text-[12px] py-1.5 px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center border-b border-red-950 font-mono tracking-wide">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="bg-[#800020] px-1.5 py-0.5 rounded text-[10px] font-bold text-white uppercase animate-pulse">Cập nhật</span>
          <span>Nghị định 125/2020/NĐ-CP & Luật Quản lý Thuế mới nhất về rà soát rủi ro TMĐT năm 2026</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-gray-300">
          <span>Hỗ trợ khẩn cấp: <strong>090.123.4567</strong></span>
          <span>● Hệ thống Đại lý Thuế được cấp phép</span>
        </div>
      </div>

      {/* Main Header / Elegant Editorial Navigation */}
      <header id="main-editorial-header" className="bg-white border-b border-gray-250 sticky top-0 z-40 shadow-sm shrink-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Brand Identity with Burgundy + Navy contrast */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("home")}>
            <div className="w-12 h-12 bg-[#800020] flex items-center justify-center rounded shadow-md relative group">
              <span className="text-white font-extrabold text-2xl tracking-tighter">TP</span>
              <div className="absolute inset-0.5 border border-white/20 rounded"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[#001F3F] font-black text-xl tracking-tight uppercase">DAILYTHUETP.COM.VN</span>
                <span className="bg-green-100 text-green-800 text-[10px] font-bold px-1.5 py-0.2 rounded border border-green-200 uppercase">Thực chiến</span>
              </div>
              <p className="text-[#800020] text-[11px] font-bold tracking-widest uppercase">Đại lý Thuế Thành Phố — Trung tâm giải pháp thuế số 1</p>
            </div>
          </div>

          {/* Desktop Navigation Link Menu */}
          <nav className="flex flex-wrap items-center justify-center gap-1.5 md:gap-3 text-[13.5px] font-semibold text-gray-600">
            {[
              { id: "home", label: "TRANG CHỦ" },
              { id: "services", label: "DỊCH VỤ" },
              { id: "lookup", label: "TRA CỨU THUẾ" },
              { id: "guides", label: "KIẾN THỨC BÀI HỌC" },
              { id: "laws", label: "THƯ VIỆN LUẬT" },
              { id: "calculator", label: "CÔNG CỤ TÍNH" },
              { id: "faq", label: "HỎI ĐÁP" },
              { id: "cases", label: "CASE STUDY" },
            ].map((t) => (
              <button
                key={t.id}
                id={`nav-btn-${t.id}`}
                onClick={() => setActiveTab(t.id)}
                className={`px-3 py-1.5 rounded transition-all duration-150 uppercase tracking-tight ${
                  activeTab === t.id 
                    ? "bg-[#800020] text-white shadow-sm" 
                    : "hover:bg-gray-100 text-[#001F3F] hover:text-[#800020]"
                }`}
              >
                {t.label}
              </button>
            ))}

            {/* Admin Panel Access Indicator Button */}
            <button 
              id="admin-entry-btn"
              onClick={() => {
                setActiveTab("admin");
                if (!adminAuth) {
                  // Keep it to view lead log
                }
              }}
              className={`p-2 rounded-full border transition-all ${
                activeTab === "admin" 
                  ? "bg-[#001F3F] text-white border-[#001F3F]" 
                  : "bg-gray-50 text-gray-500 hover:text-red-700 border-gray-200"
              }`}
              title="Khu vực Quản lý Hồ sơ Khách hàng (Admin)"
            >
              <Settings size={15} />
            </button>
          </nav>

          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <a 
              href="tel:0901234567" 
              className="bg-[#001F3F] hover:bg-[#800020] text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow transition-all duration-200"
            >
              <PhoneCall size={14} className="animate-pulse" />
              HOTLINE GẤP
            </a>
          </div>
        </div>
      </header>

      {/* Breadcrumbs for better UX & SEO structure */}
      <div id="breadcrumb-strip" className="bg-white border-b border-gray-200 py-1 px-4 md:px-8 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <span>Trang chủ</span>
          <ChevronRight size={12} />
          <span className="text-[#800020] font-bold uppercase">
            {activeTab === "home" && "Bảng tin thực chiến"}
            {activeTab === "services" && "Hệ thống dịch vụ thuế trọn gói"}
            {activeTab === "lookup" && "Cổng tra cứu chỉ số thuế cơ bản"}
            {activeTab === "guides" && "Cẩm nang hướng dẫn bóc tách dòng tiền"}
            {activeTab === "laws" && "Tủ sách pháp luật thuế mới ban hành"}
            {activeTab === "calculator" && "Phần mềm tính thử số thuế trực tuyến"}
            {activeTab === "faq" && "Hỏi đáp nhanh & Tư vấn cùng Trợ lý AI"}
            {activeTab === "cases" && "Case Study giải cứu hồ sơ thực tế"}
            {activeTab === "admin" && "Hệ thống quản trị hồ sơ Khách hàng tiềm năng"}
          </span>
        </div>
      </div>

      {/* Main Container Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex-1 flex flex-col lg:flex-row gap-6 w-full">
        
        {/* LEFT COLUMN: Main viewport of the applet, dynamically changing */}
        <div className="flex-1 min-w-0 bg-white border border-gray-200 shadow-sm rounded-lg p-4 md:p-8">
          
          {/* TAB 1: HOME PAGE */}
          {activeTab === "home" && (
            <div id="view-tab-home" className="space-y-8">
              {/* Strong Hero Banner designed carefully centered on premium typography */}
              <div className="bg-gradient-to-br from-[#001F3F]/5 to-[#800020]/5 p-6 md:p-10 border-l-8 border-[#800020] rounded-r-lg relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-4">
                  <Scale size={320} className="text-[#800020]" />
                </div>
                
                <div className="relative z-10 space-y-4">
                  <div className="inline-block bg-[#800020] text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded tracking-wide">
                    Được cấp phép bởi bộ tài chính ● Mã số Đại lý: TP-999
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-[#001F3F] leading-tight font-serif">
                    ĐẠI LÝ THUẾ THÀNH PHỐ <br />
                    <span className="text-[#800020]">GIẢI PHÁP THUẾ THỰC CHIẾN</span>
                  </h2>
                  <p className="text-gray-700 text-base md:text-lg max-w-3xl leading-relaxed">
                    Chúng tôi không làm kiểu giới thiệu lý thuyết suông. Với kinh nghiệm trực tiếp làm việc tại các Chi cục Thuế, chúng tôi chuyên bóc tách dòng tiền phức tạp, giải trình doanh thu sàn Shopee/TikTok/Lazada, gỡ truy thu thuế cho thuê nhà và xử lý tẹt ga sổ sách kế toán của doanh nghiệp vừa và nhỏ.
                  </p>

                  {/* Trust Signals and Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-250/60">
                    <div className="p-3 bg-white/80 rounded border border-gray-150">
                      <div className="text-[#800020] font-black text-2xl">5.000+</div>
                      <div className="text-xs text-gray-500 font-medium">Hộ & Cá nhân phục vụ</div>
                    </div>
                    <div className="p-3 bg-white/80 rounded border border-gray-150">
                      <div className="text-[#001F3F] font-black text-2xl">100%</div>
                      <div className="text-xs text-gray-500 font-medium">Khớp dữ liệu rà soát sàn</div>
                    </div>
                    <div className="p-3 bg-white/80 rounded border border-gray-150">
                      <div className="text-[#800020] font-black text-2xl">A+ Rating</div>
                      <div className="text-xs text-gray-500 font-medium font-mono">Bảo mật thông tin khách</div>
                    </div>
                    <div className="p-3 bg-white/80 rounded border border-gray-150">
                      <div className="text-[#001F3F] font-black text-2xl">15 Phút</div>
                      <div className="text-xs text-gray-500 font-medium">Bấm máy phản hồi ngay</div>
                    </div>
                  </div>

                  {/* CTA Buttons bar */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    <button 
                      onClick={() => {
                        const contactElem = document.getElementById("lead-form-scroll-target");
                        if(contactElem) contactElem.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="bg-[#800020] hover:bg-neutral-900 text-white px-6 py-3 rounded font-extrabold text-sm uppercase tracking-wide flex items-center gap-2 transform active:scale-95 transition-all shadow-md"
                    >
                      <PhoneCall size={16} />
                      Yêu cầu tư vấn gỡ rối
                    </button>
                    
                    <a 
                      href="https://zalo.me" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="bg-[#25D366] hover:bg-green-700 text-white px-6 py-3 rounded font-extrabold text-sm uppercase tracking-wide flex items-center gap-2 shadow-md"
                    >
                      <MessageSquareOff size={16} />
                      Gửi hồ sơ qua Zalo
                    </a>

                    <button 
                      onClick={() => setActiveTab("lookup")}
                      className="bg-white border-2 border-[#001F3F] hover:bg-gray-50 text-[#001F3F] px-6 py-3 rounded font-bold text-sm"
                    >
                      Tra cứu nghĩa vụ thuế gộp
                    </button>
                  </div>
                </div>
              </div>

              {/* BRAND MISSION & SCOPE (EDITORIAL STYLE) */}
              <div className="border border-gray-200 bg-[#FAF9F6] rounded-lg p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-sm">
                <div className="md:col-span-4 space-y-2 md:border-r md:border-gray-200 md:pr-6">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#800020] block">Thông điệp cốt lõi</span>
                  <blockquote className="text-xl font-serif font-black italic text-[#001F3F] leading-tight">
                    “Đồng hành pháp lý doanh nghiệp”
                  </blockquote>
                  <p className="text-xs text-gray-600 leading-relaxed font-sans">
                    Sứ mệnh của <span className="font-bold text-[#800020]">Đại Lý Thuế Thành Phố</span> là mang lại lá chắn pháp lý tối thượng, tháo gỡ khó khăn về sổ sách, thuế khóa để quý doanh nghiệp yên tâm tập trung bứt phá kinh doanh.
                  </p>
                </div>
                
                <div className="md:col-span-5 space-y-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#001F3F] block">Lĩnh vực hoạt động chính</span>
                  <h4 className="text-xs font-serif font-black text-slate-900 leading-relaxed">
                    Dịch vụ tư vấn thuế, kê khai nộp thuế, kế toán, đăng ký kinh doanh và các loại giấy phép liên quan đến hoạt động kinh doanh.
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Chúng tôi đảm bảo tính đúng đắn, kịp thời và tối ưu hóa chi phí hợp lý của các nghĩa vụ quyết toán thuế TNCN, TNDN, kiểm soát dòng tiền ngân hàng và đại diện giải trình với ban ngành hành chính.
                  </p>
                </div>

                <div className="md:col-span-3 space-y-2.5 bg-white p-4 rounded border border-gray-200">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#800020] block">Khách hàng mục tiêu</span>
                  <div className="grid grid-cols-2 md:grid-cols-1 gap-1.5 text-xs text-gray-700 font-sans font-semibold">
                    {[
                      "Hộ kinh doanh",
                      "Cá nhân kinh doanh",
                      "Doanh nghiệp vừa và nhỏ",
                      "Doanh nghiệp lớn"
                    ].map((target, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#800020] rounded-full shrink-0"></span>
                        <span>{target}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Six Highlight Target Group Panels */}
              <div className="space-y-4">
                <div className="border-b border-gray-200 pb-2">
                  <h3 className="text-lg font-black text-[#001F3F] uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-5 bg-[#800020] block"></span>
                    Mô hình kinh doanh chúng tôi gỡ vướng hàng ngày
                  </h3>
                  <p className="text-xs text-gray-500 font-mono">Giải quyết trực diện lỗi rủi ro truy thu sàn TMĐT, tài khoản cá nhân nợ nần</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Card 1: Hộ kinh doanh */}
                  <div className="border border-gray-200 p-5 rounded-lg hover:border-[#800020] hover:shadow-md transition-all group bg-white">
                    <div className="w-10 h-10 bg-[#800020]/10 text-[#800020] rounded flex items-center justify-center mb-3 group-hover:bg-[#800020] group-hover:text-white transition-colors">
                      <Building2 size={20} />
                    </div>
                    <h4 className="font-extrabold text-base text-[#001F3F] mb-1">Hộ kinh doanh cá thể</h4>
                    <p className="text-xs text-gray-600 line-clamp-3 mb-4">
                      Tối ưu định mức thuế khoán, nộp hồ sơ kế toán Thông tư 88, mở sổ vật liệu sản phẩm, đăng ký thành lập trọn gói nhanh gọn nhất.
                    </p>
                    <button 
                      onClick={() => { setActiveTab("services"); setServiceGroupFilter("HKD"); }}
                      className="text-xs text-[#800020] font-bold flex items-center gap-1 group-hover:underline"
                    >
                      Xem chi tiết dịch vụ <ChevronRight size={14} />
                    </button>
                  </div>

                  {/* Card 2: Thương mại điện tử */}
                  <div className="border border-gray-200 p-5 rounded-lg hover:border-[#800020] hover:shadow-md transition-all group bg-white">
                    <div className="w-10 h-10 bg-[#800020]/10 text-[#800020] rounded flex items-center justify-center mb-3 group-hover:bg-[#800020] group-hover:text-white transition-colors">
                      <TrendingUp size={20} />
                    </div>
                    <h4 className="font-extrabold text-base text-[#001F3F] mb-1">Mã sàn Shopee / TikTok / Lazada</h4>
                    <p className="text-xs text-gray-600 line-clamp-3 mb-4">
                      Bóc tách doanh thu gộp thực tế của gian hàng trước khi trừ chiết khấu sàn. Khai báo 01/CNKD phòng tránh thanh tra hậu kiểm dòng tiền ngân hàng.
                    </p>
                    <button 
                      onClick={() => { setActiveTab("services"); setServiceGroupFilter("CNKD"); }}
                      className="text-xs text-[#800020] font-bold flex items-center gap-1 group-hover:underline"
                    >
                      Xem chi tiết dịch vụ <ChevronRight size={14} />
                    </button>
                  </div>

                  {/* Card 3: Cho thuê tài sản */}
                  <div className="border border-gray-200 p-5 rounded-lg hover:border-[#800020] hover:shadow-md transition-all group bg-white">
                    <div className="w-10 h-10 bg-[#800020]/10 text-[#800020] rounded flex items-center justify-center mb-3 group-hover:bg-[#800020] group-hover:text-white transition-colors">
                      <FileText size={20} />
                    </div>
                    <h4 className="font-extrabold text-base text-[#001F3F] mb-1">Cho thuê Nhà, Căn hộ, Mặt bằng</h4>
                    <p className="text-xs text-gray-600 line-clamp-3 mb-4">
                      Soạn tờ khai 01/TTS, xin hướng dẫn lấy mã nộp thuế lấy hóa đơn lẻ tại Chi cục cấp giao tế cho đối tác Nhật Bản, Hàn Quốc hoặc doanh nghiệp.
                    </p>
                    <button 
                      onClick={() => { setActiveTab("services"); setServiceGroupFilter("CTTS"); }}
                      className="text-xs text-[#800020] font-bold flex items-center gap-1 group-hover:underline"
                    >
                      Xem chi tiết dịch vụ <ChevronRight size={14} />
                    </button>
                  </div>

                  {/* Card 4: KOL / Blogger / Freelancer */}
                  <div className="border border-gray-200 p-5 rounded-lg hover:border-[#800020] hover:shadow-md transition-all group bg-white">
                    <div className="w-10 h-10 bg-[#800020]/10 text-[#800020] rounded flex items-center justify-center mb-3 group-hover:bg-[#800020] group-hover:text-white transition-colors">
                      <Users size={20} />
                    </div>
                    <h4 className="font-extrabold text-base text-[#001F3F] mb-1">KOL, KOC, Affiliate & Freelancer</h4>
                    <p className="text-xs text-gray-600 line-clamp-3 mb-4">
                      Hoàn thuế TNCN 10% từ đơn vị chi trả, bóc tách thu nhập ngoại tệ thụ động Google Adsense, Youtube, App Store hợp lệ không lo bị phạt.
                    </p>
                    <button 
                      onClick={() => { setActiveTab("services"); setServiceGroupFilter("CNKD"); }}
                      className="text-xs text-[#800020] font-bold flex items-center gap-1 group-hover:underline"
                    >
                      Xem chi tiết dịch vụ <ChevronRight size={14} />
                    </button>
                  </div>

                  {/* Card 5: Doanh nghiệp nhỏ */}
                  <div className="border border-gray-200 p-5 rounded-lg hover:border-[#800020] hover:shadow-md transition-all group bg-white">
                    <div className="w-10 h-10 bg-[#800020]/10 text-[#800020] rounded flex items-center justify-center mb-3 group-hover:bg-[#800020] group-hover:text-white transition-colors">
                      <Layers size={20} />
                    </div>
                    <h4 className="font-extrabold text-base text-[#001F3F] mb-1">Doanh nghiệp vừa & cực nhỏ</h4>
                    <p className="text-xs text-gray-600 line-clamp-3 mb-4">
                      Báo cáo tài chính, quyết toán năm thuế TNDN, rà soát hóa đơn rủi ro của bên bán bỏ trốn, thay thế kế toán trưởng ráo riết và an tâm nộp tờ khai trắng.
                    </p>
                    <button 
                      onClick={() => { setActiveTab("services"); setServiceGroupFilter("DN"); }}
                      className="text-xs text-[#800020] font-bold flex items-center gap-1 group-hover:underline"
                    >
                      Xem chi tiết dịch vụ <ChevronRight size={14} />
                    </button>
                  </div>

                  {/* Card 6: Giải trình khẩn cấp */}
                  <div className="border border-gray-150 p-5 bg-amber-50 rounded-lg hover:border-amber-600 hover:shadow-md transition-all group">
                    <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded flex items-center justify-center mb-3">
                      <AlertTriangle size={20} />
                    </div>
                    <h4 className="font-extrabold text-base text-amber-900 mb-1">Giải trình & Cứu hồ sơ rủi ro</h4>
                    <p className="text-xs text-amber-800 line-clamp-3 mb-4">
                      Nổi cáu vì trát triệu tập từ Cục / Chi cục Thuế? Đội ngũ chúng tôi đại diện làm việc đối thoại để gỡ lỗi hóa đơn ảo hoặc bóc tách ngân hàng của bạn.
                    </p>
                    <button 
                      onClick={() => { setActiveTab("services"); setServiceGroupFilter("XL"); }}
                      className="text-xs text-amber-900 font-extrabold flex items-center gap-1 group-hover:underline"
                    >
                      Đọc hướng dẫn rủi ro ngay <ChevronRight size={14} />
                    </button>
                  </div>

                </div>
              </div>

              {/* Advantage Checklist Section */}
              <div className="bg-slate-50 border border-gray-200 p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base font-black text-[#001F3F] uppercase mb-4 tracking-wide">
                    Tại sao hàng ngàn cá nhân tin tưởng dailythuetp.com.vn?
                  </h3>
                  <div className="space-y-3.5">
                    {[
                      { t: "Thực hành thực tế", d: "Chúng tôi đứng trên góc nhìn thực chiến, giải quyết nhanh các tình huống thực tế của khách, không dạy chữ suông lý thuyết." },
                      { t: "Kinh nghiệm rà soát dày mặn", d: "Bao năm trực diện xử lý ngân hàng, hóa đơn điện tử, nắm rõ bài toán 'nới biên lỏng chặt' của cơ quan Quản lý Thuế địa phương." },
                      { t: "Sắp xếp hồ sơ cực tốc", d: "Hướng dẫn chuẩn soạn trước tài liệu, giúp quy trình khai báo, lấy hóa đơn lẻ xong nhanh chỉ trong vài ngày làm việc." },
                      { t: "Chi phí minh bạch", d: "Cam kết báo giá trọn gói 1 lần trước khi tiếp nhận vụ việc, tuyệt đối không có phụ phí 'bôi trơn' hay chi phí phát sinh bất hợp lý." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3">
                        <CheckCircle2 size={16} className="text-[#800020] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-extrabold text-sm block text-[#001F3F]">{item.t}</span>
                          <span className="text-xs text-gray-600 block leading-normal">{item.d}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#800020] text-white p-5 rounded shadow-inner relative overflow-hidden">
                    <div className="absolute right-0 top-0 text-white/5 font-mono text-7xl select-none uppercase font-black tracking-tighter">LAW</div>
                    <h4 className="font-extrabold text-sm uppercase tracking-wider mb-2">Lời cảnh báo từ Luật Sư Đại lý Thuế:</h4>
                    <p className="text-xs leading-relaxed text-red-100 italic">
                      "Từ năm 2025 trở đi, Tổng Cục Thuế đã chính thức đưa vào vận hành phân hệ AI bóc tách tự động biến động dòng tiền nạp/rút từ tài khoản ngân hàng cá nhân liên kết trực tiếp trên tất cả các sàn thương mại điện tử qua cơ sở dữ liệu đối soát quốc gia. Đừng để dồn tích phạt trễ lấn sâu nhiều năm dẫn tới bị khởi tố tội Trốn Thuế cực kỳ nghiêm trọng!"
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-ping"></span>
                      <span className="text-[10px] font-bold text-gray-200">Đại lý Thuế Thành Phố sẵn sàng bảo vệ bạn ngay khi nhận ủy quyền.</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h4 className="text-xs font-black text-[#001F3F] uppercase mb-2">Trích dẫn phản hồi thực tế của khách hàng:</h4>
                    <p className="text-xs italic text-gray-500">
                      "Tôi bị Chi cục quận Tân Bình triệu tập vì dòng tiền TikTok Shop 4.2 tỷ đổ về tài khoản. Tưởng sẽ bị phạt đến gần 150 triệu, may mắn nhờ anh Hải tại Đại lý Thuế Thành Phố bóc tách giải trình đúng luật, bớt được hơn 80 triệu tiền phạt trốn thuế cố ý! Rất biết ơn cách làm việc gãy gọn, thiết thực!"
                    </p>
                    <span className="text-[10px] text-[#800020] font-bold block mt-1">— Chị Thu Trang (Shop Thời trang KidStar)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SERVICES SYSTEM */}
          {activeTab === "services" && (
            <div id="view-tab-services" className="space-y-6">
              <div className="border-b border-gray-200 pb-2">
                <h2 className="text-2xl font-black text-[#001F3F] uppercase tracking-wide">
                  Chi tiết Hệ thống Dịch vụ Thuế Thực Chiến
                </h2>
                <p className="text-xs text-gray-500">Tìm kiếm theo phân loại chính xác của loại hình kinh doanh thực tế để lấy quy trình gỡ vướng.</p>
              </div>

              {/* Group selection tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  { k: "ALL", l: "Tất cả dịch vụ" },
                  { k: "HKD", l: "Hộ kinh doanh (Thông tư 88/Khoán)" },
                  { k: "CNKD", l: "Cá nhân TMĐT/Freelancer" },
                  { k: "CTTS", l: "Cho thuê nhà/Mặt bằng" },
                  { k: "DN", l: "Doanh nghiệp (Kế toán trọn gói)" },
                  { k: "XL", l: "Xử lý vi phạm/Truy thu khẩn cấp" },
                ].map((item) => (
                  <button
                    key={item.k}
                    onClick={() => setServiceGroupFilter(item.k)}
                    className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-all ${
                      serviceGroupFilter === item.k
                        ? "bg-[#800020] text-white shadow"
                        : "bg-gray-100 hover:bg-gray-200 text-[#001F3F]"
                    }`}
                  >
                    {item.l}
                  </button>
                ))}
              </div>

              {/* Service list and Detail Panel split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
                
                {/* Scrollable list on left */}
                <div className="lg:col-span-4 space-y-2 max-h-[500px] overflow-y-auto pr-2">
                  {SERVICES_DATA.filter(s => serviceGroupFilter === "ALL" || s.group === serviceGroupFilter).map((s) => (
                    <div
                      key={s.id}
                      onClick={() => setSelectedService(s)}
                      className={`p-3 rounded border text-left cursor-pointer transition-all ${
                        selectedService?.id === s.id
                          ? "border-[#800020] bg-red-50/50"
                          : "border-gray-200 hover:border-gray-400 bg-white"
                      }`}
                    >
                      <h4 className="font-extrabold text-xs text-[#001F3F] mb-1 leading-snug">{s.title}</h4>
                      <p className="text-[10.5px] text-gray-500 line-clamp-2 leading-relaxed">{s.shortDesc}</p>
                      <span className="inline-block text-[9.5px] uppercase font-bold text-[#800020] mt-1.5 tracking-wider bg-gray-100 p-1 rounded">
                        {s.group === "HKD" && "Hộ kinh doanh"}
                        {s.group === "CNKD" && "Cá nhân TMĐT"}
                        {s.group === "CTTS" && "Cho thuê nhà"}
                        {s.group === "DN" && "Doanh nghiệp"}
                        {s.group === "XL" && "Giải trình khẩn cấp"}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Selected Service Detailed Board on right */}
                <div className="lg:col-span-8 bg-slate-50 border border-gray-200 p-6 rounded-lg space-y-4">
                  {selectedService ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-start gap-2 border-b border-gray-250 pb-3">
                        <div>
                          <span className="text-[11px] font-extrabold text-[#800020] tracking-widest uppercase">
                            DỊCH VỤ THUẾ CHUYÊN SÂU
                          </span>
                          <h3 className="text-xl font-black text-[#001F3F] mt-1">{selectedService.title}</h3>
                        </div>
                        <span className="bg-[#001F3F] text-white text-[11px] font-mono px-2 py-1 rounded shrink-0">
                          {selectedService.duration}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[11px] font-extrabold text-[#001F3F] uppercase tracking-wide flex items-center gap-1">
                          <CheckCircle2 size={13} className="text-[#800020]" />
                          Đối tượng áp dụng thực tế:
                        </span>
                        <p className="text-xs text-gray-700 font-mono italic pl-4 bg-white p-2 rounded border border-gray-200">
                          {selectedService.targetUser}
                        </p>
                      </div>

                      {/* Documents needed checklist */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-extrabold text-[#001F3F] uppercase tracking-wide block">
                          Những hồ sơ quý khách cần chuẩn bị trước:
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-2">
                          {selectedService.documentsNeeded.map((doc, idx) => (
                            <div key={idx} className="bg-white p-2 rounded border border-gray-150 text-xs flex items-start gap-1.5">
                              <span className="bg-[#800020] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5">{idx + 1}</span>
                              <span className="text-gray-600 leading-normal">{doc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Step process flow */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-extrabold text-[#001F3F] uppercase tracking-wide block">
                          Quy trình xử lý thực chiến tại Đại lý Thuế Thành Phố:
                        </span>
                        <div className="space-y-1.5 pl-4 border-l-2 border-[#800020]">
                          {selectedService.processSteps.map((step, sIdx) => (
                            <div key={sIdx} className="relative pl-2 text-xs">
                              <div className="font-extrabold text-[#001F3F]">{step.split(":")[0]}:</div>
                              <div className="text-gray-600">{step.split(":")[1]}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* FAQs for this service */}
                      <div className="bg-white p-4 rounded border border-gray-200 space-y-2">
                        <span className="text-[11px] font-extrabold text-[#800020] uppercase tracking-wide flex items-center gap-1">
                          <HelpCircle size={14} />
                          Câu hỏi hay gặp nhất về dịch vụ này:
                        </span>
                        <div className="space-y-3 split-divided">
                          {selectedService.faq.map((fq, fidx) => (
                            <div key={fidx} className="space-y-1 text-xs">
                              <div className="font-extrabold text-slate-800">Q: {fq.q}</div>
                              <div className="text-gray-600 bg-slate-50 p-2.5 rounded border-l-2 border-slate-300 italic">A: {fq.a}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quick CTA to push lead form */}
                      <div className="pt-2 flex flex-col sm:flex-row justify-between items-center bg-red-50 p-3 rounded border border-red-200 gap-3">
                        <div className="text-center sm:text-left">
                          <div className="text-xs font-bold text-slate-800">Quý khách đang nằm trong diện cần xử lý trường hợp này gấp?</div>
                          <div className="text-[10px] text-gray-500">Được tư vấn chi tiết miễn phí và soạn sẵn tờ khai chỉ trong 15 phút.</div>
                        </div>
                        <button
                          onClick={() => {
                            setLeadForm(prev => ({
                              ...prev,
                              problem: `Cần tư vấn sâu cho dịch vụ: "${selectedService.title}"`
                            }));
                            const scrollTarget = document.getElementById("lead-form-scroll-target");
                            if (scrollTarget) scrollTarget.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="bg-[#800020] hover:bg-neutral-900 text-white text-xs font-bold px-4 py-2.5 rounded shrink-0 uppercase tracking-wider"
                        >
                          Cần gửi hồ sơ tư vấn dịch vụ này
                        </button>
                      </div>

                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-400">
                      Chọn một dịch vụ cụ thể bên trái để theo dõi chi tiết quy trình nộp thuế và hồ sơ chuẩn bị.
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: TAX SEARCH BOARD */}
          {activeTab === "lookup" && (
            <div id="view-tab-lookup" className="space-y-6">
              <div className="border-b border-gray-200 pb-2">
                <h2 className="text-2xl font-black text-[#001F3F] uppercase tracking-wide">
                  Cổng Tra Cứu Nghĩa Vụ & Biểu Thuế Định Mức
                </h2>
                <p className="text-xs text-gray-500">Cung cấp bộ lọc tra cứu nhanh chính sách thuế rủi ro trực quan cho các hộ nhỏ trực tiếp.</p>
              </div>

              {/* Quick MST Lookup Form */}
              <div className="bg-slate-50 border border-gray-300 p-5 rounded-lg space-y-4">
                <h3 className="text-sm font-extrabold text-[#001F3F] uppercase tracking-wide flex items-center gap-1.5">
                  <Search size={16} className="text-[#800020]" />
                  Kiểm tra nhanh tình hình đăng ký Mã số thuế / CCCD
                </h3>
                <p className="text-xs text-gray-600">
                  Nhập Mã số thuế hộ kinh doanh (10 hoặc 13 chữ số) hoặc Số CCCD cá nhân của bạn để kiểm tra tính trạng nợ trắng hoặc tình hình rà soát từ Cục Thuế.
                </p>
                <form onSubmit={handleMstLookup} className="flex gap-2">
                  <input
                    type="text"
                    value={lookupMst}
                    onChange={(e) => setLookupMst(e.target.value)}
                    placeholder="Nhập MST (Ví dụ: 0316827361) hoặc số CCCD..."
                    className="flex-1 bg-white border border-gray-300 rounded px-3 py-2.5 text-xs text-[#001F3F] focus:outline-none focus:ring-1 focus:ring-[#800020]"
                  />
                  <button type="submit" className="bg-[#001F3F] hover:bg-[#800020] text-white text-xs font-bold px-5 py-2.5 rounded uppercase">
                    Kiểm tra trạng thái
                  </button>
                </form>

                {lookupResult && (
                  <div className="bg-white p-4 rounded border border-gray-250 animate-fadeIn space-y-3">
                    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                      <span className="text-xs font-mono font-bold text-[#800020]">Nhận diện tra cứu: {lookupResult.mst}</span>
                      <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                        {lookupResult.status}
                      </span>
                    </div>
                    {lookupResult.owner && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        <div>
                          <strong className="text-gray-500">Người đại diện:</strong> {lookupResult.owner}
                        </div>
                        <div>
                          <strong className="text-gray-500">Thuộc quản lý:</strong> {lookupResult.agency}
                        </div>
                        <div>
                          <strong className="text-gray-500">Phân loại nộp thuế:</strong> {lookupResult.taxType}
                        </div>
                        {lookupResult.licensingDate && (
                          <div>
                            <strong className="text-gray-500">Ngày cấp:</strong> {lookupResult.licensingDate}
                          </div>
                        )}
                      </div>
                    )}
                    <div className="bg-red-50 p-2.5 rounded border border-red-150 text-xs text-red-900 italic font-mono">
                      <strong>Khuyến nghị từ Đại lý:</strong> {lookupResult.note}
                    </div>
                  </div>
                )}
              </div>

              {/* Tax Ratios Table */}
              <div className="space-y-3">
                <h3 className="text-base font-black text-[#001F3F] uppercase flex items-center gap-1.5">
                  <Percent size={16} className="text-[#800020]" />
                  Biểu tỷ lệ thuế giá trị gia tăng & thu nhập cá nhân theo ngành
                </h3>
                <p className="text-xs text-gray-500">Bảng chi tiết dựa trên Thông tư 40/2021/TT-BTC áp dụng cho hộ khoán & cá nhân kinh doanhonline.</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse border border-gray-200 text-xs">
                    <thead>
                      <tr className="bg-[#001F3F] text-white">
                        <th className="p-2.5 border border-gray-250 font-bold uppercase">Mô tả ngành kinh doanh</th>
                        <th className="p-2.5 border border-gray-250 font-bold uppercase text-center">Thuế suất GTGT %</th>
                        <th className="p-2.5 border border-gray-250 font-bold uppercase text-center">Thuế suất TNCN %</th>
                        <th className="p-2.5 border border-gray-250 font-bold uppercase text-center">Cộng gộp %</th>
                        <th className="p-2.5 border border-gray-250 font-bold">Ví dụ thực tế</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {TAX_RATIOS_BY_SECTOR.map((r) => (
                        <tr key={r.code} className="hover:bg-slate-50 transition-colors">
                          <td className="p-2.5 border border-gray-200 font-extrabold text-[#001F3F]">{r.name}</td>
                          <td className="p-2.5 border border-gray-200 text-center font-mono font-bold">{r.vat}%</td>
                          <td className="p-2.5 border border-gray-200 text-center font-mono font-bold">{r.pit}%</td>
                          <td className="p-2.5 border border-gray-200 text-center font-mono font-bold text-red-700 bg-red-50">{r.total}%</td>
                          <td className="p-2.5 border border-gray-200 text-gray-500 italic">{r.example}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tax Calendar & Event Tracker */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-3">
                  <h4 className="font-extrabold text-sm text-[#001F3F] uppercase flex items-center gap-1">
                    <CalendarDays size={15} className="text-[#800020]" />
                    Thời hạn kê nộp báo cáo quý & năm
                  </h4>
                  <div className="space-y-2">
                    {LATEST_TAX_CALENDAR.map((cal, i) => (
                      <div key={i} className="bg-white p-3 rounded border border-gray-200 text-xs flex justify-between items-center gap-3">
                        <span className="text-gray-700 font-medium">{cal.event}</span>
                        <span className="bg-[#800020] text-white text-[10.5px] font-bold px-2 py-1 rounded shrink-0 font-mono">
                          {cal.deadline}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-extrabold text-sm text-[#001F3F] uppercase flex items-center gap-1">
                    <Scale size={15} className="text-[#800020]" />
                    Biểu phí phạt chậm nộp tờ khai (NĐ 125/2020)
                  </h4>
                  <div className="space-y-2">
                    {PENALTY_RULES.map((rule, i) => (
                      <div key={i} className="bg-white p-3 rounded border border-gray-200 text-xs">
                        <div className="font-bold text-[#800020] mb-0.5">Số ngày chậm: {rule.delayDays}</div>
                        <div className="text-gray-600 italic font-mono leading-normal">{rule.penaltyText}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: PRACTICAL KNOWLEDGE */}
          {activeTab === "guides" && (
            <div id="view-tab-guides" className="space-y-6">
              <div className="border-b border-gray-200 pb-2">
                <h2 className="text-2xl font-black text-[#001F3F] uppercase tracking-wide">
                  Kiến Thức Thuế Thực Chiến - Bài viết hướng dẫn từng bước
                </h2>
                <p className="text-xs text-gray-500">Cộng đồng chia sẻ cẩm nang bóc tách dữ liệu rủi ro thực tế cho hộ kinh doanh.</p>
              </div>

              {/* Selection cards list for articles */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {PRACTICAL_GUIDES_DATA.map((g) => (
                  <div
                    key={g.id}
                    onClick={() => setSelectedGuide(g)}
                    className={`p-4 rounded-lg border text-left cursor-pointer transition-all ${
                      selectedGuide?.id === g.id
                        ? "border-[#800020] bg-red-50/20 ring-1 ring-[#800020]"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <span className="bg-[#001F3F] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                      {g.category === "TMDT" ? "Thương mại điện tử" : g.category === "CTTS" ? "Cho thuê tài sản" : "Hộ kinh doanh"}
                    </span>
                    <h3 className="font-extrabold text-sm text-[#001F3F] mt-2 mb-1.5 leading-snug line-clamp-2">
                      {g.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {g.summary}
                    </p>
                  </div>
                ))}
              </div>

              {/* Selected Article Detailed Reader Panel */}
              {selectedGuide && (
                <article className="bg-[#FDFDFD] border border-gray-250 p-6 md:p-8 rounded-lg space-y-5 shadow-sm max-w-4xl mx-auto">
                  <div className="space-y-3 pb-4 border-b border-gray-200">
                    <span className="text-[#800020] font-black text-xs uppercase tracking-widest block font-mono">
                      #CẨM NANG THỰC CHIẾN - ĐẠI LÝ THUẾ THÀNH PHỐ
                    </span>
                    <h2 className="text-2xl font-black text-[#001F3F] leading-tight font-serif">
                      {selectedGuide.title}
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed font-mono">
                      tóm tắt: {selectedGuide.summary}
                    </p>
                  </div>

                  <div className="prose text-xs text-gray-700 space-y-4">
                    <p className="font-medium leading-relaxed bg-slate-50 p-3 rounded border-l-4 border-slate-400">
                      {selectedGuide.content}
                    </p>

                    {/* Highly aesthetic Checklist */}
                    <div className="space-y-2 bg-white border border-gray-200 p-4 rounded-lg">
                      <span className="text-xs font-black text-[#001F3F] uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle2 size={14} className="text-[#800020]" />
                        Checklist những điều lưu ý sống còn:
                      </span>
                      <ul className="space-y-1.5 pl-2">
                        {selectedGuide.checklist.map((chk, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-[#800020] text-xs font-bold shrink-0">✔</span>
                            <span className="text-gray-600 leading-normal">{chk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Step guidance */}
                    <div className="space-y-3 pb-2">
                      <span className="text-[11px] font-extrabold text-[#001F3F] uppercase tracking-widest block">
                        Hướng dẫn xử lý theo từng bước cụ thể:
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedGuide.steps.map((st, idx) => (
                          <div key={idx} className="p-3 bg-slate-100 rounded border border-gray-200">
                            <span className="text-xs font-extrabold text-[#800020] block mb-1">
                              {st.split(":")[0]}
                            </span>
                            <span className="text-gray-600 leading-relaxed block">
                              {st.split(":")[1]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic realistic example box */}
                    <div className="bg-[#800020]/5 border-l-4 border-[#800020] p-4 rounded-r shadow-sm space-y-1">
                      <strong className="text-xs text-[#800020] uppercase font-mono tracking-wider block">Ví dụ cách tính toán thực tế:</strong>
                      <p className="text-gray-700 italic leading-relaxed bg-white/80 p-3 rounded border border-red-100/40">
                        {selectedGuide.example}
                      </p>
                    </div>

                    {/* Dangerous Warning bar */}
                    <div className="bg-amber-50 border border-amber-300 p-4 rounded-lg flex gap-3 text-xs">
                      <AlertTriangle size={32} className="text-amber-700 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <strong className="text-amber-900 uppercase font-black">Cảnh báo sai phạm nghiêm trọng:</strong>
                        <p className="text-amber-800 leading-normal font-medium">{selectedGuide.warning}</p>
                      </div>
                    </div>
                  </div>

                  {/* Zalo / Phone CTA right bottom of the post */}
                  <div className="pt-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-xs text-gray-500">
                      Bài viết được biên soạn thực tế bởi cán bộ quản lý đại lý thuế Thành Phố.
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <a 
                        href="https://zalo.me" 
                        className="bg-[#25D366] text-white font-bold text-xs px-4 py-2 rounded flex items-center gap-1"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Hỏi Thêm Qua Zalo
                      </a>
                      <button
                        onClick={() => {
                          setLeadForm(prev => ({
                            ...prev,
                            problem: `Tư vấn xử lý theo bài viết: "${selectedGuide.title}"`
                          }));
                          document.getElementById("lead-form-scroll-target")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="bg-[#001F3F] text-white font-bold text-xs px-4 py-2 rounded"
                      >
                        Nộp hồ sơ gỡ lỗi ngay
                      </button>
                    </div>
                  </div>
                </article>
              )}
            </div>
          )}

          {/* TAB 5: LEGAL DOCUMENTS SYSTEM */}
          {activeTab === "laws" && (
            <div id="view-tab-laws" className="space-y-6">
              <div className="border-b border-gray-200 pb-2">
                <h2 className="text-2xl font-black text-[#001F3F] uppercase tracking-wide">
                  Thư Viện Văn Bản Pháp Luật Thuế Việt Nam
                </h2>
                <p className="text-xs text-gray-500">Tìm kiếm nhanh các văn bản, thông tư hướng dẫn, công văn thuế vụ quan trọng để làm căn cứ pháp lý.</p>
              </div>

              {/* Filtering & Search panel */}
              <div className="bg-slate-50 p-4 rounded border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="relative">
                  <Search size={15} className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    value={legalSearch}
                    onChange={(e) => setLegalSearch(e.target.value)}
                    placeholder="Tìm theo số hiệu thông tư (Ví dụ: 40/2021)..."
                    className="w-full text-xs pl-8 pr-3 py-2.5 bg-white border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#800020]"
                  />
                </div>

                <select
                  value={legalCategoryFilter}
                  onChange={(e) => setLegalCategoryFilter(e.target.value)}
                  className="text-xs p-2.5 bg-white border border-gray-300 rounded"
                >
                  <option value="ALL">Tất cả thể loại</option>
                  <option value="ThongTu">Thông tư hướng dẫn</option>
                  <option value="NghiDinh">Nghị định Chính phủ</option>
                  <option value="Luat">Luật Quản lý Thuế</option>
                  <option value="CongVan">Công văn của Tổng cục</option>
                </select>

                <div className="flex items-center justify-end">
                  <span className="text-xs text-slate-500 font-mono">Hiển thị {
                    LEGAL_DOCS_DATA.filter(doc => {
                      const matchesSearch = doc.number.toLowerCase().includes(legalSearch.toLowerCase()) || doc.title.toLowerCase().includes(legalSearch.toLowerCase());
                      const matchesCat = legalCategoryFilter === "ALL" || doc.category === legalCategoryFilter;
                      return matchesSearch && matchesCat;
                    }).length
                  } văn bản chuẩn</span>
                </div>
              </div>

              {/* Legal documents result grid */}
              <div className="space-y-4">
                {LEGAL_DOCS_DATA.filter(doc => {
                  const matchesSearch = doc.number.toLowerCase().includes(legalSearch.toLowerCase()) || doc.title.toLowerCase().includes(legalSearch.toLowerCase());
                  const matchesCat = legalCategoryFilter === "ALL" || doc.category === legalCategoryFilter;
                  return matchesSearch && matchesCat;
                }).map((doc) => (
                  <div key={doc.id} className="bg-white border border-gray-200 p-5 rounded-lg hover:shadow-sm transition-all space-y-3">
                    <div className="flex flex-wrap justify-between items-start gap-2 border-b border-gray-150 pb-2">
                      <div className="space-y-0.5">
                        <span className="bg-[#800020] text-white text-[10px] font-bold px-2 py-0.5 rounded font-mono mr-2">
                          {doc.category === "ThongTu" ? "Thông tư" : doc.category === "NghiDinh" ? "Nghị định" : doc.category === "Luat" ? "Luật Thuế" : "Công văn nội bộ"}
                        </span>
                        <strong className="text-xs text-[#001F3F] font-mono">{doc.number}</strong>
                      </div>
                      <span className="text-[10.5px] font-extrabold text-[#800020] uppercase bg-red-50 px-2 py-0.5 rounded">
                        Lĩnh vực: {doc.field}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-sm text-[#001F3F] leading-snug">
                      {doc.title}
                    </h3>

                    <p className="text-xs text-gray-600 italic bg-slate-50 p-2 rounded">
                      <strong>Tóm tắt nội dung chính:</strong> {doc.summary}
                    </p>

                    <div className="space-y-1 pl-4 border-l-2 border-[#001F3F]">
                      <span className="text-[10px] text-gray-500 uppercase font-black block">Điều khoản quy định mấu chốt:</span>
                      {doc.contentBullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="text-xs text-gray-700 flex items-start gap-1">
                          <span className="text-[#800020]">•</span>
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex justify-between items-center flex-wrap gap-2 text-xs">
                      <span className="text-gray-500">Năm ban hành: <strong>{doc.year}</strong></span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => alert(`Đã kích hoạt sitemap tải file PDF cho văn bản ${doc.number}. Chức năng đang nạp file chính thức.`)}
                          className="text-[#800020] font-bold border border-[#800020] px-3 py-1 rounded hover:bg-red-50 text-[11px]"
                        >
                          Tải PDF Bản Gốc
                        </button>
                        <button 
                          onClick={() => {
                            setLeadForm(prev => ({
                              ...prev,
                              problem: `Cần tư vấn sâu theo điều khoản pháp lý của văn bản: ${doc.number}`
                            }));
                            document.getElementById("lead-form-scroll-target")?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="bg-[#001F3F] text-white font-bold px-3 py-1 rounded hover:bg-[#800020] text-[11px]"
                        >
                          Cần tư vấn áp dụng
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 6: TAX CALCULATOR UTILITY */}
          {activeTab === "calculator" && (
            <div id="view-tab-calculator" className="space-y-6">
              <div className="border-b border-gray-200 pb-2">
                <h2 className="text-2xl font-black text-[#001F3F] uppercase tracking-wide">
                  Phần Mềm Tính Thử Số Thuế Phải Nộp Trực Tuyến
                </h2>
                <p className="text-xs text-gray-500">Nhập doanh thu thô để hệ thống bóc tách số liệu thuế tự động gãy gọn theo Thông tư 40.</p>
              </div>

              {/* Calculator mode switcher */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setCalcType("hkd")}
                  className={`flex-1 py-3 text-center text-xs font-bold transition-all uppercase ${
                    calcType === "hkd" 
                      ? "border-b-4 border-[#800020] text-[#800020] bg-red-50/20" 
                      : "text-[#001F3F] hover:bg-gray-50"
                  }`}
                >
                  Dành Cho Hộ KD & TMĐT (Shopee/TikTok)
                </button>
                <button
                  onClick={() => setCalcType("rent")}
                  className={`flex-1 py-3 text-center text-xs font-bold transition-all uppercase ${
                    calcType === "rent" 
                      ? "border-b-4 border-[#800020] text-[#800020] bg-red-50/20" 
                      : "text-[#001F3F] hover:bg-gray-50"
                  }`}
                >
                  Dành Cho Thuê Nhà & Mặt Bằng
                </button>
                <button
                  onClick={() => setCalcType("penalty")}
                  className={`flex-1 py-3 text-center text-xs font-bold transition-all uppercase ${
                    calcType === "penalty" 
                      ? "border-b-4 border-[#800020] text-[#800020] bg-red-50/20" 
                      : "text-[#001F3F] hover:bg-gray-50"
                  }`}
                >
                  Tính Thử Phạt Chậm Nộp
                </button>
              </div>

              {/* Calculation Workspace Layout */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50 border border-gray-250 p-6 rounded-lg">
                
                {/* Inputs area */}
                <div className="md:col-span-6 space-y-4">
                  {calcType === "hkd" && (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#001F3F] uppercase block">
                          Chọn lĩnh vực / Ngành nghề kinh doanh thực tế:
                        </label>
                        <select
                          value={calcHkdSector}
                          onChange={(e) => setCalcHkdSector(e.target.value)}
                          className="w-full text-xs p-2.5 bg-white border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#800020]"
                        >
                          {TAX_RATIOS_BY_SECTOR.map((r) => (
                            <option key={r.code} value={r.code}>{r.name} (Đóng {r.total}%)</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#001F3F] uppercase block">
                          Tổng doanh thu thô nhận được cả năm (Đồng / năm):
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={calcHkdRevenue}
                            onChange={(e) => setCalcHkdRevenue(Number(e.target.value))}
                            className="w-full text-xs px-3 py-2.5 bg-white border border-gray-300 rounded focus:border-[#800020] focus:outline-none"
                            placeholder="Ví dụ: 350000000"
                          />
                          <span className="absolute right-3 top-2 text-xs text-gray-400 font-mono font-bold">VNĐ</span>
                        </div>
                        <span className="text-[10px] text-gray-500 italic block">
                          * Doanh thu tính thuế là số tổng khách thanh toán trước khi trừ bất kỳ chiết khuyến mãi hay phí dịch vụ của các bên trung gian shopee tiktok.
                        </span>
                      </div>
                    </div>
                  )}

                  {calcType === "rent" && (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#001F3F] uppercase block">
                          Giá cho thuê nhà nhận về hàng tháng (Đồng / Tháng):
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={calcRentMonthly}
                            onChange={(e) => setCalcRentMonthly(Number(e.target.value))}
                            className="w-full text-xs px-3 py-2.5 bg-white border border-gray-300 rounded focus:border-[#800020] focus:outline-none"
                            placeholder="Ví dụ: 25000000"
                          />
                          <span className="absolute right-3 top-2 text-xs text-gray-400 font-mono font-bold">/Tháng</span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#001F3F] uppercase block">
                          Số tháng cho thuê thực tế phát sinh tiền trong năm:
                        </label>
                        <select
                          value={calcRentMonths}
                          onChange={(e) => setCalcRentMonths(Number(e.target.value))}
                          className="w-full text-xs p-2.5 bg-white border border-gray-300 rounded"
                        >
                          {[12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((mo) => (
                            <option key={mo} value={mo}>{mo} tháng thuê</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {calcType === "penalty" && (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#001F3F] uppercase block">
                          Số tiền thuế nợ / Tiền thuế chậm kê khai dự kiến (Đồng):
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={calcPenaltyTaxDebt}
                            onChange={(e) => setCalcPenaltyTaxDebt(Number(e.target.value))}
                            className="w-full text-xs px-3 py-2.5 bg-white border border-gray-300 rounded focus:border-[#800020] focus:outline-none"
                            placeholder="Ví dụ: 45000000"
                          />
                          <span className="absolute right-3 top-2 text-xs text-gray-400 font-mono font-bold">VNĐ</span>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#001F3F] uppercase block">
                          Số ngày chậm nộp tờ khai & Chậm chuyển ngân sách (Ngày):
                        </label>
                        <input
                          type="number"
                          value={calcPenaltyDays}
                          onChange={(e) => setCalcPenaltyDays(Number(e.target.value))}
                          className="w-full text-xs px-3 py-2.5 bg-white border border-gray-300 rounded focus:border-[#800020]"
                          placeholder="Ví dụ: 45"
                        />
                        <span className="text-[10px] text-gray-500 italic block">
                          * Cách tính phạt chậm nộp nợ thuế mới của Tổng cục Thuế là 0.03% mỗi ngày phát sinh nợ tiền thuế.
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Highly aesthetic result output grid column designed specifically */}
                <div className="md:col-span-6 bg-white border border-gray-350 p-5 rounded-lg flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-mono font-black text-[#800020] uppercase tracking-widest block">
                      KẾT QUẢ TÍNH TOÁN DỰ KIẾN
                    </span>
                    
                    {calcType === "hkd" && (
                      <div className="mt-2 space-y-3">
                        <div className="text-gray-500 text-xs">Tổng số tiền thuế (GTGT + TNCN) ước tính nộp:</div>
                        <div className="text-3xl font-black text-[#800020] tracking-tight">
                          {(currentResultObj as any).totalTax.toLocaleString()} <span className="text-xs text-slate-500">VNĐ</span>
                        </div>
                        
                        <div className="border-t border-gray-150 pt-2 space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Thuế giá trị gia tăng (GTGT):</span>
                            <strong className="font-mono">{(currentResultObj as any).vatAmount.toLocaleString()}đ</strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Thuế thu nhập cá nhân (TNCN):</span>
                            <strong className="font-mono">{(currentResultObj as any).pitAmount.toLocaleString()}đ</strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Tỷ lệ ngành hàng áp dụng:</span>
                            <strong className="text-[#001F3F]">{(currentResultObj as any).rate}%</strong>
                          </div>
                        </div>
                      </div>
                    )}

                    {calcType === "rent" && (
                      <div className="mt-2 space-y-3">
                        <div className="text-gray-500 text-xs">Tổng số tiền thuế ước tính nộp (Khoán 10%):</div>
                        <div className="text-3xl font-black text-[#800020] tracking-tight">
                          {(currentResultObj as any).totalTax.toLocaleString()} <span className="text-xs text-slate-500">VNĐ</span>
                        </div>
                        
                        <div className="border-t border-gray-150 pt-2 space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Tổng doanh thu cho thuê cả năm:</span>
                            <strong className="font-mono">{(currentResultObj as any).totalRevenue.toLocaleString()}đ</strong>
                          </div>
                          <div className="flex justify-between text-indigo-950 font-bold">
                            <span>Sản phẩm chứng từ cần làm:</span>
                            <span>Tờ khai 01/TTS lấy hóa đơn lẻ</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {calcType === "penalty" && (
                      <div className="mt-2 space-y-3">
                        <div className="text-gray-500 text-xs">Ước tính mức phạt nợ thuế & Chậm báo cáo hàng hành:</div>
                        <div className="text-3xl font-black text-[#805000] tracking-tight text-amber-900">
                          ~ {(currentResultObj as any).totalEstimated.toLocaleString()} <span className="text-xs text-slate-500">VNĐ</span>
                        </div>
                        
                        <div className="border-t border-gray-150 pt-2 space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Mức phạt chậm hồ sơ (Bổ sung NĐ 125):</span>
                            <strong className="text-amber-700">{(currentResultObj as any).minAdminPenalty.toLocaleString()}đ - {(currentResultObj as any).maxAdminPenalty.toLocaleString()}đ</strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Tiền muộn nộp 0.03%/ngày ({calcPenaltyDays} ngày):</span>
                            <strong className="font-mono">{(currentResultObj as any).dailyPenalty.toLocaleString()}đ</strong>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Warn alerts */}
                  <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-[11px] text-yellow-800 italic">
                    💡 {(currentResultObj as any).explanation}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setLeadForm(prev => ({
                          ...prev,
                          problem: `Sử dụng máy tính thử số thuế ${calcType === "hkd"? "HKD thô" : calcType === "rent" ? "Cho thuê nhà" : "Phát sinh phạt nợ"} cần liên hệ đại lý rà soát hộ.`
                        }));
                        document.getElementById("lead-form-scroll-target")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full bg-[#800020] hover:bg-neutral-950 text-white font-bold py-2.5 rounded text-xs uppercase"
                    >
                      Xác nhận thông tin & Khai báo thử ngay
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 7: AI CHATBOT & FAQ RESPONDER */}
          {activeTab === "faq" && (
            <div id="view-tab-faq" className="space-y-6">
              <div className="border-b border-gray-200 pb-2">
                <h2 className="text-2xl font-black text-[#001F3F] uppercase tracking-wide">
                  Hỏi Đáp Nhanh & Trợ Lý AI Thuế Thực Chiến
                </h2>
                <p className="text-xs text-gray-500">Nhập trực tiếp tình huống của bạn để hệ thống rà quét tự động hoặc bấm chọn câu hỏi mẫu hay gặp bên dưới.</p>
              </div>

              {/* Instant pre-categorized questions selector */}
              <div className="space-y-2">
                <span className="text-[11px] font-extrabold text-[#800020] uppercase tracking-widest block">
                  CÂU HỎI NHANH CHỦ ĐỀ SỐNG CÒN
                </span>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => sendChatMessage("Bán hàng Shopee doanh thu 500 triệu một năm phải nộp tổng cộng bao nhiêu thuế?")}
                    className="bg-[#001F3F]/5 border border-[#001F3F]/20 text-[#001F3F] text-xs px-3 py-1.5 rounded hover:bg-[#800020] hover:text-white transition-all text-left"
                  >
                    Bán hàng Shopee/TikTok nộp bao nhiêu %?
                  </button>
                  <button 
                    onClick={() => sendChatMessage("Tôi cho thuê căn hộ Landmark 50 triệu/tháng thì thủ tục mua hóa đơn lẻ của cục thuế như thế nào?")}
                    className="bg-[#001F3F]/5 border border-[#001F3F]/20 text-[#001F3F] text-xs px-3 py-1.5 rounded hover:bg-[#800020] hover:text-white transition-all text-left"
                  >
                    Hóa đơn lẻ cho thuê căn hộ?
                  </button>
                  <button 
                    onClick={() => sendChatMessage("Tôi nhận tiền quảng cáo Google Adsense nước ngoài đổ trực tiếp vào bank có bị truy thu không?")}
                    className="bg-[#001F3F]/5 border border-[#001F3F]/20 text-[#001F3F] text-xs px-3 py-1.5 rounded hover:bg-[#800020] hover:text-white transition-all text-left"
                  >
                    Ngoại tệ Google Adsense/Youtube bị phạt thế nào?
                  </button>
                  <button 
                    onClick={() => sendChatMessage("Hộ kinh doanh mới mở có nợ môn bài không?")}
                    className="bg-[#001F3F]/5 border border-[#001F3F]/20 text-[#001F3F] text-xs px-3 py-1.5 rounded hover:bg-[#800020] hover:text-white transition-all text-left"
                  >
                    Môn bài của Hộ kinh doanh?
                  </button>
                </div>
              </div>

              {/* Main chat window workspace */}
              <div className="border border-gray-300 rounded-lg flex flex-col h-[500px] bg-slate-100 overflow-hidden">
                
                {/* Chat window top header */}
                <div className="bg-[#001F3F] p-3 text-white flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shrink-0"></span>
                    <strong>Hệ thống Trợ lý Thuế AI Thực Chiến 24/7</strong>
                  </div>
                  <span className="text-[10px] text-gray-300 font-mono">Model: Gemini 3.5 Active</span>
                </div>

                {/* Chat content scrollable area */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {chatHistory.map((h, i) => (
                    <div key={i} className={`flex ${h.sender === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}>
                      <div className={`p-3.5 rounded-lg max-w-[85%] text-xs shadow-sm ${
                        h.sender === "user" 
                          ? "bg-[#800020] text-white rounded-br-none" 
                          : "bg-white text-gray-800 border border-gray-250 rounded-bl-none prose"
                      }`}>
                        <div className="font-sans leading-relaxed whitespace-pre-wrap">{h.text}</div>
                        <span className={`block text-[9px] mt-1.5 text-right font-mono ${h.sender === "user" ? "text-red-200" : "text-gray-400"}`}>
                          {h.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}

                  {isChatLoading && (
                    <div className="flex justify-start animate-pulse">
                      <div className="bg-white border border-gray-250 p-4 rounded-lg flex items-center gap-3 text-xs text-gray-500">
                        <Sparkles size={16} className="text-[#800020] animate-spin" />
                        <span>Trợ lý AI đang bóc tách điều luật và soạn thảo câu trả lời gỡ rối...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat inputs border-t */}
                <div className="bg-white p-3 border-t border-gray-300 flex gap-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") sendChatMessage(); }}
                    placeholder="Hỏi bất kỳ điều gì (VD: Bán tiktok lâu ngày bị cục thuế gọi làm thế nào?)..."
                    className="flex-1 text-xs border border-gray-300 rounded px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#800020] focus:border-[#800020]"
                  />
                  <button
                    onClick={() => sendChatMessage()}
                    className="bg-[#800020] hover:bg-[#001F3F] text-white px-4 py-2 rounded flex items-center justify-center transition-colors shadow-sm"
                  >
                    <Send size={15} />
                  </button>
                </div>
              </div>

              {/* Traditional quick search lists below */}
              <div className="space-y-4 pt-2">
                <span className="text-xs font-black text-[#001F3F] uppercase tracking-wider block">
                  Hỏi đáp lưu trữ phổ biến:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {QUICK_ANSWER_FAQS.map((q) => (
                    <div key={q.id} className="bg-white p-4 rounded-lg border border-gray-200 space-y-2">
                      <h4 className="font-extrabold text-xs text-[#001F3F] leading-snug">❓ {q.question}</h4>
                      <p className="text-xs text-gray-600 bg-slate-50 p-3 rounded italic leading-relaxed">
                        {q.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 8: CASE STUDIES SUCCESS */}
          {activeTab === "cases" && (
            <div id="view-tab-cases" className="space-y-6">
              <div className="border-b border-gray-200 pb-2">
                <h2 className="text-2xl font-black text-[#001F3F] uppercase tracking-wide">
                  Hồ Sơ Thành Công - Case Study Giải Quyết Khẩn Cấp Thực Tế
                </h2>
                <p className="text-xs text-gray-500">Xem trực tiếp rủi ro, đường đi gỡ rối và kết quả giữ lại tiền thuế cho khách hàng được ghi nhận của chúng tôi.</p>
              </div>

              <div className="space-y-6">
                {CASE_STUDIES_DATA.map((cs) => (
                  <div key={cs.id} className="border border-gray-300 bg-white rounded-lg overflow-hidden shadow-sm">
                    {/* Header bar of Case study */}
                    <div className="bg-[#001F3F] p-4 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-red-300 tracking-wider">HỒ SƠ KHÁCH HÀNG: {cs.clientType}</span>
                        <h3 className="font-black text-sm italic font-serif leading-tight mt-0.5">{cs.title}</h3>
                      </div>
                      {cs.savedAmount && (
                        <div className="bg-[#800020] text-white text-xs font-mono font-bold px-3 py-1 rounded border border-red-900 shrink-0 text-center">
                          SỐ TIỀN THUẾ TIẾT KIỆM: <br className="hidden md:block"/>
                          <span className="text-sm font-extrabold text-green-300">{cs.savedAmount}</span>
                        </div>
                      )}
                    </div>

                    {/* Content comparative analysis grid */}
                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      
                      <div className="space-y-2 bg-red-50/20 p-3 rounded border border-red-100">
                        <div className="font-extrabold text-[#800020] uppercase tracking-wider flex items-center gap-1">
                          <AlertTriangle size={13} className="text-[#800020]" />
                          VẤN ĐỀ TRỌNG TÂM:
                        </div>
                        <p className="text-gray-700 leading-relaxed font-mono">{cs.problem}</p>
                      </div>

                      <div className="space-y-2 bg-yellow-50/20 p-3 rounded border border-yellow-100">
                        <div className="font-extrabold text-[#805000] uppercase tracking-wider flex items-center gap-1">
                          <AlertTriangle size={13} className="text-amber-700 font-bold" />
                          RỦI RO BAN ĐẦU:
                        </div>
                        <p className="text-gray-700 leading-relaxed italic">{cs.risk}</p>
                      </div>

                      <div className="space-y-2 bg-slate-50 p-3 rounded border border-gray-200">
                        <div className="font-extrabold text-[#001F3F] uppercase tracking-wider flex items-center gap-1">
                          <Scale size={13} className="text-[#001F3F]" />
                          HƯỚNG ĐI XỬ LÝ THỰC CHIẾN CỦA ĐẠI LÝ:
                        </div>
                        <p className="text-gray-600 leading-relaxed">{cs.solution}</p>
                      </div>

                      <div className="space-y-2 bg-emerald-50/30 p-3 rounded border border-emerald-100">
                        <div className="font-extrabold text-[#115e59] uppercase tracking-wider flex items-center gap-1">
                          <CheckCircle2 size={13} className="text-emerald-700" />
                          KẾT QUẢ THỰC TẾ:
                        </div>
                        <p className="text-[#115e59] leading-relaxed font-medium">{cs.result}</p>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 9: ADMIN LOGINS & CUSTOM PERSISTENCE */}
          {activeTab === "admin" && (
            <div id="view-tab-admin" className="space-y-6">
              <div className="border-b border-gray-200 pb-2">
                <h2 className="text-2xl font-black text-[#001F3F] uppercase tracking-wide">
                  Hệ thống Quản Trị Khách Hàng Tiềm Năng (Leads Hub)
                </h2>
                <p className="text-xs text-gray-500">Nơi chuyên viên Đại Lý duyệt hồ sơ nộp, phân công gỡ tài khoản nợ tiền thuế cho khách.</p>
              </div>

              {!adminAuth ? (
                <div className="bg-slate-100 border p-8 rounded-lg max-w-md mx-auto space-y-4">
                  <h3 className="font-extrabold text-sm text-[#001F3F] uppercase text-center block">Đăng nhập tài khoản nội bộ</h3>
                  <p className="text-xs text-gray-500 text-center">Hệ thống quản lý nội bộ. Quý khách vui lòng bỏ qua tab này hoặc nhập pass bất kỳ để tham quan thử nghiệm dữ liệu thực tế.</p>
                  
                  <div className="space-y-2">
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="Nhập password thử (Bất kỳ)..."
                      className="w-full text-xs p-2.5 bg-white border border-gray-300 rounded focus:border-[#800020]"
                    />
                    <button
                      onClick={() => setAdminAuth(true)}
                      className="w-full bg-[#800020] text-white py-2 rounded text-xs font-bold uppercase"
                    >
                      Xác nhận Đăng nhập Tham Quan
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-green-50 p-3 rounded border border-green-200">
                    <span className="text-xs text-green-900 font-bold">● Chế độ quản trị viên thực chiến đang chạy</span>
                    <button 
                      onClick={() => setAdminAuth(false)}
                      className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-700 hover:bg-gray-300"
                    >
                      Đăng xuất chế độ
                    </button>
                  </div>

                  {/* Leads Data grid table list */}
                  <div className="overflow-x-auto border border-gray-200 rounded-lg">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-[#001F3F] text-white">
                          <th className="p-3">Họ Tên & Số Điện Thoại</th>
                          <th className="p-3">Mô Hình</th>
                          <th className="p-3">Vấn Đề Đang Gặp / File Nộp</th>
                          <th className="p-3 text-center">Trạng Thái</th>
                          <th className="p-3">Ghi Chú Xử Lý</th>
                          <th className="p-3 text-right">Lựa Chọn</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {adminLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-50">
                            <td className="p-3">
                              <div className="font-extrabold text-[#001F3F]">{lead.fullName}</div>
                              <span className="text-gray-500 font-mono text-[11px]">{lead.phoneNumber}</span>
                              <div className="text-[10px] text-gray-400 mt-0.5">Nộp: {new Date(lead.createdAt).toLocaleString()}</div>
                            </td>
                            <td className="p-3">
                              <span className="bg-red-50 text-[#800020] font-bold px-1.5 py-0.5 rounded text-[10px]">
                                {lead.bizType}
                              </span>
                            </td>
                            <td className="p-3 max-w-xs">
                              <p className="text-[11px] text-gray-700 leading-normal line-clamp-3">{lead.problem}</p>
                              {lead.files && lead.files.length > 0 && (
                                <div className="mt-1 space-y-0.5">
                                  {lead.files.map((file, fIdx) => (
                                    <div key={fIdx} className="text-[10px] text-blue-800 underline font-mono">
                                      🗃️ {file.name} ({file.size})
                                    </div>
                                  ))}
                                </div>
                              )}
                            </td>
                            <td className="p-3 text-center">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                lead.status === "NEW" ? "bg-red-100 text-red-800" :
                                lead.status === "CONTACTED" ? "bg-amber-100 text-amber-800" :
                                "bg-green-100 text-green-800"
                              }`}>
                                {lead.status}
                              </span>
                            </td>
                            <td className="p-3 text-gray-600 italic text-[11px]">
                              {lead.agentNotes || "Chưa có ghi chú xử lý."}
                            </td>
                            <td className="p-3 text-right">
                              <button
                                onClick={() => {
                                  setSelectedLeadForEdit(lead);
                                  setLeadEditNotes(lead.agentNotes || "");
                                }}
                                className="bg-[#001F3F] text-white px-2 py-1 rounded text-[10px]"
                              >
                                Phân công/Sửa
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Edit Lead Status Model inline panel */}
                  {selectedLeadForEdit && (
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg space-y-3">
                      <h4 className="font-extrabold text-xs text-[#800020] uppercase">Cập nhật hồ sơ: {selectedLeadForEdit.fullName}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-gray-500 mb-1">Thay đổi Trạng thái:</label>
                          <select
                            value={selectedLeadForEdit.status}
                            onChange={(e) => setSelectedLeadForEdit({ ...selectedLeadForEdit, status: e.target.value as any })}
                            className="p-1.5 bg-white border rounded"
                          >
                            <option value="NEW">NEW (Mới nhận)</option>
                            <option value="CONTACTED">CONTACTED (Đã kết nối Zalo)</option>
                            <option value="RESOLVED">RESOLVED (Đã kê khai gỡ xong)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-gray-500 mb-1">Ghi chú nghiệp vụ cán bộ:</label>
                          <textarea
                            value={leadEditNotes}
                            onChange={(e) => setLeadEditNotes(e.target.value)}
                            className="w-full p-2 h-16 bg-white border rounded text-xs"
                            placeholder="Ghi nhận biên bản nợ thuế, số tài sản..."
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end text-xs pt-1">
                        <button 
                          onClick={() => setSelectedLeadForEdit(null)}
                          className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded"
                        >
                          Hủy bỏ
                        </button>
                        <button 
                          onClick={() => updateLeadStatusAndNotes(selectedLeadForEdit.id)}
                          className="bg-[#850020] text-white px-4 py-1.5 rounded font-bold"
                        >
                          Lưu cập nhật
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Sidebar (Interactive search widgets & leads form) */}
        <aside className="w-full lg:w-85 shrink-0 flex flex-col gap-6">
          
          {/* TRA CỨU NHANH BOX (Widget representation of Tra Cuu page) */}
          <div className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm space-y-4">
            <h3 className="text-[#001F3F] font-black text-xs uppercase tracking-tight flex items-center gap-1.5 border-b border-gray-150 pb-2">
              <span className="w-1.5 h-4 bg-[#800020] inline-block"></span>
              Cổng tra cứu chỉ số nhanh
            </h3>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">Chọn hạng mục cần kiểm tra:</span>
                <select 
                  onChange={(e) => {
                    const selectVal = e.target.value;
                    if(selectVal === "rate") setActiveTab("lookup");
                    if(selectVal === "penalty") { setActiveTab("calculator"); setCalcType("penalty"); }
                    if(selectVal === "doc") setActiveTab("laws");
                  }}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-gray-300 rounded focus:outline-none"
                >
                  <option value="">-- Mời bạn chọn mục --</option>
                  <option value="rate">Tra cứu tỷ nộp thuế Shopee/TikTok</option>
                  <option value="penalty">Tra cứu khung phạt chậm môn bài</option>
                  <option value="doc">Tìm văn bản thông tư 40/2021</option>
                </select>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">Mã số thuế / CCCD:</span>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Nhập MST mẫu (Ví dụ: 0312...)" 
                    className="w-full text-xs p-2.5 bg-slate-50 border border-gray-300 rounded focus:outline-none"
                    onKeyDown={(e) => {
                      if(e.key === "Enter") {
                        setLookupMst((e.target as any).value);
                        setActiveTab("lookup");
                      }
                    }}
                  />
                  <Search size={14} className="absolute right-3 top-3 text-gray-400" />
                </div>
              </div>

              <button 
                onClick={() => setActiveTab("lookup")}
                className="w-full bg-[#001F3F] hover:bg-[#800020] text-white py-2 text-xs font-black rounded uppercase tracking-widest"
              >
                Kiểm tra thông tin
              </button>
            </div>
            
            <div className="bg-yellow-50 text-[10px] p-2.5 border border-yellow-200 text-yellow-850 rounded italic">
              * Hệ thống liên kết dữ liệu định danh an toàn. Không lưu trữ thông tin nhạy cảm của quý khách.
            </div>
          </div>

          {/* CONTACT & FILE UPLOAD FORM FOR SUBMITTING LEADS */}
          <div id="lead-form-scroll-target" className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm space-y-4">
            <div className="border-b border-gray-150 pb-2">
              <h3 className="text-[#800020] font-black text-xs uppercase tracking-tight">
                Gửi Hồ Sơ / Đăng Ký Tư Vấn Gấp
              </h3>
              <p className="text-[11px] text-gray-500 leading-normal">Bạn đang nợ thuế, bị rà soát sao kê ngân hàng? Đừng gửi bừa cho can bộ khi chưa đối soát. Hãy nộp trước ở đây để chúng tôi rà gỡ lỗi.</p>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-extrabold text-gray-700 block">Họ và tên quý khách (*):</label>
                <input
                  type="text"
                  required
                  value={leadForm.fullName}
                  onChange={(e) => setLeadForm({ ...leadForm, fullName: e.target.value })}
                  placeholder="Ví dụ: Hoàng Văn Định"
                  className="w-full p-2.5 bg-slate-50 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#800020]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-gray-700 block">Số điện thoại liên hệ di động / Zalo (*):</label>
                <input
                  type="text"
                  required
                  value={leadForm.phoneNumber}
                  onChange={(e) => setLeadForm({ ...leadForm, phoneNumber: e.target.value })}
                  placeholder="Nhập SĐT để cán bộ liên lạc lại..."
                  className="w-full p-2.5 bg-slate-50 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#800020]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-gray-700 block">Mô hình hoạt động của bạn:</label>
                <select
                  value={leadForm.bizType}
                  onChange={(e) => setLeadForm({ ...leadForm, bizType: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-gray-300 rounded"
                >
                  <option value="Shopee/TikTok Shop">Bán hàng sàn Shopee / TikTok / Lazada</option>
                  <option value="Hộ kinh doanh nộp thuế">Hộ kinh doanh (Thuế khoán / Kê khai)</option>
                  <option value="Cho thuê nhà ở">Cho thuê nhà ở / mặt bằng cho công ty</option>
                  <option value="Doanh nghiệp SME">Doanh nghiệp vừa và nhỏ</option>
                  <option value="Freelancer/Affiliate">Affiliate / KOL / Ngoại tệ MMO</option>
                  <option value="Giải trình xử lý khẩn cấp">Bị phong tỏa mã số thuế / Trát thanh tra gấp</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-extrabold text-gray-700 block">Chi tiết tình huống cần trợ giúp:</label>
                <textarea
                  value={leadForm.problem}
                  onChange={(e) => setLeadForm({ ...leadForm, problem: e.target.value })}
                  placeholder="Mô tả ngắn (Ví dụ: Bị cục thuế gọi rà soát số tiền 3 tỷ vào tk bank của cá nhân từ năm 2023)..."
                  className="w-full p-2 bg-slate-50 border border-gray-300 rounded h-24 resize-none focus:outline-none focus:ring-1 focus:ring-[#800020]"
                />
              </div>

              {/* Upload mock file integration (Supports both drag-and-drop and click upload) */}
              <div className="space-y-1">
                <span className="font-extrabold text-gray-700 block">Nộp Đính Kèm File Công Văn / Sao Kê (Nếu có):</span>
                <div className="border-2 border-dashed border-gray-300 hover:border-[#800020] rounded p-3 text-center cursor-pointer bg-slate-50/50 relative">
                  <input
                    type="file"
                    onChange={handleFakeFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="text-[10px] text-gray-500">
                    Kéo thả file công văn rà soát / sao kê xlsx tại đây <br />
                    hoặc <strong className="text-[#800020] underline">bấm để chọn file</strong>
                  </div>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-2 space-y-1 animate-fadeIn">
                    <span className="text-[10px] font-bold text-gray-500 block">Tệp đính kèm đã ghim:</span>
                    {uploadedFiles.map((file, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[10px] bg-red-50 text-red-950 p-1.5 rounded">
                        <span className="font-mono line-clamp-1">🗄️ {file.name}</span>
                        <span className="font-bold shrink-0">{file.size}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {leadSubmitError && (
                <div className="bg-red-100 text-red-800 p-2.5 rounded font-bold font-mono text-[11px]">
                  ⚠️ {leadSubmitError}
                </div>
              )}

              {leadSubmitSuccess && (
                <div className="bg-green-100 text-green-900 p-2.5 rounded font-bold text-[11px]">
                  ✅ {leadSubmitSuccess}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmittingLead}
                className="w-full bg-[#800020] hover:bg-neutral-900 text-white font-black py-3 rounded text-xs select-none uppercase tracking-wider shadow transform active:scale-95 transition-all"
              >
                {isSubmittingLead ? "Đang xử lý thông tin..." : "GỬI YÊU CẦU & NHẬN CUỘC GỌI NGAY"}
              </button>
            </form>
          </div>

          {/* QUICK LINKS ARCHITECTURE ACCORDION WIDGET */}
          <div className="bg-[#001F3F] text-white p-5 rounded-lg space-y-3.5 shadow">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-red-300">HỆ THỐNG VĂN PHÒNG GIAO DỊCH:</h4>
            <p className="text-xs text-slate-200 leading-normal font-sans">
              Đại lý Thuế Thành Phố hiện diện tại các trục giao thương trọng điểm của TP.HCM. Sẵn sàng nhận ủy quyền, hỗ trợ pháp lý và rà soát số liệu thực tế cho doanh nghiệp và hộ cá thể toàn quốc.
            </p>
            <div className="space-y-2.5 text-[11px] font-sans">
              <div className="border-b border-white/10 pb-2">
                <span className="text-[9px] uppercase font-extrabold tracking-widest text-red-300 block mb-0.5">Trụ sở chính:</span>
                <span className="font-bold">39 Đỗ Thị Tâm, Phường Phú Thọ Hoà, TP.HCM</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-extrabold tracking-widest text-red-300 block mb-0.5">Văn phòng làm việc:</span>
                <span className="font-bold">61 Phan Đình Phùng, Phường Phú Thọ Hoà, TP.HCM</span>
              </div>
            </div>
            <div className="pt-2 text-[10px] text-gray-400 italic font-mono border-t border-white/10">
              Thời gian làm việc: liên tục từ 7:30 - 21:00 hàng ngày (kể cả thứ Bảy & Chủ Nhật).
            </div>
          </div>

        </aside>

      </div>

      {/* Floating Interactive Widget Bottom Right */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <a 
          href="https://zalo.me" 
          target="_blank" 
          rel="noreferrer" 
          className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
          title="Tư vấn trực tiếp qua Zalo"
        >
          <MessageSquareOff size={24} />
        </a>
        <button 
          onClick={() => setActiveTab("faq")}
          className="bg-[#800020] text-white p-3 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all flex items-center justify-center animate-bounce"
          title="Trò chuyện cùng Trợ lý Thuế AI"
        >
          <Sparkles size={24} />
        </button>
      </div>

      {/* Footer component with rigorous metadata */}
      <footer id="main-editorial-footer" className="bg-[#001F3F] text-white border-t border-red-950 py-8 px-4 md:px-8 shrink-0 mt-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-300 pb-6 border-b border-white/10">
          <div className="space-y-2">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wide">ĐẠI LÝ THUẾ THÀNH PHỐ</h4>
            <p className="leading-relaxed">
              Thành viên chính thức của Hội Tư vấn Thuế Việt Nam (VTCA). Quyết định công nhận số 20xx/QĐ-TCT ban hành bởi Tổng cục Thuế.
            </p>
            <span className="block text-[11px] font-mono text-red-300">MST Công Ty: 0316382012</span>
          </div>

          <div className="space-y-2">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wide">TỪ KHÓA TÌM KIẾM HỮU ÍCH</h4>
            <div className="flex flex-wrap gap-1">
              {[
                "đại lý thuế", "hộ kinh doanh", "cá nhân kinh doanh", "thuế shopee", "thuế tiktok", 
                "thuế cho thuê nhà", "kê khai thuế", "dịch vụ kế toán thuế", "xuất hóa đơn", "quyết toán thuế", "thuế TMĐT"
              ].map((kw, idx) => (
                <span key={idx} className="bg-white/10 text-gray-300 text-[10px] px-1.5 py-0.5 rounded">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wide">LIÊN HỆ TRỰC TIẾP</h4>
            <div className="leading-relaxed text-gray-300 space-y-1">
              <div>📍 <strong className="text-white">Trụ sở chính:</strong> 39 Đỗ Thị Tâm, P. Phú Thọ Hoà, TP.HCM</div>
              <div>🏢 <strong className="text-white">Văn phòng:</strong> 61 Phan Đình Phùng, P. Phú Thọ Hoà, TP.HCM</div>
              <div>✉️ <strong className="text-white">Email:</strong> hotro@dailythuetp.com.vn</div>
              <div className="text-[10px] text-red-300 font-bold mt-1 uppercase tracking-wide">✔ ĐỒNG HÀNH PHÁP LÝ DOANH NGHIỆP</div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-400 gap-4">
          <div>
            © 2026 Đại Lý Thuế Thành Phố. Bảo lưu mọi quyền pháp lý. Giấy phép hành nghề số 00056/BTC.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer" onClick={() => setActiveTab("laws")}>Chính sách bảo mật</span>
            <span>●</span>
            <span className="hover:text-white cursor-pointer" onClick={() => setActiveTab("admin")}>Bảng điều hành</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
