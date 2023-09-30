// Define your quiz questions and answers
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["London", "Berlin", "Madrid", "Paris"],
    correctAnswer: 3, // Index of the correct answer in the choices array
  },
  {
    question: "Which programming language is known for web development?",
    choices: ["Python", "Java", "JavaScript", "C++"],
    correctAnswer: 2,
  },
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const choiceElements = [
  document.getElementById("choice0"),
  document.getElementById("choice1"),
  document.getElementById("choice2"),
  document.getElementById("choice3"),
];
const progressElement = document.getElementById("progress");

function loadNextQuestion() {
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    for (let i = 0; i < 4; i++) {
      choiceElements[i].textContent = currentQuestion.choices[i];
    }

    // Update progress
    progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${
      questions.length
    }`;
  } else {
    questionElement.textContent = `Quiz Finished! Your Score: ${score}/${questions.length}`;
    for (let i = 0; i < 4; i++) {
      choiceElements[i].style.display = "none";
    }
  }
}

function selectChoice(choiceIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  if (choiceIndex === currentQuestion.correctAnswer) {
    score++;
  }

  currentQuestionIndex++;
  loadNextQuestion();
}

for (let i = 0; i < 4; i++) {
  choiceElements[i].addEventListener("click", () => selectChoice(i));
}

loadNextQuestion();
