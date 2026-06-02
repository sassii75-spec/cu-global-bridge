"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

interface ExamRecord {
  examId: string;
  examTitle: string;
  score: number;
  level: string;
  date: string;
  selectedAnswers: number[];
  answerKey: number[];
  pdfFileName: string;
  pdfDataUrl: string;
  answerPdfFileName?: string;
  answerPdfDataUrl?: string;
  questionCount: number;
}

interface CustomQna {
  id: number;
  question: { ko: string; en: string; vn: string; mn: string };
  answer: { ko: string; en: string; vn: string; mn: string };
}

// Curated FAQs specifically for multicultural students and foreign workers
const FAQ_ITEMS = [
  {
    id: 1,
    question: {
      ko: "🎓 글로벌 유학생 D-2 비자인데 합법적으로 아르바이트가 가능합니까?",
      en: "🎓 I am an international student with a D-2 visa. Can I legally work part-time?",
      vn: "🎓 Tôi là du học sinh diện visa D-2. Tôi có thể làm thêm hợp pháp không?",
      mn: "🎓 Би D-2 визтэй гадаад оюутан байна. Цагийн ажил хууль ёсоор хийх боломжтой юу?"
    },
    answer: {
      ko: "네, 가능합니다. 대학교 유학생 담당 부서에서 '시간제취업 추천서'를 발급받은 후 관할 출입국관리사무소의 사전 승인을 거치면 주당 제한시간(학부생 기준 학기 중 20~25시간, 방학 중 무제한) 범위 내에서 합법적인 근무가 가능합니다. 학사 경고 처분을 받았거나 출석률이 미달인 경우 신청이 제한될 수 있습니다.",
      en: "Yes. After obtaining a 'Part-time Work Recommendation Letter' from the university's international student office and gaining prior approval from the local immigration office, you can legally work within weekly limit hours (usually 20 to 25 hours per week during semesters, and unlimited during vacations). Applications may be restricted for students on academic probation or with low attendance.",
      vn: "Có, hoàn toàn được. Sau khi được văn phòng hỗ trợ du học sinh của trường cấp 'Thư giới thiệu làm thêm' và được Văn phòng Quản lý Xuất nhập cảnh sở tại phê duyệt trước, bạn có thể làm việc hợp pháp trong hạn mức giờ quy định (thường là 20-25 giờ/tuần trong học kỳ và không giới hạn trong kỳ nghỉ). Việc đăng ký có thể bị hạn chế nếu điểm số thấp hoặc tỷ lệ chuyên cần không đạt.",
      mn: "Тийм ээ, боломжтой. Сургуулийн гадаад оюутны албанаас 'Цагийн ажил хийх тодорхойлолт' авч, харьяа цагаачлалын албанаас зөвшөөрөл авснаар долоо хоногийн хязгаартай цагт (хичээлийн үеэр 20-25 цаг, амралтаар хязгааргүй) хууль ёсоор ажиллах боломжтой. Сурлагын анхааруулга авсан эсвэл ирц хүрээгүй тохиолдолд зөвшөөрөл олгохгүй байх магадлалтай."
    }
  },
  {
    id: 2,
    question: {
      ko: "💼 F-2-R 지역특화비자는 무엇이며 자격 혜택 요건이 어떻게 되나요?",
      en: "💼 What is the F-2-R Regional Visa and what are its requirements?",
      vn: "💼 Visa định cư đặc thù khu vực F-2-R là gì và tiêu chuẩn điều kiện ra sao?",
      mn: "💼 F-2-R Орон нутгийн оршин суух виз гэж юу вэ, тавигдах шаардлага юу вэ?"
    },
    answer: {
      ko: "정부가 인구 감소 지역 활성화를 위해 우수 외국인 인재 유치를 도모하는 비자 사업입니다. 국내 대학 학사 학위 이상을 취득한 졸업생이나 근로자 중 연간 소득 요건 충족 및 한국어 능력 증빙(TOPIK 3급 이상 또는 사회통합프로그램 수료)을 마친 외국인에 한해 신청 기회가 주어집니다. 본 비자를 취득하면 추천받은 인구감소 대상 지자체 내에서 5년간 의무 거주하며 합법적으로 취업 및 거주 혜택을 누릴 수 있습니다.",
      en: "It is a visa program designed by the government to attract excellent foreign talents to revitalize shrinking population regions. Foreigners who have graduated with a bachelor's degree or higher from Korean universities, satisfy annual income thresholds, and verify Korean proficiency (TOPIK level 3+ or completion of KIIP) are eligible to apply. It requires residing and working in the designated region for 5 years with long-term residency benefits.",
      vn: "Đây là chương trình visa định cư do chính phủ thiết kế nhằm thu hút nhân tài nước ngoài xuất sắc để vực dậy các khu vực suy giảm dân số. Du học sinh tốt nghiệp cử nhân trở lên tại Hàn Quốc hoặc người lao động đáp ứng yêu cầu về thu nhập hàng năm và chứng minh năng lực tiếng Hàn (TOPIK cấp 3 trở lên hoặc hoàn thành KIIP) được quyền đăng ký. Sở hữu visa này, bạn sẽ cư trú và làm việc nghĩa vụ 5 năm tại khu vực được chỉ định.",
      mn: "Энэ нь хүн ам цөөрч буй орон нутгийг идэвхжүүлэх зорилгоор шилдэг гадаадын иргэдийг татах зорилготой визний хөтөлбөр юм. Солонгосын их сургуульд бакалавр болон түүнээс дээш зэрэг хамгаалсан төгсөгчид эсвэл ажилчид жилийн орлого болон солонгос хэлний түвшнээ (TOPIK 3-р зэрэг эсвэл KIIP курс дүүргэсэн) баталснаар өргөдөл гаргах боломжтой. Энэхүү визийг авснаар орон нутагт 5 жил амьдран, хууль ёсоор ажиллах эрхтэй болно."
    }
  },
  {
    id: 3,
    question: {
      ko: "🔑 모의고사 공식 해설지 PDF 파일은 어디서 다운로드받나요?",
      en: "🔑 Where can I download the explanation PDF files for mock exams?",
      vn: "🔑 Tôi có thể tải xuống tệp PDF giải thích thi thử ở đâu?",
      mn: "🔑 Загвар шалгалтын тайлбар бүхий PDFファイルをхаанаас татаж авах вэ?"
    },
    answer: {
      ko: "모의고사를 응시 완료한 직후 출력되는 결과 화면 하단이나, 지금 접속해 계신 마이페이지(개인정보페이지) 중간의 '모의고사 이력 관리 테이블'에서 응시하셨던 시험지의 [🔍 상세 보기] 버튼을 클릭해 주십시오. 팝업으로 나타나는 모달 창 상단에 출제 관리자가 업로드해 둔 '기출 정답 및 해설집 PDF 받기' 링크가 자동으로 연동되어 있어 편리하게 상시 다운로드할 수 있습니다.",
      en: "You can download it at the bottom of the result screen immediately after submitting the mock exam, or in your My Page (this profile page) mock exam history table. Simply click the [🔍 View Details] button on any taken exam. The registered 'Download Answer & Explanation Guide' PDF link is beautifully integrated inside the modal popup window.",
      vn: "Bạn có thể tải xuống ngay dưới màn hình kết quả sau khi nộp bài thi thử, hoặc tại bảng lịch sử thi thử ở trang Cá nhân (trang này). Chỉ cần nhấp vào nút [🔍 Xem chi tiết] của bài thi đã làm. Liên kết tải xuống tệp PDF giải thích chính thức sẽ xuất hiện trực quan ở phần trên cùng của cửa sổ hiện lên.",
      mn: "Загвар шалгалтын хариуг илгээсний дараа дэлгэцийн доор, эсвэл энэхүү хувийн хуудасны шалгалтын түүхийн хэсэгт байгаа [🔍 상세 보기] товчийг дарна уу. Шалгалт бэлтгэгчийн оруулсан албан ёсны тайлбар бүхий PDF файл татах холбоос цонхны дээд хэсэгт автоматаар гарч ирэх болно."
    }
  },
  {
    id: 4,
    question: {
      ko: "🏫 다문화 유학생/해외 근로자 전용 등록금 장학금 혜택 제도가 있나요?",
      en: "🏫 Are there specific university scholarship policies for international students/workers?",
      vn: "🏫 Trường có chế độ học bổng học phí dành riêng cho học sinh đa văn hóa/lao động nước ngoài không?",
      mn: "🏫 Олон соёлт гэр бүл, гадаад оюутанд зориулсан сургалтын төлбөрийн тэтгэлэг байдаг уу?"
    },
    answer: {
      ko: "글로벌사이버대학교 글로벌 브릿지 사업부는 다문화 유학생들과 국내 거주 외국인 근로자들의 지속적 학업 의지를 독려하고자 학기별 평점 요건(GPA 2.5 이상 유지) 충족 시 등록금의 30%에서 최대 50%까지의 감면 장학 혜택을 다각도로 매칭해 드립니다. 자세한 신청서 작성 양식과 지원 서류 검토 일정은 학습지원센터 자료실 및 학사 공지사항 탭을 참조해주시기 바랍니다.",
      en: "To encourage continuous academic passion among international students and workers, Global Cyber University's Global Bridge office provides tuition scholarships ranging from 30% to 50% per semester if credit requirements (GPA 2.5+) are met. Detailed application forms and submission schedules can be viewed under the Learning Center Prep Materials and Notice tabs.",
      vn: "Nhằm khuyến khích tinh thần học tập bền bỉ của du học sinh đa văn hóa và lao động nước ngoài, ban Global Bridge của Đại học Global Cyber hỗ trợ khớp các khoản học bổng giảm học phí từ 30% đến tối đa 50% mỗi học kỳ khi đáp ứng chuẩn điểm số tích lũy (GPA từ 2.5 trở lên). Mẫu đơn đăng ký chi tiết và lịch xét duyệt tài liệu có thể tham khảo tại bảng thông báo học vụ.",
      mn: "Глобал Сайбер Их Сургуулийн Глобал Бридж хэлтэс нь гадаад оюутан, ажилчдын сурах эрмэлзлийг дэмжих зорилгоор хичээлийн голч дүн (GPA 2.5-аас дээш) хангасан тохиолдолд сургалтын төлбөрийг 30%-иас 50% хүртэл хөнгөлөх тэтгэлэг олгодог. Өргөдлийн маягт болон шаардлагатай бичиг баримтын зааврыг сургуулийн зарлан мэдээллийн хэсгээс харна уу."
    }
  }
];

