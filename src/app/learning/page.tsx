"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

// Mock courses data with full translation support
const COURSES = [
  {
    id: 1,
    level: {
      ko: "초급 (TOPIK I)",
      en: "Beginner (TOPIK I)",
      vn: "Sơ cấp (TOPIK I)",
      mn: "Анхан шат (TOPIK I)"
    },
    title: {
      ko: "비즈니스 기초 한국어 회화",
      en: "Basic Business Korean Conversation",
      vn: "Hội thoại tiếng Hàn thương mại cơ bản",
      mn: "Бизнесийн анхан шатны солонгос хэл"
    },
    lecturer: {
      ko: "김민아 교수",
      en: "Prof. Min-ah Kim",
      vn: "GS. Kim Min-ah",
      mn: "Проф. Ким Мин-А"
    },
    desc: {
      ko: "회사 입사 및 업무 미팅에서 필수적으로 주고받는 기본 회화 양식과 인사를 단계별로 학습합니다.",
      en: "Step-by-step learning of essential business greeting etiquette and conversation formats used in job entries and meetings.",
      vn: "Học từng bước về các quy tắc chào hỏi thương mại và hình thức hội thoại thiết yếu khi phỏng vấn xin việc và hội họp.",
      mn: "Ажилд орох болон бизнесийн уулзалтанд шаардлагатай харилцан ярианы үндсийг сурна."
    }
  },
  {
    id: 2,
    level: {
      ko: "초급 (TOPIK I)",
      en: "Beginner (TOPIK I)",
      vn: "Sơ cấp (TOPIK I)",
      mn: "Анхан шат (TOPIK I)"
    },
    title: {
      ko: "실생활 정착 밀착형 어휘",
      en: "Practical Daily Life Vocabulary",
      vn: "Từ vựng định cư đời sống thực tế",
      mn: "Амьдралд хэрэгцээт үг хэллэг"
    },
    lecturer: {
      ko: "박수진 강사",
      en: "Instructor Su-jin Park",
      vn: "Giảng viên Park Su-jin",
      mn: "Багш Пак Сү-Жин"
    },
    desc: {
      ko: "마트, 은행, 병원, 지하철 이용 등 한국 거주 시 즉각적으로 마주치는 실용 대화법과 명칭을 학습합니다.",
      en: "Learn practical dialogues and terms immediately encountered when living in Korea, such as using marts, banks, hospitals, and subways.",
      vn: "Học các cuộc hội thoại và thuật ngữ thực tế đối mặt ngay khi sinh sống tại Hàn Quốc như đi siêu thị, ngân hàng, bệnh viện, tàu điện ngầm.",
      mn: "Дэлгүүр, банк, эмнэлэг, метро зэрэг солонгост амьдрахад шууд тулгарах практик яриа болон нэршлийг сурна."
    }
  },
  {
    id: 3,
    level: {
      ko: "중급 (TOPIK II)",
      en: "Intermediate (TOPIK II)",
      vn: "Trung cấp (TOPIK II)",
      mn: "Дунд шат (TOPIK II)"
    },
    title: {
      ko: "TOPIK II 마스터 - 읽기/쓰기 집중반",
      en: "TOPIK II Master - Reading/Writing Intensive",
      vn: "Lớp chuyên sâu Đọc/Viết TOPIK II Master",
      mn: "TOPIK II Мастер - Унших/Бичих анги"
    },
    lecturer: {
      ko: "이태우 교수",
      en: "Prof. Tae-woo Lee",
      vn: "GS. Lee Tae-woo",
      mn: "Проф. Ли Тэ-Вү"
    },
    desc: {
      ko: "중급 취득을 위한 53번 원고지 서술형 작성 비법과 긴 지문의 논리적 요약 스킬을 고정 트레이닝합니다.",
      en: "Intensive training on manuscript writing secrets for Question 53 and logical summarization skills of long passages for intermediate targets.",
      vn: "Luyện tập chuyên sâu về bí quyết viết bài tự luận Câu 53 trên giấy kẻ ô và kỹ năng tóm tắt logic các đoạn văn dài cho mục tiêu trung cấp.",
      mn: "Дунд шатны зэрэг авахад чухал 53-р асуултын бичих нууц болон урт эхийн логик дүгнэлт хийх чадварт бэлтгэнэ."
    }
  },
  {
    id: 4,
    level: {
      ko: "고급 (TOPIK II)",
      en: "Advanced (TOPIK II)",
      vn: "Cao cấp (TOPIK II)",
      mn: "Ахисан шат (TOPIK II)"
    },
    title: {
      ko: "비즈니스 계약서 및 실무 이메일 작성",
      en: "Writing Business Contracts & Practical Emails",
      vn: "Viết hợp đồng thương mại & Email công việc",
      mn: "Бизнесийн гэрээ ба Мэргэжлийн и-мэйл бичих"
    },
    lecturer: {
      ko: "이지원 박사",
      en: "Dr. Ji-won Lee",
      vn: "TS. Lee Ji-won",
      mn: "Доктор Ли Жи-Вон"
    },
    desc: {
      ko: "고급 취업 근로자를 위한 격식체 비즈니스 서한문 양식과 공식 협약서 분석 및 독해 능력을 배양합니다.",
      en: "Cultivate formal business correspondence styles, official agreement analysis, and advanced reading comprehension for professional jobs.",
      vn: "Bồi dưỡng phong cách thư tín thương mại trang trọng, phân tích thỏa thuận chính thức và năng lực đọc hiểu nâng cao cho lao động chuyên môn.",
      mn: "Мэргэжлийн ажилчдад зориулсан бизнесийн албан бичгийн хэв маяг, албан ёсны гэрээний шинжилгээ, унших чадварыг сайжруулна."
    }
  }
];

// Mock TOPIK resource download hub files
const RESOURCES = [
  {
    id: 1,
    name: {
      ko: "제84회 TOPIK II 읽기 기출문제지 (PDF)",
      en: "84th TOPIK II Reading Past Exam Paper (PDF)",
      vn: "Đề thi Đọc thực tế TOPIK II lần thứ 84 (PDF)",
      mn: "84 дэх удаагийн TOPIK II Унших шалгалтын материал (PDF)"
    },
    type: {
      ko: "문항지",
      en: "Exam Paper",
      vn: "Đề thi",
      mn: "Асуултын хуудас"
    },
    size: "2.4 MB"
  },
  {
    id: 2,
    name: {
      ko: "제84회 TOPIK II 듣기 오디오 Mp3 파일 (ZIP)",
      en: "84th TOPIK II Listening Audio Mp3 Files (ZIP)",
      vn: "File âm thanh Nghe Mp3 TOPIK II lần thứ 84 (ZIP)",
      mn: "84 дэх удаагийн TOPIK II Сонсох аудио Mp3 файл (ZIP)"
    },
    type: {
      ko: "듣기음원",
      en: "Listening Audio",
      vn: "File nghe",
      mn: "Сонсох аудио"
    },
    size: "14.8 MB"
  },
  {
    id: 3,
    name: {
      ko: "글로벌사이버대 자체 제작 TOPIK 필수 빈출 어휘 1000제",
      en: "GCU Self-Produced TOPIK 1,000 Essential Vocabulary Book",
      vn: "Tuyển tập 1000 từ vựng TOPIK thiết yếu do GCU tự biên soạn",
      mn: "GCU-аас бэлтгэсэн TOPIK-д байнга ирдэг 1000 чухал үгсийн сан"
    },
    type: {
      ko: "학습자료",
      en: "Prep Material",
      vn: "Tài liệu học",
      mn: "Сурах материал"
    },
    size: "4.1 MB"
  },
  {
    id: 4,
    name: {
      ko: "외국인 근로자용 노무/노동 법률 용어 한글 대조집 (PDF)",
      en: "Labor/Employment Legal Terms Korean-Bilingual Reference for Foreign Workers (PDF)",
      vn: "Sổ tay tra cứu thuật ngữ pháp luật Lao động đối chiếu Hàn-Việt cho người lao động (PDF)",
      mn: "Гадаад ажилчдад зориулсан хөдөлмөрийн хуулийн үгсийн солонгос харьцуулалт (PDF)"
    },
    type: {
      ko: "법률자료",
      en: "Legal Reference",
      vn: "Tài liệu pháp luật",
      mn: "Хуулийн материал"
    },
    size: "1.8 MB"
  }
];

// Realistic interactive TOPIK mock questions with translation
const MOCK_QUESTIONS = [
  {
    id: 1,
    audioText: {
      ko: "📢 [듣기/읽기 통합 어법] 빈칸에 가장 알맞은 어법 양식을 고르십시오.",
      en: "📢 [Integration Grammar] Choose the grammar form that best fits the blank.",
      vn: "📢 [Ngữ pháp tích hợp Đọc/Nghe] Chọn mẫu ngữ pháp thích hợp nhất vào chỗ trống.",
      mn: "📢 [Хэлний дүрэм] Цэгүүдийн оронд хамгийн тохиромжтой хэлбэрийг сонгоно уу."
    },
    question: "Q1. 여기에 그림을 (        ) 안 됩니다. 미술관 규칙을 준수해 주십시오.",
    options: ["그리거나", "그려서", "그리면", "그리고"],
    correctIndex: 2,
    explanation: {
      ko: "'-면 안 되다'는 특정한 행동에 대한 금지나 제한 규칙을 나타낼 때 사용하는 한국어 표준 어법입니다.",
      en: "'-면 안 되다' is a standard Korean grammar structure used to indicate prohibition or restriction on a specific action.",
      vn: "'-면 안 되다' là cấu trúc ngữ pháp tiếng Hàn tiêu chuẩn dùng để biểu thị sự cấm đoán hoặc hạn chế đối với một hành động cụ thể.",
      mn: "'-면 안 되да' нь тодорхой үйлдлийг хориглох эсвэл хязгаарлахад ашигладаг солонгос хэлний стандарт дүрэм юм."
    }
  },
  {
    id: 2,
    audioText: {
      ko: "📢 [어휘 능력] 밑줄 친 부분과 의미가 가장 유사한 보기를 고르십시오.",
      en: "📢 [Vocabulary Ability] Choose the option with the meaning closest to the underlined part.",
      vn: "📢 [Năng lực từ vựng] Chọn phương án có nghĩa gần nhất với phần gạch chân.",
      mn: "📢 [Үгсийн сан] Доогуур нь зурсан хэсэгтэй хамгийн ойр утгатай хувилбарыг сонгоно уу."
    },
    question: "Q2. 이번 학기 시험은 열심히 학습한 덕분에 좋은 점수로 <u>합격했습니다</u>.",
    options: ["시험을 취소했습니다", "시험을 잘 보았습니다", "시험을 연기했습니다", "시험을 접수했습니다"],
    correctIndex: 1,
    explanation: {
      ko: "'합격하다'는 시험 통과를 의미하며, '시험을 잘 보다'와 실질적 맥락상 가장 유사한 표현입니다.",
      en: "'합격하다' means passing an exam, which is practically equivalent to the expression '시험을 잘 보다' (did well on the exam) in this context.",
      vn: "'합격하다' nghĩa là đỗ kỳ thi, là biểu hiện tương đồng nhất về mặt ngữ cảnh thực tế với '시험을 잘 보다' (làm bài thi tốt).",
      mn: "'합격하다' гэдэг нь шалгалтанд тэнцэхийг илэрхийлэх бөгөөд '시험을 잘 보다' (шалгалтыг сайн өгөх) гэсэн илэрхийлэлтэй утга дөхнө."
    }
  },
  {
    id: 3,
    audioText: {
      ko: "📢 [한국 생활 정책 상식] 빈칸에 적절한 법적 기한을 채우십시오.",
      en: "📢 [Korea Life Policy Common Sense] Fill in the appropriate legal time limit in the blank.",
      vn: "📢 [Kiến thức Thường thức đời sống Hàn Quốc] Điền thời hạn pháp lý thích hợp vào chỗ trống.",
      mn: "📢 [Солонгосын хуулийн мэдлэг] Цэгийн оронд тохирох хугацааг бөглөнө үү."
    },
    question: "Q3. 외국인 유학생 및 근로자는 한국 입국일로부터 (        ) 이내에 관할 관청에 외국인 등록증 신청을 완료해야 합니다.",
    options: ["30일", "60일", "90일", "180일"],
    correctIndex: 2,
    explanation: {
      ko: "법무부 출입국 정책상 한국에 90일을 초과하여 체류하려는 모든 외국인은 입국 후 90일 이내에 외국인등록을 마쳐야 합니다.",
      en: "According to the Ministry of Justice's immigration policy, all foreigners intending to stay in Korea for more than 90 days must complete foreign registration within 90 days of entry.",
      vn: "Theo chính sách xuất nhập cảnh của Bộ Tư pháp, tất cả người nước ngoài có ý định cư trú tại Hàn Quốc trên 90 ngày phải hoàn thành đăng ký ngoại kiều trong vòng 90 ngày kể từ ngày nhập cảnh.",
      mn: "Хууль зүйн яамны бодлогын дагуу Солонгост 90-ээс дээш хоногоор оршин суух бүх гадаад иргэн ирсэн өдрөөс хойш 90 хоногийн дотор гадаадын иргэний бүртгэлээ хийлгэх ёстой."
    }
  }
];

