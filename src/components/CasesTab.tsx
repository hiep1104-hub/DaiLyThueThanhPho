import React from "react";
import { AlertTriangle, Scale, CheckCircle2 } from "lucide-react";
import { CASE_STUDIES_DATA } from "../lib/data";

export default function CasesTab() {
  return (
    <div id="view-tab-cases" className="space-y-6 animate-fadeIn">
      <div className="border-b border-gray-200 pb-2 text-left">
        <h2 className="text-2xl font-black text-[#001F3F] uppercase tracking-wide">
          Hồ Sơ Thành Công - Case Study Giải Quyết Khân Cấp Thực Tế
        </h2>
        <p className="text-xs text-gray-500 font-medium">Xem trực tiếp rủi ro, đường đi gỡ rối và kết quả giữ lại tiền thuế cho khách hàng được ghi nhận của chúng tôi.</p>
      </div>

      <div className="space-y-6">
        {CASE_STUDIES_DATA.map((cs) => (
          <div key={cs.id} className="border border-gray-300 bg-white rounded-lg overflow-hidden shadow-xs text-left">
            {/* Header bar of Case study */}
            <div className="bg-[#001F3F] p-4 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
              <div>
                <span className="text-[10px] uppercase font-bold text-red-300 tracking-wider font-mono">HỒ SƠ KHÁCH HÀNG: {cs.clientType}</span>
                <h3 className="font-black text-sm italic font-serif leading-tight mt-0.5">{cs.title}</h3>
              </div>
              {cs.savedAmount && (
                <div className="bg-[#800020] text-white text-xs font-mono font-bold px-3 py-1.5 rounded border border-red-900 shrink-0 text-center uppercase tracking-wide">
                  Số tiền thuế tiết kiệm: <br className="hidden md:block"/>
                  <span className="text-sm font-extrabold text-green-300">~ {cs.savedAmount}</span>
                </div>
              )}
            </div>

            {/* Content comparative analysis grid */}
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              
              <div className="space-y-2 bg-red-50/25 p-4 rounded border border-red-100/60 shadow-xs">
                <div className="font-extrabold text-[#800020] uppercase tracking-wider flex items-center gap-1">
                  <AlertTriangle size={13} className="text-[#800020]" />
                  VẤN ĐỀ TRỌNG TÂM:
                </div>
                <p className="text-slate-750 leading-relaxed font-mono font-semibold">{cs.problem}</p>
              </div>

              <div className="space-y-2 bg-yellow-50/25 p-4 rounded border border-yellow-100/60 shadow-xs">
                <div className="font-extrabold text-[#805000] uppercase tracking-wider flex items-center gap-1">
                  <AlertTriangle size={13} className="text-amber-700 font-bold" />
                  RỦI RO BAN ĐẦU:
                </div>
                <p className="text-slate-750 leading-relaxed italic font-semibold">{cs.risk}</p>
              </div>

              <div className="space-y-2 bg-slate-50 p-4 rounded border border-gray-200/80 shadow-xs">
                <div className="font-extrabold text-[#001F3F] uppercase tracking-wider flex items-center gap-1 font-sans">
                  <Scale size={13} className="text-[#001F3F]" />
                  HƯỚNG ĐI XỬ LÝ CỦA ĐẠI LÝ:
                </div>
                <p className="text-slate-650 leading-relaxed font-semibold">{cs.solution}</p>
              </div>

              <div className="space-y-2 bg-emerald-50/30 p-4 rounded border border-emerald-100 shadow-xs">
                <div className="font-extrabold text-[#115e59] uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 size={13} className="text-emerald-700" />
                  KẾT QUẢ THỰC TẾ:
                </div>
                <p className="text-[#115e59] leading-relaxed font-black font-semibold text-teal-850">{cs.result}</p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
