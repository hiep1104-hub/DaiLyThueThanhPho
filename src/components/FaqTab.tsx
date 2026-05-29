import React from "react";
import { Sparkles, Send } from "lucide-react";
import { QUICK_ANSWER_FAQS } from "../lib/data";

interface ChatHistoryItem {
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

interface FaqTabProps {
  userSegment: "hkd" | "dn";
  chatHistory: ChatHistoryItem[];
  chatMessage: string;
  setChatMessage: (msg: string) => void;
  isChatLoading: boolean;
  sendChatMessage: (presetText?: string) => void;
}

export default function FaqTab({
  userSegment,
  chatHistory,
  chatMessage,
  setChatMessage,
  isChatLoading,
  sendChatMessage,
}: FaqTabProps) {
  return (
    <div id="view-tab-faq" className="space-y-6">
      <div className="border-b border-gray-200 pb-2 text-left">
        <h2 className="text-2xl font-black text-[#001F3F] uppercase tracking-wide animate-fadeIn">
          Hỏi Đáp Nhanh & Trợ Lý AI Thuế
        </h2>
        <p className="text-xs text-gray-500 font-medium">Nhập trực tiếp tình huống của bạn để hệ thống rà quét tự động hoặc bấm chọn câu hỏi mẫu hay gặp bên dưới.</p>
      </div>

      {/* Instant pre-categorized questions selector */}
      <div className="space-y-2 text-left">
        <span className="text-[11px] font-extrabold text-[#800020] uppercase tracking-widest block font-mono">
          CÂU HỎI NHANH CHỦ ĐỀ SỐNG CÒN
        </span>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => sendChatMessage("Bán hàng Shopee doanh thu 500 triệu một năm phải nộp tổng cộng bao nhiêu thuế?")}
            className="bg-[#001F3F]/5 border border-[#001F3F]/20 text-[#001F3F] text-xs px-3 py-2 rounded hover:bg-[#800020] hover:text-white transition-all text-left font-bold cursor-pointer active:scale-95"
          >
            Bán hàng Shopee/TikTok nộp bao nhiêu %?
          </button>
          <button 
            onClick={() => sendChatMessage("Tôi cho thuê căn hộ Landmark 50 triệu/tháng thì thủ tục mua hóa đơn lẻ của cục thuế như thế nào?")}
            className="bg-[#001F3F]/5 border border-[#001F3F]/20 text-[#001F3F] text-xs px-3 py-2 rounded hover:bg-[#800020] hover:text-white transition-all text-left font-bold cursor-pointer active:scale-95"
          >
            Hóa đơn lẻ cho thuê căn hộ?
          </button>
          <button 
            onClick={() => sendChatMessage("Tôi nhận tiền quảng cáo Google Adsense nước ngoài đổ trực tiếp vào bank có bị truy thu không?")}
            className="bg-[#001F3F]/5 border border-[#001F3F]/20 text-[#001F3F] text-xs px-3 py-2 rounded hover:bg-[#800020] hover:text-white transition-all text-left font-bold cursor-pointer active:scale-95"
          >
            Ngoại tệ Google Adsense/Youtube bị phạt thế nào?
          </button>
          <button 
            onClick={() => sendChatMessage("Hộ kinh doanh mới mở có nợ môn bài không?")}
            className="bg-[#001F3F]/5 border border-[#001F3F]/20 text-[#001F3F] text-xs px-3 py-2 rounded hover:bg-[#800020] hover:text-white transition-all text-left font-bold cursor-pointer active:scale-95"
          >
            Môn bài của Hộ kinh doanh?
          </button>
        </div>
      </div>

      {/* Main chat window workspace */}
      <div className="border border-gray-300 rounded-lg flex flex-col h-[500px] bg-slate-100 overflow-hidden text-left shadow-sm">
        
        {/* Chat window top header */}
        <div className="bg-[#001F3F] p-3 text-white flex justify-between items-center text-xs scroll-pt-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shrink-0"></span>
            <strong className="tracking-wide">Hệ thống Trợ lý Thuế AI 24/7</strong>
          </div>
          <span className="text-[10px] text-gray-300 font-mono">Model: Gemini 3.5 Active</span>
        </div>

        {/* Chat content scrollable area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {chatHistory.map((h, i) => (
            <div key={i} className={`flex ${h.sender === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}>
              <div className={`p-3.5 rounded-lg max-w-[85%] text-xs shadow-xs ${
                h.sender === "user" 
                  ? "bg-[#800020] text-white rounded-br-none" 
                  : "bg-white text-gray-800 border border-gray-250 rounded-bl-none prose leading-relaxed font-sans font-medium"
              }`}>
                <div className="font-sans leading-relaxed whitespace-pre-wrap">{h.text}</div>
                <span className={`block text-[9px] mt-1.5 text-right font-mono ${h.sender === "user" ? "text-red-250" : "text-gray-400"}`}>
                  {h.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isChatLoading && (
            <div className="flex justify-start animate-pulse">
              <div className="bg-white border border-gray-250 p-4 rounded-lg flex items-center gap-3 text-xs text-gray-500 font-medium">
                <Sparkles size={16} className="text-[#800020] animate-spin" />
                <span>Trợ lý AI đang kết nối dữ liệu Tổng cục và soạn câu trả lời gỡ số nợ...</span>
              </div>
            </div>
          )}
        </div>

        {/* Chat inputs border-t */}
        <div className="bg-white p-3 border-t border-gray-350 flex gap-2">
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") sendChatMessage(); }}
            placeholder="Hỏi bất kỳ điều gì (VD: Bán hàng qua sàn TMĐT đã bị triệu tập thuế làm thế nào?)..."
            className="flex-1 text-xs border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-1 focus:ring-[#800020] focus:border-[#800020] font-sans font-semibold text-[#001F3F]"
          />
          <button
            onClick={() => sendChatMessage()}
            className="bg-[#800020] hover:bg-[#001F3F] text-white px-5 rounded-lg flex items-center justify-center transition-colors shadow-xs cursor-pointer active:scale-95"
          >
            <Send size={15} />
          </button>
        </div>
      </div>

      {/* Traditional quick search lists below */}
      <div className="space-y-4 pt-2 text-left">
        <span className="text-xs font-black text-[#001F3F] uppercase tracking-wider block font-sans">
          Hỏi đáp lưu trữ phổ biến:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {QUICK_ANSWER_FAQS.filter(q => {
            const isInCategory = userSegment === "hkd"
              ? ["TMDT", "CTTS"].includes(q.category)
              : ["DN", "XL"].includes(q.category);
            return isInCategory;
          }).map((q) => (
            <div key={q.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs space-y-2">
              <h4 className="font-extrabold text-xs text-[#001F3F] leading-snug">❓ {q.question}</h4>
              <p className="text-xs text-slate-650 bg-slate-50 border border-gray-150 p-3.5 rounded italic leading-relaxed font-sans font-medium">
                {q.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
