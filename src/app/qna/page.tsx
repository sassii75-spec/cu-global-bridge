"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

// Initial FAQ Questions list
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
      ko: "네! 본 GCU Global Bridge 플랫폼의 모든 단계별 정규 한국어 강좌, TOPIK 대비자료, 그리고 듣기/읽기 능력 시험 모의고사는 로그인 및 회원가입 없이 외국인 누구나 전면 무료로 개방되어 운영됩니다.",
      en: "Yes! All step-by-step regular Korean courses, TOPIK prep materials, and listening/reading mock exams on the GCU Global Bridge platform are fully open and free for any foreigners without registration or login.",
      vn: "Đúng vậy! Tất cả các khóa học tiếng Hàn chính quy theo cấp độ, tài liệu ôn thi TOPIK, và đề thi thử kỹ năng Nghe/Đọc trên nền tảng GCU Global Bridge đều được mở hoàn toàn miễn phí cho tất cả người nước ngoài mà không cần đăng ký hay đăng nhập.",
      mn: "Тийм ээ! Энэхүү GCU Global Bridge платформын бүх шатны солонгос хэлний үндсэн хичээл, TOPIK-д бэлтгэх материал, сонсох/унших шалгалтын загвар шалгалтууд нь нэвтрэх болон бүртгүүлэх шаардлагагүйгээр гадаадын хэн бүхэнд бүрэн үнэ төлбөргүй нээлттэй ажиллаж байна."
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
      vn: "Sau khi kiểm tra thông tin doanh nghiệp liên kết xuất sắc trên trang Việc làm & Đời sống, nếu điểm tự tính đạt từ 60 điểm trở lên, vui lòng mang theo bản sao hợp đồng lao động tạm thời và bằng tốt nghiệp đến phòng hành chính của trường (support@global.ac.kr) để đăng ký. Sau khi thẩm định, trường sẽ cấp văn bản giới thiệu chính thức dưới danh nghĩa Hiệu trưởng để nộp cho chính quyền địa phương.",
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
      ko: "글로벌 브릿지 종합 행정 지원처(☎ 02-1234-5678)로 전화해 문의하시거나 아래의 Q&A 실시간 질문 신청 양식을 작성해 전송해 주시면 24시간 이내에 개별 메일로 상세 답변을 회신해 드립니다.",
      en: "You can call our Global Bridge administrative helpdesk (☎ 02-1234-5678) or fill out and submit the Q&A ticket form below. A detailed response will be sent to your registered email address within 24 hours.",
      vn: "Vui lòng gọi điện đến Văn phòng Hỗ trợ Hành chính Tổng hợp Global Bridge (☎ 02-1234-5678) эсвэл điền vào biểu mẫu đăng ký Q&A trực tuyến bên dưới. Chúng tôi sẽ phản hồi chi tiết qua email cá nhân của bạn trong vòng 24 giờ.",
      mn: "Глобал Бридж нэгдсэн тусламжийн төв рүү (☎ 02-1234-5678) утасдаж асуух эсвэл доорх Q&A асуулт илгээх хуудсаар асуултаа илгээвэл 24 цагийн дотор таны цахим шууданд хариу илгээнэ."
    }
  }
];

