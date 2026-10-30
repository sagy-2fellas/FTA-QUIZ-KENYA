import UnknownFarmer from "./UnknownFarmer";
import ResultBasket from "./ResultBasket";
import styles from "../styles/UnknownFarmerIntro.module.css";

export default function UnknownFarmerIntro() {
  return (
    <div className={styles.hero}>
      <div className={styles.portrait}><UnknownFarmer /></div>
      <div className={styles.intro}>
        <h1 className="font-alegreya">We can’t tell who the farmer is.</h1>
        <ResultBasket />
        <p className="font-exo">You haven’t marked any products as Fairtrade, so we can’t connect your basket to a farmer’s story.</p>
        <h2 className="font-alegreya">What can we tell you about them?</h2>
        <p className={`font-alegreya ${styles.answer}`}>We can’t be sure.</p>
        <p className="font-exo">Scroll down to see what we can’t promise—and what changes with Fairtrade.</p>
        <span className={styles.arrow} aria-hidden="true">↓</span>
      </div>
    </div>
  );
}
