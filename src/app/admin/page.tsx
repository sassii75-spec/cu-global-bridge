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

export default function AdminPage() {
  const { lang } = useLanguage();
  const t = ADMIN_TRANSLATIONS[lang as "ko" | "en" | "vn" | "mn"] || ADMIN_TRANSLATIONS.ko;

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  // Tab State
  const [adminActiveTab, setAdminActiveTab] = useState<"users" | "exams">("users");

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
    audioUrl: string;
    audioFileName?: string;
    correctAnswer: number;
  }>>(new Array(10).fill(null).map((_, i) => ({
    id: i + 1,
    imageUrl: "",
    imageFileName: "",
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
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 2500);
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
          imageFileName: q.imageUrl ? "이미지 등록 완료" : "",
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
            본 제어판은 글로벌사이버대 글로벌 브릿지 최고 관리자(Admin) 권한 보유 계정으로만 개설 및 접근이 허가됩니다.
          </p>
          <a href="/" className="btn-primary" style={{ display: "inline-block" }}>
            {t.goHome}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
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
          onClick={() => setAdminActiveTab("users")}
          className={`comm-tab-btn ${adminActiveTab === "users" ? "active" : ""}`}
          style={{ padding: "10px 20px", fontSize: "0.9rem", fontWeight: "700", whiteSpace: "nowrap" }}
        >
          👥 계정 권한 관리
        </button>
        <button 
          onClick={() => setAdminActiveTab("exams")}
          className={`comm-tab-btn ${adminActiveTab === "exams" ? "active" : ""}`}
          style={{ padding: "10px 20px", fontSize: "0.9rem", fontWeight: "700", whiteSpace: "nowrap" }}
        >
          ✏️ 모의고사 출제 제어
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

                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                            {/* Image upload button */}
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
                                  fontSize: "0.75rem", 
                                  background: q.imageUrl ? "rgba(18, 42, 77, 0.05)" : "rgba(198, 26, 43, 0.05)",
                                  border: q.imageUrl ? "1px solid rgba(18, 42, 77, 0.15)" : "1px dashed rgba(198, 26, 43, 0.25)",
                                  borderRadius: "6px",
                                  gap: "4px"
                                }}
                              >
                                {q.imageUrl ? (
                                  <>
                                    <img src={q.imageUrl} style={{ width: "16px", height: "16px", objectFit: "cover", borderRadius: "2px" }} />
                                    <span>재업로드</span>
                                  </>
                                ) : (
                                  <span>🖼️ 문항 이미지 선택</span>
                                )}
                              </label>
                              {q.imageFileName && (
                                <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", display: "block", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                  {q.imageFileName}
                                </span>
                              )}
                            </div>

                            {/* Audio upload button */}
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
                                  fontSize: "0.75rem", 
                                  background: q.audioUrl ? "rgba(18, 42, 77, 0.05)" : "rgba(114, 191, 68, 0.05)",
                                  border: q.audioUrl ? "1px solid rgba(18, 42, 77, 0.15)" : "1px dashed rgba(114, 191, 68, 0.25)",
                                  borderRadius: "6px",
                                  gap: "4px"
                                }}
                              >
                                {q.audioUrl ? (
                                  <span>✔️ 음원 완료</span>
                                ) : (
                                  <span>🎵 문항 음원 선택</span>
                                )}
                              </label>
                              {q.audioFileName && (
                                <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", display: "block", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
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
