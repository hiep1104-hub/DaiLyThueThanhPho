/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceDetail, LegalDoc, PracticalGuide, CaseStudy, QuickAnswerFAQ } from "../types";

export const SERVICES_DATA: ServiceDetail[] = [
  // A. HỘ KINH DOANH
  {
    id: "dk-hkd",
    title: "Đăng ký thành lập Hộ kinh doanh",
    group: "HKD",
    shortDesc: "Đăng ký giấy phép kinh doanh liên thông mã số thuế hộ và kích hoạt chữ ký số, hóa đơn điện tử chỉ trong 3 ngày.",
    targetUser: "Cá nhân khởi nghiệp, chủ cửa hàng, quán ăn, xưởng sản xuất nhỏ có nhu cầu pháp lý hóa hoạt động chuyên nghiệp.",
    documentsNeeded: [
      "Ảnh chụp CCCD của chủ hộ còn hiệu lực.",
      "Hợp đồng thuê địa điểm hoạt động hoặc Giấy chứng nhận quyền sở hữu đất.",
      "Thông tin về ngành nghề kinh doanh và vốn dự kiến."
    ],
    processSteps: [
      "Bước 1: Tiếp nhận CCCD và tư vấn lựa chọn mã ngành nghề tối ưu theo hệ thống phân ngành mới.",
      "Bước 2: Soạn hồ sơ đăng ký thành lập liên thông ĐKKD và đăng ký thuế theo Nghị định 141/2026/NĐ-CP.",
      "Bước 3: Nộp hồ sơ trực tuyến qua Cổng thông tin quốc gia về đăng ký doanh nghiệp/hợp tác xã/hộ kinh doanh.",
      "Bước 4: Nhận Giấy chứng nhận đăng ký hộ kinh doanh điện tử (hoặc bản giấy). Được MIỄN 100% lệ phí theo Thông tư 152/2025/TT-BTC khi nộp qua mạng.",
      "Bước 5: Kê khai các tờ khai thiết lập ban đầu và đăng ký tài khoản thuế điện tử Thuedientu.gdt.gov.vn."
    ],
    duration: "1 - 3 ngày làm việc",
    faq: [
      { q: "Lệ phí đăng ký hộ kinh doanh từ năm 2026 quy định thế nào?", a: "Theo Thông tư 152/2025/TT-BTC, lệ phí đăng ký thành lập mới hộ kinh doanh ghi nhận là 100.000 đồng/lần khi làm bản giấy trực tiếp, nhưng được MIỄN 100% khi thực hiện qua mạng điện tử (online)." },
      { q: "Hộ kinh doanh có bắt buộc khắc dấu tròn không?", a: "Không, hộ kinh doanh không có tư cách pháp nhân nên không dùng con dấu tròn pháp lý của Bộ Công An, mà chỉ dùng con dấu vuông của hộ chứa Mã số thuế, Tên hộ, Địa chỉ để giao dịch hay xuất hóa đơn." },
      { q: "Mở hộ kinh doanh xong chưa hoạt động có phải nộp thuế không?", a: "Trong vòng 30 ngày kể từ ngày cấp giấy phép, bạn phải nộp tờ khai lệ phí môn bài. Trách nhiệm nộp thuế chỉ phát sinh khi có doanh thu thực tế và vượt ngưỡng miễn thuế 200 triệu đồng/năm." }
    ]
  },
  {
    id: "thue-kekhai-hkd",
    title: "Dịch vụ Kê Khai Thuế theo Thông tư 88",
    group: "HKD",
    shortDesc: "Xây dựng hệ thống sổ sách kế toán mẫu, lập và nộp tờ khai thuế điện tử theo Thông tư 88/2021/TT-BTC chuyên nghiệp thay thế hoàn toàn cho thuế khoán bị bãi bỏ.",
    targetUser: "Hộ kinh doanh bắt buộc chuyển từ phương pháp thuế khoán sang kê khai sổ sách kế toán từ ngày 01/01/2026.",
    documentsNeeded: [
      "Giấy đăng ký kinh doanh và mã số thuế hộ.",
      "Bộ hóa đơn VAT đầu ra và hóa đơn, chứng từ mua hàng đầu vào.",
      "Chữ ký số (Token/Cloud) riêng của hộ kinh doanh."
    ],
    processSteps: [
      "Bước 1: Khảo sát dòng tiền bán hàng, hướng dẫn bóc tách tài khoản kinh doanh với chi tiêu cá nhân.",
      "Bước 2: Đăng ký sử dụng hóa đơn điện tử có mã của cơ quan thuế theo mẫu 01/ĐKTĐ-HĐĐT.",
      "Bước 3: Thiết lập và ghi chép 5 mẫu sổ kế toán (Sổ doanh thu, Sổ vật liệu, Sổ lương, Sổ tiền mặt, Sổ chi tiết bán hàng) theo đúng Thông tư 88/2021/TT-BTC.",
      "Bước 4: Đại diện làm việc, giải trình số liệu trực tiếp với Chi cục Thuế Quận/Huyện định kỳ hàng quý."
    ],
    duration: "Thực hiện định kỳ hàng quý hoặc đại diện xử lý trong 7 ngày",
    faq: [
      { q: "Hội kinh doanh kê khai có bắt buộc không?", a: "Từ ngày 01/01/2026, phương pháp thuế khoán đã chính thức bãi bỏ hoàn toàn cho các hộ kinh doanh. Tất cả các hộ kinh doanh phát sinh buộc phải áp dụng phương pháp Kê khai theo Thông tư 88, có mở đủ 5 loại sổ kế toán và sử dụng hoá đơn điện tử." },
      { q: "Doanh thu dưới bao nhiêu thì được miễn nộp thuế?", a: "Theo quy định mới nhất từ năm 2026, doanh thu kinh doanh dưới 200 triệu đồng/năm thuộc diện miễn thuế GTGT và thuế TNCN (trước đây là dưới 100 triệu đồng/năm)." }
    ]
  },
  {
    id: "hddt-hkd",
    title: "Mua & Xuất hóa đơn hóa điện tử",
    group: "HKD",
    shortDesc: "Kích hoạt hóa đơn điện tử có mã của cơ quan thuế, mua hóa đơn lẻ tại cơ quan thuế cho hộ khoán.",
    targetUser: "Các hộ kinh doanh cần xuất hóa đơn tài chính bàn giao cho khách hàng doanh nghiệp hoặc dự thầu.",
    documentsNeeded: [
      "CCCD chủ hộ và chữ ký số token hoặc chữ ký số từ xa.",
      "Hợp đồng kinh tế chứng minh hoạt động bán hàng dịch vụ.",
      "Mẫu đăng ký sử dụng hóa đơn mẫu 01/ĐKTĐ-HĐĐT."
    ],
    processSteps: [
      "Bước 1: Đăng ký tạo tài khoản xuất hóa đơn độc lập cho hộ trên trang Thuedientu.",
      "Bước 2: Hỗ trợ lựa chọn nhà cung cấp HĐĐT (Viettel, VNPT, BKAV, MISA) rẻ và dễ dùng nhất.",
      "Bước 3: Lập tờ khai 01/ĐKTĐ-HĐĐT để được cơ quan thuế chấp thuận cấp mã.",
      "Bước 4: Hướng dẫn viết hóa đơn chuẩn dòng tiền, tránh bị bác chi phí."
    ],
    duration: "24 giờ để kích hoạt xong",
    faq: [
      { q: "Hộ khoán có tự xuất hóa đơn điện tử liên tục được không?", a: "Không. Hộ khoán muốn xuất hóa đơn phải nộp đơn đề nghị cấp hóa đơn điện tử theo từng lần phát sinh lên Chi cục Thuế và nộp thuế trước 1.5% - 7% tùy ngành nghề." }
    ]
  },
  {
    id: "giai-trinh-doanhthugd",
    title: "Giải trình doanh thu & Thỏa thuận định mức",
    group: "HKD",
    shortDesc: "Đại tu hồ sơ, đối thoại cùng Chi cục Thuế để bảo vệ định mức doanh thu hợp lý, tránh bị ép thuế.",
    targetUser: "Hộ kinh doanh đang bị rà soát tăng doanh thu khoán đột biến hoặc bị nghi ngờ trốn thuế qua tài khoản cá nhân.",
    documentsNeeded: [
      "Sao kê ngân hàng tài khoản cá nhân của chủ hộ thu tiền khách hàng.",
      "Bản chụp mặt bằng, hợp đồng thuê nhà và chi phí nhân công thực tế.",
      "Thông báo giải trình rà soát từ Chi cục Thuế kiểm tra."
    ],
    processSteps: [
      "Bước 1: Rà soát tổng tiền dòng tiền đi qua các tài khoản ngân hàng của chủ hộ và phân loại tiền cá nhân vs tiền bán hàng.",
      "Bước 2: Chuẩn bị bảng kê bóc tách doanh thu thực tế, chi phí đầu vào phục vụ kinh doanh.",
      "Bước 3: Soạn văn bản giải trình chi tiết về năng lực hoạt động và quy mô kinh doanh.",
      "Bước 4: Đại lý thuế đại diện trực tiếp làm việc với Kiểm tra viên xử lý."
    ],
    duration: "5 - 10 ngày làm việc",
    faq: [
      { q: "Làm sao phân tách tiền cá nhân nợ nần với tiền bán hàng trên sao kê?", a: "Đại lý thuế có nghiệp vụ bóc tách, đối chiếu mã giao dịch, cam kết dòng tiền không phải bán hàng bằng các chứng từ vay mượn, tặng cho, bán tài sản cá nhân." }
    ]
  },

  // B. CÁ NHÂN KINH DOANH
  {
    id: "thue-ban-tmdt",
    title: "Khai và quyết toán Thuế Shopee, TikTok, Lazada",
    group: "CNKD",
    shortDesc: "Tối ưu bóc tách doanh thu, chiết khấu và đối soát dòng tiền đa sàn để quyết toán nghĩa vụ thuế thương mại điện tử chuẩn xác nhất.",
    targetUser: "Chủ shop bán hàng online, thương hiệu thời trang, mỹ phẩm gia dụng vận hành mô hình kinh doanh trên các sàn TMĐT.",
    documentsNeeded: [
      "File tổng hợp số liệu doanh thu từ Trung tâm người bán Shopee/TikTok/Lazada.",
      "Sao kê ngân hàng liên kết nhận tiền rút sàn.",
      "Mã số thuế cá nhân của chủ gian hàng."
    ],
    processSteps: [
      "Bước 1: Xuất dữ liệu kế toán chuẩn từ các sàn (doanh thu chưa trừ chiết khấu sàn, phí vận chuyển...).",
      "Bước 2: Bóc tách phí sàn để tính đúng doanh thu tính thuế (do doanh thu tính thuế là giá bán đến tay khách hàng trước khi trừ phí sàn).",
      "Bước 3: Lập hồ sơ đăng ký mã số thuế phụ thu cho TMĐT (nếu chưa có) và kê khai tờ khai mẫu 01/CNKD.",
      "Bước 4: Nộp tiền thuế online trực tiếp để hoàn tất thanh tra sàn."
    ],
    duration: "3 - 7 ngày làm việc",
    faq: [
      { q: "Sàn TMĐT có trừ thuế trực tiếp không?", a: "Được chia làm 2 loại rõ rệt theo quy định: 1. Có thanh toán qua sàn (như Shopee, TikTok Shop,...): Sàn thực hiện kê khai và nộp thuế thay (nộp thuế dùm), hộ/cá nhân bán hàng không cần phải tự khai thuế hàng tháng/quý và cuối năm quyết toán thuế. 2. Không thanh toán qua sàn (như quảng cáo Facebook, tự thỏa thuận COD, chuyển khoản trực tiếp bên ngoài hệ thống thanh toán của sàn): Người kinh doanh bắt buộc tự kê khai và quyết toán thuế theo quy định hàng tháng, hàng quý." },
      { q: "Doanh thu tính thuế là tiền nhận về bank hay tổng của khách thanh toán?", a: "Doanh thu tính thuế là tổng tiền khách thanh toán cho đơn hàng thành công, không tính phí ship của khách nhưng bao gồm tiền giảm giá sàn tài trợ." }
    ]
  },
  {
    id: "thue-kol-koc",
    title: "Thuế Affiliate, KOL, KOC & Freelancer",
    group: "CNKD",
    shortDesc: "Kê khai hoàn thuế TNCN khấu trừ 10%, quyết toán giảm trừ gia cảnh cho cá nhân nhận tiền từ Google, Youtube, mạng lưới đa kênh.",
    targetUser: "Content Creator, YouTuber, Tiktoker làm tiếp thị liên kết, nhận hoa hồng từ Google, Shopee, các Network lớn.",
    documentsNeeded: [
      "Chứng từ khấu trừ thuế TNCN 10% từ đơn vị trả thu nhập.",
      "Sao kê ngân hàng nhận tiền từ Google Adsense, Shopee Affiliate.",
      "Thư điện tử xác nhận từ các đối tác nước ngoài."
    ],
    processSteps: [
      "Bước 1: Thu thập toàn bộ chứng từ khấu trừ thuế 10% của các nhãn hàng/mạng lưới rải rác trong năm.",
      "Bước 2: Định biên thu nhập từ nước ngoài (mức thuế GTGT 3% và TNCN 2% đối với dịch vụ online).",
      "Bước 3: Lập tờ khai quyết toán thuế TNCN cả năm.",
      "Bước 4: Thực hiện gửi hồ sơ đăng ký hoàn thuế nếu số thuế nộp thừa cao hơn nghĩa vụ."
    ],
    duration: "10 - 15 ngày làm việc theo lịch hẹn cơ quan thuế",
    faq: [
      { q: "Nhận tiền Google Adsense nộp thuế bao nhiêu phần trăm?", a: "Thu nhập từ quảng cáo của Google/Facebook được phân loại là Thu nhập từ kinh doanh dịch vụ thông tin. Thuế suất là 7% gồm: 5% thuế GTGT và 2% thuế TNCN." }
    ]
  },

  // C. CHO THUÊ TÀI SẢN
  {
    id: "thue-cho-thue-nha",
    title: "Thuế cho thuê Nhà, Mặt bằng, Căn hộ",
    group: "CTTS",
    shortDesc: "Kê khai thuế cho thuê nhà trọn gói, xử lý các hồ sơ cho công ty thuê cần xuất hóa đơn tài chính khấu trừ.",
    targetUser: "Chủ hộ có nhà cho thuê làm văn phòng, thuê mặt bằng kinh doanh, chung cư, phòng trọ doanh thu trên 200tr/năm.",
    documentsNeeded: [
      "Hợp đồng cho thuê tài sản (hợp đồng thuê nhà).",
      "Giấy chứng nhận quyền sở hữu nhà (Sổ đỏ, Sổ hồng) bản photo.",
      "CCCD chủ nhà và MST cá nhân chủ nhà."
    ],
    processSteps: [
      "Bước 1: Đánh giá hợp đồng thuê: ai là người nộp thuế (chủ nhà hay bên thuê nộp thay).",
      "Bước 2: Lập tờ khai mẫu 01/TTS nộp lên Chi cục thuế nơi có bất động sản tọa lạc.",
      "Bước 3: Đăng ký mã số thuế cho thuê tài sản riêng biệt cho căn hộ thuê.",
      "Bước 4: Nhận thông báo nộp thuế, nộp ngân sách nhà nước lấy biên lai xuất hóa đơn nếu công ty yêu cầu."
    ],
    duration: "2 - 3 ngày làm việc",
    faq: [
      { q: "Nhà cho thuê dưới 200 triệu/năm có phải nộp thuế không?", a: "Không, miễn thuế hoàn toàn cả GTGT và TNCN từ năm 2026. Nhưng nếu có từ 2 căn trở lên, tổng doanh thu cộng dồn vượt 200 triệu/năm vẫn phải đóng thuế cho toàn bộ." },
      { q: "Giá cho thuê nhà tính thuế gồm phí quản lý hay chưa?", a: "Tính trên tổng số tiền ghi trên hợp đồng kinh tế nhận về thực tế." }
    ]
  },

  // D. DOANH NGHIỆP
  {
    id: "ketoan-thue-dn",
    title: "Kế toán Thuế trọn gói cho Doanh nghiệp nhỏ",
    group: "DN",
    shortDesc: "Dịch vụ báo cáo thuế hàng tháng, kế toán nội bộ tối ưu hóa chi phí hợp lý một cách an toàn nhất.",
    targetUser: "Doanh nghiệp vừa và nhỏ (SMEs), công ty khởi nghiệp không muốn nuôi bộ máy kế toán riêng đắt đỏ.",
    documentsNeeded: [
      "Hóa đơn mua vào - bán ra (file XML/PDF).",
      "Sao kê ngân hàng tài khoản công ty.",
      "Chữ ký số Token USB hoặc chữ ký số Cloud."
    ],
    processSteps: [
      "Bước 1: Tiếp nhận hóa đơn mua vào bán ra định kỳ hàng tháng/hàng quý.",
      "Bước 2: Kiểm tra tính pháp lý của hóa đơn đầu vào, cảnh báo hóa đơn của doanh nghiệp bỏ trốn.",
      "Bước 3: Thiết lập tờ khai VAT, báo cáo tình hình sử dụng hóa đơn, thuế TNCN tạm tính.",
      "Bước 4: Hoàn thiện sổ sách kế toán, lập Báo cáo tài chính cuối năm và Tờ khai quyết toán Thuế thu nhập doanh nghiệp (TNDN)."
    ],
    duration: "Duy trì hoạt động liên tục hàng tháng",
    faq: [
      { q: "Công ty không có phát sinh mua bán có phải nộp tờ khai không?", a: "Có, vẫn bắt buộc nộp tờ khai thuế trắng hàng quý, nếu nộp chậm sẽ bị xử phạt vi phạm hành chính nặng." }
    ]
  },

  // E. DỊCH VỤ XỬ LÝ
  {
    id: "xu-ly-truy-thu",
    title: "Giải trình vi phạm & Khắc phục rủi ro Truy thu thuế",
    group: "XL",
    shortDesc: "Gỡ rối các vụ án truy thu bất ngờ do thanh tra tài khoản ngân hàng, xử phạt hóa đơn phi pháp hoặc rà soát thuế TMĐT lùi nhiều năm.",
    targetUser: "Cá nhân kinh doanh, chủ doanh nghiệp nhận trát thanh tra, bị phong tỏa tài khoản ngân hàng do chậm nộp hoặc nghi vấn sai phạm hóa đơn.",
    documentsNeeded: [
      "Quyết định thanh tra/kiểm tra thuế hoặc biên bản rà soát.",
      "Sao kê ngân hàng của toàn bộ các tài khoản liên quan.",
      "Giải trình sơ bộ đã nộp cho chi cục thuế trước đó (nếu có)."
    ],
    processSteps: [
      "Bước 1: Tiếp nhận văn bản thanh tra, phân tích mức độ nghiêm trọng và khoanh vùng số liệu chịu phạt.",
      "Bước 2: Rà soát lại hồ sơ kế toán thực tế, tìm ra nguyên nhân và lý lẽ pháp luật bảo vệ.",
      "Bước 3: Soạn công văn giải trình thực tế mang tính thực chiến, chứng minh không cố ý vi phạm.",
      "Bước 4: Tham gia trực tiếp các buổi làm việc tại cơ quan thuế cùng khách hàng để thống nhất biên bản tối ưu nhất.",
      "Bước 5: Hướng dẫn đóng phạt chậm nộp và khôi phục hoạt động mã số thuế bị khóa."
    ],
    duration: "5 - 15 ngày làm việc liên tục",
    faq: [
      { q: "Thời hiệu truy thu thuế đối với trốn thuế là bao lâu?", a: "Đối với hành vi trốn thuế chưa đến mức truy cứu trách nhiệm hình sự, thời hạn truy thu thuế là 10 năm kể từ ngày phát sinh vi phạm." },
      { q: "Có giảm mức phạt trốn thuế xuống mức phạt chậm nộp được không?", a: "Có thể nếu chứng minh được sai lầm vô lý không chủ ý, kê khai bổ sung trước khi công bố quyết định thanh tra hành chính." }
    ]
  },
  {
    id: "cuong-che-thue",
    title: "Gỡ Cưỡng chế nợ thuế & Khôi phục Mã số thuế",
    group: "XL",
    shortDesc: "Can thiệp giải tỏa các quyết định cưỡng chế trích tài khoản ngân hàng, quyết định ngừng sử dụng hóa đơn, khôi phục mã số thuế bị đình chỉ để phục hồi khẩn cấp giao dịch của doanh nghiệp.",
    targetUser: "Doanh nghiệp hoặc cá nhân kinh doanh đang bị cơ quan thuế cưỡng chế trích tài khoản ngân hàng hoặc đình chỉ dùng hóa đơn do nợ thuế quá hạn.",
    documentsNeeded: [
      "Quyết định cưỡng chế hành chính về thuế (mẫu 01/CC hoặc tương đương).",
      "Bảng đối chiếu tình hình thực hiện nghĩa vụ nộp ngân sách nhà nước.",
      "Đơn đề nghị xin phân kỳ nộp dần tiền nợ thuế (nếu có)."
    ],
    processSteps: [
      "Bước 1: Rà soát tính chính xác của số nợ bị cưỡng chế (kiểm tra sai lệch tờ khai thuế, tiền chậm nộp).",
      "Bước 2: Lập hồ sơ xin phân kỳ nộp dần nợ thuế (trả góp nợ thuế tối đa 12 tháng) có bảo lãnh của tổ chức tín dụng theo Điều 134 Luật Quản lý Thuế.",
      "Bước 3: Đại diện làm việc trực tiếp với Đội kiểm tra thuế/Chi cục Thuế sở tại để xin tạm hoãn cưỡng chế ngừng sử dụng hóa đơn.",
      "Bước 4: Hướng dẫn nộp tiền đợt đầu theo lộ trình cam kết và nhận văn bản chấp thuận khôi phục mã số thuế / chấm dứt hiệu lực cưỡng chế hóa đơn trong vòng 24-48 giờ."
    ],
    duration: "2 - 5 ngày làm việc",
    faq: [
      { q: "Bị cưỡng chế nợ thuế thì tài khoản ngân hàng bị khóa bao lâu?", a: "Tài khoản ngân hàng sẽ bị phong tỏa cho đến khi doanh nghiệp nộp đủ tiền thuế nợ hoặc có văn bản giải tỏa cưỡng chế chính thức từ Chi cục Thuế gửi cho Ngân hàng." },
      { q: "Nợ thuế bao lâu thì dính cưỡng chế ngừng sử dụng hóa đơn?", a: "Trường hợp quá 90 ngày kể từ ngày hết thời hạn nộp thuế quy định mà người nộp thuế không tự nguyện nộp, Cơ quan thuế sẽ ban hành quyết định cưỡng chế ngừng sử dụng hóa đơn." }
    ]
  },
  {
    id: "khoa-hoa-don",
    title: "Xử lý Thông báo ngừng phát hành & Đình chỉ sử dụng hóa đơn",
    group: "XL",
    shortDesc: "Giải trình khôi phục quyền xuất hóa đơn điện tử bị đình chỉ do doanh nghiệp không hoạt động tại địa chỉ đăng ký, hoặc rủi ro hóa đơn từ các doanh nghiệp rủi ro cao bỏ trốn.",
    targetUser: "Các doanh nghiệp SME nhận thông báo ngừng sử dụng hóa đơn từ chi cục thuế, hoặc bị rà soát giải trình hóa đơn đầu vào bất hợp pháp.",
    documentsNeeded: [
      "Thông báo đình chỉ/ngừng sử dụng hóa đơn của Cơ quan Thuế.",
      "Hồ sơ chứng minh hoạt động thực tế tại trụ sở (Biển hiệu, hợp đồng thuê văn phòng, ảnh chụp và bảng lương nhân viên).",
      "Bảng kê và chứng từ giải trình chi tiết về nguồn gốc hàng hóa dịch vụ đầu vào bị nghi vấn."
    ],
    processSteps: [
      "Bước 1: Khảo sát hiện trạng trụ sở, làm hồ sơ chứng minh doanh nghiệp hoạt động thực tế theo quy định Luật Doanh nghiệp.",
      "Bước 2: Soạn hồ sơ giải trình chi tiết về nguồn gốc hàng hóa dịch vụ đầu vào (chứng từ giao nhận, thanh toán qua ngân hàng, hợp đồng kinh tế và chứng từ vận chuyển).",
      "Bước 3: Đăng ký nộp tờ khai điều chỉnh thông tin đăng ký thuế (Mẫu 08-MST) nếu có sự thay đổi thông tin địa chỉ.",
      "Bước 4: Đại diện làm việc với Tổ kiểm tra Chi cục Thuế, thực hiện thủ tục xác minh trụ sở và khôi phục trạng thái hoạt động bình thường của hóa đơn trên cổng thông tin hóa đơn điện tử Tổng cục Thuế."
    ],
    duration: "3 - 5 ngày làm việc",
    faq: [
      { q: "Hóa đơn đầu vào dính công ty bỏ trốn có bị phạt trốn thuế?", a: "Nếu chứng minh được giao dịch phát sinh mua bán có thật, đầy đủ chứng từ chuyển khoản ngân hàng, biên gửi nhận hàng hóa thực tế công ty chỉ bị loại chi phí và không được khấu trừ thuế VAT chứ không bị khép tội trốn thuế." },
      { q: "Làm thế nào để kiểm tra tính hợp lệ của doanh nghiệp xuất hóa đơn?", a: "Sử dụng cổng tra cứu Trạng thái hóa đơn điện tử của Tổng cục Thuế để kiểm tra xem MST của doanh nghiệp bán có đang hoạt động hay đã tạm ngừng/bỏ trốn." }
    ]
  },
  {
    id: "giai-trinh-heso-k",
    title: "Giải trình Cảnh báo Hệ số K (Chênh lệch doanh thu & Hóa đơn)",
    group: "XL",
    shortDesc: "Đối chiếu và lập hồ sơ giải trình sai lệch chỉ số K (hệ số vượt ngưỡng hóa đơn điện tử mua vào/bán ra hoặc biên lợi nhuận danh định) trên hệ thống phân tích rủi ro tự động của Tổng cục Thuế.",
    targetUser: "Doanh nghiệp nhận được quyết định/thông báo rà soát yêu cầu giải trình chênh lệch hệ số K vượt ngưỡng an toàn.",
    documentsNeeded: [
      "Công văn yêu cầu giải trình hệ số K từ Cơ quan Thuế.",
      "Báo cáo chi tiết bảng kê hóa đơn điện tử mua vào, bán ra trong kỳ rà soát.",
      "Thuyết minh chu kỳ tồn kho, đặc thù sản xuất kinh doanh của ngành hàng."
    ],
    processSteps: [
      "Bước 1: Kết xuất dữ liệu hóa đơn điện tử từ cổng đối soát rủi ro để tính toán chính xác chỉ số K thực tế của doanh nghiệp.",
      "Bước 2: Phân tích nguyên nhân chênh lệch hệ số K (do lượng hàng tồn kho cao, nhận hóa đơn chậm từ nhà cung cấp, hoặc chu kỳ sản xuất dài ngày).",
      "Bước 3: Lập bảng kê chi tiết và soạn tờ trình giải trình kỹ thuật thuyết phục, chứng minh các giao dịch đúng bản chất kinh tế thực tế.",
      "Bước 4: Nộp tờ trình giải trình hệ số K trực tiếp lên Chi cục Thuế để xóa bỏ trạng thái cảnh báo đỏ trên hệ thống rủi ro phân tích."
    ],
    duration: "3 - 7 ngày làm việc",
    faq: [
      { q: "Hệ số K của doanh nghiệp bao nhiêu là an toàn?", a: "Tùy thuộc vào mã ngành đăng ký kinh doanh. Tổng cục Thuế áp dụng hệ số cảnh báo rủi ro K dựa trên sự bất thường đột biến sơ bộ so với tỷ suất biên lợi nhuận gộp của ngành." },
      { q: "Quá thời hạn giải trình hệ số K thì bị xử lý thế nào?", a: "Doanh nghiệp có thể bị đưa vào danh sách kiểm tra thuế tại trụ sở, hoặc bị cơ quan thuế tạm dừng truyền nhận dữ liệu hóa đơn điện tử." }
    ]
  },
  {
    id: "quyet-toan-dn-bhxh",
    title: "Tối ưu hóa Quyết toán Thuế & Bảo hiểm xã hội Doanh nghiệp",
    group: "DN",
    shortDesc: "Đại diện ký tá sổ sách kế toán, dọn dẹp hệ thống sổ sách rác, cân đối dòng lương thông minh để tối ưu hóa mức đóng BHXH và bảo vệ chi phí hợp lý của doanh nghiệp.",
    targetUser: "Chủ doanh nghiệp SME cần rà quét loại bỏ rủi ro trước khi có quyết định thanh tra thanh toán thực tế, hoặc tối ưu cơ cấu lương đóng bảo hiểm xã hội bắt buộc.",
    documentsNeeded: [
      "Báo cáo tài chính, tờ khai quyết toán thuế TNDN, TNCN các năm chưa thanh tra.",
      "Danh sách lao động đóng Bảo hiểm xã hội và bảng lương thực tế chi trả.",
      "Hợp đồng lao động, quy chế tài chính nội bộ công ty."
    ],
    processSteps: [
      "Bước 1: Rà soát chênh lệch giữa bảng lương kê khai tính thuế TNDN với bảng lương nộp BHXH để tránh bị cơ quan BHXH phạt liên thông đối chiếu dữ liệu.",
      "Bước 2: Phục dựng và tối ưu lại cơ cấu lương thông minh (lương cơ bản đóng bảo hiểm xã hội thấp, kết hợp phụ cấp miễn đóng và hỗ trợ chế độ phúc lợi hợp lý).",
      "Bước 3: Rà soát toàn diện hóa đơn đầu vào đầu ra, dọn dẹp hệ thống sổ sách kế toán, bóc tách rủi ro sẵn sàng đón đoàn thanh tra quyết toán.",
      "Bước 4: Ký hợp đồng dịch vụ làm việc trực tiếp, thay mặt doanh nghiệp giải trình toàn bộ số liệu quyết toán trước cán bộ cơ quan kiểm tra."
    ],
    duration: "Thiết kế lộ trình trong 7-10 ngày, đại diện trọn đời",
    faq: [
      { q: "Cơ quan thuế có đối chiếu dữ liệu đóng bảo hiểm xã hội với chi phí lương?", a: "Có, hiện nay hệ thống Tổng cục Thuế và Bảo hiểm xã hội liên thông dữ liệu chặt chẽ. Mọi sự chênh lệch lớn về số người lao động và quỹ lương giữa quyết toán thuế TNCN và biểu mẫu BHXH đều bị tự động cảnh báo kiểm tra." },
      { q: "Làm thế nào để đưa phụ cấp vào lương mà không phải đóng BHXH?", a: "Cần xây dựng quy chế lương rõ rệt phân tách các khoản phụ cấp đúng Luật Lao động như: phụ cấp đi lại, điện thoại, ăn trưa, hỗ trợ nuôi con nhỏ... các khoản này không tính vào quỹ lương đóng BHXH bắt buộc." }
    ]
  }
];