// Mock academic and site announcements
const ACADEMIC_NOTICES = [
  {
    id: 1,
    category: { ko: "학사", en: "Academics", vn: "Học vụ", mn: "Хичээл" },
    title: {
      ko: "[공지] 2026학년도 다문화 정착 스마트 장학생 최종 선발 및 무료 교재 배포일정",
      en: "[Notice] 2026 Multicultural Settlement Smart Scholar Selection & Free Material Distribution",
      vn: "[Thông báo] Tuyển chọn Học bổng Thông minh Định cư Đa văn hóa năm học 2026 & Lịch phát giáo trình miễn phí",
      mn: "[Зар] 2026 оны Олон соёлт гэр бүлийг дэмжих тэтгэлэг болон сурах бичиг тараах хуваарь"
    },
    date: "2026-06-02",
    desc: {
      ko: "글로벌 브릿지 사업 일환으로 한국어 전공 이수 외국인 학생 50명에 대한 장학금 지급 및 정착 필수 교안 1000부 배포 일정을 안내합니다.",
      en: "As part of the Global Bridge project, we announce the scholarship disbursement schedule for 50 foreign students majoring in Korean and the distribution of 1,000 essential settlement textbooks.",
      vn: "Là một phần của dự án Global Bridge, chúng tôi thông báo lịch trình cấp học bổng cho 50 học sinh nước ngoài chuyên ngành tiếng Hàn và phát hành 1000 tài liệu hướng dẫn định cư thiết yếu.",
      mn: "Глобал Бридж төслийн хүрээнд солонгос хэлний чиглэлээр суралцаж буй гадаадын 50 оюутанд тэтгэлэг олгох болон 1000 ширхэг гарын авлага тараах хуваарийг зарлаж байна."
    }
  },
  {
    id: 2,
    category: { ko: "교육", en: "Learning", vn: "Giáo dục", mn: "Сургалт" },
    title: {
      ko: "[안내] 외국인 유학생 대상 시간제 취업 허가(D-2) 대학 추천서 온라인 일괄 발급 시스템 연계 수칙",
      en: "[Guide] Guidelines for Online Batch Issuance System for Part-time Job Referral Letters (D-2)",
      vn: "[Hướng dẫn] Quy chế hoạt động cổng cấp Thư giới thiệu làm thêm trực tuyến hàng loạt cho du học sinh (D-2)",
      mn: "[Заавар] Гадаад оюутнуудад зориулсан цагийн ажил хийх зөвшөөрлийн (D-2) тодорхойлолт цахимаар авах журам"
    },
    date: "2026-05-30",
    desc: {
      ko: "유학생들의 합법적 아르바이트를 돕기 위해, 학점 요건 충족 시 학적처를 통해 지자체 제출용 추천서를 24시간 이내에 승인 발급하는 창구를 가동합니다.",
      en: "To help international students seek legal part-time jobs, we are operating a service to issue university recommendation letters for local submit within 24 hours if credit requirements are met.",
      vn: "Nhằm giúp du học sinh làm thêm hợp pháp, nhà trường vận hành cổng tiếp nhận duyệt cấp thư giới thiệu nộp cho chính quyền địa phương trong vòng 24 giờ khi đáp ứng đủ tiêu chuẩn tín chỉ.",
      mn: "Оюутнуудыг хууль ёсоор цагийн ажил хийхэд туслах зорилгоор сурлагын оноо хангасан тохиолдолд 24 цагийн дотор тодорхойлолт гаргах үйлчилгээ ажиллаж эхэллээ."
    }
  },
  {
    id: 3,
    category: { ko: "지원", en: "Support", vn: "Hỗ trợ", mn: "Тусламж" },
    title: {
      ko: "[매칭] 1:1 온라인 밀착 멘토링 프로그램 튜터 매핑 및 화상 강의실 오픈 가이드",
      en: "[Matching] 1:1 Online Close Mentoring Program Tutor Mapping & Video Classroom Open Guide",
      vn: "[Khớp đôi] Lớp học trực tuyến cố vấn 1:1 ghép đôi Tutors & Hướng dẫn truy cập phòng học video",
      mn: "[Холболт] 1:1 Онлайн зөвлөх хөтөлбөрийн багш холболт ба Цахим ангийн заавар"
    },
    date: "2026-05-25",
    desc: {
      ko: "주 1회 제공되는 GCU 정규 튜터와의 발음 교정 및 회화 코스를 위해 전산 강의실 연동 가이드를 아래에 첨부하오니 확인 바랍니다.",
      en: "Please check the attached digital classroom guide below to access the weekly pronunciation correction and conversation course with professional GCU tutors.",
      vn: "Vui lòng xem hướng dẫn truy cập lớp học số đính kèm bên dưới để tham gia khóa học giao tiếp và sửa phát âm 1 lần / tuần với cố vấn chính quy của GCU.",
      mn: "Долоо хоногт 1 удаа орох GCU-ийн үндсэн багштай яриа болон дуудлага засах хичээлд холбогдох зааврыг доор хавсаргасан тул шалгана уу."
    }
  }
];

