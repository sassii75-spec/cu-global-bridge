"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";

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
      mn: "Олон соёлт гэр бүлийг дэмжих Данури портал"
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

const INTRO_TRANSLATIONS: Record<"ko" | "en" | "vn" | "mn", {
  pageTitle: string;
  pageDesc: string;
  stratTitle: string;
  strat1Title: string;
  strat1Desc: string;
  strat2Title: string;
  strat2Desc: string;
  strat3Title: string;
  strat3Desc: string;
  timelineTitle: string;
  t1Title: string;
  t1Desc: string;
  t2Title: string;
  t2Desc: string;
  t3Title: string;
  t3Desc: string;
  t4Title: string;
  t4Desc: string;
  partnerTitle: string;
  partnerDesc: string;
  confirmPrefix: string;
  confirmSuffix: string;
}> = {
  ko: {
    pageTitle: "사업 소개",
    pageDesc: "글로벌사이버대학교는 전 세계 학생과 한국 사회를 연결하는 가교 역할을 수행합니다. GCU Post School은 다문화 외국인 유학생 및 근로자의 교육, 생활, 비자, 취업 정착을 통합 지원하여 글로벌 인재 도약을 완성합니다.",
    stratTitle: "GCU Post School 핵심 전략",
    strat1Title: "스마트 교육 다문화 학습",
    strat1Desc: "한국어 능력 향상을 위한 고품질 온라인 강좌, TOPIK 대비반 및 무료 교재 다운로드 아카이브를 상시 제공합니다.",
    strat2Title: "일자리 및 산업체 연계",
    strat2Desc: "정부 구직 포털 K-Work 채용 풀과 연동하여 지역 우수 기업의 매칭 채용 정보 제공 및 추천서를 발행합니다.",
    strat3Title: "지속 가능한 비자 매칭",
    strat3Desc: "외국인 인재 지역정착비자(F-2-R) 및 구직비자(D-10) 전환을 위한 실시간 자격 모의계산 및 법률 행정 정보를 분석합니다.",
    timelineTitle: "GCU 글로벌 정착 지원 연혁",
    t1Title: "글로벌 정착 인프라 설계",
    t1Desc: "대학 주도 유학생 지원 테스크포스 구성, 한국어 교재 로드맵 수립 및 국가별 학생 대표 선출.",
    t2Title: "온라인 교육 & 자막 번역 허브 개소",
    t2Desc: "한국어 교육 전용 스마트 VOD 강의실 구축, 학습 자료 무료 대외 개방 및 다국어 자막 번역 기술 탑재 완료.",
    t3Title: "K-Work 취업 & F-2-R 비자 연동",
    t3Desc: "유학생 맞춤형 지역 특화형(F-2-R) 비자 산출 계산기 공개 및 한국산업인력공단 정식 취업 연동 파이프라인 개설.",
    t4Title: "글로벌 사이버 스마트 교육 모델 고도화",
    t4Desc: "국가별 오프라인 상설 정착 헬프데스크 운영, 우수 선배 인프라 매핑 및 다문화 거점 교육 리더십 확립.",
    partnerTitle: "🌐 협력 파트너 및 유관 행정 기관",
    partnerDesc: "글로벌사이버대학교는 유관 행정부처, 외국인 복지 정책실, 고용지원센터 및 다문화 정착 협회들과 유기적으로 네트워킹하여 유학생들의 행정업무와 실질적 삶의 정착을 전면 견인합니다. 각 로고를 선택하시면 공식 포털로 안전하게 이동합니다.",
    confirmPrefix: "정부 공식 파트너 협력 기관인 [",
    confirmSuffix: "] 홈페이지로 안전하게 연결됩니다. 이동하시겠습니까?"
  },
  en: {
    pageTitle: "Project Introduction",
    pageDesc: "Global Cyber University serves as a bridge connecting students worldwide with Korean society. GCU Post School provides integrated support for the education, lifestyle, visa, and employment settlement of multicultural students and workers to cultivate global talent.",
    stratTitle: "GCU Post School Core Strategies",
    strat1Title: "Smart Multicultural Education",
    strat1Desc: "We provide high-quality online courses, TOPIK preparation classes, and free prep material download archives to improve Korean proficiency.",
    strat2Title: "Job & Industry Partnership",
    strat2Desc: "Linked with the government K-Work job network, we provide matched vacancy listings with regional companies and issue official recommendations.",
    strat3Title: "Sustainable Visa Matching",
    strat3Desc: "We provide real-time points calculators and administrative legal updates for F-2-R (Regional Talent) and D-10 (Job Seeking) visas.",
    timelineTitle: "GCU Global Settlement Support History",
    t1Title: "Global Settlement Infrastructure Design",
    t1Desc: "Formed university-led international student support task force, established Korean prep material roadmap, and elected national student reps.",
    t2Title: "Online Education & Translation Hub Launch",
    t2Desc: "Built dedicated Korean smart VOD lecture systems, opened academic prep databases to the public, and loaded multilingual subtitles translation hub.",
    t3Title: "K-Work Employment & F-2-R Visa Integration",
    t3Desc: "Launched regional visa (F-2-R) eligibility points calculator and opened formal recruitment pipeline with HRD Service of Korea.",
    t4Title: "Smart Cyber Education Model Advanced",
    t4Desc: "Launched national offline permanent helpdesks, mapped alumni mentors networking, and established multicultural education leadership.",
    partnerTitle: "🌐 Cooperation Partners & Administrative Authorities",
    partnerDesc: "Global Cyber University works closely with administrative ministries, foreign welfare divisions, job centers, and multicultural settlement associations to guide student paperwork and integration. Click any card to navigate securely.",
    confirmPrefix: "You will be redirected securely to the official [",
    confirmSuffix: "] website. Would you like to proceed?"
  },
  vn: {
    pageTitle: "Giới thiệu Dự án",
    pageDesc: "Đại học Global Cyber đóng vai trò là cầu nối kết nối sinh viên trên toàn thế giới với xã hội Hàn Quốc. GCU Post School hỗ trợ tích hợp về giáo dục, đời sống, visa và định cư việc làm cho sinh viên và người lao động đa văn hóa để hoàn thiện bước đệm tài năng toàn cầu.",
    stratTitle: "Chiến lược Trọng tâm GCU Post School",
    strat1Title: "Học tập Đa văn hóa & Giáo dục Thông minh",
    strat1Desc: "Cung cấp các khóa học trực tuyến chất lượng cao để nâng cao tiếng Hàn, các lớp ôn thi TOPIK và kho lưu trữ tài liệu giáo trình tải xuống miễn phí.",
    strat2Title: "Liên kết Doanh nghiệp & Việc làm",
    strat2Desc: "Kết nối với mạng lưới việc làm chính phủ K-Work để cung cấp thông tin tuyển dụng phù hợp của doanh nghiệp địa phương và cấp thư giới thiệu.",
    strat3Title: "Khớp Visa Bền vững",
    strat3Desc: "Tính điểm mô phỏng điều kiện thực tế để chuyển đổi sang Visa định cư địa phương (F-2-R) và Visa tìm việc (D-10) cùng các phân tích hành chính pháp luật.",
    timelineTitle: "Lịch sử Hỗ trợ Định cư Toàn cầu GCU",
    t1Title: "Thiết kế hạ tầng định cư toàn cầu",
    t1Desc: "Thành lập ban chuyên trách hỗ trợ du học sinh, xây dựng lộ trình giáo trình tiếng Hàn và bầu cử đại diện sinh viên các nước.",
    t2Title: "Khai trương Trung tâm dịch thuật & giáo dục trực tuyến",
    t2Desc: "Xây dựng phòng học VOD thông minh chuyên dụng, mở cửa kho tài liệu học tập miễn phí và hoàn thiện công nghệ dịch phụ đề đa ngôn ngữ.",
    t3Title: "Liên kết Việc làm K-Work & Visa F-2-R",
    t3Desc: "Ra mắt công cụ tính điểm Visa cư trú F-2-R cho du học sinh và mở kênh liên thông tuyển dụng chính thức với HRD Hàn Quốc.",
    t4Title: "Nâng cao mô hình giáo dục Cyber thông minh",
    t4Desc: "Vận hành văn phòng hỗ trợ định cư trực tiếp theo quốc gia, kết nối mạng lưới cựu sinh viên ưu tú và khẳng định vị thế giáo dục đa văn hóa.",
    partnerTitle: "🌐 Đối tác Liên kết & Cơ quan Hành chính liên quan",
    partnerDesc: "Đại học Global Cyber xây dựng mạng lưới liên kết chặt chẽ với các bộ ngành chính phủ, văn phòng chính sách phúc lợi người nước ngoài, trung tâm dịch vụ việc làm để hỗ trợ tối đa các thủ tục hành chính. Nhấp vào các logo để chuyển hướng an toàn.",
    confirmPrefix: "Hệ thống sẽ chuyển hướng bạn đến trang web chính thức của [",
    confirmSuffix: "]. Bạn có muốn tiếp tục không?"
  },
  mn: {
    pageTitle: "Төслийн танилцуулга",
    pageDesc: "Глобал Сайбер Их Сургууль нь дэлхийн оюутнуудыг солонгосын нийгэмтэй холбох гүүр болж ажилладаг. GCU Post School нь олон соёлт гадаад оюутан, ажилчдын боловсрол, амьдрал, виз, ажил эрхлэлтийг цогцоор нь дэмжиж, дэлхийн хэмжээний боловсон хүчин болоход тусалдаг.",
    stratTitle: "GCU Post School-ийн үндсэн стратеги",
    strat1Title: "Ухаалаг боловсрол олон соёлт сургалт",
    strat1Desc: "Солонгос хэлний түвшнийг сайжруулахад зориулсан чанартай цахим хичээл, TOPIK бэлтгэл анги болон үнэгүй материалыг тогтмол олгоно.",
    strat2Title: "Ажлын байр ба аж үйлдвэрийн хамтын ажиллагаа",
    strat2Desc: "Засгийн газрын K-Work ажлын байрны сүлжээтэй холбогдон орон нутгийн шилдэг аж ахуйн нэгжүүдийн мэдээллээр хангаж, тодорхойлолт гаргана.",
    strat3Title: "Тогтвортой визний зуучлал",
    strat3Desc: "Гадаад ажилчдад зориулсан орон нутгийн виз (F-2-R) болон ажил хайх виз (D-10) авахад зориулсан онооны тооцоолуур, хуулийн зөвлөгөө.",
    timelineTitle: "GCU Глобал суурьшилтыг дэмжсэн түүх",
    t1Title: "Глобал суурьших дэд бүтцийн төлөвлөгөө",
    t1Desc: "Сургуулийн удирдлагатай гадаад оюутныг дэмжих ажлын хэсэг байгуулж, солонгос хэлний сурах бичгийн замын зураг гарган, улс бүрийн төлөөллийг сонгов.",
    t2Title: "Цахим сургалт ба Орчуулгын төвийн нээлт",
    t2Desc: "Солонгос хэлний сургалтад зориулсан ухаалаг VOD ангийг байгуулж, сургалтын материалыг олон нийтэд үнэгүй нээж, олон хэлний орчуулгын технологийг нэвтрүүлэв.",
    t3Title: "K-Work ажил эрхлэлт ба F-2-R визний холболт",
    t3Desc: "Гадаад оюутнуудад зориулсан орон нутгийн визний (F-2-R) онооны тооцоолуурыг нээж, Хүний нөөцийн хөгжлийн газартай албан ёсны хамтын ажиллагаа эхлэв.",
    t4Title: "Ухаалаг кибер боловсролын загварыг сайжруулах",
    t4Desc: "Улс орнуудад зориулсан биет тусламжийн төвийг ажиллуулж, шилдэг төгсөгчдийн сүлжээг байгуулан, олон соёлт боловсролыг бэхжүүлэв.",
    partnerTitle: "🌐 Хамтран ажиллагч байгууллага, захиргааны албад",
    partnerDesc: "Глобал Сайбер Их Сургууль нь холбогдох яамд, гадаад иргэдийн халамжийн алба, хөдөлмөр эрхлэлтийг дэмжих төв болон олон соёлт холбоодтой хамтран ажиллаж, оюутнуудын захиргааны ажил болон суурьшилтыг дэмжинэ. Зургуудыг сонгон холбогдох портал руу нэвтэрнэ үү.",
    confirmPrefix: "Засгийн газрын албан ёсны түнш болох [",
    confirmSuffix: "] вэбсайт руу аюулгүй шилжиж байна. Үргэлжлүүлэх үү?"
  }
};

