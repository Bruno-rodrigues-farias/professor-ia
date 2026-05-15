export const levels = ["Iniciante", "Básico", "Avançado"];

/* =========================
   TAREFAS DIÁRIAS
========================= */

export const dailyTasks = [
  {
    id: 1,
    level: "Iniciante",
    type: "text",
    title: "Escreva uma apresentação",
    instruction:
      "Escreva em inglês: Meu nome é Bruno e eu quero aprender inglês.",
    xp: 30,
  },

  {
    id: 2,
    level: "Iniciante",
    type: "audio",
    title: "Pratique uma frase",
    instruction: "Fale em inglês: My name is Bruno.",
    xp: 30,
  },

  {
    id: 3,
    level: "Básico",
    type: "text",
    title: "Monte uma frase no presente",
    instruction: "Escreva uma frase usando: I usually...",
    xp: 40,
  },

  {
    id: 4,
    level: "Básico",
    type: "audio",
    title: "Pronúncia de rotina",
    instruction:
      "Fale em inglês: I usually study English at night.",
    xp: 40,
  },

  {
    id: 5,
    level: "Avançado",
    type: "text",
    title: "Resposta profissional",
    instruction:
      "Escreva uma resposta para entrevista: Tell me about yourself.",
    xp: 60,
  },

  {
    id: 6,
    level: "Avançado",
    type: "audio",
    title: "Speaking avançado",
    instruction:
      "Fale por 20 segundos sobre seus objetivos profissionais.",
    xp: 60,
  },
];

/* =========================
   AULAS
========================= */

export const lessons = [
  {
    id: 1,
    level: "Iniciante",
    title: "Verbo To Be",

    questions: [
      {
        id: 1,
        type: "text",

        question: "Qual frase está correta?",

        options: [
          "I have 28 years old",
          "I am 28 years old",
          "I has 28 years old",
          "I be 28 years old",
        ],

        answer: "B",

        explanation:
          "Para idade em inglês usamos 'I am', não 'I have'.",
      },

      {
        id: 2,
        type: "pronunciation",

        question: "Pronuncie: I am learning English.",

        expected: "I am learning English.",

        explanation:
          "Preste atenção na pronúncia da palavra 'learning'.",
      },
    ],
  },

  {
    id: 2,
    level: "Básico",
    title: "Rotina diária",

    questions: [
      {
        id: 1,
        type: "text",

        question: "Escolha a frase correta:",

        options: [
          "I wake up at seven",
          "I wakes up at seven",
          "I waking up at seven",
          "I wake at seven up",
        ],

        answer: "A",

        explanation:
          "Com 'I', usamos o verbo base: I wake up.",
      },

      {
        id: 2,
        type: "pronunciation",

        question:
          "Pronuncie: I usually study English at night.",

        expected:
          "I usually study English at night.",

        explanation:
          "A palavra 'usually' precisa soar natural.",
      },
    ],
  },

  {
    id: 3,
    level: "Avançado",
    title: "Entrevista de emprego",

    questions: [
      {
        id: 1,
        type: "text",

        question:
          "Qual resposta soa mais profissional?",

        options: [
          "I am good worker",
          "I have experience in software development",
          "I work very much good",
          "I like job",
        ],

        answer: "B",

        explanation:
          "A opção B é mais profissional e natural.",
      },

      {
        id: 2,
        type: "pronunciation",

        question:
          "Pronuncie: I have experience working with software development.",

        expected:
          "I have experience working with software development.",

        explanation:
          "Pronuncie claramente 'experience' e 'development'.",
      },
    ],
  },
];

/* =========================
   COMPATIBILIDADE ANTIGA
========================= */

export const tarefas = dailyTasks;
export const aulas = lessons;

/* =========================
   VOCABULÁRIO
========================= */

export const vocabulario = [
  {
    palavra: "Hello",
    traducao: "Olá",
    exemplo: "Hello, my name is Bruno.",
    categoria: "Saudações",
  },

  {
    palavra: "Improve",
    traducao: "Melhorar",
    exemplo: "I want to improve my English.",
    categoria: "Estudo",
  },

  {
    palavra: "Usually",
    traducao: "Normalmente",
    exemplo: "I usually study at night.",
    categoria: "Rotina",
  },

  {
    palavra: "Experience",
    traducao: "Experiência",
    exemplo: "I have experience with Java.",
    categoria: "Trabalho",
  },
];

/* =========================
   CONQUISTAS
========================= */

export const achievements = [
  {
    id: "first_lesson",
    titulo: "Primeira aula",
    descricao: "Você concluiu sua primeira aula.",
  },

  {
    id: "daily_master",
    titulo: "Missões do dia",
    descricao: "Você completou todas as tarefas diárias.",
  },

  {
    id: "five_conversations",
    titulo: "Conversador",
    descricao: "Você fez 5 conversas com a IA.",
  },

  {
    id: "audio_master",
    titulo: "Mestre da pronúncia",
    descricao: "Você completou 10 exercícios de speaking.",
  },

  {
    id: "advanced_student",
    titulo: "Aluno avançado",
    descricao: "Você concluiu aulas avançadas.",
  },
];

/* =========================
   RANKING
========================= */

export const ranking = [
  {
    posicao: 1,
    nome: "Ana",
    xp: 2840,
    rank: "Diamond",
    streak: 18,
  },

  {
    posicao: 2,
    nome: "Carlos",
    xp: 2310,
    rank: "Gold",
    streak: 12,
  },

  {
    posicao: 3,
    nome: "Bruno",
    xp: 1240,
    rank: "Silver",
    streak: 5,
  },
];