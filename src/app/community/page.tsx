"use client";

import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

// Mock post database categorized by board tab with dynamic translation maps
const MOCK_POSTS = [
  {
    id: 1,
    board: "free",
    country: "🇻🇳 베트남",
    author: "Nguyen Thu",
    time: {
      ko: "30분 전",
      en: "30m ago",
      vn: "30 phút trước",
      mn: "30 минутын өмнө"
    },
    title: {
      ko: "압구정 캠퍼스 근처에 동남아 식자재 저렴하게 파는 마트 추천해주세요!",
      en: "Please recommend a cheap Southeast Asian grocery store near Apgujeong Campus!",
      vn: "Hãy gợi ý siêu thị bán thực phẩm Đông Nam Á giá rẻ gần cơ sở Apgujeong!",
      mn: "Апгүжон кампусын ойролцоо Зүүн Өмнөд Азийн хүнсний бүтээгдэхүүн хямд зардаг дэлгүүр санал болгоорой!"
    },
    body: {
      ko: "안녕하세요 베트남에서 온 유학생 투라고 합니다. 압구정 캠퍼스 근처나 압구정역 인근에 고향 식재료나 라이스페이퍼, 소스 등을 저렴하게 파는 아시안 마트가 있을까요? 고향 음식이 너무 그리워서 집에서 만들어 먹어보고 싶습니다. 정보 아시는 선배님들 계시면 공유 부탁드립니다!",
      en: "Hello, I am Thu, an international student from Vietnam. Is there an Asian mart that sells cheap home ingredients, rice paper, or sauces near Apgujeong Campus or Apgujeong Station? I miss home food so much and want to cook it at home. If any seniors know any information, please share!",
      vn: "Xin chào mọi người, mình là Thu, du học sinh đến từ Việt Nam. Có siêu thị châu Á nào bán nguyên liệu quê hương, bánh tráng, nước sốt giá rẻ gần cơ sở Apgujeong hay ga Apgujeong không ạ? Mình nhớ đồ ăn quê nhà quá nên muốn tự nấu ăn ở nhà. Tiền bối nào biết chia sẻ thông tin giúp mình với ạ!",
      mn: "Сайн байцгаана уу, би Вьетнамаас ирсэн оюутан Тү байна. Апгүжон кампус эсвэл Апгүжон өртөөний ойролцоо эх орны хүнсний бүтээгдэхүүн, цагаан будааны цаас, соусыг хямд зардаг ази дэлгүүр байдаг болов уу? Эх орны хоолоо маш их санаж байгаа тул гэртээ хийж идмээр байна. Мэдээлэл байвал хуваалцаарай!"
    },
    views: 48,
    likes: 12,
    comments: [
      {
        id: 1,
        author: "김민재 (한국)",
        time: { ko: "25분 전", en: "25m ago", vn: "25 phút trước", mn: "25 минутын өмнө" },
        text: {
          ko: "지하철로 두 정거장 거리인 동대문역 근처에 대형 아시아 마트 골목이 있어요! 소스나 향신료 종류 엄청 많습니다.",
          en: "There is a large Asian mart alley near Dongdaemun Station, which is two subway stops away! There are so many types of sauces and spices.",
          vn: "Có một con ngõ siêu thị châu Á lớn gần ga Dongdaemun, cách đó hai ga tàu điện ngầm! Có rất nhiều loại nước sốt và gia vị.",
          mn: "Метрогоор хоёр буудлын зайд орших Дундэмүн өртөөний ойролцоо том ази дэлгүүрийн гудамж бий! Маш олон төрлийн соус, амтлагч байгаа."
        }
      },
      {
        id: 2,
        author: "Anvar (우즈벡)",
        time: { ko: "10분 전", en: "10m ago", vn: "10 phút trước", mn: "10 минутын өмнө" },
        text: {
          ko: "저도 요리해먹는거 좋아하는데 같이 가요! 쪽지 보냈습니다.",
          en: "I also love cooking, let's go together! I've sent you a direct message.",
          vn: "Mình cũng rất thích nấu ăn, đi cùng nhau nhé! Mình đã nhắn tin riêng rồi.",
          mn: "Би ч гэсэн хоол хийх дуртай, хамт явцгаая! Хувийн зурвас илгээсэн шүү."
        }
      }
    ]
  },
  {
    id: 2,
    board: "groups",
    country: "🇲🇳 몽골",
    author: "Bataa",
    time: {
      ko: "2시간 전",
      en: "2h ago",
      vn: "2 giờ trước",
      mn: "2 цагийн өмнө"
    },
    title: {
      ko: "2026학년도 몽골인 동문 오프라인 정착 친목회 소집 공지",
      en: "Notice of 2026 Mongolian Alumni Offline Settlement Networking Meeting",
      vn: "Thông báo triệu tập buổi họp mặt giao lưu định cư cựu sinh viên Mông Cổ năm học 2026",
      mn: "2026 оны Монгол төгсөгчдийн уулзалт суурьших зөвлөгөөний зар"
    },
    body: {
      ko: "안녕하세요 글로벌사이버대학교 몽골 학생회 회장 바타입니다! 이번 학기에 입학한 신입 유학생 분들의 대학 생활 적응을 돕고, 한국 일자리 및 비자 취득을 완료한 졸업생 선배님들의 노하우를 듣는 소규모 정착 네트워킹 세미나 모임을 압구정 비즈니스룸에서 개최하고자 하오니 몽골 학우 여러분의 많은 참여 바랍니다.",
      en: "Hello, I am Bataa, the president of the Mongolian Student Association at Global Cyber University! We are holding a small networking seminar in Apgujeong Business Room to help newly enrolled international students adjust to college life and hear key know-how from alumni who successfully obtained jobs and visas in Korea.",
      vn: "Xin chào mọi người, mình là Bataa, Chủ tịch Hội sinh viên Mông Cổ tại Đại học Global Cyber! Nhằm giúp các bạn tân sinh viên nhập học học kỳ này thích nghi với cuộc sống đại học và lắng nghe bí quyết từ các cựu sinh viên đã hoàn thành thủ tục xin việc và visa tại Hàn Quốc, chúng tôi sẽ tổ chức một buổi hội thảo giao lưu định cư quy mô nhỏ tại Phòng họp Apgujeong. Rất mong nhận được sự tham gia đông đảo của các bạn học sinh Mông Cổ.",
      mn: "Сайн байцгаана уу, Глобал Сайбер Их Сургуулийн Монгол оюутны холбооны тэргүүн Батаа байна! Энэ улиралд элсэн орсон шинэ оюутнуудыг сургуульдаа дасахад туслах, солонгост ажил болон виз авсан төгсөгчдийн туршлагаас хуваалцах суурьших сүлжээний уулзалтыг Апгүжонд зохион байгуулах тул монгол оюутнуудыг идэвхтэй оролцохыг хүсье."
    },
    views: 112,
    likes: 24,
    comments: [
      {
        id: 1,
        author: "Altantsetseg",
        time: { ko: "1시간 전", en: "1h ago", vn: "1 giờ trước", mn: "1 цагийн өмнө" },
        text: {
          ko: "우와 이번 신입생인데 꼭 참석하고 싶습니다! 시간 안내 자세히 부탁드립니다.",
          en: "Wow, I am a new student this semester and definitely want to attend! Please share the exact time.",
          vn: "Tuyệt quá, mình là tân sinh viên kỳ này, mình rất muốn tham gia! Cho mình xin thông tin thời gian chi tiết nhé.",
          mn: "Хөөх, би энэ улирлын шинэ оюутан байна, заавал очно! Цагийн хуваарийг дэлгэрэнгүй хэлж өгөөрэй."
        }
      },
      {
        id: 2,
        author: "Bataa (글쓴이)",
        time: { ko: "45분 전", en: "45m ago", vn: "45 phút trước", mn: "45 минутын өмнө" },
        text: {
          ko: "네! 이번 주 토요일 오후 3시로 확정되었고, 단체 카톡방에 상세 지도를 공유했습니다.",
          en: "Yes! It is confirmed for this Saturday at 3 PM, and the detailed map has been shared in our group chat room.",
          vn: "Vâng ạ! Đã chốt thời gian vào 3 giờ chiều thứ Bảy tuần này và bản đồ chi tiết đã được chia sẻ trong phòng chat KakaoTalk nhóm.",
          mn: "Тийм ээ! Энэ бямба гарагийн 15:00 цагт товлогдсон бөгөөд нэгдсэн чатаар газрын зургийг хуваалцсан."
        }
      }
    ]
  },
  {
    id: 3,
    board: "reviews",
    country: "🇳🇵 네팔",
    author: "Rajesh",
    time: {
      ko: "1일 전",
      en: "1d ago",
      vn: "1 ngày trước",
      mn: "1 өдрийн өмнө"
    },
    title: {
      ko: "TOPIK 4급 합격 및 GCU 연계 우수 제조기업 F-2-R 비자 취득 수기!",
      en: "Passed TOPIK 4 & Acquired F-2-R Visa with GCU-Partnered Manufacturing Company!",
      vn: "Đỗ TOPIK cấp 4 và Đạt được Visa F-2-R với doanh nghiệp liên kết xuất sắc của GCU!",
      mn: "TOPIK 4-р зэрэг болон GCU холбоот аж үйлдвэрийн компанид F-2-R виз авсан түүх!"
    },
    body: {
      ko: "네팔에서 온 라제쉬입니다. 처음에 한국에 올 때는 의사소통도 안 되고 비자 전환은 막막한 꿈 같기만 했습니다. 하지만 글로벌사이버대 한국어 무료 강좌와 듣기 기출문제집을 다운로드받아 매일 공부한 덕분에 이번에 TOPIK 4급을 합격할 수 있었습니다. 이후 취업 포털을 통해 충남에 위치한 유망 가공 기업에 정식 엔지니어로 면접을 합격하였고, 대학 정착 멘토단 분들의 꼼꼼한 서류 준비 지원 덕분에 지자체장 우수인재 F-2-R(지역특화형) 거주 비자 추천서를 발행받아 공식 체류 자격을 얻게 되었습니다! 학업과 취업을 동시 서포트해 준 대학에 머리 숙여 감사드립니다.",
      en: "I am Rajesh from Nepal. When I first came to Korea, communication was impossible, and changing visas felt like an unreachable dream. However, thanks to studying daily with Global Cyber University's free Korean courses and past exam downloads, I passed TOPIK Level 4 this time. Afterwards, I passed an interview as a formal engineer at a manufacturing company in Chungnam via our job portal. Thanks to the meticulous documentation support from our settlement mentors, I successfully received the F-2-R residency visa recommendation letter from the local governor and gained official residency status! I bow in gratitude to the university for supporting both my studies and employment.",
      vn: "Mình là Rajesh đến từ Nepal. Khi mới đến Hàn Quốc, giao tiếp cực kỳ khó khăn và việc chuyển đổi visa giống như một giấc mơ xa vời. Tuy nhiên, nhờ kiên trì học tập mỗi ngày với các khóa tiếng Hàn miễn phí của ĐH Global Cyber và tải đề thi thử, mình đã đỗ TOPIK Cấp 4 kỳ này. Sau đó, mình đã trúng tuyển kỹ sư chính thức tại một doanh nghiệp gia công triển vọng ở Chungnam qua cổng tuyển dụng. Nhờ sự hỗ trợ chuẩn bị hồ sơ tỉ mỉ của các cố vấn định cư, mình đã nhận được Thư giới thiệu Visa cư trú F-2-R của Tỉnh trưởng và đạt tư cách cư trú chính thức! Xin chân thành cảm ơn nhà trường đã hỗ trợ đắc lực cho cả việc học và việc làm của mình.",
      mn: "Непалаас ирсэн Ражеш байна. Солонгост анх ирэхэд харилцахад хэцүү, визээ солих нь мөрөөдөл шиг санагдаж байлаа. Гэвч Глобал Сайбер Их Сургуулийн үнэгүй солонгос хэлний хичээл, шалгалтын материалуудыг татан авч өдөр бүр бэлдсний ачаар TOPIK 4-р зэрэг авч чадлаа. Үүний дараа ажил зуучлалаар Чүннам дахь компанид инженерээр тэнцэж, сургуулийн зөвлөхүүдийн тусламжтай орон нутгийн засаг даргаас F-2-R визний тодорхойлолт авч албан ёсны статус авлаа! Сургалт болон ажил эрхлэлтийг хамтад нь дэмжсэн сургуульдаа маш их баярлалаа."
    },
    views: 240,
    likes: 67,
    comments: [
      {
        id: 1,
        author: "지원관 (GCU)",
        time: { ko: "20시간 전", en: "20h ago", vn: "20 giờ trước", mn: "20 цагийн өмнө" },
        text: {
          ko: "라제쉬 학우님! 정말 축하드립니다. 타지에서 묵묵히 공부하고 노력하신 성과가 비자 승인이라는 큰 결실로 맺어졌네요. 다른 후배들에게도 큰 귀감이 될 것입니다.",
          en: "Congratulations Rajesh! Your silent hard work and dedication in a foreign country have borne great fruit with this visa approval. This will be a wonderful role model for other junior students.",
          vn: "Chúc mừng học hữu Rajesh! Sự nỗ lực và kiên trì học tập thầm lặng của bạn ở đất khách quê người cuối cùng đã gặt hái được quả ngọt lớn là phê duyệt visa. Đây sẽ là tấm gương lớn cho các khóa sau.",
          mn: "Ражеш оюутанд маш их баяр хүргэе! Гадаад улсад чимээгүйхэн хичээж зүтгэсний үр дүнд виз авсан нь маш том амжилт юм. Бусад оюутнуудад маш сайн үлгэр жишээ боллоо."
        }
      },
      {
        id: 2,
        author: "Amgalan",
        time: { ko: "15시간 전", en: "15h ago", vn: "15 giờ trước", mn: "15 цагийн өмнө" },
        text: {
          ko: "축하드립니다! 저도 점수 계산해보니 55점이 나와서 TOPIK 급수 1단계만 더 높여서 신청해보려고 합니다. 희망을 얻었습니다.",
          en: "Congratulations! I calculated my points and got 55. I will try to raise my TOPIK level by one stage and apply. This gives me hope.",
          vn: "Chúc mừng bạn nhé! Mình tự tính điểm được 55 điểm, mình sẽ cố gắng thi nâng thêm 1 cấp TOPIK nữa rồi đăng ký. Bài viết của bạn truyền cho mình rất nhiều hy vọng.",
          mn: "Баяр хүргэе! Би оноогоо тооцож үзэхэд 55 оноо гарсан тул TOPIK зэргээ нэг шат ахиулаад өргөдөл өгөхөөр шийдлээ. Маш их итгэл найдвар авлаа."
        }
      }
    ]
  }
];

