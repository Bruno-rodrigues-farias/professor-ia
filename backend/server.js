import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const DB_FILE = "./db.json";

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://professor-ia-one.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

function loadDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(
      DB_FILE,
      JSON.stringify(
        {
          users: [],
          conversations: [],
          taskReviews: [],
        },
        null,
        2
      )
    );
  }

  const db = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));

  db.users ||= [];
  db.conversations ||= [];
  db.taskReviews ||= [];

  return db;
}

function saveDb(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

function normalizeUser(user) {
  user.xp = Number(user.xp || 0);
  user.streak = Number(user.streak || 0);
  user.level ||= "Iniciante";
  user.rank ||= "Bronze";
  user.completedTasks = Array.isArray(user.completedTasks)
    ? user.completedTasks
    : [];
  user.completedLessons = Array.isArray(user.completedLessons)
    ? user.completedLessons
    : [];

  return user;
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    xp: user.xp,
    streak: user.streak,
    level: user.level,
    rank: user.rank,
    completedTasks: user.completedTasks,
    completedLessons: user.completedLessons,
  };
}

function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
}

function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "Token não enviado." });
  }

  try {
    const token = header.replace("Bearer ", "");
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido." });
  }
}

app.get("/", (req, res) => {
  res.json({
    message: "English Mentor AI API online",
  });
});

/* AUTH */

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Nome, e-mail e senha são obrigatórios.",
      });
    }

    const db = loadDb();

    const exists = db.users.find((user) => user.email === email);

    if (exists) {
      return res.status(400).json({
        error: "E-mail já cadastrado.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = normalizeUser({
      id: uuid(),
      name,
      email,
      passwordHash,
      xp: 0,
      streak: 0,
      level: "Iniciante",
      rank: "Bronze",
      completedTasks: [],
      completedLessons: [],
      createdAt: new Date().toISOString(),
    });

    db.users.push(user);
    saveDb(db);

    const token = createToken(user);

    return res.json({
      token,
      user: publicUser(user),
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao cadastrar usuário.",
      details: error.message,
    });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const db = loadDb();

    const user = db.users.find((item) => item.email === email);

    if (!user) {
      return res.status(400).json({
        error: "Usuário não encontrado.",
      });
    }

    normalizeUser(user);

    const valid = await bcrypt.compare(password, user.passwordHash);

    if (!valid) {
      return res.status(400).json({
        error: "Senha incorreta.",
      });
    }

    saveDb(db);

    const token = createToken(user);

    return res.json({
      token,
      user: publicUser(user),
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao fazer login.",
      details: error.message,
    });
  }
});

/* PERFIL */

app.get("/api/me", auth, (req, res) => {
  try {
    const db = loadDb();

    const user = db.users.find((item) => item.id === req.user.id);

    if (!user) {
      return res.status(404).json({
        error: "Usuário não encontrado.",
      });
    }

    normalizeUser(user);

    const conversations = db.conversations.filter(
      (item) => item.userId === user.id
    );

    saveDb(db);

    return res.json({
      ...publicUser(user),
      conversationsCount: conversations.length,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao buscar perfil.",
      details: error.message,
    });
  }
});

/* TAREFAS */

const defaultTasks = [
  {
    id: 1,
    level: "Iniciante",
    title: "Escreva uma apresentação",
    instruction:
      "Escreva em inglês: Meu nome é [seu nome] e eu quero aprender inglês.",
    xp: 30,
  },
  {
    id: 2,
    level: "Iniciante",
    title: "Minha rotina",
    instruction: "Escreva em inglês uma frase sobre sua rotina matinal.",
    xp: 30,
  },
  {
    id: 3,
    level: "Básico",
    title: "Rotina diária",
    instruction: "Escreva uma frase usando: I usually...",
    xp: 40,
  },
  {
    id: 4,
    level: "Avançado",
    title: "Entrevista",
    instruction:
      "Responda em inglês: Tell me about your professional experience.",
    xp: 60,
  },
];

app.get("/api/tasks", auth, (req, res) => {
  const db = loadDb();

  const user = db.users.find((item) => item.id === req.user.id);

  if (!user) {
    return res.status(404).json({
      error: "Usuário não encontrado.",
    });
  }

  normalizeUser(user);
  saveDb(db);

  const tasks = defaultTasks.map((task) => ({
    ...task,
    completed: user.completedTasks.includes(task.id),
  }));

  return res.json(tasks);
});

app.post("/api/tasks/:id/complete", auth, (req, res) => {
  try {
    const db = loadDb();

    const user = db.users.find((item) => item.id === req.user.id);

    if (!user) {
      return res.status(404).json({
        error: "Usuário não encontrado.",
      });
    }

    normalizeUser(user);

    const taskId = Number(req.params.id);
    const xp = Number(req.body?.xp || 30);

    if (!user.completedTasks.includes(taskId)) {
      user.completedTasks.push(taskId);
      user.xp += xp;
      user.streak += 1;
    }

    saveDb(db);

    return res.json({
      message: "Tarefa concluída.",
      xp: user.xp,
      streak: user.streak,
      completedTasks: user.completedTasks,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao concluir tarefa.",
      details: error.message,
    });
  }
});

