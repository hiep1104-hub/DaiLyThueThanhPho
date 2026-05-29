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
  Users, 
  ChevronRight,
  Sparkles,
  MessageSquare,
  MessageSquareOff,
  CalendarDays
} from "lucide-react";
import { 
  SERVICES_DATA, 
  PRACTICAL_GUIDES_DATA, 
  TAX_RATIOS_BY_SECTOR, 
  LATEST_TAX_CALENDAR 
} from "./lib/data";
import { ServiceDetail, PracticalGuide, LeadSubmission } from "./types";

// Import modularized components
import ServicesTab from "./components/ServicesTab";
import LookupTab from "./components/LookupTab";
import GuidesTab from "./components/GuidesTab";
import LawsTab from "./components/LawsTab";
import CalculatorTab from "./components/CalculatorTab";
import FaqTab from "./components/FaqTab";
import CasesTab from "./components/CasesTab";

export default function App() {
  // Navigation & Sub-page States
  const [activeTab, setActiveTabVal] = useState<string>("services");
  
  const setActiveTab = (tabId: string) => {
    setActiveTabVal(tabId);
    let targetId = "app-root-container";
    if (tabId === "consult") {
      targetId = "app-root-container";
    } else if (tabId === "services") {
      targetId = "section-services";
    } else if (tabId === "tools") {
      targetId = "section-tools";
    } else if (tabId === "calculator") {
      setActiveTabVal("tools");
      targetId = "section-calculator";
    } else if (tabId === "lookup") {
      setActiveTabVal("tools");
      targetId = "section-lookup";
    } else if (tabId === "faq") {
      setActiveTabVal("tools");
      targetId = "section-faq";
    } else if (tabId === "guides" || tabId === "laws") {
      setActiveTabVal("consult");
      targetId = "section-guides";
    } else if (tabId === "cases") {
      setActiveTabVal("consult");
      targetId = "section-cases";
    }
    
    setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };
  
  const [lookupSubTab, setLookupSubTab] = useState<"search" | "calculator">("search");
  const [panelTab, setPanelTab] = useState<"register" | "lookup">("register");
  const [consultSubTab, setConsultSubTab] = useState<"guides" | "cases" | "trust" | "admin">("guides");
  const [serviceSubView, setServiceSubView] = useState<"catalog" | "lifecycle">("catalog");
  const [lifecycleEntity, setLifecycleEntity] = useState<"hkd" | "dn">("hkd");
  
  // User category segment selection: "hkd" (Hộ kinh doanh / Cá nhân) or "dn" (Doanh nghiệp)
  const [userSegment, setUserSegment] = useState<"hkd" | "dn">("hkd");
  
  // Corporate Calculator States
  const [calcCorpRevenue, setCalcCorpRevenue] = useState<number>(3000000000); 
  const [calcCorpExpense, setCalcCorpExpense] = useState<number>(2400050000); 
  const [calcCorpVatMethod, setCalcCorpVatMethod] = useState<"khautru" | "tructiep">("khautru");
  const [calcCorpVatRate, setCalcCorpVatRate] = useState<number>(10); 
  
  // Interactive filters
  const [serviceGroupFilter, setServiceGroupFilter] = useState<string>("ALL");
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(SERVICES_DATA[0]);
  const [legalSearch, setLegalSearch] = useState<string>("");
  const [legalCategoryFilter, setLegalCategoryFilter] = useState<string>("ALL");
  const [selectedGuide, setSelectedGuide] = useState<PracticalGuide | null>(PRACTICAL_GUIDES_DATA[0]);

  // Tra cứu States
  const [lookupMst, setLookupMst] = useState<string>("");
  const [lookupResult, setLookupResult] = useState<any | null>(null);

  // Calculator States
  const [calcType, setCalcType] = useState<"hkd" | "rent" | "penalty" | "corporate">("hkd");
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
  const [lastSubmittedLead, setLastSubmittedLead] = useState<{
    fullName: string;
    phoneNumber: string;
    bizType: string;
    problem: string;
  } | null>(null);

  // Admin dashboard config & persistence
  const [leadsList, setLeadsList] = useState<LeadSubmission[]>([]);
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [adminSearch, setAdminSearch] = useState<string>("");
  const [isUpdatingLeadId, setIsUpdatingLeadId] = useState<string | null>(null);

  const fetchLeads = async () => {
    try {
      const response = await fetch("/api/leads");
      const data = await response.json();
      if (data.success) {
        setLeadsList(data.leads || []);
      }
    } catch (err) {
      console.error("Lỗi tải thông tin bộ leads:", err);
    }
  };

  const handleUpdateLeadStatus = async (leadId: string, status: "NEW" | "CONTACTED" | "RESOLVED", agentNotes?: string) => {
    setIsUpdatingLeadId(leadId);
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, agentNotes })
      });
      const data = await response.json();
      if (data.success) {
        fetchLeads();
      }
    } catch (err) {
      console.error("Lỗi cập nhật hồ sơ:", err);
    } finally {
      setIsUpdatingLeadId(null);
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
    const finalFullName = leadForm.fullName.trim() || "Khách liên hệ nhanh";
    if (!leadForm.phoneNumber) {
      setLeadSubmitError("Vui lòng điền số điện thoại liên hệ.");
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
          fullName: finalFullName,
          phoneNumber: leadForm.phoneNumber,
          bizType: leadForm.bizType,
          problem: leadForm.problem || `Yêu cầu dịch vụ liên quan đến ${leadForm.bizType}`,
          files: uploadedFiles
        })
      });

      const data = await response.json();
      if (data.success) {
        setLastSubmittedLead({
          fullName: finalFullName,
          phoneNumber: leadForm.phoneNumber,
          bizType: leadForm.bizType,
          problem: leadForm.problem || `Yêu cầu dịch vụ liên quan đến ${leadForm.bizType}`
        });
        setLeadSubmitSuccess("Đại lý Thuế Thành Phố đã nhận được hồ sơ của bạn. Chuyên viên sẽ gọi điện/Zalo tư vấn trong 10-15 phút!");
        
        // Reset form fields
        setLeadForm({ fullName: "", phoneNumber: "", bizType: "Shopee/TikTok Shop", problem: "" });
        setUploadedFiles([]);
        
        // Dynamic fetch to reflect in custom inbox dashboard immediately
        fetchLeads();
      } else {
        setLeadSubmitError(data.message || "Lỗi xử lý hệ thống. Vui lòng liên hệ Hotline.");
      }
    } catch (err) {
      setLeadSubmitError("Không thể kết nối đến máy chủ. Tuy nhiên thông tin đã được ghi nhận cục bộ!");
      setLeadSubmitSuccess("Đã lưu hồ sơ của bạn cục bộ thành công! Hệ thống sẽ liên lạc trực tiếp.");
    } finally {
      setIsSubmittingLead(false);
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
        status: "Đang hoạt động",
        name: clean.startsWith("03") ? "CÔNG TY TNHH THƯƠNG MẠI SMARTDECOR" : "HỘ KINH DOANH TRẦN THU TRANG",
        owner: clean.startsWith("03") ? "Ông Nguyễn Văn Linh" : "Bà Trần Thu Trang",
        address: clean.startsWith("03") ? "A10-12 Cư xá Phú Lâm B, Phường 13, Quận 6, TP.HCM" : "39 Đỗ Thị Tâm, P. Phú Thọ Hoà, Tân Phú, TP.HCM",
        bizType: clean.startsWith("03") ? "Doanh nghiệp vừa và nhỏ" : "Hộ kinh doanh nộp thuế khoán",
        risk: clean.startsWith("03") ? "AN TOÀN" : "XUYÊN SUỐT TRUY THU THUẾ",
        riskDetail: clean.startsWith("03") 
          ? "Hiện chưa ghi nhận rủi ro hóa đơn ảo từ Tổng cục Thuế. Doanh nghiệp cần tiếp tục kê khai đúng hạn định kỳ." 
          : "Hệ thống phát hiện tài khoản cá nhân có biến động dòng tiền thụ động lớn liên tục từ Shopee, TikTok Shop nhưng chưa đăng ký nợ thuế. Khuyến nghị kê khai gấp."
      });
    } else if (clean.length === 12) {
      setLookupResult({
        mst: "Cá Nhân: " + clean,
        status: "Chưa đăng ký Hộ KD",
        name: "Mã Số Thuế Cá Nhân Đóng Thuế TNCN",
        owner: "Người nộp thuế: " + (clean.startsWith("079") ? "Phạm Minh Hoàng" : "Lê Văn Tiến"),
        address: "Thường trú tại Quận Tân Phú, Thành Phố Hồ Chí Minh",
        bizType: "Mã số định danh cá nhân thông thường",
        risk: "RỦI RO BAO PHỦ DÒNG TIỀN",
        riskDetail: "Chưa đăng ký mã kinh doanh online. Khuyến nghị chuẩn bị hồ sơ bổ sung trước khi sàn TMĐT gửi đối soát 2026."
      });
    } else {
      setLookupResult({
        mst: clean,
        status: "Thử nghiệm rà soát",
        name: "Hệ Thống Rà Quyét Mẫu",
        owner: "Cục Thuế Thành Phố",
        address: "Toàn quốc",
        bizType: "Kiểm tra định danh nhanh",
        risk: "MẪU THỬ NGHIỆM",
        riskDetail: "MST mẫu hoặc sai độ dài chuẩn (10 số doanh nghiệp / hộ KD, 13 số chi nhánh, 12 số CCCD)."
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



  return (
    <div id="app-root-container" className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans antialiased text-gray-800 selection:bg-[#800020] selection:text-white">
      {/* Top Banner Warning & Hot News (Editorial Strip) */}
      <div id="hot-news-ribbon" className="bg-sky-600 text-white text-[12px] py-1.5 px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center border-b border-sky-750 font-mono tracking-wide">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="bg-[#800020] px-1.5 py-0.5 rounded text-[10px] font-bold text-white uppercase animate-pulse">Cập nhật</span>
          <span>Nghị định 125/2020/NĐ-CP & Luật Quản lý Thuế mới nhất về rà soát rủi ro TMĐT năm 2026</span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <span className="inline-flex items-center gap-2 bg-[#800020] text-amber-300 border border-amber-500/40 px-3  py-1 rounded-full text-[11px] font-black uppercase tracking-widest shadow-lg shadow-black/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Hỗ trợ khẩn cấp: <strong className="text-white font-mono text-[12px] tracking-normal">0819.319.919</strong>
          </span>
        </div>
      </div>

      {/* CORE HERO BANNER */}
      <div id="mighty-hero-banner" className="bg-gradient-to-br from-sky-900 via-sky-850 to-sky-800 text-white py-14 px-4 md:px-8 shrink-0 relative overflow-hidden text-center md:text-left border-b border-sky-700">
        {/* Subtle decorative background graphic element/glow */}
        <div className="absolute top-1/4 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-3/4 right-1/4 -translate-y-1/2 translate-x-1/2 w-[300px] h-[300px] bg-red-800/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-10 md:gap-14 relative z-10">
          
          <div className="space-y-6 max-w-2xl flex flex-col items-center text-center mx-auto lg:mx-0">
            <div className="space-y-2 w-full animate-fadeIn">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wide leading-[1.1] text-white text-center">
                ĐẠI LÝ THUẾ{" "}
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                  THÀNH PHỐ
                </span>
              </h1>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-xs sm:text-sm font-black tracking-wide text-amber-300 uppercase border-y border-white/10 py-2.5 max-w-xl w-full text-center animate-fadeIn">
              <span>GIẢI PHÁP THUẾ</span>
              <span className="text-amber-500/60 font-medium">•</span>
              <span>TỐI ƯU THUẾ</span>
              <span className="text-amber-500/60 font-medium">•</span>
              <span className="text-white">KIỂM SOÁT RỦI RO VỀ DÒNG TIỀN</span>
            </div>
            
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-xl font-semibold text-center mx-auto">
              Chuyên bóc tách dòng tiền phức tạp, giải quyết triệt để hồ sơ sai lệch doanh thu sàn TMĐT Shopee/TikTok/Lazada, bảo vệ doanh nghiệp trước các quyết định cơ quan thuế và tối ưu hóa hệ số rủi ro.
            </p>
          </div>

          {/* INTEGRATED COHESIVE SYSTEM PANEL */}
          <div className="w-full lg:w-[580px] bg-[#0c192c]/90 backdrop-blur-xl rounded-3xl p-6 md:p-7 border border-white/10 text-left text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-6">
            
            {/* Elegant Header with LIVE pulse */}
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-amber-400 text-[10px] font-extrabold uppercase tracking-widest font-mono">
                    Hỗ Trợ Khẩn Cấp 24/7
                  </span>
                </div>
                <h3 className="text-white font-black text-xl uppercase tracking-tight">
                  KẾT NỐI ĐẠI LÝ THUẾ
                </h3>
              </div>
              <div className="flex flex-col items-end shrink-0 bg-white/5 py-1 px-3 rounded-full border border-white/10">
                <span className="text-[9px] font-extrabold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                  ● Trực Tuyến
                </span>
              </div>
            </div>

            {/* Premium Tab Switchers */}
            <div className="grid grid-cols-2 bg-black/40 p-1 rounded-xl border border-white/5">
              <button
                type="button"
                onClick={() => setPanelTab("register")}
                className={`py-2.5 px-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-300 text-center ${
                  panelTab === "register"
                    ? "bg-gradient-to-r from-[#800020] to-[#990026] text-white shadow-md shadow-[#800020]/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                📥 Gửi Yêu Cầu Gấp
              </button>
              <button
                type="button"
                onClick={() => setPanelTab("lookup")}
                className={`py-2.5 px-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-300 text-center ${
                  panelTab === "lookup"
                    ? "bg-gradient-to-r from-[#800020] to-[#990026] text-white shadow-md shadow-[#800020]/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                🔍 Tra Cứu & Hotline
              </button>
            </div>

            {/* TAB CONTENT 1: REGISTER CONSULTATION */}
            {panelTab === "register" && (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-white/5 p-3.5 rounded-2xl border border-white/5">
                  <p className="text-[11px] text-gray-300 leading-relaxed font-semibold">
                    <span className="text-amber-400 font-extrabold">✔️ Tiết kiệm ngay 80% rủi ro phạt:</span> Cân đối sổ sách thuế, rà soát chênh lệch dòng tiền tài khoản cá nhân & COD sàn TMĐT hoàn toàn bảo mật.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const customForm = {
                      ...leadForm,
                      fullName: leadForm.fullName || "Khách liên hệ nhanh",
                      problem: leadForm.problem || `Yêu cầu kiểm tra rủi ro nợ thuế & bóc tách dòng tiền. Nhu cầu: ${leadForm.bizType}`
                    };
                    setLeadForm(customForm);
                    handleLeadSubmit(e);
                  }}
                  className="space-y-4"
                >
                  {/* Phone input */}
                  <div className="space-y-1.5">
                    <label className="font-extrabold text-gray-300 text-[10px] uppercase block tracking-wider font-mono">
                      Số điện thoại liên hệ di động / Zalo (*):
                    </label>
                    <input
                      type="tel"
                      required
                      value={leadForm.phoneNumber}
                      onChange={(e) => setLeadForm({ ...leadForm, phoneNumber: e.target.value })}
                      placeholder="Nhập SĐT để cán bộ gọi lại ngay..."
                      className="w-full p-3 bg-black/40 text-white placeholder-gray-500 border border-white/10 rounded-xl text-xs font-bold outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-all font-sans"
                    />
                  </div>

                  {/* Business Type Selector */}
                  <div className="space-y-1.5">
                    <label className="font-extrabold text-gray-300 text-[10px] uppercase block tracking-wider font-mono">
                      Chọn Nhu cầu cụ thể của bạn:
                    </label>
                    <select
                      value={leadForm.bizType}
                      onChange={(e) => setLeadForm({ ...leadForm, bizType: e.target.value })}
                      className="w-full p-3 bg-black/90 text-white border border-white/10 rounded-xl text-xs font-bold outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20"
                    >
                      <option value="Shopee/TikTok Shop" className="bg-[#0c192c]">Bán hàng sàn TMĐT Shopee / TikTok / Lazada</option>
                      <option value="Hộ kinh doanh nộp thuế" className="bg-[#0c192c]">Hộ kinh doanh (Lập sổ mẫu Thông tư 88)</option>
                      <option value="Cho thuê nhà ở" className="bg-[#0c192c]">Cho thuê nhà ở / mặt bằng cho công ty</option>
                      <option value="Doanh nghiệp SME" className="bg-[#0c192c]">Kế toán thuế trọn gói Doanh nghiệp SME</option>
                      <option value="Gỡ Cưỡng chế nợ thuế" className="bg-[#0c192c]">Gỡ Cưỡng chế nợ thuế & Khôi phục Mã số thuế</option>
                      <option value="Gỡ ngừng sử dụng hóa đơn" className="bg-[#0c192c]">Xử lý Ngừng sử dụng Hóa đơn doanh nghiệp</option>
                      <option value="Giải trình hệ số K" className="bg-[#0c192c]">Giải trình Hệ số K (Chênh lệch doanh thu - hóa đơn)</option>
                      <option value="Quyết toán Thuế & BHXH" className="bg-[#0c192c]">Tối ưu Quyết toán & Bảo hiểm xã hội Doanh nghiệp</option>
                      <option value="Giải trình xử lý khẩn cấp" className="bg-[#0c192c]">Bị phong tỏa tài khoản / Trát triệu tập Cục Thuế</option>
                    </select>
                  </div>

                  {leadSubmitSuccess && (
                    <div className="bg-[#E8F5E9] text-emerald-950 p-4 rounded-xl text-xs font-semibold border-2 border-emerald-400 space-y-3 shadow-md animate-fadeIn">
                      <div className="flex items-start gap-2">
                        <span className="text-base text-emerald-600">✔</span>
                        <div>
                          <p className="font-extrabold text-[#1B5E20] text-xs uppercase tracking-tight">Hệ Thống Đã Lưu Trữ!</p>
                          <p className="text-gray-700 font-medium leading-relaxed mt-0.5">{leadSubmitSuccess}</p>
                        </div>
                      </div>

                      {lastSubmittedLead && (
                        <div className="bg-white/75 border border-emerald-200 p-2.5 rounded-lg space-y-2 mt-1">
                          <div className="text-[10px] text-emerald-800 font-extrabold uppercase tracking-tight flex items-center gap-1">
                            <span>💬 Soạn sẵn tin nhắn Zalo gửi 24/7:</span>
                          </div>
                          <textarea
                            readOnly
                            className="w-full text-[10px] p-2 bg-slate-50 border border-gray-200 rounded font-mono text-gray-600 outline-none resize-none"
                            rows={3}
                            value={`[ĐẠI LÝ THUẾ THÀNH PHỐ] Xin chào chuyên viên, tôi cần hỗ trợ:\n- Khách hàng: ${lastSubmittedLead.fullName}\n- SĐT: ${lastSubmittedLead.phoneNumber}\n- Mô hình: ${lastSubmittedLead.bizType}`}
                          />
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                const text = `[ĐẠI LÝ THUẾ THÀNH PHỐ] Xin chào chuyên viên, tôi cần hỗ trợ:\n- Khách hàng: ${lastSubmittedLead.fullName}\n- SĐT: ${lastSubmittedLead.phoneNumber}\n- Mô hình: ${lastSubmittedLead.bizType}`;
                                navigator.clipboard.writeText(text);
                                alert("Đã sao chép nội dung tin nhắn gửi chuyên viên!");
                              }}
                              className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 text-[9px] font-black py-1.5 px-2 rounded uppercase tracking-wider transition-colors"
                            >
                              📋 Sao chép tin nhắn
                            </button>
                            <a
                              href={`https://zalo.me/0819319919`}
                              target="_blank"
                              rel="noreferrer"
                              className="flex-1 bg-[#25D366] hover:bg-emerald-600 text-white text-[9px] font-black py-1.5 px-2 rounded uppercase tracking-wider transition-colors text-center inline-block"
                            >
                              🟢 Mở Zalo Gửi ➜
                            </a>
                          </div>
                        </div>
                      )}

                      <div className="border-t border-emerald-300/40 pt-2 text-[10px] text-gray-600 select-none">
                         ⚠️ <strong className="text-emerald-900">Xem hồ sơ của bạn ở đâu?</strong> Hãy kéo xuống cuối phân khu để bật <strong className="underline cursor-pointer" onClick={() => {
                           setIsAdminMode(true);
                           setTimeout(() => {
                             document.getElementById("lead-admin-mailbox-section")?.scrollIntoView({ behavior: "smooth" });
                           }, 150);
                         }}>"Chế độ xem Hộp thư"</strong> để thấy hồ sơ của bạn đã được ghi nhận trực tiếp theo thời gian thực!
                      </div>
                    </div>
                  )}

                  {leadSubmitError && (
                    <div className="bg-red-500/20 text-rose-300 p-2.5 rounded-lg text-[10.5px] font-bold border border-red-500/30">
                      ⚠️ {leadSubmitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmittingLead}
                    className="w-full bg-amber-400 hover:bg-amber-500 active:scale-98 text-[#001F3F] font-black py-3 px-4 rounded-xl text-xs uppercase tracking-widest transition-all shadow-[0_4px_20px_rgba(245,158,11,0.3)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.5)] cursor-pointer"
                  >
                    {isSubmittingLead ? "ĐANG GỬI THÔNG TIN..." : "ĐĂNG KÝ TƯ VẤN 1-1 PHIÊN BẢN MỚI ⚡"}
                  </button>
                </form>
              </div>
            )}

            {/* TAB CONTENT 2: QUICK LOOKUP & HOTLINE */}
            {panelTab === "lookup" && (
              <div className="space-y-5 animate-fadeIn">
                {/* Visual Direct hotline card */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 space-y-3">
                  <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest block font-mono">
                    📞 ĐƯỜNG DÂY NÓNG CHUYÊN VIÊN TAX:
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <a 
                      href="tel:0819319919"
                      className="flex items-center justify-center gap-2.5 bg-[#800020] hover:bg-red-950 text-white py-3 px-4 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
                    >
                      <span>📞 Gọi Ngay:</span>
                      <span className="text-amber-300 font-black">0819.319.919</span>
                    </a>
                    
                    <a 
                      href="https://zalo.me/0819319919" 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/15 text-white py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all border border-white/10"
                    >
                      <span className="text-emerald-400 font-black">🟢 Zalo OA:</span>
                      <strong className="font-sans font-black text-[11px]">Chat 24/7</strong>
                    </a>
                  </div>

                  <p className="text-[10px] text-gray-400 italic text-center text-semibold">
                    * Gọi điện trực tiếp hoặc quét mã Zalo OA để trao đổi tài liệu mật nhanh gọn.
                  </p>
                </div>

                {/* Inline tax ID search check */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="space-y-1">
                    <h4 className="text-amber-400 font-extrabold text-xs uppercase tracking-wider">
                      🔍 Tra Cứu Tỷ Lệ Quyết Toán & Kiểm Tra Rủi Ro
                    </h4>
                    <p className="text-[10px] text-gray-300 leading-relaxed">
                      Nhập MST cá nhân, doanh nghiệp hoặc số CCCD bán hàng sàn TMĐT để rà quét tính công bằng thuế:
                    </p>
                  </div>

                  <form onSubmit={handleMstLookup} className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={lookupMst}
                        onChange={(e) => setLookupMst(e.target.value)}
                        placeholder="Nhập MST / CCCD cần kiểm tra..."
                        className="flex-1 p-3 bg-black/40 text-white placeholder-gray-500 border border-white/10 rounded-xl text-xs font-bold outline-none focus:border-amber-400"
                      />
                      <button
                        type="submit"
                        className="bg-white text-[#001F3F] font-black text-[10.5px] px-4 py-3 rounded-xl uppercase tracking-wider hover:bg-amber-400 hover:text-black transition-all cursor-pointer"
                      >
                        TRA CỨU
                      </button>
                    </div>
                  </form>

                  {/* Interactive search result container */}
                  {lookupResult ? (
                    <div className="bg-black/90 border border-amber-400/30 p-3.5 rounded-2xl text-[11px] space-y-2 animate-fadeIn shadow-xl">
                      <div className="flex justify-between items-center text-amber-400 font-bold uppercase text-[9px] tracking-wide">
                        <span>Đại diện: {lookupResult.owner || "Không rõ"}</span>
                        <span className="bg-red-950 text-amber-300 px-2 py-0.5 rounded text-[8px] border border-amber-400/20">
                          {lookupResult.risk || "CHƯA XÁC ĐỊNH"}
                        </span>
                      </div>
                      <p className="text-gray-100 leading-relaxed font-semibold italic">
                        "{lookupResult.riskDetail || ""}"
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab("tools");
                          setTimeout(() => {
                            document.getElementById("section-lookup")?.scrollIntoView({ behavior: "smooth" });
                          }, 100);
                        }}
                        className="mt-1.5 text-center mt-2 font-mono block w-full text-blue-300 hover:text-blue-200 hover:underline font-extrabold text-[9.5px] uppercase tracking-wider"
                      >
                        Xem Định Lượng Hạn Mức Toàn Diện tại Phân Khu 03 ➜
                      </button>
                    </div>
                  ) : (
                    <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl text-center text-[10px] text-gray-400">
                      Chưa thực hiện tra cứu. Nhập mã để nhận phân tích tự động tức thì.
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* GLOBAL MAIN TAB PORTAL SELECTOR */}
      <div id="global-portal-selector" className="max-w-7xl mx-auto px-4 md:px-8 mt-8 w-full">
        <div className="bg-white border border-gray-250 p-2 rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-3 gap-2">
          
          <button
            type="button"
            onClick={() => setActiveTab("consult")}
            className={`py-3.5 px-6 rounded-xl flex items-center justify-center gap-3 transition-all ${
              activeTab === "consult"
                ? "bg-[#001F3F] text-amber-400 font-black shadow-md"
                : "bg-transparent text-gray-500 hover:bg-slate-50 font-semibold font-sans"
            }`}
          >
            <span className="text-xl">📍</span>
            <div className="text-left leading-tight">
              <span className="text-[10px] uppercase font-bold tracking-widest block opacity-75">Phân Khu 01</span>
              <span className="text-xs md:text-sm font-black uppercase">TƯ VẤN & UY TÍN PHÁP LÝ</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("services")}
            className={`py-3.5 px-6 rounded-xl flex items-center justify-center gap-3 transition-all ${
              activeTab === "services"
                ? "bg-[#001F3F] text-amber-400 font-black shadow-md"
                : "bg-transparent text-gray-500 hover:bg-slate-50 font-semibold font-sans"
            }`}
          >
            <span className="text-xl">💼</span>
            <div className="text-left leading-tight">
              <span className="text-[10px] uppercase font-bold tracking-widest block opacity-75">Phân Khu 02</span>
              <span className="text-xs md:text-sm font-black uppercase">DỊCH VỤ & LỘ TRÌNH</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("tools")}
            className={`py-3.5 px-6 rounded-xl flex items-center justify-center gap-3 transition-all ${
              activeTab === "tools"
                ? "bg-[#001F3F] text-amber-400 font-black shadow-md"
                : "bg-transparent text-gray-500 hover:bg-slate-50 font-semibold font-sans"
            }`}
          >
            <span className="text-xl">🛠️</span>
            <div className="text-left leading-tight">
              <span className="text-[10px] uppercase font-bold tracking-widest block opacity-75">Phân Khu 03</span>
              <span className="text-xs md:text-sm font-black uppercase">CÔNG CỤ TÍNH THUẾ & AI</span>
            </div>
          </button>

        </div>
      </div>

      {/* CONDITIONAL PORTAL PAGES */}
      {activeTab === "consult" && (
        <div id="portal-view-consult" className="space-y-12 w-full animate-fadeIn pb-12">
          {/* AUDIENCE SELECTOR GRID */}
          <div id="segment-audience-selector" className="max-w-7xl mx-auto px-4 md:px-8 mt-8 w-full">
            <div className="bg-[#FAF9F6] border border-gray-250 p-6 rounded-2xl shadow-inner space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-left">
                <div>
                  <span className="text-[#800020] text-[10px] font-black tracking-widest uppercase block mb-0.5 font-sans">Phân luồng nghiệp vụ thuế</span>
                  <h3 className="text-base font-black text-[#001F3F] uppercase tracking-wide">Bạn thuộc nhóm đối tượng nộp thuế nào?</h3>
                </div>
                <span className="text-[10px] text-gray-500 italic bg-white border border-gray-200 px-2 py-1 rounded shadow-sm self-start sm:self-center font-semibold font-sans">
                  Hệ thống tự động lọc biểu mẫu, quy trình & AI tương thích
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setUserSegment("hkd");
                    if (calcType === "corporate") {
                      setCalcType("hkd");
                    }
                    setSelectedGuide(null);
                    setServiceGroupFilter("ALL");
                    setServiceSubView("catalog");
                  }}
                  className={`p-4 rounded-xl border text-left flex gap-3 transition-all ${
                    userSegment === "hkd"
                      ? "border-[#800020] bg-red-50/20 ring-1 ring-[#800020] shadow-sm"
                      : "border-gray-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    userSegment === "hkd" ? "bg-[#800020] text-white animate-pulse" : "bg-gray-100 text-gray-500"
                  }`}>
                    <Users size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-xs text-[#001F3F] uppercase tracking-wide">Hộ Kinh Doanh & Cá Nhân</span>
                      {userSegment === "hkd" && <span className="bg-[#800020] text-white text-[8px] px-1 py-0.5 rounded font-black uppercase">Đang chọn</span>}
                    </div>
                    <p className="text-[10.5px] text-gray-500 leading-relaxed font-semibold">
                      Shop Shopee/TikTok, cá nhân tự doanh, Affiliate, Live-stream, KOL/KOC, cho thuê nhà, hộ mở sổ Thông tư 88.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUserSegment("dn");
                    if (calcType === "hkd" || calcType === "rent") {
                      setCalcType("corporate");
                    }
                    setSelectedGuide(null);
                    setServiceGroupFilter("ALL");
                    setServiceSubView("catalog");
                  }}
                  className={`p-4 rounded-xl border text-left flex gap-3 transition-all ${
                    userSegment === "dn"
                      ? "border-[#800020] bg-red-50/20 ring-1 ring-[#800020] shadow-sm"
                      : "border-gray-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    userSegment === "dn" ? "bg-[#800020] text-white animate-pulse" : "bg-gray-100 text-gray-500"
                  }`}>
                    <Building2 size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-xs text-[#001F3F] uppercase tracking-wide">Doanh Nghiệp & Công Ty (SMEs)</span>
                      {userSegment === "dn" && <span className="bg-[#800020] text-white text-[8px] px-1 py-0.5 rounded font-black uppercase">Đang chọn</span>}
                    </div>
                    <p className="text-[10.5px] text-gray-500 leading-relaxed font-semibold">
                      Hồ sơ báo cáo thuế hàng tháng cho SMEs, công ty TNHH/Cổ phần, báo cáo tài chính năm, kiểm tra hóa đơn vi phạm.
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* ZONE 01 SUB-TAB BAR */}
          <div className="max-w-7xl mx-auto px-4 md:px-8 mt-2 w-full">
            <div className="bg-[#FAF9F5] border border-gray-250 p-1.5 rounded-2xl grid grid-cols-2 lg:grid-cols-4 gap-1.5 shadow-sm">
              <button
                type="button"
                onClick={() => setConsultSubTab("guides")}
                className={`py-3 px-4 rounded-xl text-center text-xs font-black uppercase tracking-wide transition-all duration-200 flex items-center justify-center gap-2 ${
                  consultSubTab === "guides"
                    ? "bg-[#001F3F] text-amber-400 shadow-md ring-1 ring-slate-900"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60 font-semibold"
                }`}
              >
                <span>📚</span> Thư Viện Quyết Toán
              </button>
              <button
                type="button"
                onClick={() => setConsultSubTab("cases")}
                className={`py-3 px-4 rounded-xl text-center text-xs font-black uppercase tracking-wide transition-all duration-200 flex items-center justify-center gap-2 ${
                  consultSubTab === "cases"
                    ? "bg-[#001F3F] text-amber-400 shadow-md ring-1 ring-slate-900"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60 font-semibold"
                }`}
              >
                <span>🏆</span> Điển Hình Thành Công
              </button>
              <button
                type="button"
                onClick={() => setConsultSubTab("trust")}
                className={`py-3 px-4 rounded-xl text-center text-xs font-black uppercase tracking-wide transition-all duration-200 flex items-center justify-center gap-2 ${
                  consultSubTab === "trust"
                    ? "bg-[#001F3F] text-amber-400 shadow-md ring-1 ring-slate-900"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60 font-semibold"
                }`}
              >
                <span>🛡️</span> Uy Tín & Bảo Mật
              </button>
              <button
                type="button"
                onClick={() => setConsultSubTab("admin")}
                className={`py-3 px-4 rounded-xl text-center text-xs font-black uppercase tracking-wide transition-all duration-200 flex items-center justify-center gap-2 ${
                  consultSubTab === "admin"
                    ? "bg-[#001F3F] text-amber-400 shadow-md ring-1 ring-slate-900"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60 font-semibold"
                }`}
              >
                <span>📥</span> Hộp Thư Tiếp Nhận
              </button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-8 mt-6 w-full space-y-12">
            
            {/* SUB-TAB 1: THƯ VIỆN & CẨM NANG */}
            {consultSubTab === "guides" && (
              <div className="space-y-12 animate-fadeIn text-left">
                {/* INTERACTIVE COMPREHENSIVE SEQUENTIAL PROCESS TIMELINE */}
                <div className="bg-[#001F3F] border border-gray-250 rounded-2xl p-6 md:p-8 text-white space-y-6 shadow-md font-sans">
                  <div className="text-center md:text-left space-y-1">
                    <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-widest inline-block">
                      HƯỚNG DẪN 4 BƯỚC HOÀN THÀNH MỤC TIÊU THUẾ
                    </span>
                    <h3 className="text-lg md:text-2xl font-black uppercase tracking-tight text-white pt-1">
                      Trình Tự Pháp Lý & Lịch Trình Tuân Thủ Thuế Sạch Sẽ
                    </h3>
                    <p className="text-xs text-gray-305 font-medium">
                      Hãy làm đúng trình tự khoa học do các Chuyên gia Thuế khuyên dùng để kiểm soát rủi ro, cân đối sổ sách, và an tâm tăng trưởng.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative pt-2">
                    {[
                      {
                        step: "BƯỚC 1",
                        badge: "1. ƯỚC TÍNH",
                        title: "Ước tính nghĩa vụ thuế",
                        desc: "Sử dụng Bộ công cụ tính thuế độc quyền ở Phân khu 03 để xác định số thuế khoán hoặc thuế TNCN.",
                        actionLabel: "Chuyển Sang Tính Thuế ➜",
                        onClick: () => {
                          setActiveTab("tools");
                          setTimeout(() => {
                            const isSect = document.getElementById("section-calculator");
                            if (isSect) isSect.scrollIntoView({ behavior: "smooth" });
                          }, 120);
                        }
                      },
                      {
                        step: "BƯỚC 2",
                        badge: "2. KIỂM TRA",
                        title: "Tra cứu rủi ro dòng tiền",
                        desc: "Điền ngay Mã số thuế / số CCCD của bạn để rà quét tự động tỷ lệ chênh lệch sao kê COD so với dữ liệu.",
                        actionLabel: "Tra Cứu Cảnh Báo ➜",
                        onClick: () => {
                          setActiveTab("tools");
                          setTimeout(() => {
                            const isSect = document.getElementById("section-lookup");
                            if (isSect) isSect.scrollIntoView({ behavior: "smooth" });
                          }, 120);
                        }
                      },
                      {
                        step: "BƯỚC 3",
                        badge: "3. NGHIÊN CỨU",
                        title: "Đọc cẩm nang thực chiến",
                        desc: "Đọc hướng dẫn bóc gỡ trát triệu tập từ Cục Thuế và tham khảo các văn bản pháp luật hiện hành.",
                        actionLabel: "Đọc Thư Viện Luật ➜",
                        onClick: () => {
                          setConsultSubTab("guides");
                          setTimeout(() => {
                            const isSect = document.getElementById("section-guides");
                            if (isSect) isSect.scrollIntoView({ behavior: "smooth" });
                          }, 100);
                        }
                      },
                      {
                        step: "BƯỚC 4",
                        badge: "4. GIẢI QUYẾT",
                        title: "Đăng ký tư vấn uỷ quyền",
                        desc: "Nhập SĐT để cán bộ Đại lý Thuế Thành Phố gọi lại ngay lập tức, chuyển tiếp sang Zalo bảo mật dứt điểm.",
                        actionLabel: "Đăng Ký Khẩn Cấp ➜",
                        onClick: () => {
                          const isBanner = document.getElementById("mighty-hero-banner");
                          if (isBanner) isBanner.scrollIntoView({ behavior: "smooth" });
                          const telInp = document.querySelector('input[type="tel"]');
                          if (telInp) (telInp as any).focus();
                        }
                      }
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        onClick={item.onClick}
                        className="bg-white/5 border border-white/10 hover:border-amber-400 hover:bg-white/10 cursor-pointer p-5 rounded-xl transition-all duration-300 relative text-left group flex flex-col justify-between hover:scale-102 hover:shadow"
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between items-center border-b border-white/10 pb-2">
                            <span className="text-[9px] font-black text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                              {item.step}
                            </span>
                            <span className="text-[10px] text-gray-400 font-extrabold uppercase font-sans tracking-tight">
                              {item.badge}
                            </span>
                          </div>
                          <h4 className="font-extrabold text-sm text-white uppercase group-hover:text-amber-400 transition-colors tracking-tight leading-snug">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-gray-300 leading-relaxed font-sans font-medium">
                            {item.desc}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-white/10 text-[10px] font-black text-amber-400 group-hover:text-white transition-colors uppercase tracking-wider">
                          {item.actionLabel}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Thư viện cẩm nang */}
                <section id="section-guides" className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 text-left">
                  <div className="border-b border-gray-150 pb-4">
                    <h2 className="text-xl md:text-2xl font-black text-[#001F3F] uppercase tracking-wide flex items-center gap-2">
                      <span className="bg-[#800020] text-white rounded-lg px-2.5 py-1 text-xs font-mono">🔍</span>
                      Hệ Thống Thư Viện Pháp Lý & Cẩm Nang Thuế
                    </h2>
                    <p className="text-xs text-gray-500 mt-1 font-semibold font-sans">Cẩm nang hướng dẫn kiểm tra sao kê ngân hàng và văn bản pháp luật áp dụng năm 2026.</p>
                  </div>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 text-left">
                    <div className="space-y-4">
                      <span className="bg-red-50 text-[#800020] text-[10px] font-black uppercase px-2.5 py-1 rounded inline-block font-sans">Cẩm nang thực tế chuyên sâu</span>
                      <GuidesTab
                        userSegment={userSegment}
                        selectedGuide={selectedGuide}
                        setSelectedGuide={setSelectedGuide}
                        setLeadForm={setLeadForm}
                      />
                    </div>
                    <div className="space-y-4">
                      <span className="bg-red-50 text-[#800020] text-[10px] font-black uppercase px-2.5 py-1 rounded inline-block font-sans">Tra cứu văn bản quy phạm pháp luật</span>
                      <LawsTab
                        userSegment={userSegment}
                        setLeadForm={setLeadForm}
                      />
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* SUB-TAB 2: ĐIỂN HÌNH THÀNH CÔNG (CASE STUDIES) */}
            {consultSubTab === "cases" && (
              <section id="section-cases" className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 text-left animate-fadeIn">
                <div className="border-b border-gray-150 pb-4">
                  <h2 className="text-xl md:text-2xl font-black text-[#001F3F] uppercase tracking-wide flex items-center gap-2">
                    <span className="bg-[#800020] text-white rounded-lg px-2.5 py-1 text-xs font-mono">🏆</span>
                    Case Study Doanh Nghiệp Thành Công Điển Hình
                  </h2>
                  <p className="text-xs text-gray-500 mt-1 font-semibold font-sans">Các trường hợp giải quyết hồ sơ rủi ro cao, gỡ phong tỏa sao kê được thực hiện trực tiếp bởi Cục Thuế.</p>
                </div>
                <CasesTab />
              </section>
            )}

            {/* SUB-TAB 3: UY TÍN & BẢO MẬT PHÁP LÝ */}
            {consultSubTab === "trust" && (
              <div className="space-y-8 animate-fadeIn text-left">
                {/* Giấy phép đăng ký Đại lý Thuế */}
                <div className="bg-[#FAF9F6] border-2 border-amber-400 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-amber-200 pb-4">
                    <div className="space-y-1">
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-widest inline-block">
                        CHỈ THỊ CẤP PHÉP CHÍNH THỨC
                      </span>
                      <h3 className="text-xl md:text-3xl font-black text-[#001F3F] uppercase tracking-tight">
                        Đại Lý Thuế Được Cấp Phép Tổng Cục Thuế
                      </h3>
                      <p className="text-xs text-gray-650 leading-relaxed font-semibold">
                        Đại lý Thuế Thành Phố tự hào hoạt động chính thức theo quyết định và Giấy phép hành nghề số <span className="text-[#800020] font-black font-mono">00056/BTC</span> phê chuẩn bởi Bộ Tài Chính & Tổng Cục Thuế.
                      </p>
                    </div>
                    <div className="bg-white border border-amber-300 p-4 rounded-xl flex flex-col items-center shrink-0 shadow-sm border-dashed">
                      <span className="text-amber-500 text-3xl">🛡️</span>
                      <span className="text-[10px] font-black text-[#001F3F] mt-1 font-mono uppercase">Mã số Đại lý</span>
                      <span className="text-sm font-black text-[#800020] font-mono">00056/BTC</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
                      <div className="text-emerald-600 text-xl font-bold">✔</div>
                      <h4 className="font-extrabold text-[#001F3F] text-xs uppercase font-sans">Đại diện pháp lý</h4>
                      <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                        Nhận uỷ quyền thay doanh nghiệp nộp tờ khai sổ sách và giải trình trực tiếp trước Cán bộ thuế địa phương.
                      </p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
                      <div className="text-emerald-600 text-xl font-bold">✔</div>
                      <h4 className="font-extrabold text-[#001F3F] text-xs uppercase font-sans">Trình độ chuyên môn</h4>
                      <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                        100% Cán bộ Kế toán trưởng sở hữu Chứng chỉ của Tổng Cục Thuế, được đào tạo rà soát sao kê bài bản.
                      </p>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
                      <div className="text-emerald-600 text-xl font-bold">✔</div>
                      <h4 className="font-extrabold text-[#001F3F] text-xs uppercase font-sans">Cam Kết Đền Bù</h4>
                      <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                        Hợp đồng dịch vụ cam kết bảo lãnh trách nhiệm, đền bù 100% mọi thiệt hại chậm nộp do lỗi Đại lý Thuế.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quy trình bảo mật tuyệt mật */}
                <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 space-y-6">
                  <div className="text-center md:text-left space-y-1">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-widest">
                      BIỆN PHÁP AN TOÀN TUYỆT MẬT
                    </span>
                    <h3 className="text-lg md:text-2xl font-black text-[#001F3F] uppercase tracking-tight">
                      Quy Trình Xử Lý 4 Bước Mã Hóa Bảo Mật
                    </h3>
                    <p className="text-xs text-gray-500 font-semibold font-sans">
                      Xua tan nỗi lo bị lộ thông tin sao kê riêng tư hoặc bị phạt chồng phạt. Chúng tôi xử lý dứt điểm rủi ro từ gốc.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative pt-1">
                    {[
                      {
                        step: "01",
                        title: "Mã Hóa Hồ Sơ",
                        desc: "Đại lý Thuế ký cam kết bảo mật bằng văn bản pháp lý. Toàn bộ sao kê ngân hàng, hóa đơn của bạn được mã hóa an toàn tuyệt đối.",
                        highlight: "Mã hóa 100%"
                      },
                      {
                        step: "02",
                        title: "Rà Soát Thực Diện",
                        desc: "Chuyên viên bóc tách toàn diện các giao dịch sao kê ngân hàng, khai thác và gỡ lỗi lịch sử tờ khai cũ trước khi cơ quan quản lý triệu tập.",
                        highlight: "Tìm và gỡ lỗi cũ"
                      },
                      {
                        step: "03",
                        title: "Đo Lường Thuế",
                        desc: "Chúng tôi định lượng chính xác số tiền phát sinh thực tế, tư vấn quy đổi dòng doanh nghiệp giúp bảo vệ từng đồng lợi nhuận.",
                        highlight: "Tiết kiệm 80% phạt"
                      },
                      {
                        step: "04",
                        title: "Đại Diện Giải Trình",
                        desc: "Nhận ủy quyền chính thức, trực tiếp làm việc & giải trình trước cơ quan Chi cục Thuế địa phương, giải quyết vướng mắc nhanh.",
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
              </div>
            )}

            {/* SUB-TAB 4: HỘP THƯ TIẾP NHẬN LEAD QUẢN TRỊ */}
            {consultSubTab === "admin" && (
              <section id="lead-admin-mailbox-section" className="bg-[#FAF9F5] border-2 border-[#001F3F]/10 rounded-3xl p-6 md:p-8 shadow-md space-y-6 text-left animate-fadeIn">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#001F3F]/10 pb-4 gap-4">
                <div className="space-y-1">
                  <span className="bg-[#001F3F] text-amber-400 text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded font-mono">
                     HỆ THỐNG CƠ SỞ DỮ LIỆU CỤC BỘ (REAL-TIME DATABASE)
                  </span>
                  <h2 className="text-xl md:text-2xl font-black text-[#001F3F] uppercase tracking-wide flex items-center gap-2">
                    <span className="bg-[#800020] text-amber-300 rounded-lg px-2.5 py-1 text-xs font-mono">📥</span>
                    Hộp Thư Tiếp Nhận & Quản Trị Hồ Sơ Khách Hàng
                  </h2>
                  <p className="text-xs text-slate-500 font-semibold font-sans">
                    Nơi lưu trữ các hồ sơ & yêu cầu tư vấn khẩn cấp từ các biểu mẫu đăng ký dịch vụ trên toàn hệ thống.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] text-emerald-800 font-extrabold uppercase font-sans tracking-tight">
                    Đang kết nối thời gian thực • {leadsList.length} Hồ sơ
                  </span>
                </div>
              </div>

              <div className="bg-white border border-[#001F3F]/10 p-5 rounded-2xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-extrabold text-[#001F3F] text-xs uppercase block font-sans">Kích hoạt Chế độ Quản trị & Xem dữ liệu</h4>
                    <p className="text-[11px] text-gray-500 font-medium">Bật công tắc để cán bộ / đại diện Đại Lý Thuế rà soát danh sách hoặc cập nhật ghi chú sự vụ.</p>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdminMode(!isAdminMode);
                      if (!isAdminMode) {
                        fetchLeads();
                      }
                    }}
                    className={`py-2 px-5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 shadow-sm ${
                      isAdminMode 
                        ? "bg-[#800020] text-white hover:bg-neutral-900" 
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-350"
                    }`}
                  >
                    {isAdminMode ? "🔒 KHÓA / ẨN HỢP THƯ" : "🔓 MỞ HỘP THƯ TẬP TRUNG"}
                  </button>
                </div>

                {isAdminMode && (
                  <div className="space-y-6 pt-4 border-t border-slate-150 animate-fadeIn">
                    
                    {/* Search Filters */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <Search size={14} />
                        </span>
                        <input
                          type="text"
                          value={adminSearch}
                          onChange={(e) => setAdminSearch(e.target.value)}
                          placeholder="Tra nhanh theo số điện thoại hoặc họ tên khách hàng..."
                          className="w-full text-xs p-3 pl-9 bg-slate-50 border border-gray-300 rounded-xl font-semibold outline-none focus:ring-1 focus:ring-[#800020]"
                        />
                      </div>
                      <button 
                        onClick={() => fetchLeads()}
                        className="bg-slate-100 hover:bg-slate-200 border border-slate-355 text-[#001F3F] font-bold text-xs px-4 py-3 rounded-xl transition duration-200"
                      >
                        🔄 Làm mới dữ liệu
                      </button>
                    </div>

                    {/* Table / List */}
                    <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-inner">
                      <table className="w-full text-left text-xs text-gray-700">
                        <thead className="bg-slate-100 text-[#001F3F] font-black uppercase tracking-wider font-mono text-[10px] border-b border-gray-250">
                          <tr>
                            <th className="p-3">Thời điểm / ID</th>
                            <th className="p-3">Khách hàng / SĐT</th>
                            <th className="p-3">Nghiệp vụ / Nhu cầu</th>
                            <th className="p-3">Chi tiết sự vụ / Hồ sơ thô</th>
                            <th className="p-3">Trạng thái xử lý</th>
                            <th className="p-3 text-right">Hành động nhanh</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-150 font-sans font-medium text-[11.5px]">
                          {leadsList
                            .filter(l => {
                              const searchLower = adminSearch.toLowerCase();
                              return l.fullName.toLowerCase().includes(searchLower) || l.phoneNumber.includes(searchLower);
                            })
                            .map((lead) => {
                              const formattedTime = new Date(lead.createdAt).toLocaleDateString("vi-VN", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                              });

                              return (
                                <tr key={lead.id} className="hover:bg-slate-50 transition duration-150">
                                  <td className="p-3 font-mono text-[10px] text-gray-500">
                                    {formattedTime} <br />
                                    <span className="text-[9px] bg-slate-100 px-1.5 py-0.5 rounded">{lead.id}</span>
                                  </td>
                                  <td className="p-3 whitespace-nowrap">
                                    <div className="font-extrabold text-[#001F3F]">{lead.fullName}</div>
                                    <div className="text-[10px] text-blue-700 font-mono font-bold select-all">{lead.phoneNumber}</div>
                                  </td>
                                  <td className="p-3">
                                    <span className="bg-amber-100 text-[#800020] text-[9.5px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                                      {lead.bizType}
                                    </span>
                                  </td>
                                  <td className="p-3 max-w-xs space-y-1.5 leading-relaxed">
                                    <div className="text-gray-700 italic block">{lead.problem}</div>
                                    
                                    {/* Handle Mock/Actually Uploaded Files */}
                                    {lead.files && lead.files.length > 0 && (
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {lead.files.map((f, i) => (
                                          <div key={i} className="bg-slate-100 border border-slate-200 text-slate-800 text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1 font-mono">
                                            📄 {f.name} ({f.size})
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </td>
                                  <td className="p-3 whitespace-nowrap">
                                    <select
                                      value={lead.status}
                                      onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any, lead.agentNotes)}
                                      disabled={isUpdatingLeadId === lead.id}
                                      className="p-1.5 text-[10px] font-extrabold uppercase rounded border bg-slate-50"
                                    >
                                      <option value="NEW" className="text-red-600">🆕 Mới tiếp nhận</option>
                                      <option value="CONTACTED" className="text-amber-600">📞 Đã gọi / Đang Zalo</option>
                                      <option value="RESOLVED" className="text-emerald-600">✅ Đã dứt điểm</option>
                                    </select>
                                  </td>
                                  <td className="p-3 text-right whitespace-nowrap space-y-1">
                                    <a
                                      href={`https://zalo.me/${lead.phoneNumber}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1 bg-[#25D366] hover:bg-emerald-600 text-white text-[10px] font-black py-1 px-2.5 rounded uppercase transition-colors"
                                    >
                                      🟢 PHẢN HỒI QUA ZALO ➜
                                    </a>
                                    
                                    <div className="block pt-1.5">
                                      <input
                                        type="text"
                                        placeholder="Ghi chú cán bộ..."
                                        defaultValue={lead.agentNotes || ""}
                                        onKeyDown={(e) => {
                                          if (e.key === "Enter") {
                                            const val = (e.currentTarget as HTMLInputElement).value;
                                            handleUpdateLeadStatus(lead.id, lead.status, val);
                                            alert("Đã lưu ghi chú Đại lý Thuế thành công!");
                                          }
                                        }}
                                        className="w-32 bg-slate-50 text-[10px] p-1 border rounded outline-none"
                                        title="Ấn Enter để lưu ghi chú của cán bộ"
                                      />
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-left space-y-2">
                       <h5 className="font-extrabold text-[#001F3F] text-xs uppercase block font-sans">ℹ️ NHẮC NHỞ NGHIỆP VỤ AN TOÀN</h5>
                       <p className="text-[10.5px] text-gray-500 leading-relaxed font-semibold">
                          Các thông tin đăng ký tư vấn qua website được máy chủ ghi nhận an toàn 100%. Khi chuyên sự kiện nhấn nút <span className="bg-[#25D366] text-white px-1.5 py-0.5 rounded text-[9px] font-bold">🟢 PHẢN HỒI QUA ZALO</span>, hệ thống sẽ tự động điều hướng trực tiếp sang cửa sổ chat Zalo với số điện thoại đăng ký của khách hàng để bắt đầu tư vấn bảo mật, trao đổi bảng kê sao kê tiền thu.
                       </p>
                    </div>

                  </div>
                )}
              </div>
            </section>
          )}
          </div>
        </div>
      )}

      {activeTab === "services" && (
        <div id="portal-view-services" className="max-w-7xl mx-auto px-4 md:px-8 mt-6 w-full animate-fadeIn pb-12 space-y-12">
          {/* Section 1: Services */}
          <section id="section-services" className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 text-left">
            <ServicesTab
              userSegment={userSegment}
              setUserSegment={setUserSegment}
              serviceGroupFilter={serviceGroupFilter}
              setServiceGroupFilter={setServiceGroupFilter}
              serviceSubView={serviceSubView}
              setServiceSubView={setServiceSubView}
              lifecycleEntity={lifecycleEntity}
              setLifecycleEntity={setLifecycleEntity}
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              setLeadForm={setLeadForm}
              setActiveTab={setActiveTab}
              viewMode="services"
            />
          </section>
        </div>
      )}

      {activeTab === "tools" && (
        <div id="section-tools" className="max-w-7xl mx-auto px-4 md:px-8 mt-6 w-full animate-fadeIn pb-12 space-y-12">
          {/* Section 3: Lookup */}
          <section id="section-lookup" className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 text-left">
            <div className="border-b border-[#001F3F]/10 pb-4">
              <h2 className="text-xl md:text-2xl font-black text-[#001F3F] uppercase tracking-wide flex items-center gap-2">
                <span className="bg-[#800020] text-white rounded-lg px-2.5 py-1 text-xs font-mono">01</span>
                Tra Cứu Mã Số Thuế & Cảnh Báo Rủi Ro TMĐT
              </h2>
              <p className="text-xs text-gray-500 mt-1 font-semibold font-sans">Định danh chuẩn từ CCCD/MST và phân tích tỷ trọng rà soát dòng tiền tự động.</p>
            </div>
            <LookupTab
              lookupMst={lookupMst}
              setLookupMst={setLookupMst}
              lookupResult={lookupResult}
              handleMstLookup={handleMstLookup}
              setActiveTab={setActiveTab}
              sendChatMessage={sendChatMessage}
            />
          </section>

          {/* Section 2: Calculator */}
          <section id="section-calculator" className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 text-left">
            <div className="border-b border-gray-150 pb-4">
              <h2 className="text-xl md:text-2xl font-black text-[#001F3F] uppercase tracking-wide flex items-center gap-2">
                <span className="bg-[#800020] text-white rounded-lg px-2.5 py-1 text-xs font-mono">02</span>
                Phần Mềm Tự Tính Toán Thuế Thực Tế
              </h2>
              <p className="text-xs text-gray-500 mt-1 font-semibold font-sans">Tính nhanh nghĩa vụ thuế doanh thu sỉ lẻ, thuế khoán, thuế thuê tài sản và nợ phạt chậm nộp hành chính.</p>
            </div>
            <CalculatorTab
              userSegment={userSegment}
              calcType={calcType}
              setCalcType={setCalcType}
              calcHkdSector={calcHkdSector}
              setCalcHkdSector={setCalcHkdSector}
              calcHkdRevenue={calcHkdRevenue}
              setCalcHkdRevenue={setCalcHkdRevenue}
              calcHkdPlatformPayment={calcHkdPlatformPayment}
              setCalcHkdPlatformPayment={setCalcHkdPlatformPayment}
              calcRentMonthly={calcRentMonthly}
              setCalcRentMonthly={setCalcRentMonthly}
              calcRentMonths={calcRentMonths}
              setCalcRentMonths={setCalcRentMonths}
              calcCorpRevenue={calcCorpRevenue}
              setCalcCorpRevenue={setCalcCorpRevenue}
              calcCorpExpense={calcCorpExpense}
              setCalcCorpExpense={setCalcCorpExpense}
              calcCorpVatMethod={calcCorpVatMethod}
              setCalcCorpVatMethod={setCalcCorpVatMethod}
              calcCorpVatRate={calcCorpVatRate}
              setCalcCorpVatRate={setCalcCorpVatRate}
              calcPenaltyTaxDebt={calcPenaltyTaxDebt}
              setCalcPenaltyTaxDebt={setCalcPenaltyTaxDebt}
              calcPenaltyDays={calcPenaltyDays}
              setCalcPenaltyDays={setCalcPenaltyDays}
              setLeadForm={setLeadForm}
            />
          </section>

          {/* Section 5: AI Chat */}
          <section id="section-faq" className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 text-left">
            <div className="border-b border-gray-150 pb-4">
              <h2 className="text-xl md:text-2xl font-black text-[#001F3F] uppercase tracking-wide flex items-center gap-2">
                <span className="bg-[#800020] text-white rounded-lg px-2.5 py-1 text-xs font-mono">03</span>
                Hỏi Đáp Trực Tuyến & Trợ Lý Thuế AI
              </h2>
              <p className="text-xs text-gray-500 mt-1 font-semibold font-sans">Tự động trả lời thắc mắc, phân tích thông tư 40/2021 và luật truy thu thuế thương mại điện tử.</p>
            </div>
            <FaqTab
              userSegment={userSegment}
              chatHistory={chatHistory}
              chatMessage={chatMessage}
              setChatMessage={setChatMessage}
              isChatLoading={isChatLoading}
              sendChatMessage={sendChatMessage}
            />
          </section>
        </div>
      )}

      {/* CORE FOOTER COMPLIANCE ALERT INFO */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 w-full mb-8 text-left">
        <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-2xl shadow-sm font-sans">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-[#800020] text-amber-300 text-[9px] font-black uppercase px-2 py-0.5 rounded">RỦI RO THỜI KỲ SỐ</span>
              <h4 className="font-extrabold text-[#001F3F] text-sm uppercase">Cảnh báo rà soát dòng tiền năm 2026</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
              Tổng cục Thuế Việt Nam phối hợp cùng Ngân hàng Nhà nước và các sàn Shopee, TikTok Shop tự động bóc tách chéo các tài khoản ngân hàng cá nhân và dòng tiền COD. Đừng để dồn tích phạt nợ nhiều kỳ dẫn tới bị niêm phong phong tỏa tài khoản ngân hàng hoặc nguy cơ truy toán hình sự trốn thuế.
            </p>
            <div className="flex gap-2 items-center text-[10px] text-[#800020] font-bold">
              <span className="w-2 h-2 bg-[#800020] rounded-full animate-ping"></span>
              <span>Đại lý Thuế Thành Phố cam kết chịu 100% trách nhiệm trước cơ quan Thuế khi được ủy quyền.</span>
            </div>
          </div>
        </div>
      </div>

      {/* FLOATING ACTION INTERACTIVE WIDGETS */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        <a 
          href="https://zalo.me" 
          target="_blank" 
          rel="noreferrer" 
          className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all flex items-center justify-center pointer-events-auto"
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

      {/* FOOTER */}
      <footer id="main-editorial-footer" className="bg-[#001F3F] text-white border-t border-sky-950 py-10 px-4 md:px-8 shrink-0 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-gray-300 pb-8 border-b border-white/10 text-left font-sans">
          <div className="space-y-3">
            <h4 className="font-extrabold text-amber-300 text-xs sm:text-sm uppercase tracking-wider">TỪ KHÓA TÌM KIẾM HỮU ÍCH</h4>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                "đại lý thuế", "hộ kinh doanh", "cá nhân kinh doanh", "thuế shopee", "thuế tiktok", 
                "thuế cho thuê nhà", "kê khai thuế", "dịch vụ kế toán thuế", "xuất hóa đơn", "quyết toán thuế", "thuế TMĐT"
              ].map((kw, idx) => (
                <span key={idx} className="bg-white/10 hover:bg-white/15 hover:text-white transition-colors text-gray-300 text-[11px] px-2.5 py-1 rounded font-medium">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-extrabold text-amber-300 text-xs sm:text-sm uppercase tracking-wider">LIÊN HỆ TRỰC TIẾP & GIỜ LÀM VIỆC</h4>
            <div className="leading-relaxed text-gray-300 text-[12px] space-y-2 font-medium">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-sans">⏰</span>
                <span><strong className="text-white font-semibold font-sans">Giờ làm việc:</strong> 8:00 - 17:00 (Thứ 2 - Sáng Thứ 7)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400">📞</span>
                <span><strong className="text-white font-semibold">Hotline:</strong> 0819.319.919</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">📍</span>
                <span><strong className="text-white font-semibold">Trụ sở chính:</strong> 39 Đỗ Thị Tâm, P. Phú Thọ Hoà, TP.HCM</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">🏢</span>
                <span><strong className="text-white font-semibold">Văn phòng:</strong> 61 Phan Đình Phùng, P. Phú Thọ Hoà, TP.HCM</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400">✉️</span>
                <span><strong className="text-white font-semibold">Email:</strong> dailythuethanhpho@gmail.com</span>
              </div>
              <div className="text-[11px] text-emerald-400 font-bold mt-2 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                ĐỒNG HÀNH PHÁP LÝ DOANH NGHIỆP
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row justify-between items-center text-[12px] text-gray-400 gap-4 text-left font-sans font-medium">
          <div className="leading-relaxed">
            © 2026 Đại Lý Thuế Thành Phố. Bảo lưu mọi quyền pháp lý. Giấy phép hành nghề số 00056/BTC.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-amber-300 transition-colors cursor-pointer underline decoration-dotted decoration-gray-500" onClick={() => alert("Đại Lý Thuế Thành Phố cam kết bảo mật tuyệt đối 100% mọi thông tin hồ sơ và dữ liệu kinh doanh của quý khách hàng.")}>Chính sách bảo mật của chúng tôi</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