// Rich Localized Translations mapping for standing Q&A Layout
const QNA_TRANSLATIONS: Record<"ko" | "en" | "vn" | "mn", {
  pageTitle: string;
  pageDesc: string;
  faqTitle: string;
  formTitle: string;
  formDesc: string;
  formCatLabel: string;
  formCat1: string;
  formCat2: string;
  formCat3: string;
  formCat4: string;
  formTitleLabel: string;
  formTitlePlaceholder: string;
  formContentLabel: string;
  formContentPlaceholder: string;
  formSubmitBtn: string;
  sidebarTitle: string;
  sidebarHelpline1: string;
  sidebarHelpline2: string;
  sidebarEmail: string;
  sidebarHours: string;
  sidebarLocation: string;
  submitSuccess: string;
  submitReceipt: string;
}> = {
  ko: {
    pageTitle: "❓ 통합 Q&A 및 FAQ 상담 센터",
    pageDesc: "글로벌사이버대학교 학우분들의 학사 요건, 한국어 수강, 비자 및 취업 행정 전반에 대한 자주 묻는 질문을 모으고 1:1 전문 상담 신청을 정식 접수합니다.",
    faqTitle: "자주 묻는 질문 (FAQ)",
    formTitle: "✏️ 실시간 다국어 Q&A 상담 질문 등록",
    formDesc: "학사일정, 수강신청, 장학금 신청, 일자리 매칭 과정이나 비자 계산기 버그 등에 관해 개인 문의 사항을 보내주시면 담당 부서 상담원이 면밀히 조율해드립니다.",
    formCatLabel: "질문 분류",
    formCat1: "학사/장학금",
    formCat2: "교육지원/튜터링",
    formCat3: "비자/정착지원",
    formCat4: "기타 일반문의",
    formTitleLabel: "질문 제목",
    formTitlePlaceholder: "요약된 문의 제목을 입력해 주십시오...",
    formContentLabel: "문의 세부 내용",
    formContentPlaceholder: "구체적인 질문 사안을 입력해주십시오. 기재하신 학적 대조 이메일로 답변서가 자동 회신됩니다...",
    formSubmitBtn: "Q&A 질문 제출하기",
    sidebarTitle: "📞 글로벌 브릿지 종합 행정 지원처",
    sidebarHelpline1: "학사/교육상담: 02-1234-5678",
    sidebarHelpline2: "비자/정착지원: 02-1234-8765",
    sidebarEmail: "대표 이메일: support@global.ac.kr",
    sidebarHours: "운영 시간: 평일 09:00 ~ 18:00 (공휴일 제외)",
    sidebarLocation: "위치: 서울특별시 강남구 압구정로 32길 11 (압구정캠퍼스 본관 3층)",
    submitSuccess: "📡 질문 등록 완료! 학우님의 Q&A가 행정처에 정식 접수되었습니다. 답변 완료 시 이메일로 알림이 발송됩니다.",
    submitReceipt: "📝 작성하신 상담 질문이 대학 행정처로 안전하게 송신되었습니다. 담임 상담사가 배정되어 내용을 검토 중이며, 완료 시 기재하신 개인 이메일로 24시간 이내에 공식 답변이 자동 송부됩니다."
  },
  en: {
    pageTitle: "❓ Integrated Q&A & FAQ Support Center",
    pageDesc: "Collects frequently asked questions and accepts professional 1:1 consultation tickets regarding academic requirements, Korean courses, visa, and employment administration.",
    faqTitle: "Frequently Asked Questions (FAQ)",
    formTitle: "✏️ Real-time Multilingual Q&A Ticket Submission",
    formDesc: "Submit your inquiry regarding academic calendars, courses, scholarships, job matching, or visa calculator issues. Our counselors will review it shortly.",
    formCatLabel: "Category",
    formCat1: "Academics/Scholarship",
    formCat2: "Learning Support",
    formCat3: "Visa/Settlement",
    formCat4: "General Inquiry",
    formTitleLabel: "Inquiry Title",
    formTitlePlaceholder: "Enter a brief summary of your inquiry...",
    formContentLabel: "Detailed Content",
    formContentPlaceholder: "Enter detailed questions. A reply will be sent automatically to your academic matching email...",
    formSubmitBtn: "Submit Q&A Ticket",
    sidebarTitle: "📞 Global Bridge Support Center",
    sidebarHelpline1: "Academics Helpline: 02-1234-5678",
    sidebarHelpline2: "Visa / Settlement: 02-1234-8765",
    sidebarEmail: "Official Email: support@global.ac.kr",
    sidebarHours: "Hours: Weekdays 09:00 - 18:00 (KST)",
    sidebarLocation: "Address: 11 Apgujeong-ro 32-gil, Gangnam-gu, Seoul (Apgujeong Campus, 3rd Floor)",
    submitSuccess: "📡 Ticket Submitted! Your Q&A has been registered. You will receive an email notification when reviewed.",
    submitReceipt: "📝 Your consultation ticket has been securely sent to the administration. A dedicated counselor has been assigned and is reviewing your request. A reply will be sent within 24 hours."
  },
  vn: {
    pageTitle: "❓ Trung tâm Hỗ trợ tích hợp Q&A & FAQ",
    pageDesc: "Thu thập các câu hỏi thường gặp và tiếp nhận các yêu cầu tư vấn chuyên nghiệp 1:1 liên quan đến học vụ, tiếng Hàn, visa và thủ tục hành chính việc làm.",
    faqTitle: "Câu hỏi thường gặp (FAQ)",
    formTitle: "✏️ Đăng ký câu hỏi tư vấn Q&A đa ngôn ngữ",
    formDesc: "Gửi thắc mắc của bạn về lịch học, khóa học, học bổng, kết nối việc làm hoặc lỗi máy tính điểm visa. Cố vấn của chúng tôi sẽ phản hồi sớm nhất.",
    formCatLabel: "Phân loại",
    formCat1: "Học vụ / Học bổng",
    formCat2: "Hỗ trợ học tập",
    formCat3: "Visa / Định cư",
    formCat4: "Yêu cầu chung",
    formTitleLabel: "Tiêu đề câu hỏi",
    formTitlePlaceholder: "Nhập tiêu đề tóm tắt thắc mắc của bạn...",
    formContentLabel: "Nội dung chi tiết",
    formContentPlaceholder: "Nhập câu hỏi chi tiết. Câu trả lời sẽ tự động được gửi về email đối chiếu học tịch của bạn...",
    formSubmitBtn: "Gửi câu hỏi Q&A",
    sidebarTitle: "📞 Trung tâm Hỗ trợ GCU Global Bridge",
    sidebarHelpline1: "Hỗ trợ học vụ: 02-1234-5678",
    sidebarHelpline2: "Hỗ trợ Visa/Định cư: 02-1234-8765",
    sidebarEmail: "Email đại diện: support@global.ac.kr",
    sidebarHours: "Thời gian làm việc: Ngày thường 09:00 ~ 18:00 (KST)",
    sidebarLocation: "Địa chỉ: 11 Apgujeong-ro 32-gil, Gangnam-gu, Seoul (Tầng 3, Cơ sở Apgujeong)",
    submitSuccess: "📡 Đã gửi câu hỏi! Yêu cầu của bạn đã được tiếp nhận thành công. Bạn sẽ nhận được thông báo qua email khi có phản hồi.",
    submitReceipt: "📝 Yêu cầu tư vấn của bạn đã được gửi an toàn đến phòng hành chính. Cố vấn chuyên trách đã được chỉ định và đang xem xét yêu cầu. Phản hồi chính thức sẽ được gửi đến bạn trong vòng 24 giờ."
  },
  mn: {
    pageTitle: "❓ Нэгдсэн Q&A болон FAQ зөвлөгөөний төв",
    pageDesc: "Глобал Сайбер Их Сургуулийн оюутнуудын сургуулийн журам, солонгос хэлний сургалт, виз, ажил эрхлэлттэй холбоотой түгээмэл асуултуудыг цуглуулж, 1:1 зөвлөгөө өгнө.",
    faqTitle: "Түгээмэл асуулт хариулт (FAQ)",
    formTitle: "✏️ Бодит цагийн олон хэлний Q&A асуулт илгээх",
    formDesc: "Сургуулийн хуваарь, хичээл сонголт, тэтгэлэг, ажлын байр зуучлал, визний оноо тооцоолуурын алдааны талаарх асуултаа илгээнэ үү. Хариуцсан мэргэжилтэн шуурхай шийдвэрлэх болно.",
    formCatLabel: "Асуултын ангилал",
    formCat1: "Хичээл/Тэтгэлэг",
    formCat2: "Сургалтын дэмжлэг",
    formCat3: "Виз/Суурьшилтын дэмжлэг",
    formCat4: "Бусад ерөнхий асуулт",
    formTitleLabel: "Асуултын гарчиг",
    formTitlePlaceholder: "Асуултын хураангуй гарчгийг оруулна уу...",
    formContentLabel: "Асуултын дэлгэрэнгүй",
    formContentPlaceholder: "Дэлгэрэнгүй асуултаа бичнэ үү. Таны бүртгэлтэй цахим шуудангаар хариу илгээгдэх болно...",
    formSubmitBtn: "Q&A Асуулт илгээх",
    sidebarTitle: "📞 Глобал Бридж нэгдсэн тусламжийн төв",
    sidebarHelpline1: "Хичээлийн зөвлөгөө: 02-1234-5678",
    sidebarHelpline2: "Виз / Суурьшилтын тусламж: 02-1234-8765",
    sidebarEmail: "Цахим шуудан: support@global.ac.kr",
    sidebarHours: "Ажиллах цаг: Ажлын өдрүүдэд 09:00 ~ 18:00 (KST)",
    sidebarLocation: "Хаяг: Сөүл хот, Гангнам дүүрэг, Апгүжон-ру 32-р гудамж 11 (Апгүжон кампус, 3-р давхар)",
    submitSuccess: "📡 Асуултыг хүлээн авлаа! Таны асуулт бүртгэгдсэн тул хариулт бэлэн болох үед цахим шуудангаар мэдэгдэх болно.",
    submitReceipt: "📝 Таны илгээсэн асуултыг сургуулийн захиргаа хүлээн авлаа. Зөвлөх мэргэжилтэн таны асуулттай танилцаж байгаа бөгөөд 24 цагийн дотор албан ёсны хариултыг таны цахим шуудангаар илгээнэ."
  }
};

