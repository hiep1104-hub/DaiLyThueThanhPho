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
  const [activeTab, setActiveTab] = useState<string>("services");
  const [lookupSubTab, setLookupSubTab] = useState<"search" | "calculator">("search");
  const [serviceSubView, setServiceSubView] = useState<"catalog" | "lifecycle">("catalog");
  const [lifecycleEntity, setLifecycleEntity] = useState<"hkd" | "dn">("hkd");
  
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
  const [calcHkdPlatformPayment, setCalcHkdPlatformPayment] = useState<"yes" | "no">("yes");
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
      text: "Chào bạn! Tôi là Trợ lý AI từ Đại lý Thuế Thành Phố. Bạn cần tư vấn gỡ rối về dòng tiền Shopee/TikTok Shop, quyết toán thuế cho thuê nhà, hay rà soát sổ sách hộ kinh doanh?",
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

  // Sync selected service when service group filter changes to ensure instant detailed view alignment
  useEffect(() => {
    const filtered = SERVICES_DATA.filter(
      (s) => serviceGroupFilter === "ALL" || s.group === serviceGroupFilter
    );
    if (filtered.length > 0) {
      setSelectedService(filtered[0]);
    }
  }, [serviceGroupFilter]);

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
        text: "Xin lỗi, kết nối mạng tạm thời bị lỗi. Theo luật thuế thực tế đối với hộ kinh doanh/cá nhân, doanh thu từ 200 triệu/năm trở lên có tỷ lệ đóng là 1.5% (Shopee) hoặc 10% (Chung cư thuê) từ ngày 01/01/2026. Bạn hãy gửi số điện thoại tại form liên hệ để tôi gọi lại ngay!",
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

      const isExempt = calcHkdRevenue <= 200000000;
      const totalTax = isExempt ? 0 : (calcHkdRevenue * totalRate) / 100;
      const vatAmount = isExempt ? 0 : (calcHkdRevenue * vatRate) / 100;
      const pitAmount = isExempt ? 0 : (calcHkdRevenue * pitRate) / 100;

      let explanationText = "";
      if (isExempt) {
        explanationText = "Tổng doanh thu kinh doanh trong năm dương lịch từ 200.000.000đ trở xuống thuộc diện MIỄN nộp thuế GTGT & TNCN (quy định mới nhất áp dụng từ năm 2026).";
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
      const isExempt = totalRevenue <= 200000000;
      const totalTax = isExempt ? 0 : totalRevenue * 0.10; // 5% GTGT + 5% TNCN
      return {
        isExempt,
        totalRevenue,
        totalTax,
        explanation: isExempt 
          ? "Do doanh thu cho thuê cả năm dưới 200 triệu đồng, bạn được miễn nộp thuế theo luật định mới từ năm 2026. Lưu ý vẫn nộp tờ khai kê khai đầy đủ."
          : `Tổng doanh thu năm là ${totalRevenue.toLocaleString()}đ (vượt ngưỡng 200tr), áp mức thuế suất cho thuê tài sản 10% (5% GTGT + 5% TNCN).`
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
          <span>Hỗ trợ khẩn cấp: <strong>0819.319.919</strong></span>
          <span>● Hệ thống Đại lý Thuế được cấp phép</span>
        </div>
      </div>

      {/* Main Header / Elegant Editorial Navigation */}
      <header id="main-editorial-header" className="bg-white border-b border-gray-250 sticky top-0 z-40 shadow-sm shrink-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Brand Identity with Burgundy + Navy contrast */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("services")}>
            <div className="w-12 h-12 bg-[#800020] flex items-center justify-center rounded shadow-md relative group">
              <span className="text-white font-extrabold text-2xl tracking-tighter">TP</span>
              <div className="absolute inset-0.5 border border-white/20 rounded"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[#001F3F] font-black text-xl tracking-tight uppercase">DAILYTHUETP.COM.VN</span>
              </div>
              <p className="text-[#800020] text-[11px] font-bold tracking-widest uppercase">Đại lý Thuế Thành Phố — Trung tâm giải pháp thuế</p>
            </div>
          </div>

          {/* Global Header has been simplified (tabs removed) */}
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <a 
              href="tel:0819319919" 
              className="bg-[#001F3F] hover:bg-[#800020] text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow transition-all duration-200"
            >
              <PhoneCall size={14} className="animate-pulse" />
              HOTLINE: 0819.319.919
            </a>
          </div>
        </div>
      </header>

      {/* Main Container Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex-1 flex flex-col lg:flex-row gap-6 w-full">
        
        {/* LEFT COLUMN: Main viewport of the applet, dynamically changing */}
        <div className="flex-1 min-w-0 bg-white border border-gray-200 shadow-sm rounded-lg p-4 md:p-8 space-y-6">
          
          {/* LOCAL INTERACTION SWITCHER (Professional Tax Portal Workspace) */}
          <div className="border-b border-gray-200 pb-4 flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-lg border border-gray-200 shadow-sm w-full">
              {[
                { id: "services", label: "📋 1. CHỌN MÔ HÌNH CỦA BẠN (Lộ Trình Dịch Vụ)" },
                { id: "calculator", label: "🧮 2. TỰ TÍNH TIỀN THUẾ (Bấm Tính Thử Thuế & Tiền Phạt)" },
                { id: "lookup", label: "🔍 3. TRA CỨU TIÊU CHUẨN (Mức Thuế Suất & Văn Bản Luật)" },
                { id: "faq", label: "🤖 4. HỎI ĐÁP AI & TƯ VẤN (Tư Vấn & Nộp Hồ Sơ Từ Xa)" },
              ].map((subTab) => (
                <button
                  key={subTab.id}
                  id={`local-nav-btn-${subTab.id}`}
                  onClick={() => {
                    setActiveTab(subTab.id);
                  }}
                  className={`px-3.5 py-2 text-xs font-bold rounded-md transition-all uppercase tracking-tight flex items-center gap-1.5 flex-1 justify-center ${
                    activeTab === subTab.id
                      ? "bg-[#800020] text-white shadow-sm font-black"
                      : "text-[#001F3F] hover:bg-white hover:text-[#800020]"
                  }`}
                >
                  {subTab.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* TAB 1: HOME PAGE DISABLED */}
          {false && (
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
                    <span className="text-[#800020]">GIẢI PHÁP THUẾ</span>
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
                      Thiết lập phương thức kê khai theo Thông tư 88 từ 1/1/2026, mở 5 loại sổ sách kế toán cốt lõi, đăng ký thành lập trọn gói nhanh gọn nhất.
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
                      { t: "Thực hành thực tế", d: "Chúng tôi đứng trên góc nhìn thực tế, giải quyết nhanh các tình huống thực tế của khách, không dạy chữ suông lý thuyết." },
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
            <div id="view-tab-services" className="space-y-6 animate-fadeIn">
              <div className="border-b border-gray-200 pb-2 flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
                <div>
                  <h2 className="text-2xl font-black text-[#001F3F] uppercase tracking-wide">
                    Hệ Thống Quản Trị & Dịch Vụ Thuế Thực Chiến
                  </h2>
                  <p className="text-xs text-gray-500">
                    Cung cấp lộ trình tuân thủ, tính toán rủi ro và giải pháp thuế trọn gói cho mọi mô hình kinh doanh Việt Nam.
                  </p>
                </div>
                
                {/* Secondary navigation for Catalog & Lifecycle */}
                <div className="flex bg-slate-100 p-1 rounded-md border border-gray-200">
                  <button
                    onClick={() => setServiceSubView("catalog")}
                    className={`px-3 py-1.5 text-xs font-bold rounded transition-all uppercase tracking-tight flex items-center gap-1.5 ${
                      serviceSubView === "catalog"
                        ? "bg-[#800020] text-white shadow-sm"
                        : "text-[#001F3F] hover:bg-white"
                    }`}
                  >
                    💼 Dịch Vụ
                  </button>
                  <button
                    onClick={() => setServiceSubView("lifecycle")}
                    className={`px-3 py-1.5 text-xs font-bold rounded transition-all uppercase tracking-tight flex items-center gap-1.5 relative ${
                      serviceSubView === "lifecycle"
                        ? "bg-[#800020] text-white shadow-sm"
                        : "text-[#001F3F] hover:bg-white"
                    }`}
                  >
                    🔄 Chu Kỳ Pháp Lý & Vòng Đời Thuế
                    <span className="absolute -top-1.5 -right-1.5 bg-[#001F3F] text-white text-[8px] px-1 py-0.5 rounded font-black scale-90 tracking-tighter uppercase">
                      Mới
                    </span>
                  </button>
                </div>
              </div>

              {/* INTERACTIVE COMPREHENSIVE ONBOARDING ROADMAP SELECTOR FOR BEGINNERS */}
              <div className="bg-slate-50 border border-gray-200 rounded-lg p-5 space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#800020] text-white text-xs font-black">?</span>
                    <h3 className="text-sm font-black text-[#001F3F] uppercase tracking-wider">
                      Bạn thuộc nhóm Kinh doanh hoặc có nhu cầu nào dưới đây?
                    </h3>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                  {[
                    {
                      id: "HKD",
                      label: "Hộ Kinh Doanh Cá Thể",
                      subtitle: "Ăn uống, sỉ/lẻ, dịch vụ",
                      desc: "Kê khai theo Thông tư 88 (phương pháp thuế khoán đã bãi bỏ từ 1/1/2026). Đầy đủ 5 loại sổ sách kế toán cốt lõi.",
                      tag: "Phổ biến",
                      color: "border-amber-200 bg-amber-50/20 hover:bg-amber-50/40",
                      badgeColor: "bg-amber-600",
                      action: () => {
                        setServiceGroupFilter("HKD");
                        setLifecycleEntity("hkd");
                        setServiceSubView("catalog");
                        const previewEl = document.getElementById("services-catalog-focus");
                        if (previewEl) previewEl.scrollIntoView({ behavior: "smooth" });
                      }
                    },
                    {
                      id: "CNKD",
                      label: "Shop Online / Sàn TMĐT",
                      subtitle: "TikTok, Shopee, Affiliate",
                      desc: "Tự động tối ưu hóa đơn, rà soát đối soát thuế sàn TMĐT, Freelancer.",
                      tag: "TMĐT - HOT",
                      color: "border-blue-200 bg-blue-50/20 hover:bg-blue-50/40",
                      badgeColor: "bg-blue-600",
                      action: () => {
                        setServiceGroupFilter("CNKD");
                        setLifecycleEntity("hkd");
                        setServiceSubView("catalog");
                        const previewEl = document.getElementById("services-catalog-focus");
                        if (previewEl) previewEl.scrollIntoView({ behavior: "smooth" });
                      }
                    },
                    {
                      id: "CTTS",
                      label: "Cho Thuê Nhà / Đất",
                      subtitle: "Căn hộ, mặt bằng, kho bãi",
                      desc: "Khai thuế tài sản cho thuê khi đạt DT từ 200 triệu VNĐ/năm trở lên.",
                      tag: "Thuế Tài Sản",
                      color: "border-emerald-200 bg-emerald-50/20 hover:bg-emerald-50/40",
                      badgeColor: "bg-emerald-600",
                      action: () => {
                        setServiceGroupFilter("CTTS");
                        setLifecycleEntity("hkd");
                        setServiceSubView("catalog");
                        const previewEl = document.getElementById("services-catalog-focus");
                        if (previewEl) previewEl.scrollIntoView({ behavior: "smooth" });
                      }
                    },
                    {
                      id: "DN",
                      label: "Doanh Nghiệp / Công Ty",
                      subtitle: "TNHH, Cổ Phần, Khởi Nghiệp",
                      desc: "Bộ máy Kế toán trọn gói, quyết toán tài chính, đóng BHXH & lao động.",
                      tag: "Đối Tác Lớn",
                      color: "border-purple-200 bg-purple-50/20 hover:bg-purple-50/40",
                      badgeColor: "bg-purple-600",
                      action: () => {
                        setServiceGroupFilter("DN");
                        setLifecycleEntity("dn");
                        setServiceSubView("lifecycle"); // Toggle to lifecycle for companies!
                        const previewEl = document.getElementById("services-catalog-focus");
                        if (previewEl) previewEl.scrollIntoView({ behavior: "smooth" });
                      }
                    },
                    {
                      id: "XL",
                      label: "Gỡ Rối / Truy Thu Gấp",
                      subtitle: "Thanh tra, phạt nộp chậm",
                      desc: "Hỗ trợ làm việc, giải trình, gỡ vướng trực tiếp cơ quan thuế tại địa bàn.",
                      tag: "Cứu Hộ Khẩn",
                      color: "border-rose-200 bg-rose-50/20 hover:bg-rose-50/40",
                      badgeColor: "bg-rose-600",
                      action: () => {
                        setServiceGroupFilter("XL");
                        setLifecycleEntity("dn");
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
                        onClick={role.action}
                        className={`p-3.5 border-2 rounded-lg text-left cursor-pointer transition-all duration-200 relative group flex flex-col justify-between ${
                          isSelected 
                            ? "border-[#800020] bg-[#800020]/5 scale-102 shadow-md" 
                            : "border-gray-200 bg-white"
                        } ${role.color}`}
                      >
                        <div>
                          <span className={`absolute -top-2.5 right-2 text-[8px] font-black uppercase text-white px-1.5 py-0.5 rounded tracking-widest ${role.badgeColor}`}>
                            {role.tag}
                          </span>
                          
                          <div className="font-extrabold text-[12px] text-[#001F3F] leading-snug group-hover:text-[#800020] transition-colors">{role.label}</div>
                          <div className="text-[10px] text-gray-500 font-bold mt-0.5">{role.subtitle}</div>
                          <div className="text-[10.5px] mt-2 text-gray-600 leading-snug font-normal line-clamp-3">
                            {role.desc}
                          </div>
                        </div>
                        
                        <div className="mt-3 text-[9px] font-black text-[#800020] flex items-center justify-between uppercase tracking-wider border-t border-gray-100 pt-2">
                          <span>Khai thác ngay</span>
                          <ChevronRight size={10} className="transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div id="services-catalog-focus" className="scroll-mt-6"></div>

              {/* VIEW 2.1: INTERACTIVE SERVICES CATALOG */}
              {serviceSubView === "catalog" && (
                <div className="space-y-6">
                  {/* Group selection tabs */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { k: "ALL", l: "Tất cả dịch vụ" },
                      { k: "HKD", l: "Hộ kinh doanh (Kê khai Thông tư 88)" },
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
                  
                  {/* Entity Type Toggle Selector - International Executive layout */}
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

                  {/* CHRONOLOGICAL TIMELINE CHU KỲ (5 PHASES) */}
                  <div className="space-y-6 relative pl-4 md:pl-0">
                    
                    {/* Vertical line helper for mobile */}
                    <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-gray-200 md:hidden"></div>

                    {[
                      {
                        phase: "GIAI ĐOẠN 1",
                        title: "PHÁP LÝ THÀNH LẬP & PHÁT TRÌNH BAN ĐẦU",
                        desc: "Các thủ tục đăng ký giấy phép hoạt động kinh doanh hợp pháp và đảm bảo tính hiệu lực pháp nhân với các cơ quan quản lý.",
                        hkd: [
                          {
                            title: "Đăng ký Giấy chứng nhận Đăng ký Hộ kinh doanh liên thông đăng ký thuế",
                            body: "Theo Nghị định 141/2026/NĐ-CP, nộp hồ sơ trực tuyến liên thông ĐKKD và đăng ký thuế tại Cổng thông tin quốc gia về đăng ký doanh nghiệp/hợp tác xã/hộ kinh doanh để nhận mã số thuế và mã số kinh doanh đồng hành tự động.",
                            time: "1 - 3 ngày làm việc",
                            penalty: "MIỄN 100% lệ phí đăng ký theo Thông tư 152/2025/TT-BTC khi nộp qua mạng. Nộp trực tiếp là 100.000 đồng."
                          },
                          {
                            title: "Cấp Giấy chứng nhận đăng ký hộ kinh doanh dưới dạng điện tử",
                            body: "Hộ kinh doanh có thể tải trực tiếp bản điện tử có đầy đủ chữ ký số và mã QR xác thực để giao dịch ngay lập tức với ngân hàng, đối tác và xuất hóa đơn.",
                            time: "Cùng ngày phê duyệt",
                            penalty: "Quy trình số hóa giúp giảm thiểu tối đa việc lưu trữ bản giấy truyền thống."
                          },
                          {
                            title: "Quy luật sử dụng lao động tối đa",
                            body: "Nghị định 141/2026/NĐ-CP và Nghị định 01/2021/NĐ-CP bãi bỏ hoàn toàn giới hạn 10 lao động. Hộ kinh doanh được tự do sử dụng số lượng lao động không giới hạn.",
                            time: "Hiệu lực lập tức",
                            penalty: "Lưu ý ký kết hợp đồng đầy đủ đúng luật lao động Việt Nam để tránh tranh chấp dân sự."
                          }
                        ],
                        dn: [
                          {
                            title: "Đăng ký cấp Giấy chứng nhận Đăng ký Doanh nghiệp (GPKD)",
                            body: "Nộp hồ sơ đăng ký thành lập (Công ty TNHH 1 TV, 2 TV, Cổ phần) trên Cổng Thông tin Quốc gia về Đăng ký Doanh nghiệp thuộc Sở Kế hoạch và Đầu tư.",
                            time: "3 - 5 ngày làm việc",
                            penalty: "Phạt từ 10M - 20M nếu đi vào kinh doanh mà chưa hoàn thiện Giấy chứng nhận."
                          },
                          {
                            title: "Khắc con dấu Công ty & Công bố thông tin pháp nhân",
                            body: "Theo Luật Doanh nghiệp 2020, doanh nghiệp tự chịu trách nhiệm quyết định số lượng, hình thức và nội dung con dấu mà không cần thông báo mẫu dấu lên Sở KH&ĐT.",
                            time: "Trong vòng 1-2 ngày",
                            penalty: "Đảm bảo quản lý con dấu chặt chẽ tránh rủi ro pháp lý ngoài ý muốn."
                          },
                          {
                            title: "Đăng ký tài khoản Thuế Điện Tử (eTax - thuedientu.gdt.gov.vn)",
                            body: "Tạo tài khoản chữ ký số và đồng bộ cổng thông tin thuế để phục vụ nộp hồ sơ, tờ khai điện tử sau này.",
                            time: "Cùng thời điểm có GPKD",
                            penalty: "Bắt buộc để liên kết nộp ngân sách nhà nước trực tuyến an toàn."
                          }
                        ]
                      },
                      {
                        phase: "GIAI ĐOẠN 2",
                        title: "THIẾT LẬP THUẾ BAN ĐẦU (ÁP DỤNG TRONG 30 NGÀY ĐẦU)",
                        desc: "Những bước khai báo ban đầu để cơ quan quản lý thuế đưa cơ sở kinh doanh vào diện giám sát quản lý hoạt động.",
                        hkd: [
                          {
                            title: "Lựa chọn phương pháp tính thuế thích hợp",
                            body: "Bắt buộc chuyển đổi sang phương pháp Kê khai theo Thông tư 88 từ ngày 01/01/2026 cho toàn bộ hộ kinh doanh (phương pháp Thuế Khoán đã chính thức bãi bỏ).",
                            time: "Hạn chót 30 ngày",
                            penalty: "Hộ kinh doanh TMĐT mới phát sinh phải chủ động kê khai để tránh bị phạt tội trốn thuế."
                          },
                          {
                            title: "Treo biển hiệu tại địa chỉ ĐKKD",
                            body: "Bắt buộc phải treo biển hiệu có ghi tên hộ kinh doanh, mã số thuế, số điện thoại để cơ quan quản lý xác minh.",
                            time: "Ngay sau khi thành lập",
                            penalty: "Chi cục thuế đi kiểm tra thực tế nếu không treo biển hiệu hoặc không hoạt động tại địa chỉ đăng ký sẽ bị khoá mã số thuế."
                          },
                          {
                            title: "Mua Chữ ký số (Token/SmartCA) & Đăng ký sử dụng Hóa đơn điện tử",
                            body: "Đăng ký hóa đơn điện tử có mã của cơ quan thuế theo Nghị định 123/2020/NĐ-CP (Áp dụng đối với hộ nộp thuế kê khai).",
                            time: "Trong vòng 30 ngày đầu",
                            penalty: "Sử dụng sai quy cách hoá đơn điện tử bị phạt hành chính từ 3 triệu đến 8 triệu đồng."
                          }
                        ],
                        dn: [
                          {
                            title: "Bắt buộc treo biển hiệu và mở văn phòng thực tế",
                            body: "Tránh trường hợp Cơ quan thuế gửi cán bộ kiểm tra xác minh địa điểm hoạt động kinh doanh trực tiếp tại trụ sở đăng ký.",
                            time: "Trong vòng 10 ngày đầu",
                            penalty: "Không treo biển hiệu sẽ lập tức bị cơ sở thuế khóa mã số thuế diện 'Người nộp thuế không hoạt động tại địa chỉ đã đăng ký', ảnh hưởng cực nghiêm trọng đến hoạt động."
                          },
                          {
                            title: "Nộp tờ khai lệ phí Môn Bài lần đầu",
                            body: "Nộp tờ khai lệ phí môn bài. Theo quy định tại Nghị định 22/2020/NĐ-CP, Doanh nghiệp thành lập mới được MIỄN lệ phí môn bài trong năm đầu tiên. Nhưng vẫn phải nộp tờ khai môn bài muộn nhất trước ngày 30/01 năm kế tiếp thành lập.",
                            time: "Trước 30/1 năm kế tiếp",
                            penalty: "Lệ phí môn bài: Vốn điều lệ > 10 tỷ nộp 3.000.000đ/năm; Vốn điều lệ <= 10 tỷ nộp 2.000.000đ/năm. Không khai nộp tờ khai phạt từ 2 triệu đến 5 triệu đồng."
                          },
                          {
                            title: "Thông báo phát hành hóa đơn điện tử trực tuyến",
                            body: "Soạn và gửi hồ sơ đăng ký hóa đơn điện tử sử dụng mẫu Đăng ký (Mẫu 01/ĐKTĐ-HĐĐT ban hành kèm Nghị định 123) nộp cơ quan thuế duyệt.",
                            time: "Trước khi xuất hóa đơn đầu tiên",
                            penalty: "Sử dụng hóa đơn bất hợp pháp hoặc xuất hóa đơn trước khi được duyệt phát hành bị xử phạt từ 20 triệu đến 50 triệu đồng."
                          }
                        ]
                      },
                      {
                        phase: "GIAI ĐOẠN 3",
                        title: "VẬN HÀNH ĐỊNH KỲ THƯỜNG NYÊN (KẾ TOÁN & THUẾ VÀO NỀN NẾP)",
                        desc: "Công việc hằng tháng, quý và năm của doanh nghiệp/hộ kinh doanh để tuân thủ luật và báo cáo chính sách dòng tiền.",
                        hkd: [
                          {
                            title: "Thực hiện hệ thống sổ sách kế toán (Đối với Hộ Kê Khai)",
                            body: "Theo Thông tư 88/2021/TT-BTC, Hộ kê khai bắt buộc phải ghi chép đầy đủ 5 sổ kế toán chính: 1. Sổ chi tiết doanh thu bán hàng hóa dịch vụ; 2. Sổ chi tiết vật liệu, dụng cụ, sản phẩm, hàng hóa; 3. Sổ chi phí sản xuất, kinh doanh; 4. Sổ theo dõi tình hình thực hiện nghĩa vụ thuế với NSNN; 5. Sổ theo dõi thanh toán tiền lương và các khoản nộp theo lương.",
                            time: "Cập nhật hàng ngày/tháng",
                            penalty: "Không lập sổ sách hoặc lập sổ sách không đúng biểu mẫu quy định bị xử phạt kiểm tra từ 2 triệu đến 5 triệu đồng."
                          },
                          {
                            title: "Khai nộp thuế GTGT & TNCN hàng quý",
                            body: "Sử dụng Tờ khai 01/CNKD. Nộp chậm nhất vào ngày cuối cùng của tháng đầu tiên thuộc quý tiếp theo.",
                            time: "Trước ngày 30/4, 31/7, 31/10, 31/1 năm kế tiếp",
                            penalty: "Tỷ lệ thuế suất: Kinh doanh TMĐT, TikTok, Shopee là 1.5% tổng doanh thu. Bán hàng phân phối đại lý là 1.5%. Dịch vụ là 7%. Sản xuất là 4.5%."
                          }
                        ],
                        dn: [
                          {
                            title: "Chuẩn bị hệ thống sổ sách kế toán & Quyết định chọn Chế độ",
                            body: "Áp dụng Thông tư 133 (doanh nghiệp vừa và nhỏ) hoặc Thông tư 200 (doanh nghiệp lớn). Bắt buộc phải tổ chức bộ máy kế toán, ghi chép chứng từ phát sinh thực tế hàng ngày.",
                            time: "Liên tục suốt năm tài chính",
                            penalty: "Hạch toán sai bản chất chi phí gây sai lệch nghĩa vụ thuế sẽ bị truy thu 20% số thuế thiếu và phạt chậm nộp 0.03%/ngày."
                          },
                          {
                            title: "Khai báo và tạm nộp thuế hàng Quý",
                            body: "1. Khai thuế Giá trị gia tăng (GTGT) hàng quý (nếu DT từ 50 tỷ trở xuống). 2. Khai thuế TNCN tạm nộp nếu có khấu trừ nhân viên trong quý. 3. Tạm tính và nộp số thuế Thu nhập doanh nghiệp (TNDN) tạm tính phát sinh quý (Thuế suất phổ thông 20%). Không cần nộp tờ khai TNDN quý mà chỉ tạm nộp tiền vào NSNN.",
                            time: "Muộn nhất ngày thứ 30 của quý tiếp theo",
                            penalty: "Tổng số thuế TNDN đã tạm nộp của 4 quý không được thấp hơn 80% số thuế TNDN quyết toán năm. Nếu thấp hơn sẽ bị phạt tính tiền chậm nộp 0.03%/ngày cho số chênh lệch thiếu."
                          },
                          {
                            title: "Lập Báo cáo tài chính (BCTC) & Quyết toán thuế cuối năm",
                            body: "Báo cáo thường niên bắt buộc gồm: Báo cáo tài chính cuối năm, Quyết toán thuế Thu nhập doanh nghiệp (Mẫu 03/TNDN), Quyết toán thuế TNCN (Mẫu 05/QTT-TNCN). Nộp hồ sơ qua hệ thống thuế thuedientu.",
                            time: "Trong vòng 90 ngày sau kết thúc năm (Hạn chót 31/03)",
                            penalty: "Nộp chậm BCTC và Quyết toán năm bị xử phạt lũy tiến cực nặng từ 5 triệu đến 25 triệu đồng tuỳ số ngày chậm nộp."
                          }
                        ]
                      },
                      {
                        phase: "GIAI ĐOẠN 4",
                        title: "CHẾ ĐỘ LAO ĐỘNG & BẢO HIỂM XÃ HỘI (QUYỀN LỢI NHÂN SỰ)",
                        desc: "Nghĩa vụ xã hội tối quan trọng liên quan đến BHXH, BHYT, Bảo hiểm thất nghiệp và quản lý tiền lương lao động thực tế.",
                        hkd: [
                          {
                            title: "Bắt buộc ký lao động và đóng BHXH cho nhân viên",
                            body: "Theo Luật Bảo hiểm xã hội Việt Nam, hộ kinh doanh có hành vi ký HĐLĐ bằng văn bản từ 1 tháng trở lên cho nhân sự bắt buộc phải lập hồ sơ đóng BHXH bắt buộc cho người lao động.",
                            time: "Trong vòng 30 ngày từ ngày ký HĐLĐ",
                            penalty: "Hành vi trốn đóng, chậm đóng BHXH bị phạt 12% đến 15% tổng số tiền bảo hiểm bắt buộc chưa đóng (nhưng không quá 75 triệu đồng) và bị buộc nộp đủ tiền chậm đóng với lãi suất phạt."
                          },
                          {
                            title: "Khấu trừ và đóng nộp hàng tháng",
                            body: "Tổng tỷ lệ đóng đóng Bảo hiểm là 32% (Chủ hộ kinh doanh đóng 21.5% trích quỹ chi phí; Người lao động tự chịu 10.5% khấu trực tiếp từ tiền lương cơ bản).",
                            time: "Nộp trước ngày cuối cùng mỗi tháng",
                            penalty: "Chủ hộ kinh doanh không thuộc đối tượng tham gia BHXH bắt buộc của chính mình, nhưng khuyến khích tham gia BHXH tự nguyện để an sinh."
                          }
                        ],
                        dn: [
                          {
                            title: "Khai trình sử dụng lao động ban đầu",
                            body: "Trong thời hạn 30 ngày kể từ ngày bắt đầu hoạt động, người sử dụng lao động của doanh nghiệp phải khai trình việc sử dụng lao động với Phòng LĐ-TB&XH quản lý.",
                            time: "30 ngày tối đa",
                            penalty: "Báo cáo tình hình sử dụng lao động định kỳ 6 tháng một lần (trước ngày 5/6 và trước ngày 5/12 hàng năm)."
                          },
                          {
                            title: "Thiết lập Thang lương, Bảng lương doanh nghiệp",
                            body: "Doanh nghiệp tự xây dựng thang lương, bảng lương để áp dụng thanh toán lương cho người lao động và làm căn cứ đóng các khoản liên đới BHXH. Thang lương phải lưu trữ tại văn phòng để giải trình khi đoàn liên ngành kiểm tra.",
                            time: "Ngay khi có phát sinh lao động",
                            penalty: "Lương tối thiểu vùng đảm bảo không thấp hơn mức quy định của Chính phủ cho từng vùng địa lý kinh tế."
                          },
                          {
                            title: "Đăng ký Mã đơn vị BHXH & Nộp trực tuyến định kỳ",
                            body: "Tạo hồ sơ thành lập Mã đơn vị đóng bảo hiểm tại quận/huyện sở tại. Định kỳ hàng tháng lập tờ khai biến động nhân sự (Mẫu D02-LT) để khai báo tăng, giảm hoặc điều chỉnh mức đóng.",
                            time: "Đều đặn hàng tháng",
                            penalty: "Trốn đóng bảo hiểm xã hội, ngoài xử lý phạt hành chính diện rộng, nếu số tiền trốn đóng lớn có thể cấu thành tội hình sự theo Điều 216 Bộ luật Hình sự Việt Nam."
                          },
                          {
                            title: "Nghĩa vụ đóng nộp Kinh phí Công đoàn",
                            body: "Doanh nghiệp bắt buộc nộp Kinh phí Công đoàn bằng 2% quỹ tiền lương làm căn cứ đóng BHXH cho người lao động, không phân biệt công ty đã thành lập Công đoàn cơ sở hay chưa.",
                            time: "Nộp cùng thời điểm đóng BHXH",
                            penalty: "Chậm nộp kinh phí công đoàn bị phạt từ 12% đến 15% số tiền chưa nộp."
                          }
                        ]
                      },
                      {
                        phase: "GIAI ĐOẠN 5",
                        title: "QUYẾT TOÁN THUẾ, THANH TRA ĐỊNH KỲ VÀ THỦ TỤC GIẢI THỂ",
                        desc: "Giải quyết các rủi ro phát sinh khi kết thúc chu kỳ hoạt động kinh doanh hoặc tiếp đón đoàn thanh tra kiểm tra chính quy.",
                        hkd: [
                          {
                            title: "Thanh tra đối chiếu thực tế doanh số của Chi cục Thuế",
                            body: "Cơ quan thuế quận/huyện tiến hành thanh tra chéo số liệu dòng tiền các thẻ ngân hàng cá nhân đăng ký nhận tiền TMĐT, đối chiếu lịch sử hóa đơn bán lẻ của hộ kê khai để xác định tính trung thực trong báo cáo thuế.",
                            time: "Đột xuất hoặc định kỳ 3 năm",
                            penalty: "Gian lận doanh thu, kê khai sai bị phạt hành chính từ 1 đến 3 lần số tiền thuế trốn nộp."
                          },
                          {
                            title: "Thủ tục chấm dứt hoạt động (Giải thể Hộ kinh doanh)",
                            body: "1. Nộp hồ sơ chấm dứt mã số thuế và thanh toán đầy đủ công nợ thuế lên Chi cục Thuế sở tại. 2. Làm thủ tục chốt sổ BHXH cho lao động và khoá mã đóng bảo hiểm. 3. Nộp biên bản trả giấy chứng nhận kinh doanh lên UBND huyện để xoá tên hộ kinh doanh.",
                            time: "Trong vòng 15-30 ngày làm việc",
                            penalty: "Không làm thủ tục đóng MST mà bỏ địa bàn sẽ bị đưa vào danh sách đen nợ thuế nhà nước, người đại diện bị cấm xuất cảnh."
                          }
                        ],
                        dn: [
                          {
                            title: "Thanh tra, quyết toán thuế định kỳ",
                            body: "Đoàn thanh tra Thuế của Cục/Chi cục trực tiếp thanh kiểm tra sổ sách kế toán, chứng từ đối chiếu hóa đơn, sổ sách ngân hàng gốc của doanh nghiệp định kỳ 3 - 5 năm/lần hoặc quyết toán giải thể.",
                            time: "Chu kỳ 3-5 năm một lần",
                            penalty: "Doanh nghiệp cần lưu trữ hồ sơ kế toán tối thiểu 10 năm theo Luật Kế toán để tránh thất lạc tài liệu khi thanh tra."
                          },
                          {
                            title: "Thủ tục giải thể và xoá sổ doanh nghiệp một cách hợp pháp",
                            body: "Quy trình 5 bước: 1. Thông qua quyết định giải thể; 2. Đăng công bố giải thể (3 kỳ liên tiếp) trên Cổng thông tin ĐKDN; 3. Thanh toán hết các khoản nợ tiền lương, nợ bảo hiểm, nợ thuế; 4. Nộp hồ sơ quyết toán thuế giải thể tại Cơ quan Thuế để hoàn thành thủ tục đóng Mã số Thuế; 5. Nộp hồ sơ giải thể chính thức tại Phòng ĐKKD - Sở KH&ĐT để xóa tên pháp nhân.",
                            time: "Thực tế dao động 3 - 6 tháng",
                            penalty: "Nếu không quyết toán thuế giải thể, mã số doanh nghiệp sẽ bị treo cảnh báo nợ thuế, đình chỉ hoạt động và ảnh hưởng nghiêm trọng tới các pháp nhân khác do cùng chủ sở hữu sáng lập."
                          }
                        ]
                      }
                    ].map((step, pIdx) => {
                      const list = lifecycleEntity === "hkd" ? step.hkd : step.dn;
                      return (
                        <div key={pIdx} className="relative md:grid md:grid-cols-12 md:gap-6 items-start">
                          
                          {/* Left bullet column for desktop, inline header for mobile */}
                          <div className="md:col-span-3 pb-3 md:pb-0">
                            <div className="sticky top-4 space-y-2">
                              <span className="inline-block bg-[#800020] text-white text-[10px] uppercase font-black px-2.5 py-1 rounded tracking-widest shadow-sm">
                                {step.phase}
                              </span>
                              <h5 className="font-black text-xs text-[#001F3F] uppercase leading-tight">
                                {step.title}
                              </h5>
                              <p className="text-[10.5px] text-gray-500 hidden md:block leading-normal">
                                {step.desc}
                              </p>
                            </div>
                          </div>

                          {/* Right interactive items list */}
                          <div className="md:col-span-9 space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                              {list.map((item, iIdx) => (
                                <div key={iIdx} className="bg-white border border-gray-200 hover:border-[#800020]/40 p-4 rounded-lg shadow-sm transition-all text-xs space-y-3">
                                  <div className="flex items-start justify-between gap-3">
                                    <h6 className="font-extrabold text-[#001F3F] text-xs flex items-center gap-1.5 leading-tight">
                                      <span className="bg-[#001F3F] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center shrink-0">
                                        {iIdx + 1}
                                      </span>
                                      {item.title}
                                    </h6>
                                    <span className="bg-slate-100 text-[#001F3F] text-[10px] font-bold px-2 py-0.5 rounded shrink-0">
                                      ⏱️ {item.time}
                                    </span>
                                  </div>
                                  
                                  <p className="text-gray-600 leading-relaxed text-[11px] bg-slate-50/50 p-2.5 rounded border border-gray-100 font-sans">
                                    {item.body}
                                  </p>

                                  <div className="bg-rose-50 border border-rose-200/50 text-[#800020] p-2.5 rounded flex items-start gap-1.5 text-[10.5px]">
                                    <AlertTriangle size={14} className="shrink-0 mt-0.5 text-[#800020]" />
                                    <div>
                                      <span className="font-bold uppercase tracking-wider text-[9px] block">Rủi Ro & Chế Tài Xử Phạt:</span>
                                      <span className="text-gray-700 font-medium">{item.penalty}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                        </div>
                      );
                    })}

                  </div>

                  {/* High professional final warning statement */}
                  <div className="bg-[#800020]/5 border border-[#800020]/20 p-5 rounded-lg text-center space-y-3">
                    <div className="text-xs font-black text-[#001F3F] uppercase tracking-wide flex items-center justify-center gap-2">
                      <ShieldCheck className="text-[#800020]" size={18} />
                      Khuyến Nghị Quan Trọng Từ Các Luật Sư Thuế Doanh Nghiệp
                    </div>
                    <p className="text-xs text-gray-700 max-w-2xl mx-auto leading-relaxed">
                      "Luật pháp Việt Nam về Thuế & Bảo hiểm liên tục cập nhật đổi mới hàng năm. Hành vi tự ý kê khai thiếu sổ sách, chậm nộp, hoặc trốn đóng bảo hiểm của cả Hộ kinh doanh lẫn Doanh nghiệp đều có thể bị truy cứu trách nhiệm dân sự đến hình sự. Nên liên hệ thiết lập với một pháp nhân <strong>Đại lý Thuế được cấp phép hành nghề số 00056/BTC</strong> để gửi gắm hồ sơ và được bảo vệ tối đa lợi ích hợp pháp."
                    </p>
                    <div className="pt-1 flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setLeadForm(prev => ({
                            ...prev,
                            problem: `Yêu cầu lập hồ sơ tư vấn chu kỳ vòng đời pháp luật cho mô hình: ${lifecycleEntity === "hkd" ? "HỘ KINH DOANH" : "DOANH NGHIỆP"}`
                          }));
                          const scrollTarget = document.getElementById("lead-form-scroll-target");
                          if (scrollTarget) scrollTarget.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="bg-[#800020] text-white text-xs font-black px-5 py-2.5 rounded hover:bg-black transition-all uppercase tracking-wide shadow"
                      >
                        📞 Đăng ký nhận Bản đồ Lộ trình & Tư vấn Trực Tiếp
                      </button>
                    </div>
                  </div>

                </div>
              )}

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

              {/* CITIZEN QUICK SEARCH SHORTCUTS */}
              <div className="bg-gradient-to-r from-red-50 to-amber-50 border border-amber-200 rounded-lg p-5 space-y-3 shadow-xs">
                <div className="flex items-center gap-2 text-amber-900 font-extrabold">
                  <Sparkles size={16} className="text-[#800020] animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    Phím tắt tra cứu nhanh cho người chưa biết gì về thuế:
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 leading-normal font-sans">
                  Để giúp người dân dễ dàng tìm kiếm thông tin không bị ngợp, hãy bấm thẳng vào các thắc mắc thực tế dưới đây để hệ thống hiển thị nhanh số liệu và biểu mức:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    {
                      label: "🏪 Shop bán hàng Online (TikTok Shop, Shopee) đóng thuế mấy %?",
                      action: () => {
                        setLookupMst("0316827361");
                        const tableEl = document.querySelector("table");
                        if (tableEl) tableEl.scrollIntoView({ behavior: "smooth" });
                      }
                    },
                    {
                      label: "🏠 Có căn hộ hoặc mặt bằng cho thuê thì mức đóng thế nào?",
                      action: () => {
                        setLookupMst("0316827361");
                        // Let's scroll to the table
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
                <p className="text-xs text-gray-500">Bảng chi tiết dựa trên Thông tư 40/2021/TT-BTC áp dụng cho hộ kê khai theo Thông tư 88 & cá nhân kinh doanh online (phương pháp thuế khoán đã bãi bỏ từ 01/01/2026).</p>
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
                <div id="tax-calendar-section" className="space-y-3 scroll-mt-6">
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

                <div id="penalty-rules-section" className="space-y-3 scroll-mt-6">
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
                  Kiến Thức Thuế - Bài viết hướng dẫn từng bước
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

          {/* TAB 3: TAX CALCULATOR UTILITY */}
          {activeTab === "calculator" && (
            <div id="view-tab-calculator" className="space-y-6">

              <div className="border-b border-gray-200 pb-2">
                <h2 className="text-2xl font-black text-[#001F3F] uppercase tracking-wide">
                  Phần Mềm Tính Thử Số Thuế Phải Nộp Trực Tuyến
                </h2>
                <p className="text-xs text-gray-500">Nhập doanh thu thô để hệ thống bóc tách số liệu thuế tự động gãy gọn theo Thông tư 40.</p>
              </div>

              {/* Presets for non-tax experts */}
              <div className="bg-[#800020]/5 border-l-4 border-[#800020] p-4 rounded-r-lg space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-black text-[#001F3F] uppercase tracking-wider">
                  <Sparkles size={14} className="text-[#800020] animate-pulse" />
                  Bạn chưa biết tính từ đâu? Chọn nhanh tình huống thực tế của bạn dưới đây để chạy thử máy tính:
                </div>
                <div className="flex flex-wrap gap-2 pt-1 text-xs">
                  {[
                    {
                      label: "🏪 1. Shop TikTok Bán Quần Áo (Doanh thu 500 Triệu/năm)",
                      action: () => {
                        setCalcType("hkd");
                        setCalcHkdSector("PP"); // Phân phối hàng hoá
                        setCalcHkdRevenue(500000000);
                      }
                    },
                    {
                      label: "🏢 2. Hộ Gia Đình Mở Quán Ăn (Doanh thu 200 Triệu/năm)",
                      action: () => {
                        setCalcType("hkd");
                        setCalcHkdSector("AH"); // Ăn uống (Thương mại dịch vụ ăn uống)
                        setCalcHkdRevenue(200000000);
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
                      key={preset.label}
                      onClick={preset.action}
                      className="bg-white hover:bg-[#800020] hover:text-white text-[#001F3F] border border-gray-250 hover:border-[#800020] rounded px-3 py-1.5 text-[11px] font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
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

                      {/* E-Commerce Platform Payment Process Configuration */}
                      {(calcHkdSector === "BL" || calcHkdSector === "K") && (
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
                        <div className="text-gray-500 text-xs">Tổng số tiền thuế ước tính nộp (Thuế suất 10%):</div>
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
                  Hỏi Đáp Nhanh & Trợ Lý AI Thuế
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
                    <strong>Hệ thống Trợ lý Thuế AI 24/7</strong>
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
                          HƯỚNG ĐI XỬ LÝ CỦA ĐẠI LÝ:
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
                    <span className="text-xs text-green-900 font-bold">● Chế độ quản trị viên đang chạy</span>
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
                  }}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-gray-300 rounded focus:outline-none"
                >
                  <option value="">-- Mời bạn chọn mục --</option>
                  <option value="rate">Tra cứu tỷ nộp thuế Shopee/TikTok</option>
                  <option value="penalty">Tra cứu khung phạt chậm môn bài</option>
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
                  <option value="Hộ kinh doanh nộp thuế">Hộ kinh doanh (Kê khai theo Thông tư 88)</option>
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
              Thời gian làm việc: liên tục từ 8:00 - 17:00 hàng ngày (Từ thứ 2 đến thứ 6) từ 8:00 - 12:00 vào Thứ Bảy .
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
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-300 pb-6 border-b border-white/10">
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
              <div>📞 <strong className="text-white">Hotline:</strong> 0819.319.919</div>
              <div>📍 <strong className="text-white">Trụ sở chính:</strong> 39 Đỗ Thị Tâm, P. Phú Thọ Hoà, TP.HCM</div>
              <div>🏢 <strong className="text-white">Văn phòng:</strong> 61 Phan Đình Phùng, P. Phú Thọ Hoà, TP.HCM</div>
              <div>✉️ <strong className="text-white">Email:</strong> dailythuethanhpho@gmail.com</div>
              <div className="text-[10px] text-red-300 font-bold mt-1 uppercase tracking-wide">✔ ĐỒNG HÀNH PHÁP LÝ DOANH NGHIỆP</div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-400 gap-4">
          <div>
            © 2026 Đại Lý Thuế Thành Phố. Bảo lưu mọi quyền pháp lý. Giấy phép hành nghề số 00056/BTC.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer" onClick={() => alert("Đại Lý Thuế Thành Phố cam kết bảo mật tuyệt đối 100% mọi thông tin hồ sơ và dữ liệu kinh doanh của quý khách hàng.")}>Chính sách bảo mật</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
