const STORAGE_KEY = "bfa-completed-quiz-v1";
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

export function getQuizAnswers(state) {
  return {
    question_1: state.QuestionOne.value,
    question_2: state.QuestionTwo.value,
    question_3: state.QuestionThree.value,
    question_4: state.QuestionFour.value,
    question_5: state.QuestionFive.value,
    chocolate_consumer: state.ChocolateConsumer.value,
    shopping_cart: state.QuestionSix.shoppingList,
    ft_shopping_cart: state.QuestionSixFT.shoppingListRefined,
    question_7: state.QuestionSeven.value,
  };
}

export function hasAnswer(value) {
  if (Array.isArray(value)) return value.length > 0;
  return typeof value === "number" || (typeof value === "string" && value.trim() !== "");
}

export function hasCompletedQuizAnswers(answers) {
  const sliderQuestions = [
    "question_2", "question_3", "question_4", "question_5",
    "chocolate_consumer", "question_7",
  ];
  return typeof answers?.question_1 === "string" && answers.question_1.trim() !== "" &&
    sliderQuestions.every((key) => Number.isInteger(answers[key]) && answers[key] >= 1 && answers[key] <= 5) &&
    Array.isArray(answers.shopping_cart) && answers.shopping_cart.length > 0 &&
    answers.shopping_cart.every((item) => typeof item === "string" && item.trim() !== "") &&
    Array.isArray(answers.ft_shopping_cart) &&
    answers.ft_shopping_cart.every((item) => typeof item === "string" && item.trim() !== "");
}

export function saveCompletedQuiz(state) {
  if (typeof window === "undefined") return;
  const answers = getQuizAnswers(state);
  if (!hasCompletedQuizAnswers(answers)) return;
  try {
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ savedAt: Date.now(), answers })
    );
  } catch {
    // The in-memory Redux answers still work when browser storage is unavailable.
  }
}

export function getCompletedQuiz(state) {
  const current = getQuizAnswers(state);
  if (hasCompletedQuizAnswers(current)) return current;
  if (typeof window === "undefined") return current;
  try {
    const saved = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || "null");
    if (
      saved &&
      Date.now() - saved.savedAt >= 0 &&
      Date.now() - saved.savedAt < MAX_AGE_MS &&
      hasCompletedQuizAnswers(saved.answers)
    ) {
      return saved.answers;
    }
  } catch {
    // A missing or corrupt snapshot must never submit invented answers.
  }
  return current;
}