export default function QnaPage() {
  const { lang } = useLanguage();
  const tQna = QNA_TRANSLATIONS[lang as "ko" | "en" | "vn" | "mn"] || QNA_TRANSLATIONS.ko;

  const [expandedQna, setExpandedQna] = useState<Record<number, boolean>>({});
  const [qnaList, setQnaList] = useState(INITIAL_QNA);

  // Form states
  const [qnaTitle, setQnaTitle] = useState("");
  const [qnaCategory, setQnaCategory] = useState("학사/장학");
  const [qnaBody, setQnaBody] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedQna = localStorage.getItem("gcu-qna-list");
      if (savedQna) {
        try {
          const parsed = JSON.parse(savedQna);
          // Convert legacy string question/answers or structure safely
          const safetyChecked = parsed.map((item: any) => {
            if (typeof item.question === "string") {
              return {
                id: item.id,
                question: { ko: item.question, en: item.question, vn: item.question, mn: item.question },
                answer: { ko: item.answer, en: item.answer, vn: item.answer, mn: item.answer }
              };
            }
            return item;
          });
          setQnaList(safetyChecked);
        } catch (e) {
          console.error("Failed to parse saved Q&As:", e);
        }
      }
    }
  }, []);

  const toggleQna = (id: number) => {
    setExpandedQna({
      ...expandedQna,
      [id]: !expandedQna[id]
    });
  };

  const handleSubmitQna = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qnaTitle.trim() || !qnaBody.trim()) return;

    // Create dynamic question dictionary mapping in all 4 languages to prevent translation breakages on user submissions
    const newQnaItem = {
      id: Date.now(),
      question: {
        ko: `[${qnaCategory}] ${qnaTitle}`,
        en: `[${qnaCategory}] ${qnaTitle}`,
        vn: `[${qnaCategory}] ${qnaTitle}`,
        mn: `[${qnaCategory}] ${qnaTitle}`
      },
      answer: {
        ko: tQna.submitReceipt,
        en: tQna.submitReceipt,
        vn: tQna.submitReceipt,
        mn: tQna.submitReceipt
      }
    };

    const updatedQnaList = [newQnaItem, ...qnaList];
    setQnaList(updatedQnaList);
    
    if (typeof window !== "undefined") {
      localStorage.setItem("gcu-qna-list", JSON.stringify(updatedQnaList));
    }

    setQnaTitle("");
    setQnaBody("");
    setToastMessage(tQna.submitSuccess);

    setExpandedQna({
      ...expandedQna,
      [newQnaItem.id]: true
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      {/* 1. Page Header */}
      <section className="glass-panel" style={{ padding: "40px", background: "linear-gradient(135deg, rgba(33, 64, 154, 0.2) 0%, rgba(255, 222, 0, 0.05) 100%)" }}>
        <h1 className="hero-title" style={{ fontSize: "2.25rem", marginBottom: "16px", fontFamily: "var(--font-brand)", letterSpacing: "-0.5px" }}>
          {tQna.pageTitle}
        </h1>
        <p className="hero-desc" style={{ marginBottom: 0, fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
          {tQna.pageDesc}
        </p>
      </section>

      {/* 2. Grid Dashboard Layout */}
      <div className="learning-layout">
        {/* Left column: FAQ and Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          
          {/* FAQ Accordion list */}
          <div>
            <div className="section-header" style={{ marginBottom: "20px" }}>
              <div className="section-title">
                <span className="section-title-dot"></span>
                <h2 style={{ fontSize: "1.25rem", fontFamily: "var(--font-brand)" }}>{tQna.faqTitle}</h2>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {qnaList.map((item) => {
                const isExpanded = expandedQna[item.id] || false;
                const questionText = item.question[lang as "ko" | "en" | "vn" | "mn"] || item.question.ko;
                const answerText = item.answer[lang as "ko" | "en" | "vn" | "mn"] || item.answer.ko;

                return (
                  <div 
                    key={item.id} 
                    className="glass-panel" 
                    style={{ overflow: "hidden", border: isExpanded ? "1px solid var(--gcu-sky)" : "1px solid var(--border-color)", transition: "border-color 0.25s ease" }}
                  >
                    {/* Header trigger */}
                    <div 
                      onClick={() => toggleQna(item.id)}
                      style={{ 
                        padding: "20px 24px", 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center", 
                        cursor: "pointer", 
                        background: isExpanded ? "rgba(0, 185, 242, 0.04)" : "transparent",
                        transition: "background 0.2s ease" 
                      }}
                    >
                      <span style={{ fontWeight: "700", fontSize: "0.95rem", color: isExpanded ? "var(--gcu-sky)" : "var(--text-primary)", textAlign: "left", lineHeight: "1.5" }}>
                        ❓ {questionText}
                      </span>
                      <span style={{ color: "var(--text-muted)", transition: "transform 0.25s ease", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>
                        ▼
                      </span>
                    </div>

                    {/* Accordion content */}
                    {isExpanded && (
                      <div 
                        style={{ 
                          padding: "20px 24px", 
                          borderTop: "1px solid var(--border-color)", 
                          background: "rgba(0, 0, 0, 0.15)",
                          fontSize: "0.85rem", 
                          color: "var(--text-secondary)", 
                          lineHeight: "1.6",
                          animation: "toastSlideUp 0.2s ease"
                        }}
                      >
                        {answerText}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Consultation submission Form */}
          <div className="glass-panel" style={{ padding: "28px" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: "700", marginBottom: "8px", fontFamily: "var(--font-brand)" }}>
              {tQna.formTitle}
            </h3>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "20px", lineHeight: "1.5" }}>
              {tQna.formDesc}
            </p>

            <form onSubmit={handleSubmitQna} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ flex: "1", minWidth: "150px" }}>
                  <label className="calc-label" style={{ marginBottom: "6px", display: "block" }}>{tQna.formCatLabel}</label>
                  <select 
                    value={qnaCategory} 
                    onChange={(e) => setQnaCategory(e.target.value)}
                    className="calc-select"
                    style={{ height: "42px" }}
                  >
                    <option value="학사/장학">{tQna.formCat1}</option>
                    <option value="교육지원">{tQna.formCat2}</option>
                    <option value="비자/정착">{tQna.formCat3}</option>
                    <option value="일반문의">{tQna.formCat4}</option>
                  </select>
                </div>

                <div style={{ flex: "2", minWidth: "220px" }}>
                  <label className="calc-label" style={{ marginBottom: "6px", display: "block" }}>{tQna.formTitleLabel}</label>
                  <input 
                    type="text" 
                    placeholder={tQna.formTitlePlaceholder}
                    value={qnaTitle}
                    onChange={(e) => setQnaTitle(e.target.value)}
                    className="search-input"
                    style={{ padding: "10px 14px", height: "42px" }}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="calc-label" style={{ marginBottom: "6px", display: "block" }}>{tQna.formContentLabel}</label>
                <textarea 
                  placeholder={tQna.formContentPlaceholder}
                  value={qnaBody}
                  onChange={(e) => setQnaBody(e.target.value)}
                  className="comment-textarea"
                  style={{ minHeight: "100px" }}
                  required
                ></textarea>
              </div>

              <button type="submit" className="sim-start-btn" style={{ padding: "10px", width: "auto", alignSelf: "flex-end" }}>
                {tQna.formSubmitBtn}
              </button>
            </form>
          </div>
        </div>

        {/* Right column: Sticky support sidebar info widget */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          <section className="glass-panel" style={{ padding: "24px", position: "sticky", top: "100px" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "16px", fontFamily: "var(--font-brand)", letterSpacing: "-0.5px" }}>
              {tQna.sidebarTitle}
            </h3>
            
            <ul style={{ listStyle: "none", fontSize: "0.85rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "14px", padding: 0 }}>
              <li style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>📞</span>
                <span>{tQna.sidebarHelpline1}</span>
              </li>
              <li style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>⚖️</span>
                <span>{tQna.sidebarHelpline2}</span>
              </li>
              <li style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>✉️</span>
                <span>{tQna.sidebarEmail}</span>
              </li>
              <li style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>⏰</span>
                <span>{tQna.sidebarHours}</span>
              </li>
              <li style={{ paddingTop: "4px", display: "flex", alignItems: "flex-start", gap: "8px", lineHeight: "1.5" }}>
                <span style={{ marginTop: "2px" }}>📍</span>
                <span>{tQna.sidebarLocation}</span>
              </li>
            </ul>
          </section>

          {/* Simple widget banner pointing to community review testimonials */}
          <section className="widget-banner glass-panel" style={{ background: "linear-gradient(135deg, rgba(33, 64, 154, 0.2) 0%, rgba(114, 191, 68, 0.1) 100%)", border: "1px solid rgba(0, 185, 242, 0.2)" }}>
            <div className="widget-banner-icon">🗣️</div>
            <div className="widget-banner-title">동문 선배들의 100% 리얼 정착 수기</div>
            <p className="widget-banner-desc" style={{ fontSize: "0.8rem" }}>
              TOPIK 4급 공부 요령부터 연공 요건 충족, 지자체 F-2-R 비자 연동 승인 꿀팁까지! 생생한 후기를 바로 읽어보세요.
            </p>
            <a href="/community?tab=reviews" className="widget-banner-btn" style={{ background: "var(--gcu-sky)", textDecoration: "none", color: "#060A1A", display: "inline-block", fontWeight: "700", borderRadius: "8px" }}>
              생생 후기 게시판 가기 ↗
            </a>
          </section>
        </div>
      </div>

      {/* 3. Toast Portal Alert Notification overlay */}
      {toastMessage && (
        <div className="toast-notification">
          <span style={{ fontSize: "1.35rem" }}>📡</span>
          <div style={{ fontSize: "0.85rem", lineHeight: "1.5", fontWeight: "500" }}>{toastMessage}</div>
          <button className="toast-close" onClick={() => setToastMessage(null)}>✕</button>
        </div>
      )}
    </div>
  );
}
