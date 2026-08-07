"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "./context/LanguageContext";
import { 
  DASHBOARD_TRANSLATIONS, 
  DAILY_PHRASES, 
  VISA_INFO, 
  JOBS_DATA, 
  SCHOLARSHIPS_DATA 
} from "./dashboardData";

// NOTICE_ITEMS with full multilingual translations
const NOTICE_ITEMS = [
  {
    id: 1,
    category: "notice",
    title: {
      ko: "[공지] 2026학년도 2학기 외국인 장학금 신청 안내",
      en: "[Notice] 2026 Fall Semester Scholarship Application for International Students",
      vn: "[Thông báo] Hướng dẫn đăng ký học bổng cho người nước ngoài kỳ 2 năm 2026",
      mn: "[Зар] 2026 оны 2-р улирлын гадаад оюутны тэтгэлэг хүсэх заавар"
    },
    date: "2026-06-01"
  },
  {
    id: 2,
    category: "notice",
    title: {
      ko: "[학사] 제68회 TOPIK 단체 접수 및 특별 대비반 개설",
      en: "[Academics] 68th TOPIK Group Registration & Special Prep Class Opening",
      vn: "[Học vụ] Đăng ký TOPIK tập thể lần thứ 68 & Khai giảng lớp ôn tập đặc biệt",
      mn: "[Сургууль] 68 дахь TOPIK нэгдсэн бүртгэл ба Бэлтгэл ангийн нээлт"
    },
    date: "2026-05-28"
  },
  {
    id: 3,
    category: "event",
    title: {
      ko: "[행사] 글로벌사이버대 제3회 세계시민 문화 페스티벌 개최",
      en: "[Event] Global Cyber University 3rd Global Citizen Culture Festival",
      vn: "[Sự kiện] Tổ chức Lễ hội Văn hóa Công dân Toàn cầu lần thứ 3 ĐH Global Cyber",
      mn: "[Арга хэмжээ] Глобал Сайбер Их Сургуулийн 3 дахь Дэлхийн иргэдийн соёлын наадам"
    },
    date: "2026-05-24"
  },
  {
    id: 4,
    category: "guide",
    title: {
      ko: "[안내] 외국인 유학생을 위한 주거 계약 및 임대차 사기 예방 특강",
      en: "[Guide] Special Lecture on Housing Contracts & Rental Fraud Prevention for Intl Students",
      vn: "[Hướng dẫn] Bài giảng phòng chống lừa đảo thuê nhà & hợp đồng nhà ở cho du học sinh",
      mn: "[Заавар] Гадаад оюутнуудад зориулсан байрны гэрээ ба түрээсийн луйвраас сэргийлэх лекц"
    },
    date: "2026-05-20"
  },
  {
    id: 5,
    category: "guide",
    title: {
      ko: "[취업] D-10 구직비자 전환 필수 교육 이수 일정 안내",
      en: "[Jobs] D-10 Job Seeking Visa Conversion Mandatory Training Schedule Info",
      vn: "[Việc làm] Thông báo lịch đào tạo bắt buộc để chuyển đổi sang Visa tìm việc D-10",
      mn: "[Ажил] D-10 виз рүү шилжихэд шаардлагатай албан ёсны сургалтын хуваарь"
    },
    date: "2026-05-18"
  }
];

const PARTNERS = [
  {
    name: {
      ko: "고용노동부 K-Work",
      en: "Ministry of Employment K-Work",
      vn: "Bộ Lao động K-Work",
      mn: "Хөдөлмөр, халамжийн үйлчилгээний K-Work"
    },
    url: "https://k-work.or.kr/",
    description: {
      ko: "정부 공식 고용 정보망 연동 및 외국인 맞춤형 일자리 찾기 지원",
      en: "Official government job network integration and customized vacancy search",
      vn: "Kết nối mạng thông tin tuyển dụng chính thức của chính phủ và hỗ trợ tìm việc làm",
      mn: "Засгийн газрын албан ёсны ажлын байрны сүлжээ ба гадаад иргэдэд зориулсан хайлт"
    },
    icon: "💼",
    color: "var(--gcu-sky)"
  },
  {
    name: {
      ko: "법무부 출입국·외국인정책본부",
      en: "Korea Immigration Service",
      vn: "Cục Quản lý Xuất nhập cảnh Bộ Tư pháp",
      mn: "Хууль зүйн яамны Шилжилт хөдөлгөөний алба"
    },
    url: "https://www.immigration.go.kr/",
    description: {
      ko: "국내 체류 외국인 비자 심사, 출입국 규정 및 정책 정보 가이드",
      en: "Residency visa screening, entry rules, and policy guidelines for foreigners",
      vn: "Thẩm định visa, quy định xuất nhập cảnh và hướng dẫn chính sách cho người nước ngoài",
      mn: "Гадаад иргэдийн визний хяналт, хилээр нэвтрэх журам, бодлогын зааварчилгаа"
    },
    icon: "⚖️",
    color: "var(--gcu-blue)"
  },
  {
    name: {
      ko: "한국산업인력공단",
      en: "Human Resources Development Service of Korea",
      vn: "Cơ quan Phát triển Nguồn nhân lực Hàn Quốc (HRDK)",
      mn: "БНСУ-ын Хүний нөөцийн хөгжлийн хэрэгжүүлэгч агентлаг"
    },
    url: "https://www.hrdkorea.or.kr/",
    description: {
      ko: "국가 직무 능력 표준 평가 및 외국인 숙련 기능 인력 자격 검정",
      en: "National competency standards evaluation and foreign skilled labor licensing",
      vn: "Đánh giá tiêu chuẩn năng lực nghề nghiệp quốc gia & sát hạch tay nghề người nước ngoài",
      mn: "Үндэсний мэргэжлийн ур чадварын үнэлгээ ба гадаад ур чадвартай ажилчдын шалгалт"
    },
    icon: "🏫",
    color: "var(--gcu-green)"
  },
  {
    name: {
      ko: "다문화종합정착지원포털 다누리",
      en: "Danuri Multicultural Portal",
      vn: "Cổng hỗ trợ định cư đa văn hóa Danuri",
      mn: "Олон соёлт гэр бүлийг дэมжих Данури портал"
    },
    url: "https://www.liveinkorea.kr/",
    description: {
      ko: "전국 다문화 가족 정착 정보 및 13개국어 종합 상담 전화 콜센터",
      en: "Settlement guides for multicultural families and 13-language helpdesk helpline",
      vn: "Thông tin định cư cho gia đình đa văn hóa toàn quốc & tổng đài tư vấn 13 ngôn ngữ",
      mn: "Гэр бүлийн суурьших зааварчилгаа ба 13 хэлний зөвлөгөө өгөх утасны төв"
    },
    icon: "🏠",
    color: "var(--gcu-orange)"
  },
  {
    name: {
      ko: "하이코리아 (Hi Korea)",
      en: "Hi Korea (Government for Foreigners)",
      vn: "Hi Korea (Cổng thông tin điện tử cho người nước ngoài)",
      mn: "Хайкориа (Гадаад иргэдэд зориулсан цахим засгийн газар)"
    },
    url: "https://www.hikorea.go.kr/",
    description: {
      ko: "외국인을 위한 전자정부 민원 신청, 비자 연장 및 예약 서비스",
      en: "E-government civil applications, visa extensions, and reservation services",
      vn: "Nộp hồ sơ hành chính trực tuyến, gia hạn visa và dịch vụ đặt lịch hẹn trước",
      mn: "Гадаад иргэдэд зориулсан цахим өргөдөл, виз сунгалт, цаг авах үйлчилгээ"
    },
    icon: "🌐",
    color: "var(--gcu-yellow)"
  }
];

