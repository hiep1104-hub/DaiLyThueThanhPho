/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceDetail {
  id: string;
  title: string;
  group: "HKD" | "CNKD" | "CTTS" | "DN" | "XL"; // HKD: Hộ kinh doanh, CNKD: Cá nhân kinh doanh, CTTS: Cho thuê tài sản, DN: Doanh nghiệp, XL: Dịch vụ xử lý
  shortDesc: string;
  targetUser: string;
  documentsNeeded: string[];
  processSteps: string[];
  duration: string;
  faq: { q: string; a: string }[];
}

export interface LegalDoc {
  id: string;
  category: "ThongTu" | "NghiDinh" | "CongVan" | "Luat";
  number: string;
  title: string;
  year: number;
  field: string;
  summary: string;
  contentBullets: string[];
  downloadUrl: string;
}

export interface PracticalGuide {
  id: string;
  category: "HKD" | "CNKD" | "TMDT" | "CTTS" | "HDDT" | "QTT" | "VIPHAT" | "HUONGDAN" | "DN";
  title: string;
  summary: string;
  checklist: string[];
  warning: string;
  steps: string[];
  content: string;
  example: string;
  videoMockName?: string;
}

export interface LeadSubmission {
  id: string;
  fullName: string;
  phoneNumber: string;
  bizType: string;
  problem: string;
  files: { name: string; size: string; type: string }[];
  status: "NEW" | "CONTACTED" | "RESOLVED";
  createdAt: string;
  agentNotes?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  clientType: string;
  problem: string;
  risk: string;
  solution: string;
  result: string;
  savedAmount?: string;
}

export interface TicketMessage {
  sender: "user" | "agent" | "bot";
  text: string;
  timestamp: string;
}

export interface QuickAnswerFAQ {
  id: string;
  question: string;
  category: "HKD" | "CNKD" | "TMDT" | "CTTS" | "DN" | "XL";
  answer: string;
  relatedGuides: string[]; // practical guide IDs
}