// TOPIK Comprehensive Guide Translations for Multilingual Support
const TOPIK_GUIDE: Record<"ko" | "en" | "vn" | "mn", {
  guideTitle: string;
  guideDesc: string;
  overviewTitle: string;
  overviewTarget: string;
  overviewValidity: string;
  overviewPurpose: string;
  levelsTitle: string;
  level1Name: string;
  level1Desc: string;
  level1Detail: string;
  level2Name: string;
  level2Desc: string;
  level2Detail: string;
  timetableTitle: string;
  topik1TimeTitle: string;
  topik1TimeDetail: string;
  topik2TimeTitle: string;
  topik2TimeDetail: string;
  prepTitle: string;
  prepItems: string;
  prepFees: string;
  tableTitle: string;
}> = {
  ko: {
    guideTitle: "📋 TOPIK (한국어능력시험) 종합 공식 안내",
    guideDesc: "대한민국 교육부 국립국제교육원이 주관하는 공식 한국어 평가 시험(TOPIK)의 개요, 등급 기준 및 시간표를 상세 안내합니다.",
    overviewTitle: "🎯 1. 시험 개요 및 유효기간",
    overviewTarget: "• 평가 대상: 한국어를 모국어로 하지 않는 재외동포 및 외국인 유학생/근로자",
    overviewValidity: "• 성적 유효기간: 성적 발표일로부터 2년간 유효 (유효기간 경과 시 효력 상실)",
    overviewPurpose: "• 활용 범위: 국내 대학 학사 입학 및 장학 요건, E-7 취업 스폰서십, F-2-R 지역특화비자 심사 가점 요건",
    levelsTitle: "📊 2. 평가 등급 및 합격 기준",
    level1Name: "TOPIK I (초급)",
    level1Desc: "1급 (80점 이상) / 2급 (140점 이상)",
    level1Detail: "듣기(30문항), 읽기(40문항) - 총 200점 만점",
    level2Name: "TOPIK II (중·고급)",
    level2Desc: "3급 (120점) / 4급 (150점) / 5급 (190점) / 6급 (230점 이상)",
    level2Detail: "듣기(50문항), 쓰기(4문항), 읽기(50문항) - 총 300점 만점",
    timetableTitle: "⏰ 3. 시험 시간표 및 응시 규정",
    topik1TimeTitle: "TOPIK I (오전)",
    topik1TimeDetail: "입실 09:20까지 | 시험 시간: 10:00 ~ 11:40 (100분, 듣기/읽기 통합 교시)",
    topik2TimeTitle: "TOPIK II (오후)",
    topik2TimeDetail: "입실 12:20까지 | 1교시(듣기/쓰기): 13:00 ~ 14:50 (110분) | 2교시(읽기): 15:20 ~ 16:30 (70분)",
    prepTitle: "🎒 4. 필수 준비물 및 국내 응시료",
    prepItems: "• 필수 준비물: 규정 신분증(여권, 외국인등록증 원본), 수험표 원본, 컴퓨터용 사인펜",
    prepFees: "• 응시료 안내: TOPIK I: 40,000원 | TOPIK II: 55,000원 (국내 기준)",
    tableTitle: "📂 다운로드 가능한 기출문제 및 학습 자료실"
  },
  en: {
    guideTitle: "📋 TOPIK Official Exam Comprehensive Guide",
    guideDesc: "Official overview, grading standard criteria, and test schedules for the state-certified Korean proficiency test.",
    overviewTitle: "🎯 1. Exam Overview & Validity",
    overviewTarget: "• Eligibility: Overseas Koreans and foreigners whose native language is not Korean.",
    overviewValidity: "• Validity Period: Valid for 2 years from the date of score announcement.",
    overviewPurpose: "• Key Usage: University admissions, E-7 professional visa sponsorship, and F-2-R regional visa points.",
    levelsTitle: "📊 2. Grade Criteria & Level Benchmarks",
    level1Name: "TOPIK I (Beginner)",
    level1Desc: "Grade 1 (80+ points) / Grade 2 (140+ points)",
    level1Detail: "Listening (30 items), Reading (40 items) - Max 200 points",
    level2Name: "TOPIK II (Int/Adv)",
    level2Desc: "Grade 3 (120+), Grade 4 (150+), Grade 5 (190+), Grade 6 (230+ points)",
    level2Detail: "Listening (50), Writing (4), Reading (50 items) - Max 300 points",
    timetableTitle: "⏰ 3. Exam Timetables & Entry Rules",
    topik1TimeTitle: "TOPIK I (Morning)",
    topik1TimeDetail: "Enter by 09:20 | Exam Period: 10:00 - 11:40 (100 min, Listening/Reading combined)",
    topik2TimeTitle: "TOPIK II (Afternoon)",
    topik2TimeDetail: "Enter by 12:20 | Session 1 (Listening/Writing): 13:00 - 14:50 (110 min) | Session 2 (Reading): 15:20 - 16:30 (70 min)",
    prepTitle: "🎒 4. Required Test-Day Items & Fees",
    prepItems: "• Required Items: Valid original ID (ARC card or Passport), printed Voucher, computer signpen",
    prepFees: "• Application Fees: TOPIK I: 40,000 KRW | TOPIK II: 55,000 KRW (Domestic)",
    tableTitle: "📂 Downloadable Past Exams & Academic Prep Materials"
  },
  vn: {
    guideTitle: "📋 Hướng dẫn chính thức Kỳ thi Năng lực Tiếng Hàn (TOPIK)",
    guideDesc: "Tóm tắt chính thức về tổng quan kỳ thi, tiêu chuẩn thang điểm đỗ và lịch trình thi do Viện NIIED trực thuộc Bộ Giáo dục Hàn Quốc cấp.",
    overviewTitle: "🎯 1. Tổng quan kỳ thi & Hạn chứng chỉ",
    overviewTarget: "• Đối tượng: Kiều bào nước ngoài và người nước ngoài không sử dụng tiếng Hàn làm tiếng mẹ đẻ.",
    overviewValidity: "• Hạn hiệu lực: Hợp lệ trong vòng 2 năm kể từ ngày công bố kết quả thi.",
    overviewPurpose: "• Mục đích áp dụng: Nhập học đại học, cấp visa làm việc chuyên môn (E-7), và cộng điểm định cư F-2-R.",
    levelsTitle: "📊 2. Tiêu chuẩn Thang điểm & Cấp độ",
    level1Name: "TOPIK I (Sơ cấp)",
    level1Desc: "Cấp 1 (Trên 80 điểm) / Cấp 2 (Trên 140 điểm)",
    level1Detail: "Nghe (30 câu), Đọc (40 câu) - Tổng điểm tối đa 200 điểm",
    level2Name: "TOPIK II (Trung-Cao cấp)",
    level2Desc: "Cấp 3 (120+), Cấp 4 (150+), Cấp 5 (190+), Cấp 6 (230+ điểm)",
    level2Detail: "Nghe (50 câu), Viết (4 câu), Đọc (50 câu) - Tổng điểm tối đa 300 điểm",
    timetableTitle: "⏰ 3. Lịch thi chi tiết & Quy chế phòng thi",
    topik1TimeTitle: "TOPIK I (Buổi sáng)",
    topik1TimeDetail: "Vào phòng thi trước 09:20 | Giờ thi: 10:00 ~ 11:40 (100 phút, Làm bài tích hợp Nghe/Đọc)",
    topik2TimeTitle: "TOPIK II (Buổi chiều)",
    topik2TimeDetail: "Vào phòng trước 12:20 | Ca 1 (Nghe/Viết): 13:00 ~ 14:50 (110 phút) | Ca 2 (Đọc): 15:20 ~ 16:30 (70 phút)",
    prepTitle: "🎒 4. Vật dụng bắt buộc & Lệ phí thi",
    prepItems: "• Giấy tờ mang theo: Chứng minh ngoại kiều (ARC) hoặc Hộ chiếu gốc, Phiếu báo danh, Bút viết chuyên dụng",
    prepFees: "• Lệ phí thi (Tại Hàn): TOPIK I: 40.000 KRW | TOPIK II: 55.000 KRW",
    tableTitle: "📂 Tải về Đề thi thực tế & Tài liệu Hướng dẫn ôn tập"
  },
  mn: {
    guideTitle: "📋 TOPIK (Солонгос хэлний түвшин тогтоох шалгалт) албан ёсны заавар",
    guideDesc: "БНСУ-ын Боловсролын яамны харьяа хүрээлэнгээс зохион байгуулдаг албан ёсны шалгалтын тойм, түвшний шалгуур болон цагийн хуваарь.",
    overviewTitle: "🎯 1. Шалгалтын тойм ба хүчинтэй хугацаа",
    overviewTarget: "• Хамрах хүрээ: Солонгос хэл биш эх хэлтэй гадаад иргэд болон оюутан, ажилчид.",
    overviewValidity: "• Хүчинтэй хугацаа: Шалгалтын дүн гарсан өдрөөс хойш 2 жилийн хугацаанд хүчинтэй.",
    overviewPurpose: "• Хэрэглээ: Их сургуульд элсэх, мэргэжлийн виз (E-7), оршин суух виз (F-2-R) авахад оноо нэмэгдэнэ.",
    levelsTitle: "📊 2. Шалгалтын түвшин ба тэнцэх онооны стандарт",
    level1Name: "TOPIK I (Анхан түвшин)",
    level1Desc: "1-р зэрэг (80+ оноо) / 2-р зэрэг (140+ оноо)",
    level1Detail: "Сонсох (30 асуулт), Унших (40 асуулт) - Нийт 200 оноо",
    level2Name: "TOPIK II (Дунд, ахисан түвшин)",
    level2Desc: "3-р зэрэг (120+), 4-р зэрэг (150+), 5-р зэрэг (190+), 6-р зэрэг (230+ оноо)",
    level2Detail: "Сонсох (50), Бичих (4), Унших (50 асуулт) - Нийт 300 оноо",
    timetableTitle: "⏰ 3. Шалгалт өгөх цагийн хуваарь ба журам",
    topik1TimeTitle: "TOPIK I (Өглөө)",
    topik1TimeDetail: "Өрөөнд 09:20-оос өмнө орох | Шалгалт: 10:00 ~ 11:40 (100 минут, Сонсох/Унших нэгдсэн)",
    topik2TimeTitle: "TOPIK II (Өдөр)",
    topik2TimeDetail: "Өрөөнд 12:20-оос өмнө орох | 1-р цаг(Сонсох/Бичих): 13:00 ~ 14:50 (110 мин) | 2-р цаг(Унших): 15:20 ~ 16:30 (70 мин)",
    prepTitle: "🎒 4. Шаардлагатай бичиг баримт ба хураамж",
    prepItems: "• Бэлтгэх зүйлс: Гадаадын иргэний үнэмлэх эсвэл паспорт (эх хувиар), Шалгалтын хуудас, Компьютерийн үзэг",
    prepFees: "• Шалгалтын хураамж: TOPIK I: 40,000 вон | TOPIK II: 55,000 вон (Солонгост)",
    tableTitle: "📂 Файлаар татаж авах боломжтой хичээлийн материал, хуучин шалгалтууд"
  }
};