export default function ProfilePage() {
  const { lang } = useLanguage();

  const [activeUser, setActiveUser] = useState<any>(null);
  const [examHistory, setExamHistory] = useState<ExamRecord[]>([]);
  const [communityCount, setCommunityCount] = useState<number>(0);
  const [qnaCount, setQnaCount] = useState<number>(0);
  const [qnaList, setQnaList] = useState<CustomQna[]>([]);

  // Selected history record to view detailed OMR report popup
  const [selectedHistoryRecord, setSelectedHistoryRecord] = useState<ExamRecord | null>(null);

  // FAQ Accordion expand collapse states
  const [expandedFaq, setExpandedFaq] = useState<Record<number, boolean>>({});
  const [expandedQna, setExpandedQna] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Load active user session info
      const session = localStorage.getItem("gcu-active-session");
      if (session) {
        try {
          const user = JSON.parse(session);
          setActiveUser(user);

          // 2. Count community posts and comments authored by the user
          const savedPostsStr = localStorage.getItem("gcu-community-posts");
          if (savedPostsStr) {
            const posts = JSON.parse(savedPostsStr);
            const userPosts = posts.filter((p: any) => p.author === user.name).length;
            const userComments = posts.reduce((acc: number, p: any) => {
              const myComments = p.comments?.filter((c: any) => c.author.includes(user.name)) || [];
              return acc + myComments.length;
            }, 0);
            setCommunityCount(userPosts + userComments);
          } else {
            setCommunityCount(0);
          }
        } catch (e) {
          console.error("Failed to parse user session in profile:", e);
        }
      }

      // 3. Load exam histories taken
      const savedHistoryStr = localStorage.getItem("gcu-exam-history");
      if (savedHistoryStr) {
        try {
          setExamHistory(JSON.parse(savedHistoryStr));
        } catch (e) {
          console.error("Failed to parse exam histories in profile:", e);
        }
      }

      // 4. Load Q&A questions submitted
      const savedQnaStr = localStorage.getItem("gcu-qna-list");
      if (savedQnaStr) {
        try {
          const list = JSON.parse(savedQnaStr);
          setQnaList(list);
          setQnaCount(list.length);
        } catch (e) {
          console.error("Failed to parse QnA list in profile:", e);
        }
      }
    }
  }, []);

  const toggleFaq = (id: number) => {
    setExpandedFaq(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleQna = (id: number) => {
    setExpandedQna(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Profile page metrics calculation
  const totalExams = examHistory.length;
  const averageScore = totalExams > 0 
    ? Math.round(examHistory.reduce((acc, cur) => acc + cur.score, 0) / totalExams)
    : 0;
  const highestScore = totalExams > 0 
    ? Math.max(...examHistory.map(h => h.score))
    : 0;
  const passCount = examHistory.filter(h => h.score >= 60).length;
  const passRate = totalExams > 0 ? Math.round((passCount / totalExams) * 100) : 0;

  // Render guard if not logged in
  if (!activeUser) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", flexDirection: "column", gap: "24px" }}>
        <div className="glass-panel" style={{ padding: "40px", maxWidth: "500px", textAlign: "center", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
          <span style={{ fontSize: "3rem" }}>🔒</span>
          <h2 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#fff", margin: "16px 0 8px 0" }}>
            {lang === "ko" ? "로그인이 필요한 서비스입니다" : "Authentication Required"}
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.6" }}>
            {lang === "ko" 
              ? "마이페이지에서는 개인정보, 학습이력 분석 및 Q&A 기록을 통합 관리합니다. 계정으로 로그인해 주시기 바랍니다."
              : "Please login with your university account to manage personal profiles, mock exam analysis, and submitted inquiries."}
          </p>
          <a href="/login" className="btn-primary" style={{ display: "inline-block", padding: "10px 24px", color: "#060A1A", fontWeight: "700", textDecoration: "none", borderRadius: "8px" }}>
            {lang === "ko" ? "로그인 페이지로 가기" : "Go to Login Page"}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      {/* 1. Page Header */}
      <section className="glass-panel" style={{ padding: "40px", background: "linear-gradient(135deg, rgba(33, 64, 154, 0.2) 0%, rgba(114, 191, 68, 0.05) 100%)" }}>
        <h1 className="hero-title" style={{ fontSize: "2.25rem", marginBottom: "12px" }}>
          {lang === "ko" ? "👤 마이페이지 & 학습 진단 센터" : "👤 My Profile & Academic Diagnosis"}
        </h1>
        <p className="hero-desc" style={{ marginBottom: 0, fontSize: "1rem" }}>
          {lang === "ko" 
            ? "학생 정보 및 모의고사 성취 성적, 커뮤니티 기여 지수와 상담 Q&A 내역을 대시보드에서 정밀 점검하십시오."
            : "Monitor your personal student registration details, mock exam performance statistics, community contribution score, and Q&A history."}
        </p>
      </section>

      {/* 2. Top Section: User Profile Detail Grid & Activity Counters */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        
        {/* User Card */}
        <div className="glass-panel" style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "24px", background: "rgba(255,255,255,0.015)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div 
              style={{ 
                width: "64px", 
                height: "64px", 
                borderRadius: "50%", 
                background: "linear-gradient(135deg, var(--gcu-sky) 0%, var(--gcu-green) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.8rem",
                color: "#fff",
                fontWeight: "900",
                boxShadow: "0 0 16px rgba(0, 185, 242, 0.3)"
              }}
            >
              {activeUser.name.slice(0, 1).toUpperCase()}
            </div>
            <div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "#fff", margin: "0 0 4px 0" }}>{activeUser.name}</h3>
              <span className={`feed-tag ${activeUser.role === "admin" ? "notice" : activeUser.role === "worker" ? "guide" : "event"}`} style={{ fontSize: "0.75rem", padding: "2px 8px" }}>
                {activeUser.role === "admin" 
                  ? (lang === "ko" ? "🔑 통합 전산 관리자" : "Admin")
                  : activeUser.role === "worker" 
                    ? (lang === "ko" ? "💼 글로벌 근로자" : "Global Worker")
                    : (lang === "ko" ? "🎓 글로벌 정규 유학생" : "International Student")}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "20px", fontSize: "0.85rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-muted)" }}>{lang === "ko" ? "이메일 계정" : "Email"}</span>
              <span style={{ color: "#fff", fontWeight: "600" }}>{activeUser.email}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-muted)" }}>{lang === "ko" ? "소속 국적" : "Nationality"}</span>
              <span style={{ color: "#fff", fontWeight: "600" }}>{activeUser.nationality}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-muted)" }}>{lang === "ko" ? "최초 가입일" : "Joined Date"}</span>
              <span style={{ color: "#fff", fontWeight: "600" }}>{activeUser.joinedDate || "2026-05-20"}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-muted)" }}>{lang === "ko" ? "연동 채널" : "Provider"}</span>
              <span 
                style={{ 
                  fontSize: "0.75rem", 
                  padding: "1px 6px", 
                  borderRadius: "4px", 
                  background: activeUser.provider === "google" ? "rgba(255,255,255,0.06)" : "rgba(33,64,154,0.15)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  fontWeight: "700",
                  color: "#fff"
                }}
              >
                {activeUser.provider.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Activity Metrics Summary Card */}
        <div className="glass-panel" style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "20px", background: "rgba(255,255,255,0.015)" }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#fff", margin: 0 }}>
            {lang === "ko" ? "📊 나의 학업 활동 요약" : "📊 My Academic Contributions"}
          </h3>
          <p style={{ fontSize: "0.78rem", color: "var(--text-secondary)", margin: 0 }}>
            {lang === "ko" 
              ? "유학생 포털 내 커뮤니티 기여 및 Q&A 접수 건수, 학습 지원 서비스 이용 현황 통계입니다."
              : "Summary of your total posts, comments, Q&As submitted, and learning Support services taken."}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "4px" }}>
            <div style={{ background: "rgba(255,255,255,0.02)", padding: "16px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.03)" }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>
                {lang === "ko" ? "💬 커뮤니티 참여 건수" : "Community Activities"}
              </span>
              <strong style={{ fontSize: "1.6rem", color: "var(--gcu-green)", fontFamily: "monospace" }}>{communityCount}{lang === "ko" ? "건" : " EA"}</strong>
            </div>

            <div style={{ background: "rgba(255,255,255,0.02)", padding: "16px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.03)" }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>
                {lang === "ko" ? "❓ 1:1 상담 접수 내역" : "Submitted Q&As"}
              </span>
              <strong style={{ fontSize: "1.6rem", color: "var(--gcu-orange)", fontFamily: "monospace" }}>{qnaCount}{lang === "ko" ? "건" : " EA"}</strong>
            </div>

            <div style={{ background: "rgba(255,255,255,0.02)", padding: "16px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.03)", gridColumn: "span 2" }}>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>
                {lang === "ko" ? "💼 취업 비자 계산 완료 이력" : "Visa Simulation Done"}
              </span>
              <span style={{ fontSize: "0.85rem", color: "#fff", fontWeight: "600" }}>
                {lang === "ko" ? "지역특화형 F-2-R 점수 산출 데이터 활성화됨" : "F-2-R Regional points record synced"}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. TOPIK Mock Exam Performance Analysis Dashboard (모의고사 풀이 분석) */}
      <div className="glass-panel" style={{ padding: "32px", background: "rgba(255,255,255,0.015)" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>
          {lang === "ko" ? "🎯 TOPIK IBT 모의고사 학업 성취도 진단" : "🎯 TOPIK IBT Academic Achievement Diagnosis"}
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "24px" }}>
          {lang === "ko" 
            ? "학생 고사장에서 치른 기출 모의고사의 득점 데이터를 분석하여 약점 보완 요소를 제시합니다."
            : "Diagnostic reports showing your mock exam average grades, correct ratios, and passed metrics."}
        </p>

        {totalExams > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            
            {/* Stat Cards Row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "16px" }}>
              <div style={{ background: "rgba(0,185,242,0.04)", padding: "18px", borderRadius: "10px", border: "1px solid rgba(0,185,242,0.15)", textAlign: "center" }}>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>{lang === "ko" ? "총 응시 횟수" : "Total Attempts"}</span>
                <strong style={{ fontSize: "1.8rem", color: "#fff", fontFamily: "monospace" }}>{totalExams}{lang === "ko" ? "회" : " Times"}</strong>
              </div>

              <div style={{ background: averageScore >= 60 ? "rgba(87,255,154,0.04)" : "rgba(247,147,30,0.04)", padding: "18px", borderRadius: "10px", border: averageScore >= 60 ? "1px solid rgba(87,255,154,0.15)" : "1px solid rgba(247,147,30,0.15)", textAlign: "center" }}>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>{lang === "ko" ? "평균 점수" : "Average Score"}</span>
                <strong style={{ fontSize: "1.8rem", color: averageScore >= 60 ? "var(--gcu-green)" : "var(--gcu-orange)", fontFamily: "monospace" }}>{averageScore}{lang === "ko" ? "점" : "%"}</strong>
              </div>

              <div style={{ background: "rgba(0, 0, 0, 0.02)", padding: "18px", borderRadius: "10px", border: "1px solid rgba(0, 0, 0, 0.06)", textAlign: "center" }}>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>{lang === "ko" ? "최고 득점" : "High Score"}</span>
                <strong style={{ fontSize: "1.8rem", color: "var(--gcu-navy)", fontFamily: "monospace" }}>{highestScore}{lang === "ko" ? "점" : "%"}</strong>
              </div>

              <div style={{ background: "rgba(0, 0, 0, 0.02)", padding: "18px", borderRadius: "10px", border: "1px solid rgba(0, 0, 0, 0.06)", textAlign: "center" }}>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>{lang === "ko" ? "TOPIK 합격률" : "TOPIK Pass Rate"}</span>
                <strong style={{ fontSize: "1.8rem", color: "#2e7d32", fontFamily: "monospace" }}>{passRate}%</strong>
              </div>
            </div>

            {/* Visual Achievement Bar Chart */}
            <div style={{ background: "rgba(0, 0, 0, 0.03)", padding: "20px", borderRadius: "12px", border: "1px solid rgba(0, 0, 0, 0.06)" }}>
              <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)", fontWeight: "700", display: "block", marginBottom: "12px" }}>
                📊 {lang === "ko" ? "TOPIK 목표 성취 구간별 학습 진도율" : "TOPIK Target Accomplish Ratio"}
              </span>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "4px" }}>
                    <span style={{ color: "var(--text-secondary)" }}>{lang === "ko" ? "초급 목표 달성 (TOPIK I 합격선 60점 이상)" : "Beginner Level Target Met (Score >= 60)"}</span>
                    <span style={{ color: "var(--gcu-green)", fontWeight: "700" }}>{passCount} / {totalExams} ({passRate}%)</span>
                  </div>
                  <div style={{ width: "100%", height: "8px", background: "rgba(0, 0, 0, 0.05)", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ width: `${passRate}%`, height: "100%", background: "linear-gradient(90deg, var(--gcu-green) 0%, var(--gcu-green) 100%)", borderRadius: "4px", transition: "width 0.5s ease" }}></div>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid rgba(255,255,255,0.03)", paddingTop: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "4px" }}>
                    <span style={{ color: "var(--text-secondary)" }}>{lang === "ko" ? "중·고급 고득점 달성 (TOPIK II 수준 80점 이상)" : "Intermediate/Advanced High Score Met (Score >= 80)"}</span>
                    <span style={{ color: "var(--gcu-sky)", fontWeight: "700" }}>
                      {examHistory.filter(h => h.score >= 80).length} / {totalExams} ({totalExams > 0 ? Math.round((examHistory.filter(h => h.score >= 80).length / totalExams) * 100) : 0}%)
                    </span>
                  </div>
                  <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ width: `${totalExams > 0 ? (examHistory.filter(h => h.score >= 80).length / totalExams) * 100 : 0}%`, height: "100%", background: "linear-gradient(90deg, var(--gcu-sky) 0%, #00FFE0 100%)", borderRadius: "4px", transition: "width 0.5s ease" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Exam history database Table */}
            <div>
              <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)", fontWeight: "700", display: "block", marginBottom: "10px" }}>
                📂 {lang === "ko" ? "응시 완료된 모의고사 성적 기록 대장" : "Mock Exam Registered Logs"}
              </span>
              
              <div className="glass-panel" style={{ padding: "8px", overflowX: "auto", background: "rgba(0,0,0,0.15)" }}>
                <table className="resource-table" style={{ width: "100%", borderCollapse: "collapse", margin: 0 }}>
                  <thead>
                    <tr>
                      <th>{lang === "ko" ? "시험명" : "Exam Title"}</th>
                      <th>{lang === "ko" ? "응시 일자" : "Date"}</th>
                      <th>{lang === "ko" ? "득점" : "Score"}</th>
                      <th>{lang === "ko" ? "판정 수준" : "Grade"}</th>
                      <th style={{ textAlign: "center" }}>{lang === "ko" ? "상세 조회" : "Details"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examHistory.map((history, hIdx) => (
                      <tr key={hIdx}>
                        <td style={{ fontWeight: "700", color: "var(--text-primary)" }}>{history.examTitle}</td>
                        <td style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{history.date}</td>
                        <td style={{ color: history.score >= 60 ? "var(--gcu-sky)" : "var(--gcu-orange)", fontWeight: "800" }}>{history.score}{lang === "ko" ? "점" : "%"}</td>
                        <td>
                          <span className={`feed-tag ${history.score >= 60 ? "notice" : "event"}`} style={{ fontSize: "0.75rem", padding: "2px 8px" }}>
                            {history.level}
                          </span>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <button
                            type="button"
                            onClick={() => setSelectedHistoryRecord(history)}
                            className="resource-download-btn"
                            style={{
                              padding: "4px 10px",
                              fontSize: "0.75rem",
                              background: "rgba(0, 185, 242, 0.12)",
                              border: "1px solid var(--gcu-sky)",
                              color: "var(--gcu-sky)",
                              cursor: "pointer",
                              borderRadius: "6px"
                            }}
                          >
                            🔍 {lang === "ko" ? "상세 보기" : "View"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        ) : (
          <div 
            style={{ 
              padding: "40px", 
              textAlign: "center", 
              fontSize: "0.85rem", 
              color: "var(--text-secondary)", 
              background: "rgba(255,255,255,0.02)", 
              borderRadius: "10px",
              border: "1px dashed rgba(255,255,255,0.06)"
            }}
          >
            ℹ️ {lang === "ko" 
              ? "아직 응시한 모의고사 기록이 존재하지 않습니다. 학습 지원 대시보드에서 신규 모의고사를 풀어보십시오."
              : "No exam histories found. Start your first online TOPIK exam under the Learning Support tab!"}
            <a 
              href="/learning?tab=mocktest" 
              className="sim-start-btn" 
              style={{ display: "block", width: "fit-content", margin: "16px auto 0 auto", padding: "8px 20px", fontSize: "0.8rem" }}
            >
              🚀 {lang === "ko" ? "첫 모의고사 응시하러 가기" : "Take a Mock Exam"}
            </a>
          </div>
        )}
      </div>

      {/* 4. Custom Submitted Q&As Section (내가 접수한 1:1 상담) */}
      <div className="glass-panel" style={{ padding: "32px", background: "rgba(255,255,255,0.015)" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>
          {lang === "ko" ? "❓ 내가 접수한 1:1 상담 및 온라인 민원 내역" : "❓ My Submitted 1:1 Inquiries & Q&As"}
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "24px" }}>
          {lang === "ko"
            ? "학생 상담 창구에서 작성하여 전산 접수 완료된 질문 목록과 공식 담당교수 답변 상태입니다."
            : "List of your custom written inquiries submitted via Q&A and their official response status."}
        </p>

        {qnaList.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {qnaList.map((item) => {
              const isExpanded = !!expandedQna[item.id];
              const qText = item.question[lang as "ko" | "en" | "vn" | "mn"] || item.question.ko;
              const aText = item.answer[lang as "ko" | "en" | "vn" | "mn"] || item.answer.ko;

              return (
                <div 
                  key={item.id} 
                  className="glass-panel" 
                  style={{ 
                    padding: "16px 20px", 
                    background: "rgba(255,255,255,0.01)", 
                    border: isExpanded ? "1px solid var(--gcu-sky)" : "1px solid rgba(255,255,255,0.04)",
                    borderRadius: "8px",
                    transition: "all 0.25s ease"
                  }}
                >
                  <div 
                    onClick={() => toggleQna(item.id)}
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
                  >
                    <span style={{ fontWeight: "700", fontSize: "0.88rem", color: "#fff" }}>
                      Q. {qText}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span className="feed-tag guide" style={{ fontSize: "0.7rem", padding: "1px 6px" }}>
                        {lang === "ko" ? "접수 완료" : "Received"}
                      </span>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                        {isExpanded ? "▲" : "▼"}
                      </span>
                    </div>
                  </div>

                  {isExpanded && (
                    <div 
                      style={{ 
                        marginTop: "14px", 
                        borderTop: "1px solid rgba(255,255,255,0.05)", 
                        paddingTop: "14px", 
                        fontSize: "0.82rem", 
                        color: "var(--text-secondary)",
                        lineHeight: "1.6",
                        textAlign: "left"
                      }}
                    >
                      <strong style={{ color: "var(--gcu-green)", display: "block", marginBottom: "4px" }}>
                        💡 {lang === "ko" ? "글로벌브릿지 공식 답변:" : "Official Bridge Response:"}
                      </strong>
                      {aText}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div 
            style={{ 
              padding: "24px", 
              textAlign: "center", 
              fontSize: "0.82rem", 
              color: "var(--text-muted)", 
              background: "rgba(255,255,255,0.02)", 
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.03)"
            }}
          >
            ℹ️ {lang === "ko" ? "최근 1:1 상담 접수 내역이 존재하지 않습니다." : "No submitted inquiries found."}
          </div>
        )}
      </div>

      {/* 5. Helpful FAQ Accordion Board (유학생 필수 FAQ) */}
      <div className="glass-panel" style={{ padding: "32px", background: "rgba(255,255,255,0.015)" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#fff", marginBottom: "8px" }}>
          {lang === "ko" ? "📕 다문화 유학생 & 근로자 필수 FAQ 보드" : "📕 Essential Academic FAQs"}
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "24px" }}>
          {lang === "ko"
            ? "시간제 알바 추천 승인, 비자 요건, 기출 해설지 확보 등 유학생들이 가장 자주 질문하는 항목들을 모았습니다."
            : "Curated frequently asked questions regarding visa guidelines, scholarships, and past mock exam answers."}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {FAQ_ITEMS.map((faq) => {
            const isExpanded = !!expandedFaq[faq.id];
            const qText = faq.question[lang as "ko" | "en" | "vn" | "mn"] || faq.question.ko;
            const aText = faq.answer[lang as "ko" | "en" | "vn" | "mn"] || faq.answer.ko;

            return (
              <div 
                key={faq.id} 
                className="glass-panel" 
                style={{ 
                  padding: "16px 20px", 
                  background: "rgba(255,255,255,0.01)", 
                  border: isExpanded ? "1px solid var(--gcu-sky)" : "1px solid rgba(255,255,255,0.04)",
                  borderRadius: "8px",
                  transition: "all 0.25s ease"
                }}
              >
                <div 
                  onClick={() => toggleFaq(faq.id)}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
                >
                  <span style={{ fontWeight: "700", fontSize: "0.85rem", color: "#fff", paddingRight: "10px" }}>
                    {qText}
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                    {isExpanded ? "▲" : "▼"}
                  </span>
                </div>

                {isExpanded && (
                  <div 
                    style={{ 
                      marginTop: "14px", 
                      borderTop: "1px solid rgba(255,255,255,0.05)", 
                      paddingTop: "14px", 
                      fontSize: "0.82rem", 
                      color: "var(--text-secondary)",
                      lineHeight: "1.6",
                      textAlign: "left"
                    }}
                  >
                    {aText}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 🔍 IBT 모의고사 상세 성적표 & 해설 모달 (Shared layout with learning/page.tsx) */}
      {selectedHistoryRecord && (
        <div className="drawer-backdrop" onClick={() => setSelectedHistoryRecord(null)}>
          <div 
            className="glass-panel" 
            style={{ 
              width: "95%", 
              maxWidth: "640px", 
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "36px", 
              position: "relative", 
              background: "var(--bg-secondary)",
              border: "1px solid rgba(18, 42, 77, 0.12)",
              boxShadow: "0 24px 64px rgba(18, 42, 77, 0.18)",
              animation: "toastSlideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedHistoryRecord(null)}
              style={{ position: "absolute", right: "20px", top: "20px", background: "transparent", color: "var(--text-secondary)", fontSize: "1.3rem", cursor: "pointer", border: "none" }}
            >
              ✕
            </button>

            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <span style={{ fontSize: "3rem", display: "block", marginBottom: "8px" }}>📊</span>
              <h3 style={{ fontSize: "1.35rem", fontWeight: "800", color: "var(--text-primary)", fontFamily: "var(--font-brand)", margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>
                {lang === "ko" ? "💡 IBT 모의고사 개인 성적 & 해설 상세 보고서" : "💡 IBT Mock Exam Detailed Score & Explanation Report"}
              </h3>
              <span className="feed-tag guide" style={{ fontSize: "0.75rem", padding: "3px 10px" }}>
                {lang === "ko" ? "응시 기출 시험지" : "Exam Paper"}: {selectedHistoryRecord.examTitle}
              </span>
            </div>

            {/* 성적 요약 카드 */}
            <div 
              style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", 
                gap: "12px", 
                marginBottom: "24px",
                background: "rgba(0, 0, 0, 0.02)",
                padding: "16px",
                borderRadius: "10px",
                border: "1px solid rgba(0, 0, 0, 0.06)"
              }}
            >
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>{lang === "ko" ? "취득 점수" : "Your Score"}</span>
                <strong style={{ fontSize: "1.8rem", color: "var(--gcu-navy)", fontFamily: "monospace" }}>{selectedHistoryRecord.score}{lang === "ko" ? "점" : "%"}</strong>
              </div>
              <div style={{ textAlign: "center", borderLeft: "1px solid rgba(0, 0, 0, 0.08)" }}>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>{lang === "ko" ? "TOPIK 평가 등급" : "TOPIK Evaluation"}</span>
                <strong style={{ fontSize: "1.05rem", color: "#2e7d32", display: "block", marginTop: "8px" }}>{selectedHistoryRecord.level}</strong>
              </div>
              <div style={{ textAlign: "center", borderLeft: "1px solid rgba(0, 0, 0, 0.08)" }}>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>{lang === "ko" ? "응시 일자" : "Exam Date"}</span>
                <span style={{ fontSize: "0.92rem", color: "var(--text-secondary)", display: "block", marginTop: "8px", fontWeight: "600" }}>{selectedHistoryRecord.date}</span>
              </div>
            </div>

            {/* 문항별 상세 채점 내역 */}
            <div style={{ marginBottom: "24px" }}>
              <h4 style={{ fontSize: "0.92rem", fontWeight: "700", color: "var(--gcu-navy)", marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>🎯 {lang === "ko" ? "문항별 마킹 대조 분석표 (오답노트)" : "Question-by-Question Marking & Analysis"}</span>
                <span style={{ fontSize: "0.75rem", color: "var(--gcu-red)" }}>
                  {lang === "ko" ? "정답률" : "Correct Rate"}: {selectedHistoryRecord.selectedAnswers?.filter((ans: number, idx: number) => ans === selectedHistoryRecord.answerKey[idx]).length} / {selectedHistoryRecord.questionCount}
                </span>
              </h4>
              
              <div style={{ maxHeight: "250px", overflowY: "auto", border: "1px solid var(--border-color)", borderRadius: "8px", background: "rgba(0,0,0,0.02)" }}>
                <table className="resource-table" style={{ width: "100%", borderCollapse: "collapse", margin: 0 }}>
                  <thead>
                    <tr>
                      <th style={{ padding: "8px 12px", fontSize: "0.78rem" }}>{lang === "ko" ? "문항 번호" : "Q.No"}</th>
                      <th style={{ padding: "8px 12px", fontSize: "0.78rem" }}>{lang === "ko" ? "제출한 답안" : "Your Answer"}</th>
                      <th style={{ padding: "8px 12px", fontSize: "0.78rem" }}>{lang === "ko" ? "실제 정답지" : "Correct Key"}</th>
                      <th style={{ padding: "8px 12px", fontSize: "0.78rem" }}>{lang === "ko" ? "채점 결과" : "Status"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedHistoryRecord.selectedAnswers?.map((ans: number, idx: number) => {
                      const correctAns = selectedHistoryRecord.answerKey[idx];
                      const isCorrect = ans === correctAns;
                      return (
                        <tr key={idx} style={{ background: isCorrect ? "rgba(114, 191, 68, 0.03)" : "rgba(198, 26, 43, 0.03)" }}>
                          <td style={{ padding: "8px 12px", textAlign: "center", fontWeight: "700", fontSize: "0.8rem" }}>Q.{idx + 1}</td>
                          <td style={{ padding: "8px 12px", textAlign: "center", fontSize: "0.8rem", color: ans === -1 ? "var(--text-muted)" : "inherit" }}>
                            {ans !== -1 ? `${ans + 1}${lang === "ko" ? "번" : ""}` : (lang === "ko" ? "미마킹" : "Unmarked")}
                          </td>
                          <td style={{ padding: "8px 12px", textAlign: "center", fontSize: "0.8rem", fontWeight: "700", color: "var(--gcu-navy)" }}>{correctAns + 1}{lang === "ko" ? "번" : ""}</td>
                          <td style={{ padding: "8px 12px", textAlign: "center", fontSize: "0.8rem" }}>
                            <span 
                              style={{ 
                                padding: "2px 8px", 
                                borderRadius: "4px", 
                                fontSize: "0.75rem", 
                                fontWeight: "700", 
                                background: isCorrect ? "rgba(114, 191, 68, 0.1)" : "rgba(198, 26, 43, 0.08)",
                                color: isCorrect ? "#2e7d32" : "#c61a2b",
                                border: isCorrect ? "1px solid rgba(114, 191, 68, 0.25)" : "1px solid rgba(198, 26, 43, 0.2)"
                              }}
                            >
                              {isCorrect ? (lang === "ko" ? "✅ 정답" : "✅ Correct") : (lang === "ko" ? "❌ 오답" : "❌ Incorrect")}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 해설 PDF 다운로드 구역 */}
            {selectedHistoryRecord.answerPdfDataUrl ? (
              <div 
                className="glass-panel" 
                style={{ 
                  padding: "16px 20px", 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  border: "1px solid rgba(247, 147, 30, 0.2)",
                  background: "rgba(247, 147, 30, 0.05)",
                  marginBottom: "24px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", textAlign: "left" }}>
                  <span style={{ fontSize: "1.5rem" }}>🔑</span>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: "800", color: "var(--gcu-navy)" }}>
                      {lang === "ko" ? "기출 공식 정답 및 해법 해설집" : "Official Answer & Explanation Guide"}
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "250px" }} title={selectedHistoryRecord.answerPdfFileName}>
                      {lang === "ko" ? "파일명" : "File"}: {selectedHistoryRecord.answerPdfFileName || "explanation_guide.pdf"}
                    </span>
                  </div>
                </div>

                <a 
                  href={selectedHistoryRecord.answerPdfDataUrl}
                  download={selectedHistoryRecord.answerPdfFileName || "explanation_guide.pdf"}
                  className="btn-primary" 
                  style={{ 
                    padding: "8px 14px", 
                    fontSize: "0.76rem", 
                    borderRadius: "6px", 
                    color: "#ffffff", 
                    fontWeight: "700",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    boxShadow: "0 4px 10px rgba(247,147,30,0.15)"
                  }}
                >
                  📥 {lang === "ko" ? "해설집 PDF 받기" : "Download PDF"}
                </a>
              </div>
            ) : (
              <div 
                style={{ 
                  padding: "12px", 
                  textAlign: "center", 
                  fontSize: "0.78rem", 
                  color: "var(--text-muted)", 
                  background: "rgba(255,255,255,0.02)", 
                  borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.03)",
                  marginBottom: "24px"
                }}
              >
                ℹ️ {lang === "ko" ? "본 시험지는 출제자가 등록한 해설지 PDF가 존재하지 않습니다." : "No official explanation PDF is registered for this exam."}
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button 
                onClick={() => setSelectedHistoryRecord(null)}
                className="btn-secondary"
                style={{ padding: "8px 20px", fontSize: "0.85rem", borderRadius: "8px", cursor: "pointer" }}
              >
                {lang === "ko" ? "닫기" : "Close"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