const COMMUNITY_TRANSLATIONS: Record<"ko" | "en" | "vn" | "mn", {
  pageTitle: string;
  pageDesc: string;
  tabAll: string;
  tabFree: string;
  tabGroups: string;
  tabReviews: string;
  searchPlaceholder: string;
  viewsLabel: string;
  likesLabel: string;
  commentsLabel: string;
  noPosts: string;
  hotTitle: string;
  gatheringActive: string;
  vnGathering: string;
  mnGathering: string;
  npGathering: string;
  uzGathering: string;
  mentorTitle: string;
  mentorDesc: string;
  mentorBtn: string;
  mentorAlert: string;
  commenterPlaceholder: string;
  commentPlaceholder: string;
  commentBtn: string;
  authorLabel: string;
  viewsText: string;
  commentsTitle: string;
  closeBtn: string;
}> = {
  ko: {
    pageTitle: "글로벌 커뮤니티",
    pageDesc: "글로벌사이버대 외국인 학우들이 함께 모여 한국 생활의 고민을 나누고, 각 국가별 동문 네트워크 모임 소식 및 선배들의 실제 정착 비자 합격 수기들을 공유하는 열린 소통 광장입니다.",
    tabAll: "💬 전체 보기",
    tabFree: "🙋 자유 토론판",
    tabGroups: "📅 국가별 모임소식",
    tabReviews: "🌟 생생 정착 후기",
    searchPlaceholder: "게시판 내 글 제목, 내용, 작성자를 검색하십시오...",
    viewsLabel: "조회",
    likesLabel: "추천",
    commentsLabel: "댓글",
    noPosts: "현재 카테고리에 조건에 맞는 게시글이 존재하지 않습니다. 첫 번째 글의 주인공이 되어보세요!",
    hotTitle: "🔥 실시간 핫 국가별 학생회",
    gatheringActive: "명 활동",
    vnGathering: "베트남 동문 모임",
    mnGathering: "몽골 유학생 연합회",
    npGathering: "네팔 교민/학생 모임",
    uzGathering: "우즈베키스탄 친목 모임",
    mentorTitle: "정착 헬프데스크 운영단 모집",
    mentorDesc: "생활 사기 예방 가이드 전파, 원룸 계약 동행 지원 및 구청 서류 번역 보조를 이끌어갈 다문화 선배 멘토단을 매칭 모집합니다.",
    mentorBtn: "멘토단 등록 지원",
    mentorAlert: "다문화 정착 멘토단 사전 신청 양식이 팝업 접수되었습니다. 개별 연락을 드리겠습니다.",
    commenterPlaceholder: "댓글작성자 성명을 입력하십시오...",
    commentPlaceholder: "따뜻하고 건설적인 피드백이나 댓글을 입력해 주십시오...",
    commentBtn: "댓글 등록",
    authorLabel: "작성자",
    viewsText: "조회수",
    commentsTitle: "실시간 댓글",
    closeBtn: "✕"
  },
  en: {
    pageTitle: "Global Community Forum",
    pageDesc: "An open space for global classmates at Global Cyber University to share lifestyle queries, local alumni network gatherings, and real visa/job success reviews.",
    tabAll: "💬 View All",
    tabFree: "🙋 Free Board",
    tabGroups: "📅 National Gatherings",
    tabReviews: "🌟 Visa Success Stories",
    searchPlaceholder: "Search by title, contents, or author name...",
    viewsLabel: "Views",
    likesLabel: "Likes",
    commentsLabel: "Comments",
    noPosts: "No posts found for the current criteria. Be the first one to write a post!",
    hotTitle: "🔥 Active Student Associations",
    gatheringActive: "members active",
    vnGathering: "Vietnam Alumni Group",
    mnGathering: "Mongolian Student Union",
    npGathering: "Nepalese Community Network",
    uzGathering: "Uzbekistan Fellowship Group",
    mentorTitle: "Join Settlement Helpdesk Mentors",
    mentorDesc: "We recruit senior mentors to lead fraud prevention guides, housing contract translations, and immigration office accompaniments.",
    mentorBtn: "Register as Mentor",
    mentorAlert: "Your mentor application has been registered. We will contact you shortly.",
    commenterPlaceholder: "Enter your name...",
    commentPlaceholder: "Enter constructive feedback or comments...",
    commentBtn: "Add Comment",
    authorLabel: "Author",
    viewsText: "Views",
    commentsTitle: "Real-time Comments",
    closeBtn: "✕"
  },
  vn: {
    pageTitle: "Cộng đồng Toàn cầu",
    pageDesc: "Không gian mở dành cho du học sinh và người lao động ĐH Global Cyber để chia sẻ trải nghiệm sống, thông tin họp mặt hội đồng hương các nước và bí quyết xin visa định cư.",
    tabAll: "💬 Xem tất cả",
    tabFree: "🙋 Diễn đàn Tự do",
    tabGroups: "📅 Tin tức Hội nhóm",
    tabReviews: "🌟 Kinh nghiệm Định cư",
    searchPlaceholder: "Tìm kiếm theo tiêu đề, nội dung hoặc người viết...",
    viewsLabel: "Xem",
    likesLabel: "Thích",
    commentsLabel: "Bình luận",
    noPosts: "Hiện tại không có bài viết nào phù hợp. Hãy là người đầu tiên đăng bài viết nhé!",
    hotTitle: "🔥 Hội sinh viên nổi bật các nước",
    gatheringActive: "thành viên hoạt động",
    vnGathering: "Hội cựu sinh viên Việt Nam",
    mnGathering: "Liên hội du học sinh Mông Cổ",
    npGathering: "Hội đồng bào & sinh viên Nepal",
    uzGathering: "Hội giao lưu Uzbekistan",
    mentorTitle: "Tuyển Cố vấn Hỗ trợ Định cư",
    mentorDesc: "Tuyển các cố vấn đồng hương có kinh nghiệm hỗ trợ du học sinh mới sang phòng ngừa lừa đảo, hợp đồng nhà ở và dịch thuật.",
    mentorBtn: "Đăng ký Cố vấn viên",
    mentorAlert: "Biểu mẫu đăng ký Cố vấn Định cư đã được ghi nhận. Chúng tôi sẽ liên hệ riêng với bạn.",
    commenterPlaceholder: "Nhập tên người viết bình luận...",
    commentPlaceholder: "Nhập bình luận mang tính xây dựng và ấm áp...",
    commentBtn: "Đăng bình luận",
    authorLabel: "Người viết",
    viewsText: "Lượt xem",
    commentsTitle: "Bình luận trực tuyến",
    closeBtn: "✕"
  },
  mn: {
    pageTitle: "Глобал хамт олон",
    pageDesc: "Глобал Сайбер Их Сургуулийн оюутнууд хамтран солонгост амьдрах туршлагаа хуваалцах, улс орнуудын төгсөгчдийн уулзалтын зар, виз авсан бодит түүх хуваалцах форум.",
    tabAll: "💬 Бүгдийг харах",
    tabFree: "🙋 Чөлөөт хэлэлцүүлэг",
    tabGroups: "📅 Улс орнуудын уулзалт",
    tabReviews: "🌟 Суурьшсан бодит түүх",
    searchPlaceholder: "Гарчиг, агуулга, бичсэн хүний нэрээр хайх...",
    viewsLabel: "Үзсэн",
    likesLabel: "Таалагдсан",
    commentsLabel: "Сэтгэгдэл",
    noPosts: "Одоогоор агуулга байхгүй байна. Анхны сэтгэгдлийг та бичээрэй!",
    hotTitle: "🔥 Идэвхтэй Оюутны холбоод",
    gatheringActive: "оюутан идэвхтэй",
    vnGathering: "Вьетнам төгсөгчдийн холбоо",
    mnGathering: "Монгол оюутны холбоо",
    npGathering: "Непал иргэдийн холбоо",
    uzGathering: "Узбекистан оюутны холбоо",
    mentorTitle: "Суурьшихад туслах メンター элсүүлнэ",
    mentorDesc: "Шинээр ирсэн оюутнуудад байр олох, гэрээ хийх, дүүргийн бичиг баримт бүрдүүлэхэд туслах ахлах оюутнуудыг элсүүлж байна.",
    mentorBtn: "Туслахаар бүртгүүлэх",
    mentorAlert: "Суурьшихад туслах оюутны бүртгэлийн хүсэлт илгээгдлээ. Бид тантай холбогдох болно.",
    commenterPlaceholder: "Нэрээ оруулна уу...",
    commentPlaceholder: "Сэтгэгдлээ энд бичнэ үү...",
    commentBtn: "Сэтгэгдэл илгээх",
    authorLabel: "Бичсэн",
    viewsText: "Үзсэн тоо",
    commentsTitle: "Бодит цагийн сэтгэгдэл",
    closeBtn: "✕"
  }
};

