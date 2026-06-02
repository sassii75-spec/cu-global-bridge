import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src", "app", "api", "exams", "exams-db.json");

// Default initial exam
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

async function ensureDbExists() {
  try {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    try {
      await fs.access(DB_PATH);
    } catch {
      await fs.writeFile(DB_PATH, JSON.stringify(DEFAULT_EXAMS, null, 2), "utf-8");
    }
  } catch (error) {
    console.error("DB initialization error:", error);
  }
}

export async function GET() {
  try {
    await ensureDbExists();
    const data = await fs.readFile(DB_PATH, "utf-8");
    const exams = JSON.parse(data);
    return NextResponse.json(exams);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to load exams" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureDbExists();
    const newExam = await req.json();
    
    // Validations
    if (!newExam.title || !newExam.title.ko) {
      return NextResponse.json({ error: "Korean exam title is required" }, { status: 400 });
    }

    const data = await fs.readFile(DB_PATH, "utf-8");
    const exams = JSON.parse(data);

    const existingIdx = exams.findIndex((ex: any) => ex.id === newExam.id);
    if (existingIdx !== -1) {
      exams[existingIdx] = {
        ...exams[existingIdx],
        ...newExam
      };
    } else {
      const examToAdd = {
        ...newExam,
        id: newExam.id || `exam-${Date.now()}`,
        createdDate: new Date().toISOString().split("T")[0]
      };
      exams.unshift(examToAdd);
    }

    await fs.writeFile(DB_PATH, JSON.stringify(exams, null, 2), "utf-8");
    return NextResponse.json({ success: true, exams });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to save exam" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await ensureDbExists();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Exam ID is required" }, { status: 400 });
    }

    const data = await fs.readFile(DB_PATH, "utf-8");
    let exams = JSON.parse(data);

    const examToDelete = exams.find((ex: any) => ex.id === id);
    if (examToDelete) {
      const uploadsDir = path.join(process.cwd(), "public");
      for (const key of ["pdfDataUrl", "answerPdfDataUrl", "mp3DataUrl"]) {
        const fileUrl = examToDelete[key];
        if (fileUrl && fileUrl.startsWith("/uploads/")) {
          try {
            const absolutePath = path.join(uploadsDir, fileUrl);
            await fs.unlink(absolutePath);
          } catch (e) {
            console.error(`Failed to delete file ${fileUrl}:`, e);
          }
        }
      }

      // Cleanup multi-audio tracks
      if (examToDelete.audioTracks && Array.isArray(examToDelete.audioTracks)) {
        for (const track of examToDelete.audioTracks) {
          const fileUrl = track.url;
          if (fileUrl && fileUrl.startsWith("/uploads/")) {
            try {
              const absolutePath = path.join(uploadsDir, fileUrl);
              await fs.unlink(absolutePath);
            } catch (e) {
              console.error(`Failed to delete track file ${fileUrl}:`, e);
            }
          }
        }
      }
    }

    exams = exams.filter((ex: any) => ex.id !== id);
    await fs.writeFile(DB_PATH, JSON.stringify(exams, null, 2), "utf-8");
    return NextResponse.json({ success: true, exams });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete exam" }, { status: 500 });
  }
}