const LEARNING_TRANSLATIONS: Record<"ko" | "en" | "vn" | "mn", {
  pageTitle: string;
  pageDesc: string;
  tabCourses: string;
  tabResources: string;
  tabMocktest: string;
  tabNotices: string;
  recommendTitle: string;
  applyFreeBtn: string;
  applyAlert: string;
  downloadAlert: string;
  downloadBtn: string;
  mockTitle: string;
  mockDesc: string;
  mockStartBtn: string;
  mockNotice: string;
  mockQHeader: string;
  mockSubmitBtn: string;
  mockPrev: string;
  mockNext: string;
  mockResultTitle: string;
  mockResultScore: string;
  mockResultComment: string;
  mockResultCommentFail: string;
  mockExplanation: string;
  mockRestartBtn: string;
  academicTitle: string;
  sideTitle: string;
  sideReg: string;
  sideReq: string;
  sideGcu: string;
  sideLink: string;
  sideConfirm: string;
  tutorTitle: string;
  tutorDesc: string;
  tutorBtn: string;
  tutorAlert: string;
}> = {
  ko: {
    pageTitle: "학습 지원 센터",
    pageDesc: "글로벌사이버대 교수진이 특별 구성한 고품질 커리큘럼을 소개합니다. TOPIK 기출문제 무료 개방자료를 내려받고, 실시간 온라인 모의고사를 풀어보세요.",
    tabCourses: "🎓 정규 교육 강좌",
    tabResources: "📂 TOPIK 자료실",
    tabMocktest: "✏️ 온라인 모의고사",
    tabNotices: "📢 학사 & 교육지원 공지",
    recommendTitle: "추천 교육 강좌 목록",
    applyFreeBtn: "무료 수강신청하기",
    applyAlert: "정식 무료 수강 신청이 완료되었습니다.",
    downloadAlert: "파일이 안전하게 브라우저 다운로드 큐에 추가되었습니다.",
    downloadBtn: "학습자료 다운로드 ↗",
    mockTitle: "✏️ 실시간 TOPIK 모의고사 시뮬레이터",
    mockDesc: "듣기 및 읽기 영역으로 구성된 맞춤형 한국어 능력시험 모의고사 문항을 풀고 실시간 점수와 상세 해설을 확인하십시오.",
    mockStartBtn: "모의고사 시험 시작하기",
    mockNotice: "※ 본 모의고사는 회원가입이나 로그인 없이 즉시 무제한 응시 가능합니다.",
    mockQHeader: "수험번호: GCU-2026-TEST | 성적 즉시 채점 적용",
    mockSubmitBtn: "최종 답안 제출 및 성적표 확인",
    mockPrev: "이전 문항",
    mockNext: "다음 문항",
    mockResultTitle: "🏆 TOPIK 모의고사 성적표",
    mockResultScore: "학우님의 취득 점수 백분율",
    mockResultComment: "고득점 합격 요건 충족! 실전 시험에서도 합격을 기원합니다.",
    mockResultCommentFail: "60점 미만입니다. 아래 정답 해설지를 분석하고 TOPIK 강좌와 교안을 다시 복습해 보십시오.",
    mockExplanation: "정답 및 해설",
    mockRestartBtn: "모의고사 다시 응시하기",
    academicTitle: "학사 공지 & 교육지원 안내실",
    sideTitle: "📘 시험 접수 핵심 정보",
    sideReg: "접수 기한: 매 분기 한국 교육 평가원 정식 접수 대행",
    sideReq: "필수 요건: 유효 신분증(외국인 등록증 또는 여권 원본) 지참",
    sideGcu: "GCU 특별 혜택: 등록생 단체 접수 시 응시료 50% 페이백 지원 및 스마트 첨삭 서비스 상시 매칭",
    sideLink: "🌐 TOPIK 공식 시험안내 ↗",
    sideConfirm: "국립국제교육원 공식 TOPIK(한국어능력시험) 시험 안내 및 접수처 홈페이지로 안전하게 연결됩니다. 이동하시겠습니까?",
    tutorTitle: "1:1 온라인 튜터링 스피킹",
    tutorDesc: "한국어 발음, 억양 및 자연스러운 표현력을 개선하기 위해 GCU 전문 한국어 교육 튜터와 주 1회 화상 멘토링 매칭을 제공합니다.",
    tutorBtn: "상담 신청하기",
    tutorAlert: "1:1 화상 튜터 상담이 정식 접수되었습니다. 개별 문자로 일정을 송부합니다."
  },
  en: {
    pageTitle: "Learning Support Center",
    pageDesc: "Discover high-quality curriculums designed by GCU faculty. Download state past TOPIK materials and take real-time online mock exams.",
    tabCourses: "🎓 Regular Courses",
    tabResources: "📂 TOPIK Prep Materials",
    tabMocktest: "✏️ Online Mock Exam",
    tabNotices: "📢 Academic & Support Notices",
    recommendTitle: "Recommended Courses",
    applyFreeBtn: "Apply for Free",
    applyAlert: "Free course enrollment complete.",
    downloadAlert: "File successfully added to the download queue.",
    downloadBtn: "Download Material ↗",
    mockTitle: "✏️ Real-time TOPIK Mock Exam Simulator",
    mockDesc: "Solve customized TOPIK listening and reading questions. Get instant scores and detailed explanation keys.",
    mockStartBtn: "Start Mock Exam",
    mockNotice: "※ Unlimited attempts are available immediately without login or signup.",
    mockQHeader: "Exam No: GCU-2026-TEST | Instant Grading Applied",
    mockSubmitBtn: "Submit Answers & View Scorecard",
    mockPrev: "Prev Question",
    mockNext: "Next Question",
    mockResultTitle: "🏆 TOPIK Mock Exam Scorecard",
    mockResultScore: "Your Score Percentage",
    mockResultComment: "Score meets pass requirements! Best of luck in the actual exam.",
    mockResultCommentFail: "Score under 60. Please review the explanation sheet below and revise with courses.",
    mockExplanation: "Correct Answer & Explanation",
    mockRestartBtn: "Retake Mock Exam",
    academicTitle: "Academic Announcements & Support Desk",
    sideTitle: "📘 Key Exam Registration Info",
    sideReg: "Registration: Government official registration agency services per quarter.",
    sideReq: "Requirements: Valid original ID (ARC card or Passport original).",
    sideGcu: "GCU Benefits: 50% exam fee cashback for group registrations and custom writing coaching.",
    sideLink: "🌐 Official TOPIK Guide ↗",
    sideConfirm: "You will be redirected securely to the official TOPIK website. Proceed?",
    tutorTitle: "1:1 Online Speaking Tutoring",
    tutorDesc: "We provide weekly video speak-coaching with professional GCU tutors to polish pronunciation and accent.",
    tutorBtn: "Apply Tutoring",
    tutorAlert: "1:1 video tutoring application submitted. Schedule will be sent to your phone shortly."
  },
  vn: {
    pageTitle: "Trung tâm Hỗ trợ Học tập",
    pageDesc: "Khám phá giáo trình chất lượng cao do đội ngũ giáo sư GCU biên soạn. Tải tài liệu ôn thi TOPIK miễn phí và thi thử trực tuyến thời gian thực.",
    tabCourses: "🎓 Khóa học chính quy",
    tabResources: "📂 Tài liệu TOPIK",
    tabMocktest: "✏️ Thi thử trực tuyến",
    tabNotices: "📢 Thông báo Học vụ",
    recommendTitle: "Danh sách khóa học gợi ý",
    applyFreeBtn: "Đăng ký học miễn phí",
    applyAlert: "Đăng ký khóa học miễn phí thành công.",
    downloadAlert: "Tài liệu đã được thêm vào hàng đợi tải xuống an toàn.",
    downloadBtn: "Tải tài liệu ↗",
    mockTitle: "✏️ Trình thi thử TOPIK trực tuyến thời gian thực",
    mockDesc: "Làm bài thi thử TOPIK bao gồm cả kỹ năng nghe và đọc. Nhận điểm ngay lập tức cùng đáp án chi tiết.",
    mockStartBtn: "Bắt đầu làm bài thi",
    mockNotice: "※ Bạn có thể làm bài thi thử không giới hạn và không cần đăng ký hay đăng nhập.",
    mockQHeader: "Số báo danh: GCU-2026-TEST | Áp dụng chấm điểm tự động",
    mockSubmitBtn: "Nộp bài & Xem kết quả",
    mockPrev: "Câu trước",
    mockNext: "Câu tiếp theo",
    mockResultTitle: "🏆 Bảng điểm thi thử TOPIK",
    mockResultScore: "Tỷ lệ điểm số của bạn đạt được",
    mockResultComment: "Đạt chuẩn đỗ điểm cao! Chúc bạn đạt kết quả tốt trong kỳ thi thực tế.",
    mockResultCommentFail: "Dưới 60 điểm. Vui lòng xem kỹ phần giải thích đáp án bên dưới và ôn tập lại bài giảng.",
    mockExplanation: "Đáp án & Giải thích chi tiết",
    mockRestartBtn: "Làm lại bài thi thử",
    academicTitle: "Thông báo học vụ & Bàn hỗ trợ giáo dục",
    sideTitle: "📘 Thông tin đăng ký thi TOPIK",
    sideReg: "Thời hạn đăng ký: Đại diện đăng ký chính thức với Viện giáo dục mỗi quý.",
    sideReq: "Yêu cầu bắt buộc: Mang theo giấy tờ gốc hợp lệ (ARC hoặc Hộ chiếu gốc).",
    sideGcu: "Ưu đãi GCU: Hoàn lệ phí 50% khi đăng ký tập thể và sửa bài viết luận miễn phí.",
    sideLink: "🌐 Hướng dẫn TOPIK chính thức ↗",
    sideConfirm: "Hệ thống sẽ chuyển hướng bạn đến trang web chính thức của TOPIK. Bạn có muốn tiếp tục không?",
    tutorTitle: "Tư vấn Tiếng Hàn 1:1 trực tuyến",
    tutorDesc: "Chúng tôi cung cấp lớp học video trực tuyến 1:1 với gia sư GCU chuyên nghiệp để chỉnh sửa phát âm và luyện nói giao tiếp.",
    tutorBtn: "Đăng ký tư vấn",
    tutorAlert: "Đã gửi yêu cầu tư vấn 1:1 thành công. Chúng tôi sẽ nhắn tin báo lịch học cụ thể cho bạn."
  },
  mn: {
    pageTitle: "Сургалтын дэмжлэг үзүүлэх төв",
    pageDesc: "GCU-ийн багш нарын бэлтгэсэн чанартай хөтөлбөрийг танилцуулж байна. TOPIK-ийн хуучин материалыг үнэгүй татан авч, онлайн загвар шалгалтыг өгөөрэй.",
    tabCourses: "🎓 Үндсэн сургалтууд",
    tabResources: "📂 TOPIK материал",
    tabMocktest: "✏️ Онлайн загвар шалгалт",
    tabNotices: "📢 Сургуулийн зарлал",
    recommendTitle: "Санал болгож буй сургалтууд",
    applyFreeBtn: "Үнэгүй суралцах хүсэлт",
    applyAlert: "Үнэгүй суралцах хүсэлт амжилттай бүртгэгдлээ.",
    downloadAlert: "Файлыг татах хэсэгт амжилттай нэмлээ.",
    downloadBtn: "Материал татах ↗",
    mockTitle: "✏️ TOPIK онлайн загвар шалгалтын систем",
    mockDesc: "Сонсох болон унших хэсгээс бүрдсэн солонгос хэлний түвшин тогтоох шалгалтыг өгч, оноо болон тайлбараа шууд хараарай.",
    mockStartBtn: "Шалгалт эхлэх",
    mockNotice: "※ Шалгалтыг нэвтрэх болон бүртгүүлэх шаардлагагүйгээр хязгааргүй өгөх боломжтой.",
    mockQHeader: "Шалгалтын дугаар: GCU-2026-TEST | Оноо шууд бодно",
    mockSubmitBtn: "Хариулт илгээж дүн харах",
    mockPrev: "Өмнөх асуулт",
    mockNext: "Дараах асуулт",
    mockResultTitle: "🏆 Загвар шалгалтын дүн",
    mockResultScore: "Таны авсан онооны хувь",
    mockResultComment: "Өндөр оноо авч тэнцлээ! Жинхэнэ шалгалтандаа амжилт гаргахыг хүсье.",
    mockResultCommentFail: "60-аас доош оноо авлаа. Доорх зөв хариултын тайлбарыг уншиж хичээлээ давтаарай.",
    mockExplanation: "Зөв хариулт ба Тайлбар",
    mockRestartBtn: "Шалгалт дахин өгөх",
    academicTitle: "Сургуулийн зарлал & Дэмжлэг үзүүлэх алба",
    sideTitle: "📘 Шалгалтын чухал мэдээлэл",
    sideReg: "Бүртгүүлэх: Улирал бүр Боловсролын үнэлгээний газрын бүртгэлийг зуучилна.",
    sideReq: "Шаардлага: Хүчинтэй бичиг баримт (Иргэний үнэмлэх эсвэл паспорт эх хувиар) авч ирэх.",
    sideGcu: "GCU давуу тал: Нэгдсэн бүртгэл хийлгэвэл хураамжийн 50%-ийг буцааж олгох болон бичих чадварын зөвлөгөө.",
    sideLink: "🌐 TOPIK албан ёсны заавар ↗",
    sideConfirm: "TOPIK-ийн албан ёсны вэбсайт руу аюулгүй шилжиж байна. Үргэлжлүүлэх үү?",
    tutorTitle: "1:1 Онлайн ярианы сургалт",
    tutorDesc: "Солонгос хэлний дуудлага, ярих чадварыг сайжруулахад зориулж GCU-ийн багш нартай долоо хоногт 1 удаа цахим хичээл орох боломжийг олгоно.",
    tutorBtn: "Сургалтад бүртгүүлэх",
    tutorAlert: "1:1 видео ярианы сургалтын хүсэлт илгээгдлээ. Цагийн хуваарийг утсаар мэдэгдэх болно."
  }
};

