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
    ko: "글로벌사이버대학교는 세계인에게 홍익인간 정신을 전파하는 글로벌 인재 육성 중심 대학입니다. GCU Post School은 다문화 유학생들과 근로자들의 학업 성공과 국내 안정적 정착을 성실히 지원합니다.",
    en: "Global Cyber University is a premier institution cultivating global leaders with the spirit of Hongik Ingan. GCU Post School dedicatedly supports the academic success and stable settlement of multicultural students and workers.",
    vn: "Đại học Global Cyber là trường hàng đầu bồi dưỡng nhân tài toàn cầu với tinh thần Hongik Ingan. GCU Post School hỗ trợ đắc lực cho sự thành công trong học tập và định cư ổn định của sinh viên và người lao động đa văn hóa.",
    mn: "Глобал Сайбер Их Сургууль нь Хонгик Инган үзэл санааг түгээн дэлхийн хэмжээний боловсон хүчин бэлтгэдэг тэргүүлэгч сургууль юм. GCU Post School нь олон соёлт оюутан, ажилчдын сурлагын амжилт, тогтвортой амьдралыг тууштай дэмжинэ."
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
    ko: "학습지원, 자막/한국어 교육, 취업/생활 정착 정보 및 국가별 커뮤니티 제공까지. 외국인 유학생과 근로자를 위한 가장 믿음직한 러닝 파트너, GCU Post School입니다.",
    en: "From learning support, translation/Korean education, employment/settlement guides, to national community forums. GCU Post School is your most reliable learning partner.",
    vn: "Từ hỗ trợ học tập, dịch thuật/giáo dục tiếng Hàn, cẩm nang việc làm & định cư, đến diễn đàn cộng đồng. GCU Post School là đối tác học tập đáng tin cậy nhất của bạn.",
    mn: "Суралцах дэмжлэг, орчуулга/солонгос хэлний боловсрол, ажил эрхлэлт/суурьших зааварчилгаа, улс орнуудын хамт олны форум. GCU Post School нь таны хамгийн найдвартай түнш юм."
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
  },
  examHistoryName: {
    ko: "모의고사 시험지명",
    en: "Mock Exam Title",
    vn: "Tên đề thi thử",
    mn: "Загвар шалгалтын нэр"
  },
  examHistoryDetail: {
    ko: "상세 채점표",
    en: "Scorecard Detail",
    vn: "Chi tiết bảng điểm",
    mn: "Дэлгэрэнгүй оноо"
  },
  examHistoryBtnView: {
    ko: "상세 보기",
    en: "View Detail",
    vn: "Xem chi tiết",
    mn: "Дэлгэрэнгүй харах"
  },
  examBtnModeCard: {
    ko: "🎯 1문항씩 풀기 (IBT 집중)",
    en: "🎯 Solve by 1 Question (IBT Focus)",
    vn: "🎯 Làm từng câu (Tập trung IBT)",
    mn: "🎯 1 асуултаар шийдвэрлэх"
  },
  examBtnModePdf: {
    ko: "📄 전체 시험지 보기 (PDF)",
    en: "📄 View Full Exam Paper (PDF)",
    vn: "📄 Xem toàn bộ đề thi (PDF)",
    mn: "📄 Бүх шалгалтын хуудсыг харах (PDF)"
  },
  examModeCardMobile: {
    ko: "🎯 1문항 집중 풀기",
    en: "🎯 1 Question Focus",
    vn: "🎯 Tập trung 1 câu",
    mn: "🎯 1 асуултын анхаарал"
  },
  examModePassageMobile: {
    ko: "📄 시험지 보기 (Passage)",
    en: "📄 View Exam Paper (Passage)",
    vn: "📄 Xem đề thi (Đoạn văn)",
    mn: "📄 Шалгалтын хуудсыг харах (Эх)"
  },
  examModeOmrMobile: {
    ko: "✏️ 답안 마킹 OMR",
    en: "✏️ Answer Marking OMR",
    vn: "✏️ Tô đáp án OMR",
    mn: "✏️ Хариулт тэмдэглэх OMR"
  },
  examLabelCardTitle: {
    ko: "🎯 IBT 단일 문항 집중 카드",
    en: "🎯 IBT Single Question Focus Card",
    vn: "🎯 Thẻ tập trung câu hỏi đơn IBT",
    mn: "🎯 IBT Ганц асуултын анхаарлын хуудас"
  },
  examLabelPassageTitle: {
    ko: "📄 IBT 문항지 지문 영역",
    en: "📄 IBT Exam Paper Passage Area",
    vn: "📄 Vùng đọc đoạn văn đề thi IBT",
    mn: "📄 IBT шалгалтын хуудасны эх"
  },
  examAudioPlaying: {
    ko: "📻 현재 재생 중인 음원 트랙:",
    en: "📻 Currently playing audio track:",
    vn: "📻 Băng âm thanh đang phát:",
    mn: "📻 Одоо тоглуулагдаж буй аудио зам:"
  },
  examListeningGuide: {
    ko: "👉 귀로 들리는 문제를 조용히 경청한 뒤, 아래에서 가장 올바른 보기를 골라 터치 마킹하십시오.",
    en: "👉 Listen quietly to the question through your ears, then select and touch-mark the most correct option below.",
    vn: "👉 Hãy chú ý lắng nghe câu hỏi bằng tai, sau đó chọn và đánh dấu đáp án chính xác nhất bên dưới.",
    mn: "👉 Асуултыг анхааралтай сонсоод, доорх хамгийн зөв хариултыг сонгож тэмдэглэнэ үү."
  },
  examReadingGuide: {
    ko: "📄 지문 독해 및 읽기 영역입니다. 전체 화면이나 PDF 시험지 보기를 원하시면 우측 상단 [📄 전체 시험지 보기] 탭을 선택하여 지문을 읽고 답을 마킹하십시오.",
    en: "📄 This is the reading comprehension area. If you want a full screen or PDF exam paper, select the [📄 View Full Exam Paper] tab at the top right to read the passages and mark your answers.",
    vn: "📄 Đây là phần đọc hiểu. Nếu bạn muốn xem toàn màn hình hoặc đề thi PDF, hãy chọn tab [📄 Xem toàn bộ đề thi] ở góc trên bên phải để đọc các đoạn văn và đánh dấu câu trả lời của bạn.",
    mn: "📄 Энэ бол унших хэсэг юм. Хэрэв та бүтэн дэлгэц эсвэл PDF шалгалтын хуудсыг хүсэж байвал баруун дээд талын [📄 Бүх шалгалтын хуудсыг харах] цонхыг сонгон эхийг уншиж хариултаа тэмдэглэнэ үү."
  },
  examOptionLabel: {
    ko: "보기",
    en: "Option",
    vn: "Đáp án",
    mn: "Сонголт"
  },
  examOptionSuffix: {
    ko: "번",
    en: "",
    vn: "",
    mn: ""
  },
  examQuestionPrefix: {
    ko: "제",
    en: "Question",
    vn: "Câu",
    mn: "Асуулт"
  },
  examQuestionSuffix: {
    ko: "문항",
    en: "",
    vn: "",
    mn: ""
  },
  examAudioDedicatedPlaying: {
    ko: "🎵 본 문항 전용 청취 음원이 재생되고 있습니다.",
    en: "🎵 Dedicated listening audio for this question is playing.",
    vn: "🎵 Đang phát âm thanh nghe chuyên dụng cho câu hỏi này.",
    mn: "🎵 Энэ асуултын тусгай аудио тоглогдож байна."
  },
  examBtnPrevQuestion: {
    ko: "◀ 이전 문항",
    en: "◀ Prev Question",
    vn: "◀ Câu trước",
    mn: "◀ Өмнөх асуул트"
  },
  examBtnNextQuestion: {
    ko: "다음 문항 ▶",
    en: "Next Question ▶",
    vn: "Câu tiếp theo ▶",
    mn: "Дараах асуулт ▶"
  },
  examAudioPlayerHeader: {
    ko: "🔊 듣기 평가 재생기",
    en: "🔊 Listening Audio Player",
    vn: "🔊 Trình phát âm thanh nghe",
    mn: "🔊 Сонсох аудио тоглуулагч"
  },
  examAudioTrackSelector: {
    ko: "🎧 청취 음원 트랙 선택 (Audio Tracks):",
    en: "🎧 Select Audio Track (Audio Tracks):",
    vn: "🎧 Chọn băng âm thanh (Audio Tracks):",
    mn: "🎧 Аудио зам сонгох (Audio Tracks):"
  },
  examBtnSingleQuestion: {
    ko: "🎯 단일 문항",
    en: "🎯 Single Question",
    vn: "🎯 Câu hỏi đơn",
    mn: "🎯 Ганц асуулт"
  },
  examBtnFullSheet: {
    ko: "📋 전체 시트",
    en: "📋 Full Sheet",
    vn: "📋 Toàn bộ phiếu",
    mn: "📋 Бүх хуудас"
  },
  examFocusQuestion: {
    ko: "FOCUS QUESTION",
    en: "FOCUS QUESTION",
    vn: "CÂU HỎI TẬP TRUNG",
    mn: "ЧИГЛЭСЭН АСУУЛТ"
  },
  examFocusQuestionLabel: {
    ko: "문항",
    en: "Question",
    vn: "Câu",
    mn: "Асуулт"
  },
  examAutoMoveNotice: {
    ko: "※ 마킹 시 0.25초 뒤 다음 문항으로 자동 이동합니다.",
    en: "※ Automatically moves to the next question in 0.25 seconds after marking.",
    vn: "※ Tự động chuyển sang câu tiếp theo sau 0.25 giây sau khi tô.",
    mn: "※ Тэмдэглэгээ хийснээс хойш 0.25 секундын дараа дараагийн асуулт руу автоматаар шилжинэ."
  },
  examBtnPrev: {
    ko: "◀ 이전",
    en: "◀ Prev",
    vn: "◀ Trước",
    mn: "◀ Өмнөх"
  },
  examBtnNext: {
    ko: "다음 ▶",
    en: "Next ▶",
    vn: "Tiếp ▶",
    mn: "Дараах ▶"
  },
  examNavigatorLabel: {
    ko: "🧭 빠른 문항 네비게이터:",
    en: "🧭 Quick Question Navigator:",
    vn: "🧭 Trình điều hướng câu hỏi nhanh:",
    mn: "🧭 Шуурхай асуултын навигатор:"
  },
  examPoints: {
    ko: "점",
    en: "pts",
    vn: "điểm",
    mn: "оноо"
  },
  examDetailScorecardTitle: {
    ko: "🔍 모의고사 성적 상세 분석 (Detailed Scorecard)",
    en: "🔍 Detailed Scorecard Analysis",
    vn: "🔍 Phân tích chi tiết bảng điểm",
    mn: "🔍 Загвар шалгалтын онооны нарийвчилсан дүн"
  },
  examCorrectAnswer: {
    ko: "정답",
    en: "Correct Answer",
    vn: "Đáp án đúng",
    mn: "Зөв хариулт"
  },
  examYourAnswer: {
    ko: "학우님 답안",
    en: "Your Answer",
    vn: "Đáp án của bạn",
    mn: "Таны хариулт"
  },
  examIsCorrect: {
    ko: "정오 판정",
    en: "Result",
    vn: "Đúng/Sai",
    mn: "Зөв/Буруу"
  },
  examScoreCorrect: {
    ko: "정답 🟢",
    en: "Correct 🟢",
    vn: "Đúng 🟢",
    mn: "Зөв 🟢"
  },
  examScoreIncorrect: {
    ko: "오답 ❌",
    en: "Incorrect ❌",
    vn: "Sai ❌",
    mn: "Буруу ❌"
  },
  examAcademicNoticeTitle: {
    ko: "📋 응시 가능한 모의고사 시험지",
    en: "📋 Available Mock Exam Papers",
    vn: "📋 Đề thi thử có sẵn",
    mn: "📋 Өгөх боломжтой загвар шалгалтын материал"
  },
  examReportTitle: {
    ko: "💡 IBT 모의고사 개인 성적 & 해설 상세 보고서",
    en: "💡 IBT Mock Exam Detailed Score & Explanation Report",
    vn: "💡 Báo cáo chi tiết điểm số & giải thích thi thử IBT",
    mn: "💡 IBT загвар шалгалтын онооны нарийвчилсан тайлан"
  },
  examReportPaper: {
    ko: "응시 기출 시험지",
    en: "Exam Paper",
    vn: "Đề thi đã làm",
    mn: "Өгсөн шалгалтын материал"
  },
  examReportScore: {
    ko: "취득 점수",
    en: "Your Score",
    vn: "Điểm số đạt được",
    mn: "Авсан оноо"
  },
  examReportGrade: {
    ko: "TOPIK 평가 등급",
    en: "TOPIK Evaluation",
    vn: "Đánh giá cấp độ TOPIK",
    mn: "TOPIK Үнэлгээний түвшин"
  },
  examReportDate: {
    ko: "응시 일자",
    en: "Exam Date",
    vn: "Ngày thi",
    mn: "Шалгалт өгсөн огноо"
  },
  examReportTableTitle: {
    ko: "문항별 마킹 대조 분석표 (오답노트)",
    en: "Question-by-Question Marking & Analysis",
    vn: "Bảng phân tích đối chiếu đáp án từng câu (Sổ tay câu sai)",
    mn: "Асуулт бүрийн тэмдэглэгээ ба дүн шинжилгээний хүснэгт"
  },
  examReportCorrectRate: {
    ko: "정답률",
    en: "Correct Rate",
    vn: "Tỷ lệ đúng",
    mn: "Зөв хариултын хувь"
  },
  examReportQNo: {
    ko: "문항 번호",
    en: "Q.No",
    vn: "Số câu hỏi",
    mn: "Асуултын дугаар"
  },
  examReportYourAnswer: {
    ko: "제출한 답안",
    en: "Your Answer",
    vn: "Đáp án đã nộp",
    mn: "Илгээсэн хариулт"
  },
  examReportCorrectKey: {
    ko: "실제 정답지",
    en: "Correct Key",
    vn: "Đáp án đúng thực tế",
    mn: "Бодит зөв хариулт"
  },
  examReportStatus: {
    ko: "채점 결과",
    en: "Status",
    vn: "Kết quả",
    mn: "Шалгалтын дүн"
  },
  examReportUnmarked: {
    ko: "미마킹",
    en: "Unmarked",
    vn: "Chưa tô",
    mn: "Тэмдэглээгүй"
  },
  examReportCorrect: {
    ko: "✅ 정답",
    en: "✅ Correct",
    vn: "✅ Đúng",
    mn: "✅ Зөв"
  },
  examReportIncorrect: {
    ko: "❌ 오답",
    en: "❌ Incorrect",
    vn: "❌ Sai",
    mn: "❌ Буруу"
  },
  examReportGuideTitle: {
    ko: "기출 공식 정답 및 해법 해설집",
    en: "Official Answer & Explanation Guide",
    vn: "Sách hướng dẫn đáp án & giải thích chính thức",
    mn: "Албан ёсны зөв хариулт ба тайлбар гарын авлага"
  },
  examReportFileName: {
    ko: "파일명",
    en: "File",
    vn: "Tên tệp",
    mn: "Файлын нэр"
  },
  examReportBtnDownload: {
    ko: "해설집 PDF 받기",
    en: "Download PDF",
    vn: "Tải về PDF giải thích",
    mn: "Тайлбарын PDF-ийг татах"
  },
  examReportNoPdf: {
    ko: "ℹ️ 본 시험지는 출제자가 등록한 해설지 PDF가 존재하지 않습니다.",
    en: "ℹ️ No official explanation PDF is registered for this exam.",
    vn: "ℹ️ Đề thi này không có tài liệu giải thích PDF do người ra đề đăng ký.",
    mn: "ℹ️ Энэхүү шалгалтын хуудсанд зохиогчоос бүртгүүлсэн PDF тайлбар байхгүй байна."
  },
  examReportBtnClose: {
    ko: "닫기",
    en: "Close",
    vn: "Đóng",
    mn: "Хаах"
  }
};

export const getTranslation = (key: string, lang: Lang): string => {
  if (translations[key] && translations[key][lang]) {
    return translations[key][lang];
  }
  return key;
};