export default function CommunityPage() {
  const { lang } = useLanguage();
  const tComm = COMMUNITY_TRANSLATIONS[lang as "ko" | "en" | "vn" | "mn"] || COMMUNITY_TRANSLATIONS.ko;

  const [activeBoard, setActiveBoard] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  // Card translation language state (ko, en, vn, mn)
  const [cardLangs, setCardLangs] = useState<Record<number, "ko" | "en" | "vn" | "mn">>({});

  const getCardLang = (postId: number): "ko" | "en" | "vn" | "mn" => {
    const cardLang = cardLangs[postId];
    if (cardLang) return cardLang;
    if (lang === "ko" || lang === "en" || lang === "vn" || lang === "mn") {
      return lang;
    }
    return "ko";
  };

  const selectedPostLang = selectedPost ? getCardLang(selectedPost.id) : ((lang === "ko" || lang === "en" || lang === "vn" || lang === "mn") ? lang : "ko");

  // Custom comment states to simulate database insertion reactively
  const [dynamicPosts, setDynamicPosts] = useState<any[]>(MOCK_POSTS);
  const [commentText, setCommentText] = useState("");
  const [commenterName, setCommenterName] = useState("");

  // Restore community posts from localStorage on mount
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPosts = localStorage.getItem("gcu-community-posts");
      if (savedPosts) {
        try {
          setDynamicPosts(JSON.parse(savedPosts));
        } catch (e) {
          console.error("Failed to parse saved community posts:", e);
        }
      }
    }
  }, []);

  const handleOpenPost = (post: any) => {
    // Sync the local selection with latest states in dynamicPosts
    const latestPost = dynamicPosts.find(p => p.id === post.id) || post;
    setSelectedPost(latestPost);
  };

  const handleClosePost = () => {
    setSelectedPost(null);
    setCommentText("");
    setCommenterName("");
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !commenterName.trim() || !selectedPost) return;

    const newComment = {
      id: Date.now(),
      author: commenterName,
      time: { ko: "방금 전", en: "just now", vn: "vừa xong", mn: "саяхан" },
      text: { ko: commentText, en: commentText, vn: commentText, mn: commentText }
    };

    // Update dynamicPosts array reactively
    const updatedPosts = dynamicPosts.map(p => {
      if (p.id === selectedPost.id) {
        return {
          ...p,
          comments: [...p.comments, newComment]
        };
      }
      return p;
    });

    setDynamicPosts(updatedPosts);
    if (typeof window !== "undefined") {
      localStorage.setItem("gcu-community-posts", JSON.stringify(updatedPosts));
    }

    // Sync selected post to reflect immediately in drawer view
    const currentUpdated = updatedPosts.find(p => p.id === selectedPost.id);
    if (currentUpdated) {
      setSelectedPost(currentUpdated);
    }

    setCommentText("");
    setCommenterName("");
  };

  const filteredPosts = dynamicPosts.filter(post => {
    const postTitle = post.title[lang as "ko" | "en" | "vn" | "mn"] || post.title.ko;
    const postBody = post.body[lang as "ko" | "en" | "vn" | "mn"] || post.body.ko;

    const matchesBoard = activeBoard === "all" || post.board === activeBoard;
    const matchesSearch = postTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          postBody.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBoard && matchesSearch;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      {/* Visual Header */}
      <section className="glass-panel" style={{ padding: "40px", background: "linear-gradient(135deg, rgba(33, 64, 154, 0.25) 0%, rgba(255, 222, 0, 0.05) 100%)" }}>
        <h1 className="hero-title" style={{ fontSize: "2.25rem", marginBottom: "16px" }}>{tComm.pageTitle}</h1>
        <p className="hero-desc" style={{ marginBottom: 0, fontSize: "1rem" }}>
          {tComm.pageDesc}
        </p>
      </section>

      {/* Board Switch Tabs */}
      <div className="comm-board-tabs" style={{ marginBottom: "10px" }}>
        <button 
          onClick={() => setActiveBoard("all")} 
          className={`comm-tab-btn ${activeBoard === "all" ? "active" : ""}`}
        >
          {tComm.tabAll}
        </button>
        <button 
          onClick={() => setActiveBoard("free")} 
          className={`comm-tab-btn ${activeBoard === "free" ? "active" : ""}`}
        >
          {tComm.tabFree}
        </button>
        <button 
          onClick={() => setActiveBoard("groups")} 
          className={`comm-tab-btn ${activeBoard === "groups" ? "active" : ""}`}
        >
          {tComm.tabGroups}
        </button>
        <button 
          onClick={() => setActiveBoard("reviews")} 
          className={`comm-tab-btn ${activeBoard === "reviews" ? "active" : ""}`}
        >
          {tComm.tabReviews}
        </button>
      </div>

      <div className="comm-layout">
        {/* Left Side: Post feeds */}
        <div>
          {/* Board Search */}
          <div className="search-container" style={{ marginBottom: "32px" }}>
            <div className="search-input-wrapper">
              <input 
                type="text" 
                placeholder={tComm.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon-svg">🔍</span>
            </div>
          </div>

          {/* Posts List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => {
                const postLang = getCardLang(post.id);
                const postTitle = post.title[postLang] || post.title.ko;
                const postBody = post.body[postLang] || post.body.ko;
                const postTime = typeof post.time === "string" ? post.time : (post.time[postLang] || post.time.ko);

                return (
                  <div 
                    key={post.id} 
                    onClick={() => handleOpenPost(post)}
                    className="post-card glass-panel"
                  >
                    <div className="post-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span className="post-country-badge">{post.country}</span>
                        <span className="post-author">{post.author}</span>
                        <span className="post-time">{postTime}</span>
                      </div>
                      
                      {/* Card translation selector */}
                      <div className="card-translate-selector" style={{ display: "flex", gap: "4px" }} onClick={(e) => e.stopPropagation()}>
                        {(["ko", "en", "vn", "mn"] as const).map((l) => {
                          const flags = { ko: "🇰🇷", en: "🇺🇸", vn: "🇻🇳", mn: "🇲🇳" };
                          const isActive = postLang === l;
                          return (
                            <button
                              key={l}
                              onClick={() => {
                                setCardLangs(prev => ({ ...prev, [post.id]: l }));
                              }}
                              style={{
                                background: isActive ? "rgba(255, 222, 0, 0.2)" : "rgba(255, 255, 255, 0.05)",
                                border: isActive ? "1px solid var(--accent-color, #ffde00)" : "1px solid rgba(255, 255, 255, 0.1)",
                                borderRadius: "4px",
                                padding: "2px 6px",
                                fontSize: "0.85rem",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "2px",
                                transition: "all 0.2s ease"
                              }}
                              title={l.toUpperCase()}
                            >
                              <span>{flags[l]}</span>
                              <span style={{ fontSize: "0.65rem", fontWeight: isActive ? "bold" : "normal", color: isActive ? "#ffde00" : "var(--text-secondary)" }}>
                                {l.toUpperCase()}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <h3 className="post-title">{postTitle}</h3>
                    <p className="post-body-preview">{postBody}</p>
                    
                    <div className="post-footer">
                      <span className="post-footer-item"><span className="post-footer-icon">👁</span> {post.views} {tComm.viewsLabel}</span>
                      <span className="post-footer-item"><span className="post-footer-icon">♥</span> {post.likes} {tComm.likesLabel}</span>
                      <span className="post-footer-item"><span className="post-footer-icon">💬</span> {post.comments.length} {tComm.commentsLabel}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="glass-panel" style={{ padding: "60px", textAlign: "center", color: "var(--text-secondary)" }}>
                {tComm.noPosts}
              </div>
            )}
          </div>
        </div>

        {/* Right Side Sidebar Widgets */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Active Gatherings stats */}
          <section className="glass-panel gathering-box">
            <h3 className="gathering-title">{tComm.hotTitle}</h3>
            <div className="gathering-list">
              <div onClick={() => { setSearchTerm("베트남"); setActiveBoard("all"); }} className="gathering-item">
                <div className="gathering-flag-group">
                  <span className="gathering-flag">🇻🇳</span>
                  <span className="gathering-name">{tComm.vnGathering}</span>
                </div>
                <span className="gathering-count">420{tComm.gatheringActive}</span>
              </div>
              <div onClick={() => { setSearchTerm("몽골"); setActiveBoard("all"); }} className="gathering-item">
                <div className="gathering-flag-group">
                  <span className="gathering-flag">🇲🇳</span>
                  <span className="gathering-name">{tComm.mnGathering}</span>
                </div>
                <span className="gathering-count">310{tComm.gatheringActive}</span>
              </div>
              <div onClick={() => { setSearchTerm("네팔"); setActiveBoard("all"); }} className="gathering-item">
                <div className="gathering-flag-group">
                  <span className="gathering-flag">🇳🇵</span>
                  <span className="gathering-name">{tComm.npGathering}</span>
                </div>
                <span className="gathering-count">190{tComm.gatheringActive}</span>
              </div>
              <div onClick={() => { setSearchTerm("우즈벡"); setActiveBoard("all"); }} className="gathering-item">
                <div className="gathering-flag-group">
                  <span className="gathering-flag">🇺🇿</span>
                  <span className="gathering-name">{tComm.uzGathering}</span>
                </div>
                <span className="gathering-count">140{tComm.gatheringActive}</span>
              </div>
            </div>
          </section>

          {/* Quick Helpdesk Banner */}
          <section className="widget-banner glass-panel" style={{ background: "linear-gradient(135deg, rgba(247, 147, 30, 0.15) 0%, rgba(114, 191, 68, 0.1) 100%)", border: "1px solid rgba(247, 147, 30, 0.3)" }}>
            <div className="widget-banner-icon">🤝</div>
            <div className="widget-banner-title">{tComm.mentorTitle}</div>
            <p className="widget-banner-desc" style={{ fontSize: "0.8rem" }}>
              {tComm.mentorDesc}
            </p>
            <button onClick={() => alert(tComm.mentorAlert)} className="widget-banner-btn">
              {tComm.mentorBtn}
            </button>
          </section>
        </div>
      </div>

      {/* 5. Elegant Slide-Over Article Drawer Overlay */}
      {selectedPost && (
        <div className="drawer-backdrop" onClick={handleClosePost}>
          <div 
            className="drawer-content" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button className="drawer-close" onClick={handleClosePost}>{tComm.closeBtn}</button>

            {/* Post Details */}
            <div className="drawer-post-header">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <span className="post-country-badge" style={{ marginBottom: 0 }}>{selectedPost.country}</span>
                
                {/* Translator buttons inside drawer */}
                <div className="drawer-translate-selector" style={{ display: "flex", gap: "4px" }}>
                  {(["ko", "en", "vn", "mn"] as const).map((l) => {
                    const flags = { ko: "🇰🇷", en: "🇺🇸", vn: "🇻🇳", mn: "🇲🇳" };
                    const isActive = selectedPostLang === l;
                    return (
                      <button
                        key={l}
                        onClick={() => {
                          setCardLangs(prev => ({ ...prev, [selectedPost.id]: l }));
                        }}
                        style={{
                          background: isActive ? "rgba(255, 222, 0, 0.2)" : "rgba(255, 255, 255, 0.05)",
                          border: isActive ? "1px solid var(--accent-color, #ffde00)" : "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: "4px",
                          padding: "4px 8px",
                          fontSize: "0.9rem",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          transition: "all 0.2s ease"
                        }}
                        title={l.toUpperCase()}
                      >
                        <span>{flags[l]}</span>
                        <span style={{ fontSize: "0.75rem", fontWeight: isActive ? "bold" : "normal", color: isActive ? "#ffde00" : "var(--text-secondary)" }}>
                          {l.toUpperCase()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <h2 className="drawer-post-title">{selectedPost.title[selectedPostLang] || selectedPost.title.ko}</h2>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", display: "flex", gap: "12px" }}>
                <span>{tComm.authorLabel}: <strong>{selectedPost.author}</strong></span>
                <span>•</span>
                <span>{tComm.viewsText}: {selectedPost.views}</span>
              </div>
            </div>

            <div className="drawer-post-body">
              {(selectedPost.body[selectedPostLang] || selectedPost.body.ko).split("\n").map((para: string, i: number) => (
                <p key={i} style={{ marginBottom: "16px" }}>{para}</p>
              ))}
            </div>

            {/* Comments Engine */}
            <div className="comments-section">
              <h3 className="comments-title">💬 {tComm.commentsTitle} ({selectedPost.comments.length})</h3>
              
              <div className="comments-list">
                {selectedPost.comments.map((comment: any) => {
                  const commentText = typeof comment.text === "string" ? comment.text : (comment.text[selectedPostLang] || comment.text.ko);
                  const commentTime = typeof comment.time === "string" ? comment.time : (comment.time[selectedPostLang] || comment.time.ko);

                  return (
                    <div key={comment.id} className="comment-item">
                      <div className="comment-header">
                        <span className="comment-author">{comment.author}</span>
                        <span className="comment-time">{commentTime}</span>
                      </div>
                      <div className="comment-body">{commentText}</div>
                    </div>
                  );
                })}
              </div>

              {/* Comment Submission Form */}
              <form onSubmit={handleAddComment} className="comment-form">
                <input 
                  type="text" 
                  placeholder={tComm.commenterPlaceholder}
                  value={commenterName}
                  onChange={(e) => setCommenterName(e.target.value)}
                  className="calc-select"
                  style={{ padding: "8px 12px", fontSize: "0.8rem", width: "50%", background: "var(--bg-input)", border: "1px solid var(--border-color)", color: "#fff", borderRadius: "6px" }}
                  required
                />
                <textarea 
                  placeholder={tComm.commentPlaceholder}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="comment-textarea"
                  required
                ></textarea>
                <button type="submit" className="btn-comment-submit">
                  {tComm.commentBtn}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
