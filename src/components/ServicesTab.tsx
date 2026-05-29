import React from "react";
import { 
  Building2, 
  FileText, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ChevronRight, 
  Plus, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { SERVICES_DATA } from "../lib/data";
import { ServiceDetail } from "../types";

interface ServicesTabProps {
  userSegment: "hkd" | "dn";
  setUserSegment: (seg: "hkd" | "dn") => void;
  serviceGroupFilter: string;
  setServiceGroupFilter: (filter: string) => void;
  serviceSubView: "catalog" | "lifecycle";
  setServiceSubView: (view: "catalog" | "lifecycle") => void;
  lifecycleEntity: "hkd" | "dn";
  setLifecycleEntity: (entity: "hkd" | "dn") => void;
  selectedService: ServiceDetail | null;
  setSelectedService: (service: ServiceDetail | null) => void;
  setLeadForm: React.Dispatch<React.SetStateAction<{
    fullName: string;
    phoneNumber: string;
    bizType: string;
    problem: string;
  }>>;
  setActiveTab: (tab: string) => void;
  viewMode?: "intro" | "services";
}

export default function ServicesTab({
  userSegment,
  setUserSegment,
  serviceGroupFilter,
  setServiceGroupFilter,
  serviceSubView,
  setServiceSubView,
  lifecycleEntity,
  setLifecycleEntity,
  selectedService,
  setSelectedService,
  setLeadForm,
  setActiveTab,
  viewMode = "services",
}: ServicesTabProps) {

  // VIEW MODE 1: WELCOME INTRO (Audiences, Warnings, Process, License & Credentials)
  if (viewMode === "intro") {
    return (
      <div id="view-tab-services-intro" className="space-y-8 animate-fadeIn text-left">
        {/* INTERACTIVE COMPREHENSIVE ONBOARDING ROADMAP SELECTOR FOR BEGINNERS - DESIGNED 40% LARGER */}
        <div className="bg-slate-50 border border-gray-250 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#800020] text-white text-sm font-black shadow">?</span>
              <div>
                <h3 className="text-base md:text-lg font-black text-[#001F3F] uppercase tracking-wide">
                  Vui lòng lựa chọn mô hình kinh doanh cốt lõi của bạn:
                </h3>
                <p className="text-xs text-gray-500 font-medium font-sans">Bấm vào lĩnh vực tương ứng để chuyển ngay sang biểu mẫu kiểm tra rà soát chi tiết</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[
              {
                id: "HKD",
                label: "Hộ kinh doanh",
                contentLabel: "Thuế khoán, hóa đơn",
                desc: "Kê khai thuế theo Thông tư 88 chính thức năm 2026, hỗ trợ hóa đơn điện tử máy tính tiền, hướng dẫn mở đủ 05 loại sổ sách kế toán.",
                tag: "Phương pháp mới",
                color: "border-amber-300 bg-amber-50/30 hover:bg-amber-100/50 hover:border-amber-400 focus:ring-amber-400",
                badgeColor: "bg-amber-600",
                icon: <Building2 className="text-amber-700" size={30} />,
                action: () => {
                  setUserSegment("hkd");
                  setServiceGroupFilter("HKD");
                  setServiceSubView("catalog");
                  setActiveTab("services");
                }
              },
              {
                id: "CNKD",
                label: "TMĐT (Shopee, TikTok)",
                contentLabel: "Shopee, TikTok",
                desc: "Bóc gỡ doanh thu sao kê đối soát sàn TMĐT, tối ưu quyết toán thuế thu nhập cá nhân tự động khớp dữ liệu tránh phạt hồi tố.",
                tag: "TMĐT - NÓNG",
                color: "border-blue-300 bg-blue-50/30 hover:bg-blue-100/50 hover:border-blue-400 focus:ring-blue-400",
                badgeColor: "bg-blue-600",
                icon: <Sparkles className="text-blue-700" size={30} />,
                action: () => {
                  setUserSegment("hkd");
                  setServiceGroupFilter("CNKD");
                  setServiceSubView("catalog");
                  setActiveTab("services");
                }
              },
              {
                id: "CTTS",
                label: "Cho thuê tài sản",
                contentLabel: "Nhà trọ",
                desc: "Tờ khai thuế tài sản 01/TTS cho thuê nhà riêng, kho bãi, chung cư, hỗ trợ xuất hóa đơn lẻ cho các công ty thuê nhanh gọn.",
                tag: "Thuế Tài Sản",
                color: "border-emerald-300 bg-emerald-50/30 hover:bg-emerald-100/50 hover:border-emerald-400 focus:ring-emerald-400",
                badgeColor: "bg-emerald-600",
                icon: <FileText className="text-emerald-700" size={30} />,
                action: () => {
                  setUserSegment("hkd");
                  setServiceGroupFilter("CTTS");
                  setServiceSubView("catalog");
                  setActiveTab("services");
                }
              },
              {
                id: "DN",
                label: "Doanh nghiệp",
                contentLabel: "Kế toán thuế",
                desc: "Bộ máy Kế toán trưởng đại diện, dọn dẹp sổ sách kế toán, lập báo cáo tài chính năm, quyết toán thuế TNDN & giải trình hóa đơn vi phạm.",
                tag: "Trách Nhiệm SME",
                color: "border-purple-300 bg-purple-50/30 hover:bg-purple-100/50 hover:border-purple-400 focus:ring-purple-400",
                badgeColor: "bg-purple-600",
                icon: <Layers className="text-purple-700" size={30} />,
                action: () => {
                  setUserSegment("dn");
                  setServiceGroupFilter("DN");
                  setServiceSubView("catalog");
                  setActiveTab("services");
                }
              },
              {
                id: "XL",
                label: "Xử lý truy thu",
                contentLabel: "Thanh tra",
                desc: "Ủy quyền đại diện giải trình rà soát thanh kiểm tra thuế, tháo gỡ phong tỏa hóa đơn ảo, giảm thiểu lãi phạt chậm nộp nợ thuế gấp.",
                tag: "Khẩn cấp - Cứu hộ",
                color: "border-rose-300 bg-rose-50/30 hover:bg-rose-100/50 hover:border-rose-400 focus:ring-rose-400",
                badgeColor: "bg-rose-600",
                icon: <AlertTriangle className="text-rose-700" size={30} />,
                action: () => {
                  setUserSegment("dn");
                  setServiceGroupFilter("XL");
                  setServiceSubView("catalog");
                  setActiveTab("services");
                }
              }
            ].map((role) => (
              <div
                key={role.id}
                onClick={role.action}
                className="p-5 border-2 rounded-2xl text-left cursor-pointer transition-all duration-300 relative group flex flex-col justify-between hover:scale-103 hover:shadow-lg border-gray-200 bg-white"
              >
                <div className="space-y-4">
                  <span className={`absolute -top-3 left-4 text-[9px] font-black uppercase text-white px-2 py-0.5 rounded-full tracking-wider shadow-sm ${role.badgeColor}`}>
                    {role.tag}
                  </span>
                  
                  <div className="flex items-center justify-between pb-1 border-b border-gray-100">
                    {role.icon}
                    <span className="text-[10px] font-bold text-[#800020] uppercase font-mono tracking-tight bg-white px-2 py-1 rounded-md border border-gray-150">
                      {role.contentLabel}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-black text-base text-[#001F3F] leading-tight group-hover:text-[#800020] transition-colors uppercase tracking-tight">
                      {role.label}
                    </h4>
                  </div>

                  <p className="text-[11px] mt-2 text-gray-650 leading-relaxed font-normal">
                    {role.desc}
                  </p>
                </div>
                
                <div className="mt-4 text-[10px] font-black text-[#800020] flex items-center justify-between uppercase tracking-wider border-t border-gray-100 pt-3">
                  <span>Xem hồ quy trình ➜</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === KHỐI NỖI ĐAU (PAIN-POINTS BLOCK) === */}
        <div className="bg-[#FFF8F8] border border-red-200 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="text-center space-y-1">
            <span className="bg-red-100 text-[#800020] text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-widest">
              Cảnh báo rủi ro thuế 2026
            </span>
            <h3 className="text-lg md:text-xl font-black text-[#001F3F] uppercase tracking-dense">
              Bạn Đang Gặp Tình Trạng Này?
            </h3>
            <p className="text-[11.5px] text-gray-500 max-w-2xl mx-auto font-medium">
              Dưới đây là 5 mối nguy cơ và tình huống rủi ro thực tế cao nhất mà các hộ kinh doanh và doanh nghiệp đang bị thanh tra thu thuế gắt gao.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-1">
            {[
              {
                title: "Bị mời làm việc gấp",
                desc: "Nhận trát triệu tập của Chi cục Thuế địa phương yêu cầu nộp tờ khai sổ sách hoặc giải trình doanh thu.",
                icon: "⚠️"
              },
              {
                title: "Chưa kê khai sàn TMĐT",
                desc: "Dòng tiền qua Shopee, TikTok Shop, affiliate chảy về tài khoản cá nhân liên tục nhiều năm nhưng chưa nộp thuế.",
                icon: "🔥"
              },
              {
                title: "Lo sợ phạt truy thu",
                desc: "Số liệu nợ đọng, chậm nộp, hóa đơn chênh lệch kéo dài nhiều năm liên tục có nguy cơ bị phạt gấp nhiều lần.",
                icon: "💸"
              },
              {
                title: "Mông lung pháp lý",
                desc: "Không biết nên đăng ký mô hình Hộ kinh doanh Thông tư 88 hay Thành lập Doanh nghiệp trọn gói để tối ưu chi phí.",
                icon: "❓"
              },
              {
                title: "Bị quét sao kê ngân hàng",
                desc: "Dòng tiền giao dịch qua ngân hàng cá nhân quá lớn bị ngân hàng nhà nước chuyển diện rà soát bất ngờ.",
                icon: "🏦"
              }
            ].map((pain, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-red-100 shadow-sm transition hover:shadow-md text-left flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xl block">{pain.icon}</span>
                  <h4 className="font-extrabold text-xs text-[#800020] uppercase">{pain.title}</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-semibold">{pain.desc}</p>
                </div>
                <div className="mt-3 text-[10px] text-red-500 font-extrabold flex items-center gap-1">
                  ● Rủi Ro Cực Kỳ Cao
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={() => setActiveTab("tools")}
              className="bg-[#800020] hover:bg-neutral-900 active:scale-95 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest shadow transition-all duration-250 animate-bounce"
            >
              📊 [ CHUYỂN BỘ CÔNG CỤ TÍNH THUẾ HÀNH CHÍNH ]
            </button>
          </div>
        </div>

        {/* === QUY TRÌNH XỬ LÝ AN TOÀN TUYỆT ĐỐI (4-STEP PROCESS) === */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 space-y-6">
          <div className="text-center space-y-1">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-widest">
              An toàn pháp lý tuyệt đối
            </span>
            <h3 className="text-lg md:text-xl font-black text-[#001F3F] uppercase tracking-tight">
              Quy Trình Xử Lý 4 Bước Bảo Mật
            </h3>
            <p className="text-[11.5px] text-gray-500 max-w-2xl mx-auto font-semibold">
              Xua tan nỗi lo bị lộ thông tin sao kê riêng tư hoặc bị phạt chồng phạt. Chúng tôi xử lý dứt điểm rủi ro từ gốc.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative pt-1">
            {[
              {
                step: "01",
                title: "Tiếp Nhận & Bảo Mật 100%",
                desc: "Đại lý Thuế ký cam kết bảo mật bằng văn bản pháp lý. Toàn bộ sao kê ngân hàng, hóa đơn đầu vào của bạn được mã hóa an toàn tuyệt đối.",
                highlight: "Mã hóa 100%"
              },
              {
                step: "02",
                title: "Rà Soát Thực Diện Dữ Liệu",
                desc: "Chuyên viên bóc tách toàn diện các giao dịch sao kê ngân hàng, khai thác và gỡ lỗi lịch sử tờ khai cũ trước khi cơ quan quản lý triệu tập.",
                highlight: "Tìm và gỡ lỗi cũ"
              },
              {
                step: "03",
                title: "Phân Tích Đo Lường Thuế",
                desc: "Chúng tôi định lượng chính xác số tiền phát sinh thực tế, tư vấn quy đổi dòng doanh nghiệp giúp bảo vệ từng đồng lợi nhuận.",
                highlight: "Tiết kiệm 80% phạt"
              },
              {
                step: "04",
                title: "Đại Diện Xử Lý Trực Tiếp",
                desc: "Nhận ủy quyền chính thức, trực tiếp làm việc & giải trình trước cơ quan Chi cục Thuế địa phương, tháo gỡ vướng mắc nhanh.",
                highlight: "Làm việc tại Chi cục"
              }
            ].map((proc, idx) => (
              <div key={idx} className="bg-slate-50 p-5 rounded-xl border border-gray-200 relative text-left hover:border-[#800020] transition group">
                <span className="absolute top-3 right-3 text-2xl font-black text-gray-200 group-hover:text-amber-200 transition-colors">
                  {proc.step}
                </span>
                <h4 className="font-extrabold text-xs text-[#001F3F] uppercase tracking-wide border-b border-gray-200 pb-2 mb-3 max-w-[80%]">
                  {proc.title}
                </h4>
                <p className="text-[11px] text-gray-600 leading-normal font-semibold mb-4">
                  {proc.desc}
                </p>
                <span className="inline-block bg-white border border-gray-300 text-[#800020] text-[9px] font-black px-2 py-1 rounded uppercase tracking-wider">
                  🛡️ {proc.highlight}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* === KHỐI TÍN NHIỆM (TRUST BLOCK) === */}
        <div className="bg-[#FAF9F6] border border-gray-250 rounded-2xl p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center text-left">
            <div className="lg:col-span-12 space-y-3">
              <span className="bg-amber-100 text-amber-800 text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-widest inline-block">
                Đầy đủ tư cách pháp lý được bảo hộ
              </span>
              <h3 className="text-lg md:text-xl font-black text-[#001F3F] uppercase tracking-tight">
                Đơn Vị Đại Lý Thuế Được Cấp Phép Chính Thức 
              </h3>
              <p className="text-xs text-gray-650 leading-relaxed font-semibold">
                Đại lý Thuế Thành Phố hoạt động theo Giấy phép số <span className="text-[#800020] font-black font-mono">00056/BTC</span> do Tổng Cục Thuế cấp. Chúng tôi có đầy đủ tư cách đại diện người nộp thuế làm việc trực tiếp trước các ban bộ ngành Cục/Chi cục thuế toàn quốc.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-bold text-gray-750 p-1">
                <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-150">
                  <span className="text-emerald-600 font-black">✔</span>
                  <span>Chứng chỉ hành nghề chính thức từ Bộ tài chính</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-150">
                  <span className="text-emerald-600 font-black">✔</span>
                  <span>Mã số hồ sơ đại lý thuế trực thuộc công bố công khai</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-3 rounded-lg border border-gray-150">
                  <span className="text-emerald-600 font-black">✔</span>
                  <span>Bảo lãnh rủi ro, bồi thường sai sót chuyên môn 100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, viewMode === "services"
  return (
    <div id="view-tab-services" className="space-y-6 animate-fadeIn">
      {/* Dynamic Selector Gate for administrative tasks */}
      <div className="bg-[#001F3F] border border-gray-250 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 shadow text-white">
        <div className="text-left">
          <span className="text-rose-300 text-[10px] font-black uppercase tracking-widest block mb-1">💼 QUY TRÌNH HÀNH CHÍNH & NỘP SỔ</span>
          <h3 className="text-base md:text-lg font-black uppercase tracking-tight">Hệ Thống Lộ Trình Thủ Tục & Dịch Vụ Thuế</h3>
          <p className="text-[11px] text-gray-300">Tra cứu nhanh hồ sơ nộp thuế cần chuẩn bị, trình tự xử lý, thời gian giải quyết và lộ trình vòng đời của Hộ kinh doanh & Doanh nghiệp.</p>
        </div>

        <div className="flex bg-white/10 border border-white/20 p-1 rounded-xl shrink-0 w-full md:w-auto overflow-hidden">
          <button
            onClick={() => setServiceSubView("catalog")}
            className={`flex-1 md:flex-initial text-center px-4 py-2.5 text-xs font-black uppercase rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              serviceSubView === "catalog"
                ? "bg-amber-400 text-[#001F3F] font-extrabold shadow-sm"
                : "text-white hover:bg-white/15 font-semibold"
            }`}
          >
            📋 TRA CỨU HỒ SƠ DỊCH VỤ
          </button>
          <button
            onClick={() => setServiceSubView("lifecycle")}
            className={`flex-1 md:flex-initial text-center px-4 py-2.5 text-xs font-black uppercase rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              serviceSubView === "lifecycle"
                ? "bg-amber-400 text-[#001F3F] font-extrabold shadow-sm"
                : "text-white hover:bg-white/15 font-semibold"
            }`}
          >
            ⟲ 5 GIAI ĐOẠN TUÂN THỦ
          </button>
        </div>
      </div>

      {/* INTERACTIVE COMPREHENSIVE ONBOARDING ROADMAP SELECTOR FOR BEGINNERS - DESIGNED 40% LARGER */}
      <div className="bg-slate-50 border border-gray-250 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#800020] text-white text-sm font-black shadow">?</span>
            <div>
              <h3 className="text-base md:text-lg font-black text-[#001F3F] uppercase tracking-wide">
                Vui lòng lựa chọn mô hình kinh doanh cốt lõi của bạn:
              </h3>
              <p className="text-xs text-gray-500 font-medium">Bấm vào lĩnh vực tương ứng để được tối ưu hóa tờ khai thuế & rà soát dữ liệu rủi ro</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            {
              id: "HKD",
              label: "Hộ kinh doanh",
              contentLabel: "Thuế khoán, hóa đơn",
              desc: "Kê khai thuế theo Thông tư 88 chính thức năm 2026, hỗ trợ hóa đơn điện tử máy tính tiền, hướng dẫn mở đủ 05 loại sổ sách kế toán.",
              tag: "Phương pháp mới",
              color: "border-amber-300 bg-amber-50/30 hover:bg-amber-100/50 hover:border-amber-400 focus:ring-amber-400",
              badgeColor: "bg-amber-600",
              icon: <Building2 className="text-amber-700" size={30} />,
              action: () => {
                setUserSegment("hkd");
                setServiceGroupFilter("HKD");
                setServiceSubView("catalog");
                const previewEl = document.getElementById("services-catalog-focus");
                if (previewEl) previewEl.scrollIntoView({ behavior: "smooth" });
              }
            },
            {
              id: "CNKD",
              label: "TMĐT (Shopee, TikTok)",
              contentLabel: "Shopee, TikTok",
              desc: "Bóc gỡ doanh thu sao kê đối soát sàn TMĐT, tối ưu quyết toán thuế thu nhập cá nhân tự động khớp dữ liệu tránh phạt hồi tố.",
              tag: "TMĐT - NÓNG",
              color: "border-blue-300 bg-blue-50/30 hover:bg-blue-100/50 hover:border-blue-400 focus:ring-blue-400",
              badgeColor: "bg-blue-600",
              icon: <Sparkles className="text-blue-700" size={30} />,
              action: () => {
                setUserSegment("hkd");
                setServiceGroupFilter("CNKD");
                setServiceSubView("catalog");
                const previewEl = document.getElementById("services-catalog-focus");
                if (previewEl) previewEl.scrollIntoView({ behavior: "smooth" });
              }
            },
            {
              id: "CTTS",
              label: "Cho thuê tài sản",
              contentLabel: "Nhà trọ",
              desc: "Tờ khai thuế tài sản 01/TTS cho thuê nhà riêng, kho bãi, chung cư, hỗ trợ xuất hóa đơn lẻ cho các công ty thuê nhanh gọn.",
              tag: "Thuế Tài Sản",
              color: "border-emerald-300 bg-emerald-50/30 hover:bg-emerald-100/50 hover:border-emerald-400 focus:ring-emerald-400",
              badgeColor: "bg-emerald-600",
              icon: <FileText className="text-emerald-700" size={30} />,
              action: () => {
                setUserSegment("hkd");
                setServiceGroupFilter("CTTS");
                setServiceSubView("catalog");
                const previewEl = document.getElementById("services-catalog-focus");
                if (previewEl) previewEl.scrollIntoView({ behavior: "smooth" });
              }
            },
            {
              id: "DN",
              label: "Doanh nghiệp",
              contentLabel: "Kế toán thuế",
              desc: "Bộ máy Kế toán trưởng đại diện, dọn dẹp sổ sách kế toán, lập báo cáo tài chính năm, quyết toán thuế TNDN & giải trình hóa đơn vi phạm.",
              tag: "Trách Nhiệm SME",
              color: "border-purple-300 bg-purple-50/30 hover:bg-purple-100/50 hover:border-purple-400 focus:ring-purple-400",
              badgeColor: "bg-purple-600",
              icon: <Layers className="text-purple-700" size={30} />,
              action: () => {
                setUserSegment("dn");
                setServiceGroupFilter("DN");
                setServiceSubView("catalog");
                const previewEl = document.getElementById("services-catalog-focus");
                if (previewEl) previewEl.scrollIntoView({ behavior: "smooth" });
              }
            },
            {
              id: "XL",
              label: "Xử lý truy thu",
              contentLabel: "Thanh tra",
              desc: "Ủy quyền đại diện giải trình rà soát thanh kiểm tra thuế, tháo gỡ phong tỏa hóa đơn ảo, giảm thiểu lãi phạt chậm nộp nợ thuế gấp.",
              tag: "Khẩn cấp - Cứu hộ",
              color: "border-rose-300 bg-rose-50/30 hover:bg-rose-100/50 hover:border-rose-400 focus:ring-rose-400",
              badgeColor: "bg-rose-600",
              icon: <AlertTriangle className="text-rose-700" size={30} />,
              action: () => {
                setUserSegment("dn");
                setServiceGroupFilter("XL");
                setServiceSubView("catalog");
                const previewEl = document.getElementById("services-catalog-focus");
                if (previewEl) previewEl.scrollIntoView({ behavior: "smooth" });
              }
            }
          ].map((role) => {
            const isSelected = 
              (role.id === "HKD" && serviceGroupFilter === "HKD") ||
              (role.id === "CNKD" && serviceGroupFilter === "CNKD") ||
              (role.id === "CTTS" && serviceGroupFilter === "CTTS") ||
              (role.id === "DN" && serviceGroupFilter === "DN") ||
              (role.id === "XL" && serviceGroupFilter === "XL");
              
            return (
              <div
                key={role.id}
                onClick={() => {
                  if (isSelected) {
                    setServiceGroupFilter("ALL");
                  } else {
                    role.action();
                  }
                }}
                className={`p-6 border-2 rounded-2xl text-left cursor-pointer transition-all duration-300 relative group flex flex-col justify-between hover:scale-103 hover:shadow-lg ${
                  isSelected 
                    ? "border-[#800020] bg-red-50/40 ring-2 ring-[#800020]/20 shadow-md" 
                    : "border-gray-200 bg-white"
                } ${role.color}`}
              >
                <div className="space-y-4">
                  <span className={`absolute -top-3 left-4 text-[9px] font-black uppercase text-white px-2 py-0.5 rounded-full tracking-wider shadow-sm ${role.badgeColor}`}>
                    {role.tag}
                  </span>
                  
                  <div className="flex items-center justify-between pb-1 border-b border-gray-100">
                    {role.icon}
                    <span className="text-[10px] font-bold text-[#800020] uppercase font-mono tracking-tight bg-white px-2 py-1 rounded-md border border-gray-150">
                      {role.contentLabel}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-black text-lg text-[#001F3F] leading-tight group-hover:text-[#800020] transition-colors">
                      {role.label}
                    </h4>
                  </div>

                  <p className="text-xs mt-2 text-gray-600 leading-relaxed font-normal">
                    {role.desc}
                  </p>
                </div>
                
                <div className="mt-4 text-[10px] font-black text-[#800020] flex items-center justify-between uppercase tracking-wider border-t border-gray-100 pt-3">
                  <span>Chi tiết giải pháp</span>
                  <ChevronRight size={12} className="transform group-hover:translate-x-1.5 transition-transform text-[#800020]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* === KHỐI NỖI ĐAU (PAIN-POINTS BLOCK) === */}
      <div className="bg-[#FFF8F8] border border-red-200 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="bg-red-100 text-[#800020] text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-widest">
            Cảnh báo rủi ro thuế 2026
          </span>
          <h3 className="text-xl md:text-2xl font-black text-[#001F3F] uppercase tracking-tight">
            Bạn Đang Gặp Tình Trạng Này?
          </h3>
          <p className="text-xs text-gray-500 max-w-2xl mx-auto">
            Dưới đây là 5 nỗi lo sát sườn nhất của các chủ shop TMĐT, hộ kinh doanh và doanh nghiệp SME hiện nay trước khi thanh tra Thuế gõ cửa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-2">
          {[
            {
              title: "Bị mời làm việc gấp",
              desc: "Nhận trát triệu tập của Chi cục Thuế địa phương yêu cầu nộp tờ khai sổ sách hoặc giải trình doanh thu.",
              icon: "⚠️"
            },
            {
              title: "Chưa kê khai sàn TMĐT",
              desc: "Dòng tiền qua Shopee, TikTok Shop, affiliate chảy về tài khoản cá nhân liên tục nhiều năm nhưng chưa nộp thuế.",
              icon: "🔥"
            },
            {
              title: "Lo sợ phạt truy thu",
              desc: "Số liệu nợ đọng, chậm nộp, hóa đơn chênh lệch kéo dài nhiều năm liên tục có nguy cơ bị phạt gấp nhiều lần.",
              icon: "💸"
            },
            {
              title: "Mông lung pháp lý",
              desc: "Không biết nên đăng ký mô hình Hộ kinh doanh Thông tư 88 hay Thành lập Doanh nghiệp trọn gói để tối ưu chi phí.",
              icon: "❓"
            },
            {
              title: "Bị quét sao kê ngân hàng",
              desc: "Dòng tiền giao dịch qua ngân hàng cá nhân quá lớn bị ngân hàng nhà nước chuyển diện rà soát bất ngờ.",
              icon: "🏦"
            }
          ].map((pain, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-red-100 shadow-sm transition hover:shadow-md text-left flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-2xl block">{pain.icon}</span>
                <h4 className="font-extrabold text-sm text-[#800020]">{pain.title}</h4>
                <p className="text-[11px] text-gray-600 leading-relaxed font-medium">{pain.desc}</p>
              </div>
              <div className="mt-3 text-[10px] text-red-500 font-extrabold flex items-center gap-1">
                ● Rủi Ro Cực Cao
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-3">
          <button
            onClick={() => {
              setActiveTab("calculator");
              document.getElementById("view-tab-calculator")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-[#800020] hover:bg-neutral-900 active:scale-95 text-white px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest shadow transition-all duration-200"
          >
            🔍 [ KIỂM TRA MỨC PHẠT & RỦI RO NGAY ]
          </button>
        </div>
      </div>

      {/* === QUY TRÌNH XỬ LÝ AN TOÀN TUYỆT ĐỐI (4-STEP PROCESS) === */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-widest">
            An toàn pháp lý tuyệt đối
          </span>
          <h3 className="text-xl md:text-2xl font-black text-[#001F3F] uppercase tracking-tight">
            Quy Trình Xử Lý 4 Bước Bảo Mật
          </h3>
          <p className="text-xs text-gray-500 max-w-2xl mx-auto">
            Xua tan nỗi lo bị lộ thông tin sao kê, bị phạt chồng phạt và bị đẩy trách nhiệm. Chúng tôi kiểm soát rủi ro từ gốc rễ.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative pt-2">
          {[
            {
              step: "01",
              title: "Tiếp Nhận & Bảo Mật 100%",
              desc: "Đại lý Thuế ký cam kết bảo mật bằng văn bản pháp lý. Toàn bộ sao kê ngân hàng, hóa đơn đầu vào của bạn được mã hóa an toàn tuyệt đối.",
              highlight: "Mã hóa 100%"
            },
            {
              step: "02",
              title: "Rà Soát Thực Chiến Dữ Liệu",
              desc: "Chuyên viên bóc tách toàn diện các giao dịch sao kê ngân hàng, khai thác và gỡ lỗi lịch sử tờ khai cũ trước khi cơ quan quản lý triệu tập.",
              highlight: "Tìm và gỡ lỗi cũ"
            },
            {
              step: "03",
              title: "Phân Tích Đo Lường Thuế",
              desc: "Chúng tôi định lượng chính xác số tiền phát sinh thực tế, tư vấn quy đổi dòng doanh nghiệp giúp bảo vệ từng đồng lợi nhuận.",
              highlight: "Tiết kiệm 80% phạt"
            },
            {
              step: "04",
              title: "Đại Diện Xử Lý Trực Tiếp",
              desc: "Nhận ủy quyền chính thức, trực tiếp làm việc & giải trình trước cơ quan Chi cục Thuế địa phương, tháo gỡ vướng mắc nhanh.",
              highlight: "Làm việc tại Chi cục"
            }
          ].map((proc, idx) => (
            <div key={idx} className="bg-slate-50 p-5 rounded-xl border border-gray-200 relative text-left hover:border-[#800020] transition group">
              <span className="absolute top-3 right-3 text-2xl font-black text-gray-200 group-hover:text-amber-200 transition-colors">
                {proc.step}
              </span>
              <h4 className="font-extrabold text-xs text-[#001F3F] uppercase tracking-wide border-b border-gray-200 pb-2 mb-3 max-w-[80%]">
                {proc.title}
              </h4>
              <p className="text-[11px] text-gray-600 leading-normal font-semibold mb-4">
                {proc.desc}
              </p>
              <span className="inline-block bg-white border border-gray-300 text-[#800020] text-[9px] font-black px-2 py-1 rounded uppercase tracking-wider">
                🛡️ {proc.highlight}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* === KHỐI TÍN NHIỆM (TRUST BLOCK) === */}
      <div className="bg-[#FAF9F6] border border-gray-250 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          <div className="lg:col-span-5 space-y-4">
            <span className="bg-amber-100 text-amber-800 text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-widest">
              Đầy đủ tư cách pháp lý
            </span>
            <h3 className="text-xl md:text-2xl font-black text-[#001F3F] uppercase tracking-tight">
              Đơn Vị Đại Lý Thuế Được Cấp Phép Chính Thức 
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed font-semibold">
              Đại lý Thuế Thành Phố hoạt động theo Giấy phép số <span className="text-[#800020] font-black font-mono">368/GP-TCT</span> do Tổng Cục Thuế cấp. Chúng tôi có đầy đủ tư cách đại diện người nộp thuế làm việc trực tiếp trước các ban bộ ngành Cục/Chi cục thuế toàn quốc.
            </p>
            <div className="space-y-2 text-xs font-bold text-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-emerald-500">✔</span>
                <span>Đội ngũ Kế toán viên có Chứng chỉ Hành nghề chính thức</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500">✔</span>
                <span>Mã số hồ sơ đăng ký đại lý thuế công khai minh bạch</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500">✔</span>
                <span>Hợp đồng dịch vụ bảo lãnh trách nhiệm sai sót 100%</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Mạng lưới đối tác",
                val: "5000+ Khách hàng",
                desc: "Từ các hộ kinh doanh cá thể sỉ lẻ chợ đầu mối đến các siêu shop doanh thu hàng trăm tỷ trên TikTok, Shopee."
              }
            ].map((stat, idx) => (
              <div key={idx} id={`stat-card-${idx}`} className="bg-white p-5 rounded-xl border border-gray-250 shadow-sm space-y-1.5 sm:col-span-2">
                <span className="text-[10px] font-black text-[#800020] uppercase tracking-widest block">{stat.title}</span>
                <div className="font-black text-base text-[#001F3F] uppercase">{stat.val}</div>
                <p className="text-[11px] text-gray-500 leading-relaxed font-medium">{stat.desc}</p>
              </div>
            ))}
            
            <div className="sm:col-span-2 bg-[#001F3F] text-amber-300 p-4 rounded-xl flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg text-lg">💡</div>
              <p className="text-[11px] leading-relaxed text-slate-200">
                <strong>Nghiêm túc khuyến cáo:</strong> Cơ quan quản lý đang ứng dụng công nghệ rà soát AI liên thông tự động toàn bộ tài khoản ngân hàng cá nhân và dữ liệu gửi từ bưu cục. Hãy thực hiện kiểm tra bảo mật sớm nhất để tránh cộng dồn tiền phạt chậm nộp.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="services-catalog-focus" className="scroll-mt-6"></div>

      {/* VIEW 2.1: INTERACTIVE SERVICES CATALOG */}
      {serviceSubView === "catalog" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            {/* Scrollable list on left */}
            <div className="lg:col-span-4 space-y-2 max-h-[500px] overflow-y-auto pr-2">
              {SERVICES_DATA.filter(s => {
                const isInCategory = userSegment === "hkd"
                  ? ["HKD", "CNKD", "CTTS"].includes(s.group)
                  : ["DN", "XL"].includes(s.group);
                if (!isInCategory) return false;
                return serviceGroupFilter === "ALL" || s.group === serviceGroupFilter;
              }).map((s) => (
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
                    {s.group === "XL" && "Giải trình khân cấp"}
                  </span>
                </div>
              ))}
            </div>

            {/* Selected Service Detailed Board on right */}
            <div className="lg:col-span-8 bg-slate-50 border border-gray-200 p-6 rounded-lg space-y-4 animate-fadeIn">
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
                      Quy trình xử lý tại Đại lý Thuế Thành Phố:
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

      {/* VIEW 2.2: COMPLEX INTERACTIVE LIFECYCLE COMPLIANCE ROADSAP */}
      {serviceSubView === "lifecycle" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Entity Type Toggle Selector */}
          <div className="bg-[#001F3F] text-white rounded-lg p-5 flex flex-col md:flex-row justify-between items-center gap-4 shadow">
            <div>
              <h4 className="text-sm font-bold tracking-wider text-rose-300 uppercase flex items-center gap-2">
                <Sparkles size={14} className="animate-pulse" />
                TRÌNH TRA CỨU QUY TRÌNH PHÁP LÝ VIỆT NAM
              </h4>
              <h3 className="text-lg font-black mt-1">Chu Kỳ Vòng Đời Tuân Thủ Pháp Luật Thuế, Kế Toán & BHXH</h3>
              <p className="text-[11px] text-gray-300 mt-0.5">Xác định chuẩn xác lộ trình các nghĩa vụ bắt buộc từ khi khởi sự đến khi vận hành ổn định và chấm dứt.</p>
            </div>

            <div className="flex bg-white/10 p-1 rounded-md shrink-0 border border-white/10">
              <button
                onClick={() => setLifecycleEntity("hkd")}
                className={`px-4 py-2 text-xs font-black uppercase rounded transition-all flex items-center gap-1.5 ${
                  lifecycleEntity === "hkd"
                    ? "bg-white text-[#001F3F] shadow-sm"
                    : "text-white hover:bg-white/10"
                }`}
              >
                🏠 Hộ / Cá Nhân Kinh Doanh
              </button>
              <button
                onClick={() => setLifecycleEntity("dn")}
                className={`px-4 py-2 text-xs font-black uppercase rounded transition-all flex items-center gap-1.5 ${
                  lifecycleEntity === "dn"
                    ? "bg-white text-[#001F3F] shadow-sm"
                    : "text-white hover:bg-white/10"
                }`}
              >
                🏢 Doanh Nghiệp / Công Ty
              </button>
            </div>
          </div>

          {/* Summary card with stats */}
          <div className="bg-slate-50 border-l-4 border-[#800020] p-4 rounded-r-lg grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <div className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">Cơ sở pháp lý nền tảng:</div>
              <div className="font-extrabold text-[#001F3F]">
                {lifecycleEntity === "hkd" 
                  ? "Nghị định 141/2026/NĐ-CP, Thông tư 152/2025/TT-BTC, Thông tư 40/2021/TT-BTC & Thông tư 88/2021/TT-BTC" 
                  : "Luật Doanh nghiệp 2020, Thông tư 200 & 133/BTC, Luật BHXH, Bộ luật Lao động 2019"}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">Chế độ kế toán & Lưu trữ:</div>
              <div className="font-extrabold text-[#001F3F]">
                {lifecycleEntity === "hkd" 
                  ? "Chỉ áp dụng 5 loại sổ kế toán bắt buộc (TT 88). Không cần lập Báo cáo tài chính." 
                  : "Áp dụng Kế toán trưởng, phần mềm kế toán, Lập Báo cáo tài chính (BCTC) nộp Sở KHĐT/Cục Thuế."}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">Bảo hiểm xã hội & Lao động:</div>
              <div className="font-extrabold text-[#001F3F]">
                {lifecycleEntity === "hkd" 
                  ? "Bắt buộc tham gia cho nhân sự có hợp đồng lao động ≥ 1 tháng. Chủ hộ đóng tự nguyện." 
                  : "Bắt buộc đóng BHXH 32% quỹ lương đóng bảo hiểm (DN: 21.5%, NLĐ: 10.5%). Nộp kinh phí công đoàn 2%."}
              </div>
            </div>
          </div>

          {/* Chronological timeline with 5 phases */}
          <div className="space-y-6 relative pl-4 md:pl-0">
            <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-gray-200 md:hidden"></div>

            {[
              {
                phase: "GIAI ĐOẠN 1",
                title: "PHÁP LÝ THÀNH LẬP & PHÁT TRÌNH BAN ĐẦU",
                hkd: [
                  "1. Đăng ký liên thông đăng ký kinh doanh và đăng ký thuế online trên cổng thông tin quốc gia (MIỄN lệ phí trực tuyến).",
                  "2. Nhận Giấy đăng ký hộ kinh doanh và mã số thuế 10 số duy nhất.",
                  "3. Treo biển hiệu tại địa điểm kinh doanh ghi rõ: Tên hộ, MST, Địa chỉ.",
                  "4. Đăng ký mua Chữ ký số (Token/Cloud) và Hoá đơn điện tử có mã của cơ quan Thuế theo mẫu 01/ĐKTĐ-HĐĐT."
                ],
                dn: [
                  "1. Đăng ký thành lập doanh nghiệp online trên Cổng dịch vụ công của Sở KH&ĐT.",
                  "2. Khắc con dấu tròn công ty và công bố mẫu dấu công khai trên cổng thông tin doanh nghiệp.",
                  "3. Mở tài khoản ngân hàng công ty và thông báo tài khoản với Sở KHĐT/Cơ quan thuế quản lý.",
                  "4. Mua chữ ký số và Đăng ký sử dụng hóa đơn điện tử VAT (mẫu 01/ĐKTĐ-HĐĐT)."
                ]
              },
              {
                phase: "GIAI ĐOẠN 2",
                title: "KHAI THUẾ THIẾT LẬP BAN ĐẦU (HẠN TRONG 30 NGÀY CAO ĐIỂM)",
                hkd: [
                  "1. Đăng ký tài khoản nộp thuế điện tử trên Thuedientu.gdt.gov.vn.",
                  "2. Kê khai và nộp tờ khai Lệ phí môn bải ban đầu (Hạn chót ngày cuối cùng tháng thành lập).",
                  "3. Nhận miễn lệ phí môn bài năm đầu tiên nếu thành lập mới hoàn toàn.",
                  "4. Đăng ký định mức nộp thuế khoán (nếu thuộc hộ nghèo, quy mô siêu nhỏ dưới ngưỡng kê khai)."
                ],
                dn: [
                  "1. Thiết lập hồ sơ thuế ban đầu tại Chi cục thuế quản lý (Cử Kế toán trưởng trực tiếp).",
                  "2. Nộp tờ khai lệ phí môn bài ban đầu (được miễn năm đầu thành lập).",
                  "3. Nộp đăng ký phương pháp khấu trừ thuế GTGT và bộ hóa đơn đầu tiên.",
                  "4. Đăng ký lao động ban đầu với Phòng Lao động quận/huyện."
                ]
              },
              {
                phase: "GIAI ĐOẠN 3",
                title: "VẬN HÀNH ĐỊNH KỲ HÀNG QUÝ & KHAI THUẾ TRONG NĂM",
                hkd: [
                  "1. Thực hiện mở đủ 5 số sách kế toán mẫu (doanh thu, lương, vật tư, thu chi) ghi chép hàng ngày.",
                  "2. Kê khai thuế định kỳ hàng quý: Nộp tờ khai 01/CNKD kèm phụ lục bảng kê hoạt động kinh doanh.",
                  "3. Hạn nộp tờ khai và đóng tiền thuế Quý: Chậm nhất ngày cuối cùng của tháng đầu tiên quý tiếp theo.",
                  "4. Đóng thuế môn bài định kỳ hàng năm vào ngày 30/01."
                ],
                dn: [
                  "1. Ghi nhận hóa đơn đầu vào, hóa đơn đầu ra trên phần mềm kế toán liên tục.",
                  "2. Nộp tờ khai thuế GTGT, tờ khai thuế TNCN tạm tính, và báo cáo tình hình sử dụng hóa đơn hàng quý (Hạn chót ngày 30 của tháng tiếp theo quý).",
                  "3. Tạm tính và nộp tiền thuế TNDN tạm tính hàng quý (không cần nộp tờ khai TNDN quý).",
                  "4. Đối soát sổ phụ ngân hàng, lập dòng tiền kế toán nội bộ."
                ]
              },
              {
                phase: "GIAI ĐOẠN 4",
                title: "QUYẾT TOÁN THUẾ NIÊN ĐỘ - KẾT THÚC NĂM TÀI CHÍNH",
                hkd: [
                  "1. Hộ kinh doanh kê khai KHÔNG phải làm thủ tục quyết toán thuế cuối năm gộp (đã hoàn thành nộp theo từng Quý).",
                  "2. Riêng cá nhân bán hàng TMĐT có thu nhập từ tiền lương, tiền công hoặc làm affiliate nhận hoa hồng bắt buộc tự nộp hồ sơ quyết toán thuế TNCN cuối năm (Hạn chót 30/04 năm sau).",
                  "3. Kiểm điểm doanh sô gộp cả năm để cân đối điều chuyển mô hình năm tiếp theo."
                ],
                dn: [
                  "1. Lập Báo cáo Tài chính năm (Bảng cân đối phát sinh, Báo cáo kết quả KD, Lưu chuyển tiền tệ, Thuyết minh BCTC).",
                  "2. Lập tờ khai Quyết toán Thuế TNDN năm (mẫu 03/TNDN) điều chỉnh tăng giảm chi phí loại trừ.",
                  "3. Lập tờ khai Quyết toán Thuế TNCN năm (mẫu 05/QTT-TNCN) thay mặt cho toàn bộ nhân sự công ty.",
                  "4. Hạn nộp Báo cáo tài chính và Quyết toán năm: Ngày cuối cùng của tháng thứ 3 năm sau (31/03)."
                ]
              },
              {
                phase: "GIAI ĐOẠN 5",
                title: "THANH TRA THUẾ & GIẢI TRÌNH, PHONG TỎA GIẢI THỂ",
                hkd: [
                  "1. Nhận công văn kiểm tra rà soát đột xuất sao kê tài khoản ngân hàng cá nhân liên thông.",
                  "2. Soạn hồ sơ giải trình bóc tách chi phí, lập tờ khai điều chỉnh giảm nợ đọng tránh phạt trốn thuế.",
                  "3. Nộp hồ sơ chấm dứt hiệu lực mã số thuế (đóng MST hộ) khi ngừng hoàn toàn kinh doanh.",
                  "4. Giải quyết trọn gói tiền nợ đọng thuế, hoàn trả hóa đơn chưa dùng hết."
                ],
                dn: [
                  "1. Chịu sự thanh tra thuế định kỳ (3-5 năm một lần) rà soát hệ thống hóa đơn gốc, chứng từ thanh toán ngân hàng.",
                  "2. Ký biên bản giải trình, loại bỏ hóa đơn bất hợp pháp của đơn vị bỏ trốn đầu vào.",
                  "3. Soạn hồ sơ giải thể doanh nghiệp, xin đóng mã số thuế công ty.",
                  "4. Khuyết toán thuế lần cuối để chính thức chấm dứt nghĩa vụ pháp lý pháp nhân."
                ]
              }
            ].map((step, idx) => {
              const list = lifecycleEntity === "hkd" ? step.hkd : step.dn;
              return (
                <div key={idx} className="relative md:grid md:grid-cols-12 md:gap-8 items-start hover:bg-slate-50/50 p-4 rounded-xl transition group duration-300">
                  {/* Left Circle Marker */}
                  <div className="absolute left-1.5 md:left-auto md:relative md:col-span-3 flex md:flex-col items-center md:items-start gap-2 pt-0.5">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#800020] border-2 border-white ring-4 ring-pink-100 shrink-0 z-10 group-hover:bg-[#001F3F] transition-colors"></div>
                    <div className="text-left">
                      <span className="text-[10px] font-black text-[#800020] uppercase tracking-widest block font-mono">
                        {step.phase}
                      </span>
                      <h4 className="font-extrabold text-[#001F3F] text-xs uppercase leading-tight mt-1">
                        {step.title}
                      </h4>
                    </div>
                  </div>

                  {/* Right Content checklist */}
                  <div className="md:col-span-9 pl-6 md:pl-0 space-y-2 mt-2 md:mt-0 text-left bg-white p-4 rounded-xl border border-gray-200 group-hover:border-[#800020] group-hover:shadow-sm transitionduration-300">
                    <ul className="space-y-2.5">
                      {list.map((item, lIdx) => (
                        <li key={lIdx} className="flex items-start gap-2 text-xs text-gray-700 leading-relaxed font-sans">
                          <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span className="font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-[10.5px]">
                      <span className="text-gray-400 font-bold">● Bước nghiệp vụ an toàn</span>
                      <button
                        onClick={() => {
                          setLeadForm(prev => ({
                            ...prev,
                            problem: `Yêu cầu lập hồ sơ tư vấn chu kỳ vòng đời pháp luật cho mô hình: ${lifecycleEntity === "hkd" ? "HỘ KINH DOANH" : "DOANH NGHIỆP"} (GIAI ĐOẠN: ${step.phase})`
                          }));
                          const scrollTarget = document.getElementById("lead-form-scroll-target");
                          if (scrollTarget) scrollTarget.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="text-[#800020] hover:text-[#001F3F] font-black uppercase tracking-wider flex items-center gap-1 group/btn"
                      >
                        Yêu cầu hỗ trợ bước này
                        <ArrowRight size={11} className="transform group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
