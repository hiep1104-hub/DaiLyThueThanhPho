import React from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { PRACTICAL_GUIDES_DATA } from "../lib/data";
import { PracticalGuide } from "../types";

interface GuidesTabProps {
  userSegment: "hkd" | "dn";
  selectedGuide: PracticalGuide | null;
  setSelectedGuide: (guide: PracticalGuide | null) => void;
  setLeadForm: React.Dispatch<React.SetStateAction<{
    fullName: string;
    phoneNumber: string;
    bizType: string;
    problem: string;
  }>>;
}

export default function GuidesTab({
  userSegment,
  selectedGuide,
  setSelectedGuide,
  setLeadForm,
}: GuidesTabProps) {
  return (
    <div id="view-tab-guides" className="space-y-6">
      <div className="border-b border-gray-200 pb-2 text-left">
        <h2 className="text-2xl font-black text-[#001F3F] uppercase tracking-wide">
          Kiến Thức Thuế - Bài viết hướng dẫn từng bước
        </h2>
        <p className="text-xs text-gray-500 font-medium">Cộng đồng chia sẻ cẩm nang bóc tách dữ liệu rủi ro thực tế cho {userSegment === "hkd" ? "hộ kinh doanh" : "doanh nghiệp sáp nhập"}.</p>
      </div>

      {/* Selection cards list for articles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {PRACTICAL_GUIDES_DATA.filter((g) => {
          return userSegment === "hkd" 
            ? g.category !== "DN"
            : g.category === "DN";
        }).map((g) => (
          <div
            key={g.id}
            onClick={() => setSelectedGuide(g)}
            className={`p-4 rounded-lg border text-left cursor-pointer transition-all ${
              selectedGuide?.id === g.id
                ? "border-[#800020] bg-red-50/20 ring-1 ring-[#800020]"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <span className="bg-[#001F3F] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider font-sans">
              {g.category === "TMDT" ? "Thương mại điện tử" : g.category === "CTTS" ? "Cho thuê tài sản" : g.category === "DN" ? "Doanh nghiệp SME" : "Hộ kinh doanh"}
            </span>
            <h3 className="font-extrabold text-sm text-[#001F3F] mt-2 mb-1.5 leading-snug line-clamp-2">
               {g.title}
            </h3>
            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-sans">
              {g.summary}
            </p>
          </div>
        ))}
      </div>

      {/* Selected Article Detailed Reader Panel */}
      {selectedGuide && (
        <article className="bg-[#FDFDFD] border border-gray-250 p-6 md:p-8 rounded-lg space-y-5 shadow-sm max-w-4xl mx-auto animate-fadeIn text-left">
          <div className="space-y-3 pb-4 border-b border-gray-200">
            <span className="text-[#800020] font-black text-xs uppercase tracking-widest block font-mono">
              #CẨM NANG HƯỚNG DẪN - ĐẠI LÝ THUẾ THÀNH PHỐ
            </span>
            <h2 className="text-2xl font-black text-[#001F3F] leading-tight font-serif">
              {selectedGuide.title}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-mono">
              tóm tắt: {selectedGuide.summary}
            </p>
          </div>

          <div className="prose text-xs text-gray-700 space-y-4">
            <p className="font-medium leading-relaxed bg-slate-50 p-3 rounded border-l-4 border-slate-400 font-sans">
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
                    <span className="text-gray-600 leading-normal font-sans font-medium">{chk}</span>
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
                    <span className="text-gray-600 leading-relaxed block font-sans font-medium">
                      {st.split(":")[1]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic realistic example box */}
            <div className="bg-[#800020]/5 border-l-4 border-[#800020] p-4 rounded-r shadow-sm space-y-1">
              <strong className="text-xs text-[#800020] uppercase font-mono tracking-wider block">Ví dụ cách tính toán thực tế:</strong>
              <p className="text-gray-700 italic leading-relaxed bg-white/80 p-3 rounded border border-red-100/40 font-sans font-medium">
                {selectedGuide.example}
              </p>
            </div>

            {/* Dangerous Warning bar */}
            <div className="bg-amber-50 border border-amber-300 p-4 rounded-lg flex gap-3 text-xs">
              <AlertTriangle size={32} className="text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="text-amber-900 uppercase font-black">Cảnh báo sai phạm nghiêm trọng:</strong>
                <p className="text-amber-800 leading-normal font-sans font-medium">{selectedGuide.warning}</p>
              </div>
            </div>
          </div>

          {/* Zalo / Phone CTA right bottom of the post */}
          <div className="pt-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-gray-500 font-sans font-medium">
              Bài viết được biên soạn thực tế bởi cán bộ quản lý đại lý thuế Thành Phố.
            </div>
            <div className="flex gap-2 shrink-0 font-sans">
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
  );
}
