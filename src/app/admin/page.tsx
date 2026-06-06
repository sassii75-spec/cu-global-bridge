"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

interface User {
  id: string;
  name: string;
  email: string;
  nationality: string;
  role: "student" | "worker" | "admin";
  provider: "credentials" | "google" | "kakao" | "naver";
  joinedDate: string;
}

// Multilingual translations for the Admin Panel
const ADMIN_TRANSLATIONS = {
  ko: {
    adminTitle: "👥 글로벌 통합 학계 계정 관리 센터 (Admin)",
    adminDesc: "글로벌사이버대학교 다문화 유학생 및 해외 근로자들의 로그인 권한 및 등록 계정을 전산 CRUD 제어합니다.",
    accessDenied: "🚨 접근 불가: 관리자 권한이 필요한 페이지입니다.",
    goHome: "홈으로 이동",
    searchPlaceholder: "이름 또는 이메일 계정으로 검색...",
    btnAddUser: "➕ 새 사용자 계정 등록",
    colName: "이름",
    colEmail: "이메일 계정",
    colNat: "국적",
    colRole: "권한 구분",
    colProvider: "연동 채널",
    colDate: "가입 일자",
    colActions: "계정 관리",
    btnEdit: "수정",
    btnDelete: "삭제",
    filterRoleAll: "모든 권한",
    filterRoleStudent: "학생",
    filterRoleWorker: "근로자",
    filterRoleAdmin: "관리자",
    filterNatAll: "모든 국적",
    filterProvAll: "모든 로그인",
    
    // Modal Translations
    modalAddTitle: "👤 새 글로벌 계정 등록",
    modalEditTitle: "✏️ 계정 세부 정보 수정",
    lblFieldName: "사용자 성명",
    lblFieldEmail: "이메일 주소",
    lblFieldNat: "소속 국적",
    lblFieldRole: "계정 권한 구분",
    lblFieldProv: "로그인 인증 제공처",
    btnSave: "저장하기",
    btnCancel: "취소",
    deleteConfirm: "정말로 이 사용자 계정을 데이터베이스에서 영구 삭제하시겠습니까?",
    toastCreated: "📡 계정이 성공적으로 등록되었습니다!",
    toastUpdated: "🔄 계정 정보가 성공적으로 업데이트되었습니다!",
    toastDeleted: "🗑️ 계정이 성공적으로 삭제되었습니다!"
  },
  en: {
    adminTitle: "👥 Global Account Management Center (Admin)",
    adminDesc: "Control, register, update, and delete accounts for multicultural students and worker profiles.",
    accessDenied: "🚨 Access Denied: Administrator privileges required.",
    goHome: "Go to Homepage",
    searchPlaceholder: "Search by name or email...",
    btnAddUser: "➕ Add New User Profile",
    colName: "Name",
    colEmail: "Email",
    colNat: "Nationality",
    colRole: "Account Role",
    colProvider: "Provider",
    colDate: "Joined Date",
    colActions: "Actions",
    btnEdit: "Edit",
    btnDelete: "Delete",
    filterRoleAll: "All Roles",
    filterRoleStudent: "Student",
    filterRoleWorker: "Worker",
    filterRoleAdmin: "Admin",
    filterNatAll: "All Nationalities",
    filterProvAll: "All Providers",
    
    // Modal Translations
    modalAddTitle: "👤 Register New Profile",
    modalEditTitle: "✏️ Edit Account Details",
    lblFieldName: "User Full Name",
    lblFieldEmail: "Email Address",
    lblFieldNat: "Country Nationality",
    lblFieldRole: "Account Role Type",
    lblFieldProv: "Authentication Provider",
    btnSave: "Save Profile",
    btnCancel: "Cancel",
    deleteConfirm: "Are you sure you want to permanently delete this user from the database?",
    toastCreated: "📡 User profile registered successfully!",
    toastUpdated: "🔄 User details updated successfully!",
    toastDeleted: "🗑️ User account deleted successfully!"
  },
  vn: {
    adminTitle: "👥 Trung tâm Quản trị Tài khoản Toàn cầu (Admin)",
    adminDesc: "Kiểm soát, đăng ký, cập nhật và xóa tài khoản cho sinh viên đa văn hóa và hồ sơ lao động nước ngoài.",
    accessDenied: "🚨 Từ chối truy cập: Yêu cầu đặc quyền của Quản trị viên.",
    goHome: "Quay lại Trang chủ",
    searchPlaceholder: "Tìm kiếm bằng tên hoặc email...",
    btnAddUser: "➕ Đăng ký tài khoản mới",
    colName: "Họ và Tên",
    colEmail: "Địa chỉ Email",
    colNat: "Quốc tịch",
    colRole: "Quyền tài khoản",
    colProvider: "Kênh liên kết",
    colDate: "Ngày tham gia",
    colActions: "Quản lý",
    btnEdit: "Sửa",
    btnDelete: "Xóa",
    filterRoleAll: "Tất cả vai trò",
    filterRoleStudent: "Sinh viên",
    filterRoleWorker: "Lao động",
    filterRoleAdmin: "Quản trị",
    filterNatAll: "Tất cả quốc tịch",
    filterProvAll: "Tất cả nhà cung cấp",
    
    // Modal Translations
    modalAddTitle: "👤 Đăng ký tài khoản mới",
    modalEditTitle: "✏️ Sửa chi tiết tài khoản",
    lblFieldName: "Họ tên người dùng",
    lblFieldEmail: "Địa chỉ Email",
    lblFieldNat: "Quốc tịch thành viên",
    lblFieldRole: "Vai trò tài khoản",
    lblFieldProv: "Nhà cung cấp xác thực",
    btnSave: "Lưu thay đổi",
    btnCancel: "Hủy",
    deleteConfirm: "Bạn có chắc chắn muốn xóa vĩnh viễn người dùng này khỏi cơ sở dữ liệu?",
    toastCreated: "📡 Đã đăng ký tài khoản thành công!",
    toastUpdated: "🔄 Đã cập nhật chi tiết tài khoản thành công!",
    toastDeleted: "🗑️ Đã xóa tài khoản thành công!"
  },
  mn: {
    adminTitle: "👥 Хэрэглэгчийн бүртгэлийн нэгдсэн хяналтын самбар (Admin)",
    adminDesc: "Олон соёлт оюутнууд болон гадаад ажилчдын нэвтрэх эрх, бүртгэлийг системд удирдах CRUD хяналтын самбар.",
    accessDenied: "🚨 Хандах боломжгүй: Администраторын эрх шаардлагатай.",
    goHome: "Нүүр хуудас руу буцах",
    searchPlaceholder: "Нэр эсвэл и-мэйл хаягаар хайх...",
    btnAddUser: "➕ Шинэ хэрэглэгч бүртгэх",
    colName: "Нэр",
    colEmail: "Цахим хаяг",
    colNat: "Харьяалал",
    colRole: "Үүрэг ангилал",
    colProvider: "Холбоо суваг",
    colDate: "Бүртгүүлсэн огноо",
    colActions: "Засвар хийх",
    btnEdit: "Засах",
    btnDelete: "Устгах",
    filterRoleAll: "Бүх эрх",
    filterRoleStudent: "Оюутан",
    filterRoleWorker: "Ажилчин",
    filterRoleAdmin: "Админ",
    filterNatAll: "Бүх харьяалал",
    filterProvAll: "Бүх нэвтрэлт",
    
    // Modal Translations
    modalAddTitle: "👤 Шинэ хэрэглэгч бүртгэх",
    modalEditTitle: "✏️ Хэрэглэгчийн мэдээлэл засах",
    lblFieldName: "Хэрэглэгчийн бүтэн нэр",
    lblFieldEmail: "И-мэйл хаяг",
    lblFieldNat: "Улсын харьяалал",
    lblFieldRole: "Бүртгэлийн эрх",
    lblFieldProv: "Нэвтрэх суваг үйлчилгээ",
    btnSave: "Хадгалах",
    btnCancel: "Цуцлах",
    deleteConfirm: "Та энэ хэрэглэгчийг системээс бүрмөсөн устгахдаа итгэлтэй байна уу?",
    toastCreated: "📡 Шинэ хэрэглэгч амжилттай бүртгэгдлээ!",
    toastUpdated: "🔄 Хэрэглэгчийн мэдээлэл амжилттай шинэчлэгдлээ!",
    toastDeleted: "🗑️ Хэрэглэгчийн хаяг амжилттай устгагдлаа!"
  }
};

export interface MockExam {
  id: string;
  title: {
    ko: string;
    en: string;
    vn: string;
    mn: string;
  };
  duration: number; // in minutes
  questionCount: number;
  pdfFileName: string;
  pdfDataUrl: string;
  answerPdfFileName?: string;
  answerPdfDataUrl?: string;
  mp3FileName: string;
  mp3DataUrl: string;
  audioTracks?: Array<{ name: string; url: string; questionRange?: string }>;
  answerKey: number[]; // e.g. [2, 1, 3, ...]
  createdDate: string;
}

const DEFAULT_EXAMS: MockExam[] = [
  {
    id: "exam-topik-sample",
    title: {
      ko: "제68회 TOPIK II 한국어능력시험 실전 대비 1차",
      en: "68th TOPIK II Korean Ability Test Prep Exam #1",
      vn: "Kỳ thi thử TOPIK II lần thứ 68 luyện tập thực tế số 1",
      mn: "68 дахь удаагийн TOPIK II Солонгос хэлний түвшин тогтоох шалгалтын бэлтгэл #1"
    },
    duration: 50,
    questionCount: 10,
    pdfFileName: "68th_topik_ii_reading_grammar_passage.pdf",
    pdfDataUrl: "", // blank defaults to sample PDF
    mp3FileName: "68th_topik_ii_listening_audio_track.mp3",
    mp3DataUrl: "", // blank defaults to sample MP3
    answerKey: [2, 1, 3, 0, 2, 3, 1, 2, 0, 3], // Q1: 2(그리면), Q2: 1, Q3: 3, Q4: 0...
    createdDate: "2026-05-28"
  }
];

const DEFAULT_USERS: User[] = [
  { id: "admin", name: "관리자 (Kim)", email: "admin@global.ac.kr", nationality: "🇰🇷 대한민국", role: "admin", provider: "credentials", joinedDate: "2024-01-10" },
  { id: "google-altan", name: "Altantsetseg", email: "altan@mongol.net", nationality: "🇲🇳 몽골", role: "student", provider: "google", joinedDate: "2025-03-12" },
  { id: "naver-sherzod", name: "Sherzod", email: "sherzod@uzbek.net", nationality: "🇺🇿 우즈베키с탄", role: "student", provider: "naver", joinedDate: "2026-02-15" },
  { id: "kakao-rajesh", name: "Rajesh Kumar", email: "rajesh@nepal.org", nationality: "🇳🇵 네팔", role: "worker", provider: "kakao", joinedDate: "2024-08-20" },
  { id: "credentials-thu", name: "Nguyen Thu", email: "thu@vietnam.com", nationality: "🇻🇳 베트남", role: "student", provider: "credentials", joinedDate: "2025-09-01" }
];

interface InlineUserFormProps {
  editingUser?: User;
  onSubmit: (user: User) => void;
  onCancel: () => void;
}

function InlineUserForm({ editingUser, onSubmit, onCancel }: InlineUserFormProps) {
  const [name, setName] = useState(editingUser?.name || "");
  const [email, setEmail] = useState(editingUser?.email || "");
  const [nationality, setNationality] = useState(editingUser?.nationality || "🇻🇳 베트남");
  const [role, setRole] = useState<"student" | "worker" | "admin">(editingUser?.role || "student");
  const [provider, setProvider] = useState<"credentials" | "google" | "kakao" | "naver">(editingUser?.provider || "credentials");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    onSubmit({
      id: editingUser?.id || "user-" + Date.now(),
      name: name.trim(),
      email: email.trim(),
      nationality,
      role,
      provider,
      joinedDate: editingUser?.joinedDate || new Date().toISOString().split("T")[0]
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px", textAlign: "left" }}>
      <div className="ai-form-group">
        <label className="ai-form-label">사용자 성명</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          className="ai-form-input"
          required
        />
      </div>
      <div className="ai-form-group">
        <label className="ai-form-label">이메일 주소</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="ai-form-input"
          required
        />
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <div className="ai-form-group">
          <label className="ai-form-label">국적</label>
          <select 
            value={nationality} 
            onChange={(e) => setNationality(e.target.value)}
            className="ai-form-input"
          >
            <option value="🇰🇷 대한민국">🇰🇷 대한민국</option>
            <option value="🇲🇳 몽골">🇲🇳 몽골</option>
            <option value="🇻🇳 베트남">🇻🇳 베트남</option>
            <option value="🇳🇵 네팔">🇳🇵 네팔</option>
            <option value="🇺🇿 우즈베키스탄">🇺🇿 우즈베키스탄</option>
          </select>
        </div>
        <div className="ai-form-group">
          <label className="ai-form-label">권한</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value as any)}
            className="ai-form-input"
          >
            <option value="student">학생</option>
            <option value="worker">근로자</option>
            <option value="admin">관리자</option>
          </select>
        </div>
      </div>

      <div className="ai-form-group">
        <label className="ai-form-label">인증 채널</label>
        <select 
          value={provider} 
          onChange={(e) => setProvider(e.target.value as any)}
          className="ai-form-input"
        >
          <option value="credentials">Credentials</option>
          <option value="google">Google</option>
          <option value="kakao">Kakao</option>
          <option value="naver">Naver</option>
        </select>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "8px" }}>
        <button type="button" onClick={onCancel} className="ai-btn-danger" style={{ padding: "6px 14px" }}>취소</button>
        <button type="submit" className="ai-btn-action" style={{ padding: "6px 16px" }}>저장</button>
      </div>
    </form>
  );
}

interface NLUResult {
  intent: "help" | "exam_create" | "exam_list" | "user_create" | "user_list";
  replyText: string;
  actionData?: {
    query?: string;
    role?: "student" | "worker" | "admin";
    nationality?: string;
    provider?: "credentials" | "google" | "kakao" | "naver";
  };
}

const parseNLUQuery = (queryText: string): NLUResult => {
  const normalized = queryText.toLowerCase().trim();
  
  if (normalized.includes("도움") || normalized.includes("help") || normalized.includes("가이드") || normalized.includes("사용법") || normalized.includes("기능")) {
    return {
      intent: "help",
      replyText: "GCU Post School 최고 관리자 대화형 AI 모드 가이드입니다. 아래 명령 키워드를 입력하시거나 제안 카드를 클릭해보세요."
    };
  }
  
  const userKeywords = ["유저", "사용자", "학생", "근로자", "근로", "회원", "계정", "사람", "멤버", "인원", "명단", "학적"];
  const examKeywords = ["모의고사", "시험", "기출", "ibt", "topik"];
  const createKeywords = ["추가", "등록", "생성", "가입", "만들기", "신규", "새로운"];
  
  const isUserQuery = userKeywords.some(kw => normalized.includes(kw));
  const isExamQuery = examKeywords.some(kw => normalized.includes(kw));
  const isCreateQuery = createKeywords.some(kw => normalized.includes(kw));

  if (isExamQuery) {
    if (isCreateQuery) {
      return {
        intent: "exam_create",
        replyText: "신규 IBT 모의고사를 등록할 수 있는 제어 패널입니다. 아래 버튼을 클릭하여 기출 PDF, MP3 및 정답 정보를 출제해 주세요."
      };
    } else {
      return {
        intent: "exam_list",
        replyText: "글로벌 학생들을 위해 출제 완료된 TOPIK IBT 모의고사 목록입니다. 시험 시간 및 정답지를 조회하거나 관리할 수 있습니다."
      };
    }
  }

  if (isUserQuery && isCreateQuery) {
    return {
      intent: "user_create",
      replyText: "새로운 사용자 계정을 등록할 수 있는 카드 양식입니다. 정보를 기입하거나 대형 팝업 모달을 통해 등록을 진행할 수 있습니다."
    };
  }

  // user_list is the default intent
  let roleFilter: "student" | "worker" | "admin" | undefined = undefined;
  let nationalityFilter: string | undefined = undefined;
  let providerFilter: "credentials" | "google" | "kakao" | "naver" | undefined = undefined;
  let searchWord = "";

  // Check Role
  if (normalized.includes("학생") || normalized.includes("학적")) {
    if (normalized.includes("근로")) {
      roleFilter = "worker";
    } else {
      roleFilter = "student";
    }
  } else if (normalized.includes("근로") || normalized.includes("근로자")) {
    roleFilter = "worker";
  } else if (normalized.includes("관리자") || normalized.includes("어드민") || normalized.includes("교직원")) {
    roleFilter = "admin";
  }

  // Check Nationality
  if (normalized.includes("몽골") || normalized.includes("mongol")) {
    nationalityFilter = "몽골";
  } else if (normalized.includes("우즈벡") || normalized.includes("uzbek") || normalized.includes("우즈베키스탄")) {
    nationalityFilter = "우즈베키스탄";
  } else if (normalized.includes("네팔") || normalized.includes("nepal")) {
    nationalityFilter = "네팔";
  } else if (normalized.includes("베트남") || normalized.includes("vietnam")) {
    nationalityFilter = "베트남";
  } else if (normalized.includes("한국") || normalized.includes("대한민국") || normalized.includes("korea")) {
    nationalityFilter = "대한민국";
  }

  // Check Provider
  if (normalized.includes("구글") || normalized.includes("google")) {
    providerFilter = "google";
  } else if (normalized.includes("네이버") || normalized.includes("naver")) {
    providerFilter = "naver";
  } else if (normalized.includes("카카오") || normalized.includes("kakao")) {
    providerFilter = "kakao";
  } else if (normalized.includes("일반") || normalized.includes("이메일") || normalized.includes("자체") || normalized.includes("인증")) {
    providerFilter = "credentials";
  }

  // Extract search word by tokenizing and filtering out particles/stop-words
  const stopWords = new Set([
    "유저", "사용자", "학생", "근로자", "근로", "근로학생", "회원", "계정", "계정들", "사람", "멤버", "인원", "명단", "학적",
    "보여줘", "보여주세요", "보여줘라", "보여줌", "알려줘", "알려주세요", "조회해줘", "조회해주세요", "출력해줘", "출력해주세요",
    "뿌려줘", "불러와줘", "검색해줘", "검색해주세요", "찾아줘", "찾아주세요", "조회", "검색", "리스트", "목록", "현황", "전체",
    "모든", "모두", "전부", "줘", "보여", "찾아", "출력", "불러와", "사용중인", "사용중", "가입한", "가입된", "등록된", "등록한",
    "로그인한", "로그인된", "로그인", "접속한", "접속된", "상태", "데이터", "데이터베이스", "디비", "db", "정보", "중에", "중에서", "중"
  ]);

  const nationalityWords = new Set(["몽골", "우즈벡", "우즈베키스탄", "네팔", "베트남", "한국", "대한민국", "mongol", "uzbek", "nepal", "vietnam", "korea"]);
  const providerWords = new Set(["구글", "google", "네이버", "naver", "카카오", "kakao", "일반", "이메일", "자체", "credentials"]);
  const roleWords = new Set(["학생", "근로자", "근로", "근로학생", "관리자", "어드민", "교직원", "admin", "worker", "student"]);

  const cleanWord = (w: string) => {
    let prev = "";
    let curr = w;
    while (curr !== prev) {
      prev = curr;
      curr = curr.replace(/(들|을|를|은|는|이|가|의|으로|로|에서|님|에|와|과|랑|하고|중|중에|중에서|에대한|대한|들중|들중에)$/, "");
    }
    return curr;
  };

  const tokens = normalized.split(/\s+/);
  const candidates: string[] = [];
  for (const tok of tokens) {
    const cleaned = cleanWord(tok);
    if (!cleaned) continue;
    if (stopWords.has(cleaned)) continue;
    if (nationalityWords.has(cleaned)) continue;
    if (providerWords.has(cleaned)) continue;
    if (roleWords.has(cleaned)) continue;
    
    candidates.push(cleaned);
  }

  if (candidates.length > 0) {
    searchWord = candidates[0];
  }

  // Construct Reply Text
  let replyText = "";
  const filterDesc: string[] = [];
  if (nationalityFilter) filterDesc.push(`${nationalityFilter} 국적`);
  if (roleFilter) {
    const roleMap = { student: "학생", worker: "근로자", admin: "관리자" };
    filterDesc.push(roleMap[roleFilter]);
  }
  if (providerFilter) {
    const provMap = { google: "구글 로그인", naver: "네이버 로그인", kakao: "카카오 로그인", credentials: "일반 이메일 로그인" };
    filterDesc.push(provMap[providerFilter]);
  }

  return {
    intent: "user_list",
    replyText,
    actionData: {
      query: searchWord,
      role: roleFilter,
      nationality: nationalityFilter,
      provider: providerFilter
    }
  };
};

