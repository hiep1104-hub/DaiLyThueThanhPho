import React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { TAX_RATIOS_BY_SECTOR } from "../lib/data";

interface CalculatorTabProps {
  userSegment: "hkd" | "dn";
  calcType: "hkd" | "rent" | "corporate" | "penalty";
  setCalcType: (val: "hkd" | "rent" | "corporate" | "penalty") => void;
  calcHkdSector: string;
  setCalcHkdSector: (val: string) => void;
  calcHkdRevenue: number;
  setCalcHkdRevenue: (val: number) => void;
  calcHkdPlatformPayment: "yes" | "no";
  setCalcHkdPlatformPayment: (val: "yes" | "no") => void;
  calcRentMonthly: number;
  setCalcRentMonthly: (val: number) => void;
  calcRentMonths: number;
  setCalcRentMonths: (val: number) => void;
  calcCorpRevenue: number;
  setCalcCorpRevenue: (val: number) => void;
  calcCorpExpense: number;
  setCalcCorpExpense: (val: number) => void;
  calcCorpVatMethod: "khautru" | "tructiep";
  setCalcCorpVatMethod: (val: "khautru" | "tructiep") => void;
  calcCorpVatRate: number;
  setCalcCorpVatRate: (val: number) => void;
  calcPenaltyTaxDebt: number;
  setCalcPenaltyTaxDebt: (val: number) => void;
  calcPenaltyDays: number;
  setCalcPenaltyDays: (val: number) => void;
  setLeadForm: React.Dispatch<React.SetStateAction<{
    fullName: string;
    phoneNumber: string;
    bizType: string;
    problem: string;
  }>>;
}

