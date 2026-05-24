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
    shortDesc: "Đăng ký giấy phép kinh doanh, mã số thuế hộ và kích hoạt tài khoản nộp thuế điện tử chỉ trong 3 ngày.",
    targetUser: "Cá nhân khởi nghiệp, chủ cửa hàng, quán ăn, xưởng sản xuất nhỏ có nhu cầu pháp lý hóa hoạt động chuyên nghiệp.",
    documentsNeeded: [
      "Ảnh chụp CCCD của chủ hộ còn hiệu lực.",
      "Hợp đồng thuê địa điểm hoạt động hoặc Giấy chứng nhận quyền sở hữu đất.",
      "Thông tin về ngành nghề kinh doanh và vốn dự kiến."
    ],
    processSteps: [
      "Bước 1: Tiếp nhận CCCD và tư vấn lựa chọn mã ngành nghề tối ưu thuế.",
      "Bước 2: Soạn hồ sơ đăng ký thành lập và gửi ký điện tử hoặc ký tay.",
      "Bước 3: Nộp hồ sơ lên Phòng Tài chính - Kế hoạch UBND Quận/Huyện.",
      "Bước 4: Nhận Giấy đăng ký hộ kinh doanh sau 3 ngày và khắc dấu vuông thương hiệu.",
      "Bước 5: Kê khai thuế ban đầu và đăng ký tài khoản thuế điện tử Thuedientu.gdt.gov.vn."
    ],
    duration: "3 - 5 ngày làm việc",
    faq: [
      { q: "Hộ kinh doanh có bắt buộc khắc dấu tròn không?", a: "Không, hộ kinh doanh không có tư cách pháp nhân nên không dùng con dấu tròn pháp lý của Bộ Công An, mà chỉ dùng con dấu vuông của hộ chứa Mã số thuế, Tên hộ, Địa chỉ để giao dịch hay xuất hóa đơn." },
      { q: "Mở hộ kinh doanh xong chưa hoạt động có phải nộp thuế không?", a: "Trong vòng 30 ngày kể từ ngày cấp giấy phép, bạn phải nộp tờ khai môn bài. Thuế khoán chỉ phát sinh khi cơ quan thuế rà soát doanh thu thực tế." }
    ]
  },
  {
    id: "thue-khoan-hkd",
    title: "Kê khai thuế khoán & Thuế phương pháp kê khai",
    group: "HKD",
    shortDesc: "Tối ưu hóa mức thuế khoán hàng năm hoặc lập sổ sách kế toán thuế theo Thông tư 88/2021/TT-BTC chuyên nghiệp.",
    targetUser: "Hộ kinh doanh lớn, sạp chợ, nhà hàng có doanh thu cao cần chứng minh chi phí đầu vào hoặc hộ khoán muốn xin giảm thuế.",
    documentsNeeded: [
      "Giấy phép ĐKKD và Mã số thuế hộ.",
      "Tờ khai doanh thu tự khai hoặc Bảng kê hóa đơn, chứng từ mua bán nếu là HKD kê khai.",
      "Thông báo định mức thuế khoán năm trước (nếu có)."
    ],
    processSteps: [
      "Bước 1: Khảo sát thực tế ngành kinh doanh, địa điểm, nhân sự và phương thức bán hàng.",
      "Bước 2: Khai báo tờ khai thuế khoán mẫu 01/CNKD nộp định kỳ tháng/quý/năm.",
      "Bước 3: Với HKD Kê khai: Thiết lập và ghi chép 4 mẫu sổ kế toán (Sổ doanh thu, Sổ vật liệu, Sổ tiền mặt, Sổ tài sản) theo đúng Thông tư 88/2021/TT-BTC.",
      "Bước 4: Đồng hành giải trình với cán bộ Quản lý thuế trực tiếp khi có đoàn khảo sát doanh thu thực tế."
    ],
    duration: "Thực hiện định kỳ hàng quý hoặc đại diện xử lý trong 7 ngày",
    faq: [
      { q: "Hộ kinh doanh kê khai khác gì hộ khoán?", a: "Hộ kinh doanh kê khai bắt buộc phải mở sổ sách, lưu trữ hóa đơn chứng từ đầu vào/đầu ra và nộp thuế theo doanh thu thực tế xuất hóa đơn. Hộ khoán chỉ nộp một mức ấn định hàng tháng do Chi cục thuế thẩm định." },
      { q: "Doanh thu dưới 100 triệu có phải nộp thuế khoán không?", a: "Doanh thu kinh doanh từ 100 triệu đồng/năm trở xuống thuộc diện miễn thuế GTGT và thuế TNCN." }
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
      { q: "Sàn TMĐT có trừ thuế trực tiếp không?", a: "Hiện nay TikTok Shop/Shopee chỉ khấu trừ thuế thu nhập nếu chủ shop là cá nhân nước ngoài, còn cá nhân Việt Nam tự có nghĩa vụ kê khai nộp thuế dựa trên dữ liệu sàn gửi Tổng cục Thuế." },
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
    targetUser: "Chủ hộ có nhà cho thuê làm văn phòng, thuê mặt bằng kinh doanh, chung cư, phòng trọ doanh thu trên 100tr/năm.",
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
      { q: "Nhà cho thuê dưới 100 triệu/năm có phải nộp thuế không?", a: "Không, miễn thuế hoàn toàn cả GTGT và TNCN. Nhưng nếu có từ 2 căn trở lên, tổng doanh thu cộng dồn vượt 100 triệu/năm vẫn phải đóng thuế cho toàn bộ." },
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
  }
];

