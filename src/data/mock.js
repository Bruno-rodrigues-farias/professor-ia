export const levels = ["Iniciante", "Básico", "Avançado"];

export const dailyTasks = [
  {
    id: 1,
    level: "Iniciante",
    type: "text",
    title: "Escreva uma apresentação",
    instruction: "Escreva em inglês: Meu nome é [seu nome] e eu quero aprender inglês.",
    xp: 30,
  },
  {
    id: 2,
    level: "Iniciante",
    type: "text",
    title: "Minha rotina",
    instruction: "Escreva em inglês uma frase sobre sua rotina matinal.",
    xp: 30,
  },
  {
    id: 3,
    level: "Básico",
    type: "text",
    title: "Rotina diária",
    instruction: "Escreva uma frase usando: I usually...",
    xp: 40,
  },
  {
    id: 4,
    level: "Avançado",
    type: "text",
    title: "Entrevista",
    instruction: "Responda em inglês: Tell me about your professional experience.",
    xp: 60,
  },
];

// Função para embaralhar array
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Função para embaralhar as opções das perguntas
function shuffleOptions(question) {
  if (question.options) {
    return {
      ...question,
      options: shuffleArray([...question.options])
    };
  }
  return question;
}

// CARDS E PERGUNTAS DO NÍVEL INICIANTE (15 cards)
const inicianteCards = [
  {
    title: "Saudações",
    subtitle: "Aprenda a cumprimentar",
    icon: "👋",
    color: "#58cc02",
    questions: [
      {
        choice: {
          question: "Como dizer 'Olá' em inglês?",
          options: ["Bye", "Hello", "Thanks", "Sorry"],
          answer: "Hello",
          explanation: "Hello é a saudação mais comum.",
        },
        translate: {
          phrasePt: "Olá, como você está?",
          words: ["Hello", "how", "are", "you"],
          answer: ["Hello", "how", "are", "you"],
        },
        listen: {
          phrase: "hello",
          options: ["hello", "yellow", "below", "help"],
          answer: "hello",
        },
        pronunciation: "Hello, nice to meet you!",
      },
      {
        choice: {
          question: "Como dizer 'Bom dia'?",
          options: ["Good night", "Good morning", "Good afternoon", "Good evening"],
          answer: "Good morning",
          explanation: "Good morning é usado até o meio-dia.",
        },
        translate: {
          phrasePt: "Boa noite",
          words: ["Good", "night", "evening", "morning"],
          answer: ["Good", "night"],
        },
        listen: {
          phrase: "good morning",
          options: ["good morning", "good evening", "good night", "good day"],
          answer: "good morning",
        },
        pronunciation: "Good morning, everyone!",
      },
      {
        choice: {
          question: "Como dizer 'Tchau' em inglês?",
          options: ["Hello", "Goodbye", "Thanks", "Please"],
          answer: "Goodbye",
          explanation: "Goodbye é a despedida formal.",
        },
        translate: {
          phrasePt: "Até logo",
          words: ["See", "you", "later", "goodbye"],
          answer: ["See", "you", "later"],
        },
        listen: {
          phrase: "goodbye",
          options: ["goodbye", "good boy", "good day", "good bay"],
          answer: "goodbye",
        },
        pronunciation: "Goodbye, have a nice day!",
      },
    ],
  },
  {
    title: "Números",
    subtitle: "Aprenda os números",
    icon: "🔢",
    color: "#ffc107",
    questions: [
      {
        choice: {
          question: "Como se diz o número 1 em inglês?",
          options: ["Two", "One", "Three", "Four"],
          answer: "One",
          explanation: "One é o número 1.",
        },
        translate: {
          phrasePt: "Eu tenho um carro",
          words: ["I", "have", "one", "car"],
          answer: ["I", "have", "one", "car"],
        },
        listen: {
          phrase: "one",
          options: ["one", "won", "on", "own"],
          answer: "one",
        },
        pronunciation: "I have one brother.",
      },
      {
        choice: {
          question: "Como se diz o número 10 em inglês?",
          options: ["Ten", "Twenty", "Twelve", "Two"],
          answer: "Ten",
          explanation: "Ten é o número 10.",
        },
        translate: {
          phrasePt: "Eu tenho dez dedos",
          words: ["I", "have", "ten", "fingers"],
          answer: ["I", "have", "ten", "fingers"],
        },
        listen: {
          phrase: "ten",
          options: ["ten", "tan", "tin", "tent"],
          answer: "ten",
        },
        pronunciation: "I have ten fingers.",
      },
      {
        choice: {
          question: "Como se diz o número 100 em inglês?",
          options: ["Hundred", "Thousand", "Million", "Ten"],
          answer: "Hundred",
          explanation: "Hundred é 100.",
        },
        translate: {
          phrasePt: "Cem reais",
          words: ["One", "hundred", "reais", "dollars"],
          answer: ["One", "hundred", "reais"],
        },
        listen: {
          phrase: "hundred",
          options: ["hundred", "hungred", "hundread", "hunderd"],
          answer: "hundred",
        },
        pronunciation: "One hundred dollars.",
      },
    ],
  },
  {
    title: "Cores",
    subtitle: "Aprenda as cores",
    icon: "🎨",
    color: "#ff4b4b",
    questions: [
      {
        choice: {
          question: "Qual é a cor 'azul' em inglês?",
          options: ["Red", "Blue", "Green", "Yellow"],
          answer: "Blue",
          explanation: "Blue é a cor do céu.",
        },
        translate: {
          phrasePt: "O céu é azul",
          words: ["The", "sky", "is", "blue"],
          answer: ["The", "sky", "is", "blue"],
        },
        listen: {
          phrase: "blue",
          options: ["blue", "blow", "bloom", "ball"],
          answer: "blue",
        },
        pronunciation: "The sky is blue.",
      },
      {
        choice: {
          question: "Qual é a cor 'vermelho' em inglês?",
          options: ["Red", "Blue", "Green", "Yellow"],
          answer: "Red",
          explanation: "Red é a cor do fogo.",
        },
        translate: {
          phrasePt: "A maçã é vermelha",
          words: ["The", "apple", "is", "red"],
          answer: ["The", "apple", "is", "red"],
        },
        listen: {
          phrase: "red",
          options: ["red", "read", "rid", "rod"],
          answer: "red",
        },
        pronunciation: "The apple is red.",
      },
      {
        choice: {
          question: "Qual é a cor 'verde' em inglês?",
          options: ["Red", "Blue", "Green", "Yellow"],
          answer: "Green",
          explanation: "Green é a cor da natureza.",
        },
        translate: {
          phrasePt: "A grama é verde",
          words: ["The", "grass", "is", "green"],
          answer: ["The", "grass", "is", "green"],
        },
        listen: {
          phrase: "green",
          options: ["green", "grain", "grean", "grin"],
          answer: "green",
        },
        pronunciation: "The grass is green.",
      },
    ],
  },
  {
    title: "Família",
    subtitle: "Membros da família",
    icon: "👨‍👩‍👧",
    color: "#ff9600",
    questions: [
      {
        choice: {
          question: "Como dizer 'mãe' em inglês?",
          options: ["Father", "Mother", "Brother", "Sister"],
          answer: "Mother",
          explanation: "Mother significa mãe.",
        },
        translate: {
          phrasePt: "Minha mãe é linda",
          words: ["My", "mother", "is", "beautiful"],
          answer: ["My", "mother", "is", "beautiful"],
        },
        listen: {
          phrase: "mother",
          options: ["mother", "mutter", "moth", "mudder"],
          answer: "mother",
        },
        pronunciation: "I love my mother.",
      },
      {
        choice: {
          question: "Como dizer 'pai' em inglês?",
          options: ["Mother", "Father", "Brother", "Sister"],
          answer: "Father",
          explanation: "Father significa pai.",
        },
        translate: {
          phrasePt: "Meu pai trabalha muito",
          words: ["My", "father", "works", "hard"],
          answer: ["My", "father", "works", "hard"],
        },
        listen: {
          phrase: "father",
          options: ["father", "farther", "fader", "fazer"],
          answer: "father",
        },
        pronunciation: "My father is strong.",
      },
      {
        choice: {
          question: "Como dizer 'irmão' em inglês?",
          options: ["Sister", "Brother", "Cousin", "Uncle"],
          answer: "Brother",
          explanation: "Brother é irmão homem.",
        },
        translate: {
          phrasePt: "Eu tenho um irmão",
          words: ["I", "have", "a", "brother"],
          answer: ["I", "have", "a", "brother"],
        },
        listen: {
          phrase: "brother",
          options: ["brother", "bother", "bruder", "broth"],
          answer: "brother",
        },
        pronunciation: "My brother is funny.",
      },
    ],
  },
  {
    title: "Animais",
    subtitle: "Bichos e pets",
    icon: "🐕",
    color: "#1cb0f6",
    questions: [
      {
        choice: {
          question: "Como dizer 'cachorro' em inglês?",
          options: ["Cat", "Dog", "Bird", "Fish"],
          answer: "Dog",
          explanation: "Dog é o animal que late.",
        },
        translate: {
          phrasePt: "Eu tenho um cachorro",
          words: ["I", "have", "a", "dog"],
          answer: ["I", "have", "a", "dog"],
        },
        listen: {
          phrase: "dog",
          options: ["dog", "dug", "dig", "dock"],
          answer: "dog",
        },
        pronunciation: "My dog is friendly.",
      },
      {
        choice: {
          question: "Como dizer 'gato' em inglês?",
          options: ["Dog", "Cat", "Rat", "Bat"],
          answer: "Cat",
          explanation: "Cat é o animal que mia.",
        },
        translate: {
          phrasePt: "O gato está dormindo",
          words: ["The", "cat", "is", "sleeping"],
          answer: ["The", "cat", "is", "sleeping"],
        },
        listen: {
          phrase: "cat",
          options: ["cat", "cut", "cot", "kit"],
          answer: "cat",
        },
        pronunciation: "The cat is black.",
      },
      {
        choice: {
          question: "Como dizer 'pássaro' em inglês?",
          options: ["Dog", "Cat", "Bird", "Fish"],
          answer: "Bird",
          explanation: "Bird é o animal que voa.",
        },
        translate: {
          phrasePt: "O pássaro voa",
          words: ["The", "bird", "flies"],
          answer: ["The", "bird", "flies"],
        },
        listen: {
          phrase: "bird",
          options: ["bird", "bard", "bord", "berd"],
          answer: "bird",
        },
        pronunciation: "The bird sings.",
      },
    ],
  },
  {
    title: "Comidas",
    subtitle: "Alimentos básicos",
    icon: "🍔",
    color: "#ce82ff",
    questions: [
      {
        choice: {
          question: "Como dizer 'água' em inglês?",
          options: ["Food", "Water", "Bread", "Apple"],
          answer: "Water",
          explanation: "Water é líquido para beber.",
        },
        translate: {
          phrasePt: "Eu quero água",
          words: ["I", "want", "water"],
          answer: ["I", "want", "water"],
        },
        listen: {
          phrase: "water",
          options: ["water", "worker", "weather", "waiter"],
          answer: "water",
        },
        pronunciation: "Can I have some water?",
      },
      {
        choice: {
          question: "Como dizer 'pão' em inglês?",
          options: ["Bread", "Water", "Milk", "Juice"],
          answer: "Bread",
          explanation: "Bread é feito de farinha.",
        },
        translate: {
          phrasePt: "Eu como pão no café da manhã",
          words: ["I", "eat", "bread", "for", "breakfast"],
          answer: ["I", "eat", "bread", "for", "breakfast"],
        },
        listen: {
          phrase: "bread",
          options: ["bread", "bred", "braid", "brad"],
          answer: "bread",
        },
        pronunciation: "I like fresh bread.",
      },
      {
        choice: {
          question: "Como dizer 'maçã' em inglês?",
          options: ["Orange", "Apple", "Banana", "Grape"],
          answer: "Apple",
          explanation: "Apple é uma fruta vermelha ou verde.",
        },
        translate: {
          phrasePt: "Eu como uma maçã por dia",
          words: ["I", "eat", "an", "apple", "every", "day"],
          answer: ["I", "eat", "an", "apple", "every", "day"],
        },
        listen: {
          phrase: "apple",
          options: ["apple", "april", "ape", "able"],
          answer: "apple",
        },
        pronunciation: "An apple a day keeps the doctor away.",
      },
    ],
  },
  {
    title: "Profissões",
    subtitle: "Trabalhos e carreiras",
    icon: "👨‍💼",
    color: "#ffc107",
    questions: [
      {
        choice: {
          question: "Como dizer 'médico' em inglês?",
          options: ["Teacher", "Doctor", "Engineer", "Lawyer"],
          answer: "Doctor",
          explanation: "Doctor cuida da saúde.",
        },
        translate: {
          phrasePt: "O médico me ajudou",
          words: ["The", "doctor", "helped", "me"],
          answer: ["The", "doctor", "helped", "me"],
        },
        listen: {
          phrase: "doctor",
          options: ["doctor", "docker", "dactor", "docter"],
          answer: "doctor",
        },
        pronunciation: "I need to see a doctor.",
      },
      {
        choice: {
          question: "Como dizer 'professor' em inglês?",
          options: ["Doctor", "Lawyer", "Teacher", "Engineer"],
          answer: "Teacher",
          explanation: "Teacher ensina os alunos.",
        },
        translate: {
          phrasePt: "O professor explica a lição",
          words: ["The", "teacher", "explains", "the", "lesson"],
          answer: ["The", "teacher", "explains", "the", "lesson"],
        },
        listen: {
          phrase: "teacher",
          options: ["teacher", "teecher", "tteacher", "teachar"],
          answer: "teacher",
        },
        pronunciation: "My teacher is kind.",
      },
      {
        choice: {
          question: "Como dizer 'engenheiro' em inglês?",
          options: ["Doctor", "Teacher", "Engineer", "Nurse"],
          answer: "Engineer",
          explanation: "Engineer projeta e constrói.",
        },
        translate: {
          phrasePt: "Meu pai é engenheiro",
          words: ["My", "father", "is", "an", "engineer"],
          answer: ["My", "father", "is", "an", "engineer"],
        },
        listen: {
          phrase: "engineer",
          options: ["engineer", "enginear", "engenier", "enjineer"],
          answer: "engineer",
        },
        pronunciation: "She works as an engineer.",
      },
    ],
  },
  {
    title: "Casa",
    subtitle: "Cômodos e objetos",
    icon: "🏠",
    color: "#58cc02",
    questions: [
      {
        choice: {
          question: "Como dizer 'casa' em inglês?",
          options: ["House", "Home", "Building", "Apartment"],
          answer: "House",
          explanation: "House é onde moramos.",
        },
        translate: {
          phrasePt: "Minha casa é grande",
          words: ["My", "house", "is", "big"],
          answer: ["My", "house", "is", "big"],
        },
        listen: {
          phrase: "house",
          options: ["house", "howse", "hous", "hose"],
          answer: "house",
        },
        pronunciation: "I love my house.",
      },
      {
        choice: {
          question: "Como dizer 'quarto' em inglês?",
          options: ["Kitchen", "Bathroom", "Bedroom", "Living room"],
          answer: "Bedroom",
          explanation: "Bedroom é onde dormimos.",
        },
        translate: {
          phrasePt: "Meu quarto é confortável",
          words: ["My", "bedroom", "is", "comfortable"],
          answer: ["My", "bedroom", "is", "comfortable"],
        },
        listen: {
          phrase: "bedroom",
          options: ["bedroom", "bed room", "badroom", "bedrum"],
          answer: "bedroom",
        },
        pronunciation: "My bedroom is clean.",
      },
      {
        choice: {
          question: "Como dizer 'cozinha' em inglês?",
          options: ["Bedroom", "Bathroom", "Kitchen", "Living room"],
          answer: "Kitchen",
          explanation: "Kitchen é onde cozinhamos.",
        },
        translate: {
          phrasePt: "A cozinira está limpa",
          words: ["The", "kitchen", "is", "clean"],
          answer: ["The", "kitchen", "is", "clean"],
        },
        listen: {
          phrase: "kitchen",
          options: ["kitchen", "kichen", "kitchin", "kitchan"],
          answer: "kitchen",
        },
        pronunciation: "I cook in the kitchen.",
      },
    ],
  },
  {
    title: "Roupas",
    subtitle: "Vestuário básico",
    icon: "👕",
    color: "#ff4b4b",
    questions: [
      {
        choice: {
          question: "Como dizer 'camisa' em inglês?",
          options: ["Shirt", "Pants", "Shoes", "Hat"],
          answer: "Shirt",
          explanation: "Shirt é usada na parte de cima.",
        },
        translate: {
          phrasePt: "Minha camisa é azul",
          words: ["My", "shirt", "is", "blue"],
          answer: ["My", "shirt", "is", "blue"],
        },
        listen: {
          phrase: "shirt",
          options: ["shirt", "shurt", "shert", "short"],
          answer: "shirt",
        },
        pronunciation: "I like your shirt.",
      },
      {
        choice: {
          question: "Como dizer 'calça' em inglês?",
          options: ["Shirt", "Pants", "Shoes", "Hat"],
          answer: "Pants",
          explanation: "Pants é usada nas pernas.",
        },
        translate: {
          phrasePt: "Minha calça é preta",
          words: ["My", "pants", "are", "black"],
          answer: ["My", "pants", "are", "black"],
        },
        listen: {
          phrase: "pants",
          options: ["pants", "pents", "paints", "panths"],
          answer: "pants",
        },
        pronunciation: "I need new pants.",
      },
      {
        choice: {
          question: "Como dizer 'sapatos' em inglês?",
          options: ["Shirt", "Pants", "Shoes", "Hat"],
          answer: "Shoes",
          explanation: "Shoes são usadas nos pés.",
        },
        translate: {
          phrasePt: "Meus sapatos são novos",
          words: ["My", "shoes", "are", "new"],
          answer: ["My", "shoes", "are", "new"],
        },
        listen: {
          phrase: "shoes",
          options: ["shoes", "shoos", "shuse", "shous"],
          answer: "shoes",
        },
        pronunciation: "Your shoes are nice.",
      },
    ],
  },
  {
    title: "Emoções",
    subtitle: "Sentimentos básicos",
    icon: "😊",
    color: "#ff9600",
    questions: [
      {
        choice: {
          question: "Como dizer 'feliz' em inglês?",
          options: ["Sad", "Happy", "Angry", "Tired"],
          answer: "Happy",
          explanation: "Happy é quando estamos contentes.",
        },
        translate: {
          phrasePt: "Estou feliz hoje",
          words: ["I", "am", "happy", "today"],
          answer: ["I", "am", "happy", "today"],
        },
        listen: {
          phrase: "happy",
          options: ["happy", "hapi", "happi", "hapy"],
          answer: "happy",
        },
        pronunciation: "I am very happy.",
      },
      {
        choice: {
          question: "Como dizer 'triste' em inglês?",
          options: ["Happy", "Sad", "Angry", "Tired"],
          answer: "Sad",
          explanation: "Sad é o oposto de feliz.",
        },
        translate: {
          phrasePt: "Ela está triste",
          words: ["She", "is", "sad"],
          answer: ["She", "is", "sad"],
        },
        listen: {
          phrase: "sad",
          options: ["sad", "sad", "sadd", "sade"],
          answer: "sad",
        },
        pronunciation: "He looks sad.",
      },
      {
        choice: {
          question: "Como dizer 'cansado' em inglês?",
          options: ["Happy", "Sad", "Angry", "Tired"],
          answer: "Tired",
          explanation: "Tired é quando precisamos descansar.",
        },
        translate: {
          phrasePt: "Estou cansado hoje",
          words: ["I", "am", "tired", "today"],
          answer: ["I", "am", "tired", "today"],
        },
        listen: {
          phrase: "tired",
          options: ["tired", "tierd", "tyred", "tird"],
          answer: "tired",
        },
        pronunciation: "I am tired after work.",
      },
    ],
  },
  {
    title: "Verbos",
    subtitle: "Ações do dia a dia",
    icon: "🏃",
    color: "#1cb0f6",
    questions: [
      {
        choice: {
          question: "Como dizer 'comer' em inglês?",
          options: ["Drink", "Sleep", "Eat", "Run"],
          answer: "Eat",
          explanation: "Eat é o ato de se alimentar.",
        },
        translate: {
          phrasePt: "Eu como pizza",
          words: ["I", "eat", "pizza"],
          answer: ["I", "eat", "pizza"],
        },
        listen: {
          phrase: "eat",
          options: ["eat", "it", "at", "eight"],
          answer: "eat",
        },
        pronunciation: "I eat breakfast at 7 AM.",
      },
      {
        choice: {
          question: "Como dizer 'beber' em inglês?",
          options: ["Eat", "Sleep", "Drink", "Run"],
          answer: "Drink",
          explanation: "Drink é ingerir líquidos.",
        },
        translate: {
          phrasePt: "Eu bebo água",
          words: ["I", "drink", "water"],
          answer: ["I", "drink", "water"],
        },
        listen: {
          phrase: "drink",
          options: ["drink", "drank", "drunk", "dring"],
          answer: "drink",
        },
        pronunciation: "Drink more water.",
      },
      {
        choice: {
          question: "Como dizer 'dormir' em inglês?",
          options: ["Eat", "Sleep", "Drink", "Run"],
          answer: "Sleep",
          explanation: "Sleep é descansar.",
        },
        translate: {
          phrasePt: "Eu durmo cedo",
          words: ["I", "sleep", "early"],
          answer: ["I", "sleep", "early"],
        },
        listen: {
          phrase: "sleep",
          options: ["sleep", "slip", "slap", "slop"],
          answer: "sleep",
        },
        pronunciation: "I need to sleep.",
      },
    ],
  },
];

