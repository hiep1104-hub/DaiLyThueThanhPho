import React from "react";

interface CompanyLogoProps {
  variant?: "brand" | "white-hero" | "simple-icon" | "footer";
  className?: string;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({
  variant = "brand",
  className = "",
}) => {
  // SVG Graphic: Circle containing a bar chart with an upward trend arrow and two hands shaking (handshake)
  const renderSvgIcon = (circleColor: string, iconColor: string, arrowColor: string, handshakeColor: string) => (
    <svg
      viewBox="0 0 200 200"
      className="w-20 h-20 md:w-24 md:h-24 shrink-0 drop-shadow-md select-none pointer-events-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Circle Ring */}
      <circle cx="100" cy="100" r="92" stroke={circleColor} strokeWidth="6" />
      <circle cx="100" cy="100" r="84" fill="transparent" />

      {/* Bar Chart Columns */}
      {/* Bar 1 (Left) */}
      <rect x="73" y="55" width="12" height="45" rx="2" fill={iconColor} />
      {/* Bar 2 (Middle) */}
      <rect x="91" y="42" width="12" height="58" rx="2" fill={iconColor} />
      {/* Bar 3 (Right) */}
      <rect x="109" y="30" width="12" height="70" rx="2" fill={iconColor} />

      {/* Upward Trend Arrow Line */}
      <path
        d="M 62 105 L 85 82 L 105 101 L 138 52"
        stroke={arrowColor}
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Arrow Head */}
      <path
        d="M 125 50 L 140 50 L 140 65"
        stroke={arrowColor}
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Handshake Graphic Symbol */}
      {/* Left Sleeve (curved arm) */}
      <path
        d="M 40 120 C 45 105, 55 105, 68 116"
        stroke={handshakeColor}
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Left Hand / Thumb */}
      <path
        d="M 68 116 L 85 116"
        stroke={handshakeColor}
        strokeWidth="6"
        strokeLinecap="round"
      />
      
      {/* Right Sleeve (curved arm) */}
      <path
        d="M 160 120 C 155 105, 145 105, 132 116"
        stroke={handshakeColor}
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Right Hand / Thumb */}
      <path
        d="M 132 116 L 115 116"
        stroke={handshakeColor}
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Linked Shaking Hands body */}
      <path
        d="M 85 116 Q 100 106 115 116"
        stroke={handshakeColor}
        strokeWidth="8"
        strokeLinecap="round"
      />
      {/* Four Fingers interlocking */}
      <path d="M 86 123 Q 100 113 114 123" stroke={handshakeColor} strokeWidth="5.5" strokeLinecap="round" />
      <path d="M 89 129 Q 100 119 111 129" stroke={handshakeColor} strokeWidth="5" strokeLinecap="round" />
      <path d="M 92 135 Q 100 125 108 135" stroke={handshakeColor} strokeWidth="4.5" strokeLinecap="round" />
      <path d="M 95 141 Q 100 131 105 141" stroke={handshakeColor} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );

  if (variant === "simple-icon") {
    return (
      <div className={`inline-block ${className}`}>
        {renderSvgIcon("#023e8a", "#023e8a", "#023e8a", "#023e8a")}
      </div>
    );
  }

  if (variant === "white-hero") {
    return (
      <div className={`flex flex-col items-center gap-3 animate-fadeIn text-center ${className}`}>
        {/* Dynamic Glowing Outer Edge representation */}
        <div className="relative p-1 bg-white/10 rounded-full border border-white/20 shadow-xl shadow-black/30">
          <div className="absolute inset-0 bg-blue-400/20 blur-md rounded-full animate-pulse pointer-events-none"></div>
          {renderSvgIcon("#FFFFFF", "#FFFFFF", "#38bdf8", "#38bdf8")}
        </div>
        
        <div className="space-y-0.5 text-center">
          <h4 className="text-[11px] font-bold text-gray-300 tracking-[0.15em] uppercase font-sans">
            CÔNG TY TNHH ĐẠI LÝ THUẾ
          </h4>
          <h3 className="text-xl md:text-2xl font-black text-amber-300 tracking-wider uppercase font-sans">
            THÀNH PHỐ
          </h3>
          <p className="text-[9.5px] font-extrabold text-[#38bdf8] tracking-[0.2em] uppercase font-sans">
            ĐỒNG HÀNH PHÁP LÝ DOANH NGHIỆP
          </p>
        </div>
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className={`flex items-center gap-4 text-left border-t border-neutral-200/40 pt-6 mt-6 ${className}`}>
        <div className="p-1.5 bg-neutral-100 rounded-full border border-neutral-300/60 shadow-inner">
          {renderSvgIcon("#001F3F", "#001F3F", "#800020", "#001F3F")}
        </div>
        <div className="space-y-0.5">
          <h4 className="text-[10px] font-extrabold text-gray-400 tracking-widest uppercase">
            CÔNG TY TNHH ĐẠI LÝ THUẾ
          </h4>
          <h3 className="text-sm font-black text-[#001F3F] uppercase tracking-wide">
            THÀNH PHỐ
          </h3>
          <p className="text-[9px] font-black text-[#800020] uppercase tracking-wider">
            ĐỒNG HÀNH PHÁP LÝ DOANH NGHIỆP
          </p>
        </div>
      </div>
    );
  }

  // "brand" standard colored version for the main landing panels
  return (
    <div className={`flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left bg-blue-50/40 border border-blue-100 p-4 rounded-2xl ${className}`}>
      <div className="p-1 bg-white rounded-full shadow-md border border-blue-200/60">
        {renderSvgIcon("#001F3F", "#001F3F", "#800020", "#001F3F")}
      </div>
      <div className="space-y-0.5">
        <h4 className="text-[11px] font-extrabold text-slate-500 tracking-[0.1em] uppercase">
          CÔNG TY TNHH ĐẠI LÝ THUẾ
        </h4>
        <h3 className="text-lg md:text-xl font-black text-[#001F3F] tracking-wide uppercase">
          THÀNH PHỐ
        </h3>
        <p className="text-[10px] font-black text-[#800020] tracking-widest uppercase">
          ĐỒNG HÀNH PHÁP LÝ DOANH NGHIỆP
        </p>
      </div>
    </div>
  );
};
