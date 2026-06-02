"use client";

import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

// Mock job list matching K-Work integration specifications with dynamic translation maps
const MOCK_JOBS = [
  {
    id: 1,
    category: "trade",
    company: {
      ko: "(주)글로벌 테크 코리아",
      en: "Global Tech Korea Co., Ltd.",
      vn: "Công ty TNHH Global Tech Korea",
      mn: "Глобал Тех Кориа ХХК"
    },
    title: {
      ko: "해외 영업 지원 및 다국어(영어/베트남어) 기술 분석원",
      en: "Overseas Sales Support & Multilingual (English/Vietnamese) Tech Analyst",
      vn: "Hỗ trợ Kinh doanh Quốc tế & Nhà phân tích kỹ thuật đa ngôn ngữ (Anh/Việt)",
      mn: "Гадаад худалдааны дэмжлэг ба олон хэлний (Англи/Вьетнам) техникийн шинжээч"
    },
    location: {
      ko: "경기 안산시 (시화공단)",
      en: "Ansan, Gyeonggi (Sihwa Industrial Complex)",
      vn: "Ansan, Gyeonggi (KCN Sihwa)",
      mn: "Гёнги Ансан (Сихва аж үйлдвэрийн цогцолбор)"
    },
    salary: {
      ko: "월급 280만원 ~ 310만원",
      en: "2.8M ~ 3.1M KRW / month",
      vn: "2.8 ~ 3.1 triệu KRW / tháng",
      mn: "Сард 2.8 ~ 3.1 сая вон"
    },
    visa: {
      ko: "E-7 지원가능",
      en: "E-7 Sponsorship Available",
      vn: "Hỗ trợ Visa E-7",
      mn: "E-7 виз дэмжинэ"
    },
    isVerified: true
  },
  {
    id: 2,
    category: "manufacture",
    company: {
      ko: "서광정밀공업 (주)",
      en: "Seokwang Precision Industry Co., Ltd.",
      vn: "Công nghiệp cơ khí chính xác Seokwang",
      mn: "Согван Нарийн Машин Үйлдвэрлэл ХХК"
    },
    title: {
      ko: "반도체 정밀 기계부품 조립 및 모니터링 기능직",
      en: "Semiconductor Precision Machine Parts Assembly & Monitoring Technician",
      vn: "Nhân viên lắp ráp & giám sát linh kiện máy móc chính xác bán dẫn",
      mn: "Хагас дамжуулагчийн нарийн эд анги угсрах болон хянах техникч"
    },
    location: {
      ko: "충남 아산시",
      en: "Asan, Chungnam",
      vn: "Asan, Chungnam",
      mn: "Чүннам Асан"
    },
    salary: {
      ko: "연봉 3,400만원",
      en: "34M KRW / year",
      vn: "34 triệu KRW / năm",
      mn: "Жилд 34 сая вон"
    },
    visa: {
      ko: "F-2-R 가점추천",
      en: "F-2-R Priority Recommendation",
      vn: "Ưu tiên cấp Visa F-2-R",
      mn: "F-2-R виз нэмэлт оноо"
    },
    isVerified: true
  },
  {
    id: 3,
    category: "service",
    company: {
      ko: "(주)코리아 호텔앤리조트",
      en: "Korea Hotel & Resort Co., Ltd.",
      vn: "Khách sạn & Khu nghỉ dưỡng Korea",
      mn: "Кориа Зочид буудал ба Резорт ХХК"
    },
    title: {
      ko: "글로벌 VIP 컨시어지 서비스 및 외국어 번역 코디네이터",
      en: "Global VIP Concierge Service & Foreign Language Coordinator",
      vn: "Dịch vụ lễ tân VIP toàn cầu & Điều phối viên dịch thuật ngoại ngữ",
      mn: "Глобал VIP хүлээн авагч ба гадаад хэлний орчуулгын зохицуулагч"
    },
    location: {
      ko: "서울 중구",
      en: "Jung-gu, Seoul",
      vn: "Jung-gu, Seoul",
      mn: "Сөүл Жүн-гүү"
    },
    salary: {
      ko: "월급 250만원",
      en: "2.5M KRW / month",
      vn: "2.5 triệu KRW / tháng",
      mn: "Сард 2.5 сая вон"
    },
    visa: {
      ko: "E-7 지원가능",
      en: "E-7 Sponsorship Available",
      vn: "Hỗ trợ Visa E-7",
      mn: "E-7 виз дэмжинэ"
    },
    isVerified: false
  },
  {
    id: 4,
    category: "it",
    company: {
      ko: "넥스트소프트웨어 (주)",
      en: "Next Software Co., Ltd.",
      vn: "Công ty Cổ phần Next Software",
      mn: "Нэкст Софтвэйр ХХК"
    },
    title: {
      ko: "글로벌 웹 서비스 주니어 프론트엔드 개발자 (React/TS)",
      en: "Global Web Service Junior Frontend Developer (React/TS)",
      vn: "Lập trình viên Frontend Junior Web dịch vụ toàn cầu (React/TS)",
      mn: "Глобал вэб үйлчилгээний туслах Фронтэнд хөгжүүлэгч (React/TS)"
    },
    location: {
      ko: "서울 강남구",
      en: "Gangnam-gu, Seoul",
      vn: "Gangnam-gu, Seoul",
      mn: "Сөүл Гангнам-дүүрэг"
    },
    salary: {
      ko: "연봉 4,000만원",
      en: "40M KRW / year",
      vn: "40 triệu KRW / năm",
      mn: "Жилд 40 сая вон"
    },
    visa: {
      ko: "E-7 / F-2-R 가능",
      en: "E-7 / F-2-R Available",
      vn: "Có thể cấp E-7 / F-2-R",
      mn: "E-7 / F-2-R боломжтой"
    },
    isVerified: true
  },
  {
    id: 5,
    category: "manufacture",
    company: {
      ko: "다성 오토모티브",
      en: "Dasung Automotive",
      vn: "Dasung Automotive",
      mn: "Дасон Автомотив"
    },
    title: {
      ko: "자동차 내장부품 압출 프레스 보조 및 물류 사원",
      en: "Automotive Interior Parts Extrusion Press Assistant & Logistics Officer",
      vn: "Trợ lý máy ép đùn linh kiện nội thất ô tô & Nhân viên kho vận",
      mn: "Автомашины дотор эд анги шахах туслах ба Ложистикийн ажилтан"
    },
    location: {
      ko: "전북 익산시",
      en: "Iksan, Jeonbuk",
      vn: "Iksan, Jeonbuk",
      mn: "Жонбүг Игсан"
    },
    salary: {
      ko: "시급 10,500원",
      en: "10,500 KRW / hour",
      vn: "10.500 KRW / giờ",
      mn: "Цагийн 10,500 вон"
    },
    visa: {
      ko: "D-2 알바가능",
      en: "D-2 Part-time OK",
      vn: "Visa D-2 làm thêm OK",
      mn: "D-2 цагийн ажил боломжтой"
    },
    isVerified: false
  }
];

