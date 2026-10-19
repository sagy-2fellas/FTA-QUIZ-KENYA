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

export function saveCompletedQuiz(state) {
  if (typeof window === "undefined") return;
  const answers = getQuizAnswers(state);
  if (!hasAnswer(answers.question_1) || !hasAnswer(answers.question_7)) return;
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
  if (hasAnswer(current.question_1) && hasAnswer(current.question_7)) return current;
  if (typeof window === "undefined") return current;
  try {
    const saved = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || "null");
    if (
      saved &&
      Date.now() - saved.savedAt >= 0 &&
      Date.now() - saved.savedAt < MAX_AGE_MS &&
      hasAnswer(saved.answers?.question_1) &&
      hasAnswer(saved.answers?.question_7)
    ) {
      return saved.answers;
    }
  } catch {
    // A missing or corrupt snapshot must never submit invented answers.
  }
  return current;
}
