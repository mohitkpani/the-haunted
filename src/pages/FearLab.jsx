
import { Link } from "react-router-dom";
import "../styles/fear-lab.css";

function FearLab() {
    const games = [
        {
            id: 1,
            name: "HAUNT ME",
            image: "/images/fear-lab/haunt-me.webp",
            description:
                "Enter a terrifying experience where you never know what waits in the darkness.",
            link: "/fear-lab/haunt-me",
        },
        {
            id: 2,
            name: "DON'T BLINK",
            image: "/images/fear-lab/dont-blink.webp",
            description:
                "Keep your eyes open. Something might appear when you least expect it.",
            link: "/fear-lab/dont-blink",
        },
        {
            id: 3,
            name: "FIND THE GHOST",
            image: "/images/fear-lab/find-the-ghost.webp",
            description:
                "Search carefully and discover the hidden ghost before time runs out.",
            link: "/fear-lab/find-the-ghost",
        },
        {
            id: 4,
            name: "ESCAPE ROOM",
            image: "/images/fear-lab/escape-room.webp",
            description:
                "Solve mysterious puzzles, uncover clues and escape the haunted room.",
            link: "/fear-lab/escape-room",
        },
        {
            id: 5,
            name: "FEAR TEST",
            image: "/images/fear-lab/fear-test.webp",
            description:
                "Challenge yourself with a series of psychological horror questions.",
            link: "/fear-lab/fear-test",
        },
    ];

    return (
        <main className="fear-lab-page">
            <div className="fear-lab-overlay"></div>

            <section className="fear-lab-heading">
                <p className="fear-lab-eyebrow">
                    ENTER THE WORLD OF NIGHTMARES
                </p>

                <h1>FEAR LAB</h1>

                <div className="fear-lab-divider"></div>

                <p className="fear-lab-subtitle">
                    TEST YOUR COURAGE. FACE YOUR FEARS.
                </p>
            </section>

            <section className="fear-lab-collection">
                <div className="fear-lab-section-heading">
                    <h2>ENTER THE FEAR LAB</h2>
                    <p>CHOOSE YOUR NIGHTMARE</p>
                </div>

                <div className="fear-lab-grid">
                    {games.map((game) => (
                        <article className="fear-game-card" key={game.id}>
                            <div className="fear-game-image">
                                <img
                                    src={game.image}
                                    alt={game.name}
                                    loading="lazy"
                                />
                            </div>

                            <div className="fear-game-card-content">
                                <h3>{game.name}</h3>

                                <p>{game.description}</p>

                                <Link
                                    to={game.link}
                                    className="fear-game-button"
                                >
                                    PLAY NOW →
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default FearLab;