export default function IntroPage() {
  const { lang } = useLanguage();
  const tIntro = INTRO_TRANSLATIONS[lang as "ko" | "en" | "vn" | "mn"] || INTRO_TRANSLATIONS.ko;

  const handlePartnerClick = (e: React.MouseEvent<HTMLAnchorElement>, name: string) => {
    if (!confirm(`${tIntro.confirmPrefix}${name}${tIntro.confirmSuffix}`)) {
      e.preventDefault();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
      {/* Page Header */}
      <section className="glass-panel" style={{ padding: "40px", background: "linear-gradient(135deg, rgba(33, 64, 154, 0.2) 0%, rgba(0, 185, 242, 0.05) 100%)" }}>
        <h1 className="hero-title" style={{ fontSize: "2.25rem", marginBottom: "16px" }}>{tIntro.pageTitle}</h1>
        <p className="hero-desc" style={{ marginBottom: 0, fontSize: "1rem" }}>
          {tIntro.pageDesc}
        </p>
      </section>

      {/* Core Initiatives Grid */}
      <section>
        <div className="section-header">
          <div className="section-title">
            <span className="section-title-dot"></span>
            <h2>{tIntro.stratTitle}</h2>
          </div>
        </div>

        <div className="intro-grid">
          <div className="intro-card glass-panel glass-panel-accent">
            <div className="intro-card-icon">📖</div>
            <div className="intro-card-title">{tIntro.strat1Title}</div>
            <div className="intro-card-desc">
              {tIntro.strat1Desc}
            </div>
          </div>

          <div className="intro-card glass-panel glass-panel-accent">
            <div className="intro-card-icon">💼</div>
            <div className="intro-card-title">{tIntro.strat2Title}</div>
            <div className="intro-card-desc">
              {tIntro.strat2Desc}
            </div>
          </div>

          <div className="intro-card glass-panel glass-panel-accent">
            <div className="intro-card-icon">🛡️</div>
            <div className="intro-card-title">{tIntro.strat3Title}</div>
            <div className="intro-card-desc">
              {tIntro.strat3Desc}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="timeline-section">
        <div className="section-header">
          <div className="section-title">
            <span className="section-title-dot"></span>
            <h2>{tIntro.timelineTitle}</h2>
          </div>
        </div>

        <div className="timeline-line"></div>
        
        <div className="timeline-container">
          {/* Node 1 */}
          <div className="timeline-node left">
            <div className="timeline-content glass-panel">
              <div className="timeline-year">2024</div>
              <div className="timeline-title">{tIntro.t1Title}</div>
              <p className="timeline-desc">
                {tIntro.t1Desc}
              </p>
            </div>
            <div className="timeline-bullet"></div>
          </div>

          {/* Node 2 */}
          <div className="timeline-node right">
            <div className="timeline-content glass-panel">
              <div className="timeline-year">2025</div>
              <div className="timeline-title">{tIntro.t2Title}</div>
              <p className="timeline-desc">
                {tIntro.t2Desc}
              </p>
            </div>
            <div className="timeline-bullet"></div>
          </div>

          {/* Node 3 */}
          <div className="timeline-node left">
            <div className="timeline-content glass-panel">
              <div className="timeline-year">2026</div>
              <div className="timeline-title">{tIntro.t3Title}</div>
              <p className="timeline-desc">
                {tIntro.t3Desc}
              </p>
            </div>
            <div className="timeline-bullet"></div>
          </div>

          {/* Node 4 */}
          <div className="timeline-node right">
            <div className="timeline-content glass-panel">
              <div className="timeline-year">2027</div>
              <div className="timeline-title">{tIntro.t4Title}</div>
              <p className="timeline-desc">
                {tIntro.t4Desc}
              </p>
            </div>
            <div className="timeline-bullet"></div>
          </div>
        </div>
      </section>

      {/* Support Organizations */}
      <section className="glass-panel" style={{ padding: "40px", textAlign: "center" }}>
        <h3 style={{ fontSize: "1.5rem", marginBottom: "12px", fontFamily: "var(--font-brand)" }}>{tIntro.partnerTitle}</h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "700px", margin: "0 auto 32px auto", lineHeight: "1.7" }}>
          {tIntro.partnerDesc}
        </p>
        
        {/* Modern Interactive Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
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
                className="glass-panel"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "24px",
                  textAlign: "left",
                  gap: "12px",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                {/* Highlight strip with partner colors */}
                <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "3.5px", background: partner.color }}></div>
                
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                  <span style={{ fontSize: "1.75rem" }}>{partner.icon}</span>
                  <span style={{ fontSize: "0.85rem", color: "var(--gcu-sky)", fontWeight: "700" }}>LINK ↗</span>
                </div>
                
                <h4 style={{ fontSize: "1.05rem", fontWeight: "700", color: "var(--text-primary)", fontFamily: "var(--font-brand)" }}>
                  {partnerName}
                </h4>
                
                <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                  {partnerDesc}
                </p>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}

