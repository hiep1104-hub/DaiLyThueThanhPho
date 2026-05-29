import React, { useState } from "react";
import { Search } from "lucide-react";
import { LEGAL_DOCS_DATA } from "../lib/data";

interface LawsTabProps {
  userSegment: "hkd" | "dn";
  setLeadForm: React.Dispatch<React.SetStateAction<{
    fullName: string;
    phoneNumber: string;
    bizType: string;
    problem: string;
  }>>;
}

export default function LawsTab({
  userSegment,
  setLeadForm,
}: LawsTabProps) {
  const [legalSearch, setLegalSearch] = useState("");
  const [legalCategoryFilter, setLegalCategoryFilter] = useState("ALL");

  const filteredDocs = LEGAL_DOCS_DATA.filter(doc => {
    const matchesSearch = doc.number.toLowerCase().includes(legalSearch.toLowerCase()) || doc.title.toLowerCase().includes(legalSearch.toLowerCase());
    const matchesCat = legalCategoryFilter === "ALL" || doc.category === legalCategoryFilter;
    const isHkdOnly = ["nd141-2026", "tt152-2025", "tt40-2021", "cv4230-2023"].includes(doc.id);
    const isCorpOnly = ["luat38-2019"].includes(doc.id);
    const isShared = ["nd125-2020"].includes(doc.id);
    const belongsToSegment = userSegment === "hkd" 
      ? (isHkdOnly || isShared)
      : (isCorpOnly || isShared);
    return matchesSearch && matchesCat && belongsToSegment;
  });

  return (
    <div id="view-tab-laws" className="space-y-6">
      <div className="border-b border-gray-200 pb-2 text-left">
        <h2 className="text-2xl font-black text-[#001F3F] uppercase tracking-wide">
          Thư Viện Văn Bản Pháp Luật Thuế Việt Nam
        </h2>
        <p className="text-xs text-gray-500 font-medium">Tìm kiếm nhanh các văn bản, thông tư hướng dẫn, công văn thuế vụ quan trọng để làm căn cứ pháp lý.</p>
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
            className="w-full text-xs pl-8 pr-3 py-2.5 bg-white border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#800020] font-sans font-medium"
          />
        </div>

        <select
          value={legalCategoryFilter}
          onChange={(e) => setLegalCategoryFilter(e.target.value)}
          className="text-xs p-2.5 bg-white border border-gray-300 rounded font-sans font-medium text-slate-700"
        >
          <option value="ALL">Tất cả thể loại</option>
          <option value="ThongTu">Thông tư hướng dẫn</option>
          <option value="NghiDinh">Nghị định Chính phủ</option>
          <option value="Luat">Luật Quản lý Thuế</option>
          <option value="CongVan">Công văn của Tổng cục</option>
        </select>

        <div className="flex items-center justify-end font-mono">
          <span className="text-xs text-slate-500">Hiển thị {filteredDocs.length} văn bản chuẩn</span>
        </div>
      </div>

      {/* Legal documents result grid */}
      <div className="space-y-4">
        {filteredDocs.map((doc) => (
          <div key={doc.id} className="bg-white border border-gray-200 p-5 rounded-lg hover:shadow-xs transition-all space-y-3 text-left">
            <div className="flex flex-wrap justify-between items-start gap-2 border-b border-gray-150 pb-2">
              <div className="space-y-0.5">
                <span className="bg-[#800020] text-white text-[10px] font-bold px-2 py-0.5 rounded font-mono mr-2 uppercase tracking-wide">
                  {doc.category === "ThongTu" ? "Thông tư" : doc.category === "NghiDinh" ? "Nghị định" : doc.category === "Luat" ? "Luật Thuế" : "Công văn nội bộ"}
                </span>
                <strong className="text-xs text-[#001F3F] font-mono font-bold">{doc.number}</strong>
              </div>
              <span className="text-[10.5px] font-extrabold text-[#800020] uppercase bg-red-50 px-2 py-0.5 rounded font-sans tracking-tight">
                Lĩnh vực: {doc.field}
              </span>
            </div>

            <h3 className="font-extrabold text-sm text-[#001F3F] leading-snug">
              {doc.title}
            </h3>

            <p className="text-xs text-gray-650 bg-slate-50 p-2.5 rounded border border-gray-150 leading-relaxed font-sans font-medium sm:text-slate-650">
              <strong className="text-[#001F3F]">Tóm tắt nội dung chính:</strong> {doc.summary}
            </p>

            <div className="space-y-1 pl-4 border-l-2 border-[#001F3F]">
              <span className="text-[10px] text-gray-550 uppercase font-black block font-sans tracking-wide">Điều khoản quy định mấu chốt:</span>
              {doc.contentBullets.map((bullet, bIdx) => (
                <div key={bIdx} className="text-xs text-gray-755 flex items-start gap-1 font-sans font-medium lg:text-slate-700">
                  <span className="text-[#800020] font-black">•</span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-between items-center flex-wrap gap-2 text-xs font-sans">
              <span className="text-gray-500 font-medium">Năm ban hành: <strong>{doc.year}</strong></span>
              <div className="flex gap-2">
                <button 
                  onClick={() => alert(`Đã kích hoạt sitemap tải file PDF cho văn bản ${doc.number}. Chức năng đang nạp file chính thức.`)}
                  className="text-[#800020] font-bold border border-[#800020] px-3 py-1.5 rounded hover:bg-red-50 text-[11px] whitespace-nowrap active:scale-95 transition-transform"
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
                  className="bg-[#001F3F] hover:bg-[#800020] text-white font-bold px-3 py-1.5 rounded text-[11px] whitespace-nowrap active:scale-95 transition-transform"
                >
                  Cần tư vấn áp dụng
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