// CARDS DO NÍVEL BÁSICO (15 cards diferentes)
const basicoCards = [
  {
    title: "Presente Simples",
    subtitle: "Rotinas e hábitos",
    icon: "⚡",
    color: "#1cb0f6",
    questions: [
      {
        choice: {
          question: "Qual frase está correta no presente simples?",
          options: ["She go to school", "She goes to school", "She going to school", "She is go to school"],
          answer: "She goes to school",
          explanation: "Para he/she/it adicionamos 'es'.",
        },
        translate: {
          phrasePt: "Ela estuda inglês todos os dias",
          words: ["She", "studies", "English", "every", "day"],
          answer: ["She", "studies", "English", "every", "day"],
        },
        listen: {
          phrase: "she goes to school",
          options: ["she goes to school", "she go to school", "she is go to school", "she going school"],
          answer: "she goes to school",
        },
        pronunciation: "She goes to school by bus.",
      },
      {
        choice: {
          question: "Como dizer 'Eu trabalho em casa'?",
          options: ["I work at home", "I works at home", "I working at home", "I am work at home"],
          answer: "I work at home",
          explanation: "Com I usamos o verbo sem 's'.",
        },
        translate: {
          phrasePt: "Eu acordo cedo todos os dias",
          words: ["I", "wake", "up", "early", "every", "day"],
          answer: ["I", "wake", "up", "early", "every", "day"],
        },
        listen: {
          phrase: "I work at home",
          options: ["I work at home", "I work in home", "I work home", "I work at house"],
          answer: "I work at home",
        },
        pronunciation: "I work from home on Mondays.",
      },
      {
        choice: {
          question: "Forma negativa de 'I like coffee'?",
          options: ["I don't like coffee", "I no like coffee", "I not like coffee", "I doesn't like coffee"],
          answer: "I don't like coffee",
          explanation: "Don't é usado com I/you/we/they.",
        },
        translate: {
          phrasePt: "Eles não gostam de estudar",
          words: ["They", "don't", "like", "to", "study"],
          answer: ["They", "don't", "like", "to", "study"],
        },
        listen: {
          phrase: "I don't like coffee",
          options: ["I don't like coffee", "I doesn't like coffee", "I not like coffee", "I no like coffee"],
          answer: "I don't like coffee",
        },
        pronunciation: "I don't like cold weather.",
      },
    ],
  },
  {
    title: "Passado Simples",
    subtitle: "Ações concluídas",
    icon: "📅",
    color: "#ffc107",
    questions: [
      {
        choice: {
          question: "Qual é o passado de 'go'?",
          options: ["Goed", "Went", "Gone", "Going"],
          answer: "Went",
          explanation: "Go é irregular: go - went - gone.",
        },
        translate: {
          phrasePt: "Eu fui ao cinema ontem",
          words: ["I", "went", "to", "the", "cinema", "yesterday"],
          answer: ["I", "went", "to", "the", "cinema", "yesterday"],
        },
        listen: {
          phrase: "I went to the cinema",
          options: ["I went to the cinema", "I go to cinema", "I gone to cinema", "I goed to cinema"],
          answer: "I went to the cinema",
        },
        pronunciation: "I went to the beach last week.",
      },
      {
        choice: {
          question: "Qual frase está no passado?",
          options: ["I watch TV", "I watched TV", "I watching TV", "I will watch TV"],
          answer: "I watched TV",
          explanation: "Verbos regulares recebem -ed.",
        },
        translate: {
          phrasePt: "Ela estudou para a prova",
          words: ["She", "studied", "for", "the", "test"],
          answer: ["She", "studied", "for", "the", "test"],
        },
        listen: {
          phrase: "I watched TV yesterday",
          options: ["I watched TV yesterday", "I watch TV yesterday", "I was watch TV", "I watching TV"],
          answer: "I watched TV yesterday",
        },
        pronunciation: "I watched a movie last night.",
      },
      {
        choice: {
          question: "Como dizer 'Eu comi pizza ontem'?",
          options: ["I eat pizza yesterday", "I ate pizza yesterday", "I eaten pizza yesterday", "I was eat pizza"],
          answer: "I ate pizza yesterday",
          explanation: "Eat - ate - eaten.",
        },
        translate: {
          phrasePt: "Nós visitamos nossos avós",
          words: ["We", "visited", "our", "grandparents"],
          answer: ["We", "visited", "our", "grandparents"],
        },
        listen: {
          phrase: "I ate pizza yesterday",
          options: ["I ate pizza yesterday", "I eat pizza yesterday", "I eaten pizza", "I was eat pizza"],
          answer: "I ate pizza yesterday",
        },
        pronunciation: "I ate breakfast at 8 AM.",
      },
    ],
  },
  {
    title: "Futuro com Will",
    subtitle: "Planos futuros",
    icon: "🔮",
    color: "#ff9600",
    questions: [
      {
        choice: {
          question: "Como dizer 'Eu vou viajar amanhã'?",
          options: ["I travel tomorrow", "I will travel tomorrow", "I going travel tomorrow", "I am travel tomorrow"],
          answer: "I will travel tomorrow",
          explanation: "Will + verbo indica futuro.",
        },
        translate: {
          phrasePt: "Ela vai comprar um carro",
          words: ["She", "will", "buy", "a", "car"],
          answer: ["She", "will", "buy", "a", "car"],
        },
        listen: {
          phrase: "I will travel tomorrow",
          options: ["I will travel tomorrow", "I travel tomorrow", "I going travel", "I am travel tomorrow"],
          answer: "I will travel tomorrow",
        },
        pronunciation: "I will call you later.",
      },
      {
        choice: {
          question: "Contração de 'will not'?",
          options: ["Willn't", "Won't", "Wouldn't", "Wonnt"],
          answer: "Won't",
          explanation: "Won't é a contração correta.",
        },
        translate: {
          phrasePt: "Eu não vou me atrasar",
          words: ["I", "won't", "be", "late"],
          answer: ["I", "won't", "be", "late"],
        },
        listen: {
          phrase: "I won't be late",
          options: ["I won't be late", "I willn't be late", "I not will be late", "I will not be late"],
          answer: "I won't be late",
        },
        pronunciation: "I won't forget your birthday.",
      },
      {
        choice: {
          question: "Como perguntar 'Você vai vir?'?",
          options: ["You will come?", "Will you come?", "You come will?", "Come you will?"],
          answer: "Will you come?",
          explanation: "Will + sujeito + verbo para perguntas.",
        },
        translate: {
          phrasePt: "O que você vai fazer amanhã?",
          words: ["What", "will", "you", "do", "tomorrow"],
          answer: ["What", "will", "you", "do", "tomorrow"],
        },
        listen: {
          phrase: "Will you come",
          options: ["Will you come", "You will come", "Do you will come", "Are you will come"],
          answer: "Will you come",
        },
        pronunciation: "Will you help me?",
      },
    ],
  },
  {
    title: "Presente Contínuo",
    subtitle: "Ações agora",
    icon: "🔄",
    color: "#58cc02",
    questions: [
      {
        choice: {
          question: "Qual frase está no presente contínuo?",
          options: ["I work now", "I am working now", "I works now", "I working now"],
          answer: "I am working now",
          explanation: "Am/is/are + verbo-ing.",
        },
        translate: {
          phrasePt: "Ela está estudando agora",
          words: ["She", "is", "studying", "right", "now"],
          answer: ["She", "is", "studying", "right", "now"],
        },
        listen: {
          phrase: "I am working now",
          options: ["I am working now", "I work now", "I working now", "I am work now"],
          answer: "I am working now",
        },
        pronunciation: "I am studying English.",
      },
      {
        choice: {
          question: "Como dizer 'O que você está fazendo?'?",
          options: ["What you do?", "What are you doing?", "What do you doing?", "What is you doing?"],
          answer: "What are you doing?",
          explanation: "Forma correta do presente contínuo.",
        },
        translate: {
          phrasePt: "Estou lendo um livro",
          words: ["I", "am", "reading", "a", "book"],
          answer: ["I", "am", "reading", "a", "book"],
        },
        listen: {
          phrase: "what are you doing",
          options: ["what are you doing", "what you are doing", "what do you doing", "what is you doing"],
          answer: "what are you doing",
        },
        pronunciation: "What are you doing right now?",
      },
    ],
  },
  {
    title: "Comparativos",
    subtitle: "Comparando coisas",
    icon: "📊",
    color: "#ce82ff",
    questions: [
      {
        choice: {
          question: "Qual é o comparativo de 'big'?",
          options: ["Bigger", "More big", "Biggest", "Big as"],
          answer: "Bigger",
          explanation: "Adjetivos curtos adicionam -er.",
        },
        translate: {
          phrasePt: "Meu carro é maior que o seu",
          words: ["My", "car", "is", "bigger", "than", "yours"],
          answer: ["My", "car", "is", "bigger", "than", "yours"],
        },
        listen: {
          phrase: "bigger",
          options: ["bigger", "biger", "biggar", "biguer"],
          answer: "bigger",
        },
        pronunciation: "This house is bigger than that one.",
      },
      {
        choice: {
          question: "Como dizer 'mais caro'?",
          options: ["Expensiver", "More expensive", "Most expensive", "Expensive more"],
          answer: "More expensive",
          explanation: "Adjetivos longos usam 'more'.",
        },
        translate: {
          phrasePt: "Este celular é mais caro",
          words: ["This", "cellphone", "is", "more", "expensive"],
          answer: ["This", "cellphone", "is", "more", "expensive"],
        },
        listen: {
          phrase: "more expensive",
          options: ["more expensive", "expensiver", "most expensive", "expensive more"],
          answer: "more expensive",
        },
        pronunciation: "Gold is more expensive than silver.",
      },
    ],
  },
  {
    title: "Verbos Modais",
    subtitle: "Can, could, should",
    icon: "🎯",
    color: "#1cb0f6",
    questions: [
      {
        choice: {
          question: "Como dizer 'Eu posso nadar'?",
          options: ["I can swim", "I can to swim", "I can swimming", "I am can swim"],
          answer: "I can swim",
          explanation: "Can + verbo base.",
        },
        translate: {
          phrasePt: "Ela sabe dançar",
          words: ["She", "can", "dance"],
          answer: ["She", "can", "dance"],
        },
        listen: {
          phrase: "I can swim",
          options: ["I can swim", "I can to swim", "I can swimming", "I am can swim"],
          answer: "I can swim",
        },
        pronunciation: "I can speak English.",
      },
      {
        choice: {
          question: "Como dizer 'Você deveria estudar'?",
          options: ["You should study", "You should to study", "You should studying", "You are should study"],
          answer: "You should study",
          explanation: "Should + verbo base para conselho.",
        },
        translate: {
          phrasePt: "Você deveria descansar",
          words: ["You", "should", "rest"],
          answer: ["You", "should", "rest"],
        },
        listen: {
          phrase: "you should study",
          options: ["you should study", "you should to study", "you should studying", "you are should study"],
          answer: "you should study",
        },
        pronunciation: "You should exercise more.",
      },
    ],
  },
  {
    title: "Preposições",
    subtitle: "In, on, at",
    icon: "📍",
    color: "#58cc02",
    questions: [
      {
        choice: {
          question: "Qual preposição usar para dias?",
          options: ["In", "On", "At", "For"],
          answer: "On",
          explanation: "On Monday, on Tuesday.",
        },
        translate: {
          phrasePt: "Eu trabalho na segunda-feira",
          words: ["I", "work", "on", "Monday"],
          answer: ["I", "work", "on", "Monday"],
        },
        listen: {
          phrase: "on Monday",
          options: ["on Monday", "in Monday", "at Monday", "for Monday"],
          answer: "on Monday",
        },
        pronunciation: "See you on Friday.",
      },
      {
        choice: {
          question: "Qual preposição usar para horas?",
          options: ["In", "On", "At", "For"],
          answer: "At",
          explanation: "At 5 o'clock, at noon.",
        },
        translate: {
          phrasePt: "A reunião é às 3 horas",
          words: ["The", "meeting", "is", "at", "3", "o'clock"],
          answer: ["The", "meeting", "is", "at", "3", "o'clock"],
        },
        listen: {
          phrase: "at 3 o'clock",
          options: ["at 3 o'clock", "in 3 o'clock", "on 3 o'clock", "for 3 o'clock"],
          answer: "at 3 o'clock",
        },
        pronunciation: "Let's meet at noon.",
      },
    ],
  },
  {
    title: "Advérbios",
    subtitle: "Sempre, nunca, às vezes",
    icon: "🕒",
    color: "#ffc107",
    questions: [
      {
        choice: {
          question: "Como dizer 'sempre' em inglês?",
          options: ["Never", "Sometimes", "Always", "Usually"],
          answer: "Always",
          explanation: "Always significa 100% do tempo.",
        },
        translate: {
          phrasePt: "Eu sempre tomo café da manhã",
          words: ["I", "always", "have", "breakfast"],
          answer: ["I", "always", "have", "breakfast"],
        },
        listen: {
          phrase: "always",
          options: ["always", "allways", "alway", "aways"],
          answer: "always",
        },
        pronunciation: "I always brush my teeth.",
      },
      {
        choice: {
          question: "Como dizer 'nunca' em inglês?",
          options: ["Always", "Sometimes", "Never", "Often"],
          answer: "Never",
          explanation: "Never significa 0% do tempo.",
        },
        translate: {
          phrasePt: "Eu nunca como carne",
          words: ["I", "never", "eat", "meat"],
          answer: ["I", "never", "eat", "meat"],
        },
        listen: {
          phrase: "never",
          options: ["never", "neve", "niver", "neverr"],
          answer: "never",
        },
        pronunciation: "I never lie.",
      },
    ],
  },
  {
    title: "Quantificadores",
    subtitle: "Much, many, a lot",
    icon: "📦",
    color: "#ff9600",
    questions: [
      {
        choice: {
          question: "Qual usar com substantivos contáveis?",
          options: ["Much", "Many", "A lot", "Little"],
          answer: "Many",
          explanation: "Many apples, many cars.",
        },
        translate: {
          phrasePt: "Muitas pessoas",
          words: ["Many", "people"],
          answer: ["Many", "people"],
        },
        listen: {
          phrase: "many people",
          options: ["many people", "much people", "a lot people", "many persons"],
          answer: "many people",
        },
        pronunciation: "There are many students.",
      },
      {
        choice: {
          question: "Qual usar com substantivos incontáveis?",
          options: ["Many", "Few", "Much", "Several"],
          answer: "Much",
          explanation: "Much water, much time.",
        },
        translate: {
          phrasePt: "Muito tempo",
          words: ["Much", "time"],
          answer: ["Much", "time"],
        },
        listen: {
          phrase: "much time",
          options: ["much time", "many time", "a lot time", "much times"],
          answer: "much time",
        },
        pronunciation: "I don't have much money.",
      },
    ],
  },
  {
    title: "Pronomes",
    subtitle: "I, you, he, she, it",
    icon: "👥",
    color: "#ce82ff",
    questions: [
      {
        choice: {
          question: "Qual pronome usamos para Maria?",
          options: ["He", "It", "She", "They"],
          answer: "She",
          explanation: "She para mulheres.",
        },
        translate: {
          phrasePt: "Ela é minha amiga",
          words: ["She", "is", "my", "friend"],
          answer: ["She", "is", "my", "friend"],
        },
        listen: {
          phrase: "she",
          options: ["she", "he", "it", "they"],
          answer: "she",
        },
        pronunciation: "She is a doctor.",
      },
      {
        choice: {
          question: "Qual pronome usamos para um livro?",
          options: ["He", "She", "It", "They"],
          answer: "It",
          explanation: "It para objetos e animais.",
        },
        translate: {
          phrasePt: "É um livro interessante",
          words: ["It", "is", "an", "interesting", "book"],
          answer: ["It", "is", "an", "interesting", "book"],
        },
        listen: {
          phrase: "it",
          options: ["it", "he", "she", "they"],
          answer: "it",
        },
        pronunciation: "It is raining outside.",
      },
    ],
  },
];