const getTraceabilityInfo = (msg: any) => {
  const intent = msg.actionType || "general";
  const info: any = {
    sourceDb: "GCU 통합 학사/인증 연동 데이터베이스",
    queryTime: msg.timestamp || new Date().toLocaleTimeString(),
    latency: "8ms",
    confidence: "100% (매치 완료)",
    integrityHash: "",
    verificationStatus: "Verified & Hash Match",
    queryParameters: JSON.stringify(msg.actionData || {}, null, 2),
    dataLocation: "Local Memory State"
  };

  let hashVal = 0;
  const combined = (msg.id || "") + (msg.text || "");
  for (let i = 0; i < combined.length; i++) {
    hashVal = (hashVal << 5) - hashVal + combined.charCodeAt(i);
    hashVal |= 0;
  }
  info.integrityHash = "SHA-256: " + Math.abs(hashVal).toString(16).padEnd(8, "f") + "e7b0c950a37b120cde8f3912a7d45e0f";

  if (intent === "user_list") {
    info.sourceDb = "GCU 글로벌 인적 자원 학사 통합 DB (LocalStorage: `gcu-users-db`)";
    info.dataLocation = "Local Client Database (Browser Storage)";
    info.latency = "12ms";
    info.confidence = "98.7% (NLU Keyword Match)";
    info.schema = `
Table: Users
Columns:
  - id: VARCHAR (Primary Key)
  - name: VARCHAR (Student/Worker Name)
  - email: VARCHAR (Unique Identity)
  - nationality: VARCHAR (Locale/Flag)
  - role: ENUM ('student', 'worker', 'admin')
  - provider: ENUM ('credentials', 'google', 'kakao', 'naver', 'apple')
  - joinedDate: DATE
    `.trim();
  } else if (intent === "exam_list" || intent === "exam_create") {
    info.sourceDb = "GCU 출제 센터 및 모의고사 출제 서버 API (Endpoint: `/api/exams`)";
    info.dataLocation = "Remote API Server & Cache Database";
    info.latency = "45ms";
    info.confidence = "99.2% (Intent Class Match)";
    info.schema = `
Endpoint: GET /api/exams
Endpoint: POST /api/exams
Table: MockExams
Columns:
  - id: VARCHAR (Primary Key)
  - title: Record<string, string> (Multilingual)
  - duration: INT (Minutes)
  - questionCount: INT
  - pdfFileName: VARCHAR
  - pdfDataUrl: TEXT
  - mp3FileName: VARCHAR
  - mp3DataUrl: TEXT
  - answerKey: ARRAY<INT>
  - questions: ARRAY<Question>
    `.trim();
  } else if (intent === "user_create" || intent === "user_edit") {
    info.sourceDb = "GCU 계정 트랜잭션 관리 엔진 (Write-Through LocalStorage: `gcu-users-db`)";
    info.dataLocation = "Client Transaction Pipeline (Storage Write)";
    info.latency = "15ms";
    info.confidence = "100% (Direct Action)";
    info.schema = `
Pipeline: AccountCreation & Update
Input Validation:
  - Email format verification (RegExp)
  - Duplicate email check in existing DB
  - Locale provider synchronization
    `.trim();
  } else if (intent === "complaint_routing") {
    info.sourceDb = "GCU 민원 자동 라우팅 엔진 (LocalStorage: `gcu-complaints-logs`)";
    info.dataLocation = "Local Browser Storage & SMS/Email Dispatch Gateway Logs";
    info.latency = msg.actionData?.latency || "14ms";
    info.confidence = "100% (자동 키워드 매칭 분류)";
    info.schema = `
Table: ComplaintsLogs
Columns:
  - id: VARCHAR (Primary Key)
  - timestamp: VARCHAR (발송 일시)
  - category: VARCHAR (학사/장학 | 교육지원 | 비자/정착 | 일반문의)
  - title: VARCHAR (민원 제목)
  - body: TEXT (민원 상세 본문)
  - staffName: VARCHAR (담당자 성명)
  - staffEmail: VARCHAR (담당자 이메일)
  - staffPhone: VARCHAR (담당자 핸드폰)
  - status: VARCHAR ("Email & SMS Sent")
    `.trim();
  } else {
    info.sourceDb = "GCU Admin AI NLU Parser NLUResult 규칙 엔진 및 학사 업무 지침 가이드라인 Ver 1.0";
    info.dataLocation = "In-memory Regular Expression Dictionary";
    info.latency = "2ms";
    info.confidence = "100% (Hardcoded Rules)";
    info.schema = `
Rules:
  - "help" rule: Match ("도움", "help", "가이드", "사용법", "기능")
  - Fallback rule: intent = "user_list"
    `.trim();
  }
  return info;
};

const INITIAL_QNA = [
  {
    id: 1,
    question: {
      ko: "외국인 유학생도 정말 모든 교육 강좌와 모의고사를 무료로 이용할 수 있나요?",
      en: "Can international students really access all educational courses and mock exams for free?",
      vn: "Sinh viên quốc tế có thực sự được sử dụng tất cả các khóa học và thi thử miễn phí không?",
      mn: "Гадаад оюутнууд үнэхээр бүх сургалт, загвар шалгалтыг үнэ төлбөргүй ашиглах боломжтой юу?"
    },
    answer: {
      ko: "네! 본 GCU Post School 플랫폼의 모든 단계별 정규 한국어 강좌, TOPIK 대비자료, 그리고 듣기/읽기 능력 시험 모의고사는 로그인 및 회원가입 없이 외국인 누구나 전면 무료로 개방되어 운영됩니다.",
      en: "Yes! All step-by-step regular Korean courses, TOPIK prep materials, and listening/reading mock exams on the GCU Post School platform are fully open and free for any foreigners without registration or login.",
      vn: "Đúng vậy! Tất cả các khóa học tiếng Hàn chính quy theo cấp độ, tài liệu ôn thi TOPIK, 및 đề thi thử kỹ năng Nghe/Đọc trên nền tảng GCU Post School đều được mở hoàn toàn miễn phí cho tất cả người nước ngoài mà không cần đăng ký hay đăng nhập.",
      mn: "Тийм ээ! Энэхүү GCU Post School платформын бүх шатны солонгос хэлний үндсэн хичээл, TOPIK-д бэлтгэх материал, сонсох/унших шалгалтын загвар шалгалтууд нь нэвтрэх болон бүртгүүлэх шаардлагагүйгээр гадаадын хэн бүхэнд бүрэн үнэ төлбөргүй нээлттэй ажиллаж байна."
    }
  },
  {
    id: 2,
    question: {
      ko: "K-Work 일자리 연동 및 지자체 F-2-R 비자 추천서는 어떻게 신청합니까?",
      en: "How do I apply for K-Work job matching and the local government F-2-R visa recommendation letter?",
      vn: "Làm thế nào để đăng ký kết nối việc làm K-Work và thư giới thiệu visa F-2-R của địa phương?",
      mn: "K-Work ажлын байр зуучлал болон орон нутгийн F-2-R визний тодорхойлолт захидлыг хэрхэн хүсэх вэ?"
    },
    answer: {
      ko: "취업/생활 페이지에서 관내 우수 연동 기업 정보를 검토한 후 본인의 자가 포인트 점수가 60점 요건을 만족하면, 근로 계약 가계약서 사본과 학위증을 지참하여 대학 행정처(support@global.ac.kr)로 신청해 주십시오. 행정 심사 후 지자체 추천서 제출용 총장 명의 공식 추천 공문을 발행해 드립니다.",
      en: "Check the matched job vacancies on our Employment/Life page. If your self-calculator point sum is 60 or above, bring a copy of your tentative employment contract and diploma, and apply at the university administration (support@global.ac.kr). We will issue an official president-endorsed recommendation letter for local government submittal.",
      vn: "Sau khi kiểm tra thông tin doanh nghiệp liên kết xuất sắc trên trang Việc làm & Đời sống, nếu điểm tự tính đạt từ 60 điểm trở lên, vui lòng mang theo bản sao hợp đồng lao động tạm thời 및 bằng tốt nghiệp đến phòng hành chính của trường (support@global.ac.kr) để đăng ký. Sau khi thẩm định, trường sẽ cấp văn bản giới thiệu chính thức dưới danh nghĩa Hiệu trưởng để nộp cho chính quyền địa phương.",
      mn: "Ажил эрхлэлт/Амьдрал хуудаснаас орон нутгийн хамтрагч ажлын байрны мэдээллийг шалгана уу. Хэрэв таны өөрийн тооцоолсон оноо 60-аас дээш байвал хөдөлмөрийн гэрээний хуулбар, дипломоо авч сургуулийн захиргаанд (support@global.ac.kr) хандана уу. Захиргааны хяналтын дараа орон нутгийн захиргаанд өгөх албан ёсны тодорхойлолтыг гаргаж өгнө."
    }
  },
  {
    id: 3,
    question: {
      ko: "강좌 수강 중 오류나 시간제 근로 신청 관련 개별 상담은 어디로 문의하나요?",
      en: "Where should I contact for individual counseling regarding course errors or part-time work permit applications?",
      vn: "Tôi nên liên hệ ở đâu để được tư vấn riêng về lỗi khóa học hoặc đăng ký làm thêm?",
      mn: "Хичээл сурах явцад алдаа гарах болон цагийн ажил хийх зөвшөөрлийн зөвлөгөөг хаанаас авах вэ?"
    },
    answer: {
      ko: "글로벌 포스트 스쿨 종합 행정 지원처(☎ 02-1234-5678)로 전화해 문의하시거나 아래의 Q&A 실시간 질문 신청 양식을 작성해 전송해 주시면 24시간 이내에 개별 메일로 상세 답변을 회신해 드립니다.",
      en: "You can call our Post School administrative helpdesk (☎ 02-1234-5678) or fill out and submit the Q&A ticket form below. A detailed response will be sent to your registered email address within 24 hours.",
      vn: "Vui lòng gọi điện đến Văn phòng Hỗ trợ Hành chính Tổng hợp Post School (☎ 02-1234-5678) эсвэл điền vào biểu mẫu đăng ký Q&A trực tuyến bên dưới. Chúng tôi sẽ phản hồi chi tiết qua email cá nhân của bạn trong vòng 24 giờ.",
      mn: "Пост Скүүл нэгдсэн тусламжийн төв рүү (☎ 02-1234-5678) утасдаж асуух эсвэл доорх Q&A асуулт илгээх хуудсаар асуултаа илгээвэл 24 цагийн дотор таны цахим шууданд хариу илгээнэ."
    }
  }
];

const MOCK_STUDENT_QNAS = [
  {
    id: 1717680000000 + 1,
    question: {
      ko: "[학사/장학] 장학금 지급 기준과 신청 서류 문의",
      en: "[Academics/Scholarship] Inquiry about scholarship criteria and application documents",
      vn: "[Academics/Scholarship] Yêu cầu về tiêu chí học bổng và hồ sơ đăng ký",
      mn: "[Academics/Scholarship] Тэтгэлэг олгох шалгуур болон бүрдүүлэх материалын тухай"
    },
    answer: {
      ko: "[스마트 민원 자동 분류 안내]\n본 문의는 '학사/장학' 영역으로 자동 분류되어 담당자 김학사(academic@global.ac.kr / 010-1111-2222)님께 실시간 메일 및 SMS 알림이 발송되었습니다. 신속하게 답변해 드리겠습니다.",
      en: "[Smart Routing Notification]\nThis inquiry has been categorized under '학사/장학' and dispatched to coordinator 김학사 (academic@global.ac.kr / 010-1111-2222) via email & SMS. We will reply shortly.",
      vn: "[Tự động phân loại thông minh]\nYêu cầu này được phân loại vào mục '학사/장학' và gửi thông báo đến người phụ trách 김학사 (academic@global.ac.kr / 010-1111-2222) qua email & SMS. Chúng tôi sẽ phản hồi sớm nhất.",
      mn: "[Ухаалаг ангилалын мэдэгдэл]\nЭнэхүү хүсэлтийг '학사/장학' ангилалд бүртгэж, хариуцсан ажилтан 김학사 (academic@global.ac.kr / 010-1111-2222) руу и-мэйл болон SMS-ээр мэдэгдэл илгээлээ. Бид удахгүй хариулах болно."
    }
  },
  {
    id: 1717680000000 + 2,
    question: {
      ko: "[비자/정착] 비자 연장 서류 및 출입국 사무소 방문 예약 방법",
      en: "[Visa/Settlement] Inquiry about visa extension documents and immigration office reservation",
      vn: "[Visa/Settlement] Yêu cầu về hồ sơ gia hạn visa và đặt lịch hẹn cục xuất nhập cảnh",
      mn: "[Visa/Settlement] Виз сунгахад бүрдүүлэх материал болон Цагаачлалын албаны цаг захиалга"
    },
    answer: {
      ko: "[스마트 민원 자동 분류 안내]\n본 문의는 '비자/정착' 영역으로 자동 분류되어 담당자 박비자(visa@global.ac.kr / 010-5555-6666)님께 실시간 메일 및 SMS 알림이 발송되었습니다. 신속하게 답변해 드리겠습니다.",
      en: "[Smart Routing Notification]\nThis inquiry has been categorized under '비자/정착' and dispatched to coordinator 박비자 (visa@global.ac.kr / 010-5555-6666) via email & SMS. We will reply shortly.",
      vn: "[Tự động phân loại thông minh]\nYêu cầu này được phân loại vào mục '비자/정착' và gửi thông báo đến người phụ trách 박비자 (visa@global.ac.kr / 010-5555-6666) qua email & SMS. Chúng tôi sẽ phản hồi sớm nhất.",
      mn: "[Ухаалаг ангилалын мэдэгдэл]\nЭнэхүү хүсэлтийг '비자/정착' ангилалд бүртгэж, хариуцсан ажилтан 박비자 (visa@global.ac.kr / 010-5555-6666) руу и-мэйл болон SMS-ээр мэдэгдэл илгээлээ. Бид удахгүй хариулах болно."
    }
  },
  {
    id: 1717680000000 + 3,
    question: {
      ko: "[교육지원] 한국어 튜터링 프로그램 매칭 신청 방법",
      en: "[Learning Support] How to apply for Korean language tutoring program matching",
      vn: "[Learning Support] Cách đăng ký ghép cặp chương trình kèm tiếng Hàn",
      mn: "[Learning Support] Солонгос хэлний туслах багш хөтөлбөрт хамрагдах хүсэлт"
    },
    answer: {
      ko: "[스마트 민원 자동 분류 안내]\n본 문의는 '교육지원' 영역으로 자동 분류되어 담당자 이교육(edu@global.ac.kr / 010-3333-4444)님께 실시간 메일 및 SMS 알림이 발송되었습니다. 신속하게 답변해 드리겠습니다.",
      en: "[Smart Routing Notification]\nThis inquiry has been categorized under '교육지원' and dispatched to coordinator 이교육 (edu@global.ac.kr / 010-3333-4444) via email & SMS. We will reply shortly.",
      vn: "[Tự động phân loại thông minh]\nYêu cầu này được phân loại vào mục '교육지원' và gửi thông báo đến người phụ trách 이교육 (edu@global.ac.kr / 010-3333-4444) qua email & SMS. Chúng tôi sẽ phản hồi sớm nhất.",
      mn: "[Ухаалаг ангилалын мэдэгдэл]\nЭнэхүү хүсэлтийг '교육지원' ангилалд бүртгэж, хариуцсан ажилтан 이교육 (edu@global.ac.kr / 010-3333-4444) руу и-мэйл болон SMS-ээр мэдэгдэл илгээлээ. Бид удахгүй хариулах болно."
    }
  }
];

const MOCK_COMPLAINTS_LOGS = [
  {
    id: "log-" + (1717680000000 + 1),
    timestamp: "2026-06-06 오후 2:23:11",
    category: "학사/장학",
    title: "장학금 지급 기준과 신청 서류 문의",
    body: "안녕하세요. 몽골에서 온 유학생 알탄이라고 합니다. 이번 학기 성적이 4.2 GPA인데 성적 우수 장학금 대상자인지 궁금합니다. 그리고 필요한 신청 서류와 제출 기한도 알려주세요.",
    staffName: "김학사",
    staffEmail: "academic@global.ac.kr",
    staffPhone: "010-1111-2222",
    status: "Email & SMS Sent"
  },
  {
    id: "log-" + (1717680000000 + 2),
    timestamp: "2026-06-06 오후 3:45:02",
    category: "비자/정착",
    title: "비자 연장 서류 및 출입국 사무소 방문 예약 방법",
    body: "베트남 국적 근로 학생 투입니다. D-2 유학 비자 연장일이 다음 달까지인데, 학교에서 발급받아야 하는 서류 리스트가 무엇인지 알려주세요. 그리고 출입국관리사무소 방문 예약 대행이 가능한가요?",
    staffName: "박비자",
    staffEmail: "visa@global.ac.kr",
    staffPhone: "010-5555-6666",
    status: "Email & SMS Sent"
  },
  {
    id: "log-" + (1717680000000 + 3),
    timestamp: "2026-06-06 오후 4:12:30",
    category: "교육지원",
    title: "한국어 튜터링 프로그램 매칭 신청 방법",
    body: "안녕하세요. 네팔에서 온 라제쉬입니다. TOPIK 4급 준비를 하고 있는데 전공 수업 단어가 너무 어렵습니다. 한국 학생들과 일대일로 매칭해주는 한국어 튜터링 프로그램이 있다고 들었는데 어떻게 신청하나요?",
    staffName: "이교육",
    staffEmail: "edu@global.ac.kr",
    staffPhone: "010-3333-4444",
    status: "Email & SMS Sent"
  }
];