const LIFE_TRANSLATIONS: Record<"ko" | "en" | "vn" | "mn", {
  pageTitle: string;
  pageDesc: string;
  feedTitle: string;
  searchPlaceholder: string;
  tagAll: string;
  tagManuf: string;
  tagService: string;
  tagTrade: string;
  tagIt: string;
  jobDayMeta: string;
  kworkConfirm: string;
  noJobs: string;
  tracksTitle: string;
  trackD2Title: string;
  trackD2Desc: string;
  trackD10Title: string;
  trackD10Desc: string;
  trackE7Title: string;
  trackE7Desc: string;
  trackF2rTitle: string;
  trackF2rDesc: string;
  calcTitle: string;
  calcDesc: string;
  calcAgeLbl: string;
  calcAgeOpt1: string;
  calcAgeOpt2: string;
  calcAgeOpt3: string;
  calcLangLbl: string;
  calcLangOpt1: string;
  calcLangOpt2: string;
  calcLangOpt3: string;
  calcLangOpt4: string;
  calcDegLbl: string;
  calcDegOpt1: string;
  calcDegOpt2: string;
  calcDegOpt3: string;
  calcDegOpt4: string;
  calcJobLbl: string;
  calcJobOpt1: string;
  calcJobOpt2: string;
  calcJobOpt3: string;
  calcScoreLbl: string;
  calcEligiblePass: string;
  calcEligibleFail: string;
}> = {
  ko: {
    pageTitle: "취업 & 생활 정보",
    pageDesc: "한국고용정보원 K-Work 채용풀 연동을 통해 유학생 및 근로자 전용 맞춤 일자리를 상시 매칭합니다. 지역 특화형 비자(F-2-R) 승인을 위한 요건 모의계산도 즉시 수행해보세요.",
    feedTitle: "실시간 K-Work 채용 공고 연동 피드",
    searchPlaceholder: "회사명, 직무명, 업무 지역으로 검색하십시오...",
    tagAll: "전체",
    tagManuf: "⚙️ 제조업/생산",
    tagService: "🏨 서비스/관광",
    tagTrade: "🌐 무역/외국어",
    tagIt: "💻 IT/SW기술",
    jobDayMeta: "주 5일 근로 (탄력근무)",
    kworkConfirm: "정부 일자리 정보망 K-Work(k-work.or.kr)의 정식 상세 페이지로 연결하시겠습니까?",
    noJobs: "검색 조건에 부합하는 연동 일자리 정보가 존재하지 않습니다.",
    tracksTitle: "비자 취득 주요 추천 연계 트랙",
    trackD2Title: "유학 비자 (시간제 아르바이트 가능)",
    trackD2Desc: "정규 학위 이수 단계. 학사 승인 하 시간제 근로 최대 주 25시간 허용.",
    trackD10Title: "구직 비자 (인턴십 승인 지원)",
    trackD10Desc: "졸업 후 구직 활동기. 6개월 단위 갱신 최대 2년 체류하며 인턴 근무 지원.",
    trackE7Title: "전문인력 취업 비자",
    trackE7Desc: "정식 취업 확정 시 스폰서쉽 체결. 정식 주무 행정 부서 심사 대상.",
    trackF2rTitle: "지역 우수인재 정착 비자",
    trackF2rDesc: "지자체 추천서를 기반으로 인구감소 지역 내 장기 정착을 유도하는 특별비자.",
    calcTitle: "📊 F-2-R 추천자격 자가계산",
    calcDesc: "나이, 한국어 소양, 학위 및 취업 계약 여부 수치를 선택해 지자체 추천 조건 총합(기준값 60점) 달성 여부를 확인해 보십시오.",
    calcAgeLbl: "1. 신청 연령 기준",
    calcAgeOpt1: "만 18세 ~ 34세 (청년 최고배점: 15점)",
    calcAgeOpt2: "만 35세 ~ 44세 (우대배점: 10점)",
    calcAgeOpt3: "만 45세 이상 (기본배점: 5점)",
    calcLangLbl: "2. 한국어 능력 (TOPIK)",
    calcLangOpt1: "TOPIK 4급 또는 사회통합 4단계 이수 (20점)",
    calcLangOpt2: "TOPIK 3급 보유 (15점)",
    calcLangOpt3: "TOPIK 2급 또는 사회통합 2단계 (10점)",
    calcLangOpt4: "TOPIK 1급 또는 무보유 (5점)",
    calcDegLbl: "3. 국내 학위 수준",
    calcDegOpt1: "국내 4년제 학사 학위 이상 (20점)",
    calcDegOpt2: "전문학사 학위 보유 (15점)",
    calcDegOpt3: "글로벌사이버대 정규 졸업 예정자 (우대 10점)",
    calcDegOpt4: "고등학교 이하 졸업자 (기본 5점)",
    calcJobLbl: "4. 지역 지자체 근로 계약",
    calcJobOpt1: "기준 급여 충족 관내 정식 근로계약 완료 (25점)",
    calcJobOpt2: "조건부 매칭 연계 추천서 보유 (10점)",
    calcJobOpt3: "계약 또는 추천서 무보유 (0점)",
    calcScoreLbl: "자가 진단 총 배점",
    calcEligiblePass: "✓ 추천 승인 충족 (60점 돌파) - GCU 지원서 정식 매칭 신청 가능",
    calcEligibleFail: "✗ 60점 미만 (보완 요망) - TOPIK 특강 및 관내 취업 매칭 상담 필요"
  },
  en: {
    pageTitle: "Jobs & Lifestyle Info",
    pageDesc: "Through K-Work job pool synchronization, we match customized job vacancies for international students and workers. Calculate your points for regional F-2-R visa recommendation.",
    feedTitle: "Real-time K-Work Job Vacancy Feed",
    searchPlaceholder: "Search by company name, job, or region...",
    tagAll: "All",
    tagManuf: "⚙️ Manufacturing/Production",
    tagService: "🏨 Service/Tourism",
    tagTrade: "🌐 Trade/Foreign Lang",
    tagIt: "💻 IT/SW Technology",
    jobDayMeta: "5 Days / Week (Flexible hours)",
    kworkConfirm: "Would you like to navigate to the official detail page of government job portal K-Work (k-work.or.kr)?",
    noJobs: "No matched job listings found for the current search criteria.",
    tracksTitle: "Key Recommended Visa Track Pipelines",
    trackD2Title: "Student Visa (Part-time Job OK)",
    trackD2Desc: "Regular degree course. Part-time job allowed up to 25 hours per week under school authorization.",
    trackD10Title: "Job Seeking Visa (Internship Support)",
    trackD10Desc: "Post-graduation job search. Valid for up to 2 years with 6-month extensions. Internships supported.",
    trackE7Title: "Professional Worker Visa",
    trackE7Desc: "Sponsorship contract signed upon official employment. Subject to formal ministry screening.",
    trackF2rTitle: "Regional Talent Settlement Visa",
    trackF2rDesc: "Special visa encouraging long-term settlement in depopulating areas based on local recommendations.",
    calcTitle: "📊 F-2-R Points Self-Calculator",
    calcDesc: "Choose your parameters for age, Korean language, degrees, and employment contracts to check if you meet the 60-point criteria.",
    calcAgeLbl: "1. Age Criteria",
    calcAgeOpt1: "Age 18 ~ 34 (Youth Max Score: 15 pts)",
    calcAgeOpt2: "Age 35 ~ 44 (Priority Score: 10 pts)",
    calcAgeOpt3: "Age 45 or older (Basic Score: 5 pts)",
    calcLangLbl: "2. Korean Language (TOPIK)",
    calcLangOpt1: "TOPIK Level 4 or KIIP Stage 4 completed (20 pts)",
    calcLangOpt2: "TOPIK Level 3 held (15 pts)",
    calcLangOpt3: "TOPIK Level 2 or KIIP Stage 2 completed (10 pts)",
    calcLangOpt4: "TOPIK Level 1 or None (5 pts)",
    calcDegLbl: "3. Domestic Degree / Education",
    calcDegOpt1: "Domestic 4-year Bachelor's or higher (20 pts)",
    calcDegOpt2: "Associate Degree held (15 pts)",
    calcDegOpt3: "GCU expected graduates (Priority 10 pts)",
    calcDegOpt4: "High school graduate or below (Basic 5 pts)",
    calcJobLbl: "4. Regional Employment Contract",
    calcJobOpt1: "Completed official contract meeting wage threshold (25 pts)",
    calcJobOpt2: "Conditional matching visa recommendation held (10 pts)",
    calcJobOpt3: "No contract or recommendation letter held (0 pts)",
    calcScoreLbl: "Total Self-Diagnosis Points",
    calcEligiblePass: "✓ Eligible for Recommendation (60+ points) - Official GCU support application available",
    calcEligibleFail: "✗ Under 60 points (Needs improvement) - TOPIK prep & jobs consultation needed"
  },
  vn: {
    pageTitle: "Việc làm & Đời sống",
    pageDesc: "Thông qua đồng bộ K-Work, chúng tôi thường xuyên giới thiệu các vị trí tuyển dụng phù hợp cho du học sinh và lao động. Tính điểm mô phỏng điều kiện cấp Visa cư trú F-2-R ngay lập tức.",
    feedTitle: "Bảng tin Tuyển dụng K-Work thời gian thực",
    searchPlaceholder: "Tìm kiếm theo tên công ty, công việc hoặc khu vực...",
    tagAll: "Tất cả",
    tagManuf: "⚙️ Chế tạo / Sản xuất",
    tagService: "🏨 Dịch vụ / Du lịch",
    tagTrade: "🌐 Thương mại / Ngoại ngữ",
    tagIt: "💻 Kỹ thuật IT / SW",
    jobDayMeta: "Làm việc 5 ngày / tuần (Giờ linh hoạt)",
    kworkConfirm: "Bạn có muốn chuyển tiếp sang trang thông tin chi tiết chính thức của Cổng thông tin K-Work chính phủ (k-work.or.kr) không?",
    noJobs: "Không có thông tin việc làm phù hợp với điều kiện tìm kiếm hiện tại.",
    tracksTitle: "Các kênh định hướng chuyển đổi Visa chính",
    trackD2Title: "Visa Du học (Có thể làm thêm giờ)",
    trackD2Desc: "Giai đoạn học văn bằng chính quy. Cho phép làm thêm tối đa 25 giờ/tuần dưới sự chấp thuận của trường.",
    trackD10Title: "Visa tìm việc (Hỗ trợ thực tập)",
    trackD10Desc: "Giai đoạn tìm việc sau khi tốt nghiệp. Gia hạn mỗi 6 tháng, cư trú tối đa 2 năm và hỗ trợ thực tập.",
    trackE7Title: "Visa Kỹ sư chuyên môn",
    trackE7Desc: "Ký hợp đồng bảo lãnh (sponsorship) khi được nhận chính thức. Thuộc diện thẩm định hồ sơ của Bộ Tư pháp.",
    trackF2rTitle: "Visa Cư trú nhân tài khu vực",
    trackF2rDesc: "Visa đặc biệt dựa trên thư giới thiệu của địa phương nhằm khuyến khích định cư lâu dài tại khu vực giảm thiểu dân số.",
    calcTitle: "📊 Tự tính điểm Thẩm định Visa F-2-R",
    calcDesc: "Chọn các thông số về độ tuổi, năng lực tiếng Hàn, học vị và hợp đồng để tự đối chiếu với ngưỡng xét duyệt (tối thiểu 60 điểm).",
    calcAgeLbl: "1. Tiêu chí độ tuổi",
    calcAgeOpt1: "Từ 18 ~ 34 tuổi (Điểm tối đa thanh niên: 15 điểm)",
    calcAgeOpt2: "Từ 35 ~ 44 tuổi (Điểm ưu tiên: 10 điểm)",
    calcAgeOpt3: "Từ 45 tuổi trở lên (Điểm cơ bản: 5 điểm)",
    calcLangLbl: "2. Năng lực tiếng Hàn (TOPIK)",
    calcLangOpt1: "TOPIK Cấp 4 hoặc hoàn thành lớp KIIP Lớp 4 (20 điểm)",
    calcLangOpt2: "Có bằng TOPIK Cấp 3 (15 điểm)",
    calcLangOpt3: "TOPIK Cấp 2 hoặc hoàn thành lớp KIIP Lớp 2 (10 điểm)",
    calcLangOpt4: "TOPIK Cấp 1 hoặc không có bằng (5 điểm)",
    calcDegLbl: "3. Học vị hoàn thành tại Hàn",
    calcDegOpt1: "Đại học 4 năm trở lên tại Hàn (20 điểm)",
    calcDegOpt2: "Có bằng cao đẳng (15 điểm)",
    calcDegOpt3: "Sắp tốt nghiệp ĐH Global Cyber (Ưu tiên 10 điểm)",
    calcDegOpt4: "Tốt nghiệp THPT trở xuống (Cơ bản 5 điểm)",
    calcJobLbl: "4. Hợp đồng lao động với địa phương",
    calcJobOpt1: "Đã hoàn thành hợp đồng lao động đạt tiêu chuẩn lương (25 điểm)",
    calcJobOpt2: "Có thư giới thiệu liên kết việc làm có điều kiện (10 điểm)",
    calcJobOpt3: "Chưa có hợp đồng hoặc thư giới thiệu (0 điểm)",
    calcScoreLbl: "Tổng điểm tự đánh giá",
    calcEligiblePass: "✓ Đủ tiêu chuẩn đề xuất (Vượt 60 điểm) - Có thể nộp hồ sơ xin thư giới thiệu GCU chính thức",
    calcEligibleFail: "✗ Dưới 60 điểm (Cần bổ sung) - Cần tham gia lớp TOPIK & tư vấn kết nối việc làm",
  },
  mn: {
    pageTitle: "Ажил эрхлэлт & Амьдрал",
    pageDesc: "K-Work ажлын байрны сүлжээний тусламжтай гадаад оюутан, ажилчдад тохирсон ажлын байрыг тогтмол зуучилна. F-2-R визний онооны шалгуурыг өөрөө тооцож үзээрэй.",
    feedTitle: "Бодит цагийн K-Work ажлын байрны зар",
    searchPlaceholder: "Компани, албан тушаал, бүс нутгаар хайх...",
    tagAll: "Бүгд",
    tagManuf: "⚙️ Үйлдвэрлэл/Барилга",
    tagService: "🏨 Үйлчилгээ/Аялал жуулчлал",
    tagTrade: "🌐 Гадаад худалдаа/Хэл",
    tagIt: "💻 IT/Мэдээллийн технологи",
    jobDayMeta: "Ажлын 5 өдөр (Уян хатан цаг)",
    kworkConfirm: "Засгийн газрын K-Work (k-work.or.kr) ажлын байрны албан ёсны дэлгэрэнгүй хуудас руу шилжих үү?",
    noJobs: "Хайлтын нөхцөлд тохирсон ажлын байр байхгүй байна.",
    tracksTitle: "Виз авах гол санал болгох замууд",
    trackD2Title: "Оюутны виз (Цагийн ажил хийх боломжтой)",
    trackD2Desc: "Үндсэн зэргийн сургалт. Сургуулийн зөвшөөрлөор долоо хоногт хамгийн ихдээ 25 цаг ажиллана.",
    trackD10Title: "Ажил хайх виз (Дадлага хийх дэмжлэг)",
    trackD10Desc: "Төгссөний дараа ажил хайх хугацаа. 6 сараар сунгаж хамгийн ихдээ 2 жил байх бөгөөд дадлагыг дэмжинэ.",
    trackE7Title: "Мэргэжлийн ажилчны виз",
    trackE7Desc: "Албан ёсоор ажилд орох үед байгууллагын батлан даалт. Хууль зүйн яамны албан ёсны шалгалт.",
    trackF2rTitle: "Орон нутгийн шилдэг боловсон хүчний виз",
    trackF2rDesc: "Хүн ам цөөрч буй бүс нутагт урт хугацаагаар суурьшуулах зорилгоор орон нутгаас олгох тусгай виз.",
    calcTitle: "📊 F-2-R Визний онооны өөрийн тооцоолуур",
    calcDesc: "Нас, солонгос хэлний түвшин, боловсрол, ажилд орсон байдлаа сонгон визний шалгуур (60 оноо) хангаж буйгаа шалгана уу.",
    calcAgeLbl: "1. Насны шалгуур",
    calcAgeOpt1: "18-аас 34 нас хүртэл (Залуучуудын дээд оноо: 15 оноо)",
    calcAgeOpt2: "35-аас 44 нас хүртэл (Давуу оноо: 10 оноо)",
    calcAgeOpt3: "45-аас дээш нас (Үндсэн оноо: 5 оноо)",
    calcLangLbl: "2. Солонгос хэлний түвшин (TOPIK)",
    calcLangOpt1: "TOPIK 4-р зэрэг эсвэл KIIP 4-р шат (20 оноо)",
    calcLangOpt2: "TOPIK 3-р зэрэгтэй (15 оноо)",
    calcLangOpt3: "TOPIK 2-р зэрэг эсвэл KIIP 2-р шат (10 оноо)",
    calcLangOpt4: "TOPIK 1-р зэрэг эсвэл түвшингүй (5 оноо)",
    calcDegLbl: "3. Солонгост авсан боловсролын зэрэг",
    calcDegOpt1: "Солонгост 4 жилээс дээш бакалавр хамгаалсан (20 оноо)",
    calcDegOpt2: "Мэргэжлийн дипломтой (15 оноо)",
    calcDegOpt3: "Глобал Сайбер Их Сургууль төгсөх оюутан (Давуу оноо: 10 оноо)",
    calcDegOpt4: "Бүрэн дундаас доош боловсролтой (Үндсэн оноо: 5 оноо)",
    calcJobLbl: "4. Орон нутгийн ажлын гэрээ",
    calcJobOpt1: "Цалингийн шаардлага хангасан ажлын гэрээ хийсэн (25 оноо)",
    calcJobOpt2: "Нөхцөлтэй ажлын байр зуучлалын тодорхойлолттой (10 оноо)",
    calcJobOpt3: "Гэрээ эсвэл тодорхойлолт байхгүй (0 оноо)",
    calcScoreLbl: "Өөрийн онооны нийлбэр",
    calcEligiblePass: "✓ Шалгуур хангасан (60-аас дээш) - GCU тодорхойлолт хүсэх өргөдөл илгээх боломжтой",
    calcEligibleFail: "✗ 60-аас доош (Оноо дутуу) - TOPIK бэлтгэл ба ажил зуучлалын зөвлөгөө шаардлагатай"
  }
};

