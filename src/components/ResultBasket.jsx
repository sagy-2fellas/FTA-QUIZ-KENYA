import { useSelector } from "react-redux";
export default function ResultBasket() {
  const products = useSelector(state => state.QuestionSix.shoppingList) || [];
  if (!products.length) return null;
  return <div className="result-basket"><p>Your choices</p><ul>{[...new Set(products)].map(product => <li key={product}>{product}</li>)}</ul></div>;
}
