import React from "react";
import { Search, Sparkles, Percent, CalendarDays, Scale } from "lucide-react";
import { TAX_RATIOS_BY_SECTOR, LATEST_TAX_CALENDAR, PENALTY_RULES } from "../lib/data";

interface LookupTabProps {
  lookupMst: string;
  setLookupMst: (mst: string) => void;
  lookupResult: any;
  handleMstLookup: (e: React.FormEvent) => void;
  setActiveTab: (tab: string) => void;
  sendChatMessage: (presetText?: string) => void;
}

export default function LookupTab({
  lookupMst,
  setLookupMst,
  lookupResult,
  handleMstLookup,
  setActiveTab,
  sendChatMessage,
}: LookupTabProps) {
  return (
    <div id="view-tab-lookup" className="space-y-6">
      <div className="border-b border-gray-200 pb-2">
        <h2 className="text-2xl font-black text-[#001F3F] uppercase tracking-wide">
          Cổng Tra Cứu Nghĩa Vụ & Biểu Thuế Định Mức
        </h2>
        <p className="text-xs text-gray-500 font-medium">Cung cấp bộ lọc tra cứu nhanh chính sách thuế rủi ro trực quan cho các hộ nhỏ trực tiếp.</p>
      </div>

      {/* CITIZEN QUICK SEARCH SHORTCUTS */}
      <div className="bg-gradient-to-r from-red-50 to-amber-50 border border-amber-200 rounded-lg p-5 space-y-3 shadow-xs">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold">
          <Sparkles size={16} className="text-[#800020] animate-pulse" />
          <span className="text-xs font-black uppercase tracking-wider text-amber-900">
            Phím tắt tra cứu nhanh cho người chưa biết gì về thuế:
          </span>
        </div>
        <p className="text-[11px] text-gray-500 leading-normal font-sans font-medium">
          Để giúp người dân dễ dàng tìm kiếm thông tin không bị ngợp, hãy bấm thẳng vào các thắc mắc thực tế dưới đây để hệ thống hiển thị nhanh số liệu và biểu mức:
        </p>
        <div className="flex flex-wrap gap-2 pt-1 font-sans">
          {[
            {
              label: "🏪 Shop bán hàng Online (TikTok Shop, Shopee) đóng thuế mấy %?",
              action: () => {
                const tableEl = document.querySelector("table");
                if (tableEl) tableEl.scrollIntoView({ behavior: "smooth" });
              }
            },
            {
              label: "🏠 Có căn hộ hoặc mặt bằng cho thuê thì mức đóng thế nào?",
              action: () => {
                const tableEl = document.querySelector("table");
                if (tableEl) tableEl.scrollIntoView({ behavior: "smooth" });
              }
            },
            {
              label: "⚠️ Trễ nộp tờ khai Lệ phí Môn bài quá hạn bị phạt bao nhiêu?",
              action: () => {
                const penEl = document.getElementById("penalty-rules-section");
                if (penEl) penEl.scrollIntoView({ behavior: "smooth" });
              }
            },
            {
              label: "📅 Hạn chót nộp tiền thuế Quý 2 năm 2026 là ngày nào?",
              action: () => {
                const calEl = document.getElementById("tax-calendar-section");
                if (calEl) calEl.scrollIntoView({ behavior: "smooth" });
              }
            },
            {
              label: "💬 Muốn thảo luận chi tiết về thuế nhà đất với Trợ lý AI?",
              action: () => {
                setActiveTab("faq");
                sendChatMessage("Tôi muốn hỏi về việc cho thuê bất động sản và các khoản thuế liên quan đối với người dân tự kinh doanh.");
              }
            }
          ].map((btn, idx) => (
            <button
              key={idx}
              onClick={btn.action}
              className="bg-white hover:bg-[#800020] hover:text-white text-[#001F3F] border border-gray-250 hover:border-[#800020] rounded-md px-3.5 py-2 text-[11px] font-bold shadow-sm transition-all duration-250 cursor-pointer active:scale-95"
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tax Ratios Table */}
      <div className="space-y-3 text-left">
        <h3 className="text-base font-black text-[#001F3F] uppercase flex items-center gap-1.5">
          <Percent size={16} className="text-[#800020]" />
          Biểu tỷ lệ thuế giá trị gia tăng & thu nhập cá nhân theo ngành
        </h3>
        <p className="text-xs text-gray-500 font-medium pb-1">Bảng chi tiết dựa trên Thông tư 40/2021/TT-BTC áp dụng cho hộ kê khai theo Thông tư 88 & cá nhân kinh doanh online (Tất cả hộ khoán đều bắt buộc phải chuyển sang tự kê khai sổ sách từ ngày 01/01/2026).</p>
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
                  <td className="p-2.5 border border-gray-200 text-gray-500 italic font-medium leading-relaxed">{r.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tax Calendar & Event Tracker */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 text-left">
        <div id="tax-calendar-section" className="space-y-3 scroll-mt-6">
          <h4 className="font-extrabold text-sm text-[#001F3F] uppercase flex items-center gap-1">
            <CalendarDays size={15} className="text-[#800020]" />
            Thời hạn kê nộp báo cáo quý & năm
          </h4>
          <div className="space-y-2">
            {LATEST_TAX_CALENDAR.map((cal, i) => (
              <div key={i} className="bg-white p-3 rounded border border-gray-200 text-xs flex justify-between items-center gap-3">
                <span className="text-gray-700 font-medium font-sans">{cal.event}</span>
                <span className="bg-[#800020] text-white text-[10.5px] font-bold px-2 py-1 rounded shrink-0 font-mono">
                  {cal.deadline}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div id="penalty-rules-section" className="space-y-3 scroll-mt-6">
          <h4 className="font-extrabold text-sm text-[#001F3F] uppercase flex items-center gap-1">
            <Scale size={15} className="text-[#800020]" />
            Biểu phí phạt chậm nộp tờ khai (NĐ 125/2020)
          </h4>
          <div className="space-y-2">
            {PENALTY_RULES.map((rule, i) => (
              <div key={i} className="bg-white p-3 rounded border border-gray-200 text-xs">
                <div className="font-bold text-[#800020] mb-0.5">Số ngày chậm: {rule.delayDays}</div>
                <div className="text-gray-600 italic font-mono leading-normal font-medium">{rule.penaltyText}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