export const LEGAL_DOCS_DATA: LegalDoc[] = [
  {
    id: "nd141-2026",
    category: "NghiDinh",
    number: "Nghị định 141/2026/NĐ-CP",
    title: "Quy định về đăng ký hợp tác xã, liên hiệp hợp tác xã, hộ kinh doanh",
    year: 2026,
    field: "ĐKKD Hộ kinh doanh & HTX",
    summary: "Xác lập cơ chế đăng ký kinh doanh liên thông đăng ký thuế, rút ngắn thời gian chuẩn bị hồ sơ và hỗ trợ hoàn toàn việc đăng ký điện tử cho hộ kinh doanh.",
    contentBullets: [
      "Quy chế liên thông điện tử hoàn toàn thủ tục đăng ký kinh doanh với đăng ký thuế đối với hộ kinh doanh.",
      "Cho phép cấp Giấy chứng nhận đăng ký hộ kinh doanh dưới dạng điện tử có giá trị pháp lý tương đương bản giấy.",
      "Rút ngắn quy trình giải quyết đăng ký mới, thay đổi nội dung đăng ký, tạm ngừng, hoặc giải thể hộ kinh doanh."
    ],
    downloadUrl: "#"
  },
  {
    id: "tt152-2025",
    category: "ThongTu",
    number: "Thông tư 152/2025/TT-BTC",
    title: "Quy định về mức thu, chế độ thu, nộp, quản lý lệ phí đăng ký hộ kinh doanh, hợp tác xã",
    year: 2025,
    field: "Lệ phí Đăng ký",
    summary: "Thông tư của Bộ Tài chính quy định chi tiết mức lệ phí khi đăng ký hộ kinh doanh, đặc biệt là chính sách miễn lệ phí khi đăng ký online.",
    contentBullets: [
      "Quy định lệ phí đăng ký hộ kinh doanh trực tiếp là 100.000 đồng/lần đăng ký mới (trước đây là 100.000đ theo quy định địa phương cũ).",
      "MIỄN 100% lệ phí đăng ký đối với trường hợp đăng ký qua mạng thông tin điện tử trực tuyến.",
      "Quy chế thu, nộp và quản lý sử dụng nguồn thu lệ phí đăng ký giữa các cơ quan đăng ký kinh doanh cấp huyện."
    ],
    downloadUrl: "#"
  },
  {
    id: "tt40-2021",
    category: "ThongTu",
    number: "Thông tư 40/2021/TT-BTC",
    title: "Hướng dẫn thuế giá trị gia tăng và thuế thu nhập cá nhân đối với hộ kinh doanh, cá nhân kinh doanh",
    year: 2021,
    field: "Hộ kinh doanh & Cá nhân",
    summary: "Vavan bản xương sống hướng dẫn cách tính thuế của tất cả hộ kinh doanh, cá nhân bán hàng online, thương mại điện tử và cho thuê nhà.",
    contentBullets: [
      "Quy định rõ cá nhân có doanh thu từ kinh doanh dưới 200 triệu đồng/năm (theo cập nhật mới nhất) thuộc diện không phải nộp thuế GTGT và TNCN.",
      "Chi tiết biểu tỷ lệ thuế GTGT và TNCN theo từng loại hình ngành nghề (Thương mại: GTGT 1% - TNCN 0.5%; Dịch vụ: GTGT 5% - TNCN 2%...).",
      "Quy định nghĩa vụ kê khai của Sàn thương mại điện tử và tổ chức trung gian nộp thay thuế."
    ],
    downloadUrl: "#"
  },
  {
    id: "nd125-2020",
    category: "NghiDinh",
    number: "Nghị định 125/2020/NĐ-CP",
    title: "Quy định xử phạt vi phạm hành chính về thuế, hóa đơn",
    year: 2020,
    field: "Hành chính thuế & Hóa đơn",
    summary: "Bảng tra cứu các mức phạt khi chậm nộp tờ khai, chậm nộp tiền thuế hoặc các sai phạm về lập và sử dụng hóa đơn điện tử.",
    contentBullets: [
      "Phạt từ 2.000.000đ đến 5.000.000đ cho hành vi chậm nộp hồ sơ khai thuế dưới 30 ngày.",
      "Phạt từ 15.000.000đ đến 25.000.000đ nếu chậm nộp hồ sơ khai thuế trên 90 ngày và có phát sinh số thuế phải nộp.",
      "Cách tính tiền chậm nộp thuế: Số tiền phạt = Số tiền thuế chậm nộp * 0.03% * Số ngày chậm nộp."
    ],
    downloadUrl: "#"
  },
  {
    id: "luat38-2019",
    category: "Luat",
    number: "Luật Quản lý thuế số 38/2019/QH14",
    title: "Luật Quản lý thuế hiện hành áp dụng toàn quốc",
    year: 2019,
    field: "Hệ thống quản lý chung",
    summary: "Xác lập toàn bộ quyền hạn, thời hạn kê khai nộp thuế, đăng ký mã số thuế và quy trình giải quyết khiếu nại của người nộp thuế.",
    contentBullets: [
      "Xác định thời hạn nộp tờ khai thuế quý là ngày cuối cùng của tháng đầu quý tiếp theo.",
      "Nghĩa vụ cung cấp dữ liệu tài khoản ngân hàng của người nộp thuế từ các Ngân hàng thương mại sang cơ quan thuế.",
      "Khung pháp lý về giao dịch thuế điện tử bắt buộc đối với tất cả doanh nghiệp."
    ],
    downloadUrl: "#"
  },
  {
    id: "cv4230-2023",
    category: "CongVan",
    number: "Công văn 4230/TCT-DNNCN",
    title: "Văn bản tăng cường quản lý thuế đối với hoạt động TMĐT và livestream kinh doanh",
    year: 2023,
    field: "Thương mại điện tử & Livestream",
    summary: "Hướng dẫn nội bộ cục thuế truy quét dòng tiền ngân hàng của các cá nhân livestream bán hàng trên TikTok Shop, đối chiếu cơ sở dữ liệu quốc gia.",
    contentBullets: [
      "Chi cục Thuế quận, huyện bóc tách tài khoản nhận hoa hồng tiếp thị liên kết và tiền bán hàng của các chủ shop.",
      "Yêu cầu đối thoại giải trình dòng tiền đối với các cá nhân có giao dịch thanh toán ngân hàng đột biến.",
      "Xử lý nghiêm hành vi không đăng ký hộ kinh doanh nhưng có hoạt động kinh doanh quy mô lớn thường xuyên."
    ],
    downloadUrl: "#"
  }
];

