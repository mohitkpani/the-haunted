
import "../styles/home.css";

function Home() {
    return (
        <main className="haunted-home">
            {/* Background lighting */}
            <div className="background-glow"></div>

            {/* Blood dripping */}
            <div className="blood-layer">
                <span className="blood drip-1"></span>
                <span className="blood drip-2"></span>
                <span className="blood drip-3"></span>
                <span className="blood drip-4"></span>
                <span className="blood drip-5"></span>
                <span className="blood drip-6"></span>
            </div>

            {/* Moving fog */}
            <div className="fog-layer fog-left"></div>
            <div className="fog-layer fog-right"></div>

            {/* Ghost with supernatural glow */}
            <div className="ghost-glow">
                <img
                    className="ghost-character"
                    src="/images/characters/lady-in-white.webp"
                    alt="A ghostly woman in white"
                />
            </div>

            {/* Lantern and pumpkins with orange glow */}
            <div className="pumpkin-glow">
                <img
                    className="lantern-decoration"
                    src="/images/decorations/lantern-pumpkins.webp"
                    alt="Glowing Halloween lantern and pumpkins"
                />
            </div>

            {/* Main hero content */}
            <section className="home-content">
                <p className="home-eyebrow">
                    ⚠ WELCOME TO THE UNKNOWN ⚠
                </p>

                <h1 className="home-title">HAUNTED</h1>

                <div className="home-divider"></div>

                <h2 className="home-tagline">
                    ENTER IF YOU DARE
                </h2>

                <p className="home-description">
                    SOME DOORS SHOULD NEVER BE OPENED.
                </p>

                <div className="home-bottom-text">
                    THE NIGHT IS WATCHING YOU.
                </div>
            </section>

            {/* Bottom information */}
            <div className="home-footer">
                <span>NO ESCAPE</span>
                <span>03:00 AM</span>
                <span>THE DARKNESS AWAITS</span>
            </div>
        </main>
    );
}

export default Home;