app.post("/api/tasks/:id/review", auth, (req, res) => {
  try {
    const db = loadDb();

    const user = db.users.find((item) => item.id === req.user.id);

    if (!user) {
      return res.status(404).json({
        error: "Usuário não encontrado.",
      });
    }

    normalizeUser(user);

    const taskId = Number(req.params.id);

    const review = {
      id: uuid(),
      userId: user.id,
      taskId,
      taskTitle: req.body.taskTitle,
      level: req.body.level,
      question: req.body.question,
      studentAnswer: req.body.studentAnswer,
      score: req.body.score,
      correctionPt: req.body.correctionPt,
      betterSentence: req.body.betterSentence,
      explanation: req.body.explanation,
      createdAt: new Date().toISOString(),
    };

    db.taskReviews.push(review);

    if (!user.completedTasks.includes(taskId)) {
      user.completedTasks.push(taskId);
      user.xp += Number(req.body.xp || 30);
      user.streak += 1;
    }

    saveDb(db);

    return res.json({
      review,
      xp: user.xp,
      streak: user.streak,
      completedTasks: user.completedTasks,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erro ao salvar revisão.",
      details: error.message,
    });
  }
});

app.get("/api/tasks/reviews", auth, (req, res) => {
  const db = loadDb();

  db.taskReviews ||= [];

  const reviews = db.taskReviews
    .filter((item) => item.userId === req.user.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return res.json(reviews);
});

/* AULAS */

app.post("/api/lessons/:id/complete", auth, (req, res) => {
  try {
    const db = loadDb();

    const user = db.users.find((item) => item.id === req.user.id);

    if (!user) {
      return res.status(404).json({
        error: "Usuário não encontrado.",
      });
    }

    normalizeUser(user);

    const lessonId = Number(req.params.id);
    const xp = Number(req.body?.xp || 80);

    const alreadyCompleted = user.completedLessons.includes(lessonId);

    if (!alreadyCompleted) {
      user.completedLessons.push(lessonId);
      user.xp += xp;
      user.streak += 1;
    }

    saveDb(db);

    return res.json({
      message: alreadyCompleted ? "Aula já concluída." : "Aula concluída.",
      xp: user.xp,
      streak: user.streak,
      completedLessons: user.completedLessons,
      completedTasks: user.completedTasks,
      level: user.level,
      rank: user.rank,
    });
  } catch (error) {
    console.error("Erro ao concluir aula:", error);

    return res.status(500).json({
      error: "Erro ao concluir aula.",
      details: error.message,
    });
  }
});

/* CONVERSAS */

app.get("/api/conversations", auth, (req, res) => {
  const db = loadDb();

  const conversations = db.conversations
    .filter((item) => item.userId === req.user.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return res.json(conversations);
});

app.post("/api/conversations", auth, (req, res) => {
  const db = loadDb();

  const conversation = {
    id: uuid(),
    userId: req.user.id,
    title: req.body.title || "Conversa com IA",
    summary: req.body.summary || "",
    correction: req.body.correction || "",
    score: req.body.score || 0,
    createdAt: new Date().toISOString(),
  };

  db.conversations.push(conversation);
  saveDb(db);

  return res.json(conversation);
});

app.delete("/api/conversations", auth, (req, res) => {
  const db = loadDb();

  db.conversations = db.conversations.filter(
    (item) => item.userId !== req.user.id
  );

  saveDb(db);

  return res.json({
    message: "Histórico apagado.",
  });
});

/* RANKING */

app.get("/api/ranking", auth, (req, res) => {
  const db = loadDb();

  db.users.forEach(normalizeUser);
  saveDb(db);

  const ranking = db.users
    .map((user) => ({
      id: user.id,
      name: user.name,
      xp: user.xp,
      rank: user.rank,
      streak: user.streak,
    }))
    .sort((a, b) => b.xp - a.xp);

  return res.json(ranking);
});

/* ÁUDIO */

app.post("/api/audio/corrigir", auth, upload.single("audio"), async (req, res) => {
  try {
    const { expected = "", level = "Iniciante" } = req.body;

    if (!req.file) {
      return res.status(400).json({
        error: "Nenhum áudio enviado.",
      });
    }

    const audioBase64 = req.file.buffer.toString("base64");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
Você é um professor de inglês para brasileiros.

O aluno deveria falar:
"${expected}"

Nível:
${level}

Analise o áudio.
Transcreva o que o aluno falou.
Corrija em português.
Mostre como deveria falar em inglês.
Dê nota de pronúncia de 0 a 100.

Responda somente JSON válido:
{
  "transcription": "",
  "score": 0,
  "correctionPt": "",
  "betterSentence": "",
  "explanation": ""
}
              `,
            },
            {
              inlineData: {
                mimeType: req.file.mimetype,
                data: audioBase64,
              },
            },
          ],
        },
      ],
    });

    const clean = response.text
      .replace("```json", "")
      .replace("```", "")
      .trim();

    return res.json(JSON.parse(clean));
  } catch (error) {
    console.error("Erro ao corrigir áudio:", error);

    return res.status(500).json({
      error: "Erro ao corrigir áudio.",
      details: error.message,
    });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});