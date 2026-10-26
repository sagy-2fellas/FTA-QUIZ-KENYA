const logoChoices = [
  "No idea what this is",
  "Might have seen it before",
  "Noticed it on some products",
  "Know it, but not sure where to buy",
  "Love it and I choose it when I can",
];
const coffeeChoices = [
  "None. I run on vibes",
  "One cup now and then",
  "Can't start my day without it",
  "Coffee keeps me going",
  "Espresso runs in my blood!",
];
const teaChoices = [
  "Not really for me",
  "I'll drink it if you're making",
  "Tea makes everything better",
  "Tea over coffee any day",
  "I live on tea!",
];
const wineChoices = [
  "None for me, thanks",
  "A glass every now and then",
  "I enjoy a glass to relax",
  "Weekends are for wine",
  "Pass me the whole bottle!",
];
const flowerChoices = [
  "Never bought flowers",
  "More than a year ago",
  "In the past year",
  "In the past month",
  "This week!",
];
const chocolateChoices = [
  "I can live without it",
  "I'll have a piece… if you offer",
  "I like it from time to time",
  "Chocolate is my middle name",
  "Chocolate all day, every day!",
];

export const QUIZ_MERGE_FIELDS = [
  { tag: "BFACTRY", name: "Quiz country" },
  { tag: "BFAQ1", name: "Quiz Q1 location" },
  { tag: "BFAQ2", name: "Quiz Q2 Fairtrade logo" },
  { tag: "BFAQ3", name: "Quiz Q3 coffee" },
  { tag: "BFAQ4", name: "Quiz Q4 tea" },
  { tag: "BFAQ5", name: "Quiz Q5 wine or flowers" },
  { tag: "BFAQ6", name: "Quiz Q6 chocolate" },
  { tag: "BFAQ7", name: "Quiz Q7 shopping basket" },
  { tag: "BFAQ7FT", name: "Quiz Q7 Fairtrade products" },
  { tag: "BFAQ8", name: "Quiz Q8 buying habits" },
  { tag: "BFARESULT", name: "Quiz result page" },
  { tag: "BFAINTER", name: "Quiz interested in" },
  { tag: "BFAWBUY", name: "Quiz would buy more" },
];

const scored = (value, choices) => `${value}/5: ${choices[value - 1]}`;
const list = (items) => items.length ? items.join(", ") : "None selected";

export function buildQuizMergeFields(country, answers) {
  const q5Choices = country === "Kenya" ? flowerChoices : wineChoices;
  const buyingHabit = answers.question_7 === 1
    ? "1/5: I don't really look at labels"
    : answers.question_7 === 5
      ? "5/5: I look carefully at labels"
      : `${answers.question_7}/5 on the label-checking scale`;

  return {
    BFACTRY: country,
    BFAQ1: answers.question_1.trim(),
    BFAQ2: scored(answers.question_2, logoChoices),
    BFAQ3: scored(answers.question_3, coffeeChoices),
    BFAQ4: scored(answers.question_4, teaChoices),
    BFAQ5: scored(answers.question_5, q5Choices),
    BFAQ6: scored(answers.chocolate_consumer, chocolateChoices),
    BFAQ7: list(answers.shopping_cart),
    BFAQ7FT: list(answers.ft_shopping_cart),
    BFAQ8: buyingHabit,
    BFARESULT: typeof answers.result_page === "string" ? answers.result_page : "",
    BFAINTER: typeof answers.interested_in === "string" ? answers.interested_in : "",
    BFAWBUY: answers.would_buy_more === true ? "Yes" : answers.would_buy_more === false ? "No" : "",
  };
}

export function mergeFieldsFitMailchimp(fields) {
  return Object.values(fields).every((value) => Buffer.byteLength(value, "utf8") <= 255);
}