export const LEGAL_DOCS_DATA: LegalDoc[] = [
  {
    id: "tt40-2021",
    category: "ThongTu",
    number: "Thông tư 40/2021/TT-BTC",
    title: "Hướng dẫn thuế giá trị gia tăng và thuế thu nhập cá nhân đối với hộ kinh doanh, cá nhân kinh doanh",
    year: 2021,
    field: "Hộ kinh doanh & Cá nhân",
    summary: "Văn bản xương sống hướng dẫn cách tính thuế của tất cả hộ kinh doanh, cá nhân bán hàng online, thương mại điện tử và cho thuê nhà.",
    contentBullets: [
      "Quy định rõ cá nhân có doanh thu từ kinh doanh dưới 100 triệu đồng/năm thuộc diện không phải nộp thuế GTGT và TNCN.",
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
      "Không lấy số nhận về tài khoản ngân hàng để khai thuế (Sẽ bị lệch do phí sàn và hoa hồng).",
      "Chụp đối soát thuế cuối tháng tại giao diện kế toán của Shopee/TikTok Shop.",
      "Chuẩn bị hóa đơn chứng từ đầu vào của hàng hóa (Nếu là hộ kê khai).",
      "Kê khai mẫu 01/CNKD nộp trước ngày cuối cùng của quý."
    ],
    warning: "Nếu cố tình không khai, cơ quan thuế có thể truy quét sao kê liên thông ngân hàng và sàn bất luận thời gian nào từ năm 2021 trở đi, mức phạt trốn thuế là gấp 1 đến 3 lần số thuế trốn.",
    steps: [
      "Bước 1: Tải báo cáo doanh thu trên sàn (Chọn mục Thu nhập -> Báo cáo doanh thu sàn). Doanh thu tính thuế là dòng 'Doanh thu sản phẩm thô' chưa trừ bất kỳ phí gì.",
      "Bước 2: Xác định thuế suất ngành bán lẻ: 1% Thuế giá trị gia tăng (GTGT) + 0.5% Thuế thu nhập cá nhân (TNCN) = Tổng 1.5% doanh thu.",
      "Bước 3: Gửi tờ khai 01/CNKD qua trang Thuedientu.gdt.gov.vn thông qua mã số thuế cá nhân kinh doanh.",
      "Bước 4: Nộp tiền vào tài khoản kho bạc của Chi cục Thuế quản lý trực thuộc."
    ],
    content: "Kinh doanh online hiện nay là ưu tiên rà soát số 1 của Tổng cục Thuế. Việc truyền dữ liệu tự động giữa CTCP Shopee, TikTok Việt Nam và cơ quan thuế đã giúp hoàn thiện cơ sở dữ liệu rà soát toàn quốc. Bạn cần chủ động kê khai nộp thuế kinh doanh cá nhân thay vì đợi thông báo triệu tập.",
    example: "Bạn có shop bán quần áo trên Shopee, một năm tổng tiền khách hàng thanh toán là 1 tỷ đồng. Sàn giữ lại phí dịch vụ cố định và phí thanh toán 10% (Tức bạn nhận về bank 900 triệu). Số thuế bạn phải đóng vẫn tính trên 1 tỷ đồng: GTGT = 1 tỷ * 1% = 10 triệu; TNCN = 1 tỷ * 0.5% = 5 triệu. Tổng thuế phải nộp là 15 triệu đồng chứ không phải tính trên 900 triệu."
  },
  {
    id: "huongdan-doanhthunhabox",
    category: "CTTS",
    title: "Cho thuê nhà trên 100 triệu/năm có phải xuất hóa đơn tài chính cho đối tác?",
    summary: "Hướng dẫn chi tiết quy trình nộp thuế cho thuê bất động sản và làm thế nào để được cơ quan thuế cấp hóa đơn điện tử bàn giao cho công ty thuê nhà.",
    checklist: [
      "Kiểm tra xem hợp đồng thuê nhà quy định ai nộp thuế.",
      "Khách thuê là công ty thì chủ nhà phải làm thủ tục mua hóa đơn lẻ từng lần phát sinh.",
      "Doanh thu dưới 100 triệu/năm không có nghĩa vụ nộp thuế nhưng vẫn phải đăng ký nộp thuế trắng."
    ],
    warning: "Không tự ý viết hóa đơn tay hoặc thuê công ty ma xuất hộ hóa đơn thuê nhà, điều này có thể dẫn tới rủi ro hóa đơn bất hợp pháp cực kỳ nguy hiểm.",
    steps: [
      "Bước 1: Ký hợp đồng thuê nhà ghi rõ điều khoản Thuế và Hóa đơn.",
      "Bước 2: Chuẩn bị hồ sơ nộp thuế bao gồm tờ khai 01/TTS kèm phụ lục 01-1/BK-TTS.",
      "Bước 3: Đến bộ phận Một cửa tại Chi cục Thuế Quận/Huyện có nhà cho thuê để nộp và nhận Thông báo số định danh nộp thuế.",
      "Bước 4: Nộp thuế trực tuyến rồi cầm biên lai quay lại để làm đơn đề nghị cấp hóa đơn lẻ từ cơ quan thuế."
    ],
    content: "Các công ty nước ngoài hoặc tập đoàn lớn luôn yêu cầu có hóa đơn VAT hợp pháp khi thuê nhà làm văn phòng để đưa vào chi phí hợp lý. Vì chủ nhà là cá nhân không thể tự in hóa đơn, nên bắt buộc phải thực hiện thủ tục mua hóa đơn lẻ trực tiếp tại cơ quan quản lý đầu ngành.",
    example: "Chị Lan cho công ty Nhật Bản thuê nhà giá 20 triệu/tháng. Tổng doanh thu năm là 240 triệu đồng (>100 triệu). Thuế suất cho thuê tài sản là 10% (5% GTGT + 5% TNCN). Chị Lan phải đóng tổng cộng: 240 triệu * 10% = 24 triệu đồng tiền thuế mới được chi cục thuế cấp hóa đơn VAT 20tr/tháng bàn giao cho công ty."
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
    content: "Phương pháp kê khai giúp mở rộng quy mô, được ký kết các hợp đồng kinh tế lớn với các công ty. Đây chính là bước chuyển giao chuyên nghiệp trước khi nâng cấp thành lập Doanh nghiệp tư nhân hoặc Công ty TNHH.",
    example: "Một hộ kinh doanh phân phối linh kiện điện tử doanh thu 5 tỷ/năm. Nếu nộp thuế khoán cán bộ thuế có thể áp doanh thu cực kì cao hoặc kiểm tra kho hàng. Khi chuyển sang kê khai sổ sách, hộ có hóa đơn đầu vào linh kiện từ công ty nhập khẩu nên đóng thuế chính xác 1.5% trên doanh thu và bảo vệ an toàn kho hàng."
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
    answer: "Chỉ cần tổng doanh thu bán hàng online (bao gồm tất cả các bên, hoặc tổng mức thu nhập cá nhân) vượt quá 100.000.000 đồng trong một năm dương lịch là bạn bắt buộc phải kê khai và nộp thuế GTGT (1%) và thuế TNCN (0.5%), tổng cộng là 1.5% trên doanh thu.",
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