export const PRACTICAL_GUIDES_DATA: PracticalGuide[] = [
  {
    id: "huongdan-thuetiktok",
    category: "TMDT",
    title: "Bán hàng trên TikTok Shop / Shopee nộp thuế như thế nào là đúng luật?",
    summary: "Chi tiết lộ trình rà soát, cách tự tính thuế chuẩn dựa trên doanh thu của sàn và phương pháp kê khai nộp thuế cá nhân.",
    checklist: [
      "Xác định loại hình giao dịch: Sàn có thanh toán qua sàn (sàn kê khai & nộp thuế thay) hay Sàn không thanh toán qua sàn (bắt buộc tự kê khai hàng tháng/quý).",
      "Không lấy số nhận về tài khoản ngân hàng để khai thuế đối với trường hợp tự khai (Sẽ bị lệch do phí sàn và hoa hồng).",
      "Chụp đối soát thuế cuối tháng tại giao diện kế toán của Shopee/TikTok Shop.",
      "Chuẩn bị hóa đơn chứng từ đầu vào của hàng hóa (Nếu là hộ kê khai).",
      "Kê khai mẫu 01/CNKD nộp trước ngày cuối cùng của quý đối với các giao dịch không thanh toán qua sàn."
    ],
    warning: "Nếu thuộc diện sàn không thanh toán qua sàn mà cố tình không khai, cơ quan thuế có thể truy quét sao kê liên thông ngân hàng bất luận thời gian nào từ năm 2021 trở đi, mức phạt trốn thuế là gấp 1 đến 3 lần số thuế trốn.",
    steps: [
      "Bước 1: Phân loại: Nếu có thanh toán qua sàn (Shopee, TikTok Shop, Lazada), sàn sẽ thu nộp thuế dùm trực tiếp. Người bán được MIỄN thủ tục tự khai thuế hàng tháng, quý và quyết toán năm.",
      "Bước 2: Nếu không thanh toán qua sàn (giao dịch COD ngoài, chuyển khoản lẻ ngoài): Tải báo cáo doanh thu thô chưa trừ bất kỳ phí gì.",
      "Bước 3: Xác định thuế suất ngành bán lẻ: 1% Thuế giá trị gia tăng (GTGT) + 0.5% Thuế thu nhập cá nhân (TNCN) = Tổng 1.5% doanh thu.",
      "Bước 4: Gửi tờ khai 01/CNKD qua trang Thuedientu.gdt.gov.vn thông qua mã số thuế cá nhân kinh doanh và nộp ngân sách."
    ],
    content: "Luật pháp phân định rõ: các giao dịch TMĐT có thanh toán qua sàn (như Shopee, TikTok Shop có dùng cổng thanh toán tích hợp của sàn, ví, thẻ...) thì sàn sẽ khấu trừ, kê khai và nộp thuế thay, người bán không cần khai thuế hàng tháng/quý hay quyết toán cuối năm. Ngược lại, các giao dịch không thanh toán qua sàn (giao dịch tự do, thỏa thuận COD ngoài hệ thống cổng thanh toán, chuyển khoản trực tiếp) thì người bán bắt buộc phải tự thực hiện kê khai thuế theo quy định định kỳ hàng tháng/quý.",
    example: "Bạn có shop bán quần áo trên Shopee, một năm tổng tiền khách hàng thanh toán là 1 tỷ đồng. Sàn giữ lại phí dịch vụ cố định và phí thanh toán 10% (Tức bạn nhận về bank 900 triệu). Số thuế bạn phải đóng vẫn tính trên 1 tỷ đồng: GTGT = 1 tỷ * 1% = 10 triệu; TNCN = 1 tỷ * 0.5% = 5 triệu. Tổng thuế phải nộp là 15 triệu đồng chứ không phải tính trên 900 triệu."
  },
  {
    id: "huongdan-doanhthunhabox",
    category: "CTTS",
    title: "Cho thuê nhà trên 200 triệu/năm có phải xuất hóa đơn tài chính cho đối tác?",
    summary: "Hướng dẫn chi tiết quy trình nộp thuế cho thuê bất động sản và làm thế nào để được cơ quan thuế cấp hóa đơn điện tử bàn giao cho công ty thuê nhà.",
    checklist: [
      "Kiểm tra xem hợp đồng thuê nhà quy định ai nộp thuế.",
      "Khách thuê là công ty thì chủ nhà phải làm thủ tục mua hóa đơn lẻ từng lần phát sinh.",
      "Doanh thu dưới 200 triệu/năm không có nghĩa vụ nộp thuế nhưng vẫn phải đăng ký nộp thuế trắng nếu cần."
    ],
    warning: "Không tự ý viết hóa đơn tay hoặc thuê công ty ma xuất hộ hóa đơn thuê nhà, điều này có thể dẫn tới rủi ro hóa đơn bất hợp pháp cực kỳ nguy hiểm.",
    steps: [
      "Bước 1: Ký hợp đồng thuê nhà ghi rõ điều khoản Thuế và Hóa đơn.",
      "Bước 2: Chuẩn bị hồ sơ nộp thuế bao gồm tờ khai 01/TTS kèm phụ lục 01-1/BK-TTS.",
      "Bước 3: Đến bộ phận Một cửa tại Chi cục Thuế Quận/Huyện có nhà cho thuê để nộp và nhận Thông báo số định danh nộp thuế.",
      "Bước 4: Nộp thuế trực tuyến rồi cầm biên lai quay lại để làm đơn đề nghị cấp hóa đơn lẻ từ cơ quan thuế."
    ],
    content: "Các công ty nước ngoài hoặc tập đoàn lớn luôn yêu cầu có hóa đơn VAT hợp pháp khi thuê nhà làm văn phòng để đưa vào chi phí hợp lý. Vì chủ nhà là cá nhân không thể tự in hóa đơn, nên bắt buộc phải thực hiện thủ tục mua hóa đơn lẻ trực tiếp tại cơ quan quản lý đầu ngành.",
    example: "Chị Lan cho công ty Nhật Bản thuê nhà giá 20 triệu/tháng. Tổng doanh thu năm là 240 triệu đồng (>200 triệu). Thuế suất cho thuê tài sản là 10% (5% GTGT + 5% TNCN). Chị Lan phải đóng tổng cộng: 240 triệu * 10% = 24 triệu đồng tiền thuế mới được chi cục thuế cấp hóa đơn VAT 20tr/tháng bàn giao cho công ty."
  },
  {
    id: "huongdan-trangthothuekhoan",
    category: "HKD",
    title: "Hộ kinh doanh đổi sang phương pháp kê khai: Lợi và hại gì?",
    summary: "Rà soát luật thuế Thông tư 88 và so sánh chi tiết chi phí nộp thuế khoán rảnh tay so với thuế kê khai sổ sách.",
    checklist: [
      "Thuế khoán phù hợp kinh doanh bán lẻ vãng lai diện tích nhỏ.",
      "Thuế kê khai phù hợp hộ bán sỉ, chuỗi cửa hàng, cần chứng minh doanh thu đầu vào xuất hóa đơn VAT đầu ra.",
      "Thuế phương pháp kê khai yêu cầu phải mở sổ kế toán và thuê dịch vụ báo cáo hàng tháng."
    ],
    warning: "Nếu hộ kê khai không lưu chứng từ mua hàng đầu vào, chi cục thuế sẽ ấn định tỷ lệ chi phí dẫn đến số thuế đóng cao hơn nhiều.",
    steps: [
      "Bước 1: Làm hồ sơ thông báo chuyển đổi phương pháp tính thuế nộp lên Chi cục Thuế trước quý phát sinh.",
      "Bước 2: Mua chữ ký số (Token/Cloud) riêng cho HKD và kích hoạt tài khoản xuất hóa đơn có mã.",
      "Bước 3: Thuê đơn vị kế toán đại lý thuế để lập 4 quyển sổ kế toán mẫu Thông tư 88.",
      "Bước 4: Báo cáo định kỳ tờ khai thuế mẫu 01/CNKD mỗi quý một lần."
    ],
    content: "Phương pháp kê khai giúp mở rộng quy mô, được ký kết các hợp đồng kinh tế lớn with các công ty. Đây chính là bước chuyển giao chuyên nghiệp trước khi nâng cấp thành lập Doanh nghiệp tư nhân hoặc Công ty TNHH.",
    example: "Một hộ kinh doanh phân phối linh kiện điện tử doanh thu 5 tỷ/năm. Nếu nộp thuế khoán cán bộ thuế có thể áp doanh thu cực kì cao hoặc kiểm tra kho hàng. Khi chuyển sang kê khai sổ sách, hộ có hóa đơn đầu vào linh kiện từ công ty nhập khẩu nên đóng thuế chính xác 1.5% trên doanh thu và bảo vệ an toàn kho hàng."
  },
  {
    id: "huongdan-doanhnghiep-sme",
    category: "DN",
    title: "Tối ưu chi phí hợp lý và kiểm soát rủi ro Thuế cho Doanh nghiệp SME",
    summary: "Cẩm nang cốt lõi dành cho giám đốc điều hành về cách phân bổ chi phí hóa đơn hợp lệ, tránh rủi ro ấn định thuế.",
    checklist: [
      "Kiểm tra tính hợp lệ của hóa đơn đầu vào bằng cách rà soát trạng thái hoạt động doanh nghiệp bán trên cổng Tổng cục Thuế.",
      "Lập quy chế tài chính nội bộ, hợp đồng lao động chặt chẽ để hợp thức hóa chi phí lương, phụ cấp.",
      "Hóa đơn trên 20 triệu bắt buộc thanh toán không dùng tiền mặt (qua tài khoản ngân hàng đăng ký mẫu II-1 của công ty)."
    ],
    warning: "Mua bán vỏ hóa đơn để tăng chi phí khống là hành vi vi phạm hình sự đặc biệt nghiêm trọng. Hãy tập trung tối ưu hóa chi phí thực tế thông qua các chính sách nội bộ và khấu hao tài sản hợp lệ.",
    steps: [
      "Bước 1: Thiết lập hệ thống kiểm soát hóa đơn điện tử đầu ra/đầu vào tự động liên kết dữ liệu Tổng cục Thuế.",
      "Bước 2: Xây dựng quy định thanh toán nội bộ bằng văn bản, chuẩn bị hồ sơ nghiệm thu nghiệm cụ thể cho từng dịch vụ thuê ngoài.",
      "Bước 3: Thực hiện đối chiếu tờ khai thuế VAT hàng quý khớp với báo cáo báo cáo hóa đơn thực tế sử dụng.",
      "Bước 4: Tổ chức báo cáo định kỳ thời hạn kê khai nộp thuế để tránh phạt vi phạm hành chính chậm nộp định kỳ quý."
    ],
    content: "Quản trị thuế doanh nghiệp thông minh đòi hỏi sự phối hợp chặt chẽ giữa Ban giám đốc và bộ phận kế toán. Việc hiểu rõ ranh giới giữa tối ưu chi phí hợp lý theo Luật thuế TNDN và hành vi trốn thuế giúp doanh nghiệp phát triển bền vững, yên tâm ký kết các hợp đồng quy mô lớn.",
    example: "Doanh nghiệp dịch vụ công nghệ phát sinh chi phí mua máy tính 500 triệu đồng. Để được tính là chi phí hợp lý hợp lệ được khấu trừ khi tính thuế TNDN, công ty phải có hóa đơn hợp pháp, thanh toán chuyển khoản từ tài khoản công ty và lập biên bản bàn giao tài sản."
  },
  {
    id: "huongdan-cuongche-nothue",
    category: "DN",
    title: "Gỡ quyết định Cưỡng chế nợ thuế và khôi phục hoạt động liên tục",
    summary: "Cẩm nang bóc tách dòng tiền, nộp đơn xin phân kỳ nộp dần nợ thuế tối đa 12 tháng để khẩn cấp mở lại hóa đơn bị đình chỉ.",
    checklist: [
      "Xác định chính xác số nợ thuế có đúng với tờ khai thực tế hay bị tính trùng lặp phạt chậm nộp do lỗi chi trả.",
      "Chuẩn bị thư bảo lãnh nợ thuế của một Ngân hàng uy tín thương mại hoạt động tại Việt Nam.",
      "Lập cam kết lộ trình nộp dần nợ thuế theo quý hoặc theo tháng cực kỳ chi tiết, mạch lạc.",
      "Nộp ngay tối thiểu 1/12 tổng số nợ thuế quá hạn trước khi gửi đơn đề nghị xin cứu xét ngừng hóa đơn."
    ],
    warning: "Tuyệt đối không sử dụng hóa đơn bất hợp pháp của đơn vị khác khi đang bị cưỡng chế hóa đơn. Việc này có thể dẫn đến khởi tố hình sự về tội mua bán hóa đơn quy định tại Bộ Luật Hình Sự.",
    steps: [
      "Bước 1: Rà soát & Đối chiếu: Chủ động liên hệ Đội quản lý nợ của Chi cục Thuế kiểm tra bảng kê nợ chi tiết, bóc tách các khoản chênh lệch phát sinh.",
      "Bước 2: Chuẩn bị Thư bảo lãnh của Ngân hàng: Thiết lập cam kết bảo lãnh thanh toán nợ thuế quá hạn theo đúng quy định tại Điều 134 Luật Quản lý Thuế.",
      "Bước 3: Gửi tờ trình đề nghị phân kỳ: Lập tờ khai mẫu số 01/NĐND đề nghị nộp dần tiền nợ thuế kèm lộ trình thanh toán cụ thể tối đa 12 tháng.",
      "Bước 4: Nhận biên bản thu hồi quyết định: Ngay sau khi ký biên bản cam kết và hoàn thành đóng kỳ đầu, Chi cục kiểm tra sẽ hủy quyết định cưỡng chế truyền hóa đơn từ 24 - 48 giờ."
    ],
    content: "Khi dính nợ thuế quá hạn trên 90 ngày, cơ quan thuế áp dụng biện pháp cưỡng chế trích tiền từ tài khoản và đình chỉ hoạt động sử dụng hóa đơn của doanh nghiệp. Để tháo gỡ cấp tốc, biện pháp quy chuẩn và đúng pháp luật nhất là nộp đơn xin phân kỳ thanh toán nộp dần nợ thuế (trả góp tối đa 12 tháng) dưới sự bảo lãnh của ngân hàng thương mại hoạt động hợp pháp.",
    example: "Công ty Cổ phần Xây dựng Thành Đạt bị nợ thuế TNDN 600 triệu đồng quá hạn 120 ngày, bị dính cưỡng chế ngừng sử dụng hóa đơn dẫn đến đình trệ bàn giao công trình. Đại lý thuế Thành Phố lập tức can thiệp: giúp lập hồ sơ phân kỳ nộp dần 12 tháng (mỗi tháng 50 triệu) có ngân hàng VPBank bảo lãnh. Công ty nộp 50 triệu kỳ đầu tiên, cơ quan thuế ra văn bản thu hồi cưỡng gỡ phong tỏa hóa đơn ngay ngày hôm sau để đơn vị tiếp tục xuất hóa đơn nghiệm thu lấy tiền trả nợ."
  },
  {
    id: "huongdan-ngung-hoa-don",
    category: "DN",
    title: "Phòng tránh và xử lý trát Đình chỉ phát hành hóa đơn khẩn cấp",
    summary: "Cách chứng minh hoạt động thực tế tại trụ sở đã đăng ký và gỡ phong tỏa hệ thống hóa đơn điện tử VAT của doanh nghiệp.",
    checklist: [
      "Đặt biển hiệu công ty rõ ràng ở mặt trước văn phòng hoạt động chính thức.",
      "Lưu giữ đầy đủ biên lai đóng tiền điện, mạng internet văn phòng đứng tên pháp nhân.",
      "Duy trì nhân sự túc trực làm việc hoặc ủy quyền pháp nhân đón đoàn xác minh kiểm tra.",
      "Chuẩn bị bộ chứng từ hóa đơn đầu vào có thật đầy đủ chữ ký giao nhận để chứng minh tính hợp lý."
    ],
    warning: "Kế toán không được tự ý đóng cửa văn phòng trống trơn khi biết có đoàn xác minh không báo trước của đội kiểm tra thuế địa bàn, vì điều này sẽ dẫn tới việc bị đình chỉ hóa đơn tự động tức khắc.",
    steps: [
      "Bước 1: Chỉnh đốn văn phòng làm việc: Gắn biển hiệu theo đúng thông số pháp lý, rà soát văn bản chứng từ, hợp đồng thuê văn phòng gốc công chứng.",
      "Bước 2: Gửi tờ trình giải trình: Lập công văn xin xác minh tại địa chỉ kinh doanh, cử người đại diện pháp luật túc trực sẵn sàng tiếp đoàn.",
      "Bước 3: Lập hồ sơ giải trình hóa đơn đầu vào: Trình báo chứng từ thanh toán ngân hàng (ủy nhiệm chi) kèm hợp đồng kinh tế của các giao dịch bị rà soát rủi ro.",
      "Bước 4: Ký Biên bản ghi nhận thực tế: Nhận kết quả xác minh đạt yêu cầu của cơ quan quản lý và làm thủ tục khôi phục hệ thống hóa đơn điện tử."
    ],
    content: "Trong công tác quản lý rủi ro hóa đơn, nếu cơ quan thuế gửi đoàn xác minh tại địa chỉ đăng ký mà doanh nghiệp không hoạt động hoặc không treo biển hiệu, mã số thuế và quyền xuất hóa đơn sẽ bị phong tỏa loại cảnh báo 'Doanh nghiệp không hoạt động tại địa chỉ'. Doanh nghiệp cần chủ động chuẩn bị các hồ sơ thực tế minh bạch để nhanh chóng khôi phục luồng vận hành dòng tiền.",
    example: "Công ty TNHH Logistics Sao Mai bị khóa hệ thống hóa đơn do cán bộ đi kiểm tra báo cáo không có người hoạt động tại chung cư đăng ký. Đại lý thuế lập tức rà soát, đồng hành cùng doanh nghiệp treo biển hiệu quy chuẩn, soạn đơn gửi đội kiểm tra nộp mẫu 08-MST xác thực đổi phòng hoạt động và dẫn đoàn nghiệm thu thực địa, gỡ lệnh khóa hóa đơn thành công chỉ sau đúng 3 ngày làm việc."
  },
  {
    id: "huongdan-heso-k",
    category: "DN",
    title: "Giải mã thông báo Giải trình Hệ số K để tránh thanh tra thuế",
    summary: "Lộ trình đối chiếu hóa đơn mua vào - bán ra, giải trình thuyết minh kỹ thuật số liệu chênh lệch an toàn tuyệt đối.",
    checklist: [
      "Học cách tự tính hệ số K định kỳ hàng tháng/hàng quý dựa trên tổng trị giá xuất - nhập hóa đơn.",
      "Thống kê riêng lượng hàng hóa tồn kho thực tế, bảo đảm khớp với bảng nhập - xuất - tồn kế toán.",
      "Lưu trữ biên bản giao nhận hàng hóa cụ thể, hợp đồng ghi rõ điều khoản bàn giao chậm đối với các lô hàng hóa lớn.",
      "Nhận biết giới hạn cảnh báo K (hệ số rủi ro trần theo quy định ngành nghề kinh doanh)."
    ],
    warning: "Tuyệt đối không giải trình vòng vo, không khớp số liệu thực tế trên tờ khai VAT đã nộp. Mọi sự giải thích không có số liệu chứng minh chi tiết chỉ khiến hồ sơ bị chuyển thẳng sang ban chuyên án thanh tra toàn diện.",
    steps: [
      "Bước 1: Kết xuất bảng phân tích rủi ro: Lợi dụng tài khoản thuế điện tử rà soát danh sách hóa đơn mua vào bán ra để tính chỉ số K tương ứng.",
      "Bước 2: Xác định lý do lệch: Đối chiếu xem có trường hợp mua sỉ từ nhà cung cấp chiết khấu cao, tồn kho hàng chưa tiêu thụ, hoặc chênh lệch chu kỳ luân chuyển.",
      "Bước 3: Hoàn thiện hồ sơ thuyết minh: Soạn bản giải trình chi tiết, đính kèm bảng kê xuất nhập tồn hàng hóa thực tiễn, làm rõ tiến độ dự án.",
      "Bước 4: Nộp tờ trình chỉnh lý: Gửi công văn giải trình hệ số K chính thức qua mạng và gặp gỡ trao đổi trực tiếp với cán bộ quản lý phụ trách nếu được yêu cầu."
    ],
    content: "Hệ số K là ngưỡng giám sát rủi ro tự động của Tổng cục Thuế nhằm phát hiện kịp thời các hành vi xuất hóa đơn khống hoặc mua bán hóa đơn điện tử không có giao dịch kinh tế thực tế. Khi doanh nghiệp xuất bán ra vượt quá tỷ lệ định trước so với trị giá mua vào của nhóm vật tư sản phẩm tương ứng, hệ thống Trí tuệ nhân tạo (AI) ngành thuế sẽ cảnh báo đỏ, yêu cầu doanh nghiệp giải trình thuyết minh cụ thể.",
    example: "Một doanh nghiệp thương mại sắt thép bị gửi thông báo giải trình vì có tổng hóa đơn xuất bán ra vượt 1.5 lần tổng hóa đơn mua vào trong tháng (Hệ số K lệch đỏ). Đại lý thuế Thành Phố đã phân tích sổ sách, giải trình rõ chênh lệch là do lượng thép mua tồn kho lớn từ quý trước (đã đóng thuế VAT đầy đủ nhưng chưa tiêu thụ hết), kèm theo hồ sơ biên bản nhập kho quý trước khớp 100%, bảo vệ doanh nghiệp hoàn toàn khỏi diện thanh tra rủi ro."
  },
  {
    id: "huongdan-bhxh-quyettoan",
    category: "DN",
    title: "Bí quyết quyết toán Thuế TNDN và tối ưu đóng BHXH cho Doanh nghiệp",
    summary: "Cách xây dựng thang bảng lương thông minh, đưa phụ cấp lương hợp lệ vào chi phí để giảm thuế thu nhập doanh nghiệp và giảm tải BHXH.",
    checklist: [
      "Xây dựng quy chế tài chính và lương thưởng chặt chẽ được hội đồng thành viên phê duyệt chính thức.",
      "Phân định rõ lương cơ bản đóng bảo hiểm xã hội và các khoản phụ cấp đặc thù được miễn đóng BHXH.",
      "Đăng ký liên thông thông tin lao động của doanh nghiệp đúng quy chuẩn giữa hai hệ thống Thuế và Bảo hiểm xã hội.",
      "Lưu giữ đầy đủ hồ sơ ký nhận phụ cấp, bảng chấm công của từng người lao động hàng tháng."
    ],
    warning: "Cố tình khai khống danh sách nhân viên không có thực (nhân viên ma) để tính thêm chi phí lương mà không đóng bảo hiểm là hành vi trốn đóng BHXH, trốn thuế cực kỳ nguy hiểm và dễ bị cơ quan chức năng đối chiếu thông qua CCCD liên thông dữ liệu dân cư.",
    steps: [
      "Bước 1: Rà quét chênh lệch liên thông dữ liệu: So sánh quỹ lương tờ khai Quyết toán thuế TNCN với danh sách chi trả đóng Bảo hiểm xã hội.",
      "Bước 2: Cân đối cấu trúc thu nhập: Tách thu nhập của nhân sự thành Lương cơ bản làm căn cứ đóng BHXH, kết hợp với các khoản phụ cấp đúng quy định miễn đóng.",
      "Bước 3: Thiết lập quy chế thưởng hiệu quả: Lập hệ thống chỉ tiêu hiệu quả KPI và thưởng doanh số đóng vai trò là khoản thu nhập bổ sung không cố định.",
      "Bước 4: Đại diện bảo vệ số liệu: Khi có đoàn thanh tra kiểm tra giải trình đối chất liên thông, Đại lý thuế đại diện trực tiếp chứng minh tính hợp lý của cấu trúc quỹ lương."
    ],
    content: "Chi phí nhân sự luôn chiếm tỷ trọng lớn trong cơ cấu vận hành doanh nghiệp. Từ năm 2026, cơ chế liên thông dữ liệu số CCCD giữa Tổng cục Thuế và cơ quan Bảo hiểm xã hội quốc gia giúp phát hiện ngay lập tức mọi trường hợp doanh nghiệp lách luật khai lệch quỹ lương. Do đó, việc xây dựng một cấu trúc lương thông minh, bảo đảm tính pháp lý là con đường bền vững duy nhất để doanh nghiệp vừa tối ưu chi phí thuế vừa tuân thủ đúng luật bảo hiểm.",
    example: "Doanh nghiệp công nghệ có 30 nhân sự, lương thực trả trung bình 20 triệu/người. Nếu đóng BHXH trên toàn bộ 20 triệu, doanh nghiệp phải gánh chi phí bảo hiểm vô cùng lớn. Đại lý thuế đã thiết lập lại thang bảng lương thông minh: Lương đóng BHXH là 6.5 triệu (trên mức tối thiểu vùng), phần 13.5 triệu còn lại được phân bổ hợp lệ vào các khoản phụ cấp ăn trưa (730k), phụ cấp trang phục (5tr/năm), phụ cấp điện thoại, xăng xe hỗ trợ công việc và thưởng hiệu quả dự án. Toàn bộ quỹ lương vẫn được tính vào chi phí hợp lý được trừ để giảm thuế TNDN cho công ty, trong khi chi phí BHXH được tối ưu hóa tiết kiệm hơn 340 triệu đồng/năm."
  }
];

