import { useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";
import { getResultStory } from "../data/resultStories";
import { getCompletedQuiz } from "../utils/quizAnswers";

export default function useResultStory(resultId) {
  const store = useStore();
  const selected = useSelector(state => state.QuestionSix.shoppingList);
  const certified = useSelector(state => state.QuestionSixFT.shoppingListRefined);
  const [saved, setSaved] = useState({ selected: [], certified: [] });
  useEffect(() => {
    if (resultId === 8) {
      const answers = getCompletedQuiz(store.getState());
      setSaved({ selected: answers.shopping_cart || [], certified: answers.ft_shopping_cart || [] });
    }
  }, [resultId, store, selected, certified]);
  const basket = selected.length ? selected : saved.selected;
  const fairtrade = selected.length ? certified : saved.certified;
  return getResultStory(resultId, fairtrade.filter(product => basket.includes(product)));
}