export default function LifePage() {
  const { lang } = useLanguage();
  const tLife = LIFE_TRANSLATIONS[lang as "ko" | "en" | "vn" | "mn"] || LIFE_TRANSLATIONS.ko;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Calculator states
  const [agePoint, setAgePoint] = useState(15);
  const [langPoint, setLangPoint] = useState(10);
  const [degreePoint, setDegreePoint] = useState(10);
  const [jobMatch, setJobMatch] = useState(25);

  // Restore calculator values on mount
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const age = localStorage.getItem("gcu-age-point");
      const langVal = localStorage.getItem("gcu-lang-point");
      const degree = localStorage.getItem("gcu-degree-point");
      const job = localStorage.getItem("gcu-job-match");
      if (age) setAgePoint(Number(age));
      if (langVal) setLangPoint(Number(langVal));
      if (degree) setDegreePoint(Number(degree));
      if (job) setJobMatch(Number(job));
    }
  }, []);

  const filteredJobs = MOCK_JOBS.filter(job => {
    const jobTitle = job.title[lang as "ko" | "en" | "vn" | "mn"] || job.title.ko;
    const jobCompany = job.company[lang as "ko" | "en" | "vn" | "mn"] || job.company.ko;
    const jobLocation = job.location[lang as "ko" | "en" | "vn" | "mn"] || job.location.ko;

    const matchesSearch = jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          jobCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          jobLocation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPoints = agePoint + langPoint + degreePoint + jobMatch;
  const isEligible = totalPoints >= 60;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      {/* Visual Header */}
      <section className="glass-panel" style={{ padding: "40px", background: "linear-gradient(135deg, var(--gcu-orange-rgb), rgba(33, 64, 154, 0.05) 100%)" }}>
        <h1 className="hero-title" style={{ fontSize: "2.25rem", marginBottom: "16px" }}>{tLife.pageTitle}</h1>
        <p className="hero-desc" style={{ marginBottom: 0, fontSize: "1rem" }}>
          {tLife.pageDesc}
        </p>
      </section>

      <div className="life-layout">
        {/* Left Side: Real-time job search linked to K-Work */}
        <div>
          <div className="section-header" style={{ marginBottom: "20px" }}>
            <div className="section-title">
              <span className="section-title-dot"></span>
              <h2>{tLife.feedTitle}</h2>
            </div>
          </div>

          {/* Search Box */}
          <div className="search-container">
            <div className="search-input-wrapper">
              <input 
                type="text" 
                placeholder={tLife.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon-svg">🔍</span>
            </div>
          </div>

          {/* Filter Tags */}
          <div className="filter-tags">
            <button 
              onClick={() => setSelectedCategory("all")} 
              className={`filter-tag-btn ${selectedCategory === "all" ? "active" : ""}`}
            >
              {tLife.tagAll}
            </button>
            <button 
              onClick={() => setSelectedCategory("manufacture")} 
              className={`filter-tag-btn ${selectedCategory === "manufacture" ? "active" : ""}`}
            >
              {tLife.tagManuf}
            </button>
            <button 
              onClick={() => setSelectedCategory("service")} 
              className={`filter-tag-btn ${selectedCategory === "service" ? "active" : ""}`}
            >
              {tLife.tagService}
            </button>
            <button 
              onClick={() => setSelectedCategory("trade")} 
              className={`filter-tag-btn ${selectedCategory === "trade" ? "active" : ""}`}
            >
              {tLife.tagTrade}
            </button>
            <button 
              onClick={() => setSelectedCategory("it")} 
              className={`filter-tag-btn ${selectedCategory === "it" ? "active" : ""}`}
            >
              {tLife.tagIt}
            </button>
          </div>

          {/* Job Vacancy Cards */}
          <div className="jobs-list">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => {
                const jobTitle = job.title[lang as "ko" | "en" | "vn" | "mn"] || job.title.ko;
                const jobCompany = job.company[lang as "ko" | "en" | "vn" | "mn"] || job.company.ko;
                const jobLocation = job.location[lang as "ko" | "en" | "vn" | "mn"] || job.location.ko;
                const jobSalary = job.salary[lang as "ko" | "en" | "vn" | "mn"] || job.salary.ko;
                const jobVisa = job.visa[lang as "ko" | "en" | "vn" | "mn"] || job.visa.ko;

                return (
                  <div key={job.id} className="job-card glass-panel">
                    <div className="job-card-header">
                      <span className="job-company">{jobCompany}</span>
                      <span className={`job-visa-badge ${job.isVerified ? "verified" : ""}`}>
                        {jobVisa}
                      </span>
                    </div>
                    <div className="job-title">{jobTitle}</div>
                    
                    <div className="job-meta-grid">
                      <div className="job-meta-item">📍 {jobLocation}</div>
                      <div className="job-meta-item">💰 {jobSalary}</div>
                      <div className="job-meta-item">📅 {tLife.jobDayMeta}</div>
                    </div>

                    {/* K-Work Logo Arrow Indicator representing integration link */}
                    <a 
                      href="https://k-work.or.kr/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="job-kwork-link"
                      title="K-Work Link"
                      onClick={(e) => {
                        if (!confirm(tLife.kworkConfirm)) {
                          e.preventDefault();
                        }
                      }}
                    >
                      ↗
                    </a>
                  </div>
                );
              })
            ) : (
              <div className="glass-panel" style={{ padding: "40px", textAlign: "center", color: "var(--text-secondary)" }}>
                {tLife.noJobs}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Visa Tracks & F-2-R Calculator */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Visa Track Info */}
          <section className="glass-panel visa-track-box">
            <h3 className="visa-track-title">
              <span>🛡️</span> {tLife.tracksTitle}
            </h3>
            <div className="visa-track-list">
              <div className="visa-track-item">
                <div className="visa-track-code">D-2</div>
                <div className="visa-track-info">
                  <span className="visa-track-name">{tLife.trackD2Title}</span>
                  <p className="visa-track-desc">{tLife.trackD2Desc}</p>
                </div>
              </div>
              <div className="visa-track-item">
                <div className="visa-track-code">D-10</div>
                <div className="visa-track-info">
                  <span className="visa-track-name">{tLife.trackD10Title}</span>
                  <p className="visa-track-desc">{tLife.trackD10Desc}</p>
                </div>
              </div>
              <div className="visa-track-item">
                <div className="visa-track-code">E-7</div>
                <div className="visa-track-info">
                  <span className="visa-track-name">{tLife.trackE7Title}</span>
                  <p className="visa-track-desc">{tLife.trackE7Desc}</p>
                </div>
              </div>
              <div className="visa-track-item">
                <div className="visa-track-code">F-2-R</div>
                <div className="visa-track-info">
                  <span className="visa-track-name">{tLife.trackF2rTitle}</span>
                  <p className="visa-track-desc">{tLife.trackF2rDesc}</p>
                </div>
              </div>
            </div>
          </section>

          {/* F-2-R Points Self Calculator Widget */}
          <section className="glass-panel calc-box">
            <h3 className="calc-title">{tLife.calcTitle}</h3>
            <p className="calc-desc">
              {tLife.calcDesc}
            </p>

            <div className="calc-section">
              {/* Age select */}
              <div className="calc-group">
                <label className="calc-label">{tLife.calcAgeLbl}</label>
                <select 
                  value={agePoint} 
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setAgePoint(val);
                    if (typeof window !== "undefined") {
                      localStorage.setItem("gcu-age-point", String(val));
                    }
                  }}
                  className="calc-select"
                >
                  <option value={15}>{tLife.calcAgeOpt1}</option>
                  <option value={10}>{tLife.calcAgeOpt2}</option>
                  <option value={5}>{tLife.calcAgeOpt3}</option>
                </select>
              </div>

              {/* TOPIK select */}
              <div className="calc-group">
                <label className="calc-label">{tLife.calcLangLbl}</label>
                <select 
                  value={langPoint} 
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setLangPoint(val);
                    if (typeof window !== "undefined") {
                      localStorage.setItem("gcu-lang-point", String(val));
                    }
                  }}
                  className="calc-select"
                >
                  <option value={20}>{tLife.calcLangOpt1}</option>
                  <option value={15}>{tLife.calcLangOpt2}</option>
                  <option value={10}>{tLife.calcLangOpt3}</option>
                  <option value={5}>{tLife.calcLangOpt4}</option>
                </select>
              </div>

              {/* Korean Degree select */}
              <div className="calc-group">
                <label className="calc-label">{tLife.calcDegLbl}</label>
                <select 
                  value={degreePoint} 
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setDegreePoint(val);
                    if (typeof window !== "undefined") {
                      localStorage.setItem("gcu-degree-point", String(val));
                    }
                  }}
                  className="calc-select"
                >
                  <option value={20}>{tLife.calcDegOpt1}</option>
                  <option value={15}>{tLife.calcDegOpt2}</option>
                  <option value={10}>{tLife.calcDegOpt3}</option>
                  <option value={5}>{tLife.calcDegOpt4}</option>
                </select>
              </div>

              {/* Job Match Contract select */}
              <div className="calc-group">
                <label className="calc-label">{tLife.calcJobLbl}</label>
                <select 
                  value={jobMatch} 
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setJobMatch(val);
                    if (typeof window !== "undefined") {
                      localStorage.setItem("gcu-job-match", String(val));
                    }
                  }}
                  className="calc-select"
                >
                  <option value={25}>{tLife.calcJobOpt1}</option>
                  <option value={10}>{tLife.calcJobOpt2}</option>
                  <option value={0}>{tLife.calcJobOpt3}</option>
                </select>
              </div>
            </div>

            {/* Results Panel */}
            <div className="calc-result-panel">
              <span className="calc-score-lbl">{tLife.calcScoreLbl}</span>
              <span className="calc-score-val">{totalPoints}점</span>
            </div>

            {/* Threshold check indicator */}
            {isEligible ? (
              <div className="calc-status pass">
                {tLife.calcEligiblePass}
              </div>
            ) : (
              <div className="calc-status fail">
                {tLife.calcEligibleFail}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