export default function CalculatorTab({
  userSegment,
  calcType,
  setCalcType,
  calcHkdSector,
  setCalcHkdSector,
  calcHkdRevenue,
  setCalcHkdRevenue,
  calcHkdPlatformPayment,
  setCalcHkdPlatformPayment,
  calcRentMonthly,
  setCalcRentMonthly,
  calcRentMonths,
  setCalcRentMonths,
  calcCorpRevenue,
  setCalcCorpRevenue,
  calcCorpExpense,
  setCalcCorpExpense,
  calcCorpVatMethod,
  setCalcCorpVatMethod,
  calcCorpVatRate,
  setCalcCorpVatRate,
  calcPenaltyTaxDebt,
  setCalcPenaltyTaxDebt,
  calcPenaltyDays,
  setCalcPenaltyDays,
  setLeadForm,
}: CalculatorTabProps) {
  
  // Instant Calculators Function
  const calculateResult = () => {
    if (calcType === "hkd") {
      const sectorObj = TAX_RATIOS_BY_SECTOR.find(s => s.code === calcHkdSector);
      const totalRate = sectorObj ? sectorObj.total : 1.5;
      const vatRate = sectorObj ? sectorObj.vat : 1.0;
      const pitRate = sectorObj ? sectorObj.pit : 0.5;

      const isExempt = calcHkdRevenue <= 1000000000;
      const totalTax = isExempt ? 0 : (calcHkdRevenue * totalRate) / 100;
      const vatAmount = isExempt ? 0 : (calcHkdRevenue * vatRate) / 100;
      const pitAmount = isExempt ? 0 : (calcHkdRevenue * pitRate) / 100;

      let explanationText = "";
      if (isExempt) {
        explanationText = "Tổng doanh thu kinh doanh trong năm dương lịch từ 1.000.000.000đ trở xuống thuộc diện MIỄN nộp thuế GTGT & TNCN (quy định mới nhất áp dụng từ năm 2026).";
        if (calcHkdPlatformPayment === "yes") {
          explanationText += " Đặc biệt, nhờ thanh toán qua sàn TMĐT tự động kê khai thuế thay (0đ do dưới ngưỡng), bạn hoàn toàn không phải làm thủ tục đăng ký nộp tờ khai quý/năm.";
        }
      } else {
        if (calcHkdPlatformPayment === "yes") {
          explanationText = `SÀN TMĐT NỘP THAY: Vì giao dịch có thanh toán qua sàn (Shopee, TikTok Shop,...), SÀN THỰC HIỆN NỘP THUẾ DÙM bạn trực tiếp trích từ doanh thu. Chủ shop không cần tự lập tờ khai thuế hàng tháng, hàng quý, và không phải quyết toán thuế cuối năm. Tổng số thuế sàn khấu trừ nộp thay ước tính là ${totalTax.toLocaleString()} VNĐ (GTGT ${vatRate}%, TNCN ${pitRate}%).`;
        } else {
          explanationText = `TỰ KÊ KHAI QUÝ: Do giao dịch không thanh toán qua sàn (COD ngoài, chuyển khoản lẻ, thỏa thuận tự do ngoài cổng thanh toán của sàn), bạn BẮT BUỘC phải thực hiện tự kê khai tờ khai thuế 01/CNKD định kỳ hàng quý và nộp thuế ${totalRate}% (Bao gồm GTGT ${vatRate}% và TNCN ${pitRate}%).`;
        }
      }

      return {
        isExempt,
        totalTax,
        vatAmount,
        pitAmount,
        rate: totalRate,
        explanation: explanationText
      };
    } else if (calcType === "rent") {
      const totalRevenue = calcRentMonthly * calcRentMonths;
      const isExempt = totalRevenue <= 1000000000;
      const totalTax = isExempt ? 0 : totalRevenue * 0.10; // 5% GTGT + 5% TNCN
      return {
        isExempt,
        totalRevenue,
        totalTax,
        explanation: isExempt 
          ? "Do doanh thu cho thuê cả năm dưới 1 tỷ đồng, bạn được miễn nộp thuế theo luật định mới từ năm 2026. Lưu ý vẫn nộp tờ khai kê khai đầy đủ."
          : `Tổng doanh thu năm là ${totalRevenue.toLocaleString()}đ (vượt ngưỡng 1 tỷ), áp mức thuế suất cho thuê tài sản 10% (5% GTGT + 5% TNCN).`
      };
    } else if (calcType === "corporate") {
      const revenue = calcCorpRevenue;
      const expense = calcCorpExpense;
      const profitBeforeTax = Math.max(0, revenue - expense);
      const isExempt = profitBeforeTax <= 0;
      const citAmount = isExempt ? 0 : (profitBeforeTax * 20) / 100; // 20% CIT
      
      let estimatedVatAmount = 0;
      let vatExplanation = "";
      if (calcCorpVatMethod === "khautru") {
        estimatedVatAmount = Math.max(0, (revenue - expense) * (calcCorpVatRate / 100));
        vatExplanation = `Phương pháp khấu trừ (${calcCorpVatRate}%): Ước tính số thuế VAT dựa trên cơ sở giá trị gia tăng gia tăng chênh lệch hóa đơn đầu ra và đầu vào.`;
      } else {
        estimatedVatAmount = revenue * 0.01; // 1% for retail/trading direct
        vatExplanation = `Phương pháp trực tiếp (Ước tính khoảng 1% tổng doanh thu): Áp tỉ lệ phần trăm trực tiếp trên doanh thu không khẩu trừ.`;
      }

      const totalTax = citAmount + estimatedVatAmount;

      return {
        isExempt,
        revenue,
        expense,
        profitBeforeTax,
        citAmount,
        estimatedVatAmount,
        totalTax,
        rate: 20,
        vatExplanation,
        explanation: profitBeforeTax <= 0
          ? "DOANH NGHIỆP HÒA VỐN/LỖ: Doanh nghiệp hiện đang hòa vốn hoặc lỗ trên sổ sách kế toán, tạm thời được MIỄN nộp thuế Thu nhập doanh nghiệp (TNDN). Tuy nhiên, cần rà soát lại sổ sách kế toán và rủi ro hóa đơn ảo để tránh bị cơ quan thuế bóc tách loại trừ chi phí."
          : `DỰ TOÁN THUẾ DOANH NGHIỆP: Doanh nghiệp lãi khoảng ${profitBeforeTax.toLocaleString()} VNĐ, phát sinh thuế TNDN tạm nộp là ${citAmount.toLocaleString()} VNĐ (20%) và thuế VAT ước tính ${estimatedVatAmount.toLocaleString()} VNĐ. Bạn nên liên hệ Đại lý Thuế Thành Phố để cân đối chứng từ hợp lý hợp pháp.`
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
    <div id="view-tab-calculator" className="space-y-6 animate-fadeIn">
      <div className="border-b border-gray-200 pb-2 text-left">
        <h2 className="text-2xl font-black text-[#001F3F] uppercase tracking-wide">
          Phần Mềm Tính Thử Số Thuế Phải Nộp Trực Tuyến
        </h2>
        <p className="text-xs text-gray-500">Nhập doanh thu thô để hệ thống bóc tách số liệu thuế tự động gãy gọn theo Thông tư 40.</p>
      </div>

      {/* Presets for non-tax experts */}
      <div className="bg-[#800020]/5 border-l-4 border-[#800020] p-4 rounded-r-lg space-y-2 text-left">
        <div className="flex items-center gap-1.5 text-xs font-black text-[#001F3F] uppercase tracking-wider">
          <Sparkles size={14} className="text-[#800020] animate-pulse" />
          Bạn chưa biết tính từ đâu? Chọn nhanh tình huống thực tế của bạn dưới đây để chạy thử máy tính:
        </div>
        <div className="flex flex-wrap gap-2 pt-1 text-xs">
          {[
            {
              label: "🏪 1. Shop TikTok Bán Quần Áo (Doanh thu 1.5 Tỷ/năm - Chịu thuế)",
              action: () => {
                setCalcType("hkd");
                setCalcHkdSector("PP"); // Phân phối hàng hoá
                setCalcHkdRevenue(1500000000);
              }
            },
            {
              label: "🏢 2. Hộ Gia Đình Mở Quán Ăn (Doanh thu 600 Triệu/năm - Miễn thuế dưới 1 tỷ)",
              action: () => {
                setCalcType("hkd");
                setCalcHkdSector("AH"); // Ăn uống (Thương mại dịch vụ ăn uống)
                setCalcHkdRevenue(600000000);
              }
            },
            {
              label: "🏠 3. Cho Thuê Căn Hộ Chung Cư (15 Triệu/tháng trong 12 tháng)",
              action: () => {
                setCalcType("rent");
                setCalcRentMonthly(15000000);
                setCalcRentMonths(12);
              }
            },
            {
              label: "⚠️ 4. Trễ Nộp Tờ Khai 6 Mươi Ngày (Số tiền nợ thuế 10 Triệu đồng)",
              action: () => {
                setCalcType("penalty");
                setCalcPenaltyTaxDebt(10000000);
                setCalcPenaltyDays(60);
              }
            }
          ].map((preset, pIdx) => (
            <button
              key={pIdx}
              onClick={preset.action}
              className="bg-white hover:bg-[#800020] hover:text-white text-[#001F3F] border border-gray-250 hover:border-[#800020] rounded px-3 py-1.5 text-[11px] font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Calculator mode switcher */}
      <div className="flex border-b border-gray-200">
        {userSegment === "hkd" && (
          <>
            <button
              onClick={() => setCalcType("hkd")}
              className={`flex-1 py-3 text-center text-xs font-bold transition-all uppercase ${
                calcType === "hkd" 
                  ? "border-b-4 border-[#800020] text-[#800020] bg-red-50/20" 
                  : "text-[#001F3F] hover:bg-gray-50"
              }`}
            >
              Hộ KD & Sàn TMĐT
            </button>
            <button
              onClick={() => setCalcType("rent")}
              className={`flex-1 py-3 text-center text-xs font-bold transition-all uppercase ${
                calcType === "rent" 
                  ? "border-b-4 border-[#800020] text-[#800020] bg-red-50/20" 
                  : "text-[#001F3F] hover:bg-gray-50"
              }`}
            >
              Cho Thuê Nhà Đất
            </button>
          </>
        )}
        {userSegment === "dn" && (
          <button
            onClick={() => setCalcType("corporate")}
            className={`flex-1 py-3 text-center text-xs font-bold transition-all uppercase ${
              calcType === "corporate" 
                ? "border-b-4 border-[#800020] text-[#800020] bg-red-50/20" 
                : "text-[#001F3F] hover:bg-gray-50"
            }`}
          >
            Dự toán thuế doanh nghiệp (SME)
          </button>
        )}
        <button
          onClick={() => setCalcType("penalty")}
          className={`flex-1 py-3 text-center text-xs font-bold transition-all uppercase ${
            calcType === "penalty" 
              ? "border-b-4 border-[#800020] text-[#800020] bg-red-50/20" 
              : "text-[#001F3F] hover:bg-gray-50"
          }`}
        >
          Tính tiền phạt chậm nộp
        </button>
      </div>

      {/* Calculation Workspace Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-50 border border-gray-250 p-6 rounded-lg text-left">
        
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
                  className="w-full text-xs p-2.5 bg-white border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#800020] font-sans font-medium"
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
                    value={calcHkdRevenue || ""}
                    onChange={(e) => setCalcHkdRevenue(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2.5 bg-white border border-gray-300 rounded focus:border-[#800020] focus:outline-none font-mono font-bold"
                    placeholder="Ví dụ: 350000000"
                  />
                  <span className="absolute right-3 top-2 text-xs text-gray-400 font-mono font-bold">VNĐ</span>
                </div>
                <span className="text-[10px] text-gray-500 italic block leading-relaxed font-sans font-semibold">
                  * Doanh thu tính thuế là số tổng khách thanh toán trước khi trừ bất kỳ chiết cấu khuyến mãi hay phí dịch vụ của các bên trung gian shopee tiktok.
                </span>
              </div>

              {/* E-Commerce Platform Payment Process Configuration */}
              {(calcHkdSector === "PP" || calcHkdSector === "BL" || calcHkdSector === "K") && (
                <div className="space-y-2 p-3.5 bg-white border border-gray-250 rounded shadow-sm">
                  <label className="text-xs font-black text-[#001F3F] uppercase block">
                    Cấu hình dòng tiền giao dịch thương mại điện tử:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1">
                    <button
                      type="button"
                      onClick={() => setCalcHkdPlatformPayment("yes")}
                      className={`p-3 rounded text-left border text-xs font-bold flex flex-col justify-between transition-all ${
                        calcHkdPlatformPayment === "yes"
                          ? "border-[#800020] bg-red-50/40 text-[#800020] ring-1 ring-[#800020]"
                          : "border-gray-200 text-gray-600 bg-white hover:bg-gray-50"
                      }`}
                    >
                      <span>🛡️ 1. Có thanh toán qua Sàn</span>
                      <span className="text-[10px] text-gray-500 font-medium normal-case mt-1.5 block leading-relaxed">
                        (Ví dụ: đặt đơn Shopee/TikTok có liên kết thanh toán của sàn. Sàn nộp thuế thay, được MIỄN tự khai.)
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalcHkdPlatformPayment("no")}
                      className={`p-3 rounded text-left border text-xs font-bold flex flex-col justify-between transition-all ${
                        calcHkdPlatformPayment === "no"
                          ? "border-[#800020] bg-red-50/40 text-[#800020] ring-1 ring-[#800020]"
                          : "border-gray-200 text-gray-600 bg-white hover:bg-gray-50"
                      }`}
                    >
                      <span>✍️ 2. Không thanh toán qua Sàn</span>
                      <span className="text-[10px] text-gray-500 font-medium normal-case mt-1.5 block leading-relaxed">
                        (Ví dụ: bán qua Fb, Zalo tự thỏa thuận COD, chuyển khoản lẻ ngoài. Bắt buộc TỰ KHAI THUẾ quý/năm.)
                      </span>
                    </button>
                  </div>
                </div>
              )}
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
                    value={calcRentMonthly || ""}
                    onChange={(e) => setCalcRentMonthly(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2.5 bg-white border border-gray-300 rounded focus:border-[#800020] focus:outline-none font-mono font-bold"
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
                  className="w-full text-xs p-2.5 bg-white border border-gray-300 rounded font-sans font-medium text-slate-705"
                >
                  {[12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((mo) => (
                    <option key={mo} value={mo}>{mo} tháng thuê</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {calcType === "corporate" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#001F3F] uppercase block">
                  Tổng doanh thu thô của Doanh nghiệp (Đồng / năm):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={calcCorpRevenue || ""}
                    onChange={(e) => setCalcCorpRevenue(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2.5 bg-white border border-gray-300 rounded focus:border-[#800020] focus:outline-none font-mono font-bold"
                    placeholder="Ví dụ: 3000000000"
                  />
                  <span className="absolute right-3 top-2 text-xs text-gray-400 font-mono font-bold">VNĐ</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#001F3F] uppercase block">
                  Tổng chi phí hợp lý ước toán (Giá vốn, tiền thuê, lương nhân viên...):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={calcCorpExpense || ""}
                    onChange={(e) => setCalcCorpExpense(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2.5 bg-white border border-gray-300 rounded focus:border-[#800020] focus:outline-none font-mono font-bold"
                    placeholder="Ví dụ: 2400050000"
                  />
                  <span className="absolute right-3 top-2 text-xs text-gray-400 font-mono font-bold">VNĐ</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#001F3F] uppercase block">
                  Phương pháp kê khai thuế GTGT của Công ty:
                </label>
                <select
                  value={calcCorpVatMethod}
                  onChange={(e) => setCalcCorpVatMethod(e.target.value as any)}
                  className="w-full text-xs p-2.5 bg-white border border-gray-300 rounded focus:outline-none font-sans font-medium text-slate-700"
                >
                  <option value="khautru">Phương pháp Khấu trừ (Hóa đơn VAT đầu vào - ra)</option>
                  <option value="tructiep">Phương pháp Trực tiếp (% doanh thu)</option>
                </select>
              </div>

              {calcCorpVatMethod === "khautru" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#001F3F] uppercase block">
                    Thuế suất VAT đầu ra tiêu chuẩn (%):
                  </label>
                  <select
                    value={calcCorpVatRate}
                    onChange={(e) => setCalcCorpVatRate(Number(e.target.value))}
                    className="w-full text-xs p-2.5 bg-white border border-gray-300 rounded focus:outline-none font-sans font-medium text-slate-700"
                  >
                    <option value={10}>10% (Thuế suất chuẩn quốc gia)</option>
                    <option value={8}>8% (Thuế VAT giảm theo Nghị quyết hỗ trợ)</option>
                    <option value={5}>5% (Ưu đãi ngành thực phẩm, thiết bị y tế)</option>
                  </select>
                </div>
              )}
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
                    value={calcPenaltyTaxDebt || ""}
                    onChange={(e) => setCalcPenaltyTaxDebt(Number(e.target.value))}
                    className="w-full text-xs px-3 py-2.5 bg-white border border-gray-300 rounded focus:border-[#800020] focus:outline-none font-mono font-bold"
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
                  value={calcPenaltyDays || ""}
                  onChange={(e) => setCalcPenaltyDays(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2.5 bg-white border border-gray-300 rounded focus:border-[#800020] font-mono font-bold"
                  placeholder="Ví dụ: 45"
                />
                <span className="text-[10px] text-gray-500 italic block leading-relaxed font-sans font-semibold">
                  * Cách tính phạt chậm nộp nợ thuế mới của Tổng cục Thuế là 0.03% mỗi ngày phát sinh nợ tiền thuế.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Highly aesthetic result output grid column designed specifically */}
        <div className="md:col-span-6 bg-white border border-gray-350 p-5 rounded-lg flex flex-col justify-between space-y-4 shadow-sm">
          <div>
            <span className="text-[10px] font-mono font-black text-[#800020] uppercase tracking-widest block border-b border-gray-100 pb-2 mb-2">
              KẾT QUẢ TÍNH TOÁN DỰ KIẾN
            </span>
            
            {calcType === "hkd" && (
              <div className="mt-2 space-y-3">
                <div className="text-gray-500 text-xs font-medium">Tổng số tiền thuế (GTGT + TNCN) ước tính nộp:</div>
                <div className="text-3xl font-black text-[#800020] tracking-tight">
                  {(currentResultObj as any).totalTax.toLocaleString()} <span className="text-xs text-slate-500 font-sans font-medium">VNĐ</span>
                </div>
                
                <div className="border-t border-gray-150 pt-3 space-y-2 text-xs font-sans font-medium">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Thuế giá trị gia tăng (GTGT):</span>
                    <strong className="font-mono font-bold text-slate-800">{(currentResultObj as any).vatAmount.toLocaleString()}đ</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Thuế thu nhập cá nhân (TNCN):</span>
                    <strong className="font-mono font-bold text-slate-800">{(currentResultObj as any).pitAmount.toLocaleString()}đ</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Tỷ lệ ngành hàng áp dụng:</span>
                    <strong className="text-[#001F3F] font-bold">{(currentResultObj as any).rate}%</strong>
                  </div>
                </div>
              </div>
            )}

            {calcType === "rent" && (
              <div className="mt-2 space-y-3">
                <div className="text-gray-500 text-xs font-medium">Tổng số tiền thuế ước tính nộp (Thuế suất 10%):</div>
                <div className="text-3xl font-black text-[#800020] tracking-tight">
                  {(currentResultObj as any).totalTax.toLocaleString()} <span className="text-xs text-slate-500 font-sans font-medium">VNĐ</span>
                </div>
                
                <div className="border-t border-gray-150 pt-3 space-y-2 text-xs font-sans font-medium">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Tổng doanh thu cho thuê cả năm:</span>
                    <strong className="font-mono font-bold text-slate-800">{(currentResultObj as any).totalRevenue.toLocaleString()}đ</strong>
                  </div>
                  <div className="flex justify-between text-indigo-950 font-bold items-center">
                    <span>Sản phẩm chứng từ cần làm:</span>
                    <span className="bg-amber-100 text-[#800020] px-2 py-0.5 rounded text-[10px] uppercase font-bold">Tờ khai 01/TTS lấy hóa đơn lẻ</span>
                  </div>
                </div>
              </div>
            )}

            {calcType === "corporate" && (
              <div className="mt-2 space-y-3 animate-fadeIn">
                <div className="text-gray-500 text-xs font-medium">Ước tính Tổng số Thuế Phát Sinh (TNDN + VAT):</div>
                <div className="text-3xl font-black text-[#800020] tracking-tight">
                  {(currentResultObj as any).totalTax.toLocaleString()} <span className="text-xs text-slate-500 font-sans font-medium">VNĐ</span>
                </div>
                
                <div className="border-t border-gray-150 pt-3 space-y-2 text-xs font-sans font-medium">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Doanh thu dự kiến:</span>
                    <strong className="font-mono font-bold text-slate-800">{(currentResultObj as any).revenue.toLocaleString()}đ</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Chi phí hợp lý:</span>
                    <strong className="font-mono font-bold text-slate-800">{(currentResultObj as any).expense.toLocaleString()}đ</strong>
                  </div>
                  <div className="flex justify-between items-center border-t border-dashed border-gray-150 pt-2 mt-1">
                    <span className="text-[#001F3F] font-bold">Lợi nhuận trước thuế (Lãi ròng):</span>
                    <strong className="font-mono text-emerald-700 font-black text-sm">{(currentResultObj as any).profitBeforeTax.toLocaleString()}đ</strong>
                  </div>
                  <div className="flex justify-between text-rose-900 font-bold items-center">
                    <span>Thuế TNDN ước tính nộp (20%):</span>
                    <strong className="font-mono font-bold">{(currentResultObj as any).citAmount.toLocaleString()}đ</strong>
                  </div>
                  <div className="flex justify-between text-[#001F3F] font-bold items-center">
                    <span>Thuế VAT ước tính nộp:</span>
                    <strong className="font-mono font-bold">{(currentResultObj as any).estimatedVatAmount.toLocaleString()}đ</strong>
                  </div>
                </div>
              </div>
            )}

            {calcType === "penalty" && (
              <div className="mt-2 space-y-3">
                <div className="text-gray-500 text-xs font-medium">Ước tính mức phạt nợ thuế & Chậm báo cáo hàng hành:</div>
                <div className="text-3xl font-black text-amber-900 tracking-tight">
                  ~ {(currentResultObj as any).totalEstimated.toLocaleString()} <span className="text-xs text-slate-500 font-sans font-medium">VNĐ</span>
                </div>
                
                <div className="border-t border-gray-150 pt-3 space-y-2 text-xs font-sans font-medium">
                  <div className="flex justify-between items-start">
                    <span className="text-gray-500">Mức phạt chậm hồ sơ (Bổ sung NĐ 125):</span>
                    <strong className="text-amber-800 font-mono text-right font-bold">{(currentResultObj as any).minAdminPenalty.toLocaleString()}đ - {(currentResultObj as any).maxAdminPenalty.toLocaleString()}đ</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Tiền muộn nộp 0.03%/ngày ({calcPenaltyDays} ngày):</span>
                    <strong className="font-mono text-amber-900 font-bold">{(currentResultObj as any).dailyPenalty.toLocaleString()}đ</strong>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Warn alerts */}
          <div className="bg-yellow-50 border border-yellow-250 p-3.5 rounded text-[11px] text-yellow-850 italic leading-relaxed font-sans font-semibold">
            💡 {(currentResultObj as any).explanation}
          </div>

          <div className="pt-2 font-sans">
            <button
              onClick={() => {
                setLeadForm(prev => ({
                  ...prev,
                  problem: `Sử dụng máy tính thử số thuế ${calcType === "hkd"? "HKD thô" : calcType === "rent" ? "Cho thuê nhà" : calcType === "corporate" ? "Doanh nghiệp (SME)" : "Phát sinh phạt nợ"} cần liên hệ đại lý rà soát hộ.`
                }));
                document.getElementById("lead-form-scroll-target")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full bg-[#800020] hover:bg-neutral-950 text-white font-extrabold py-3 rounded-lg text-xs uppercase tracking-widest transition-transform active:scale-95 duration-200"
            >
              Xác nhận thông tin & Khai báo thử ngay
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
