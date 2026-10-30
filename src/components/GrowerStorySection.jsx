import useResultStory from "./useResultStory";
import styles from "../styles/GrowerStorySection.module.css";

export default function GrowerStorySection({ resultId }) {
  const story = useResultStory(resultId);
  if (!story) return null;
  const noFairtrade = resultId <= 7;
  return (
    <div className={styles.section} data-story-id={story.id}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <img src="/img/logo-fairtrade.png" width="60" height="72" alt="Fairtrade Mark" />
          <h2 className="font-alegreya">{noFairtrade ? "But if the farmer’s organisation was Fairtrade-certified, we could tell you more." : "Here’s Fairtrade in practice, beyond the label."}</h2>
          <p className="font-exo">{story.photo ? `A real ${story.product} story from the wider Fairtrade community.` : "What Fairtrade does for coffee producers."}</p>
        </div>
        <article className={`${styles.story} ${!story.photo ? styles.general : ""}`} aria-label={`${story.name}’s story`}>
          {story.photo && <figure className={styles.portrait}>
            <img src={story.photo} alt={story.alt} style={{ objectPosition: story.position }} />
            <figcaption className="font-exo">{story.name} · {story.role}</figcaption>
          </figure>}
          <div className={styles.copy}>
            <p className={`font-exo ${styles.eyebrow}`}>{story.photo ? "Fairtrade in practice" : "Fairtrade coffee"}</p>
            <h3 className="font-alegreya">{story.title}</h3>
            {story.identityNote && <p className={`font-exo ${styles.identityNote}`}>{story.identityNote}</p>}
            <p className="font-exo">{story.summary}</p>
            <details className={styles.details} onKeyDown={event => event.stopPropagation()}>
              <summary className="font-exo" onKeyDown={event => {
                if (event.key === "Enter" || event.key === " ") {
                  // Fullpage suppresses native summary activation on desktop.
                  event.preventDefault();
                  event.stopPropagation();
                  const details = event.currentTarget.parentElement;
                  details.open = !details.open;
                }
              }}>
                <span className={styles.whenClosed}>Read more</span>
                <span className={styles.whenOpen}>Show less</span>
                <span className={styles.expandIcon} aria-hidden="true">+</span>
              </summary>
              <div className={styles.expanded}>
                <h4 className="font-alegreya">{story.subtitle}</h4>
                {story.paragraphs.map(p => <p className="font-exo" key={p}>{p}</p>)}
                <p className={`font-exo ${styles.source}`}>
                  Source: {story.sourceUrl ? <a href={story.sourceUrl} target="_blank" rel="noreferrer">{story.source}</a> : story.source}.
                  {story.photo && " This is one example of Fairtrade’s work; it doesn’t identify who supplied the products in your basket."}
                </p>
              </div>
            </details>
          </div>
        </article>
        <p className={`font-exo ${styles.continue}`}>Scroll down to keep going. <span aria-hidden="true">↓</span></p>
      </div>
    </div>
  );
}
