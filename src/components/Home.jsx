import Image from "next/image";
import Link from "next/link";
const Home = () => (
  <section className="engagement-home">
    <div className="engagement-home-copy">
      <Image src="/img/logo-fairtrade.png" width={80} height={96} alt="Fairtrade Africa" priority />
      <h1>Meet the human who grows your favourite drink.</h1>
      <p>Your coffee. Your tea. Your everyday choices. Discover the story behind them.</p>
      <Link href="/quiz" className="engagement-start">Let’s find out <span aria-hidden="true">→</span></Link>
      <p className="engagement-home-detail">8 questions. Your choices. A story worth knowing.</p>
      <Link href="/#WhoMe" className="engagement-more">What does this have to do with me?</Link>
    </div>
    <div className="engagement-home-photo">
      <img src="/img/home-hero.jpg" alt="The person behind your everyday products" />
      <div className="engagement-home-caption">Small choices.<br />Human stories.</div>
    </div>
  </section>
);
export default Home;