// CARDS DO NÍVEL AVANÇADO (15 cards diferentes)
const avancadoCards = [
  {
    title: "Entrevista de Emprego",
    subtitle: "Vocabulário profissional",
    icon: "💼",
    color: "#ce82ff",
    questions: [
      {
        choice: {
          question: "Melhor resposta para 'Tell me about yourself'?",
          options: [
            "I have 5 years of experience in marketing...",
            "My name is John, I like pizza",
            "I am from Brazil",
            "I am single and 30 years old",
          ],
          answer: "I have 5 years of experience in marketing...",
          explanation: "Foque na experiência profissional.",
        },
        translate: {
          phrasePt: "Tenho 5 anos de experiência em marketing digital",
          words: ["I", "have", "5", "years", "of", "experience", "in", "digital", "marketing"],
          answer: ["I", "have", "5", "years", "of", "experience", "in", "digital", "marketing"],
        },
        listen: {
          phrase: "I have experience in marketing",
          options: [
            "I have experience in marketing",
            "I have experience with marketing",
            "I am experience in marketing",
            "I have experienced marketing",
          ],
          answer: "I have experience in marketing",
        },
        pronunciation: "I have extensive experience in project management.",
      },
      {
        choice: {
          question: "Como perguntar sobre o salário?",
          options: [
            "What is the salary?",
            "How much money?",
            "What do you pay?",
            "Give me money?",
          ],
          answer: "What is the salary?",
          explanation: "Pergunta profissional sobre salário.",
        },
        translate: {
          phrasePt: "Qual é a faixa salarial para esta posição?",
          words: ["What", "is", "the", "salary", "range", "for", "this", "position"],
          answer: ["What", "is", "the", "salary", "range", "for", "this", "position"],
        },
        listen: {
          phrase: "what is the salary",
          options: ["what is the salary", "how much salary", "what salary", "salary what is"],
          answer: "what is the salary",
        },
        pronunciation: "Could you tell me about the compensation package?",
      },
      {
        choice: {
          question: "Como dizer 'Quais são meus pontos fortes?'?",
          options: [
            "What are my strengths?",
            "What my strong points?",
            "Which my strengths?",
            "What strengths I have?",
          ],
          answer: "What are my strengths?",
          explanation: "Pergunta comum em entrevistas.",
        },
        translate: {
          phrasePt: "Meus pontos fortes são comunicação e liderança",
          words: ["My", "strengths", "are", "communication", "and", "leadership"],
          answer: ["My", "strengths", "are", "communication", "and", "leadership"],
        },
        listen: {
          phrase: "what are my strengths",
          options: ["what are my strengths", "what my strengths", "which are my strengths", "what is my strengths"],
          answer: "what are my strengths",
        },
        pronunciation: "My main strength is problem-solving.",
      },
    ],
  },
  {
    title: "Reuniões de Negócios",
    subtitle: "Vocabulário corporativo",
    icon: "📊",
    color: "#1cb0f6",
    questions: [
      {
        choice: {
          question: "Como dizer 'Vamos agendar uma reunião'?",
          options: [
            "Let's schedule a meeting",
            "Let's make a meeting",
            "Let's do a meeting",
            "Let's have meeting",
          ],
          answer: "Let's schedule a meeting",
          explanation: "Schedule é o termo correto.",
        },
        translate: {
          phrasePt: "Precisamos discutir o orçamento",
          words: ["We", "need", "to", "discuss", "the", "budget"],
          answer: ["We", "need", "to", "discuss", "the", "budget"],
        },
        listen: {
          phrase: "let's schedule a meeting",
          options: ["let's schedule a meeting", "let's make a meeting", "let's do a meeting", "let's have meeting"],
          answer: "let's schedule a meeting",
        },
        pronunciation: "Let's schedule a meeting for tomorrow morning.",
      },
      {
        choice: {
          question: "Como dizer 'Qual é o prazo?'?",
          options: ["What is the deadline?", "What is the date limit?", "What is the final time?", "When finish?"],
          answer: "What is the deadline?",
          explanation: "Deadline é o termo profissional.",
        },
        translate: {
          phrasePt: "O prazo é sexta-feira",
          words: ["The", "deadline", "is", "Friday"],
          answer: ["The", "deadline", "is", "Friday"],
        },
        listen: {
          phrase: "what is the deadline",
          options: ["what is the deadline", "what the deadline", "when is deadline", "what is the date limit"],
          answer: "what is the deadline",
        },
        pronunciation: "We need to meet the deadline.",
      },
      {
        choice: {
          question: "Como interromper educadamente?",
          options: [
            "Sorry to interrupt, but...",
            "Stop, I need to say...",
            "Hey, listen...",
            "Wait a moment...",
          ],
          answer: "Sorry to interrupt, but...",
          explanation: "Forma educada de interromper.",
        },
        translate: {
          phrasePt: "Desculpe interromper, mas tenho uma ideia",
          words: ["Sorry", "to", "interrupt", "but", "I", "have", "an", "idea"],
          answer: ["Sorry", "to", "interrupt", "but", "I", "have", "an", "idea"],
        },
        listen: {
          phrase: "sorry to interrupt",
          options: ["sorry to interrupt", "sorry for interrupt", "sorry interrupt", "sorry to interrupting"],
          answer: "sorry to interrupt",
        },
        pronunciation: "Sorry to interrupt, but I'd like to add something.",
      },
    ],
  },
  {
    title: "Argumentação",
    subtitle: "Defenda sua opinião",
    icon: "⚖️",
    color: "#58cc02",
    questions: [
      {
        choice: {
          question: "Como dizer 'Do meu ponto de vista'?",
          options: ["From my point of view", "In my opinion", "As I see it", "All of the above"],
          answer: "All of the above",
          explanation: "Todas são formas válidas.",
        },
        translate: {
          phrasePt: "Na minha opinião, isso não é correto",
          words: ["In", "my", "opinion", "this", "is", "not", "correct"],
          answer: ["In", "my", "opinion", "this", "is", "not", "correct"],
        },
        listen: {
          phrase: "in my opinion",
          options: ["in my opinion", "in my point", "on my opinion", "to my opinion"],
          answer: "in my opinion",
        },
        pronunciation: "In my opinion, we should reconsider.",
      },
      {
        choice: {
          question: "Como concordar educadamente?",
          options: ["I agree", "You're right", "Exactly", "All of the above"],
          answer: "All of the above",
          explanation: "Todas formas de concordar.",
        },
        translate: {
          phrasePt: "Concordo totalmente com você",
          words: ["I", "totally", "agree", "with", "you"],
          answer: ["I", "totally", "agree", "with", "you"],
        },
        listen: {
          phrase: "I totally agree",
          options: ["I totally agree", "I total agree", "I completely agree", "I agree totally"],
          answer: "I totally agree",
        },
        pronunciation: "I completely agree with your point.",
      },
      {
        choice: {
          question: "Como discordar educadamente?",
          options: [
            "I respectfully disagree",
            "You're wrong",
            "That's not true",
            "No, that's incorrect",
          ],
          answer: "I respectfully disagree",
          explanation: "Forma educada de discordar.",
        },
        translate: {
          phrasePt: "Entendo seu ponto, mas discordo",
          words: ["I", "understand", "your", "point", "but", "I", "disagree"],
          answer: ["I", "understand", "your", "point", "but", "I", "disagree"],
        },
        listen: {
          phrase: "I respectfully disagree",
          options: ["I respectfully disagree", "I respect disagree", "I respectful disagree", "I disrespect agree"],
          answer: "I respectfully disagree",
        },
        pronunciation: "I see your point, but I have a different perspective.",
      },
    ],
  },
  {
    title: "E-mails Formais",
    subtitle: "Escrita profissional",
    icon: "📧",
    color: "#ff9600",
    questions: [
      {
        choice: {
          question: "Melhor abertura para e-mail formal?",
          options: ["Hey", "Dear Sir/Madam", "Hi there", "Hello guys"],
          answer: "Dear Sir/Madam",
          explanation: "Formal e profissional.",
        },
        translate: {
          phrasePt: "Prezado Sr. Silva, escrevo para solicitar...",
          words: ["Dear", "Mr.", "Silva", "I", "am", "writing", "to", "request"],
          answer: ["Dear", "Mr.", "Silva", "I", "am", "writing", "to", "request"],
        },
        listen: {
          phrase: "Dear Sir or Madam",
          options: ["Dear Sir or Madam", "Dear Sir and Madam", "Dear Sir Madam", "Dear Sire Madam"],
          answer: "Dear Sir or Madam",
        },
        pronunciation: "Dear Mr. Johnson, I hope this email finds you well.",
      },
      {
        choice: {
          question: "Melhor encerramento para e-mail formal?",
          options: ["Cheers", "Best regards", "See ya", "Bye bye"],
          answer: "Best regards",
          explanation: "Forma profissional.",
        },
        translate: {
          phrasePt: "Atenciosamente, João Silva",
          words: ["Best", "regards", "João", "Silva"],
          answer: ["Best", "regards", "João", "Silva"],
        },
        listen: {
          phrase: "Best regards",
          options: ["Best regards", "Best regard", "Best reguards", "Best retards"],
          answer: "Best regards",
        },
        pronunciation: "Best regards, John Smith.",
      },
    ],
  },
  {
    title: "Expressões Idiomáticas",
    subtitle: "Fale como nativo",
    icon: "🎭",
    color: "#ffc107",
    questions: [
      {
        choice: {
          question: "O que significa 'break a leg'?",
          options: ["Quebrar a perna", "Boa sorte", "Machucar", "Cair"],
          answer: "Boa sorte",
          explanation: "Expressão para desejar boa sorte.",
        },
        translate: {
          phrasePt: "Boa sorte no seu teste!",
          words: ["Break", "a", "leg", "on", "your", "test"],
          answer: ["Break", "a", "leg", "on", "your", "test"],
        },
        listen: {
          phrase: "break a leg",
          options: ["break a leg", "break leg", "brake a leg", "break a lag"],
          answer: "break a leg",
        },
        pronunciation: "Break a leg on your presentation!",
      },
      {
        choice: {
          question: "O que significa 'it's raining cats and dogs'?",
          options: ["Chovem gatos e cachorros", "Chove muito forte", "Tempestade", "Chuva leve"],
          answer: "Chove muito forte",
          explanation: "Expressão para chuva intensa.",
        },
        translate: {
          phrasePt: "Está chovendo muito lá fora",
          words: ["It's", "raining", "cats", "and", "dogs", "outside"],
          answer: ["It's", "raining", "cats", "and", "dogs", "outside"],
        },
        listen: {
          phrase: "raining cats and dogs",
          options: ["raining cats and dogs", "rain cats dogs", "raining cats dogs", "rain of cats and dogs"],
          answer: "raining cats and dogs",
        },
        pronunciation: "Don't go out, it's raining cats and dogs.",
      },
    ],
  },
  {
    title: "Subjuntivo",
    subtitle: "Desejos e sugestões",
    icon: "🎯",
    color: "#ce82ff",
    questions: [
      {
        choice: {
          question: "Frase correta com subjuntivo:",
          options: [
            "I suggest that he study more",
            "I suggest that he studies more",
            "I suggest that he studied more",
            "I suggest that he is studying more",
          ],
          answer: "I suggest that he study more",
          explanation: "Subjuntivo: verbo base.",
        },
        translate: {
          phrasePt: "É importante que ela chegue cedo",
          words: ["It", "is", "important", "that", "she", "arrive", "early"],
          answer: ["It", "is", "important", "that", "she", "arrive", "early"],
        },
        listen: {
          phrase: "I suggest that he study",
          options: ["I suggest that he study", "I suggest that he studies", "I suggest he study", "I suggest he studies"],
          answer: "I suggest that he study",
        },
        pronunciation: "I recommend that everyone be on time.",
      },
    ],
  },
  {
    title: "Tempos Perfeitos",
    subtitle: "Present Perfect e Past Perfect",
    icon: "🕰️",
    color: "#1cb0f6",
    questions: [
      {
        choice: {
          question: "Qual frase está no Present Perfect?",
          options: ["I have eaten", "I ate", "I eat", "I am eating"],
          answer: "I have eaten",
          explanation: "Have/has + past participle.",
        },
        translate: {
          phrasePt: "Eu já comi almoço",
          words: ["I", "have", "already", "eaten", "lunch"],
          answer: ["I", "have", "already", "eaten", "lunch"],
        },
        listen: {
          phrase: "I have eaten",
          options: ["I have eaten", "I ate", "I eat", "I am eating"],
          answer: "I have eaten",
        },
        pronunciation: "I have already finished my homework.",
      },
      {
        choice: {
          question: "Qual frase está no Past Perfect?",
          options: [
            "I had finished before he arrived",
            "I finished before he arrived",
            "I have finished before he arrived",
            "I was finishing before he arrived",
          ],
          answer: "I had finished before he arrived",
          explanation: "Had + past participle.",
        },
        translate: {
          phrasePt: "Ela já tinha saído quando eu cheguei",
          words: ["She", "had", "already", "left", "when", "I", "arrived"],
          answer: ["She", "had", "already", "left", "when", "I", "arrived"],
        },
        listen: {
          phrase: "I had finished before he arrived",
          options: [
            "I had finished before he arrived",
            "I finished before he arrived",
            "I have finished before he arrived",
            "I was finished before he arrived",
          ],
          answer: "I had finished before he arrived",
        },
        pronunciation: "They had already eaten when we called.",
      },
    ],
  },
  {
    title: "Voz Passiva",
    subtitle: "Ênfase na ação",
    icon: "🔄",
    color: "#58cc02",
    questions: [
      {
        choice: {
          question: "Transformar 'Someone stole my car' para voz passiva:",
          options: [
            "My car was stolen",
            "My car is stolen",
            "My car has stolen",
            "My car were stolen",
          ],
          answer: "My car was stolen",
          explanation: "Passiva: objeto + was/were + past participle.",
        },
        translate: {
          phrasePt: "A carta foi escrita por ela",
          words: ["The", "letter", "was", "written", "by", "her"],
          answer: ["The", "letter", "was", "written", "by", "her"],
        },
        listen: {
          phrase: "my car was stolen",
          options: ["my car was stolen", "my car is stolen", "my car has stolen", "my car were stolen"],
          answer: "my car was stolen",
        },
        pronunciation: "The book was written in 1990.",
      },
    ],
  },
  {
    title: "Negociação",
    subtitle: "Frases para negociar",
    icon: "🤝",
    color: "#ffc107",
    questions: [
      {
        choice: {
          question: "Como fazer uma oferta em negociação?",
          options: [
            "We can offer you...",
            "Give me...",
            "I want...",
            "You must give...",
          ],
          answer: "We can offer you...",
          explanation: "Educado e profissional.",
        },
        translate: {
          phrasePt: "Podemos oferecer 10% de desconto",
          words: ["We", "can", "offer", "you", "10%", "discount"],
          answer: ["We", "can", "offer", "you", "10%", "discount"],
        },
        listen: {
          phrase: "we can offer you",
          options: ["we can offer you", "we offer you", "can we offer you", "we can offer to you"],
          answer: "we can offer you",
        },
        pronunciation: "We can offer a better price.",
      },
      {
        choice: {
          question: "Como pedir uma contraproposta?",
          options: [
            "What would be your counteroffer?",
            "Give me better price",
            "Too expensive",
            "Lower price",
          ],
          answer: "What would be your counteroffer?",
          explanation: "Profissional e educado.",
        },
        translate: {
          phrasePt: "Qual seria sua melhor oferta?",
          words: ["What", "would", "be", "your", "best", "offer"],
          answer: ["What", "would", "be", "your", "best", "offer"],
        },
        listen: {
          phrase: "what would be your counteroffer",
          options: [
            "what would be your counteroffer",
            "what is your counteroffer",
            "what your counteroffer",
            "counteroffer what",
          ],
          answer: "what would be your counteroffer",
        },
        pronunciation: "Could you propose a different price?",
      },
    ],
  },
];

