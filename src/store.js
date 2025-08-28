import { configureStore } from "@reduxjs/toolkit";
import questionOneReducer from "./slices/QOneSlice";
import questionTwoReducer from "./slices/QTwoSlice";
import questionThreeReducer from "./slices/QThreeSlice";
import questionFourReducer from "./slices/QFourSlice";
import questionFiveReducer from "./slices/QFiveSlice";
import questionSixReducer from "./slices/QSixSlice";
import questionSixRefinedReducer from "./slices/QSixSliceRefined";
import questionSevenReducer from "./slices/QSevenSlice";
import chocolateConsumerReducer from "./slices/ChocolateConsumerSlice";

export const store = configureStore({
  reducer: {
    QuestionOne: questionOneReducer,
    QuestionTwo: questionTwoReducer,
    QuestionThree: questionThreeReducer,
    QuestionFour: questionFourReducer,
    QuestionFive: questionFiveReducer,
    ChocolateConsumer: chocolateConsumerReducer,
    QuestionSix: questionSixReducer,
    QuestionSixFT: questionSixRefinedReducer,
    QuestionSeven: questionSevenReducer,
  },
});
