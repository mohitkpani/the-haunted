
import "../styles/stories.css";
import stories from "../data/stories";
import { Link } from "react-router-dom";

function Stories() {
    return (
        <main className="stories-page">
            <div className="stories-overlay"></div>

            {/* Hero heading */}
            <section className="stories-heading">
                <p className="stories-eyebrow">
                    ENTER THE WORLD OF FEAR
                </p>

                <h1>HORROR STORIES</h1>

                <div className="stories-divider"></div>

                <p className="stories-subtitle">
                    EVERY STORY HAS A DARK SECRET.
                </p>
            </section>

            {/* Story collection */}
            <section className="stories-collection">
                <div className="stories-section-heading">
                    <h2>EXPLORE THE STORIES</h2>
                    <p>CHOOSE YOUR NIGHTMARE</p>
                </div>

                <div className="stories-grid">
                    {stories.map((story) => (
                        <article className="story-card" key={story.id}>

                            <div className="story-card-image">
                                <img
                                    src={story.image}
                                    alt={story.title}
                                    loading="lazy"
                                />

                                <span className="story-category">
                                    {story.category}
                                </span>
                            </div>

                            <div className="story-card-content">
                                <h3>{story.title}</h3>

                                <p>{story.description}</p>

                                <div className="story-card-footer">
                                    <span>{story.readTime}</span>

                                    <Link
                                        to={`/stories/${story.id}`}
                                        className="read-story-link"
                                    >
                                        READ STORY →
                                    </Link>
                                </div>
                            </div>

                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Stories;