export default function LearningPage() {
  const { lang, t } = useLanguage();
  const tLearn = LEARNING_TRANSLATIONS[lang as "ko" | "en" | "vn" | "mn"] || LEARNING_TRANSLATIONS.ko;

  const [activeTab, setActiveTab] = useState("courses");

  // Dynamic IBT States
  const [exams, setExams] = useState<any[]>([]);
  const [examHistory, setExamHistory] = useState<any[]>([]);
  const [activeExam, setActiveExam] = useState<any | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]); // OMR answers indices
  const [timeLeft, setTimeLeft] = useState<number>(0); // remaining seconds
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const [examScore, setExamScore] = useState<number>(0);
  const [examLevel, setExamLevel] = useState<string>("FAIL");
  const [activeTrackIndex, setActiveTrackIndex] = useState<number>(0);
  const [selectedHistoryRecord, setSelectedHistoryRecord] = useState<any | null>(null);

  // Interactive Responsive and Question States
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [omrViewMode, setOmrViewMode] = useState<"single" | "full">("single");
  const [mobileTab, setMobileTab] = useState<"pdf" | "omr">("pdf");
  const [windowWidth, setWindowWidth] = useState<number>(1200);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const isMobile = windowWidth <= 860;

  // Load database on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Sync URL tab
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "mocktest") {
        setActiveTab("mocktest");
      } else if (tab === "resources") {
        setActiveTab("resources");
      }

      // 2. Load registered exams list from Server
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
            const DEFAULT_EXAMS = [
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
                pdfDataUrl: "",
                answerPdfFileName: "",
                answerPdfDataUrl: "",
                mp3FileName: "68th_topik_ii_listening_audio_track.mp3",
                mp3DataUrl: "",
                answerKey: [2, 1, 3, 0, 2, 3, 1, 2, 0, 3],
                createdDate: "2026-05-28"
              }
            ];
            setExams(DEFAULT_EXAMS);
          }
        });

      // 3. Load exam history
      const savedHistory = localStorage.getItem("gcu-exam-history");
      if (savedHistory) {
        setExamHistory(JSON.parse(savedHistory));
      }
    }
  }, []);

  // Timer Countdown Effect
  useEffect(() => {
    if (!quizStarted || quizFinished || timeLeft <= 0) {
      if (quizStarted && timeLeft <= 0 && !quizFinished) {
        handleAutoSubmit();
      }
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [quizStarted, quizFinished, timeLeft]);

  // Handle Starting IBT Exam
  const handleStartExam = (exam: any) => {
    setActiveExam(exam);
    setSelectedAnswers(new Array(exam.questionCount).fill(-1)); // initialize OMR Answers with -1 (unmarked)
    setTimeLeft(exam.duration * 60); // minutes to seconds
    setAudioSpeed(1.0);
    setActiveTrackIndex(0);
    setQuizFinished(false);
    setQuizStarted(true);
  };

  // Mark answer on OMR sheet
  const handleMarkOMR = (qIdx: number, val: number) => {
    setSelectedAnswers((prev) => {
      const next = [...prev];
      next[qIdx] = val;
      return next;
    });
  };

  // Exit Exam ( 중도 포기 )
  const handleQuitExam = () => {
    if (confirm(t("examConfirmQuit"))) {
      setQuizStarted(false);
      setQuizFinished(false);
      setActiveExam(null);
    }
  };

  // Submit Exam ( OMR 답안 제출 )
  const handleManualSubmit = () => {
    if (confirm(t("examConfirmSubmit"))) {
      processGrading();
    }
  };

  const handleAutoSubmit = () => {
    alert("⏰ 시험 제한 시간이 만료되어 OMR 답안지가 자동으로 제출 처리됩니다.");
    processGrading();
  };

  // Core IBT Grading Engine
  const processGrading = () => {
    if (!activeExam) return;

    let correctCount = 0;
    selectedAnswers.forEach((ans, idx) => {
      if (ans === activeExam.answerKey[idx]) {
        correctCount += 1;
      }
    });

    const calculatedScore = Math.round((correctCount / activeExam.questionCount) * 100);
    setExamScore(calculatedScore);

    // Dynamic TOPIK Evaluation criteria
    let level = "FAIL";
    if (calculatedScore >= 90) level = "TOPIK 6급 (Excellent)";
    else if (calculatedScore >= 80) level = "TOPIK 5급 (Very Good)";
    else if (calculatedScore >= 70) level = "TOPIK 4급 (Good)";
    else if (calculatedScore >= 60) level = "TOPIK 3급 (Intermediate)";
    else if (calculatedScore >= 45) level = "TOPIK 2급 (Basic)";
    else if (calculatedScore >= 30) level = "TOPIK 1급 (Novice)";
    setExamLevel(level);

    // Save attempt to historical logs in local storage with full details
    const newRecord = {
      examId: activeExam.id,
      examTitle: activeExam.title[lang as "ko" | "en" | "vn" | "mn"] || activeExam.title.ko,
      score: calculatedScore,
      level,
      date: new Date().toISOString().split("T")[0],
      selectedAnswers: [...selectedAnswers],
      answerKey: [...activeExam.answerKey],
      pdfFileName: activeExam.pdfFileName,
      pdfDataUrl: activeExam.pdfDataUrl,
      answerPdfFileName: activeExam.answerPdfFileName || "",
      answerPdfDataUrl: activeExam.answerPdfDataUrl || "",
      questionCount: activeExam.questionCount
    };

    const nextHistory = [newRecord, ...examHistory];
    setExamHistory(nextHistory);
    if (typeof window !== "undefined") {
      localStorage.setItem("gcu-exam-history", JSON.stringify(nextHistory));
    }

    setQuizFinished(true);
  };

  // Back to Exam Lobby
  const handleBackToLobby = () => {
    setQuizStarted(false);
    setQuizFinished(false);
    setActiveExam(null);
  };

  const handleDownload = (filename: string) => {
    alert(`"${filename}" ${tLearn.downloadAlert}`);
  };

  // Format Time Left: MM:SS
  const formatTimeLeft = () => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      {/* Visual Header */}
      <section className="glass-panel" style={{ padding: "40px", background: "linear-gradient(135deg, rgba(114, 191, 68, 0.15) 0%, rgba(33, 64, 154, 0.05) 100%)" }}>
        <h1 className="hero-title" style={{ fontSize: "2.25rem", marginBottom: "16px" }}>{tLearn.pageTitle}</h1>
        <p className="hero-desc" style={{ marginBottom: 0, fontSize: "1rem" }}>
          {tLearn.pageDesc}
        </p>
      </section>

      {/* Expanded Tabs Switcher Container */}
      <div className="comm-board-tabs" style={{ marginBottom: "20px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
        <button 
          onClick={() => setActiveTab("courses")} 
          className={`comm-tab-btn ${activeTab === "courses" ? "active" : ""}`}
          style={{ whiteSpace: "nowrap" }}
        >
          {tLearn.tabCourses}
        </button>
        <button 
          onClick={() => setActiveTab("resources")} 
          className={`comm-tab-btn ${activeTab === "resources" ? "active" : ""}`}
          style={{ whiteSpace: "nowrap" }}
        >
          {tLearn.tabResources}
        </button>
        <button 
          onClick={() => setActiveTab("mocktest")} 
          className={`comm-tab-btn ${activeTab === "mocktest" ? "active" : ""}`}
          style={{ whiteSpace: "nowrap" }}
        >
          {tLearn.tabMocktest}
        </button>
        <button 
          onClick={() => setActiveTab("notices")} 
          className={`comm-tab-btn ${activeTab === "notices" ? "active" : ""}`}
          style={{ whiteSpace: "nowrap" }}
        >
          {tLearn.tabNotices}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "32px", alignItems: "start" }}>
        <div>
          {/* 1. Regular Courses Tab */}
          {activeTab === "courses" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div className="section-header" style={{ marginBottom: "10px" }}>
                <div className="section-title">
                  <span className="section-title-dot"></span>
                  <h2 style={{ fontSize: "1.35rem", fontWeight: "800", color: "#fff" }}>{tLearn.recommendTitle}</h2>
                </div>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "20px" }}>
                {COURSES.map((course) => {
                  const cLevel = course.level[lang as "ko" | "en" | "vn" | "mn"] || course.level.ko;
                  const cTitle = course.title[lang as "ko" | "en" | "vn" | "mn"] || course.title.ko;
                  const cLecturer = course.lecturer[lang as "ko" | "en" | "vn" | "mn"] || course.lecturer.ko;
                  const cDesc = course.desc[lang as "ko" | "en" | "vn" | "mn"] || course.desc.ko;

                  return (
                    <div 
                      key={course.id} 
                      className="glass-panel" 
                      style={{ 
                        padding: "24px", 
                        borderRadius: "16px",
                        border: "1px solid rgba(255,255,255,0.05)",
                        background: "rgba(255,255,255,0.015)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        gap: "16px"
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                          <span className="feed-tag guide" style={{ padding: "3px 10px", fontSize: "0.75rem" }}>{cLevel}</span>
                          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: "600" }}>{cLecturer}</span>
                        </div>
                        <h4 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#fff", marginBottom: "10px", lineHeight: "1.4" }}>
                          {cTitle}
                        </h4>
                        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0, lineHeight: "1.6" }}>
                          {cDesc}
                        </p>
                      </div>

                      <button 
                        onClick={() => alert(tLearn.applyAlert)}
                        className="sim-start-btn" 
                        style={{ width: "100%", padding: "10px 0", fontSize: "0.85rem" }}
                      >
                        {tLearn.applyFreeBtn}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Prep Materials & TOPIK Guide Tab */}
          {activeTab === "resources" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              
              {/* Official TOPIK Guide Block */}
              <div className="glass-panel" style={{ padding: "32px", borderRadius: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <span style={{ fontSize: "1.5rem" }}>📋</span>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "#fff", margin: 0 }}>
                    {(TOPIK_GUIDE[lang as "ko" | "en" | "vn" | "mn"] || TOPIK_GUIDE.ko).guideTitle}
                  </h3>
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: "1.6", marginBottom: "24px" }}>
                  {(TOPIK_GUIDE[lang as "ko" | "en" | "vn" | "mn"] || TOPIK_GUIDE.ko).guideDesc}
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                  
                  {/* Overview card */}
                  <div className="glass-panel" style={{ padding: "20px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)" }}>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--gcu-sky)", marginBottom: "12px" }}>
                      {(TOPIK_GUIDE[lang as "ko" | "en" | "vn" | "mn"] || TOPIK_GUIDE.ko).overviewTitle}
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                      <span>{(TOPIK_GUIDE[lang as "ko" | "en" | "vn" | "mn"] || TOPIK_GUIDE.ko).overviewTarget}</span>
                      <span>{(TOPIK_GUIDE[lang as "ko" | "en" | "vn" | "mn"] || TOPIK_GUIDE.ko).overviewValidity}</span>
                      <span>{(TOPIK_GUIDE[lang as "ko" | "en" | "vn" | "mn"] || TOPIK_GUIDE.ko).overviewPurpose}</span>
                    </div>
                  </div>

                  {/* Levels card */}
                  <div className="glass-panel" style={{ padding: "20px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)" }}>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--gcu-green)", marginBottom: "12px" }}>
                      {(TOPIK_GUIDE[lang as "ko" | "en" | "vn" | "mn"] || TOPIK_GUIDE.ko).levelsTitle}
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.8rem" }}>
                      <div>
                        <strong style={{ color: "#fff", display: "block" }}>{(TOPIK_GUIDE[lang as "ko" | "en" | "vn" | "mn"] || TOPIK_GUIDE.ko).level1Name}</strong>
                        <span style={{ color: "var(--text-secondary)" }}>{(TOPIK_GUIDE[lang as "ko" | "en" | "vn" | "mn"] || TOPIK_GUIDE.ko).level1Desc}</span>
                        <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.75rem" }}>{(TOPIK_GUIDE[lang as "ko" | "en" | "vn" | "mn"] || TOPIK_GUIDE.ko).level1Detail}</span>
                      </div>
                      <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "8px" }}>
                        <strong style={{ color: "#fff", display: "block" }}>{(TOPIK_GUIDE[lang as "ko" | "en" | "vn" | "mn"] || TOPIK_GUIDE.ko).level2Name}</strong>
                        <span style={{ color: "var(--text-secondary)" }}>{(TOPIK_GUIDE[lang as "ko" | "en" | "vn" | "mn"] || TOPIK_GUIDE.ko).level2Desc}</span>
                        <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.75rem" }}>{(TOPIK_GUIDE[lang as "ko" | "en" | "vn" | "mn"] || TOPIK_GUIDE.ko).level2Detail}</span>
                      </div>
                    </div>
                  </div>

                  {/* Timetable card */}
                  <div className="glass-panel" style={{ padding: "20px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)" }}>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: "700", color: "var(--gcu-orange)", marginBottom: "12px" }}>
                      {(TOPIK_GUIDE[lang as "ko" | "en" | "vn" | "mn"] || TOPIK_GUIDE.ko).timetableTitle}
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                      <div>
                        <strong style={{ color: "#fff" }}>{(TOPIK_GUIDE[lang as "ko" | "en" | "vn" | "mn"] || TOPIK_GUIDE.ko).topik1TimeTitle}</strong>
                        <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)" }}>{(TOPIK_GUIDE[lang as "ko" | "en" | "vn" | "mn"] || TOPIK_GUIDE.ko).topik1TimeDetail}</span>
                      </div>
                      <div>
                        <strong style={{ color: "#fff" }}>{(TOPIK_GUIDE[lang as "ko" | "en" | "vn" | "mn"] || TOPIK_GUIDE.ko).topik2TimeTitle}</strong>
                        <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)" }}>{(TOPIK_GUIDE[lang as "ko" | "en" | "vn" | "mn"] || TOPIK_GUIDE.ko).topik2TimeDetail}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Study Resources Download Hub Grid */}
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#fff", marginBottom: "16px" }}>📚 TOPIK 학습 자료 다운로드</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                  {RESOURCES.map((res) => {
                    const resName = res.name[lang as "ko" | "en" | "vn" | "mn"] || res.name.ko;
                    const resType = res.type[lang as "ko" | "en" | "vn" | "mn"] || res.type.ko;

                    return (
                      <div 
                        key={res.id} 
                        className="glass-panel" 
                        style={{ 
                          padding: "20px", 
                          display: "flex", 
                          flexDirection: "column", 
                          justifyContent: "space-between", 
                          gap: "16px",
                          background: "rgba(255,255,255,0.01)" 
                        }}
                      >
                        <div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                            <span className="feed-tag guide" style={{ padding: "2px 8px", fontSize: "0.72rem" }}>{resType}</span>
                            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{res.size}</span>
                          </div>
                          <h4 style={{ fontSize: "0.92rem", fontWeight: "700", color: "#fff", margin: 0, lineHeight: "1.4" }}>
                            {resName}
                          </h4>
                        </div>

                        <button 
                          onClick={() => handleDownload(resName)}
                          className="sim-start-btn" 
                          style={{ width: "100%", padding: "8px 0", fontSize: "0.8rem", borderRadius: "8px" }}
                        >
                          {tLearn.downloadBtn}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* 3. Mock Exam Tab */}
          {activeTab === "mocktest" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {!quizStarted && !quizFinished ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                  <div style={{ textAlign: "center", padding: "20px 0", borderBottom: "1px solid var(--border-color)" }}>
                    <span style={{ fontSize: "3.2rem", display: "block", marginBottom: "16px" }}>✏️</span>
                    <h2 style={{ fontSize: "1.6rem", marginBottom: "12px", fontFamily: "var(--font-brand)", fontWeight: "800", color: "#fff" }}>
                      {t("examLobbyTitle")}
                    </h2>
                    <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: "1.6", maxWidth: "700px", margin: "0 auto" }}>
                      {t("examLobbyDesc")}
                    </p>
                  </div>

                  {/* Registered Exams Grid */}
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#fff", marginBottom: "16px" }}>📋 응시 가능한 모의고사 시험지</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
                      {exams.map((exam) => {
                        const examTitle = exam.title[lang as "ko" | "en" | "vn" | "mn"] || exam.title.ko;
                        const isAttempted = examHistory.some((h) => h.examId === exam.id);

                        return (
                          <div 
                            key={exam.id}
                            className="glass-panel"
                            style={{ 
                              padding: "24px", 
                              borderRadius: "16px", 
                              border: "1px solid rgba(255, 255, 255, 0.05)",
                              background: "rgba(255, 255, 255, 0.015)",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              gap: "16px"
                            }}
                          >
                            <div>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                                <span className={`feed-tag ${isAttempted ? "notice" : "guide"}`} style={{ fontSize: "0.7rem", padding: "2px 8px" }}>
                                  {isAttempted ? t("examStatusCompleted") : t("examStatusNotStarted")}
                                </span>
                                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{exam.createdDate}</span>
                              </div>
                              <h4 style={{ fontSize: "1rem", fontWeight: "700", color: "#fff", margin: "0 0 12px 0", lineHeight: "1.4" }}>
                                {examTitle}
                              </h4>
                              <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                                <span>⏰ {t("examDuration")}: {exam.duration}분</span>
                                <span>🎯 {t("examQuestions")}: {exam.questionCount}문항</span>
                              </div>
                            </div>

                            <button 
                              onClick={() => handleStartExam(exam)}
                              className="sim-start-btn" 
                              style={{ width: "100%", padding: "10px", fontSize: "0.85rem" }}
                            >
                              {isAttempted ? t("btnRetakeExam") : t("btnStartExam")}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 📈 My Scorecards History */}
                  {examHistory.length > 0 && (
                    <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "24px" }}>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#fff", marginBottom: "16px" }}>
                        {t("examHistoryTitle")}
                      </h3>
                      <div className="glass-panel" style={{ padding: "8px", overflowX: "auto" }}>
                        <table className="resource-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                          <thead>
                            <tr>
                              <th>모의고사 시험지명</th>
                              <th>응시 일자</th>
                              <th>획득 점수</th>
                              <th>판정 수준</th>
                              <th style={{ textAlign: "center" }}>상세 채점표</th>
                            </tr>
                          </thead>
                          <tbody>
                            {examHistory.map((history, hIdx) => (
                              <tr key={hIdx}>
                                <td style={{ fontWeight: "700", color: "var(--text-primary)" }}>{history.examTitle}</td>
                                <td style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{history.date}</td>
                                <td style={{ color: "var(--gcu-sky)", fontWeight: "800" }}>{history.score}점</td>
                                <td>
                                  <span className="feed-tag event" style={{ fontSize: "0.75rem", padding: "2px 8px" }}>
                                    {history.level}
                                  </span>
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  <button
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
                                    🔍 상세 보기
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                </div>
              ) : quizStarted && !quizFinished && activeExam ? (
                
                /* 2. Split-Screen IBT Exam Room */
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  
                  {/* IBT High-Fidelity Header Dashboard */}
                  <div 
                    className="glass-panel"
                    style={{ 
                      padding: "16px 24px", 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center",
                      border: "1px solid rgba(0, 229, 255, 0.25)",
                      background: "linear-gradient(90deg, rgba(0, 185, 242, 0.1) 0%, rgba(0,0,0,0.3) 100%)",
                      flexWrap: "wrap",
                      gap: "12px"
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--gcu-sky)", fontWeight: "800" }}>COMPUTER BASED TOPIK IBT SIMULATOR</span>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: "700", color: "#fff", margin: 0 }}>
                        {activeExam.title[lang as "ko" | "en" | "vn" | "mn"] || activeExam.title.ko}
                      </h3>
                    </div>

                    {/* Countdown Timer */}
                    <div 
                      style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "10px", 
                        background: "rgba(0,0,0,0.4)", 
                        padding: "8px 16px", 
                        borderRadius: "12px", 
                        border: "1px solid rgba(255, 255, 255, 0.05)" 
                      }}
                    >
                      <span style={{ fontSize: "1.2rem" }}>⏱️</span>
                      <span 
                        style={{ 
                          fontSize: "1.35rem", 
                          fontWeight: "800", 
                          fontFamily: "monospace", 
                          color: timeLeft <= 300 ? "var(--gcu-orange)" : "var(--gcu-sky)",
                          textShadow: timeLeft <= 300 ? "0 0 10px rgba(247,147,30,0.5)" : "0 0 10px rgba(0,185,242,0.5)"
                        }}
                      >
                        {formatTimeLeft()}
                      </span>
                    </div>
                  </div>

                  {/* Mobile View Switcher Tabs (Only visible on mobile screen widths <= 860px) */}
                  {isMobile && (
                    <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
                      <button 
                        type="button"
                        onClick={() => setMobileTab("pdf")}
                        className={`comm-tab-btn ${mobileTab === "pdf" ? "active" : ""}`}
                        style={{ flex: 1, padding: "10px 0", fontSize: "0.85rem", fontWeight: "700", whiteSpace: "nowrap" }}
                      >
                        📄 시험지 보기 (Passage)
                      </button>
                      <button 
                        type="button"
                        onClick={() => setMobileTab("omr")}
                        className={`comm-tab-btn ${mobileTab === "omr" ? "active" : ""}`}
                        style={{ flex: 1, padding: "10px 0", fontSize: "0.85rem", fontWeight: "700", whiteSpace: "nowrap" }}
                      >
                        ✏️ 답안 마킹 OMR
                      </button>
                    </div>
                  )}

                  {/* Left / Right Split Pane Grid Layout (Desktop ratio: 1.4fr vs 0.8fr) */}
                  <div 
                    style={{ 
                      display: "grid", 
                      gridTemplateColumns: isMobile ? "1fr" : "1.4fr 0.8fr", 
                      gap: "24px" 
                    }}
                  >
                    
                    {/* Left Pane: Passage PDF Viewer (Occupies ~63.6% width on desktop) */}
                    <div 
                      style={{ 
                        display: (!isMobile || mobileTab === "pdf") ? "flex" : "none", 
                        flexDirection: "column", 
                        gap: "10px" 
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "var(--text-secondary)" }}>
                          📄 {lang === "ko" ? "IBT 문항지 지문 영역" : "Passage Paper"}
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>PDF: {activeExam.pdfFileName}</span>
                      </div>
                      
                      {/* High-fidelity PDF display container */}
                      <div className="glass-panel" style={{ padding: "4px", background: "#0c101a", borderRadius: "12px" }}>
                        <iframe 
                          src={activeExam.pdfDataUrl || "https://pdfobject.com/pdf/sample.pdf"} 
                          style={{ 
                            width: "100%", 
                            height: isMobile ? "500px" : "650px", 
                            borderRadius: "8px", 
                            border: "none"
                          }}
                          title="TOPIK Exam Passage PDF"
                        ></iframe>
                      </div>
                    </div>

                    {/* Right Pane: Audio player, OMR sheet, progress bar (Occupies ~36.4% width on desktop) */}
                    <div 
                      style={{ 
                        display: (!isMobile || mobileTab === "omr") ? "flex" : "none", 
                        flexDirection: "column", 
                        gap: "20px" 
                      }}
                    >
                      
                      {/* Listening Audio Controller */}
                      <div className="glass-panel" style={{ padding: "16px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                          <span style={{ fontSize: "0.82rem", fontWeight: "700", color: "var(--text-secondary)" }}>🔊 듣기 평가 재생기</span>
                          
                          {/* Playback speed selector */}
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{t("examAudioSpeed")}:</span>
                            <select 
                              value={audioSpeed.toFixed(1)}
                              onChange={(e) => {
                                const speed = parseFloat(e.target.value);
                                setAudioSpeed(speed);
                                const aud = document.getElementById("ibt-audio-player") as HTMLAudioElement;
                                if (aud) aud.playbackRate = speed;
                              }}
                              className="calc-select"
                              style={{ width: "auto", height: "26px", fontSize: "0.75rem", padding: "0 4px" }}
                              aria-label="Audio Playback Speed"
                            >
                              <option value="0.8">0.8x (Slow)</option>
                              <option value="1.0">1.0x (Normal)</option>
                              <option value="1.2">1.2x (Fast)</option>
                              <option value="1.5">1.5x (Speedy)</option>
                            </select>
                          </div>
                        </div>

                        <audio 
                          id="ibt-audio-player"
                          controls 
                          src={(activeExam.audioTracks && activeExam.audioTracks[activeTrackIndex]?.url) || activeExam.mp3DataUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"} 
                          style={{ width: "100%", borderRadius: "8px", background: "rgba(0,0,0,0.15)" }} 
                        />

                        {activeExam.audioTracks && activeExam.audioTracks.length > 0 && (
                          <div style={{ marginTop: "12px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "12px" }}>
                            <span style={{ fontSize: "0.78rem", color: "var(--gcu-sky)", fontWeight: "700", display: "block", marginBottom: "8px" }}>
                              🎧 청취 음원 트랙 선택 (Audio Tracks):
                            </span>
                            <div style={{ display: "flex", flexDirection: "column", gap: "6px", maxHeight: "150px", overflowY: "auto" }}>
                              {activeExam.audioTracks.map((track: any, idx: number) => {
                                const isActive = activeTrackIndex === idx;
                                return (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => {
                                      setActiveTrackIndex(idx);
                                      const aud = document.getElementById("ibt-audio-player") as HTMLAudioElement;
                                      if (aud) {
                                        aud.src = track.url;
                                        aud.playbackRate = audioSpeed;
                                        aud.play().catch(e => console.log("Auto-play blocked or failed:", e));
                                      }
                                    }}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "8px",
                                      width: "100%",
                                      padding: "8px 12px",
                                      background: isActive ? "rgba(0, 185, 242, 0.15)" : "rgba(255,255,255,0.02)",
                                      border: "1px solid",
                                      borderColor: isActive ? "var(--gcu-sky)" : "rgba(255,255,255,0.05)",
                                      borderRadius: "6px",
                                      color: isActive ? "#fff" : "var(--text-secondary)",
                                      fontSize: "0.78rem",
                                      fontWeight: isActive ? "700" : "400",
                                      textAlign: "left",
                                      cursor: "pointer",
                                      transition: "all 0.2s ease"
                                    }}
                                  >
                                    <span>{isActive ? "▶️" : "📻"}</span>
                                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
                                      {idx + 1}. {track.name}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* OMR bubble sheet card */}
                      <div className="glass-panel" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border-color)", paddingBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
                          <span style={{ fontSize: "0.88rem", fontWeight: "700", color: "#fff" }}>📝 {t("examOmarker")}</span>
                          
                          {/* View Mode Toggle: Single Question vs Full List */}
                          <div style={{ display: "flex", gap: "4px", background: "rgba(255,255,255,0.03)", padding: "3px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                            <button
                              type="button"
                              onClick={() => setOmrViewMode("single")}
                              style={{
                                padding: "4px 8px",
                                fontSize: "0.72rem",
                                background: omrViewMode === "single" ? "var(--gcu-sky)" : "transparent",
                                color: omrViewMode === "single" ? "#060A1A" : "var(--text-secondary)",
                                border: "none",
                                borderRadius: "6px",
                                fontWeight: "700",
                                cursor: "pointer",
                                transition: "all 0.2s ease"
                              }}
                            >
                              🎯 단일 문항
                            </button>
                            <button
                              type="button"
                              onClick={() => setOmrViewMode("full")}
                              style={{
                                padding: "4px 8px",
                                fontSize: "0.72rem",
                                background: omrViewMode === "full" ? "var(--gcu-sky)" : "transparent",
                                color: omrViewMode === "full" ? "#060A1A" : "var(--text-secondary)",
                                border: "none",
                                borderRadius: "6px",
                                fontWeight: "700",
                                cursor: "pointer",
                                transition: "all 0.2s ease"
                              }}
                            >
                              📋 전체 시트
                            </button>
                          </div>

                          <span style={{ fontSize: "0.78rem", color: "var(--gcu-sky)", fontWeight: "600" }}>
                            {t("examMarkerProgress")}: {selectedAnswers.filter((a) => a !== -1).length} / {activeExam.questionCount}
                          </span>
                        </div>

                        {omrViewMode === "single" ? (
                          /* 🎯 단일 문항 집중 뷰 (One Question Focus Mode) */
                          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            
                            {/* Question Card */}
                            <div 
                              className="glass-panel" 
                              style={{ 
                                padding: "18px 20px", 
                                background: "rgba(255,255,255,0.02)", 
                                border: "1px solid rgba(0, 185, 242, 0.15)",
                                borderRadius: "10px",
                                textAlign: "center"
                              }}
                            >
                              <span style={{ fontSize: "0.75rem", color: "var(--gcu-sky)", fontWeight: "700", display: "block", marginBottom: "6px" }}>
                                FOCUS QUESTION
                              </span>
                              <h4 style={{ fontSize: "1.15rem", fontWeight: "800", color: "#fff", margin: "0 0 14px 0" }}>
                                문항 {activeQuestionIndex + 1}
                              </h4>
                              
                              {/* Large bubble selectors */}
                              <div style={{ display: "flex", justifyContent: "center", gap: "14px" }}>
                                {[0, 1, 2, 3].map((optIdx) => {
                                  const isMarked = selectedAnswers[activeQuestionIndex] === optIdx;
                                  return (
                                    <button
                                      key={optIdx}
                                      type="button"
                                      onClick={() => {
                                        handleMarkOMR(activeQuestionIndex, optIdx);
                                        if (activeQuestionIndex < activeExam.questionCount - 1) {
                                          setTimeout(() => {
                                            setActiveQuestionIndex(prev => prev + 1);
                                          }, 250);
                                        }
                                      }}
                                      style={{
                                        width: "42px",
                                        height: "42px",
                                        borderRadius: "50%",
                                        border: "2px solid",
                                        borderColor: isMarked ? "var(--gcu-sky)" : "var(--text-muted)",
                                        background: isMarked ? "var(--gcu-sky)" : "transparent",
                                        color: isMarked ? "#060A1A" : "#fff",
                                        fontSize: "1.1rem",
                                        fontWeight: "800",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        transition: "all 0.2s ease"
                                      }}
                                    >
                                      {optIdx + 1}
                                    </button>
                                  );
                                })}
                              </div>
                              
                              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", display: "block", marginTop: "12px" }}>
                                ※ 마킹 시 0.25초 뒤 다음 문항으로 자동 이동합니다.
                              </span>
                            </div>

                            {/* Pagination Controls */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
                              <button
                                type="button"
                                onClick={() => setActiveQuestionIndex(prev => Math.max(0, prev - 1))}
                                disabled={activeQuestionIndex === 0}
                                className="resource-download-btn"
                                style={{ 
                                  flex: 1, 
                                  padding: "6px", 
                                  fontSize: "0.75rem", 
                                  background: activeQuestionIndex === 0 ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.05)",
                                  opacity: activeQuestionIndex === 0 ? 0.3 : 1,
                                  cursor: activeQuestionIndex === 0 ? "default" : "pointer"
                                }}
                              >
                                ◀ 이전
                              </button>
                              
                              <span style={{ fontSize: "0.85rem", color: "#fff", fontWeight: "700", fontFamily: "monospace" }}>
                                {activeQuestionIndex + 1} / {activeExam.questionCount}
                              </span>

                              <button
                                type="button"
                                onClick={() => setActiveQuestionIndex(prev => Math.min(activeExam.questionCount - 1, prev + 1))}
                                disabled={activeQuestionIndex === activeExam.questionCount - 1}
                                className="resource-download-btn"
                                style={{ 
                                  flex: 1, 
                                  padding: "6px", 
                                  fontSize: "0.75rem", 
                                  background: activeQuestionIndex === activeExam.questionCount - 1 ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.05)",
                                  opacity: activeQuestionIndex === activeExam.questionCount - 1 ? 0.3 : 1,
                                  cursor: activeQuestionIndex === activeExam.questionCount - 1 ? "default" : "pointer"
                                }}
                              >
                                다음 ▶
                              </button>
                            </div>

                            {/* Question Direct Navigation Matrix Grid */}
                            <div>
                              <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: "600", display: "block", marginBottom: "6px" }}>
                                🧭 빠른 문항 네비게이터:
                              </span>
                              <div 
                                style={{ 
                                  display: "grid", 
                                  gridTemplateColumns: "repeat(auto-fill, minmax(32px, 1fr))", 
                                  gap: "6px", 
                                  maxHeight: "110px", 
                                  overflowY: "auto",
                                  padding: "6px",
                                  background: "rgba(0,0,0,0.15)",
                                  borderRadius: "6px",
                                  border: "1px solid rgba(255,255,255,0.03)"
                                }}
                              >
                                {selectedAnswers.map((ans, idx) => {
                                  const isActive = activeQuestionIndex === idx;
                                  const isMarked = ans !== -1;
                                  return (
                                    <button
                                      key={idx}
                                      type="button"
                                      onClick={() => setActiveQuestionIndex(idx)}
                                      style={{
                                        padding: "4px 0",
                                        fontSize: "0.75rem",
                                        fontWeight: "700",
                                        borderRadius: "4px",
                                        border: "1px solid",
                                        borderColor: isActive ? "var(--gcu-sky)" : (isMarked ? "rgba(87,255,154,0.3)" : "rgba(255,255,255,0.05)"),
                                        background: isActive ? "var(--gcu-sky)" : (isMarked ? "rgba(87,255,154,0.1)" : "transparent"),
                                        color: isActive ? "#060A1A" : (isMarked ? "#57FF9A" : "var(--text-secondary)"),
                                        cursor: "pointer",
                                        transition: "all 0.15s ease",
                                        boxShadow: isActive ? "0 0 8px rgba(0,185,242,0.4)" : "none"
                                      }}
                                    >
                                      {idx + 1}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                          </div>
                        ) : (
                          /* 📋 전체 마킹 시트 뷰 (Traditional vertical scrolling list) */
                          <div style={{ maxHeight: "300px", overflowY: "auto", paddingRight: "4px" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                              {selectedAnswers.map((ans, idx) => (
                                <div 
                                  key={idx} 
                                  style={{ 
                                    display: "flex", 
                                    alignItems: "center", 
                                    justifyContent: "space-between",
                                    padding: "8px 12px",
                                    background: ans !== -1 ? "rgba(0, 185, 242, 0.04)" : "rgba(255,255,255,0.01)",
                                    border: "1px solid",
                                    borderColor: ans !== -1 ? "rgba(0, 185, 242, 0.15)" : "rgba(255,255,255,0.03)",
                                    borderRadius: "8px",
                                    transition: "all 0.2s ease"
                                  }}
                                >
                                  <span style={{ fontSize: "0.82rem", fontWeight: "700", color: ans !== -1 ? "var(--gcu-sky)" : "#fff" }}>
                                    문항 {idx + 1}
                                  </span>

                                  {/* Bubble option buttons 1, 2, 3, 4 */}
                                  <div style={{ display: "flex", gap: "10px" }}>
                                    {[0, 1, 2, 3].map((optIdx) => {
                                      const isMarked = ans === optIdx;
                                      return (
                                        <button
                                          key={optIdx}
                                          type="button"
                                          onClick={() => handleMarkOMR(idx, optIdx)}
                                          style={{
                                            width: "26px",
                                            height: "26px",
                                            borderRadius: "50%",
                                            border: "1px solid",
                                            borderColor: isMarked ? "var(--gcu-sky)" : "var(--text-muted)",
                                            background: isMarked ? "var(--gcu-sky)" : "transparent",
                                            color: isMarked ? "#060A1A" : "var(--text-secondary)",
                                            fontSize: "0.8rem",
                                            fontWeight: "700",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            transition: "all 0.2s ease"
                                          }}
                                        >
                                          {optIdx + 1}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Submission and quit action triggers */}
                        <div style={{ display: "flex", gap: "12px", borderTop: "1px solid var(--border-color)", paddingTop: "14px", marginTop: "4px" }}>
                          <button 
                            type="button"
                            onClick={handleQuitExam}
                            className="btn-secondary"
                            style={{ flex: 1, padding: "10px 0", fontSize: "0.85rem", cursor: "pointer" }}
                          >
                            ⚠️ {t("btnQuitExam")}
                          </button>
                          
                          <button 
                            type="button"
                            onClick={handleManualSubmit}
                            className="sim-start-btn"
                            style={{ flex: 1, padding: "10px 0", fontSize: "0.85rem", width: "auto" }}
                          >
                            ✔️ {t("btnSubmitExam")}
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              ) : (
                
                /* 3. Detailed grading scorecards feedback screen */
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <span style={{ fontSize: "3.5rem", display: "block", marginBottom: "16px" }}>🏆</span>
                  <h2 style={{ fontSize: "1.5rem", fontWeight: "800", color: "#fff", marginBottom: "8px" }}>
                    {t("examResultTitle")}
                  </h2>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", marginBottom: "28px" }}>
                    수고하셨습니다. 제출된 정답지와 OMR 카드 채점 결과 등급 분석표입니다.
                  </p>

                  <div 
                    className="glass-panel" 
                    style={{ 
                      padding: "32px", 
                      maxWidth: "480px", 
                      margin: "0 auto 36px auto", 
                      display: "flex", 
                      flexDirection: "column", 
                      gap: "14px",
                      border: "1px solid rgba(0, 185, 242, 0.25)"
                    }}
                  >
                    <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: "600" }}>
                      {t("examResultScore")}
                    </span>
                    <span style={{ fontSize: "3.5rem", fontWeight: "900", color: examScore >= 60 ? "var(--gcu-sky)" : "var(--gcu-orange)", fontFamily: "monospace" }}>
                      {examScore}점
                    </span>
                    
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
                      <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{t("examResultPass")}</span>
                      <span style={{ fontSize: "1.15rem", fontWeight: "700", color: examScore >= 30 ? "#57FF9A" : "var(--text-muted)" }}>
                        {examLevel}
                      </span>
                    </div>
                  </div>

                  {/* Review Sheets: Question-by-Question grading logs list */}
                  <div style={{ textAlign: "left", maxWidth: "680px", margin: "0 auto 36px auto" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: "700", color: "#fff", marginBottom: "16px" }}>🎯 문항별 마킹 결과 오답 노트</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {selectedAnswers.map((ans, idx) => {
                        const correctAns = activeExam.answerKey[idx];
                        const isCorrect = ans === correctAns;

                        return (
                          <div 
                            key={idx} 
                            className="glass-panel" 
                            style={{ 
                              padding: "16px 20px", 
                              borderLeft: isCorrect ? "4px solid var(--gcu-green)" : "4px solid var(--gcu-orange)",
                              background: "rgba(255,255,255,0.01)"
                            }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ fontWeight: "700", fontSize: "0.88rem", color: isCorrect ? "#57FF9A" : "var(--gcu-orange)" }}>
                                Q.{idx + 1} {isCorrect ? "✅ 정답 (Correct)" : "❌ 오답 (Incorrect)"}
                              </span>
                              
                              <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                                마킹한 답: {ans !== -1 ? ans + 1 : "미마킹"} | 실제 정답: <strong style={{ color: "var(--gcu-sky)" }}>{correctAns + 1}</strong>
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {activeExam.answerPdfDataUrl && (
                    <div 
                      className="glass-panel" 
                      style={{ 
                        padding: "20px 24px", 
                        maxWidth: "680px", 
                        margin: "0 auto 28px auto", 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center",
                        border: "1px solid rgba(247, 147, 30, 0.3)",
                        background: "linear-gradient(90deg, rgba(247,147,30,0.06) 0%, rgba(0,0,0,0.2) 100%)"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", textAlign: "left" }}>
                        <span style={{ fontSize: "1.8rem" }}>🔑</span>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <span style={{ fontSize: "0.88rem", fontWeight: "800", color: "#fff" }}>
                            {lang === "ko" ? "공식 모의고사 해설 및 해법 답안지" : "Official Mock Exam Answer & Explanation Guide"}
                          </span>
                          <span style={{ fontSize: "0.76rem", color: "var(--text-secondary)" }}>
                            파일명: {activeExam.answerPdfFileName || "explanation_guide.pdf"}
                          </span>
                        </div>
                      </div>

                      <a 
                        href={activeExam.answerPdfDataUrl}
                        download={activeExam.answerPdfFileName || "explanation_guide.pdf"}
                        className="btn-primary" 
                        style={{ 
                          padding: "10px 18px", 
                          fontSize: "0.8rem", 
                          borderRadius: "8px", 
                          color: "#060A1A", 
                          fontWeight: "700",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          boxShadow: "0 4px 10px rgba(247,147,30,0.3)"
                        }}
                      >
                        📥 {lang === "ko" ? "해설지 다운로드" : "Download PDF"}
                      </a>
                    </div>
                  )}

                  <button 
                    onClick={handleBackToLobby} 
                    className="sim-start-btn" 
                    style={{ padding: "12px 28px", width: "auto" }}
                  >
                    🔄 {t("examBtnBackToLobby")}
                  </button>
                </div>
              )}
              
            </div>
          )}

          {activeTab === "notices" && (
            <div>
              <div className="section-header" style={{ marginBottom: "20px" }}>
                <div className="section-title">
                  <span className="section-title-dot"></span>
                  <h2>{tLearn.academicTitle}</h2>
                </div>
              </div>
              <div className="feed-list">
                {ACADEMIC_NOTICES.map(item => {
                  const itemCat = item.category[lang as "ko" | "en" | "vn" | "mn"] || item.category.ko;
                  const itemTitle = item.title[lang as "ko" | "en" | "vn" | "mn"] || item.title.ko;
                  const itemDesc = item.desc[lang as "ko" | "en" | "vn" | "mn"] || item.desc.ko;

                  return (
                    <div key={item.id} className="glass-panel" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span className="feed-tag notice" style={{ padding: "3px 10px" }}>{itemCat}</span>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{item.date}</span>
                      </div>
                      <h4 style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--text-primary)" }}>{itemTitle}</h4>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>{itemDesc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Side Sticky Guide Dashboard */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <section className="glass-panel" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "14px", fontFamily: "var(--font-brand)", letterSpacing: "-0.5px" }}>{tLearn.sideTitle}</h3>
            <ul style={{ listStyle: "none", fontSize: "0.85rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "10px" }}>
              <li style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "8px" }}>
                {tLearn.sideReg}
              </li>
              <li style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "8px" }}>
                {tLearn.sideReq}
              </li>
              <li style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "8px" }}>
                {tLearn.sideGcu}
              </li>
              <li style={{ paddingTop: "8px" }}>
                <a 
                  href="https://www.topik.go.kr/TWGUID/TWGUID0010.do" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={(e) => {
                    if (!confirm(tLearn.sideConfirm)) {
                      e.preventDefault();
                    }
                  }}
                  className="btn-primary" 
                  style={{ 
                    width: "100%", 
                    justifyContent: "center", 
                    fontSize: "0.8rem", 
                    padding: "10px 12px", 
                    borderRadius: "8px",
                    color: "#060A1A",
                    display: "flex",
                    fontWeight: "700",
                    boxShadow: "0 4px 10px rgba(0, 185, 242, 0.2)",
                    textDecoration: "none"
                  }}
                >
                  {tLearn.sideLink}
                </a>
              </li>
            </ul>
          </section>

          <section className="widget-banner glass-panel" style={{ background: "linear-gradient(135deg, rgba(33, 64, 154, 0.2) 0%, rgba(114, 191, 68, 0.1) 100%)", border: "1px solid rgba(0, 185, 242, 0.2)" }}>
            <div className="widget-banner-icon">🗣️</div>
            <div className="widget-banner-title">{tLearn.tutorTitle}</div>
            <p className="widget-banner-desc" style={{ fontSize: "0.8rem" }}>
              {tLearn.tutorDesc}
            </p>
            <button onClick={() => alert(tLearn.tutorAlert)} className="widget-banner-btn" style={{ background: "var(--gcu-sky)" }}>
              {tLearn.tutorBtn}
            </button>
          </section>
        </div>
      </div>

      {/* 🔍 IBT 모의고사 상세 성적표 & 해설 모달 */}
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
              border: "1px solid var(--gcu-sky)",
              boxShadow: "0 24px 64px rgba(0, 185, 242, 0.35)",
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
                background: "rgba(255,255,255,0.02)",
                padding: "16px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.04)"
              }}
            >
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>{lang === "ko" ? "취득 점수" : "Your Score"}</span>
                <strong style={{ fontSize: "1.8rem", color: "var(--gcu-sky)", fontFamily: "monospace" }}>{selectedHistoryRecord.score}{lang === "ko" ? "점" : "%"}</strong>
              </div>
              <div style={{ textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>{lang === "ko" ? "TOPIK 평가 등급" : "TOPIK Evaluation"}</span>
                <strong style={{ fontSize: "1.05rem", color: "#57FF9A", display: "block", marginTop: "8px" }}>{selectedHistoryRecord.level}</strong>
              </div>
              <div style={{ textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginBottom: "4px" }}>{lang === "ko" ? "응시 일자" : "Exam Date"}</span>
                <span style={{ fontSize: "0.92rem", color: "var(--text-secondary)", display: "block", marginTop: "8px", fontWeight: "600" }}>{selectedHistoryRecord.date}</span>
              </div>
            </div>

            {/* 문항별 상세 채점 내역 */}
            <div style={{ marginBottom: "24px" }}>
              <h4 style={{ fontSize: "0.92rem", fontWeight: "700", color: "#fff", marginBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>🎯 {lang === "ko" ? "문항별 마킹 대조 분석표 (오답노트)" : "Question-by-Question Marking & Analysis"}</span>
                <span style={{ fontSize: "0.75rem", color: "var(--gcu-sky)" }}>
                  {lang === "ko" ? "정답률" : "Correct Rate"}: {selectedHistoryRecord.selectedAnswers?.filter((ans: number, idx: number) => ans === selectedHistoryRecord.answerKey[idx]).length} / {selectedHistoryRecord.questionCount}
                </span>
              </h4>
              
              <div style={{ maxHeight: "250px", overflowY: "auto", border: "1px solid var(--border-color)", borderRadius: "8px", background: "rgba(0,0,0,0.15)" }}>
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
                        <tr key={idx} style={{ background: isCorrect ? "rgba(87, 255, 154, 0.02)" : "rgba(255, 75, 75, 0.02)" }}>
                          <td style={{ padding: "8px 12px", textAlign: "center", fontWeight: "700", fontSize: "0.8rem" }}>Q.{idx + 1}</td>
                          <td style={{ padding: "8px 12px", textAlign: "center", fontSize: "0.8rem", color: ans === -1 ? "var(--text-muted)" : "inherit" }}>
                            {ans !== -1 ? `${ans + 1}${lang === "ko" ? "번" : ""}` : (lang === "ko" ? "미마킹" : "Unmarked")}
                          </td>
                          <td style={{ padding: "8px 12px", textAlign: "center", fontSize: "0.8rem", fontWeight: "700", color: "var(--gcu-sky)" }}>{correctAns + 1}{lang === "ko" ? "번" : ""}</td>
                          <td style={{ padding: "8px 12px", textAlign: "center", fontSize: "0.8rem" }}>
                            <span 
                              style={{ 
                                padding: "2px 8px", 
                                borderRadius: "4px", 
                                fontSize: "0.75rem", 
                                fontWeight: "700", 
                                background: isCorrect ? "rgba(87, 255, 154, 0.15)" : "rgba(255, 75, 75, 0.15)",
                                color: isCorrect ? "#57FF9A" : "#FF8888",
                                border: isCorrect ? "1px solid rgba(87,255,154,0.2)" : "1px solid rgba(255,75,75,0.2)"
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
                  border: "1px solid rgba(247, 147, 30, 0.3)",
                  background: "linear-gradient(90deg, rgba(247,147,30,0.06) 0%, rgba(0,0,0,0.25) 100%)",
                  marginBottom: "24px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", textAlign: "left" }}>
                  <span style={{ fontSize: "1.5rem" }}>🔑</span>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: "0.82rem", fontWeight: "800", color: "#fff" }}>
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
                    color: "#060A1A", 
                    fontWeight: "700",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    boxShadow: "0 4px 10px rgba(247,147,30,0.25)"
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