export const CASE_STUDIES_DATA: CaseStudy[] = [
  {
    id: "case-truythu-shopee",
    title: "Xử lý truy thu thuế Shopee/Tiktok doanh thu 12 tỷ đồng bảo vệ thành công hơn 180 triệu tiền phạt",
    clientType: "Chủ shop online (Thời trang trẻ em)",
    problem: "Khách hàng nhận thông báo của Chi cục thuế yêu cầu lên giải trình dòng tiền tài khoản ngân hàng cá nhân liên tục 3 năm (2023-2025) với tổng giao dịch nhận tiền sàn là 12,3 tỷ đồng nhưng chưa từng đăng ký thuế.",
    risk: "Cơ quan thuế áp khung phạt trốn thuế cố ý (150% tiền thuế) cộng với phạt chậm nộp 0.03%/ngày dẫn tới tổng tiền truy thu lên tới gần 450 triệu đồng và rủi ro bị chuyển hồ sơ sang cơ quan công an điều tra vi phạm hình sự.",
    solution: "Đại lý thuế Thành Phố lập tức vào cuộc: (1) Rà soát lại chứng từ dòng tiền bóc tách tiền người thân vay mượn và tiền hoàn đơn ra khỏi 12,3 tỷ. (2) Soạn hồ sơ đăng ký kinh doanh và xin kê khai bổ sung tự nguyện diện vô ý, chứng minh lỗi do không phổ cập luật. (3) Đại diện đối thoại bảo vệ luận điểm không có ý gian lận thuế.",
    result: "Giảm tổng số tiền phải nộp từ 450 triệu xuống còn 212 triệu đồng (Miễn phạt trốn thuế cố ý, chỉ tính 100% thuế thực tế và phạt chậm nộp hành chính). Khách hàng tiếp tục kinh doanh ổn định.",
    savedAmount: "238.000.000 đ"
  },
  {
    id: "case-giai-trinh-dt",
    title: "Hộ kinh doanh ăn uống tại Quận 1 thỏa thuận lại định mức thuế khoán tiết kiệm 40 triệu đồng/năm",
    clientType: "Chủ quán nướng lẩu tại trung tâm TPHCM",
    problem: "Cơ quan thuế khảo sát thực tế lượng khách đột xuất tối thứ 7 và áp mức thuế khoán tăng từ 8 triệu/tháng lên 18 triệu/tháng do ghi nhận doanh thu vượt đỉnh định mức.",
    risk: "Mức thuế khoán tăng quá cao so với biên lợi nhuận thực tế (Quán chỉ đông cuối tuần, ngày thường vắng vẻ), có thể gây phá sản kinh doanh.",
    solution: "Đại lý thuế trực tiếp thu thập dữ liệu camera giám sát 30 ngày liên tục ròng rã, lập báo cáo chi phí thực phẩm tươi sống đầu vào hao phí cao, tính toán tỷ lệ hao hụt thực tế để làm công văn bác bỏ định mức đo lường tức thời.",
    result: "Chi cục thuế phê duyệt lại định mức khoán mới 11 triệu/tháng (Thấp hơn 7 triệu/tháng so với đề xuất khảo sát ban đầu).",
    savedAmount: "84.000.000 đ"
  },
  {
    id: "case-mua-nha",
    title: "Giải quyết khúc mắc và rút nhanh hóa đơn VAT cho thuê biệt thự Vinhomes trị giá 90 triệu/tháng",
    clientType: "Chủ nhà biệt thự cho công ty công nghệ đa quốc gia thuê",
    problem: "Hợp đồng thuê ghi 'Bên thuê chịu trách nhiệm khai nộp thuế thay và nộp hóa đơn cho kế toán công ty'. Tuy nhiên chủ nhà không phối hợp cung cấp giấy tờ cá nhân, bên thuê lúng túng không thể kê khai online do dính MST cũ bị khóa của chủ nhà.",
    risk: "Công ty thuê nhà dọa hủy hợp đồng dọn đi do quá 3 tháng không có hóa đơn hợp pháp cộp tiền thuê, làm thất thu dòng tiền 270 triệu của chủ nhà.",
    solution: "Đồng hành mở khóa mã số thuế cá nhân bị treo của chủ nhà, đại diện đứng ra nộp thay và soạn hồ sơ tại chi cục thuế, đại tu tờ khai 01/TTS lấy ngay biên nhận trong 36 giờ.",
    result: "Bàn giao hóa đơn tài chính hợp lệ cho bên thuê người Nhật Bản quyết toán thành công, hợp đồng thuê 3 năm duy trì bền chặt.",
    savedAmount: "Hòa giải & Giữ hợp đồng tài sản trị giá 3.2 tỷ"
  }
];