// Gerar aulas (100 aulas por nível)
function generateLessons(level, startId, cards) {
  const lessons = [];
  
  for (let i = 0; i < 100; i++) {
    const cardIndex = i % cards.length;
    const card = cards[cardIndex];
    
    // Seleciona pergunta aleatória do card (cada card tem 3 perguntas)
    const questionIndex = Math.floor(Math.random() * card.questions.length);
    const selectedQuestion = card.questions[questionIndex];
    
    // Embaralha as opções da pergunta de múltipla escolha
    const shuffledChoice = selectedQuestion.choice 
      ? shuffleOptions(selectedQuestion.choice)
      : null;
    
    lessons.push({
      id: startId + i + 1,
      unit: `Unidade ${Math.floor(i / 10) + 1}`,
      title: card.title,
      subtitle: card.subtitle,
      level: level,
      icon: card.icon,
      color: card.color,
      xp: level === "Iniciante" ? 80 : level === "Básico" ? 100 : 130,
      locked: false,
      questions: [
        {
          id: 1,
          type: "choice",
          ...shuffledChoice,
        },
        {
          id: 2,
          type: "translate",
          question: "Traduza esta frase:",
          phrasePt: selectedQuestion.translate.phrasePt,
          words: shuffleArray([...selectedQuestion.translate.words]),
          answer: selectedQuestion.translate.answer,
          explanation: `A tradução correta é: ${selectedQuestion.translate.answer.join(" ")}.`,
        },
        {
          id: 3,
          type: "listen",
          question: "O que você escuta?",
          phrase: selectedQuestion.listen.phrase,
          options: shuffleArray([...selectedQuestion.listen.options]),
          answer: selectedQuestion.listen.answer,
          explanation: `Você escutou: ${selectedQuestion.listen.answer}.`,
        },
        {
          id: 4,
          type: "pronunciation",
          question: "Pronuncie:",
          expected: selectedQuestion.pronunciation,
          explanation: "Fale devagar e tente repetir a frase corretamente.",
        },
      ],
    });
  }
  
  return lessons;
}

export const lessons = [
  ...generateLessons("Iniciante", 0, inicianteCards),
  ...generateLessons("Básico", 1000, basicoCards),
  ...generateLessons("Avançado", 2000, avancadoCards),
];

export const tarefas = dailyTasks;
export const aulas = lessons;

export const vocabulario = [
  {
    palavra: "Hello",
    traducao: "Olá",
    exemplo: "Hello, how are you today?",
    categoria: "Saudações",
  },
  {
    palavra: "Experience",
    traducao: "Experiência",
    exemplo: "I have experience in marketing.",
    categoria: "Profissional",
  },
  {
    palavra: "Break a leg",
    traducao: "Boa sorte",
    exemplo: "Break a leg on your test!",
    categoria: "Expressões",
  },
];

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
];

export const ranking = [
  { posicao: 1, nome: "Ana", xp: 2840, rank: "Diamond", streak: 18 },
  { posicao: 2, nome: "Carlos", xp: 2310, rank: "Gold", streak: 12 },
  { posicao: 3, nome: "Mariana", xp: 1950, rank: "Gold", streak: 9 },
  { posicao: 4, nome: "Bruno", xp: 1240, rank: "Silver", streak: 5 },
];