const HOME_TRANSLATIONS: Record<"ko" | "en" | "vn" | "mn", {
  quickLinksTitle: string;
  widgetTitle: string;
  widgetDesc: string;
  widgetBtn: string;
  syncSuccessToast: string;
  syncAlreadyToast: string;
  tagNotice: string;
  tagEvent: string;
  tagGuide: string;
  syncBannerText: string;
  partnerTitle: string;
  partnerDesc: string;
  confirmPrefix: string;
  confirmSuffix: string;
}> = {
  ko: {
    quickLinksTitle: "핵심 지원 서비스 바로가기",
    widgetTitle: "실시간 TOPIK 모의고사 출시",
    widgetDesc: "듣기 및 읽기 영역으로 구성된 맞춤형 한국어 능력시험 모의고사를 풀고, 즉시 채점 점수와 고득점을 위한 정답 해설을 받아보세요. 로그인 없이 무제한 응시 가능합니다.",
    widgetBtn: "모의고사 응시하기",
    syncSuccessToast: "📡 K-Work 및 법무부 출입국 포털에서 최신 정책공지 2건과 일자리 채용 1건이 성공적으로 실시간 동기화되었습니다!",
    syncAlreadyToast: "🔄 이미 최신 유관 정부기관 공지사항이 동기화되어 실시간 반영 중입니다.",
    tagNotice: "공지",
    tagEvent: "행사",
    tagGuide: "안내",
    syncBannerText: "📡 [실시간 연동 활성] 하이코리아(Hi Korea) 민원 창구 및 고용노동부 K-Work 일자리 연계망과 실시간 연동되어 공인 갱신 공지가 연계 제공 중입니다.",
    partnerTitle: "🌐 협력 파트너 및 유관 행정 기관",
    partnerDesc: "글로벌사이버대학교는 유관 행정부처, 외국인 복지 정책실, 고용지원센터 및 다문화 정착 협회들과 유기적으로 네트워킹하여 유학생들의 행정업무와 실질적 삶의 정착을 전면 견인합니다. 각 로고를 선택하시면 공식 포털로 안전하게 이동합니다.",
    confirmPrefix: "정부 공식 파트너 협력 기관인 [",
    confirmSuffix: "] 홈페이지로 안전하게 연결됩니다. 이동하시겠습니까?"
  },
  en: {
    quickLinksTitle: "Quick Support Services Shortcuts",
    widgetTitle: "Real-time TOPIK Mock Exam Released",
    widgetDesc: "Take custom TOPIK practice exams with listening and reading sections. Get instant grading and detailed answer keys for higher scores. Unlimited attempts available without login.",
    widgetBtn: "Take Mock Exam",
    syncSuccessToast: "📡 2 latest policy notices and 1 job posting have been successfully synchronized from K-Work and Immigration portals in real time!",
    syncAlreadyToast: "🔄 Latest government notices are already synchronized and reflected in real time.",
    tagNotice: "Notice",
    tagEvent: "Event",
    tagGuide: "Guide",
    syncBannerText: "📡 [Live Sync Active] Real-time integration active with Hi Korea public services and Ministry of Employment K-Work database.",
    partnerTitle: "🌐 Cooperation Partners & Administrative Authorities",
    partnerDesc: "Global Cyber University works closely with administrative ministries, foreign welfare divisions, job centers, and multicultural settlement associations to guide student paperwork and integration. Click any card to navigate securely.",
    confirmPrefix: "You will be redirected securely to the official [",
    confirmSuffix: "] website. Would you like to proceed?"
  },
  vn: {
    quickLinksTitle: "Truy cập nhanh Dịch vụ Hỗ trợ",
    widgetTitle: "Ra mắt Đề thi thử TOPIK trực tuyến",
    widgetDesc: "Làm bài thi thử TOPIK bao gồm cả kỹ năng nghe và đọc. Nhận điểm ngay lập tục cùng đáp án chi tiết giải thích cho điểm số cao hơn. Làm bài không giới hạn và không cần đăng nhập.",
    widgetBtn: "Thi thử ngay",
    syncSuccessToast: "📡 2 thông báo chính sách mới nhất và 1 tin tuyển dụng đã được đồng bộ hóa thành công từ K-Work và Xuất nhập cảnh theo thời gian thực!",
    syncAlreadyToast: "🔄 Các thông báo chính thức của chính phủ đã được đồng bộ hóa và phản ánh theo thời gian thực.",
    tagNotice: "Thông báo",
    tagEvent: "Sự kiện",
    tagGuide: "Hướng dẫn",
    syncBannerText: "📡 [Kết nối Trực tiếp] Hệ thống đang liên thông thời gian thực với dịch vụ hành chính Hi Korea và mạng lưới tuyển dụng K-Work.",
    partnerTitle: "🌐 Đối tác Liên kết & Cơ quan Hành chính liên quan",
    partnerDesc: "Đại học Global Cyber xây dựng mạng lưới liên kết chặt chẽ với các bộ ngành chính phủ, văn phòng chính sách phúc lợi người nước ngoài, trung tâm dịch vụ việc làm để hỗ trợ tối đa các thủ tục hành chính. Nhấp vào các logo để chuyển hướng an toàn.",
    confirmPrefix: "Hệ thống sẽ chuyển hướng bạn đến trang web chính thức của [",
    confirmSuffix: "]. Bạn có muốn tiếp tục không?"
  },
  mn: {
    quickLinksTitle: "Үндсэн дэмжлэг үйлчилгээ",
    widgetTitle: "TOPIK загвар шалгалт нээгдлээ",
    widgetDesc: "Сонсох болон унших хэсгээс бүрдсэн солонгос хэлний түвшин тогтоох шалгалтыг өгч, оноогоо шууд харан зөвлөмж аваарай. Бүртгэлгүйгээр хязгааргүй өгөх боломжтой.",
    widgetBtn: "Шалгалт өгөх",
    syncSuccessToast: "📡 K-Work болон Шилжилт хөдөлгөөний порталаас 2 шинэ бодлогын мэдээ, 1 ажлын байрны мэдээ бодит цагт амжилттай холбогдлоо!",
    syncAlreadyToast: "🔄 Засгийн газрын сүүлийн үеийн мэдээллүүд холбогдсон бөгөөд бодит цагт шинэчлэгдэж байна.",
    tagNotice: "Зар",
    tagEvent: "Арга хэмжээ",
    tagGuide: "Зааварчилгаа",
    syncBannerText: "📡 [Бодит цагийн холболт] Хайкориа төрийн үйлчилгээ болон Хөдөлмөрийн яамны K-Work мэдээллийн сантай бодит цагт амжилттай холбогдов.",
    partnerTitle: "🌐 Хамтран ажиллагч байгууллага, захиргааны албад",
    partnerDesc: "Глобал Сайбер Их Сургууль нь холбогдох яамд, гадаад иргэдийн халамжийн алба, хөдөлмөр эрхлэлтийг дэмжих төв болон олон соёлт холбоодтой хамтран ажиллаж, оюутнуудын захиргааны ажил болон суурьшилтыг дэмжинэ. Зургуудыг сонгон холбогдох портал руу нэвтэрнэ үү.",
    confirmPrefix: "Засгийн газрын албан ёсны түнш болох [",
    confirmSuffix: "] вэбсайт руу аюулгүй шилжиж байна. Үргэлжлүүлэх үү?"
  }
};

