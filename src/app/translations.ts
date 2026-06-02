export type Lang = "ko" | "en" | "vn" | "mn";

export const translations: Record<string, Record<Lang, string>> = {
  // Navigation & Shared Frame
  navIntro: {
    ko: "사업소개",
    en: "Introduction",
    vn: "Giới thiệu",
    mn: "Төслийн танилцуулга"
  },
  navLearning: {
    ko: "학습지원",
    en: "Learning Support",
    vn: "Hỗ trợ học tập",
    mn: "Сургалтын дэмжлэг"
  },
  navLife: {
    ko: "취업/생활",
    en: "Employment/Life",
    vn: "Việc làm & Đời sống",
    mn: "Ажил эрхлэлт/Амьдрал"
  },
  navCommunity: {
    ko: "커뮤니티",
    en: "Community",
    vn: "Cộng đồng",
    mn: "Хамт олон"
  },
  navQna: {
    ko: "Q&A/FAQ",
    en: "Q&A/FAQ",
    vn: "Hỏi & Đáp",
    mn: "Асуулт хариулт"
  },
  navMocktest: {
    ko: "TOPIK 모의고사",
    en: "TOPIK Mock Exam",
    vn: "Thi thử TOPIK",
    mn: "TOPIK загвар шалгалт"
  },
  navAdmin: {
    ko: "어드민",
    en: "Admin",
    vn: "Quản trị",
    mn: "Админ"
  },
  login: {
    ko: "로그인",
    en: "Login",
    vn: "Đăng nhập",
    mn: "Нэвтрэх"
  },
  logout: {
    ko: "로그아웃",
    en: "Logout",
    vn: "Đăng xuất",
    mn: "Гарах"
  },
  footerDesc: {
    ko: "글로벌사이버대학교는 세계인에게 홍익인간 정신을 전파하는 글로벌 인재 육성 중심 대학입니다. GCU Global Bridge는 다문화 유학생들과 근로자들의 학업 성공과 국내 안정적 정착을 성실히 지원합니다.",
    en: "Global Cyber University is a premier institution cultivating global leaders with the spirit of Hongik Ingan. GCU Global Bridge dedicatedly supports the academic success and stable settlement of multicultural students and workers.",
    vn: "Đại học Global Cyber là trường hàng đầu bồi dưỡng nhân tài toàn cầu với tinh thần Hongik Ingan. GCU Global Bridge hỗ trợ đắc lực cho sự thành công trong học tập và định cư ổn định của sinh viên và người lao động đa văn hóa.",
    mn: "Глобал Сайбер Их Сургууль нь Хонгик Инган үзэл санааг түгээн дэлхийн хэмжээний боловсон хүчин бэлтгэдэг тэргүүлэгч сургууль юм. GCU Global Bridge нь олон соёлт оюутан, ажилчдын сурлагын амжилт, тогтвортой амьдралыг тууштай дэмжинэ."
  },

  // Main Dashboard Landing Page
  heroSubtitle: {
    ko: "GLOBAL CYBER UNIVERSITY",
    en: "GLOBAL CYBER UNIVERSITY",
    vn: "ĐẠI HỌC GLOBAL CYBER",
    mn: "ГЛОБАЛ САЙБЕР ИХ СУРГУУЛЬ"
  },
  heroTitle: {
    ko: "당신의 글로벌 꿈, GCU와 함께 실현하세요",
    en: "Fulfill Your Global Dreams Together with GCU",
    vn: "Thực hiện Ước mơ Toàn cầu của bạn cùng GCU",
    mn: "Глобал мөрөөдлөө GCU-тай хамт биелүүлээрэй"
  },
  heroDesc: {
    ko: "학습지원, 자막/한국어 교육, 취업/생활 정착 정보 및 국가별 커뮤니티 제공까지. 외국인 유학생과 근로자를 위한 가장 믿음직한 러닝 파트너, GCU Global Bridge입니다.",
    en: "From learning support, translation/Korean education, employment/settlement guides, to national community forums. GCU Global Bridge is your most reliable learning partner.",
    vn: "Từ hỗ trợ học tập, dịch thuật/giáo dục tiếng Hàn, cẩm nang việc làm & định cư, đến diễn đàn cộng đồng. GCU Global Bridge là đối tác học tập đáng tin cậy nhất của bạn.",
    mn: "Суралцах дэмжлэг, орчуулга/солонгос хэлний боловсрол, ажил эрхлэлт/суурьших зааварчилгаа, улс орнуудын хамт олны форум. GCU Global Bridge нь таны хамгийн найдвартай түнш юм."
  },
  heroCtaBtn: {
    ko: "학습 지원 받기",
    en: "Get Learning Support",
    vn: "Nhận hỗ trợ học tập",
    mn: "Сургалтын дэмжлэг авах"
  },
  heroIntroBtn: {
    ko: "사업 소개 보기",
    en: "View Project Intro",
    vn: "Xem giới thiệu dự án",
    mn: "Төслийн танилцуулга"
  },
  statStudents: {
    ko: "등록 외국인 학생",
    en: "Registered Intl Students",
    vn: "Sinh viên quốc tế đăng ký",
    mn: "Бүртгэлтэй гадаад оюутан"
  },
  statPassRate: {
    ko: "TOPIK 시험 합격률",
    en: "TOPIK Exam Pass Rate",
    vn: "Tỷ lệ đỗ kỳ thi TOPIK",
    mn: "TOPIK шалгалтын тэнцэлт"
  },
  statVisa: {
    ko: "우수 인재 비자 매칭",
    en: "Talent Visa Matching",
    vn: "Khớp Visa nhân tài ưu tú",
    mn: "Шилдэг боловсон хүчний виз"
  },
  statSatisfaction: {
    ko: "정착 만족도 점수",
    en: "Settlement Satisfaction",
    vn: "Độ hài lòng định cư",
    mn: "Суурьшилтын сэтгэл ханамж"
  },

  // Shortcuts Grid
  scIntroTitle: {
    ko: "GCU 사업 소개",
    en: "GCU Project Intro",
    vn: "Giới thiệu GCU",
    mn: "GCU төслийн танилцуулга"
  },
  scIntroDesc: {
    ko: "대학 주도의 다문화 글로벌 인재 매칭 로드맵과 혜택을 알아봅니다.",
    en: "Explore university-led multicultural talent roadmaps and benefits.",
    vn: "Khám phá lộ trình và lợi ích dành cho nhân tài đa văn hóa do trường dẫn dắt.",
    mn: "Сургуулиас хэрэгжүүлж буй олон соёлт боловсон хүчний замын зурагтай танилцах."
  },
  scLearnTitle: {
    ko: "한국어 교육지원",
    en: "Korean Language Support",
    vn: "Hỗ trợ học tiếng Hàn",
    mn: "Солонгос хэл сурах дэмжлэг"
  },
  scLearnDesc: {
    ko: "TOPIK 학습 자료 다운로드 및 체계적인 한국어 온라인 무료 강좌 제공.",
    en: "Free TOPIK materials download and systematic free online Korean courses.",
    vn: "Tải tài liệu TOPIK miễn phí và học các khóa tiếng Hàn trực tuyến hệ thống.",
    mn: "TOPIK сурах материалыг үнэгүй татах болон солонгос хэлний үнэгүй сургалтууд."
  },
  scLifeTitle: {
    ko: "취업 & 비자 정보",
    en: "Jobs & Visa Info",
    vn: "Việc làm & Visa",
    mn: "Ажил эрхлэлт & Визний мэдээлэл"
  },
  scLifeDesc: {
    ko: "K-Work 실시간 채용 목록 조회 및 F-2-R 점수 자동 산출 시뮬레이터.",
    en: "K-Work real-time vacancy search and regional-specific F-2-R points calculator.",
    vn: "Tìm việc làm K-Work thời gian thực và máy tính điểm định cư F-2-R.",
    mn: "K-Work бодит цагийн ажлын байрны хайлт ба визний оноо тооцоолуур."
  },
  scCommTitle: {
    ko: "글로벌 커뮤니티",
    en: "Global Community",
    vn: "Cộng đồng toàn cầu",
    mn: "Глобал хамт олон"
  },
  scCommDesc: {
    ko: "국가별 동문 모임, 선배들의 리얼 한국 생활 후기 및 교류 게시판.",
    en: "National alumni networking, real living reviews, and exchange boards.",
    vn: "Kết nối cựu sinh viên các nước, chia sẻ thực tế và diễn đàn giao lưu.",
    mn: "Улс орнуудын төгсөгчдийн сүлжээ, амьдралын бодит түүх, солилцооны форум."
  },

  // Notices Synchronization
  feedSectionTitle: {
    ko: "통합 공지 & 외부기관 연계 알림",
    en: "Notices & Integrated Portal Alerts",
    vn: "Thông báo & Liên kết cổng thông tin",
    mn: "Нэгдсэн зарлан & Хамтрагч байгууллагын мэдээ"
  },
  feedTabAll: {
    ko: "전체피드",
    en: "All Feeds",
    vn: "Tất cả tin",
    mn: "Бүх мэдээ"
  },
  feedTabNotice: {
    ko: "학사공지",
    en: "Academic",
    vn: "Học vụ",
    mn: "Сургуулийн зар"
  },
  feedTabGov: {
    ko: "🔴 실시간 정부연동",
    en: "🔴 Live Government Feeds",
    vn: "🔴 Liên thông Chính phủ",
    mn: "🔴 Бодит цагийн виз/ажлын байр"
  },
  feedTabEvent: {
    ko: "행사안내",
    en: "Events",
    vn: "Sự kiện",
    mn: "Арга хэмжээ"
  },
  feedTabGuide: {
    ko: "생활정보",
    en: "Life Guides",
    vn: "Đời sống",
    mn: "Амьдралын заавар"
  },
  btnSyncTrigger: {
    ko: "실시간 포털 연동",
    en: "Sync Live Portals",
    vn: "Đồng bộ thời gian thực",
    mn: "Бодит цагт синхрончлох"
  },
  syncPending: {
    ko: "연동 대기",
    en: "Pending Sync",
    vn: "Đang chờ đồng bộ",
    mn: "Холболт хүлээж байна"
  },
  syncing: {
    ko: "연동 채널 동기화 중...",
    en: "Syncing Portals...",
    vn: "Đang đồng bộ...",
    mn: "Синхрончлогдож байна..."
  },
  syncSuccess: {
    ko: "포털 연동 완료",
    en: "Sync Complete",
    vn: "Đồng bộ thành công",
    mn: "Синхрончлол амжилттай"
  },
  
  // IBT Mock Exam Simulator keys
  examLobbyTitle: {
    ko: "TOPIK IBT 온라인 모의고사 고사장",
    en: "TOPIK IBT Online Mock Exam Center",
    vn: "Trung tâm thi thử trực tuyến TOPIK IBT",
    mn: "TOPIK IBT Онлайн загвар шалгалтын танхим"
  },
  examLobbyDesc: {
    ko: "관리자 포털에 등록된 최신 IBT 모의고사 시험을 실전과 동일한 분할화면 컴퓨터 환경에서 응시할 수 있습니다. 성적 기록은 상시 누적 저장됩니다.",
    en: "You can take the latest registered TOPIK mock exams in a split-screen computer testing environment. All scorecards are persisted.",
    vn: "Bạn có thể làm các bài thi TOPIK mới nhất trên màn hình chia nhỏ máy tính thực tế. Các phiếu điểm được lưu trữ.",
    mn: "Бүртгэгдсэн хамгийн сүүлийн үеийн TOPIK загвар шалгалтуудыг бодит цахим орчинд өгөх боломжтой. Онооны түүх хадгалагдана."
  },
  examDuration: {
    ko: "제한 시간",
    en: "Time Limit",
    vn: "Thời gian làm bài",
    mn: "Хугацаа"
  },
  examQuestions: {
    ko: "문항 수",
    en: "Questions Count",
    vn: "Số câu hỏi",
    mn: "Асуултын тоо"
  },
  examStatus: {
    ko: "응시 상태",
    en: "Exam Status",
    vn: "Trạng thái thi",
    mn: "Шалгалтын төлөв"
  },
  examStatusNotStarted: {
    ko: "미응시",
    en: "Not Attempted",
    vn: "Chưa làm bài",
    mn: "Өгөөгүй"
  },
  examStatusCompleted: {
    ko: "응시 완료",
    en: "Completed",
    vn: "Đã hoàn thành",
    mn: "Дуусгасан"
  },
  btnStartExam: {
    ko: "시험 시작하기",
    en: "Start Exam",
    vn: "Bắt đầu thi",
    mn: "Шалгалт эхлэх"
  },
  btnRetakeExam: {
    ko: "다시 응시하기",
    en: "Retake Exam",
    vn: "Thi lại",
    mn: "Дахин өгөх"
  },
  examHistoryTitle: {
    ko: "📈 나의 모의고사 응시 이력 (My Scorecards)",
    en: "📈 My Mock Exam Scorecards",
    vn: "📈 Phiếu điểm thi thử của tôi",
    mn: "📈 Миний загвар шалгалтын онооны түүх"
  },
  examHistoryDate: {
    ko: "응시 일자",
    en: "Date Taken",
    vn: "Ngày thi",
    mn: "Өгсөн огноо"
  },
  examHistoryScore: {
    ko: "획득 점수",
    en: "Score Obtained",
    vn: "Điểm đạt được",
    mn: "Авсан оноо"
  },
  examHistoryResult: {
    ko: "합격 등급",
    en: "TOPIK Grade",
    vn: "Cấp độ TOPIK",
    mn: "TOPIK Түвшин"
  },
  examAudioSpeed: {
    ko: "재생 배속",
    en: "Playback Speed",
    vn: "Tốc độ phát",
    mn: "Тоглуулах хурд"
  },
  examOmarker: {
    ko: "OMR 정답 마킹 카드",
    en: "OMR Answer Card",
    vn: "Phiếu trả lời OMR",
    mn: "OMR Хариултын хуудас"
  },
  examMarkerProgress: {
    ko: "OMR 마킹 진행률",
    en: "Marking Progress",
    vn: "Tiến độ trả lời",
    mn: "Бөглөлтийте явц"
  },
  btnSubmitExam: {
    ko: "최종 답안 제출",
    en: "Submit Exam",
    vn: "Nộp bài thi",
    mn: "Хариулт илгээх"
  },
  btnQuitExam: {
    ko: "시험 포기하기",
    en: "Quit Exam",
    vn: "Hủy thi",
    mn: "Шалгалт орхих"
  },
  examConfirmQuit: {
    ko: "정말로 시험을 중도 포기하고 고사장을 나가시겠습니까? 현재 마킹한 답안 내역은 저장되지 않습니다.",
    en: "Are you sure you want to quit the exam? Your current OMR selections will not be saved.",
    vn: "Bạn có chắc chắn muốn hủy thi và rời đi không? Phiếu OMR hiện tại sẽ không được lưu.",
    mn: "Та шалгалтыг орхихдоо итгэлтэй байна уу? Таны одоогийн хариулт хадгалагдахгүй."
  },
  examConfirmSubmit: {
    ko: "작성한 OMR 마킹 답안지를 제출하고 채점을 진행하시겠습니까?",
    en: "Are you sure you want to submit your OMR answer sheet for final grading?",
    vn: "Bạn có chắc muốn nộp phiếu trả lời OMR để tiến hành chấm điểm không?",
    mn: "Та OMR хариултын хуудсаа илгээн дүгнүүлэхдээ итгэлтэй байна уу?"
  },
  examResultTitle: {
    ko: "✏️ TOPIK IBT 시험 성적 결과",
    en: "✏️ TOPIK IBT Exam Score Report",
    vn: "✏️ Kết quả Báo cáo Điểm thi TOPIK IBT",
    mn: "✏️ TOPIK IBT Шалгалтын онооны тайлан"
  },
  examResultScore: {
    ko: "총점 (100점 만점)",
    en: "Total Score (Out of 100)",
    vn: "Tổng điểm (Thang điểm 100)",
    mn: "Нийт оноо (100-аас)"
  },
  examResultPass: {
    ko: "판정 수준",
    en: "TOPIK Evaluation",
    vn: "Đánh giá cấp độ",
    mn: "TOPIK Үнэлгээ"
  },
  examBtnBackToLobby: {
    ko: "고사장 로비로 가기",
    en: "Back to Exam Lobby",
    vn: "Quay lại Sảnh thi",
    mn: "Шалгалтын лоби руу буцах"
  }
};

export const getTranslation = (key: string, lang: Lang): string => {
  if (translations[key] && translations[key][lang]) {
    return translations[key][lang];
  }
  return key;
};