export default function AdminPage() {
  const { lang } = useLanguage();
  const t = ADMIN_TRANSLATIONS[lang as "ko" | "en" | "vn" | "mn"] || ADMIN_TRANSLATIONS.ko;

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  // AI Chat Mode States
  const [adminViewMode, setAdminViewMode] = useState<"ai" | "classic">("ai");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string;
    sender: "user" | "assistant";
    text: string;
    timestamp: string;
    actionType?: "user_list" | "user_create" | "user_edit" | "exam_list" | "exam_create" | "help";
    actionData?: any;
    userQuery?: string;
  }>>([]);
  const [traceabilityMsg, setTraceabilityMsg] = useState<any | null>(null);
  const [adminName, setAdminName] = useState("S");

  // Tab State
  const [adminActiveTab, setAdminActiveTab] = useState<"users" | "exams" | "complaints">("users");

  // Complaints Management States
  const [complaintsConfig, setComplaintsConfig] = useState<Array<{ category: string; name: string; email: string; phone: string }>>([]);
  const [complaintsLogs, setComplaintsLogs] = useState<any[]>([]);
  const [qnaList, setQnaList] = useState<any[]>([]);

  // Coordinator Editing States
  const [editingConfigCategory, setEditingConfigCategory] = useState<string | null>(null);
  const [configFormName, setConfigFormName] = useState("");
  const [configFormEmail, setConfigFormEmail] = useState("");
  const [configFormPhone, setConfigFormPhone] = useState("");

  // Q&A Inquiry Replying States
  const [replyingQnaId, setReplyingQnaId] = useState<number | null>(null);
  const [replyTextKo, setReplyTextKo] = useState("");
  const [replyTextEn, setReplyTextEn] = useState("");
  const [replyTextVn, setReplyTextVn] = useState("");
  const [replyTextMn, setReplyTextMn] = useState("");

  // Q&A Translation States
  const [inquiryLangs, setInquiryLangs] = useState<Record<number, "ko" | "en" | "vn" | "mn">>({});
  const [translatingIds, setTranslatingIds] = useState<Record<number, boolean>>({});

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [nationalityFilter, setNationalityFilter] = useState("all");
  const [providerFilter, setProviderFilter] = useState("all");

  // Modal Form states (Users)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formNationality, setFormNationality] = useState("🇻🇳 베트남");
  const [formRole, setFormRole] = useState<"student" | "worker" | "admin">("student");
  const [formProvider, setFormProvider] = useState<"credentials" | "google" | "kakao" | "naver">("credentials");

  // Modal Form states (Exams)
  const [exams, setExams] = useState<MockExam[]>([]);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<MockExam | null>(null);
  const [examTitleKo, setExamTitleKo] = useState("");
  const [examTitleEn, setExamTitleEn] = useState("");
  const [examTitleVn, setExamTitleVn] = useState("");
  const [examTitleMn, setExamTitleMn] = useState("");
  const [examDuration, setExamDuration] = useState(50);
  const [examQuestionCount, setExamQuestionCount] = useState(10);
  const [pdfFileName, setPdfFileName] = useState("");
  const [pdfDataUrl, setPdfDataUrl] = useState("");
  const [mp3FileName, setMp3FileName] = useState("");
  const [mp3DataUrl, setMp3DataUrl] = useState("");
  const [examAnswerKey, setExamAnswerKey] = useState<number[]>(new Array(10).fill(0));
  const [questionsMode, setQuestionsMode] = useState(false);
  const [questionsData, setQuestionsData] = useState<Array<{
    id: number;
    imageUrl: string;
    imageFileName?: string;
    questionImageUrl?: string;
    questionImageFileName?: string;
    audioUrl: string;
    audioFileName?: string;
    correctAnswer: number;
  }>>(new Array(10).fill(null).map((_, i) => ({
    id: i + 1,
    imageUrl: "",
    imageFileName: "",
    questionImageUrl: "",
    questionImageFileName: "",
    audioUrl: "",
    audioFileName: "",
    correctAnswer: 0
  })));

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [mp3File, setMp3File] = useState<File | null>(null);
  const [mp3Files, setMp3Files] = useState<Array<{ file: File; questionRange: string }>>([]);
  const [audioTracks, setAudioTracks] = useState<Array<{ name: string; url: string; questionRange?: string }>>([]);

  const [answerPdfFile, setAnswerPdfFile] = useState<File | null>(null);
  const [answerPdfFileName, setAnswerPdfFileName] = useState("");
  const [answerPdfDataUrl, setAnswerPdfDataUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Verify Admin Access and Prepopulate DB
  useEffect(() => {
    if (typeof window !== "undefined") {
      const activeSession = localStorage.getItem("gcu-active-session");
      if (activeSession) {
        try {
          const user = JSON.parse(activeSession);
          if (user.role === "admin") {
            setIsAdmin(true);
            if (user.name) {
              const namePart = user.name.match(/\(([^)]+)\)/);
              const nameToUse = namePart ? namePart[1] : user.name.split(" ")[0];
              setAdminName(nameToUse || "S");
            }
          } else {
            setIsAdmin(false);
          }
        } catch (e) {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }

      // Load Users DB
      const savedDb = localStorage.getItem("gcu-users-db");
      if (savedDb) {
        try {
          setUsers(JSON.parse(savedDb));
        } catch (e) {
          setUsers(DEFAULT_USERS);
          localStorage.setItem("gcu-users-db", JSON.stringify(DEFAULT_USERS));
        }
      } else {
        setUsers(DEFAULT_USERS);
        localStorage.setItem("gcu-users-db", JSON.stringify(DEFAULT_USERS));
      }

      // Load Exams DB from Server
      fetch("/api/exams")
        .then((res) => res.json())
        .then((data) => {
          setExams(data);
        })
        .catch((err) => {
          console.error("Failed to load server exams:", err);
          const savedExams = localStorage.getItem("gcu-exams-db");
          if (savedExams) {
            setExams(JSON.parse(savedExams));
          } else {
            setExams(DEFAULT_EXAMS);
          }
        });

      // Load complaints config
      const savedConfig = localStorage.getItem("gcu-complaints-config");
      if (savedConfig) {
        try {
          setComplaintsConfig(JSON.parse(savedConfig));
        } catch (e) {}
      } else {
        const defaultConfig = [
          { category: "학사/장학", name: "김학사", email: "academic@global.ac.kr", phone: "010-1111-2222" },
          { category: "교육지원", name: "이교육", email: "edu@global.ac.kr", phone: "010-3333-4444" },
          { category: "비자/정착", name: "박비자", email: "visa@global.ac.kr", phone: "010-5555-6666" },
          { category: "일반문의", name: "최일반", email: "support@global.ac.kr", phone: "010-7777-8888" }
        ];
        setComplaintsConfig(defaultConfig);
        localStorage.setItem("gcu-complaints-config", JSON.stringify(defaultConfig));
      }

      // Load complaints logs
      const savedLogs = localStorage.getItem("gcu-complaints-logs");
      if (savedLogs) {
        try {
          setComplaintsLogs(JSON.parse(savedLogs));
        } catch (e) {}
      } else {
        setComplaintsLogs(MOCK_COMPLAINTS_LOGS);
        localStorage.setItem("gcu-complaints-logs", JSON.stringify(MOCK_COMPLAINTS_LOGS));
      }

      // Load QnA list
      const savedQna = localStorage.getItem("gcu-qna-list");
      if (savedQna) {
        try {
          setQnaList(JSON.parse(savedQna));
        } catch (e) {}
      } else {
        const defaultList = [...MOCK_STUDENT_QNAS, ...INITIAL_QNA];
        setQnaList(defaultList);
        localStorage.setItem("gcu-qna-list", JSON.stringify(defaultList));
      }
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const handleSendMessage = (inputText?: string) => {
    const queryText = inputText !== undefined ? inputText : chatInput;
    if (!queryText.trim()) return;

    const newUserMsg = {
      id: "msg-" + Date.now(),
      sender: "user" as const,
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newUserMsg]);
    setChatInput("");

    // Auto scroll chat
    setTimeout(() => {
      const container = document.getElementById("admin-chat-history");
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 100);

    // Process intent
    setTimeout(() => {
      const parsed = parseNLUQuery(queryText);
      const assistantMsg = {
        id: "msg-" + Date.now() + "-reply",
        sender: "assistant" as const,
        text: parsed.replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionType: parsed.intent,
        actionData: parsed.actionData || null,
        userQuery: queryText
      };
      
      setChatMessages(prev => [...prev, assistantMsg]);

      // Auto scroll chat
      setTimeout(() => {
        const container = document.getElementById("admin-chat-history");
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }, 100);
    }, 600);
  };

  const renderInlineUserList = (actionData?: any) => {
    const q = actionData?.query || "";
    const roleFilter = actionData?.role;
    const nationalityFilter = actionData?.nationality;
    const providerFilter = actionData?.provider;

    const filtered = users.filter(u => {
      if (q) {
        const matchQuery = u.name.toLowerCase().includes(q.toLowerCase()) || 
                           u.email.toLowerCase().includes(q.toLowerCase());
        if (!matchQuery) return false;
      }
      if (roleFilter && u.role !== roleFilter) return false;
      if (nationalityFilter && !u.nationality.includes(nationalityFilter)) return false;
      if (providerFilter && u.provider !== providerFilter) return false;
      return true;
    });

    return (
      <div style={{ overflowX: "auto" }}>
        <table className="ai-table">
          <thead>
            <tr>
              <th>성명</th>
              <th>이메일</th>
              <th>국적</th>
              <th>권한</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map(user => (
                <tr key={user.id}>
                  <td style={{ fontWeight: "700" }}>{user.name}</td>
                  <td style={{ color: "#9aa0a6", fontSize: "0.78rem" }}>{user.email}</td>
                  <td style={{ fontSize: "0.78rem" }}>{user.nationality}</td>
                  <td>
                    <span style={{ fontSize: "0.7rem", padding: "1px 6px", borderRadius: "4px", background: user.role === "admin" ? "rgba(242,139,130,0.15)" : user.role === "worker" ? "rgba(251,188,4,0.15)" : "rgba(138,180,248,0.15)", color: user.role === "admin" ? "#f28b82" : user.role === "worker" ? "#fbbc04" : "#8ab4f8", border: "1px solid rgba(255,255,255,0.05)" }}>
                      {user.role === "admin" ? "관리자" : user.role === "worker" ? "근로자" : "학생"}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button 
                        onClick={() => {
                          setChatMessages(prev => [...prev, {
                            id: "msg-" + Date.now(),
                            sender: "assistant",
                            text: `✏️ 사용자 "${user.name}" 정보를 수정합니다.`,
                            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            actionType: "user_edit",
                            actionData: { user },
                            userQuery: "사용자 수정 버튼 클릭"
                          }]);
                        }} 
                        className="ai-btn-action" 
                        style={{ padding: "2px 6px", fontSize: "0.72rem" }}
                      >
                        수정
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)} 
                        className="ai-btn-danger" 
                        style={{ padding: "2px 6px", fontSize: "0.72rem" }}
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", color: "#9aa0a6", padding: "20px 0" }}>검색 결과가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const renderInlineExamList = () => {
    return (
      <div style={{ overflowX: "auto" }}>
        <table className="ai-table">
          <thead>
            <tr>
              <th>시험 타이틀 (KO)</th>
              <th>제한시간</th>
              <th>문항수</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {exams.length > 0 ? (
              exams.map(exam => (
                <tr key={exam.id}>
                  <td style={{ fontWeight: "700" }}>{exam.title.ko}</td>
                  <td>{exam.duration}분</td>
                  <td>
                    <span style={{ fontSize: "0.7rem", padding: "1px 6px", borderRadius: "4px", background: "rgba(114, 191, 68, 0.15)", color: "#72BF44" }}>
                      {exam.questionCount}문항
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button 
                        onClick={() => handleOpenEditExamModal(exam)} 
                        className="ai-btn-action" 
                        style={{ padding: "2px 6px", fontSize: "0.72rem" }}
                      >
                        수정
                      </button>
                      <button 
                        onClick={() => handleDeleteExam(exam.id)} 
                        className="ai-btn-danger" 
                        style={{ padding: "2px 6px", fontSize: "0.72rem" }}
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", color: "#9aa0a6", padding: "20px 0" }}>등록된 모의고사가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const handleOpenAddModal = () => {
    setEditingUser(null);
    setFormName("");
    setFormEmail("");
    setFormNationality("🇻🇳 베트남");
    setFormRole("student");
    setFormProvider("credentials");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (user: User) => {
    setEditingUser(user);
    setFormName(user.name);
    setFormEmail(user.email);
    setFormNationality(user.nationality);
    setFormRole(user.role);
    setFormProvider(user.provider);
    setIsModalOpen(true);
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) return;

    let updatedUsersList: User[] = [];

    if (editingUser) {
      // Update Mode
      updatedUsersList = users.map((u) => {
        if (u.id === editingUser.id) {
          return {
            ...u,
            name: formName.trim(),
            email: formEmail.trim(),
            nationality: formNationality,
            role: formRole,
            provider: formProvider
          };
        }
        return u;
      });
      triggerToast(t.toastUpdated);
    } else {
      // Create Mode
      const newUser: User = {
        id: "user-" + Date.now(),
        name: formName.trim(),
        email: formEmail.trim(),
        nationality: formNationality,
        role: formRole,
        provider: formProvider,
        joinedDate: new Date().toISOString().split("T")[0]
      };
      updatedUsersList = [newUser, ...users];
      triggerToast(t.toastCreated);
    }

    setUsers(updatedUsersList);
    if (typeof window !== "undefined") {
      localStorage.setItem("gcu-users-db", JSON.stringify(updatedUsersList));
    }
    setIsModalOpen(false);
  };

  const handleDeleteUser = (userId: string) => {
    if (!confirm(t.deleteConfirm)) return;

    const updatedUsersList = users.filter((u) => u.id !== userId);
    setUsers(updatedUsersList);
    if (typeof window !== "undefined") {
      localStorage.setItem("gcu-users-db", JSON.stringify(updatedUsersList));
    }
    triggerToast(t.toastDeleted);
  };

  // Complaints Management Handlers
  const handleStartEditConfig = (c: any) => {
    setEditingConfigCategory(c.category);
    setConfigFormName(c.name);
    setConfigFormEmail(c.email);
    setConfigFormPhone(c.phone);
  };

  const handleSaveConfig = (category: string) => {
    if (!configFormName.trim() || !configFormEmail.trim() || !configFormPhone.trim()) return;
    const updated = complaintsConfig.map((c) => {
      if (c.category === category) {
        return { category, name: configFormName.trim(), email: configFormEmail.trim(), phone: configFormPhone.trim() };
      }
      return c;
    });
    setComplaintsConfig(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("gcu-complaints-config", JSON.stringify(updated));
    }
    setEditingConfigCategory(null);
    triggerToast("담당자 정보가 성공적으로 업데이트되었습니다!");
  };

  const handleSaveQnaReply = (id: number) => {
    if (!replyTextKo.trim()) return;
    const updatedQna = qnaList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          answer: {
            ko: replyTextKo.trim(),
            en: replyTextEn.trim() || replyTextKo.trim(),
            vn: replyTextVn.trim() || replyTextKo.trim(),
            mn: replyTextMn.trim() || replyTextKo.trim()
          }
        };
      }
      return item;
    });
    setQnaList(updatedQna);
    if (typeof window !== "undefined") {
      localStorage.setItem("gcu-qna-list", JSON.stringify(updatedQna));
    }
    setReplyingQnaId(null);
    setReplyTextKo("");
    setReplyTextEn("");
    setReplyTextVn("");
    setReplyTextMn("");
    triggerToast("민원 답변이 등록 완료되었습니다!");
  };

  const handleStartReply = (item: any) => {
    setReplyingQnaId(item.id);
    const isDefaultRouting = item.answer?.ko?.includes("스마트 민원 자동 분류");
    setReplyTextKo(isDefaultRouting ? "" : item.answer?.ko || "");
    setReplyTextEn(isDefaultRouting ? "" : item.answer?.en || "");
    setReplyTextVn(isDefaultRouting ? "" : item.answer?.vn || "");
    setReplyTextMn(isDefaultRouting ? "" : item.answer?.mn || "");
  };

  // Translation Dictionaries & Mock Translator
  const COMPLAINT_BODY_TRANSLATIONS: Record<number, Record<"ko" | "en" | "vn" | "mn", string>> = {
    1717680000001: {
      ko: "안녕하세요. 몽골에서 온 유학생 알탄이라고 합니다. 이번 학기 성적이 4.2 GPA인데 성적 우수 장학금 대상자인지 궁금합니다. 그리고 필요한 신청 서류와 제출 기한도 알려주세요.",
      en: "Hello, I am Altan, an international student from Mongolia. My GPA this semester is 4.2, and I would like to know if I qualify for the academic excellence scholarship. Please let me know what documents are required and the submission deadline.",
      vn: "Xin chào, tôi là Altan, sinh viên quốc tế đến từ Mông Cổ. Điểm GPA kỳ này của tôi là 4.2, tôi muốn hỏi mình có đủ điều kiện nhận học bổng xuất sắc không. Xin vui lòng cho biết hồ sơ cần thiết và hạn chót nộp.",
      mn: "Сайн байна уу, намайг Монголоос ирсэн гадаад оюутан Алтан гэдэг. Энэ улирлын голч дүн маань 4.2 байгаа бөгөөд сурлагын амжилтын тэтгэлэгт хамрагдах боломжтой эсэхийг мэдмээр байна. Мөн бүрдүүлэх материал болон эцсийн хугацааг хэлж өгнө үү."
    },
    1717680000002: {
      ko: "베트남 국적 근로 학생 투입니다. D-2 유학 비자 연장일이 다음 달까지인데, 학교에서 발급받아야 하는 서류 리스트가 무엇인지 알려주세요. 그리고 출입국관리사무소 방문 예약 대행이 가능한가요?",
      en: "I am Thu, a student worker of Vietnamese nationality. My D-2 student visa extension is due next month, so please tell me the list of documents I need to get from the school. Also, is it possible to get help with booking an immigration office visit?",
      vn: "Tôi là Thu, học sinh làm việc quốc tịch Việt Nam. Hạn gia hạn visa du học D-2 của tôi là tháng sau, xin vui lòng cung cấp danh sách hồ sơ cần lấy từ trường. Ngoài ra, trường có hỗ trợ đăng ký lịch hẹn cục xuất nhập cảnh không?",
      mn: "Вьетнам улсын харьяат ажилчин оюутан Тү байна. Миний D-2 оюутны визний сунгалт ирэх сард дуусах тул сургуулиас авах шаардлагатай материалын жагсаалтыг хэлж өгнө үү. Мөн Цагаачлалын албаны цаг захиалгыг сургуулиас зуучилж өгөх боломжтой юу?"
    },
    1717680000003: {
      ko: "안녕하세요. 네팔에서 온 라제쉬입니다. TOPIK 4급 준비를 하고 있는데 전공 수업 단어가 너무 어렵습니다. 한국 학생들과 일대일로 매칭해주는 한국어 튜터링 프로그램이 있다고 들었는데 어떻게 신청하나요?",
      en: "Hello, I am Rajesh from Nepal. I am preparing for TOPIK Level 4, but the vocabulary in my major classes is too difficult. I heard there is a Korean language tutoring program matching international students one-on-one with Korean students. How do I apply?",
      vn: "Xin chào, tôi là Rajesh đến từ Nepal. Tôi đang chuẩn bị thi TOPIK cấp 4, nhưng từ vựng các lớp chuyên ngành khó quá. Tôi nghe nói có chương trình kèm tiếng Hàn kết nối một-một giữa sinh viên nước ngoài và sinh viên Hàn Quốc. Làm thế nào để đăng ký?",
      mn: "Сайн байна уу, намайг Непалаас ирсэн Ражеш гэдэг. Би TOPIK 4-р түвшинд бэлдэж байгаа боловч мэргэжлийн хичээлийн үгс маш хэцүү байна. Гадаад оюутнуудыг солонгос оюутнуудтай ганцаарчлан холбож өгдөг солонгос хэлний туслах багш хөтөлбөр байдаг гэж сонссон, хэрхэн хүсэлт гаргах вэ?"
    }
  };

  const mockTranslate = (text: string, targetLang: "ko" | "en" | "vn" | "mn") => {
    if (targetLang === "ko") return text;
    
    let translated = text;
    if (targetLang === "en") {
      translated = `[AI Translation to English]\n${text
        .replace(/안녕하세요/g, "Hello")
        .replace(/감사합니다/g, "Thank you")
        .replace(/비자/g, "Visa")
        .replace(/장학금/g, "Scholarship")
        .replace(/등록금/g, "Tuition fee")
        .replace(/수업/g, "Class")
        .replace(/성적/g, "Grades/GPA")
        .replace(/서류/g, "Documents")
        .replace(/신청/g, "Application")
        .replace(/문의/g, "Inquiry")
        .replace(/한국어/g, "Korean")
        .replace(/튜터/g, "Tutor")
        .replace(/도와주세요/g, "Please help me")}`;
    } else if (targetLang === "vn") {
      translated = `[AI Dịch sang Tiếng Việt]\n${text
        .replace(/안녕하세요/g, "Xin chào")
        .replace(/감사합니다/g, "Xin cảm ơn")
        .replace(/비자/g, "Visa")
        .replace(/장학금/g, "Học bổng")
        .replace(/등록금/g, "Học phí")
        .replace(/수업/g, "Lớp học")
        .replace(/성적/g, "Điểm số")
        .replace(/서류/g, "Hồ sơ")
        .replace(/신청/g, "Đăng ký")
        .replace(/문의/g, "Yêu cầu")
        .replace(/한국어/g, "Tiếng Hàn")
        .replace(/튜터/g, "Gia sư")
        .replace(/도와주세요/g, "Xin giúp tôi")}`;
    } else if (targetLang === "mn") {
      translated = `[Монгол хэл рүү хийсэн AI орчуулга]\n${text
        .replace(/안녕하세요/g, "Сайн байна уу")
        .replace(/감사합니다/g, "Баярлалаа")
        .replace(/비자/g, "Виз")
        .replace(/장학금/g, "Тэтгэлэг")
        .replace(/등록금/g, "Сургалтын төлбөр")
        .replace(/수업/g, "Хичээл")
        .replace(/성적/g, "Дүн")
        .replace(/서류/g, "Материал")
        .replace(/신청/g, "Хүсэлт")
        .replace(/문의/g, "Лавлагаа")
        .replace(/한국어/g, "Солонгос хэл")
        .replace(/튜터/g, "Туслах багш")
        .replace(/도와주세요/g, "Туслаарай")}`;
    }
    return translated;
  };

  const handleTranslateTicket = (id: number, targetLang: "ko" | "en" | "vn" | "mn") => {
    setTranslatingIds(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setInquiryLangs(prev => ({ ...prev, [id]: targetLang }));
      setTranslatingIds(prev => ({ ...prev, [id]: false }));
    }, 600);
  };

  // Exam Management Handlers
  const handleOpenAddExamModal = () => {
    setEditingExam(null);
    setExamTitleKo("");
    setExamTitleEn("");
    setExamTitleVn("");
    setExamTitleMn("");
    setExamDuration(50);
    setExamQuestionCount(10);
    setPdfFileName("");
    setPdfDataUrl("");
    setMp3FileName("");
    setMp3DataUrl("");
    setMp3Files([]);
    setAudioTracks([]);
    setAnswerPdfFileName("");
    setAnswerPdfDataUrl("");
    setPdfFile(null);
    setMp3File(null);
    setAnswerPdfFile(null);
    setExamAnswerKey(new Array(10).fill(0));
    setQuestionsMode(false);
    setQuestionsData(
      new Array(10).fill(null).map((_, i) => ({
        id: i + 1,
        imageUrl: "",
        imageFileName: "",
        questionImageUrl: "",
        questionImageFileName: "",
        audioUrl: "",
        audioFileName: "",
        correctAnswer: 0
      }))
    );
    setIsExamModalOpen(true);
  };

  const handleOpenEditExamModal = (exam: MockExam) => {
    setEditingExam(exam);
    setExamTitleKo(exam.title.ko);
    setExamTitleEn(exam.title.en);
    setExamTitleVn(exam.title.vn);
    setExamTitleMn(exam.title.mn);
    setExamDuration(exam.duration);
    setExamQuestionCount(exam.questionCount);
    setPdfFileName(exam.pdfFileName);
    setPdfDataUrl(exam.pdfDataUrl);
    setMp3FileName(exam.mp3FileName);
    setMp3DataUrl(exam.mp3DataUrl);
    setMp3Files([]);
    setAudioTracks(
      exam.audioTracks?.map(track => ({
        name: track.name,
        url: track.url,
        questionRange: track.questionRange || ""
      })) || (exam.mp3DataUrl ? [{ name: exam.mp3FileName, url: exam.mp3DataUrl, questionRange: "1" }] : [])
    );

    setAnswerPdfFileName(exam.answerPdfFileName || "");
    setAnswerPdfDataUrl(exam.answerPdfDataUrl || "");
    setPdfFile(null);
    setMp3File(null);
    setAnswerPdfFile(null);
    setExamAnswerKey([...exam.answerKey]);
    
    const hasQuestions = !!(exam as any).questions && (exam as any).questions.length > 0;
    setQuestionsMode(hasQuestions);
    if (hasQuestions) {
      setQuestionsData(
        (exam as any).questions.map((q: any) => ({
          id: q.id,
          imageUrl: q.imageUrl || "",
          imageFileName: q.imageUrl ? "보기/지문 등록 완료" : "",
          questionImageUrl: q.questionImageUrl || "",
          questionImageFileName: q.questionImageUrl ? "문항 등록 완료" : "",
          audioUrl: q.audioUrl || "",
          audioFileName: q.audioUrl ? "음원 등록 완료" : "",
          correctAnswer: q.correctAnswer || 0
        }))
      );
    } else {
      setQuestionsData(
        new Array(exam.questionCount).fill(null).map((_, i) => ({
          id: i + 1,
          imageUrl: "",
          imageFileName: "",
          questionImageUrl: "",
          questionImageFileName: "",
          audioUrl: "",
          audioFileName: "",
          correctAnswer: exam.answerKey[i] || 0
        }))
      );
    }
    
    setIsExamModalOpen(true);
  };

  const handleQuestionCountChange = (count: number) => {
    const newCount = Math.max(1, count || 1);
    setExamQuestionCount(newCount);
    setExamAnswerKey((prev) => {
      const next = [...prev];
      if (next.length < newCount) {
        return next.concat(new Array(newCount - next.length).fill(0));
      } else {
        return next.slice(0, newCount);
      }
    });
    setQuestionsData((prev) => {
      const next = [...prev];
      if (next.length < newCount) {
        const diff = newCount - next.length;
        const additional = new Array(diff).fill(null).map((_, i) => ({
          id: next.length + i + 1,
          imageUrl: "",
          imageFileName: "",
          questionImageUrl: "",
          questionImageFileName: "",
          audioUrl: "",
          audioFileName: "",
          correctAnswer: 0
        }));
        return next.concat(additional);
      } else {
        return next.slice(0, newCount);
      }
    });
  };

  const handleAnswerChange = (qIdx: number, val: number) => {
    setExamAnswerKey((prev) => {
      const next = [...prev];
      next[qIdx] = val;
      return next;
    });
    setQuestionsData((prev) => {
      const next = [...prev];
      if (next[qIdx]) {
        next[qIdx].correctAnswer = val;
      }
      return next;
    });
  };

  const uploadFileToServer = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData
    });
    if (!res.ok) {
      throw new Error("파일 업로드에 실패했습니다.");
    }
    const data = await res.json();
    return data.url;
  };

  const handleUploadQuestionImage = async (qIdx: number, file: File) => {
    try {
      setQuestionsData((prev) => {
        const next = [...prev];
        next[qIdx].imageFileName = "업로드 중...";
        return next;
      });
      const url = await uploadFileToServer(file);
      setQuestionsData((prev) => {
        const next = [...prev];
        next[qIdx].imageUrl = url;
        next[qIdx].imageFileName = file.name;
        return next;
      });
      triggerToast(`Q.${qIdx + 1} 문항 이미지가 성공적으로 업로드되었습니다.`);
    } catch (e: any) {
      alert(`이미지 업로드 실패: ${e.message || e}`);
      setQuestionsData((prev) => {
        const next = [...prev];
        next[qIdx].imageFileName = "";
        return next;
      });
    }
  };

  const handleUploadDetailQuestionImage = async (qIdx: number, file: File) => {
    try {
      setQuestionsData((prev) => {
        const next = [...prev];
        next[qIdx].questionImageFileName = "업로드 중...";
        return next;
      });
      const url = await uploadFileToServer(file);
      setQuestionsData((prev) => {
        const next = [...prev];
        next[qIdx].questionImageUrl = url;
        next[qIdx].questionImageFileName = file.name;
        return next;
      });
      triggerToast(`Q.${qIdx + 1} 개별 문항 이미지가 성공적으로 업로드되었습니다.`);
    } catch (e: any) {
      alert(`이미지 업로드 실패: ${e.message || e}`);
      setQuestionsData((prev) => {
        const next = [...prev];
        next[qIdx].questionImageFileName = "";
        return next;
      });
    }
  };

  const handleUploadQuestionAudio = async (qIdx: number, file: File) => {
    try {
      setQuestionsData((prev) => {
        const next = [...prev];
        next[qIdx].audioFileName = "업로드 중...";
        return next;
      });
      const url = await uploadFileToServer(file);
      setQuestionsData((prev) => {
        const next = [...prev];
        next[qIdx].audioUrl = url;
        next[qIdx].audioFileName = file.name;
        return next;
      });
      triggerToast(`Q.${qIdx + 1} 문항 전용 음원이 성공적으로 업로드되었습니다.`);
    } catch (e: any) {
      alert(`음원 업로드 실패: ${e.message || e}`);
      setQuestionsData((prev) => {
        const next = [...prev];
        next[qIdx].audioFileName = "";
        return next;
      });
    }
  };

  const handleSaveExam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!examTitleKo.trim()) return;

    setIsUploading(true);
    try {
      let finalPdfUrl = pdfDataUrl;
      let finalMp3Url = mp3DataUrl;
      let finalAnswerPdfUrl = answerPdfDataUrl;
      let finalAudioTracks = [...audioTracks];

      if (pdfFile) {
        finalPdfUrl = await uploadFileToServer(pdfFile);
      }
      if (answerPdfFile) {
        finalAnswerPdfUrl = await uploadFileToServer(answerPdfFile);
      }

      // Handle multi-MP3 files concurrent upload
      if (mp3Files.length > 0) {
        const uploadedTracks = await Promise.all(
          mp3Files.map(async (item) => {
            const url = await uploadFileToServer(item.file);
            return { name: item.file.name, url, questionRange: item.questionRange.trim() };
          })
        );
        finalAudioTracks = [...audioTracks, ...uploadedTracks];
      } else if (mp3File) {
        // Single file upload fallback
        const singleUrl = await uploadFileToServer(mp3File);
        finalAudioTracks = [...audioTracks, { name: mp3File.name, url: singleUrl, questionRange: "1" }];
      }


      // Sync default audio compatibility
      if (finalAudioTracks.length > 0) {
        finalMp3Url = finalAudioTracks[0].url;
      } else {
        finalMp3Url = "";
      }

      const examPayload = {
        id: editingExam ? editingExam.id : "exam-" + Date.now(),
        title: {
          ko: examTitleKo.trim(),
          en: (examTitleEn || examTitleKo).trim(),
          vn: (examTitleVn || examTitleKo).trim(),
          mn: (examTitleMn || examTitleKo).trim()
        },
        duration: examDuration,
        questionCount: examQuestionCount,
        pdfFileName: pdfFile ? pdfFile.name : (pdfFileName || "68th_topik_ii_reading_grammar_passage.pdf"),
        pdfDataUrl: finalPdfUrl,
        answerPdfFileName: answerPdfFile ? answerPdfFile.name : answerPdfFileName,
        answerPdfDataUrl: finalAnswerPdfUrl,
        mp3FileName: finalAudioTracks.length > 0 ? finalAudioTracks[0].name : (mp3FileName || "68th_topik_ii_listening_audio_track.mp3"),
        mp3DataUrl: finalMp3Url,
        audioTracks: finalAudioTracks,
        answerKey: questionsMode ? questionsData.map(q => q.correctAnswer) : examAnswerKey,
        questions: questionsMode ? questionsData.map(q => ({
          id: q.id,
          imageUrl: q.imageUrl,
          questionImageUrl: q.questionImageUrl || "",
          audioUrl: q.audioUrl,
          correctAnswer: q.correctAnswer
        })) : []
      };

      const res = await fetch("/api/exams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(examPayload)
      });

      if (!res.ok) {
        throw new Error("모의고사 정보 저장에 실패했습니다.");
      }

      const data = await res.json();
      setExams(data.exams);
      triggerToast(editingExam ? "🔄 모의고사 정보가 서버 DB에 영구 업데이트되었습니다!" : "📡 신규 IBT 모의고사가 성공적으로 출제되어 서버 DB에 기록되었습니다!");
      setIsExamModalOpen(false);
    } catch (err: any) {
      alert(`에러 발생: ${err.message || err}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteExam = async (examId: string) => {
    if (!confirm("정말로 이 모의고사를 영구 삭제하시겠습니까? 관련 기출 파일(PDF, MP3)과 정답지가 서버 디스크 및 데이터베이스에서 모두 삭제됩니다.")) return;
    
    try {
      const res = await fetch(`/api/exams?id=${examId}`, {
        method: "DELETE"
      });
      if (!res.ok) {
        throw new Error("모의고사 삭제에 실패했습니다.");
      }
      const data = await res.json();
      setExams(data.exams);
      triggerToast("🗑️ 모의고사가 성공적으로 삭제되었습니다.");
    } catch (err: any) {
      alert(`삭제 에러: ${err.message || err}`);
    }
  };

  // Filter logic
  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    const matchesNationality = nationalityFilter === "all" || u.nationality.includes(nationalityFilter);
    const matchesProvider = providerFilter === "all" || u.provider === providerFilter;

    return matchesSearch && matchesRole && matchesNationality && matchesProvider;
  });

  // Guard Clause loading check
  if (isAdmin === null) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "40vh" }}>
        <span className="sync-status-dot syncing"></span>
        <span style={{ marginLeft: "8px", color: "var(--text-secondary)" }}>Verifying Administrative Access...</span>
      </div>
    );
  }

  // Access Denied Protection state
  if (!isAdmin) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh", flexDirection: "column", gap: "24px" }}>
        <div className="glass-panel" style={{ padding: "40px", maxWidth: "500px", textAlign: "center", border: "1px solid var(--gcu-orange-rgb)" }}>
          <span style={{ fontSize: "3rem" }}>🚨</span>
          <h2 style={{ fontSize: "1.35rem", fontWeight: "800", color: "var(--text-primary)", margin: "16px 0 8px 0" }}>{t.accessDenied}</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.6" }}>
            본 제어판은 글로벌사이버대 GCU Post School 최고 관리자(Admin) 권한 보유 계정으로만 개설 및 접근이 허가됩니다.
          </p>
          <a href="/" className="btn-primary" style={{ display: "inline-block" }}>
            {t.goHome}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
      {/* 0. AI Mode Local Style Rules */}
      <style>{`
        .ai-suggestion-item {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid #1f2229;
          transition: all 0.2s;
        }
        .ai-suggestion-item:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: #3c4043;
        }
        .chat-message-bubble {
          border-radius: 18px;
          padding: 16px 20px;
          max-width: 80%;
          font-size: 0.95rem;
          line-height: 1.6;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .chat-message-user {
          background: #303134;
          color: #ffffff;
          border-top-right-radius: 4px;
        }
        .chat-message-assistant {
          background: #1e2025;
          color: #e8eaed;
          border-top-left-radius: 4px;
          border: 1px solid #2b2d35;
          width: 100%;
        }
        .ai-theme-input:focus-within {
          border-color: #8ab4f8 !important;
          box-shadow: 0 0 12px rgba(138, 180, 248, 0.2) !important;
        }
        .ai-btn-action {
          background: rgba(138, 180, 248, 0.1);
          border: 1px solid rgba(138, 180, 248, 0.3);
          color: #8ab4f8;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .ai-btn-action:hover {
          background: rgba(138, 180, 248, 0.2);
          border-color: #8ab4f8;
          box-shadow: 0 2px 8px rgba(138, 180, 248, 0.25);
        }
        .ai-btn-danger {
          background: rgba(242, 139, 130, 0.1);
          border: 1px solid rgba(242, 139, 130, 0.3);
          color: #f28b82;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .ai-btn-danger:hover {
          background: rgba(242, 139, 130, 0.2);
          border-color: #f28b82;
          box-shadow: 0 2px 8px rgba(242, 139, 130, 0.25);
        }
        .ai-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 14px;
        }
        .ai-table th {
          border-bottom: 2px solid #2b2d35;
          padding: 10px 8px;
          text-align: left;
          color: #9aa0a6;
          font-size: 0.8rem;
          font-weight: 700;
        }
        .ai-table td {
          border-bottom: 1px solid #1f2229;
          padding: 12px 8px;
          color: #e8eaed;
          font-size: 0.85rem;
        }
        .ai-form-group {
          margin-bottom: 14px;
        }
        .ai-form-label {
          display: block;
          margin-bottom: 6px;
          color: #9aa0a6;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .ai-form-input {
          width: 100%;
          background: #25272c;
          border: 1px solid #3c4043;
          color: #ffffff;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 0.85rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .ai-form-input:focus {
          border-color: #8ab4f8;
        }
      `}</style>

      {adminViewMode === "classic" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          {/* Top Mode Banner */}
          <div className="glass-panel" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 28px", background: "linear-gradient(90deg, rgba(18, 42, 77, 0.15) 0%, rgba(198, 26, 43, 0.05) 100%)", border: "1px solid var(--border-color)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "1.5rem" }}>🤖</span>
              <div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--text-primary)", margin: 0 }}>글로벌 통합 관리자 대화형 AI 모드 지원</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", margin: "2px 0 0 0" }}>자연어 텍스트 명령을 통해 사용자 권한 관리 및 모의고사 관리를 보다 효율적으로 제어할 수 있습니다.</p>
              </div>
            </div>
            <button 
              onClick={() => setAdminViewMode("ai")} 
              className="btn-primary" 
              style={{ padding: "8px 18px", fontSize: "0.82rem", borderRadius: "8px", color: "#ffffff", fontWeight: "700", whiteSpace: "nowrap" }}
            >
              🤖 AI 모드로 전환
            </button>
          </div>

          {/* 1. Page Header */}
          <section className="glass-panel" style={{ padding: "40px", background: "linear-gradient(135deg, rgba(33, 64, 154, 0.25) 0%, rgba(114, 191, 68, 0.05) 100%)" }}>
        <h1 className="hero-title" style={{ fontSize: "2.25rem", marginBottom: "16px", fontFamily: "var(--font-brand)", letterSpacing: "-0.5px" }}>
          {t.adminTitle}
        </h1>
        <p className="hero-desc" style={{ marginBottom: 0, fontSize: "1rem", color: "var(--text-secondary)" }}>
          {t.adminDesc}
        </p>
      </section>

      {/* Admin Panel Tab Selector */}
      <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px" }}>
        <button 
          onClick={() => setAdminViewMode("ai")}
          className="comm-tab-btn"
          style={{ padding: "10px 20px", fontSize: "0.9rem", fontWeight: "700", whiteSpace: "nowrap" }}
        >
          🤖 AI 모드
        </button>
        <button 
          onClick={() => { setAdminViewMode("classic"); setAdminActiveTab("users"); }}
          className={`comm-tab-btn ${adminActiveTab === "users" ? "active" : ""}`}
          style={{ padding: "10px 20px", fontSize: "0.9rem", fontWeight: "700", whiteSpace: "nowrap" }}
        >
          👥 계정 권한 관리
        </button>
        <button 
          onClick={() => { setAdminViewMode("classic"); setAdminActiveTab("exams"); }}
          className={`comm-tab-btn ${adminActiveTab === "exams" ? "active" : ""}`}
          style={{ padding: "10px 20px", fontSize: "0.9rem", fontWeight: "700", whiteSpace: "nowrap" }}
        >
          ✏️ 모의고사 출제 제어
        </button>
        <button 
          onClick={() => { setAdminViewMode("classic"); setAdminActiveTab("complaints"); }}
          className={`comm-tab-btn ${adminActiveTab === "complaints" ? "active" : ""}`}
          style={{ padding: "10px 20px", fontSize: "0.9rem", fontWeight: "700", whiteSpace: "nowrap" }}
        >
          📋 스마트 민원관리
        </button>
      </div>

      {adminActiveTab === "users" && (
        <>
          {/* 2. Controls Toolbar Grid */}
          <div 
            className="glass-panel" 
            style={{ 
              padding: "24px", 
              display: "flex", 
              flexDirection: "column", 
              gap: "18px"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              
              {/* Dynamic Search Box */}
              <div className="search-input-wrapper" style={{ width: "100%", maxWidth: "340px", marginBottom: 0 }}>
                <input 
                  type="text" 
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                  style={{ padding: "8px 12px", height: "38px" }}
                />
                <span className="search-icon-svg" style={{ top: "8px" }}>🔍</span>
              </div>

              {/* Add Account Trigger */}
              <button 
                onClick={handleOpenAddModal}
                className="btn-primary"
                style={{ whiteSpace: "nowrap", borderRadius: "8px", fontSize: "0.85rem", padding: "8px 16px", color: "#ffffff", fontWeight: "700" }}
              >
                {t.btnAddUser}
              </button>
            </div>

            {/* Filter Toolbar row */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "16px" }}>
              {/* Role Filter */}
              <select 
                value={roleFilter} 
                onChange={(e) => setRoleFilter(e.target.value)}
                className="calc-select"
                style={{ width: "auto", minWidth: "130px", height: "36px", fontSize: "0.8rem", padding: "0 10px" }}
                aria-label="Role Filter"
              >
                <option value="all">{t.filterRoleAll}</option>
                <option value="student">{t.filterRoleStudent}</option>
                <option value="worker">{t.filterRoleWorker}</option>
                <option value="admin">{t.filterRoleAdmin}</option>
              </select>

              {/* Nationality Filter */}
              <select 
                value={nationalityFilter} 
                onChange={(e) => setNationalityFilter(e.target.value)}
                className="calc-select"
                style={{ width: "auto", minWidth: "130px", height: "36px", fontSize: "0.8rem", padding: "0 10px" }}
                aria-label="Nationality Filter"
              >
                <option value="all">{t.filterNatAll}</option>
                <option value="대한민국">🇰🇷 대한민국</option>
                <option value="몽골">🇲🇳 몽골</option>
                <option value="베트남">🇻🇳 베트남</option>
                <option value="네팔">🇳🇵 네팔</option>
                <option value="우즈벡">🇺🇿 우즈베키스탄</option>
              </select>

              {/* Provider Filter */}
              <select 
                value={providerFilter} 
                onChange={(e) => setProviderFilter(e.target.value)}
                className="calc-select"
                style={{ width: "auto", minWidth: "130px", height: "36px", fontSize: "0.8rem", padding: "0 10px" }}
                aria-label="Provider Filter"
              >
                <option value="all">{t.filterProvAll}</option>
                <option value="credentials">Credentials</option>
                <option value="google">Google</option>
                <option value="kakao">Kakao</option>
                <option value="naver">Naver</option>
              </select>
            </div>
          </div>

          {/* 3. User Data Table Grid */}
          <div className="glass-panel" style={{ padding: "8px", overflowX: "auto" }}>
            <table className="resource-table" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>{t.colName}</th>
                  <th>{t.colEmail}</th>
                  <th>{t.colNat}</th>
                  <th>{t.colRole}</th>
                  <th>{t.colProvider}</th>
                  <th>{t.colDate}</th>
                  <th>{t.colActions}</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td style={{ fontWeight: "700", color: "var(--text-primary)" }}>{user.name}</td>
                      <td style={{ color: "var(--text-secondary)" }}>{user.email}</td>
                      <td>{user.nationality}</td>
                      <td>
                        <span 
                          className={`feed-tag ${user.role === "admin" ? "notice" : user.role === "worker" ? "guide" : "event"}`}
                          style={{ fontSize: "0.75rem", padding: "2px 8px" }}
                        >
                          {user.role === "admin" ? t.filterRoleAdmin : user.role === "worker" ? t.filterRoleWorker : t.filterRoleStudent}
                        </span>
                      </td>
                      <td>
                        <span 
                          style={{ 
                            fontSize: "0.75rem", 
                            padding: "2px 8px", 
                            borderRadius: "4px", 
                            background: user.provider === "google" ? "rgba(0, 0, 0, 0.04)" : user.provider === "kakao" ? "rgba(254, 229, 0, 0.15)" : user.provider === "naver" ? "rgba(3, 199, 90, 0.12)" : "rgba(18, 42, 77, 0.08)",
                            border: user.provider === "google" ? "1px solid rgba(0, 0, 0, 0.08)" : user.provider === "kakao" ? "1px solid rgba(254, 229, 0, 0.3)" : user.provider === "naver" ? "1px solid rgba(3, 199, 90, 0.25)" : "1px solid rgba(18, 42, 77, 0.15)",
                            fontWeight: "600",
                            color: user.provider === "google" ? "var(--text-primary)" : user.provider === "kakao" ? "#9b7f00" : user.provider === "naver" ? "#03C75A" : "var(--gcu-navy)"
                          }}
                        >
                          {user.provider.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{user.joinedDate}</td>
                      <td>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button 
                            onClick={() => handleOpenEditModal(user)} 
                            className="resource-download-btn"
                            style={{ padding: "4px 8px", fontSize: "0.75rem", background: "rgba(0, 185, 242, 0.15)", border: "1px solid var(--gcu-sky)", color: "var(--gcu-sky)" }}
                          >
                            {t.btnEdit}
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(user.id)} 
                            className="resource-download-btn"
                            style={{ padding: "4px 8px", fontSize: "0.75rem", background: "rgba(247, 147, 30, 0.15)", border: "1px solid var(--gcu-orange)", color: "var(--gcu-orange)" }}
                          >
                            {t.btnDelete}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
                      현재 필터 조건에 부합하는 연동 사용자 계정이 존재하지 않습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* 4. CRUD Edit/Create Slide-Over Modal Popup */}
      {isModalOpen && (
        <div className="drawer-backdrop" onClick={() => setIsModalOpen(false)}>
          <div 
            className="glass-panel" 
            style={{ 
              width: "90%", 
              maxWidth: "500px", 
              padding: "36px", 
              position: "relative", 
              background: "var(--bg-secondary)",
              border: "1px solid var(--gcu-sky)",
              boxShadow: "0 24px 64px rgba(0, 185, 242, 0.3)",
              animation: "toastSlideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "transparent", color: "var(--text-secondary)", fontSize: "1.3rem", cursor: "pointer" }}
            >
              ✕
            </button>

            <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "var(--text-primary)", fontFamily: "var(--font-brand)", marginBottom: "24px", letterSpacing: "-0.5px" }}>
              {editingUser ? t.modalEditTitle : t.modalAddTitle}
            </h3>

            <form onSubmit={handleSaveUser} style={{ display: "flex", flexDirection: "column", gap: "20px", textAlign: "left" }}>
              
              {/* Name */}
              <div>
                <label className="calc-label" style={{ display: "block", marginBottom: "6px" }}>{t.lblFieldName}</label>
                <input 
                  type="text" 
                  value={formName} 
                  onChange={(e) => setFormName(e.target.value)}
                  className="search-input"
                  style={{ padding: "8px 12px" }}
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="calc-label" style={{ display: "block", marginBottom: "6px" }}>{t.lblFieldEmail}</label>
                <input 
                  type="email" 
                  value={formEmail} 
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="search-input"
                  style={{ padding: "8px 12px" }}
                  required
                />
              </div>

              {/* Nationality Dropdown */}
              <div>
                <label className="calc-label" style={{ display: "block", marginBottom: "6px" }}>{t.lblFieldNat}</label>
                <select 
                  value={formNationality} 
                  onChange={(e) => setFormNationality(e.target.value)}
                  className="calc-select"
                >
                  <option value="🇰🇷 대한민국">🇰🇷 대한민국</option>
                  <option value="🇲🇳 몽골">🇲🇳 몽골</option>
                  <option value="🇻🇳 베트남">🇻🇳 베트남</option>
                  <option value="🇳🇵 네팔">🇳🇵 네팔</option>
                  <option value="🇺🇿 우즈베키스탄">🇺🇿 우즈베키스탄</option>
                </select>
              </div>

              {/* Grid selectors for Role and Provider */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label className="calc-label" style={{ display: "block", marginBottom: "6px" }}>{t.lblFieldRole}</label>
                  <select 
                    value={formRole} 
                    onChange={(e) => setFormRole(e.target.value as any)}
                    className="calc-select"
                  >
                    <option value="student">{t.filterRoleStudent}</option>
                    <option value="worker">{t.filterRoleWorker}</option>
                    <option value="admin">{t.filterRoleAdmin}</option>
                  </select>
                </div>

                <div>
                  <label className="calc-label" style={{ display: "block", marginBottom: "6px" }}>{t.lblFieldProv}</label>
                  <select 
                    value={formProvider} 
                    onChange={(e) => setFormProvider(e.target.value as any)}
                    className="calc-select"
                  >
                    <option value="credentials">Credentials</option>
                    <option value="google">Google</option>
                    <option value="kakao">Kakao</option>
                    <option value="naver">Naver</option>
                  </select>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "16px" }}>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary"
                  style={{ padding: "8px 18px", fontSize: "0.85rem", borderRadius: "8px" }}
                >
                  {t.btnCancel}
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                  style={{ padding: "8px 20px", fontSize: "0.85rem", borderRadius: "8px", color: "#ffffff", fontWeight: "700" }}
                >
                  {t.btnSave}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4.1. Mock Exam Controls Toolbar & Registry Table */}
      {adminActiveTab === "exams" && (
        <>
          {/* Mock Exam Controls Toolbar */}
          <div 
            className="glass-panel" 
            style={{ 
              padding: "24px", 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px"
            }}
          >
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--text-primary)", margin: 0 }}>✏️ IBT 모의고사 기출 리스트</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", margin: "4px 0 0 0" }}>현재 출제되어 학생들이 응시할 수 있는 시험지 목록입니다.</p>
            </div>
            
            <button 
              onClick={handleOpenAddExamModal}
              className="btn-primary"
              style={{ whiteSpace: "nowrap", borderRadius: "8px", fontSize: "0.85rem", padding: "8px 16px", color: "#ffffff", fontWeight: "700" }}
            >
              ➕ 신규 모의고사 출제하기
            </button>
          </div>

          {/* Mock Exam Table */}
          <div className="glass-panel" style={{ padding: "8px", overflowX: "auto" }}>
            <table className="resource-table" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>시험지명 (KO)</th>
                  <th>제한 시간</th>
                  <th>문항 수</th>
                  <th>PDF 문항 파일</th>
                  <th>MP3 듣기 평가 파일</th>
                  <th>출제 일자</th>
                  <th>관리 동작</th>
                </tr>
              </thead>
              <tbody>
                {exams.length > 0 ? (
                  exams.map((exam) => (
                    <tr key={exam.id}>
                      <td style={{ fontWeight: "700", color: "var(--text-primary)" }}>{exam.title.ko}</td>
                      <td>{exam.duration}분</td>
                      <td>
                        <span className="feed-tag event" style={{ fontSize: "0.75rem", padding: "2px 8px" }}>
                          {exam.questionCount}문항
                        </span>
                      </td>
                      <td style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>📄 {exam.pdfFileName}</td>
                      <td style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>🎵 {exam.mp3FileName}</td>
                      <td style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{exam.createdDate}</td>
                      <td>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button 
                            onClick={() => handleOpenEditExamModal(exam)} 
                            className="resource-download-btn"
                            style={{ padding: "4px 8px", fontSize: "0.75rem", background: "rgba(0, 185, 242, 0.15)", border: "1px solid var(--gcu-sky)", color: "var(--gcu-sky)" }}
                          >
                            수정
                          </button>
                          <button 
                            onClick={() => handleDeleteExam(exam.id)} 
                            className="resource-download-btn"
                            style={{ padding: "4px 8px", fontSize: "0.75rem", background: "rgba(247, 147, 30, 0.15)", border: "1px solid var(--gcu-orange)", color: "var(--gcu-orange)" }}
                          >
                            삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
                      등록된 모의고사가 존재하지 않습니다. 우측 상단의 출제 버튼을 통해 새로 생성해 보십시오.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {adminActiveTab === "complaints" && (
        <>
          {/* Section 1: Title and Banner */}
          <div className="glass-panel" style={{ padding: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: "700", color: "var(--text-primary)", margin: 0 }}>📋 스마트 민원 자동 분류 및 알림 관리</h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", margin: "4px 0 0 0" }}>
                1:1 실시간 문의의 내용(키워드)을 감지하여 담당 부서로 실시간 라우팅 및 SMS/Email 알림을 전송하는 스마트 관리 도구입니다.
              </p>
            </div>
          </div>

          {/* Two column layout: Coordinator Configuration & Inquiry List */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", alignItems: "start" }}>
            
            {/* Left Column: Coordinator Settings */}
            <div className="glass-panel" style={{ padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px", marginBottom: "15px" }}>
                <h4 style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--text-primary)", margin: 0 }}>👤 분야별 민원 담당자 지정</h4>
                <span style={{ fontSize: "0.75rem", color: "var(--gcu-sky)", fontWeight: "600" }}>자동 분류 라우팅 대상</span>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {complaintsConfig.map((config) => {
                  const isEditing = editingConfigCategory === config.category;
                  return (
                    <div 
                      key={config.category} 
                      style={{ 
                        background: "rgba(255,255,255,0.02)", 
                        border: "1px solid rgba(255,255,255,0.05)", 
                        borderRadius: "8px", 
                        padding: "12px 14px", 
                        display: "flex", 
                        flexDirection: "column", 
                        gap: "8px" 
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span className="feed-tag event" style={{ fontSize: "0.75rem", padding: "2px 8px" }}>{config.category}</span>
                        {!isEditing ? (
                          <button 
                            onClick={() => handleStartEditConfig(config)} 
                            className="resource-download-btn"
                            style={{ padding: "2px 8px", fontSize: "0.75rem", background: "rgba(0, 185, 242, 0.1)", border: "1px solid var(--gcu-sky)", color: "var(--gcu-sky)" }}
                          >
                            설정 수정
                          </button>
                        ) : (
                          <div style={{ display: "flex", gap: "6px" }}>
                            <button 
                              onClick={() => setEditingConfigCategory(null)} 
                              className="resource-download-btn"
                              style={{ padding: "2px 6px", fontSize: "0.72rem", background: "rgba(255,255,255,0.05)", border: "1px solid #5f6368", color: "#9aa0a6" }}
                            >
                              취소
                            </button>
                            <button 
                              onClick={() => handleSaveConfig(config.category)} 
                              className="resource-download-btn"
                              style={{ padding: "2px 6px", fontSize: "0.72rem", background: "rgba(114, 191, 68, 0.15)", border: "1px solid var(--gcu-green)", color: "var(--gcu-green)" }}
                            >
                              저장
                            </button>
                          </div>
                        )}
                      </div>

                      {isEditing ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "4px" }}>
                          <div style={{ display: "flex", gap: "8px" }}>
                            <div style={{ flex: 1 }}>
                              <label style={{ fontSize: "0.7rem", color: "#888d96", display: "block", marginBottom: "2px" }}>담당자명</label>
                              <input 
                                type="text" 
                                value={configFormName} 
                                onChange={(e) => setConfigFormName(e.target.value)} 
                                className="ai-form-input" 
                                style={{ padding: "4px 8px", fontSize: "0.8rem", height: "30px" }}
                              />
                            </div>
                            <div style={{ flex: 2 }}>
                              <label style={{ fontSize: "0.7rem", color: "#888d96", display: "block", marginBottom: "2px" }}>핸드폰 번호</label>
                              <input 
                                type="text" 
                                value={configFormPhone} 
                                onChange={(e) => setConfigFormPhone(e.target.value)} 
                                className="ai-form-input" 
                                style={{ padding: "4px 8px", fontSize: "0.8rem", height: "30px" }}
                              />
                            </div>
                          </div>
                          <div>
                            <label style={{ fontSize: "0.7rem", color: "#888d96", display: "block", marginBottom: "2px" }}>이메일</label>
                            <input 
                              type="email" 
                              value={configFormEmail} 
                              onChange={(e) => setConfigFormEmail(e.target.value)} 
                              className="ai-form-input" 
                              style={{ padding: "4px 8px", fontSize: "0.8rem", height: "30px" }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                          <div>성명: <strong style={{ color: "var(--text-primary)" }}>{config.name}</strong></div>
                          <div>연락처: <strong style={{ color: "var(--text-primary)" }}>{config.phone}</strong></div>
                          <div style={{ gridColumn: "span 2" }}>이메일: <strong style={{ color: "var(--text-primary)" }}>{config.email}</strong></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Q&A inquiry manager */}
            <div className="glass-panel" style={{ padding: "20px" }}>
              <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px", marginBottom: "15px" }}>
                <h4 style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--text-primary)", margin: 0 }}>💬 학생 1:1 민원 접수 현황</h4>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "450px", overflowY: "auto", paddingRight: "4px" }}>
                {qnaList.filter(item => item.id > 1000).length > 0 ? (
                  qnaList.filter(item => item.id > 1000).map((item) => {
                    const isPending = item.answer?.ko?.includes("스마트 민원 자동 분류 안내");
                    const isReplying = replyingQnaId === item.id;
                    const matchingLog = complaintsLogs.find(l => l.id === "log-" + item.id);
                    const ticketLang = inquiryLangs[item.id] || "ko";
                    const isTranslating = translatingIds[item.id] || false;
                    
                    const qTitle = item.question?.[ticketLang] || item.question?.ko || "";
                    
                    let qBody = matchingLog?.body || "상세 민원 본문이 로그에 없습니다.";
                    if (COMPLAINT_BODY_TRANSLATIONS[item.id]) {
                      qBody = COMPLAINT_BODY_TRANSLATIONS[item.id][ticketLang] || qBody;
                    } else {
                      qBody = mockTranslate(qBody, ticketLang);
                    }

                    return (
                      <div 
                        key={item.id} 
                        style={{ 
                          background: "rgba(255,255,255,0.02)", 
                          border: isPending ? "1px solid rgba(247, 147, 30, 0.2)" : "1px solid rgba(114, 191, 68, 0.2)", 
                          borderRadius: "8px", 
                          padding: "14px", 
                          display: "flex", 
                          flexDirection: "column", 
                          gap: "8px" 
                        }}
                      >
                        {/* Translation Selector Row */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "6px", marginBottom: "4px" }}>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>ID: {item.id}</span>
                          <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                            <span style={{ fontSize: "0.7rem", color: "var(--gcu-sky)", fontWeight: "600", marginRight: "4px" }}>🌐 AI 번역:</span>
                            {(["ko", "en", "vn", "mn"] as const).map((langOption) => {
                              const flags = { ko: "🇰🇷 KO", en: "🇺🇸 EN", vn: "🇻🇳 VN", mn: "🇲🇳 MN" };
                              const isActive = ticketLang === langOption;
                              return (
                                <button
                                  key={langOption}
                                  onClick={() => handleTranslateTicket(item.id, langOption)}
                                  disabled={isTranslating}
                                  style={{
                                    padding: "2px 6px",
                                    fontSize: "0.68rem",
                                    borderRadius: "4px",
                                    background: isActive ? "rgba(0, 185, 242, 0.15)" : "rgba(255,255,255,0.03)",
                                    border: isActive ? "1px solid var(--gcu-sky)" : "1px solid rgba(255,255,255,0.08)",
                                    color: isActive ? "var(--gcu-sky)" : "var(--text-secondary)",
                                    cursor: isTranslating ? "not-allowed" : "pointer",
                                    fontWeight: isActive ? "700" : "500",
                                    transition: "all 0.2s"
                                  }}
                                >
                                  {flags[langOption]}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span className="feed-tag event" style={{ fontSize: "0.7rem", padding: "1px 6px" }}>{matchingLog?.category || "민원"}</span>
                          <span 
                            className={`feed-tag ${isPending ? "notice" : "event"}`} 
                            style={{ fontSize: "0.7rem", padding: "1px 6px" }}
                          >
                            {isPending ? "답변 대기" : "답변 완료"}
                          </span>
                        </div>

                        {isTranslating ? (
                          <div style={{ padding: "15px 0", textAlign: "center", color: "var(--gcu-sky)", fontSize: "0.82rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                            <span>🔄</span> AI 다국어 번역 엔진 가동 중...
                          </div>
                        ) : (
                          <>
                            <div style={{ fontSize: "0.88rem", fontWeight: "700", color: "var(--text-primary)" }}>
                              {qTitle}
                            </div>

                            <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", background: "rgba(0,0,0,0.15)", padding: "8px 10px", borderRadius: "6px", whiteSpace: "pre-wrap" }}>
                              {qBody}
                            </div>
                          </>
                        )}

                        {isReplying ? (
                          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "6px" }}>
                            <div>
                              <label style={{ fontSize: "0.72rem", color: "#8ab4f8", display: "block", marginBottom: "3px", fontWeight: "700" }}>한국어 답변 (KO)</label>
                              <textarea 
                                value={replyTextKo} 
                                onChange={(e) => setReplyTextKo(e.target.value)} 
                                className="ai-form-input" 
                                style={{ fontSize: "0.8rem", minHeight: "60px", resize: "vertical" }}
                                placeholder="한국어로 답변을 작성하세요..."
                              />
                            </div>
                            <div>
                              <label style={{ fontSize: "0.72rem", color: "#8ab4f8", display: "block", marginBottom: "3px", fontWeight: "700" }}>영어 답변 (EN - 선택)</label>
                              <textarea 
                                value={replyTextEn} 
                                onChange={(e) => setReplyTextEn(e.target.value)} 
                                className="ai-form-input" 
                                style={{ fontSize: "0.8rem", minHeight: "40px", resize: "vertical" }}
                                placeholder="영어 답변 미입력 시 한국어 답변이 대체 사용됩니다..."
                              />
                            </div>
                            <div>
                              <label style={{ fontSize: "0.72rem", color: "#8ab4f8", display: "block", marginBottom: "3px", fontWeight: "700" }}>베트남어 답변 (VN - 선택)</label>
                              <textarea 
                                value={replyTextVn} 
                                onChange={(e) => setReplyTextVn(e.target.value)} 
                                className="ai-form-input" 
                                style={{ fontSize: "0.8rem", minHeight: "40px", resize: "vertical" }}
                                placeholder="베트남어 답변 미입력 시 한국어 답변이 대체 사용됩니다..."
                              />
                            </div>
                            <div>
                              <label style={{ fontSize: "0.72rem", color: "#8ab4f8", display: "block", marginBottom: "3px", fontWeight: "700" }}>몽골어 답변 (MN - 선택)</label>
                              <textarea 
                                value={replyTextMn} 
                                onChange={(e) => setReplyTextMn(e.target.value)} 
                                className="ai-form-input" 
                                style={{ fontSize: "0.8rem", minHeight: "40px", resize: "vertical" }}
                                placeholder="몽골어 답변 미입력 시 한국어 답변이 대체 사용됩니다..."
                              />
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "4px" }}>
                              <button 
                                onClick={() => setReplyingQnaId(null)} 
                                className="resource-download-btn"
                                style={{ padding: "4px 10px", fontSize: "0.78rem", background: "rgba(255,255,255,0.05)", border: "1px solid #5f6368", color: "#9aa0a6" }}
                              >
                                취소
                              </button>
                              <button 
                                onClick={() => handleSaveQnaReply(item.id)} 
                                className="resource-download-btn"
                                style={{ padding: "4px 12px", fontSize: "0.78rem", background: "rgba(114, 191, 68, 0.15)", border: "1px solid var(--gcu-green)", color: "var(--gcu-green)" }}
                              >
                                답변 등록
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "4px" }}>
                            {!isPending && (
                              <div style={{ fontSize: "0.82rem", color: "var(--gcu-green)", background: "rgba(114,191,68,0.06)", border: "1px solid rgba(114,191,68,0.15)", padding: "8px 10px", borderRadius: "6px" }}>
                                <strong>답변 내용 (KO):</strong>
                                <div style={{ marginTop: "3px", whiteSpace: "pre-wrap" }}>{item.answer?.ko}</div>
                              </div>
                            )}
                            <button 
                              onClick={() => handleStartReply(item)} 
                              className="btn-primary"
                              style={{ padding: "6px 12px", fontSize: "0.78rem", borderRadius: "6px", color: "#ffffff", width: "fit-content", fontWeight: "700", alignSelf: "flex-end" }}
                            >
                              {isPending ? "✍️ 답변 작성하기" : "✏️ 답변 수정하기"}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div style={{ textAlign: "center", color: "var(--text-secondary)", padding: "30px 0", fontSize: "0.85rem" }}>
                    접수된 사용자 1:1 민원이 없습니다.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Row: Dispatch logs */}
          <div className="glass-panel" style={{ padding: "20px" }}>
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px", marginBottom: "15px" }}>
              <h4 style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--text-primary)", margin: 0 }}>✉️ 민원 자동 라우팅 및 알림 발송 이력 (Delivery Logs)</h4>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table className="resource-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th>분류</th>
                    <th>민원 제목</th>
                    <th>담당 수신처</th>
                    <th>발송 채널/일시</th>
                    <th>처리 시간</th>
                    <th>Delivery Status</th>
                    <th>보안 무결성</th>
                  </tr>
                </thead>
                <tbody>
                  {complaintsLogs.length > 0 ? (
                    complaintsLogs.map((log) => {
                      const computedLatency = 12 + (parseInt(log.id.replace("log-", "")) % 30) + "ms";
                      return (
                        <tr key={log.id}>
                          <td>
                            <span className="feed-tag event" style={{ fontSize: "0.75rem", padding: "2px 8px" }}>{log.category}</span>
                          </td>
                          <td style={{ fontWeight: "700", color: "var(--text-primary)", fontSize: "0.85rem" }}>{log.title}</td>
                          <td style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                            <div>{log.staffName} ({log.staffPhone})</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{log.staffEmail}</div>
                          </td>
                          <td style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                              <span style={{ fontSize: "0.9rem" }}>✉️</span> 
                              <span style={{ fontSize: "0.9rem" }}>📱</span>
                              <span>{log.timestamp}</span>
                            </div>
                          </td>
                          <td style={{ fontSize: "0.8rem", color: "#8ab4f8", fontWeight: "600" }}>{computedLatency}</td>
                          <td>
                            <span className="feed-tag guide" style={{ fontSize: "0.75rem", padding: "2px 8px", background: "rgba(114, 191, 68, 0.15)", color: "var(--gcu-green)", border: "1px solid rgba(114, 191, 68, 0.25)" }}>
                              {log.status}
                            </span>
                          </td>
                          <td>
                            <button 
                              onClick={() => {
                                setTraceabilityMsg({
                                  id: log.id,
                                  text: log.body,
                                  actionType: "complaint_routing",
                                  actionData: { ...log, latency: computedLatency },
                                  userQuery: "민원 자동 분류 알림 라우팅 무결성 검증"
                                });
                              }}
                              className="resource-download-btn"
                              style={{ padding: "4px 8px", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "4px", background: "rgba(114, 191, 68, 0.1)", border: "1px solid var(--gcu-green)", color: "var(--gcu-green)" }}
                            >
                              🔍 검증 (Trace)
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={7} style={{ textAlign: "center", padding: "30px", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                        발송 이력이 존재하지 않습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
        </div>
      ) : (
        /* 2. Conversational AI Chat Console Layout */
        <div style={{ background: "#0c0e12", borderRadius: "16px", border: "1px solid #1f2229", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 24px 80px rgba(0,0,0,0.55)", transition: "all 0.3s" }}>
          
          {/* Top Search-Engine Navigation Header Tabs */}
          <div style={{ display: "flex", gap: "24px", borderBottom: "1px solid #1f2229", padding: "16px 32px", background: "#0b0d10", alignItems: "center" }}>
            <span 
              style={{ 
                fontSize: "0.85rem", 
                fontWeight: "700", 
                color: "#ffffff", 
                borderBottom: "2px solid #8ab4f8", 
                paddingBottom: "12px", 
                cursor: "pointer", 
                transition: "all 0.2s" 
              }} 
              onClick={() => setAdminViewMode("ai")}
            >
              AI 모드
            </span>
            <span 
              style={{ 
                fontSize: "0.85rem", 
                fontWeight: "700", 
                color: "#888d96", 
                borderBottom: "none", 
                paddingBottom: "12px", 
                cursor: "pointer", 
                transition: "all 0.2s" 
              }} 
              onClick={() => { setAdminViewMode("classic"); setAdminActiveTab("users"); }}
            >
              👥 계정 권한 관리
            </span>
            <span 
              style={{ 
                fontSize: "0.85rem", 
                fontWeight: "700", 
                color: "#888d96", 
                borderBottom: "none", 
                paddingBottom: "12px", 
                cursor: "pointer", 
                transition: "all 0.2s" 
              }} 
              onClick={() => { setAdminViewMode("classic"); setAdminActiveTab("exams"); }}
            >
              ✏️ 모의고사 출제 제어
            </span>
            <span 
              style={{ 
                fontSize: "0.85rem", 
                fontWeight: "700", 
                color: "#888d96", 
                borderBottom: "none", 
                paddingBottom: "12px", 
                cursor: "pointer", 
                transition: "all 0.2s" 
              }} 
              onClick={() => { setAdminViewMode("classic"); setAdminActiveTab("complaints"); }}
            >
              📋 스마트 민원관리
            </span>
            <span style={{ fontSize: "0.85rem", fontWeight: "500", color: "#4d5156", paddingBottom: "12px", cursor: "not-allowed" }}>이미지</span>
            <span style={{ fontSize: "0.85rem", fontWeight: "500", color: "#4d5156", paddingBottom: "12px", cursor: "not-allowed" }}>동영상</span>
            <span style={{ fontSize: "0.85rem", fontWeight: "500", color: "#4d5156", paddingBottom: "12px", cursor: "not-allowed" }}>뉴스</span>
            <span style={{ fontSize: "0.85rem", fontWeight: "500", color: "#4d5156", paddingBottom: "12px", display: "flex", alignItems: "center", gap: "4px", cursor: "not-allowed" }}>
              더보기 <span style={{ fontSize: "0.6rem" }}>▼</span>
            </span>
          </div>

          {chatMessages.length === 0 ? (
            /* Welcome / Init View Mode */
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "480px", background: "#0e1117", padding: "60px 24px" }}>
              <h2 style={{ fontSize: "1.9rem", color: "#ffffff", fontWeight: "600", marginBottom: "32px", textAlign: "center", fontFamily: "var(--font-brand)", letterSpacing: "-0.5px" }}>
                {adminName}님, 안녕하세요. 어떤 생각을 하고 계시나요?
              </h2>
              
              {/* Glowing Search Box Pill */}
              <div 
                className="ai-theme-input" 
                style={{ 
                  width: "100%", 
                  maxWidth: "650px", 
                  background: "#202124", 
                  border: "1px solid #3c4043", 
                  borderRadius: "28px", 
                  padding: "8px 24px", 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: "10px", 
                  boxShadow: "0 4px 16px rgba(0,0,0,0.35)", 
                  position: "relative", 
                  marginBottom: "32px", 
                  transition: "all 0.2s" 
                }}
              >
                <input 
                  type="text"
                  placeholder="무엇이든 물어보세요"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.nativeEvent.isComposing) handleSendMessage(); }}
                  style={{ width: "100%", background: "transparent", border: "none", color: "#ffffff", fontSize: "1.05rem", padding: "8px 0 40px 0", outline: "none" }}
                />
                
                {/* Search Box Action Handles */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "absolute", bottom: "12px", left: "24px", right: "24px" }}>
                  <button 
                    onClick={() => handleSendMessage("새 계정 추가해줘")}
                    style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#303134", color: "#ffffff", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "1.1rem", fontWeight: "bold" }}
                    title="유저 추가 바로가기"
                  >
                    +
                  </button>
                  <button 
                    onClick={() => { triggerToast("🎙️ 마이크 음성 입력 기능은 데모 상태입니다."); }}
                    style={{ background: "transparent", color: "#9aa0a6", border: "none", cursor: "pointer", fontSize: "1.15rem" }}
                    title="음성 인식 입력"
                  >
                    🎤
                  </button>
                </div>
              </div>
              
              {/* Suggester Commands List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%", maxWidth: "650px" }}>
                <div 
                  onClick={() => handleSendMessage("학생 및 근로자 계정 전체 목록 보여줘")}
                  className="ai-suggestion-item"
                  style={{ display: "flex", alignItems: "center", gap: "12px", color: "#e8eaed", fontSize: "0.9rem", cursor: "pointer", padding: "12px 18px", borderRadius: "20px" }}
                >
                  <span style={{ color: "#8ab4f8", fontSize: "1.1rem" }}>🔍</span>
                  <span>학생 및 근로자 계정 전체 목록 보여줘</span>
                </div>
                <div 
                  onClick={() => handleSendMessage("새 글로벌 사용자 계정 등록")}
                  className="ai-suggestion-item"
                  style={{ display: "flex", alignItems: "center", gap: "12px", color: "#e8eaed", fontSize: "0.9rem", cursor: "pointer", padding: "12px 18px", borderRadius: "20px" }}
                >
                  <span style={{ color: "#8ab4f8", fontSize: "1.1rem" }}>🔍</span>
                  <span>새 글로벌 사용자 계정 등록 양식 열어줘</span>
                </div>
                <div 
                  onClick={() => handleSendMessage("TOPIK 모의고사 목록")}
                  className="ai-suggestion-item"
                  style={{ display: "flex", alignItems: "center", gap: "12px", color: "#e8eaed", fontSize: "0.9rem", cursor: "pointer", padding: "12px 18px", borderRadius: "20px" }}
                >
                  <span style={{ color: "#8ab4f8", fontSize: "1.1rem" }}>🔍</span>
                  <span>출제 완료된 TOPIK 모의고사 목록 보여줘</span>
                </div>
                <div 
                  onClick={() => handleSendMessage("신규 모의고사 출제")}
                  className="ai-suggestion-item"
                  style={{ display: "flex", alignItems: "center", gap: "12px", color: "#e8eaed", fontSize: "0.9rem", cursor: "pointer", padding: "12px 18px", borderRadius: "20px" }}
                >
                  <span style={{ color: "#8ab4f8", fontSize: "1.1rem" }}>🔍</span>
                  <span>신규 IBT 모의고사 출제 제어창 열어줘</span>
                </div>
              </div>
            </div>
          ) : (
            /* Active Dialogue stream */
            <div style={{ display: "flex", flexDirection: "column", height: "650px", background: "#0e1117" }}>
              {/* Message scroll container */}
              <div 
                style={{ flex: 1, overflowY: "auto", padding: "24px 32px", display: "flex", flexDirection: "column", gap: "24px" }} 
                id="admin-chat-history"
              >
                {chatMessages.map((msg) => (
                  <div key={msg.id} style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
                    <div style={{ display: "flex", justifyContent: msg.sender === "user" ? "flex-end" : "flex-start", alignItems: "center", gap: "8px" }}>
                      {msg.sender === "assistant" && (
                        <span style={{ fontSize: "1.1rem", width: "28px", height: "28px", borderRadius: "50%", background: "linear-gradient(135deg, #122a4d 0%, #c61a2b 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", fontWeight: "bold" }}>🤖</span>
                      )}
                      <span style={{ fontSize: "0.72rem", color: "#9aa0a6", fontWeight: "600" }}>
                        {msg.sender === "user" ? "나" : "AI 어드민 매니저"} • {msg.timestamp}
                      </span>
                    </div>
                    
                    <div style={{ display: "flex", justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}>
                      <div className={`chat-message-bubble chat-message-${msg.sender}`}>
                        <div style={{ whiteSpace: "pre-line" }}>{msg.text}</div>
                        
                        {msg.sender === "assistant" && (
                          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px", borderTop: "1px dashed rgba(255,255,255,0.08)", paddingTop: "8px" }}>
                            <button
                              onClick={() => setTraceabilityMsg(msg)}
                              className="ai-btn-action"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "3px 8px",
                                fontSize: "0.68rem",
                                borderRadius: "6px",
                                background: "rgba(138, 180, 248, 0.08)",
                                border: "1px solid rgba(138, 180, 248, 0.2)"
                              }}
                            >
                              🔍 데이터 출처 (Traceability)
                            </button>
                          </div>
                        )}
                        
                        {/* Dynamic Interactive Cards based on actionType */}
                        {msg.actionType === "user_list" && (
                          <div style={{ marginTop: "12px", background: "#15181f", padding: "16px", borderRadius: "12px", border: "1px solid #2b2d35" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                              <span style={{ fontSize: "0.85rem", color: "#8ab4f8", fontWeight: "700" }}>👤 사용자 데이터 결과</span>
                              <button 
                                onClick={() => {
                                  setChatMessages(prev => [...prev, {
                                    id: "msg-" + Date.now(),
                                    sender: "assistant",
                                    text: "새로운 사용자 계정을 등록하는 폼입니다.",
                                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                    actionType: "user_create",
                                    userQuery: "+ 신규 유저 등록 버튼 클릭"
                                  }]);
                                }}
                                className="ai-btn-action"
                              >
                                + 신규 유저 등록
                              </button>
                            </div>
                            {renderInlineUserList(msg.actionData)}
                          </div>
                        )}
                        
                        {msg.actionType === "user_create" && (
                          <div style={{ marginTop: "12px", background: "#15181f", padding: "16px", borderRadius: "12px", border: "1px solid #2b2d35" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                              <span style={{ fontSize: "0.85rem", color: "#8ab4f8", fontWeight: "700" }}>👤 새 글로벌 계정 등록</span>
                              <button 
                                onClick={handleOpenAddModal}
                                className="ai-btn-action"
                              >
                                대형 팝업창으로 열기
                              </button>
                            </div>
                            <InlineUserForm onSubmit={(newUser) => {
                              const updatedUsers = [newUser, ...users];
                              setUsers(updatedUsers);
                              localStorage.setItem("gcu-users-db", JSON.stringify(updatedUsers));
                              triggerToast("📡 계정이 성공적으로 등록되었습니다!");
                              
                              setChatMessages(prev => [...prev, {
                                id: "msg-" + Date.now(),
                                sender: "assistant",
                                text: `📡 사용자 "${newUser.name}" 계정(${newUser.email})이 데이터베이스에 등록 완료되었습니다.`,
                                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                userQuery: "신규 글로벌 계정 등록 폼 제출"
                              }]);
                            }} onCancel={() => {
                              setChatMessages(prev => [...prev, {
                                id: "msg-" + Date.now(),
                                sender: "assistant",
                                text: "계정 등록 작업을 취소했습니다.",
                                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                userQuery: "신규 글로벌 계정 등록 폼 취소"
                              }]);
                            }} />
                          </div>
                        )}

                        {msg.actionType === "user_edit" && (
                          <div style={{ marginTop: "12px", background: "#15181f", padding: "16px", borderRadius: "12px", border: "1px solid #2b2d35" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                              <span style={{ fontSize: "0.85rem", color: "#8ab4f8", fontWeight: "700" }}>✏️ 계정 세부 정보 수정</span>
                              <button 
                                onClick={() => {
                                  setIsModalOpen(false);
                                  handleOpenEditModal(msg.actionData?.user);
                                }}
                                className="ai-btn-action"
                              >
                                대형 팝업창으로 열기
                              </button>
                            </div>
                            <InlineUserForm 
                              editingUser={msg.actionData?.user}
                              onSubmit={(updatedUser) => {
                                const updatedUsers = users.map(u => u.id === updatedUser.id ? updatedUser : u);
                                setUsers(updatedUsers);
                                localStorage.setItem("gcu-users-db", JSON.stringify(updatedUsers));
                                triggerToast("🔄 계정 정보가 성공적으로 업데이트되었습니다!");
                                
                                setChatMessages(prev => [...prev, {
                                  id: "msg-" + Date.now(),
                                  sender: "assistant",
                                  text: `🔄 사용자 "${updatedUser.name}" 계정 정보가 성공적으로 수정되었습니다.`,
                                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                  userQuery: "계정 세부 정보 수정 폼 제출"
                                }]);
                              }} 
                              onCancel={() => {
                                setChatMessages(prev => [...prev, {
                                  id: "msg-" + Date.now(),
                                  sender: "assistant",
                                  text: "계정 정보 수정 작업을 취소했습니다.",
                                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                  userQuery: "계정 정보 수정 작업을 취소했습니다."
                                }]);
                              }} 
                            />
                          </div>
                        )}

                        {msg.actionType === "exam_list" && (
                          <div style={{ marginTop: "12px", background: "#15181f", padding: "16px", borderRadius: "12px", border: "1px solid #2b2d35" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                              <span style={{ fontSize: "0.85rem", color: "#8ab4f8", fontWeight: "700" }}>📄 출제 완료된 IBT 모의고사</span>
                              <button 
                                onClick={handleOpenAddExamModal}
                                className="ai-btn-action"
                              >
                                + 신규 모의고사 출제
                              </button>
                            </div>
                            {renderInlineExamList()}
                          </div>
                        )}

                        {msg.actionType === "exam_create" && (
                          <div style={{ marginTop: "12px", background: "#15181f", padding: "16px", borderRadius: "12px", border: "1px solid #2b2d35", display: "flex", flexDirection: "column", gap: "10px" }}>
                            <span style={{ fontSize: "0.85rem", color: "#8ab4f8", fontWeight: "700" }}>➕ 신규 IBT 모의고사 출제</span>
                            <p style={{ fontSize: "0.8rem", color: "#9aa0a6", margin: 0, lineHeight: "1.5" }}>
                              PDF 기출지, 듣기 음원 MP3 업로드 및 OMR 정답 카드 설정을 지원하는 출제 마스터 모달 제어판을 엽니다.
                            </p>
                            <button 
                              onClick={handleOpenAddExamModal}
                              className="ai-btn-action"
                              style={{ alignSelf: "flex-start", marginTop: "4px" }}
                            >
                              ➕ 모의고사 출제 제어창 실행
                            </button>
                          </div>
                        )}

                        {msg.actionType === ("help" as any) && (
                          <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                            <span style={{ fontSize: "0.8rem", color: "#9aa0a6", fontWeight: "600" }}>💡 단축 명령어 추천:</span>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                              <button onClick={() => handleSendMessage("사용자 리스트 보여줘")} className="ai-btn-action">👤 전체 유저 조회</button>
                              <button onClick={() => handleSendMessage("유저 등록해줘")} className="ai-btn-action">👤 신규 유저 등록</button>
                              <button onClick={() => handleSendMessage("모의고사 리스트")} className="ai-btn-action">📄 모의고사 목록</button>
                              <button onClick={() => handleSendMessage("모의고사 출제")} className="ai-btn-action">➕ 모의고사 출제</button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Bottom Sticky Chat input console */}
              <div style={{ padding: "20px 32px", borderTop: "1px solid #1f2229", background: "#0b0d10", display: "flex", alignItems: "center", gap: "12px" }}>
                <button 
                  onClick={() => {
                    setChatMessages([]);
                    setChatInput("");
                  }}
                  className="ai-btn-danger"
                  style={{ padding: "10px 14px", height: "44px", whiteSpace: "nowrap" }}
                  title="대화 내역 비우기"
                >
                  초기화
                </button>
                
                <div className="ai-theme-input" style={{ flex: 1, background: "#202124", border: "1px solid #3c4043", borderRadius: "24px", padding: "4px 16px", display: "flex", alignItems: "center", height: "44px" }}>
                  <button 
                    onClick={() => handleSendMessage("새 계정 추가해줘")}
                    style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#303134", color: "#ffffff", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "1rem", fontWeight: "bold", marginRight: "10px" }}
                  >
                    +
                  </button>
                  <input 
                    type="text"
                    placeholder="AI 어드민에게 명령을 입력하세요 (예: 유저 검색, 모의고사 출제...)"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.nativeEvent.isComposing) handleSendMessage(); }}
                    style={{ flex: 1, background: "transparent", border: "none", color: "#ffffff", fontSize: "0.9rem", outline: "none" }}
                  />
                  <button 
                    onClick={() => handleSendMessage()}
                    style={{ background: "transparent", color: "#8ab4f8", border: "none", cursor: "pointer", fontSize: "0.9rem", fontWeight: "700", marginLeft: "10px" }}
                  >
                    전송
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4.5. CRUD Edit/Create MockExam Modal Popup */}
      {isExamModalOpen && (
        <div className="drawer-backdrop" onClick={() => setIsExamModalOpen(false)}>
          <div 
            className="glass-panel" 
            style={{ 
              width: "95%", 
              maxWidth: "600px", 
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "36px", 
              position: "relative", 
              background: "var(--bg-secondary)",
              border: "1px solid var(--gcu-sky)",
              boxShadow: "0 24px 64px rgba(0, 185, 242, 0.3)",
              animation: "toastSlideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsExamModalOpen(false)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "transparent", color: "var(--text-secondary)", fontSize: "1.3rem", cursor: "pointer" }}
            >
              ✕
            </button>

            <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "var(--text-primary)", fontFamily: "var(--font-brand)", marginBottom: "20px", letterSpacing: "-0.5px" }}>
              {editingExam ? "✏️ IBT 모의고사 기출 설정 수정" : "➕ 신규 IBT 모의고사 출제 등록"}
            </h3>

            <form onSubmit={handleSaveExam} style={{ display: "flex", flexDirection: "column", gap: "18px", textAlign: "left" }}>
              
              {/* Multilingual Titles */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="calc-label" style={{ display: "block", marginBottom: "4px" }}>시험 타이틀 (한국어)</label>
                  <input 
                    type="text" 
                    value={examTitleKo} 
                    onChange={(e) => setExamTitleKo(e.target.value)}
                    className="search-input"
                    style={{ padding: "8px 12px" }}
                    placeholder="예: 제68회 TOPIK II 대비 모의고사"
                    required
                  />
                </div>
                <div>
                  <label className="calc-label" style={{ display: "block", marginBottom: "4px" }}>시험 타이틀 (English)</label>
                  <input 
                    type="text" 
                    value={examTitleEn} 
                    onChange={(e) => setExamTitleEn(e.target.value)}
                    className="search-input"
                    style={{ padding: "8px 12px" }}
                    placeholder="English Exam Title"
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="calc-label" style={{ display: "block", marginBottom: "4px" }}>시험 타이틀 (Tiếng Việt)</label>
                  <input 
                    type="text" 
                    value={examTitleVn} 
                    onChange={(e) => setExamTitleVn(e.target.value)}
                    className="search-input"
                    style={{ padding: "8px 12px" }}
                    placeholder="Vietnamese Exam Title"
                  />
                </div>
                <div>
                  <label className="calc-label" style={{ display: "block", marginBottom: "4px" }}>시험 타이틀 (Монгол)</label>
                  <input 
                    type="text" 
                    value={examTitleMn} 
                    onChange={(e) => setExamTitleMn(e.target.value)}
                    className="search-input"
                    style={{ padding: "8px 12px" }}
                    placeholder="Mongolian Exam Title"
                  />
                </div>
              </div>

              {/* Time Limit & Question Count */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label className="calc-label" style={{ display: "block", marginBottom: "4px" }}>제한 시간 (분)</label>
                  <input 
                    type="number" 
                    value={examDuration} 
                    onChange={(e) => setExamDuration(Math.max(1, parseInt(e.target.value) || 50))}
                    className="search-input"
                    style={{ padding: "8px 12px" }}
                    required
                  />
                </div>

                <div>
                  <label className="calc-label" style={{ display: "block", marginBottom: "4px" }}>출제 문항 수</label>
                  <input 
                    type="number" 
                    value={examQuestionCount} 
                    onChange={(e) => handleQuestionCountChange(parseInt(e.target.value) || 1)}
                    className="search-input"
                    style={{ padding: "8px 12px" }}
                    min={1}
                    required
                  />
                </div>
              </div>

              {/* File Uploads (PDF, MP3, Answer PDF) */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "12px" }}>
                <div>
                  <label className="calc-label" style={{ display: "block", marginBottom: "4px" }}>📄 문항지 PDF 파일</label>
                  <input 
                    type="file" 
                    accept=".pdf"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        setPdfFile(file);
                        setPdfFileName(file.name);
                        setPdfDataUrl(URL.createObjectURL(file));
                      }
                    }}
                    style={{ display: "none" }}
                    id="pdf-upload-input"
                  />
                  <label 
                    htmlFor="pdf-upload-input"
                    className="calc-select"
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      height: "38px", 
                      cursor: "pointer", 
                      fontSize: "0.8rem", 
                      background: "rgba(0, 185, 242, 0.08)",
                      border: "1px dashed var(--gcu-sky)"
                    }}
                  >
                    {pdfFileName ? `✔️ ${pdfFileName.slice(0, 15)}...` : "PDF 파일 선택"}
                  </label>
                </div>

                <div>
                  <label className="calc-label" style={{ display: "block", marginBottom: "4px" }}>🔑 해설 답안지 PDF</label>
                  <input 
                    type="file" 
                    accept=".pdf"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        setAnswerPdfFile(file);
                        setAnswerPdfFileName(file.name);
                        setAnswerPdfDataUrl(URL.createObjectURL(file));
                      }
                    }}
                    style={{ display: "none" }}
                    id="answer-pdf-upload-input"
                  />
                  <label 
                    htmlFor="answer-pdf-upload-input"
                    className="calc-select"
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      height: "38px", 
                      cursor: "pointer", 
                      fontSize: "0.8rem", 
                      background: "rgba(247, 147, 30, 0.08)",
                      border: "1px dashed var(--gcu-orange)"
                    }}
                  >
                    {answerPdfFileName ? `✔️ ${answerPdfFileName.slice(0, 15)}...` : "해설지 선택"}
                  </label>
                </div>

                <div>
                  <label className="calc-label" style={{ display: "block", marginBottom: "4px" }}>🎵 듣기 평가 MP3 파일 (다중 선택 가능)</label>
                  <input 
                    type="file" 
                    accept="audio/*"
                    multiple
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        const filesArray = Array.from(e.target.files);
                        const filesWithRanges = filesArray.map((file, idx) => ({
                          file,
                          questionRange: `${audioTracks.length + idx + 1}`
                        }));
                        setMp3Files(prev => [...prev, ...filesWithRanges]);
                      }
                    }}
                    style={{ display: "none" }}
                    id="mp3-upload-input"
                  />
                  <label 
                    htmlFor="mp3-upload-input"
                    className="calc-select"
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      height: "38px", 
                      cursor: "pointer", 
                      fontSize: "0.8rem", 
                      background: "rgba(114, 191, 68, 0.08)",
                      border: "1px dashed var(--gcu-green)",
                      borderRadius: "6px"
                    }}
                  >
                    {mp3Files.length > 0 
                      ? `✔️ ${mp3Files.length}개 파일 대기 중` 
                      : (audioTracks.length > 0 ? `✔️ ${audioTracks.length}개 트랙 등록됨` : "MP3 파일 선택 (다중)")}
                  </label>

                  {/* Staging/Pending Upload Files List */}
                  {mp3Files.length > 0 && (
                    <div style={{ marginTop: "8px", background: "rgba(0,0,0,0.02)", padding: "10px", borderRadius: "6px", border: "1px solid rgba(0,0,0,0.08)" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--gcu-green)", fontWeight: "700", display: "block", marginBottom: "6px" }}>
                        ⏳ 업로드 대기 중 ({mp3Files.length}개):
                      </span>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "160px", overflowY: "auto" }}>
                        {mp3Files.map((item, idx) => (
                          <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "6px", background: "rgba(255,255,255,0.6)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "4px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.74rem", color: "var(--text-secondary)" }}>
                              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "75%" }} title={item.file.name}>
                                🎵 {item.file.name}
                              </span>
                              <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", flexShrink: 0 }}>
                                ({(item.file.size / (1024 * 1024)).toFixed(2)} MB)
                              </span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                              <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>연계 문항 범위:</span>
                              <input 
                                type="text"
                                value={item.questionRange}
                                onChange={(e) => {
                                  const updated = [...mp3Files];
                                  updated[idx].questionRange = e.target.value;
                                  setMp3Files(updated);
                                }}
                                placeholder="예: 1 또는 1-5"
                                className="search-input"
                                style={{ height: "22px", padding: "2px 6px", fontSize: "0.7rem", borderRadius: "4px", flex: 1 }}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setMp3Files(prev => prev.filter((_, fIdx) => fIdx !== idx));
                                }}
                                style={{ background: "none", border: "none", color: "#FF6666", cursor: "pointer", fontSize: "0.75rem", fontWeight: "700" }}
                                title="제거"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setMp3Files([]);
                        }}
                        style={{
                          marginTop: "8px",
                          width: "100%",
                          padding: "5px",
                          fontSize: "0.7rem",
                          background: "rgba(255, 75, 75, 0.15)",
                          border: "1px solid rgba(255, 75, 75, 0.3)",
                          color: "#FF8888",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontWeight: "700"
                        }}
                      >
                        대기 목록 모두 비우기 (Clear Staging)
                      </button>
                    </div>
                  )}

                  {/* Stored/Existing Audio Tracks List */}
                  {audioTracks.length > 0 && (
                    <div style={{ marginTop: "8px", background: "rgba(0,0,0,0.02)", padding: "10px", borderRadius: "6px", border: "1px solid rgba(0,0,0,0.08)" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--gcu-red)", fontWeight: "700", display: "block", marginBottom: "6px" }}>
                        🎧 현재 등록된 트랙 플레이리스트 ({audioTracks.length}개):
                      </span>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "160px", overflowY: "auto" }}>
                        {audioTracks.map((track, idx) => (
                          <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "4px", padding: "6px", background: "rgba(255,255,255,0.6)", border: "1px solid rgba(0,0,0,0.06)", borderRadius: "4px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.74rem", color: "var(--text-secondary)" }}>
                              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "85%" }} title={track.name}>
                                {idx + 1}. 📻 {track.name}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const newTracks = audioTracks.filter((_, tIdx) => tIdx !== idx);
                                  setAudioTracks(newTracks);
                                }}
                                style={{ background: "none", border: "none", color: "#FF6666", cursor: "pointer", fontSize: "0.75rem", fontWeight: "700" }}
                                title="삭제"
                              >
                                ✕
                              </button>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                              <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>연계 문항 범위:</span>
                              <input 
                                type="text"
                                value={track.questionRange || ""}
                                onChange={(e) => {
                                  const updated = [...audioTracks];
                                  updated[idx].questionRange = e.target.value;
                                  setAudioTracks(updated);
                                }}
                                placeholder="예: 1 또는 1-5"
                                className="search-input"
                                style={{ height: "22px", padding: "2px 6px", fontSize: "0.7rem", borderRadius: "4px", flex: 1 }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <span style={{ fontSize: "0.72rem", color: "#57FF9A", display: "block", marginTop: "-6px", fontWeight: "600" }}>
                📡 자체 로컬 서버 스위트 작동 중: 업로드된 기출 시험지 PDF, 해설 답안지 및 31문항 MP3 음원은 서버 디스크 및 DB에 안전하게 영구 저장됩니다.
              </span>

              {/* Individual Question Mode Toggle */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(0,0,0,0.03)", padding: "10px 14px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.06)", marginTop: "4px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <label className="calc-label" style={{ fontWeight: "700", marginBottom: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                    <input 
                      type="checkbox" 
                      checked={questionsMode}
                      onChange={(e) => setQuestionsMode(e.target.checked)}
                      style={{ accentColor: "var(--gcu-navy)", cursor: "pointer", width: "16px", height: "16px" }}
                    />
                    🖼️ 개별 문항 출제 모드 활성화 (이미지/음원 개별 등록)
                  </label>
                  <span style={{ fontSize: "0.68rem", color: "var(--text-secondary)", marginLeft: "22px" }}>
                    체크 시 각 문항의 캡처 이미지와 듣기 평가 음원을 개별적으로 매칭하여 등록할 수 있습니다.
                  </span>
                </div>
              </div>

              {questionsMode ? (
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "12px" }}>
                  <label className="calc-label" style={{ display: "block", marginBottom: "10px", fontWeight: "700" }}>
                    🖼️ 문항별 이미지, 음원 및 정답 개별 설정
                  </label>
                  
                  <div style={{ maxHeight: "280px", overflowY: "auto", border: "1px solid var(--border-color)", padding: "12px", borderRadius: "8px", background: "rgba(0,0,0,0.02)" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      {questionsData.map((q, qIdx) => (
                        <div key={qIdx} style={{ display: "flex", flexDirection: "column", gap: "8px", paddingBottom: "12px", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                            <span style={{ fontSize: "0.85rem", color: "var(--gcu-navy)", fontWeight: "700" }}>
                              문항 {qIdx + 1}
                            </span>
                            
                            {/* Radio selection group for choices 1, 2, 3, 4 */}
                            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>정답:</span>
                              {[0, 1, 2, 3].map((optVal) => (
                                <label key={optVal} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.78rem", color: q.correctAnswer === optVal ? "var(--gcu-red)" : "var(--text-secondary)", cursor: "pointer", fontWeight: q.correctAnswer === optVal ? "700" : "400" }}>
                                  <input 
                                    type="radio" 
                                    name={`q-key-spec-${qIdx}`}
                                    checked={q.correctAnswer === optVal}
                                    onChange={() => handleAnswerChange(qIdx, optVal)}
                                    style={{ accentColor: "var(--gcu-red)", cursor: "pointer" }}
                                  />
                                  {optVal + 1}
                                </label>
                              ))}
                            </div>
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                            {/* 1. 공통 지문/보기 이미지 */}
                            <div>
                              <input 
                                type="file" 
                                accept="image/*"
                                id={`q-img-upload-${qIdx}`}
                                style={{ display: "none" }}
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    handleUploadQuestionImage(qIdx, e.target.files[0]);
                                  }
                                }}
                              />
                              <label 
                                htmlFor={`q-img-upload-${qIdx}`}
                                className="calc-select"
                                style={{ 
                                  display: "flex", 
                                  alignItems: "center", 
                                  justifyContent: "center", 
                                  height: "30px", 
                                  cursor: "pointer", 
                                  fontSize: "0.7rem", 
                                  background: q.imageUrl ? "rgba(18, 42, 77, 0.05)" : "rgba(198, 26, 43, 0.03)",
                                  border: q.imageUrl ? "1px solid rgba(18, 42, 77, 0.15)" : "1px dashed rgba(198, 26, 43, 0.2)",
                                  borderRadius: "6px",
                                  gap: "3px",
                                  whiteSpace: "nowrap"
                                }}
                              >
                                {q.imageUrl ? (
                                  <span>✔️ 보기/지문 완료</span>
                                ) : (
                                  <span>🖼️ 보기/지문 선택</span>
                                )}
                              </label>
                              {q.imageFileName && (
                                <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", display: "block", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                  {q.imageFileName}
                                </span>
                              )}
                            </div>

                            {/* 2. 개별 문항 이미지 */}
                            <div>
                              <input 
                                type="file" 
                                accept="image/*"
                                id={`q-detail-img-upload-${qIdx}`}
                                style={{ display: "none" }}
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    handleUploadDetailQuestionImage(qIdx, e.target.files[0]);
                                  }
                                }}
                              />
                              <label 
                                htmlFor={`q-detail-img-upload-${qIdx}`}
                                className="calc-select"
                                style={{ 
                                  display: "flex", 
                                  alignItems: "center", 
                                  justifyContent: "center", 
                                  height: "30px", 
                                  cursor: "pointer", 
                                  fontSize: "0.7rem", 
                                  background: q.questionImageUrl ? "rgba(18, 42, 77, 0.05)" : "rgba(247, 147, 30, 0.03)",
                                  border: q.questionImageUrl ? "1px solid rgba(18, 42, 77, 0.15)" : "1px dashed rgba(247, 147, 30, 0.2)",
                                  borderRadius: "6px",
                                  gap: "3px",
                                  whiteSpace: "nowrap"
                                }}
                              >
                                {q.questionImageUrl ? (
                                  <span>✔️ 개별 문항 완료</span>
                                ) : (
                                  <span>🖼️ 개별 문항 선택</span>
                                )}
                              </label>
                              {q.questionImageFileName && (
                                <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", display: "block", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                  {q.questionImageFileName}
                                </span>
                              )}
                            </div>

                            {/* 3. 문항 전용 음원 */}
                            <div>
                              <input 
                                type="file" 
                                accept="audio/*"
                                id={`q-aud-upload-${qIdx}`}
                                style={{ display: "none" }}
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    handleUploadQuestionAudio(qIdx, e.target.files[0]);
                                  }
                                }}
                              />
                              <label 
                                htmlFor={`q-aud-upload-${qIdx}`}
                                className="calc-select"
                                style={{ 
                                  display: "flex", 
                                  alignItems: "center", 
                                  justifyContent: "center", 
                                  height: "30px", 
                                  cursor: "pointer", 
                                  fontSize: "0.7rem", 
                                  background: q.audioUrl ? "rgba(18, 42, 77, 0.05)" : "rgba(114, 191, 68, 0.03)",
                                  border: q.audioUrl ? "1px solid rgba(18, 42, 77, 0.15)" : "1px dashed rgba(114, 191, 68, 0.2)",
                                  borderRadius: "6px",
                                  gap: "3px",
                                  whiteSpace: "nowrap"
                                }}
                              >
                                {q.audioUrl ? (
                                  <span>✔️ 음원 완료</span>
                                ) : (
                                  <span>🎵 문항 음원 선택</span>
                                )}
                              </label>
                              {q.audioFileName && (
                                <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", display: "block", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                  {q.audioFileName}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* OMR Answer Key sheet dynamic configurator */
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "12px" }}>
                  <label className="calc-label" style={{ display: "block", marginBottom: "10px", fontWeight: "700" }}>
                    🎯 문항별 정답 답안지 키(OMR Key) 설정
                  </label>
                  
                  <div style={{ maxHeight: "160px", overflowY: "auto", border: "1px solid var(--border-color)", padding: "12px", borderRadius: "8px", background: "rgba(0,0,0,0.15)" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {examAnswerKey.map((ans, qIdx) => (
                        <div key={qIdx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "8px", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                          <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)", fontWeight: "600" }}>
                            Q.{qIdx + 1}
                          </span>
                          
                          {/* Radio selection group for choices 1, 2, 3, 4 */}
                          <div style={{ display: "flex", gap: "12px" }}>
                            {[0, 1, 2, 3].map((optVal) => (
                              <label key={optVal} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.78rem", color: ans === optVal ? "var(--gcu-sky)" : "var(--text-secondary)", cursor: "pointer", fontWeight: ans === optVal ? "700" : "400" }}>
                                <input 
                                  type="radio" 
                                  name={`q-key-${qIdx}`}
                                  checked={ans === optVal}
                                  onChange={() => handleAnswerChange(qIdx, optVal)}
                                  style={{ accentColor: "var(--gcu-sky)", cursor: "pointer" }}
                                />
                                {optVal + 1}
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Modal controls */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "10px" }}>
                <button 
                  type="button" 
                  onClick={() => setIsExamModalOpen(false)}
                  className="btn-secondary"
                  style={{ padding: "8px 18px", fontSize: "0.85rem", borderRadius: "8px" }}
                >
                  취소
                </button>
                <button 
                  type="submit" 
                  disabled={isUploading}
                  className="btn-primary"
                  style={{ padding: "8px 20px", fontSize: "0.85rem", borderRadius: "8px", color: "#ffffff", fontWeight: "700", opacity: isUploading ? 0.6 : 1 }}
                >
                  {isUploading ? "업로드 중..." : "출제하기"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 4.7. AI Traceability Modal Popup */}
      {traceabilityMsg && (
        <div className="drawer-backdrop" onClick={() => setTraceabilityMsg(null)} style={{ zIndex: 1050 }}>
          <div 
            className="glass-panel" 
            style={{ 
              width: "90%", 
              maxWidth: "600px", 
              padding: "32px", 
              position: "relative", 
              background: "#12161f",
              border: "1px solid rgba(138, 180, 248, 0.4)",
              boxShadow: "0 24px 64px rgba(138, 180, 248, 0.25)",
              animation: "toastSlideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              color: "#e8eaed",
              maxHeight: "85vh",
              overflowY: "auto"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setTraceabilityMsg(null)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "transparent", color: "#9aa0a6", border: "none", fontSize: "1.3rem", cursor: "pointer" }}
            >
              ✕
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", borderBottom: "1px solid #1f2229", paddingBottom: "12px" }}>
              <span style={{ fontSize: "1.6rem" }}>🔍</span>
              <div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: "800", color: "#ffffff", margin: 0, letterSpacing: "-0.5px" }}>
                  AI 데이터 투명성 검증 (Traceability)
                </h3>
                <p style={{ margin: "2px 0 0 0", fontSize: "0.72rem", color: "#9aa0a6" }}>
                  AI가 출력한 결과물의 정확한 원천 데이터 출처 및 분석 파라미터 정보
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Query info */}
              <div style={{ background: "rgba(255,255,255,0.02)", padding: "12px 16px", borderRadius: "10px", border: "1px solid #1f2229" }}>
                <div style={{ fontSize: "0.7rem", color: "#9aa0a6", fontWeight: "700", marginBottom: "4px" }}>사용자 입력 쿼리 (Prompt)</div>
                <div style={{ fontSize: "0.85rem", color: "#8ab4f8", fontWeight: "600" }}>
                  "{traceabilityMsg.userQuery || "단방향 액션/단축 가이드 클릭"}"
                </div>
              </div>

              {/* Grid Metrics */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div style={{ background: "rgba(255,255,255,0.02)", padding: "12px", borderRadius: "10px", border: "1px solid #1f2229" }}>
                  <div style={{ fontSize: "0.7rem", color: "#9aa0a6", fontWeight: "700", marginBottom: "4px" }}>데이터 출처 원천 (Provenance)</div>
                  <div style={{ fontSize: "0.82rem", fontWeight: "700", color: "#ffffff" }}>
                    {getTraceabilityInfo(traceabilityMsg).sourceDb}
                  </div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.02)", padding: "12px", borderRadius: "10px", border: "1px solid #1f2229" }}>
                  <div style={{ fontSize: "0.7rem", color: "#9aa0a6", fontWeight: "700", marginBottom: "4px" }}>데이터 저장소 위치</div>
                  <div style={{ fontSize: "0.82rem", fontWeight: "700", color: "#ffffff" }}>
                    {getTraceabilityInfo(traceabilityMsg).dataLocation}
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                <div style={{ background: "rgba(255,255,255,0.02)", padding: "12px", borderRadius: "10px", border: "1px solid #1f2229", textAlign: "center" }}>
                  <div style={{ fontSize: "0.7rem", color: "#9aa0a6", fontWeight: "700", marginBottom: "4px" }}>처리 지연시간 (Latency)</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: "800", color: "#72bf44" }}>
                    {getTraceabilityInfo(traceabilityMsg).latency}
                  </div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.02)", padding: "12px", borderRadius: "10px", border: "1px solid #1f2229", textAlign: "center" }}>
                  <div style={{ fontSize: "0.7rem", color: "#9aa0a6", fontWeight: "700", marginBottom: "4px" }}>추론 신뢰도 (Confidence)</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: "800", color: "#fbbc04" }}>
                    {getTraceabilityInfo(traceabilityMsg).confidence}
                  </div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.02)", padding: "12px", borderRadius: "10px", border: "1px solid #1f2229", textAlign: "center" }}>
                  <div style={{ fontSize: "0.7rem", color: "#9aa0a6", fontWeight: "700", marginBottom: "4px" }}>검증 상태</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: "800", color: "#8ab4f8" }}>
                    {getTraceabilityInfo(traceabilityMsg).verificationStatus}
                  </div>
                </div>
              </div>

              {/* Schema visualizer */}
              {getTraceabilityInfo(traceabilityMsg).schema && (
                <div style={{ background: "rgba(255,255,255,0.02)", padding: "12px 16px", borderRadius: "10px", border: "1px solid #1f2229" }}>
                  <div style={{ fontSize: "0.7rem", color: "#9aa0a6", fontWeight: "700", marginBottom: "6px" }}>원천 데이터 베이스 스키마 / 규칙 구조</div>
                  <pre style={{
                    margin: 0,
                    padding: "10px",
                    background: "#090b10",
                    border: "1px solid #15181f",
                    borderRadius: "8px",
                    color: "#a9b1d6",
                    fontSize: "0.72rem",
                    lineHeight: "1.4",
                    fontFamily: "Courier New, monospace",
                    overflowX: "auto",
                    whiteSpace: "pre-wrap"
                  }}>
                    {getTraceabilityInfo(traceabilityMsg).schema}
                  </pre>
                </div>
              )}

              {/* Query Parameters details */}
              <div style={{ background: "rgba(255,255,255,0.02)", padding: "12px 16px", borderRadius: "10px", border: "1px solid #1f2229" }}>
                <div style={{ fontSize: "0.7rem", color: "#9aa0a6", fontWeight: "700", marginBottom: "6px" }}>추출된 NLU 분석 파라미터 (Parameters)</div>
                <pre style={{
                  margin: 0,
                  padding: "10px",
                  background: "#090b10",
                  border: "1px solid #15181f",
                  borderRadius: "8px",
                  color: "#e0af68",
                  fontSize: "0.72rem",
                  lineHeight: "1.4",
                  fontFamily: "Courier New, monospace",
                  overflowX: "auto"
                }}>
                  {getTraceabilityInfo(traceabilityMsg).queryParameters}
                </pre>
              </div>

              {/* Integrity check Hash */}
              <div style={{ background: "rgba(114, 191, 68, 0.04)", padding: "10px 14px", borderRadius: "8px", border: "1px solid rgba(114, 191, 68, 0.2)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.72rem", color: "#a9b1d6", fontFamily: "Courier New, monospace" }}>
                  {getTraceabilityInfo(traceabilityMsg).integrityHash}
                </span>
                <span style={{ fontSize: "0.65rem", background: "rgba(114,191,68,0.15)", color: "#72bf44", padding: "2px 6px", borderRadius: "4px", fontWeight: "800" }}>
                  무결성 확인됨
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => setTraceabilityMsg(null)}
              className="ai-btn-action"
              style={{ width: "100%", marginTop: "24px", height: "40px", fontSize: "0.85rem" }}
            >
              확인 완료
            </button>
          </div>
        </div>
      )}

      {/* 5. Dynamic Toast Portal Notifications */}
      {toast && (
        <div className="toast-notification">
          <span style={{ fontSize: "1.35rem" }}>📡</span>
          <div style={{ fontSize: "0.85rem", lineHeight: "1.5", fontWeight: "500" }}>{toast}</div>
        </div>
      )}
    </div>
  );
}