export default function Home() {
  const { lang, t } = useLanguage();
  const tHome = HOME_TRANSLATIONS[lang as "ko" | "en" | "vn" | "mn"] || HOME_TRANSLATIONS.ko;

  // Standard landing page states
  const [activeFeedTab, setActiveFeedTab] = useState("all");
  const [feedItems, setFeedItems] = useState<any[]>(NOTICE_ITEMS);
  const [isSyncing, setIsSyncing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [syncedCount, setSyncedCount] = useState(0);

  // Personalized Foreigner Dashboard states
  const [activeUser, setActiveUser] = useState<any | null>(null);
  const [attendanceLogs, setAttendanceLogs] = useState<string[]>([]);
  const [eligibilityScore, setEligibilityScore] = useState<number>(75);
  const [applications, setApplications] = useState<string[]>([]);
  const [selectedVisaStep, setSelectedVisaStep] = useState<string | null>(null);
  const [isTtsPlaying, setIsTtsPlaying] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<any | null>(null);
  const [applyForm, setApplyForm] = useState({ name: "", email: "", phone: "", topik: "Level 3", intro: "" });
  const [applySuccessMsg, setApplySuccessMsg] = useState<string | null>(null);
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  const handleSyncPortals = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    
    // Simulate real-time API latency
    setTimeout(() => {
      setIsSyncing(false);
      
      if (syncedCount >= 1) {
        setToast(tHome.syncAlreadyToast);
        return;
      }

      // Synced official policies with multilingual translation maps
      const syncedFeeds = [
        {
          id: 101,
          category: "gov",
          title: {
            ko: "⚖️ 법무부 출입국: [정책] 2026년 하반기 지역특화형 우수인재(F-2-R) 거주비자 쿼터 긴급 추가 배정안 발표",
            en: "⚖️ Ministry of Justice Immigration: [Policy] Announcement of Urgent F-2-R Residency Visa Quota Allocation for H2 2026",
            vn: "⚖️ Cục QLXNC Bộ Tư pháp: [Chính sách] Công bố bổ sung khẩn cấp hạn ngạch visa cư trú F-2-R nửa cuối 2026",
            mn: "⚖️ Хууль зүйн яам: [Бодлого] 2026 оны сүүл хагасын F-2-R визний нэмэлт квот олгох шийдвэр"
          },
          date: "실시간 연동"
        },
        {
          id: 102,
          category: "gov",
          title: {
            ko: "💼 고용노동부 K-Work: [일자리] 시화공단 정밀 기계가공사 - 유학생(영어/베트남어) 정식 해외영업직 특별 채용 공고",
            en: "💼 Ministry of Employment K-Work: [Jobs] Precision Machinist (Sihwa Industrial Complex) - Global Sales (English/Vietnamese) Recruitment",
            vn: "💼 Bộ Lao động K-Work: [Việc làm] Công nhân gia công cơ khí chính xác Sihwa - Tuyển dụng nhân viên kinh doanh quốc tế (Anh/Việt)",
            mn: "💼 Хөдөлмөрийн яам K-Work: [Ажил] Сихва цогцолбор Нарийн машин механизмын ажилтан - Гадаад худалдааны ажилтан (Англи/Вьетнам хэл)"
          },
          date: "실시간 연동"
        },
        {
          id: 103,
          category: "gov",
          title: {
            ko: "🌐 하이코리아: [민원] 등록 외국인 대상 시간제 근로 신청 서류 온라인 간편 접수 시스템 연계 개시",
            en: "🌐 Hi Korea: [Public Service] Launch of Online Simple Submission System for Part-time Work Permit Applications for ARC Holders",
            vn: "🌐 Hi Korea: [Dịch vụ hành chính] Bắt đầu kết nối hệ thống nộp hồ sơ xin phép làm thêm trực tuyến đơn giản cho người nước ngoài",
            mn: "🌐 Hi Korea: [Цахим үйлчилгээ] Гадаад иргэдэд зориулсан цагийн ажил хийх зөвшөөрлийн хүсэлтийг цахимаар хялбар илгээх систем"
          },
          date: "실시간 연동"
        }
      ];

      setFeedItems([...syncedFeeds, ...feedItems]);
      setSyncedCount(1);
      setToast(tHome.syncSuccessToast);
    }, 1500);
  };

  useEffect(() => {
    // Initial sync
    const timer = setTimeout(() => {
      handleSyncPortals();
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("gcu-active-session");
      if (session) {
        const parsed = JSON.parse(session);
        setActiveUser(parsed);
        
        // Load attendance logs
        const savedLogs = localStorage.getItem("gcu-attendance-logs");
        if (savedLogs) {
          setAttendanceLogs(JSON.parse(savedLogs));
        } else {
          // Setup mock check-ins for the preceding days
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yestStr = yesterday.toISOString().split("T")[0];
          
          const twoDaysAgo = new Date();
          twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
          const twoDaysStr = twoDaysAgo.toISOString().split("T")[0];
          
          const initialLogs = [twoDaysStr, yestStr];
          setAttendanceLogs(initialLogs);
          localStorage.setItem("gcu-attendance-logs", JSON.stringify(initialLogs));
        }
        
        // Load eligibility score
        const savedScore = localStorage.getItem("gcu-eligibility-score");
        if (savedScore) {
          setEligibilityScore(Number(savedScore));
        } else {
          setEligibilityScore(75);
          localStorage.setItem("gcu-eligibility-score", "75");
        }
        
        // Load applications list
        const savedApp = localStorage.getItem("gcu-applications");
        if (savedApp) {
          setApplications(JSON.parse(savedApp));
        }
        
        // Load checklist state
        const savedChecklist = localStorage.getItem("gcu-checklist-v1");
        if (savedChecklist) {
          setChecklist(JSON.parse(savedChecklist));
        }
        
        // Pre-fill application form with user details
        setApplyForm({
          name: parsed.name || "",
          email: parsed.email || "",
          phone: "",
          topik: "Level 3",
          intro: ""
        });
      }
    }
  }, []);

  const handlePartnerClick = (e: React.MouseEvent<HTMLAnchorElement>, name: string) => {
    if (!confirm(`${tHome.confirmPrefix}${name}${tHome.confirmSuffix}`)) {
      e.preventDefault();
    }
  };

  const filteredFeeds = feedItems.filter(item => {
    if (activeFeedTab === "all") return true;
    return item.category === activeFeedTab;
  });

  // Confetti trigger
  const triggerConfetti = () => {
    const container = document.getElementById("confetti-container");
    if (!container) return;
    
    const colors = ["#c61a2b", "#122a4d", "#FFDE00", "#72BF44", "#00B9F2", "#F7931E"];
    for (let i = 0; i < 60; i++) {
      const particle = document.createElement("div");
      particle.className = "confetti-piece";
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const size = Math.random() * 8 + 6;
      const delay = Math.random() * 0.4;
      const duration = Math.random() * 1.5 + 1.2;
      
      particle.style.background = color;
      particle.style.left = `${left}%`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size * 0.4}px`;
      particle.style.borderRadius = "2px";
      particle.style.position = "absolute";
      particle.style.top = "-10px";
      particle.style.opacity = "1";
      particle.style.transform = `rotate(${Math.random() * 360}deg)`;
      particle.style.animation = `confetti-fall ${duration}s ease-out ${delay}s forwards`;
      
      container.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, (duration + delay) * 1000);
    }
  };

  // Check-In Handler
  const handleCheckIn = () => {
    if (!activeUser) return;
    const tDash = DASHBOARD_TRANSLATIONS[lang as "ko" | "en" | "vn" | "mn"] || DASHBOARD_TRANSLATIONS.ko;
    const todayStr = new Date().toISOString().split("T")[0];
    
    if (attendanceLogs.includes(todayStr)) {
      alert(lang === "ko" ? "이미 오늘의 출석체크가 완료되었습니다." : "You have already checked in today.");
      return;
    }
    
    const newLogs = [...attendanceLogs, todayStr];
    setAttendanceLogs(newLogs);
    localStorage.setItem("gcu-attendance-logs", JSON.stringify(newLogs));
    
    const newScore = Math.min(eligibilityScore + 5, 100);
    setEligibilityScore(newScore);
    localStorage.setItem("gcu-eligibility-score", String(newScore));
    
    triggerConfetti();
    alert(tDash.checkInSuccess);
  };

  // Week Dates Generator
  const getWeekDates = () => {
    const current = new Date();
    const week = [];
    const day = current.getDay();
    const diff = current.getDate() - day + (day === 0 ? -6 : 1); // Monday adjustment
    const monday = new Date(current.setDate(diff));
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      week.push(date);
    }
    return week;
  };

  const isChecked = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return attendanceLogs.includes(dateStr);
  };

  // TTS play mock
  const handlePlayTts = () => {
    if (isTtsPlaying) return;
    setIsTtsPlaying(true);
    setTimeout(() => {
      setIsTtsPlaying(false);
    }, 3000);
  };

  // Open apply form modal
  const handleOpenApplyModal = (card: any) => {
    setSelectedCard(card);
    setApplySuccessMsg(null);
    if (activeUser) {
      setApplyForm({
        name: activeUser.name || "",
        email: activeUser.email || "",
        phone: "",
        topik: "Level 3",
        intro: ""
      });
    }
  };

  // Submit application
  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCard) return;
    
    const tDash = DASHBOARD_TRANSLATIONS[lang as "ko" | "en" | "vn" | "mn"] || DASHBOARD_TRANSLATIONS.ko;
    const newApps = [...applications, selectedCard.id];
    setApplications(newApps);
    localStorage.setItem("gcu-applications", JSON.stringify(newApps));
    
    const newScore = Math.min(eligibilityScore + 3, 100);
    setEligibilityScore(newScore);
    localStorage.setItem("gcu-eligibility-score", String(newScore));
    
    setApplySuccessMsg(tDash.applySuccess);
    setTimeout(() => {
      setSelectedCard(null);
      setApplySuccessMsg(null);
    }, 2000);
  };

  // RENDER DYNAMIC FOREIGNER DASHBOARD
  const renderForeignerDashboard = () => {
    const tDash = DASHBOARD_TRANSLATIONS[lang as "ko" | "en" | "vn" | "mn"] || DASHBOARD_TRANSLATIONS.ko;
    const welcomeMsg = lang === "ko" ? `${activeUser.name}${tDash.welcome}` : `${tDash.welcome}${activeUser.name}`;
    
    // Choose Daily Phrase based on date
    const phraseIdx = typeof window !== "undefined" ? (new Date().getDate() % DAILY_PHRASES.length) : 0;
    const phraseObj = DAILY_PHRASES[phraseIdx];
    const displayPhrase = phraseObj[lang as "ko" | "en" | "vn" | "mn"] || phraseObj.ko;

    // Week days
    const weekDays = lang === "ko" 
      ? ["월", "화", "수", "목", "금", "토", "일"] 
      : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const weekDates = getWeekDates();
    const todayStr = new Date().toISOString().split("T")[0];
    const isTodayChecked = attendanceLogs.includes(todayStr);

    // Radial Progress Calculation
    const radius = 45;
    const circ = 2 * Math.PI * radius;
    const offset = circ - (circ * eligibilityScore) / 100;

    const role = activeUser.userType || (activeUser.role === "admin" || activeUser.role === "manager" ? "student" : activeUser.role) || "student";
    const isStudent = role === "student";
    const isWorker = role === "worker";
    const isGraduate = role === "graduate";

    // Visa Steps based on role
    const steps = isStudent 
      ? [
          { key: "D-2", label: tDash.visaD2, status: tDash.visaStatusActive },
          { key: "D-10", label: tDash.visaD10, status: tDash.visaStatusPending },
          { key: "F-2-R", label: tDash.visaF2R, status: tDash.visaStatusGoal }
        ]
      : isWorker
        ? [
            { key: "E-9", label: tDash.visaE9, status: tDash.visaStatusActive },
            { key: "E-7-4", label: tDash.visaE74, status: tDash.visaStatusPending },
            { key: "F-2-R", label: tDash.visaF2R, status: tDash.visaStatusGoal }
          ]
        : [
            { key: "D-10", label: tDash.visaD10, status: tDash.visaStatusActive },
            { key: "F-2-R", label: tDash.visaF2R, status: tDash.visaStatusPending },
            { key: "F-5", label: tDash.visaF5, status: tDash.visaStatusGoal }
          ];

    // Current translated visa requirements
    const displayVisaInfo = selectedVisaStep 
      ? (VISA_INFO[lang as "ko" | "en" | "vn" | "mn"]?.[selectedVisaStep as "D-2" | "D-10" | "F-2-R" | "E-9" | "E-7-4" | "F-5"] || selectedVisaStep)
      : (lang === "ko" ? "지도 단계를 탭하여 이수 조건 및 매칭 기준을 확인하세요." : "Tap a roadmap node to view requirements and matching criteria.");

    // D-day calculation
    const calculateDDay = (targetDateStr: string) => {
      const target = new Date(targetDateStr);
      const today = new Date();
      target.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      const diffTime = target.getTime() - today.getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const targetDate = isStudent ? "2026-07-12" : isWorker ? "2026-08-23" : "2026-10-15";
    const ddayValue = calculateDDay(targetDate);

    // Alerts Center list
    const getTailoredAlerts = () => {
      const alertsList = {
        student: [
          {
            id: "alert-s-1",
            type: "warning",
            ko: "⚠️ 외국인 시간제 취업 허가 기간 만료 14일 전! 기한 내에 아르바이트 신청을 갱신하십시오.",
            en: "⚠️ Part-time work permit expires in 14 days! Please renew your permit in time.",
            vn: "⚠️ Giấy phép làm thêm của bạn sẽ hết hạn sau 14 ngày! Hãy gia hạn kịp thời.",
            mn: "⚠️ Цагийн ажлын зөвшөөрлийн хугацаа 14 хоногийн дараа дуусна! Хугацааг сунгана уу."
          },
          {
            id: "alert-s-2",
            type: "info",
            ko: "🎓 이번 학기 성적 우수 장학금 심사가 70% 완료되었습니다. 출석 요건을 계속 유지하세요.",
            en: "🎓 Academic Excellence Scholarship assessment is 70% complete. Maintain your attendance.",
            vn: "🎓 Xét duyệt học bổng xuất sắc học kỳ này đã hoàn thành 70%. Hãy tiếp tục duy trì chuyên cần.",
            mn: "🎓 Сурлагын өндөр амжилтын тэтгэлгийн үнэлгээ 70%-тай байна. Ирцээ хэвийн хадгална уу."
          }
        ],
        worker: [
          {
            id: "alert-w-1",
            type: "warning",
            ko: "⚠️ E-7-4 비자 전환을 위한 숙련기능 점수 사전 모의 진단표가 발급되었습니다. 필수 요건을 검토하십시오.",
            en: "⚠️ Pre-simulation score sheet for E-7-4 visa conversion has been issued. Check requirements.",
            vn: "⚠️ Phiếu chẩn đoán điểm kỹ năng chuyển đổi visa E-7-4 đã được cấp. Vui lòng kiểm tra yêu cầu.",
            mn: "⚠️ E-7-4 виз солих мэргэжлийн онооны урьдчилсан үнэлгээ гарлаа. Шаардлагуудыг шалгана уу."
          },
          {
            id: "alert-w-2",
            type: "danger",
            ko: "🛡️ [산업안전] 법정 근로자 의무 소방 대피 및 재해 예방 모바일 안전 교육을 금일 이수해야 합니다.",
            en: "🛡️ [Safety] Mandatory industrial safety and fire evacuation mobile training must be completed today.",
            vn: "🛡️ [An toàn] Đào tạo an toàn lao động và lánh nạn hỏa hoạn bắt buộc trên điện thoại phải hoàn thành hôm nay.",
            mn: "🛡️ [Аюулгүй байдал] Албан журмын галын аюулаас урьдчилан сэргийлэх сургалтыг өнөөдөр дүүргэнэ үү."
          }
        ],
        graduate: [
          {
            id: "alert-g-1",
            type: "warning",
            ko: "🎓 지자체 추천(F-2-R)을 위한 인구감소지역 거주 확인 및 일자리 매칭 완료 증빙 서류를 업로드하십시오.",
            en: "🎓 Upload proof of residence and job matching completion for F-2-R Regional Quota Recommendation.",
            vn: "🎓 Vui lòng nộp chứng nhận cư trú và hoàn thành khớp việc làm để xin thư giới thiệu F-2-R từ địa phương.",
            mn: "🎓 F-2-R орон нутгийн квотын тодорхойлолт авахын тулд оршин суугаа хаяг болон ажлын байрны мэдээллээ оруулна уу."
          },
          {
            id: "alert-g-2",
            type: "info",
            ko: "⚖️ F-5 영주권 전환 요건인 전년도 한국 GNI 소득 조건(4,248만원) 고시가 업데이트되었습니다.",
            en: "⚖️ Korea's GNI income requirement (42.48M KRW) for F-5 permanent residency has been updated.",
            vn: "⚖️ Bản cập nhật điều kiện thu nhập GNI Hàn Quốc năm ngoái (42.48 triệu KRW) cho visa định cư F-5 đã được công bố.",
            mn: "⚖️ F-5 байнгын оршин суух визний шалгуур болох БНСУ-ын өнгөрсөн оны GNI орлогын доод хэмжээ (42.48 сая KRW) шинэчлэгдлээ."
          }
        ]
      };
      return alertsList[role as "student" | "worker" | "graduate"] || alertsList.student;
    };

    const toggleChecklistItem = (key: string) => {
      const updated = { ...checklist, [key]: !checklist[key] };
      setChecklist(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("gcu-checklist-v1", JSON.stringify(updated));
      }
    };

    const getChecklistItems = () => {
      const checklists = {
        student: [
          {
            key: "s-gpa",
            ko: "학점 유지 (GPA 3.8 이상)",
            en: "Maintain GPA (3.8 or above)",
            vn: "Duy trì GPA (từ 3.8 trở lên)",
            mn: "Голч дүн хадгалах (GPA 3.8+)"
          },
          {
            key: "s-topik",
            ko: "TOPIK 4급 이상 취득",
            en: "Obtain TOPIK Level 4+",
            vn: "Đạt chứng chỉ TOPIK Cấp 4+",
            mn: "TOPIK 4-р түвшин дээш авах"
          },
          {
            key: "s-permit",
            ko: "시간제 취업 허가 갱신",
            en: "Renew Part-time Work Permit",
            vn: "Gia hạn giấy phép làm thêm",
            mn: "Цагийн ажлын зөвшөөрөл сунгах"
          },
          {
            key: "s-attendance",
            ko: "출석률 90% 이상 유지",
            en: "Maintain 90%+ Attendance",
            vn: "Duy trì chuyên cần trên 90%",
            mn: "Ирцээ 90%-иас дээш хадгалах"
          }
        ],
        worker: [
          {
            key: "w-kiip",
            ko: "사회통합프로그램(KIIP) 이수",
            en: "Complete KIIP Course",
            vn: "Hoàn thành khóa học KIIP",
            mn: "Нийгмийн харилцан нөлөөллийн хөтөлбөр (KIIP) дүүргэх"
          },
          {
            key: "w-salary",
            ko: "연 소득 2,600만원 이상 유지",
            en: "Maintain Annual Income 26M+ KRW",
            vn: "Duy trì thu nhập 26tr+ KRW/năm",
            mn: "Жилийн орлого 26 сая KRW-оос дээш байх"
          },
          {
            key: "w-workplace",
            ko: "근무지 변경/지정 허가 확인",
            en: "Verify Workplace Transfer Approval",
            vn: "Kiểm tra phép thay đổi nơi làm việc",
            mn: "Ажлын байр шилжилтийн зөвшөөрөл шалгах"
          },
          {
            key: "w-safety",
            ko: "모바일 안전 교육 법정이수",
            en: "Complete Mobile Safety Training",
            vn: "Hoàn thành đào tạo an toàn lao động",
            mn: "Аюулгүй байдлын цахим сургалт дүүргэх"
          }
        ],
        graduate: [
          {
            key: "g-residence",
            ko: "인구감소지역 거주지 이전 신고",
            en: "Report Residence (Designated Rural Area)",
            vn: "Khai báo cư trú tại khu vực giảm dân số",
            mn: "Оршин суугаа хаяг шилжүүлснээ бүртгүүлэх (Квоттой бүс)"
          },
          {
            key: "g-contract",
            ko: "F-2-R 전제 정식 근로계약 체결",
            en: "Sign F-2-R Employment Contract",
            vn: "Ký hợp đồng lao động chính thức F-2-R",
            mn: "F-2-R-ийн хөдөлмөрийн гэрээ байгуулах"
          },
          {
            key: "g-recom",
            ko: "지자체 추천서 신청 구비서류 접수",
            en: "Prepare Municipality Recommendation Docs",
            vn: "Chuẩn bị hồ sơ xin giới thiệu của tỉnh",
            mn: "Тодорхойлох захидал авахад шаардлагатай материал бүрдүүлэх"
          },
          {
            key: "g-f5income",
            ko: "F-5 영주권 요건 연간 소득 증빙",
            en: "Prepare F-5 GNI Income Proof",
            vn: "Chuẩn bị chứng minh thu nhập GNI F-5",
            mn: "F-5 визний жилийн орлогын баталгаа бэлдэх"
          }
        ]
      };
      return checklists[role as "student" | "worker" | "graduate"] || checklists.student;
    };

    // Sort or filter jobs based on role
    let displayedJobs = [...JOBS_DATA];
    if (role === "student") {
      displayedJobs.sort((a, b) => {
        if (a.id === "job-2" || a.id === "job-3") return -1;
        if (b.id === "job-2" || b.id === "job-3") return 1;
        return 0;
      });
    } else if (role === "worker") {
      displayedJobs.sort((a, b) => {
        if (a.id === "job-1") return -1;
        if (b.id === "job-1") return 1;
        return 0;
      });
    } else if (role === "graduate") {
      displayedJobs.sort((a, b) => {
        if (a.id === "job-3") return -1;
        if (b.id === "job-3") return 1;
        return 0;
      });
    }

    // Sort or filter scholarships based on role
    let displayedScholarships = [...SCHOLARSHIPS_DATA];
    if (role === "student") {
      displayedScholarships.sort((a, b) => {
        if (a.id === "scholarship-1") return -1;
        if (b.id === "scholarship-1") return 1;
        return 0;
      });
    } else if (role === "worker") {
      displayedScholarships.sort((a, b) => {
        if (a.id === "scholarship-3") return -1;
        if (b.id === "scholarship-3") return 1;
        return 0;
      });
    } else if (role === "graduate") {
      displayedScholarships.sort((a, b) => {
        if (a.id === "scholarship-2") return -1;
        if (b.id === "scholarship-2") return 1;
        return 0;
      });
    }

    const renderJobsSection = () => (
      <div>
        <div className="section-header" style={{ marginBottom: "16px" }}>
          <div className="section-title">
            <span className="section-title-dot"></span>
            <h2 style={{ fontSize: "1.25rem" }}>💼 {tDash.jobFeedTitle}</h2>
          </div>
        </div>
        <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "20px", marginTop: "-8px" }}>
          {tDash.jobFeedDesc}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {displayedJobs.map((job) => {
            const applied = applications.includes(job.id);
            const title = job.title[lang as "ko" | "en" | "vn" | "mn"] || job.title.ko;
            const category = job.category[lang as "ko" | "en" | "vn" | "mn"] || job.category.ko;
            const salary = job.salary[lang as "ko" | "en" | "vn" | "mn"] || job.salary.ko;
            const location = job.location[lang as "ko" | "en" | "vn" | "mn"] || job.location.ko;
            const visa = job.visaSupport[lang as "ko" | "en" | "vn" | "mn"] || job.visaSupport.ko;

            return (
              <div 
                key={job.id} 
                className="card-news-item glass-panel"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "24px",
                  borderRadius: "16px",
                  border: `1px solid ${job.borderColor}`,
                  background: job.color,
                  transition: "all 0.3s ease",
                  position: "relative",
                  minHeight: "280px"
                }}
              >
                <div style={{ display: "flex", gap: "6px", marginBottom: "12px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.65rem", fontWeight: "700", padding: "2.5px 8px", borderRadius: "4px", background: job.badgeColor, color: job.badgeTextColor }}>
                    {category}
                  </span>
                  <span style={{ fontSize: "0.65rem", fontWeight: "700", padding: "2.5px 8px", borderRadius: "4px", background: "rgba(0,0,0,0.06)", color: "var(--text-primary)" }}>
                    Visa Match
                  </span>
                </div>

                <h4 style={{ fontSize: "0.98rem", fontWeight: "800", color: "var(--gcu-navy)", margin: "0 0 16px 0", lineHeight: "1.45" }}>
                  {title}
                </h4>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "24px" }}>
                  <div>💰 <strong>{salary}</strong></div>
                  <div>📍 {location}</div>
                  <div>⚖️ {visa}</div>
                </div>

                <button
                  onClick={() => handleOpenApplyModal(job)}
                  style={{
                    marginTop: "auto",
                    width: "100%",
                    height: "38px",
                    border: "none",
                    borderRadius: "8px",
                    background: applied ? "var(--gcu-navy)" : "var(--gcu-red)",
                    color: "#ffffff",
                    fontWeight: "700",
                    fontSize: "0.78rem",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  {applied ? `✓ ${tDash.appliedBtn}` : tDash.viewDetailBtn}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );

    const renderScholarshipsSection = () => (
      <div style={{ marginBottom: "40px" }}>
        <div className="section-header" style={{ marginBottom: "16px" }}>
          <div className="section-title">
            <span className="section-title-dot"></span>
            <h2 style={{ fontSize: "1.25rem" }}>🎁 {tDash.scholarshipFeedTitle}</h2>
          </div>
        </div>
        <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "20px", marginTop: "-8px" }}>
          {tDash.scholarshipFeedDesc}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {displayedScholarships.map((sch) => {
            const applied = applications.includes(sch.id);
            const title = sch.title[lang as "ko" | "en" | "vn" | "mn"] || sch.title.ko;
            const reward = sch.reward[lang as "ko" | "en" | "vn" | "mn"] || sch.reward.ko;
            const criteria = sch.criteria[lang as "ko" | "en" | "vn" | "mn"] || sch.criteria.ko;

            return (
              <div 
                key={sch.id} 
                className="card-news-item glass-panel"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "24px",
                  borderRadius: "16px",
                  border: `1px solid ${sch.borderColor}`,
                  background: sch.color,
                  transition: "all 0.3s ease",
                  position: "relative",
                  minHeight: "280px"
                }}
              >
                <div style={{ display: "flex", gap: "6px", marginBottom: "12px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.65rem", fontWeight: "700", padding: "2.5px 8px", borderRadius: "4px", background: sch.badgeColor, color: sch.badgeTextColor }}>
                    Scholarship
                  </span>
                  <span style={{ fontSize: "0.65rem", fontWeight: "700", padding: "2.5px 8px", borderRadius: "4px", background: "rgba(198,26,43,0.06)", color: "var(--gcu-red)" }}>
                    Tuition Match
                  </span>
                </div>

                <h4 style={{ fontSize: "0.98rem", fontWeight: "800", color: "var(--gcu-navy)", margin: "0 0 16px 0", lineHeight: "1.45" }}>
                  {title}
                </h4>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "24px" }}>
                  <div>🎁 <strong>{reward}</strong></div>
                  <div>🎓 {criteria}</div>
                </div>

                <button
                  onClick={() => handleOpenApplyModal(sch)}
                  style={{
                    marginTop: "auto",
                    width: "100%",
                    height: "38px",
                    border: "none",
                    borderRadius: "8px",
                    background: applied ? "var(--gcu-navy)" : "var(--gcu-red)",
                    color: "#ffffff",
                    fontWeight: "700",
                    fontSize: "0.78rem",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  {applied ? `✓ ${tDash.appliedBtn}` : tDash.viewDetailBtn}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "32px", position: "relative" }}>
        {/* Confetti Container Overlay */}
        <div id="confetti-container" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden", pointerEvents: "none", zIndex: 999 }}></div>

        {/* Dynamic Keyframes injected locally */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes confetti-fall {
            0% { top: -10px; transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { top: 100%; transform: translateY(800px) rotate(720deg); opacity: 0; }
          }
          @keyframes bounce-wave {
            0% { height: 4px; }
            100% { height: 22px; }
          }
          @keyframes stamp-pop {
            0% { transform: scale(0.2); opacity: 0; }
            50% { transform: scale(1.3); }
            100% { transform: scale(1); opacity: 1; }
          }
          .visa-step-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(18, 42, 77, 0.1);
          }
          .phrase-play-btn:hover {
            background: rgba(18, 42, 77, 0.08) !important;
          }
          .attendance-submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(198, 26, 43, 0.25);
          }
          .card-news-item:hover {
            transform: translateY(-6px);
            box-shadow: var(--shadow-lg), var(--shadow-glow);
          }
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
          }
          .modal-box {
            background: #ffffff;
            border-radius: 20px;
            width: 100%;
            max-width: 540px;
            padding: 32px;
            box-shadow: var(--shadow-lg);
            position: relative;
            animation: stamp-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          }
          .audio-wave {
            display: inline-flex;
            align-items: flex-end;
            gap: 3px;
            height: 22px;
            margin-left: 10px;
          }
          .audio-wave .bar {
            width: 3px;
            height: 6px;
            background-color: var(--gcu-navy);
            border-radius: 2px;
            animation: bounce-wave 0.8s ease-in-out infinite alternate;
          }
          .audio-wave .bar:nth-child(2) { animation-delay: 0.15s; }
          .audio-wave .bar:nth-child(3) { animation-delay: 0.3s; }
          .audio-wave .bar:nth-child(4) { animation-delay: 0.45s; }
          .audio-wave .bar:nth-child(5) { animation-delay: 0.6s; }
        `}} />

        {/* 1. Welcoming Profile Banner */}
        <div 
          className="glass-panel" 
          style={{ 
            padding: "30px", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between", 
            flexWrap: "wrap", 
            gap: "20px", 
            background: "linear-gradient(135deg, rgba(18, 42, 77, 0.02) 0%, rgba(198, 26, 43, 0.02) 100%)", 
            border: "1px solid rgba(198, 26, 43, 0.18)", 
            borderRadius: "20px" 
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div 
              style={{ 
                width: "64px", 
                height: "64px", 
                borderRadius: "50%", 
                background: "linear-gradient(135deg, var(--gcu-navy) 0%, var(--gcu-red) 100%)", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                fontSize: "1.8rem", 
                color: "#ffffff", 
                fontWeight: "800" 
              }}
            >
              {activeUser.name.charAt(0)}
            </div>
            <div>
              <h2 style={{ fontSize: "1.4rem", fontWeight: "800", color: "var(--gcu-navy)", margin: "0 0 6px 0" }}>
                {welcomeMsg}
              </h2>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.78rem", padding: "4px 12px", background: "rgba(18, 42, 77, 0.06)", color: "var(--gcu-navy)", borderRadius: "20px", fontWeight: "700", border: "1px solid rgba(18, 42, 77, 0.1)" }}>
                  🌎 {tDash.nationality}: {activeUser.nationality}
                </span>
                <span style={{ fontSize: "0.78rem", padding: "4px 12px", background: "rgba(198, 26, 43, 0.06)", color: "var(--gcu-red)", borderRadius: "20px", fontWeight: "700", border: "1px solid rgba(198, 26, 43, 0.1)" }}>
                  💼 {tDash.role}: {isStudent ? tDash.student : isWorker ? tDash.worker : tDash.graduate}
                </span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: "600", marginBottom: "4px" }}>{tDash.daysChecked}</div>
              <div style={{ fontSize: "1.7rem", fontWeight: "800", color: "var(--gcu-red)", display: "flex", alignItems: "center", gap: "4px" }}>
                📅 {attendanceLogs.length}
              </div>
            </div>
            <div style={{ width: "1px", height: "40px", background: "rgba(0,0,0,0.08)" }}></div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: "600", marginBottom: "4px" }}>{tDash.scholarshipGauge}</div>
              <div style={{ fontSize: "1.7rem", fontWeight: "800", color: "var(--gcu-navy)", display: "flex", alignItems: "center", gap: "4px" }}>
                🏆 {eligibilityScore}%
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Alerts & D-day Countdown row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          {/* Alerts panel */}
          <div className="glass-panel" style={{
            padding: "20px",
            border: "1px solid rgba(198, 26, 43, 0.15)",
            background: "rgba(255, 255, 255, 0.6)",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px"
          }}>
            <h3 style={{ fontSize: "1.0rem", fontWeight: "800", color: "var(--gcu-navy)", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
              {tDash.notificationsTitle}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {getTailoredAlerts().map((alert) => {
                const text = alert[lang as "ko" | "en" | "vn" | "mn"] || alert.ko;
                const isWarn = alert.type === "warning" || alert.type === "danger";
                return (
                  <div key={alert.id} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    background: isWarn ? "rgba(198, 26, 43, 0.04)" : "rgba(18, 42, 77, 0.04)",
                    border: isWarn ? "1px solid rgba(198, 26, 43, 0.1)" : "1px solid rgba(18, 42, 77, 0.1)",
                    fontSize: "0.82rem",
                    fontWeight: "600",
                    color: "var(--text-primary)"
                  }}>
                    <span style={{ fontSize: "1.1rem" }}>{alert.type === "warning" ? "⚠️" : alert.type === "danger" ? "🚨" : "📢"}</span>
                    <div style={{ flex: 1 }}>{text}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* D-day banner */}
          <div className="glass-panel" style={{
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(135deg, rgba(198, 26, 43, 0.05) 0%, rgba(18, 42, 77, 0.05) 100%)",
            border: "1px solid rgba(198, 26, 43, 0.25)",
            borderRadius: "16px",
            boxShadow: "0 4px 15px rgba(198, 26, 43, 0.05)",
            alignSelf: "stretch"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{ fontSize: "2.2rem" }}>⏳</span>
              <div>
                <h4 style={{ margin: 0, fontSize: "1.0rem", fontWeight: "800", color: "var(--gcu-navy)", lineHeight: "1.4" }}>
                  {isStudent ? tDash.ddayExam : isWorker ? tDash.ddayKiip : tDash.ddayQuota}
                </h4>
                <p style={{ margin: "4px 0 0 0", fontSize: "0.78rem", color: "var(--text-secondary)", fontWeight: "500" }}>
                  Target: {targetDate}
                </p>
              </div>
            </div>
            <div style={{
              fontSize: "1.65rem",
              fontWeight: "900",
              color: "var(--gcu-red)",
              background: "rgba(198, 26, 43, 0.1)",
              padding: "8px 18px",
              borderRadius: "12px",
              letterSpacing: "-0.5px"
            }}>
              D-{ddayValue}
            </div>
          </div>
        </div>

        {/* 2. Interactive SVG/CSS Infographics Dashboard */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          
          {/* Card A: Visa Roadmap */}
          <div className="glass-panel" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "var(--gcu-navy)", margin: "0 0 4px 0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>🎯</span> {tDash.visaRoadmap}
              </h3>
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", margin: 0 }}>
                {tDash.visaRoadmapDesc}
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 8px", background: "rgba(0,0,0,0.02)", borderRadius: "12px", border: "1px dashed rgba(0,0,0,0.08)" }}>
              {steps.map((step, idx) => {
                const isStepActive = selectedVisaStep === step.key;
                const isCurrentVisa = idx === 0;
                
                return (
                  <React.Fragment key={step.key}>
                    <button
                      onClick={() => setSelectedVisaStep(step.key)}
                      className="visa-step-btn"
                      style={{
                        flex: 1,
                        padding: "10px 4px",
                        borderRadius: "10px",
                        border: isStepActive 
                          ? "2px solid var(--gcu-red)" 
                          : isCurrentVisa 
                            ? "1px solid var(--gcu-navy)" 
                            : "1px solid var(--border-color)",
                        background: isStepActive 
                          ? "rgba(198, 26, 43, 0.05)" 
                          : isCurrentVisa 
                            ? "rgba(18, 42, 77, 0.04)" 
                            : "#ffffff",
                        cursor: "pointer",
                        transition: "all 0.25s ease",
                        textAlign: "center"
                      }}
                    >
                      <div style={{ fontSize: "0.8rem", fontWeight: "800", color: isStepActive ? "var(--gcu-red)" : "var(--gcu-navy)", marginBottom: "4px" }}>
                        {step.key}
                      </div>
                      <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", fontWeight: "500" }}>
                        {step.label.split(" ")[0]}
                      </div>
                      <span style={{ 
                        fontSize: "0.6rem", 
                        padding: "1.5px 5px", 
                        borderRadius: "10px", 
                        background: idx === 0 ? "var(--gcu-navy)" : idx === 1 ? "rgba(0,0,0,0.08)" : "var(--gcu-red)", 
                        color: "#ffffff", 
                        fontWeight: "700",
                        marginTop: "6px",
                        display: "inline-block"
                      }}>
                        {step.status}
                      </span>
                    </button>
                    {idx < steps.length - 1 && (
                      <span style={{ padding: "0 4px", fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "bold" }}>➔</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Selected Visa requirement info box */}
            <div 
              style={{ 
                padding: "12px 16px", 
                background: "rgba(18, 42, 77, 0.03)", 
                borderLeft: "4px solid var(--gcu-navy)", 
                borderRadius: "0 12px 12px 0",
                fontSize: "0.78rem",
                lineHeight: "1.5",
                color: "var(--text-primary)",
                fontWeight: "500",
                minHeight: "56px"
              }}
            >
              {displayVisaInfo}
            </div>
          </div>

          {/* Card B: Scholarship Gauge Dial */}
          <div className="glass-panel" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "100%", alignSelf: "flex-start" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "var(--gcu-navy)", margin: "0 0 4px 0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>🏆</span> {tDash.scholarshipGauge}
              </h3>
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", margin: 0 }}>
                {tDash.scholarshipGaugeDesc}
              </p>
            </div>

            {/* SVG Circular Progress Gauge */}
            <div style={{ position: "relative", width: "110px", height: "110px", margin: "10px 0" }}>
              <svg width="110" height="110" viewBox="0 0 110 110" style={{ transform: "rotate(-90deg)" }}>
                {/* Track circle */}
                <circle
                  cx="55"
                  cy="55"
                  r={radius}
                  fill="transparent"
                  stroke="rgba(0,0,0,0.06)"
                  strokeWidth="8"
                />
                {/* Animated progress circle */}
                <circle
                  cx="55"
                  cy="55"
                  r={radius}
                  fill="transparent"
                  stroke="url(#progressGrad)"
                  strokeWidth="8"
                  strokeDasharray={circ}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 1s ease-out" }}
                />
                <defs>
                  <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--gcu-red)" />
                    <stop offset="100%" stopColor="var(--gcu-navy)" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Inner score label */}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
                <span style={{ fontSize: "1.45rem", fontWeight: "900", color: "var(--gcu-navy)" }}>{eligibilityScore}%</span>
                <div style={{ fontSize: "0.6rem", fontWeight: "700", color: "var(--gcu-red)", textTransform: "uppercase", marginTop: "-2px" }}>
                  {eligibilityScore >= 90 ? "Excellent" : eligibilityScore >= 80 ? "Good" : "Normal"}
                </div>
              </div>
            </div>

            <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", fontWeight: "600", textAlign: "center" }}>
              📢 {lang === "ko" ? "출석체크(+5%) 및 모의 지원서 제출 시 적합도가 점진적으로 가산됩니다." : "Check-in (+5%) or submit mock applications to boost eligibility score."}
            </div>
          </div>

          {/* Card C: TOPIK Tracker */}
          <div className="glass-panel" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "var(--gcu-navy)", margin: "0 0 4px 0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>📚</span> {tDash.topikProgress}
              </h3>
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", margin: 0 }}>
                {tDash.topikProgressDesc}
              </p>
            </div>

            <div style={{ marginTop: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", fontWeight: "700", marginBottom: "6px" }}>
                <span style={{ color: "var(--gcu-navy)" }}>Current: TOPIK Level 3</span>
                <span style={{ color: "var(--gcu-red)" }}>Target: Level 4</span>
              </div>
              
              {/* Progress Bar Container */}
              <div style={{ width: "100%", height: "12px", background: "rgba(0,0,0,0.06)", borderRadius: "6px", overflow: "hidden", position: "relative" }}>
                <div 
                  style={{ 
                    width: "80%", 
                    height: "100%", 
                    background: "linear-gradient(90deg, var(--gcu-navy) 0%, var(--gcu-red) 100%)", 
                    borderRadius: "6px",
                    transition: "width 0.8s ease"
                  }}
                ></div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.68rem", color: "var(--text-muted)", marginTop: "6px" }}>
                <span>120 pts obtained</span>
                <span>30 pts needed for Level 4</span>
              </div>
            </div>

            <a 
              href="/learning" 
              className="btn-secondary"
              style={{
                padding: "8px 12px",
                borderRadius: "10px",
                fontSize: "0.75rem",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                marginTop: "auto",
                border: "1px solid rgba(18, 42, 77, 0.15)",
                color: "var(--gcu-navy)"
              }}
            >
              📝 {lang === "ko" ? "무료 TOPIK 모의고사 응시하러 가기" : "Take Free TOPIK Mock Exam"} ➔
            </a>
          </div>

          {/* Card D: Tailored Checklist */}
          <div className="glass-panel" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "var(--gcu-navy)", margin: "0 0 4px 0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>📋</span> {lang === "ko" ? "맞춤형 정착 체크리스트" : lang === "vn" ? "Danh sách kiểm tra định cư" : lang === "mn" ? "Төлөвлөгөөт хяналтын хуудас" : "Tailored Checklist"}
              </h3>
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", margin: 0 }}>
                {lang === "ko" ? "체류 자격과 목표 달성을 위한 필수 준비 항목입니다." : lang === "vn" ? "Các hạng mục chuẩn bị thiết yếu cho tư cách lưu trú." : lang === "mn" ? "Оршин суух зөвшөөрөл болон зорилтод хүрэх бэлтгэл." : "Essential preparations for your status and goals."}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "4px" }}>
              {getChecklistItems().map((item) => {
                const isChecked = !!checklist[item.key];
                const text = item[lang as "ko" | "en" | "vn" | "mn"] || item.ko;
                return (
                  <label 
                    key={item.key}
                    onClick={(e) => e.stopPropagation()} 
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      color: "var(--text-primary)",
                      cursor: "pointer",
                      padding: "8px 12px",
                      background: isChecked ? "rgba(114, 191, 68, 0.05)" : "rgba(0,0,0,0.02)",
                      border: isChecked ? "1px solid rgba(114, 191, 68, 0.2)" : "1px solid rgba(0,0,0,0.05)",
                      borderRadius: "8px",
                      transition: "all 0.2s"
                    }}
                  >
                    <input 
                      type="checkbox" 
                      checked={isChecked}
                      onChange={() => toggleChecklistItem(item.key)}
                      onClick={(e) => e.stopPropagation()}
                      style={{ 
                        accentColor: "var(--gcu-green)",
                        width: "16px",
                        height: "16px",
                        cursor: "pointer"
                      }}
                    />
                    <span style={{ textDecoration: isChecked ? "line-through" : "none", color: isChecked ? "var(--text-muted)" : "var(--text-primary)" }}>
                      {text}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. Daily Activity Area (Phrase & Attendance calendar) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "24px" }}>
          
          {/* Card A: Daily Korean Phrase */}
          <div className="glass-panel" style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "var(--gcu-navy)", margin: "0 0 4px 0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>🗣️</span> {tDash.phraseOfTheDay}
              </h3>
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", margin: 0 }}>
                {tDash.phraseDesc}
              </p>
            </div>

            {/* Bubble Layout phrase block */}
            <div 
              style={{ 
                background: "linear-gradient(135deg, rgba(18, 42, 77, 0.03) 0%, rgba(198, 26, 43, 0.03) 100%)", 
                border: "1px solid rgba(18, 42, 77, 0.08)",
                borderRadius: "16px",
                padding: "20px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <span style={{ fontSize: "1.6rem", lineHeight: "1" }}>💡</span>
                <div>
                  <div style={{ fontSize: "1.05rem", fontWeight: "800", color: "var(--text-primary)", lineHeight: "1.4" }}>
                    "{phraseObj.ko}"
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: "500", marginTop: "8px", fontStyle: "italic" }}>
                    {displayPhrase}
                  </div>
                </div>
              </div>

              {/* TTS Action */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(0,0,0,0.05)", paddingTop: "12px", marginTop: "4px" }}>
                <button
                  onClick={handlePlayTts}
                  className="phrase-play-btn"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "rgba(18, 42, 77, 0.04)",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    color: "var(--gcu-navy)",
                    transition: "all 0.2s"
                  }}
                >
                  🔊 {isTtsPlaying ? (lang === "ko" ? "발음 재생 중" : "Playing TTS...") : (lang === "ko" ? "음성 안내 듣기" : "Listen TTS Guidance")}
                </button>

                {isTtsPlaying && (
                  <div className="audio-wave">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card B: Attendance Stamp calendar */}
          <div className="glass-panel" style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "800", color: "var(--gcu-navy)", margin: "0 0 4px 0", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>📅</span> {tDash.attendanceTitle}
              </h3>
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", margin: 0 }}>
                {tDash.attendanceDesc}
              </p>
            </div>

            {/* Stamp Row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px", margin: "12px 0" }}>
              {weekDates.map((date, idx) => {
                const checked = isChecked(date);
                const dateNum = date.getDate();
                const dayLabel = weekDays[idx];
                const isToday = date.toISOString().split("T")[0] === todayStr;
                
                return (
                  <div 
                    key={idx} 
                    className="glass-panel"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "10px 4px",
                      border: isToday ? "2px solid var(--gcu-red)" : checked ? "1px solid var(--gcu-green)" : "1px solid var(--border-color)",
                      background: checked ? "rgba(114, 191, 68, 0.06)" : isToday ? "rgba(198, 26, 43, 0.03)" : "rgba(255, 255, 255, 0.4)",
                      borderRadius: "10px",
                      position: "relative",
                      boxShadow: isToday ? "0 0 8px rgba(198, 26, 43, 0.12)" : "none"
                    }}
                  >
                    <span style={{ fontSize: "0.65rem", fontWeight: "700", color: isToday ? "var(--gcu-red)" : "var(--text-secondary)" }}>
                      {dayLabel}
                    </span>
                    <span style={{ fontSize: "0.95rem", fontWeight: "800", margin: "4px 0", color: "var(--text-primary)" }}>
                      {dateNum}
                    </span>
                    <div style={{ width: "22px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {checked ? (
                        <span style={{ 
                          fontSize: "0.95rem", 
                          color: "var(--gcu-green)",
                          animation: "stamp-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards" 
                        }}>
                          ✔
                        </span>
                      ) : (
                        <span style={{ width: "12px", height: "12px", borderRadius: "50%", border: "2px dashed var(--text-muted)", opacity: 0.3 }}></span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Attendance Check-in Button */}
            <button
              onClick={handleCheckIn}
              disabled={isTodayChecked}
              className="attendance-submit-btn"
              style={{
                width: "100%",
                height: "44px",
                background: isTodayChecked ? "var(--gcu-navy)" : "var(--gcu-red)",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                fontWeight: "800",
                fontSize: "0.9rem",
                cursor: isTodayChecked ? "not-allowed" : "pointer",
                transition: "all 0.25s ease",
                opacity: isTodayChecked ? 0.75 : 1
              }}
            >
              {isTodayChecked ? `👍 ${tDash.checkedIn}` : `✨ ${tDash.checkInBtn}`}
            </button>
          </div>
        </div>

        {/* 4 & 5. Card News feeds: Jobs & Scholarships (Ordered dynamically based on role) */}
        {isStudent ? (
          <>
            {renderScholarshipsSection()}
            {renderJobsSection()}
          </>
        ) : (
          <>
            {renderJobsSection()}
            {renderScholarshipsSection()}
          </>
        )}

        {/* 6. Cooperation Partners List (Footer of Dashboard) */}
        <section className="glass-panel" style={{ padding: "32px", background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--border-color)", borderRadius: "24px" }}>
          <div className="section-header" style={{ marginBottom: "20px" }}>
            <div className="section-title">
              <span className="section-title-dot"></span>
              <h2 style={{ fontSize: "clamp(1.15rem, 3.5vw, 1.45rem)", whiteSpace: "nowrap" }}>{tHome.partnerTitle}</h2>
            </div>
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.6" }}>
            {tHome.partnerDesc}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
            {PARTNERS.map((partner, index) => {
              const partnerName = partner.name[lang as "ko" | "en" | "vn" | "mn"] || partner.name.ko;
              const partnerDesc = partner.description[lang as "ko" | "en" | "vn" | "mn"] || partner.description.ko;

              return (
                <a 
                  key={index}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handlePartnerClick(e, partnerName)}
                  className="shortcut-card glass-panel"
                  style={{ 
                    position: "relative",
                    display: "flex", 
                    flexDirection: "column", 
                    padding: "20px", 
                    textDecoration: "none", 
                    transition: "all 0.3s ease",
                    overflow: "hidden",
                    border: "1px solid rgba(0, 0, 0, 0.06)",
                    background: "#ffffff"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor = partner.color;
                    e.currentTarget.style.boxShadow = `0 8px 30px ${partner.color}1c`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.06)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "3.5px", background: partner.color }}></div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <span style={{ fontSize: "1.75rem" }}>{partner.icon}</span>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--gcu-navy)", margin: 0, letterSpacing: "-0.3px", wordBreak: "keep-all" }}>
                      {partnerName}
                    </h4>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", margin: 0, lineHeight: "1.4" }}>
                    {partnerDesc}
                  </p>
                </a>
              );
            })}
          </div>
        </section>

        {/* 7. POPUP MODAL FOR APPLYING */}
        {selectedCard && (
          <div className="modal-overlay">
            <div className="modal-box">
              <button 
                onClick={() => setSelectedCard(null)}
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  background: "none",
                  border: "none",
                  fontSize: "1.3rem",
                  cursor: "pointer",
                  color: "var(--text-muted)"
                }}
              >
                ✕
              </button>

              <h3 style={{ fontSize: "1.2rem", fontWeight: "800", color: "var(--gcu-navy)", marginBottom: "8px" }}>
                {selectedCard.title[lang as "ko" | "en" | "vn" | "mn"] || selectedCard.title.ko}
              </h3>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: "1.5", marginBottom: "20px" }}>
                {selectedCard.detailText[lang as "ko" | "en" | "vn" | "mn"] || selectedCard.detailText.ko}
              </p>

              <div style={{ height: "1px", background: "rgba(0,0,0,0.08)", marginBottom: "20px" }}></div>

              <h4 style={{ fontSize: "0.9rem", fontWeight: "700", color: "var(--gcu-navy)", marginBottom: "4px" }}>
                {tDash.modalApplyTitle}
              </h4>
              <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "16px" }}>
                {tDash.modalApplyDesc}
              </p>

              {applySuccessMsg ? (
                <div style={{ padding: "16px", background: "rgba(114, 191, 68, 0.08)", border: "1px solid rgba(114, 191, 68, 0.3)", borderRadius: "10px", color: "#438e1a", fontSize: "0.85rem", fontWeight: "700", textAlign: "center" }}>
                  {applySuccessMsg}
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} style={{ display: "flex", flexDirection: "column", gap: "12px", textAlign: "left" }}>
                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: "700", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                      {tDash.formName}
                    </label>
                    <input
                      type="text"
                      className="search-input"
                      value={applyForm.name}
                      onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                      style={{ padding: "8px 12px", height: "38px", fontSize: "0.85rem" }}
                      required
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div>
                      <label style={{ fontSize: "0.75rem", fontWeight: "700", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                        {tDash.formEmail}
                      </label>
                      <input
                        type="email"
                        className="search-input"
                        value={applyForm.email}
                        onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                        style={{ padding: "8px 12px", height: "38px", fontSize: "0.85rem" }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.75rem", fontWeight: "700", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                        {tDash.formPhone}
                      </label>
                      <input
                        type="tel"
                        className="search-input"
                        placeholder="010-XXXX-XXXX"
                        value={applyForm.phone}
                        onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })}
                        style={{ padding: "8px 12px", height: "38px", fontSize: "0.85rem" }}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: "700", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                      {tDash.formTopik}
                    </label>
                    <select
                      className="search-input"
                      value={applyForm.topik}
                      onChange={(e) => setApplyForm({ ...applyForm, topik: e.target.value })}
                      style={{ padding: "8px 12px", height: "38px", fontSize: "0.85rem", background: "#ffffff" }}
                    >
                      <option value="No TOPIK">No TOPIK</option>
                      <option value="Level 1">Level 1</option>
                      <option value="Level 2">Level 2</option>
                      <option value="Level 3">Level 3</option>
                      <option value="Level 4">Level 4</option>
                      <option value="Level 5">Level 5</option>
                      <option value="Level 6">Level 6</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: "0.75rem", fontWeight: "700", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                      {tDash.formIntro}
                    </label>
                    <textarea
                      className="search-input"
                      value={applyForm.intro}
                      onChange={(e) => setApplyForm({ ...applyForm, intro: e.target.value })}
                      style={{ padding: "10px 12px", height: "80px", fontSize: "0.85rem", resize: "none" }}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    style={{
                      height: "42px",
                      background: "var(--gcu-red)",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "10px",
                      fontWeight: "800",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      marginTop: "10px"
                    }}
                  >
                    🚀 {tDash.submitApply}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // If foreigner is logged in, show personalized student/worker dashboard instead
  if (activeUser && activeUser.role !== "admin" && activeUser.role !== "manager") {
    return renderForeignerDashboard();
  }

  const handlePartnerClickOld = (e: React.MouseEvent<HTMLAnchorElement>, name: string) => {
    if (!confirm(`${tHome.confirmPrefix}${name}${tHome.confirmSuffix}`)) {
      e.preventDefault();
    }
  };


  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      {/* 0. Live Sync Status Banner */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: "12px 20px", 
          display: "flex", 
          alignItems: "center", 
          gap: "12px", 
          background: "linear-gradient(90deg, rgba(18, 42, 77, 0.04) 0%, rgba(198, 26, 43, 0.04) 100%)",
          border: "1px solid rgba(198, 26, 43, 0.15)",
          borderRadius: "16px",
          boxShadow: "0 4px 15px rgba(18, 42, 77, 0.03)",
          flexDirection: "row",
          width: "100%"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span 
            className="sync-status-dot" 
            style={{ 
              width: "8px", 
              height: "8px", 
              background: "var(--gcu-red)", 
              boxShadow: "0 0 12px var(--gcu-red)", 
              animation: "pulseRed 2.0s infinite" 
            }}
          ></span>
        </div>
        <p style={{ 
          margin: 0, 
          fontSize: "0.85rem", 
          fontWeight: "700", 
          color: "var(--gcu-navy)", 
          lineHeight: "1.5", 
          wordBreak: "keep-all"
        }}>
          {tHome.syncBannerText}
        </p>
      </div>

      {/* 1. Hero Dynamic Presentation Banner */}
      <section className="hero-section">
        <div className="hero-body">
          <div className="hero-subtitle">{t("heroSubtitle")}</div>
          <h1 className="hero-title" style={{ fontSize: "clamp(1.8rem, 5vw, 2.75rem)", lineHeight: "1.25", wordBreak: "keep-all" }}>
            {t("heroTitle")}
          </h1>
          <p className="hero-desc">
            {t("heroDesc")}
          </p>
          <div className="hero-buttons">
            <a href="/learning" className="btn-primary" style={{ whiteSpace: "nowrap" }}>
              {t("heroCtaBtn")}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="/intro" className="btn-secondary" style={{ whiteSpace: "nowrap" }}>{t("heroIntroBtn")}</a>
          </div>
        </div>

        <div className="hero-stats">
          <div className="hero-stats-card glass-panel">
            <div className="hero-stat-val">1,240+</div>
            <div className="hero-stat-label" style={{ wordBreak: "keep-all" }}>{t("statStudents")}</div>
          </div>
          <div className="hero-stats-card glass-panel">
            <div className="hero-stat-val orange">94.2%</div>
            <div className="hero-stat-label" style={{ wordBreak: "keep-all" }}>{t("statPassRate")}</div>
          </div>
          <div className="hero-stats-card glass-panel">
            <div className="hero-stat-val">F-2-R</div>
            <div className="hero-stat-label" style={{ wordBreak: "keep-all" }}>{t("statVisa")}</div>
          </div>
          <div className="hero-stats-card glass-panel">
            <div className="hero-stat-val orange">4.8 / 5.0</div>
            <div className="hero-stat-label" style={{ wordBreak: "keep-all" }}>{t("statSatisfaction")}</div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Navigation Shortcuts Grid */}
      <section>
        <div className="section-header">
          <div className="section-title">
            <span className="section-title-dot"></span>
            <h2>{tHome.quickLinksTitle}</h2>
          </div>
        </div>

        <div className="dashboard-shortcuts">
          <a href="/intro" className="shortcut-card glass-panel glass-panel-accent">
            <div className="shortcut-icon-box blue">🏢</div>
            <div className="shortcut-title">{t("scIntroTitle")}</div>
            <div className="shortcut-desc">{t("scIntroDesc")}</div>
          </a>

          <a href="/learning" className="shortcut-card glass-panel glass-panel-accent">
            <div className="shortcut-icon-box green">📚</div>
            <div className="shortcut-title">{t("scLearnTitle")}</div>
            <div className="shortcut-desc">{t("scLearnDesc")}</div>
          </a>

          <a href="/life" className="shortcut-card glass-panel glass-panel-accent">
            <div className="shortcut-icon-box orange">💼</div>
            <div className="shortcut-title">{t("scLifeTitle")}</div>
            <div className="shortcut-desc">{t("scLifeDesc")}</div>
          </a>

          <a href="/community" className="shortcut-card glass-panel glass-panel-accent">
            <div className="shortcut-icon-box yellow">👥</div>
            <div className="shortcut-title">{t("scCommTitle")}</div>
            <div className="shortcut-desc">{t("scCommDesc")}</div>
          </a>
        </div>
      </section>

      {/* 3. Comprehensive Info Feeds (100% full-width expanded layout) */}
      <div style={{ marginBottom: "56px" }}>
        <section className="glass-panel" style={{ padding: "32px", overflow: "hidden" }}>
          <div className="section-header" style={{ marginBottom: "20px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "20px" }}>
            {/* Wrap container supporting wrap to completely prevent word splits and breakages on small viewports */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", flexWrap: "wrap", gap: "16px" }}>
              <div className="section-title" style={{ minWidth: "260px", flex: "1" }}>
                <span className="section-title-dot"></span>
                <h3 style={{ fontSize: "clamp(1.15rem, 3.5vw, 1.45rem)", whiteSpace: "nowrap", letterSpacing: "-0.5px" }}>
                  {t("feedSectionTitle")}
                </h3>
              </div>
              
              {/* Dynamic Synchronization Actions (White-space Nowrap guaranteed) */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "nowrap", flexShrink: 0 }}>
                <div className="sync-status-indicator" style={{ whiteSpace: "nowrap", flexShrink: 0 }}>
                  <span className={`sync-status-dot ${isSyncing ? "syncing" : ""}`}></span>
                  <span style={{ fontSize: "0.75rem", whiteSpace: "nowrap" }}>
                    {isSyncing ? t("syncing") : syncedCount > 0 ? t("syncSuccess") : t("syncPending")}
                  </span>
                </div>
                
                <button 
                  onClick={handleSyncPortals}
                  disabled={isSyncing}
                  className={`btn-sync-trigger ${isSyncing ? "syncing" : ""}`}
                  style={{ whiteSpace: "nowrap", flexShrink: 0 }}
                >
                  <svg 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{ marginRight: "4px", transition: "transform 0.5s ease" }}
                  >
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                  </svg>
                  {t("btnSyncTrigger")}
                </button>
              </div>
            </div>

            <div className="filter-tags" style={{ marginBottom: 0, flexWrap: "wrap" }}>
              <button 
                onClick={() => setActiveFeedTab("all")} 
                className={`filter-tag-btn ${activeFeedTab === "all" ? "active" : ""}`}
                style={{ whiteSpace: "nowrap" }}
              >
                {t("feedTabAll")}
              </button>
              <button 
                onClick={() => setActiveFeedTab("notice")} 
                className={`filter-tag-btn ${activeFeedTab === "notice" ? "active" : ""}`}
                style={{ whiteSpace: "nowrap" }}
              >
                {t("feedTabNotice")}
              </button>
              <button 
                onClick={() => setActiveFeedTab("gov")} 
                className={`filter-tag-btn ${activeFeedTab === "gov" ? "active" : ""}`}
                style={{ whiteSpace: "nowrap" }}
              >
                {t("feedTabGov")}
              </button>
              <button 
                onClick={() => setActiveFeedTab("event")} 
                className={`filter-tag-btn ${activeFeedTab === "event" ? "active" : ""}`}
                style={{ whiteSpace: "nowrap" }}
              >
                {t("feedTabEvent")}
              </button>
              <button 
                onClick={() => setActiveFeedTab("guide")} 
                className={`filter-tag-btn ${activeFeedTab === "guide" ? "active" : ""}`}
                style={{ whiteSpace: "nowrap" }}
              >
                {t("feedTabGuide")}
              </button>
            </div>
          </div>

          <div className="feed-list">
            {filteredFeeds.map(feed => {
              const displayTitle = feed.title[lang as "ko" | "en" | "vn" | "mn"] || feed.title.ko;
              let displayCategory = tHome.tagNotice;
              if (feed.category === "event") displayCategory = tHome.tagEvent;
              if (feed.category === "guide") displayCategory = tHome.tagGuide;
              if (feed.category === "gov") displayCategory = "LIVE GOV";

              return (
                <div 
                  key={feed.id} 
                  className="feed-item"
                  style={
                    feed.category === "gov" 
                      ? { border: "1px solid rgba(18, 42, 77, 0.12)", background: "rgba(18, 42, 77, 0.02)" } 
                      : {}
                  }
                >
                  <div className="feed-body">
                    <span className={`feed-tag ${feed.category}`}>
                      {displayCategory}
                    </span>
                    <div 
                      className="feed-title"
                      style={feed.category === "gov" ? { color: "var(--gcu-navy)", fontWeight: "700" } : {}}
                    >
                      {displayTitle}
                    </div>
                  </div>
                  <div 
                    className="feed-date"
                    style={feed.category === "gov" ? { color: "var(--gcu-red)", fontWeight: "600" } : {}}
                  >
                    {feed.date}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* 4.5 Cooperation Partners Section */}
      <section className="glass-panel" style={{ padding: "32px", background: "rgba(255, 255, 255, 0.02)", border: "1px solid var(--border-color)", borderRadius: "24px" }}>
        <div className="section-header" style={{ marginBottom: "20px" }}>
          <div className="section-title">
            <span className="section-title-dot"></span>
            <h2 style={{ fontSize: "clamp(1.15rem, 3.5vw, 1.45rem)", whiteSpace: "nowrap" }}>{tHome.partnerTitle}</h2>
          </div>
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.6" }}>
          {tHome.partnerDesc}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
          {PARTNERS.map((partner, index) => {
            const partnerName = partner.name[lang as "ko" | "en" | "vn" | "mn"] || partner.name.ko;
            const partnerDesc = partner.description[lang as "ko" | "en" | "vn" | "mn"] || partner.description.ko;

            return (
              <a 
                key={index}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handlePartnerClick(e, partnerName)}
                className="shortcut-card glass-panel"
                style={{ 
                  position: "relative",
                  display: "flex", 
                  flexDirection: "column", 
                  padding: "20px", 
                  textDecoration: "none", 
                  transition: "all 0.3s ease",
                  overflow: "hidden",
                  border: "1px solid rgba(0, 0, 0, 0.06)",
                  background: "#ffffff"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = partner.color;
                  e.currentTarget.style.boxShadow = `0 8px 30px ${partner.color}1c`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.06)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Highlight strip with partner colors */}
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "3.5px", background: partner.color }}></div>
                
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "1.75rem" }}>{partner.icon}</span>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--gcu-navy)", margin: 0, letterSpacing: "-0.3px", wordBreak: "keep-all" }}>
                    {partnerName}
                  </h4>
                </div>
                
                <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", margin: 0, lineHeight: "1.4" }}>
                  {partnerDesc}
                </p>
              </a>
            );
          })}
        </div>
      </section>

      {/* 5. Custom Sleek Glassmorphic Redirection Toast Overlay */}
      {toast && (
        <div className="toast-notification">
          <span style={{ fontSize: "1.35rem" }}>📡</span>
          <div style={{ fontSize: "0.85rem", lineHeight: "1.5", fontWeight: "500" }}>{toast}</div>
          <button className="toast-close" onClick={() => setToast(null)}>✕</button>
        </div>
      )}
    </div>
  );
}