export const QUICK_ANSWER_FAQS: QuickAnswerFAQ[] = [
  {
    id: "faq-q1",
    question: "Bán hàng Shopee doanh thu bao nhiêu thì phải đóng thuế?",
    category: "TMDT",
    answer: "Chỉ cần tổng doanh thu bán hàng online (bao gồm tất cả các bên, hoặc tổng mức thu nhập cá nhân) vượt quá 200.000.000 đồng trong một năm dương lịch là bạn bắt buộc phải kê khai và nộp thuế GTGT (1%) và thuế TNCN (0.5%), tổng cộng là 1.5% trên doanh thu theo quy định mới áp dụng từ năm 2026. Nếu dưới 200 triệu đồng/năm sẽ được miễn nộp thuế hoàn toàn.",
    relatedGuides: ["huongdan-thuetiktok"]
  },
  {
    id: "faq-q2",
    question: "Bị cơ quan thuế gửi công văn rà soát tài khoản bank nên làm gì đầu tiên?",
    category: "XL",
    answer: "Đầu tiên, TUYỆT ĐỐI không hoảng loạn hay đến cơ quan thuế ký biên bản ngay khi chưa hiểu rõ số liệu. Hãy liên hệ ngay Đại lý thuế chuyên nghiệp để nhận sao kê ngân hàng 3 năm gần nhất, lọc bỏ dòng tiền không liên quan kinh doanh (vay tiền, gia đình chuyển khoản, thanh lý đồ dùng cũ) rồi mới lập tờ trình giải trình. Việc ký ngay biên bản áp thuế ban đầu sẽ khiến bạn mất quyền khiếu nại bác số liệu thuế.",
    relatedGuides: ["huongdan-thuetiktok", "huongdan-trangthothuekhoan"]
  },
  {
    id: "faq-q3",
    question: "Doanh nghiệp không có hoạt động mua bán thì có tiền phạt chậm nộp không?",
    category: "DN",
    answer: "Báo cáo thuế VAT, báo cáo tình hình sử dụng hóa đơn hàng quý bắt buộc phải gửi nộp đúng hạn ngay cả khi công ty không có hoạt động mua bán (gọi là Tờ khai trắng). Nếu chậm nộp quá hạn quy định từ ngày đầu tiên, bạn sẽ phải đóng phạt hành chính từ 2 triệu đến 25 triệu tùy thời gian chậm nộp theo Nghị định 125/2020/NĐ-CP.",
    relatedGuides: ["huongdan-trangthothuekhoan"]
  },
  {
    id: "faq-q4",
    question: "Giá thuê nhà ghi trên hợp đồng là net (nhận ròng), ai phải khai nộp thuế cho chủ nhà?",
    category: "CTTS",
    answer: "Về mặt pháp lý, người có nghĩa vụ thuế là chủ tài sản (chủ nhà). Tuy nhiên hợp đồng có thể thỏa thuận bên thuê nộp thay thuế. Khi đó công ty thuê nhà sẽ khấu trừ trực tiếp 10% thuế trên giá gross, nộp thay kho bạc nhà nước và đứng tên trên tờ khai nộp thay, sau đó đưa tiền net cho chủ nhà.",
    relatedGuides: ["huongdan-doanhthunhabox"]
  },
  {
    id: "faq-q5",
    question: "Bị cưỡng chế nợ thuế quá hạn dẫn tới khuyết chỉ xuất hóa đơn thì gỡ thế nào?",
    category: "XL",
    answer: "Biện pháp nhanh và đúng luật là nộp hồ sơ xin phân kỳ nộp dần tiền nợ thuế (trả góp tối đa 12 tháng) theo Điều 134 Luật Quản lý Thuế. Bạn cần chuẩn bị thư bảo lãnh nghĩa vụ nộp thuế của Ngân hàng thương mại và nộp một phần nợ ngay kỳ đầu tiên (tối thiểu 1/12 tổng nợ), cơ quan thuế sẽ mở lại cổng hóa đơn điện tử.",
    relatedGuides: ["huongdan-cuongche-nothue"]
  },
  {
    id: "faq-q6",
    question: "Hệ số K rủi ro hóa đơn chênh lệch là gì và rà quét thế nào?",
    category: "XL",
    answer: "Hệ số K là chỉ số đo lường tỷ lệ chênh lệch trị giá hóa đơn bán ra so với hóa đơn mua vào của doanh nghiệp trên cổng Tổng cục Thuế. Khi hệ số này vượt ngưỡng cảnh báo đỏ của ngành nghề đăng ký, hệ thống tự động gắn mác có rủi ro cao để yêu cầu doanh nghiệp giải trình về tồn kho hoặc vòng quay vốn.",
    relatedGuides: ["huongdan-heso-k"]
  },
  {
    id: "faq-q7",
    question: "Cơ quan bảo hiểm xã hội (BHXH) có đối chất liên thông với quyết toán thuế TNCN?",
    category: "DN",
    answer: "Có, hiện nay hệ thống dữ liệu CCCD liên thông đã chính thức tích hợp cơ sở dữ liệu BHXH với Tổng cục Thuế. Mọi sự không khớp giữa danh sách nhân viên đóng bảo hiểm với danh sách chi trả được giảm thuế TNDN đều được tự động gắn mã cảnh báo thanh tra liên thông liên ngành.",
    relatedGuides: ["huongdan-bhxh-quyettoan"]
  }
];

