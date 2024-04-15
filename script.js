const questions = [
  {
    question: "¿Cuál es el planeta más grande del sistema solar?",
    options: ["Júpiter", "Saturno", "Neptuno", "Marte"],
    answer: "Júpiter"
  },
  {
    question: "¿Cuál es el planeta más cercano al Sol?",
    options: ["Venus", "Mercurio", "Tierra", "Marte"],
    answer: "Mercurio"
  },
  {
    question: "¿Cuál es el planeta más pequeño del sistema solar?",
    options: ["Mercurio", "Marte", "Venus", "Plutón"],
    answer: "Mercurio"
  },
  {
    question: "¿Cuál es el planeta conocido como 'El planeta rojo'?",
    options: ["Venus", "Tierra", "Júpiter", "Marte"],
    answer: "Marte"
  },
  {
    question: "¿Cuál es el planeta con anillos más prominentes?",
    options: ["Júpiter", "Saturno", "Urano", "Neptuno"],
    answer: "Saturno"
  },
  {
    question: "¿Cuál es el planeta más caliente del sistema solar?",
    options: ["Mercurio", "Venus", "Tierra", "Marte"],
    answer: "Venus"
  },
  {
    question: "¿Cuál es el planeta conocido como 'El gigante gaseoso'?",
    options: ["Júpiter", "Saturno", "Urano", "Neptuno"],
    answer: "Júpiter"
  },
  {
    question: "¿Cuál es el planeta más alejado del Sol en el sistema solar?",
    options: ["Saturno", "Urano", "Neptuno", "Plutón"],
    answer: "Neptuno"
  },
  {
    question: "¿Cuál es el planeta con el día más largo en el sistema solar?",
    options: ["Venus", "Marte", "Júpiter", "Saturno"],
    answer: "Júpiter"
  },
  {
    question: "¿Cuál es el planeta con el día más corto en el sistema solar?",
    options: ["Mercurio", "Venus", "Tierra", "Marte"],
    answer: "Júpiter"
  },
  {
    question: "¿Cuál es la luna más grande del sistema solar?",
    options: ["Luna", "Ganimedes", "Tritón", "Titán"],
    answer: "Ganimedes"
  },
  {
    question: "¿Cuál es la luna más grande de Marte?",
    options: ["Fobos", "Ganimedes", "Tritón", "Titán"],
    answer: "Fobos"
  },
  {
    question: "¿Cuál es la luna más grande de Saturno?",
    options: ["Luna", "Ganimedes", "Tritón", "Titán"],
    answer: "Titán"
  },
  {
    question: "¿Cuál es la luna más grande de Júpiter?",
    options: ["Luna", "Ganimedes", "Tritón", "Titán"],
    answer: "Ganimedes"
  },
  {
    question: "¿Cuál es el planeta enano más grande del sistema solar?",
    options: ["Plutón", "Eris", "Ceres", "Makemake"],
    answer: "Plutón"
  }
];

let currentQuestion = 0;
let score = 0;
let showingFeedback = false; // Variable para controlar si se está mostrando la retroalimentación

const startButton = document.getElementById('startQuiz');
const restartButton = document.getElementById('restartQuiz');
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const questionElement = document.getElementById('question');
const optionButtons = document.getElementById('options');

startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', startQuiz);

function startQuiz() {
  startButton.style.display = 'none';
  resultContainer.style.display = 'none';
  quizContainer.style.display = 'block';
  score = 0;
  currentQuestion = 0;
  shuffleQuestions(); // Mezclar las preguntas antes de comenzar
  showNextQuestion();
}

function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
}

function showNextQuestion() {
  if (currentQuestion < questions.length) {
    resetOptions();
    displayQuestion();
  } else {
    endQuiz();
  }
}

function displayQuestion() {
  const question = questions[currentQuestion];
  questionElement.innerText = question.question;
  question.options.forEach(option => {
    const button = document.createElement('button');
    button.innerText = option;
    button.classList.add('option');
    button.addEventListener('click', () => checkAnswer(option, button));
    optionButtons.appendChild(button);
  });
}

function resetOptions() {
  while (optionButtons.firstChild) {
    optionButtons.removeChild(optionButtons.firstChild);
  }
}

function checkAnswer(answer, button) {
  if (showingFeedback) return; // Si ya se está mostrando la retroalimentación, no hacer nada
  showingFeedback = true; // Marcar que se está mostrando la retroalimentación
  const question = questions[currentQuestion];
  if (answer === question.answer) {
    button.style.backgroundColor = 'green'; // Respuesta correcta
    score++;
  } else {
    button.style.backgroundColor = 'red'; // Respuesta incorrecta
  }
  // Desactivar todos los botones de opción durante 1 segundo
  const optionButtons = document.querySelectorAll('.option');
  optionButtons.forEach(btn => {
    btn.disabled = true;
  });
  setTimeout(() => {
    currentQuestion++;
    showingFeedback = false; // Marcar que ya no se está mostrando la retroalimentación
    showNextQuestion();
  }, 1000); // Espera 1 segundo antes de mostrar la siguiente pregunta
}

function endQuiz() {
  quizContainer.style.display = 'none';
  resultContainer.style.display = 'block';
  document.getElementById('score').innerText = score;
}