// Tax indicators or ratios
export const TAX_RATIOS_BY_SECTOR = [
  { code: "BL", name: "Phân phối, bán lẻ hàng hóa", vat: 1.0, pit: 0.5, total: 1.5, example: "Cửa hàng bách hóa, bán shopee, tiktok, tạp hóa, đại lý gạo" },
  { code: "DV", name: "Dịch vụ, xây dựng không bao thầu nguyên vật liệu", vat: 5.0, pit: 2.0, total: 7.0, example: "Thiết kế đồ họa, quảng cáo Google, viết phần mềm, tư vấn, KOL" },
  { code: "SX", name: "Sản xuất, vận tải, dịch vụ có gắn với hàng hóa, xây dựng có bao thầu nguyên vật liệu", vat: 3.0, pit: 1.5, total: 4.5, example: "Xưởng may gia công, dịch vụ xe tải, nhà hàng ăn uống lẻ" },
  { code: "K", name: "Hoạt động kinh doanh khác", vat: 2.0, pit: 1.0, total: 3.0, example: "Freelancer tự do, tiếp thị liên kết tổng hợp" }
];

export const LATEST_TAX_CALENDAR = [
  { event: "Nộp tờ khai lệ phí môn bài cho hộ thành lập mới", deadline: "Trước ngày 30 tháng 01 của năm sau năm mới ra kinh doanh" },
  { event: "Nộp thuế môn bài hàng năm", deadline: "Trước ngày 30 tháng 01 hàng năm" },
  { event: "Nộp báo cáo thuế Quý I / 2026", deadline: "30/04/2026" },
  { event: "Nộp báo cáo thuế Quý II / 2026", deadline: "31/07/2026" },
  { event: "Nộp báo cáo thuế Quý III / 2026", deadline: "31/10/2026" },
  { event: "Nộp báo cáo thuế Quý IV / 2026 & Quyết toán năm", deadline: "31/01/2027 (Kế khai) hoặc 31/03/2027 (Quyết toán doanh nghiệp)" }
];

export const PENALTY_RULES = [
  { delayDays: "1 - 5 ngày (có tình tiết giảm nhẹ)", penaltyText: "Phạt cảnh cáo (nếu không phát sinh số thuế) hoặc xử phạt tối thiểu 2.000.000đ" },
  { delayDays: "1 - 30 ngày (bình thường)", penaltyText: "Phạt tiền từ 2.000.000đ đến 5.000.000đ" },
  { delayDays: "31 - 60 ngày", penaltyText: "Phạt tiền từ 5.000.000đ đến 8.000.000đ" },
  { delayDays: "61 - 90 ngày", penaltyText: "Phạt tiền từ 8.000.000đ đến 15.000.000đ" },
  { delayDays: "Trên 90 ngày (không trốn thuế)", penaltyText: "Phạt tiền từ 15.000.000đ đến 25.000.000đ + Phải nộp đủ số thuế nợ kèm tiền phạt chậm nộp 0.03% mỗi ngày" }
];
