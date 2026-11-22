
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/find-the-ghost.css";

const MAX_CLICKS = 5;
const HIT_RADIUS = 55;

function getRandomPosition() {
    return {
        x: 10 + Math.random() * 80,
        y: 15 + Math.random() * 75,
    };
}

function FindTheGhost() {
    const [gameStatus, setGameStatus] = useState("intro");
    const [clicksUsed, setClicksUsed] = useState(0);
    const [ghostPosition, setGhostPosition] = useState(null);

    const screamRef = useRef(null);
    const revealTimerRef = useRef(null);

    // Load Bloody Mary scream
    useEffect(() => {
        const scream = new Audio("/sounds/bloody-marry.mp3");
        scream.volume = 1;
        scream.preload = "auto";

        screamRef.current = scream;

        return () => {
            scream.pause();
            scream.currentTime = 0;
            screamRef.current = null;

            if (revealTimerRef.current) {
                clearTimeout(revealTimerRef.current);
            }
        };
    }, []);

    // Start or restart game
    function startGame() {
        if (revealTimerRef.current) {
            clearTimeout(revealTimerRef.current);
            revealTimerRef.current = null;
        }

        if (screamRef.current) {
            screamRef.current.pause();
            screamRef.current.currentTime = 0;
        }

        setClicksUsed(0);
        setGhostPosition(getRandomPosition());
        setGameStatus("playing");
    }

    // Handle clicks anywhere in the search area
    function handleScreenClick(event) {
        if (gameStatus !== "playing") return;

        const gameArea = event.currentTarget;
        const rect = gameArea.getBoundingClientRect();

        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        const ghostX = (ghostPosition.x / 100) * rect.width;
        const ghostY = (ghostPosition.y / 100) * rect.height;

        const distance = Math.sqrt(
            Math.pow(clickX - ghostX, 2) +
            Math.pow(clickY - ghostY, 2)
        );

        const nextClicks = clicksUsed + 1;
        setClicksUsed(nextClicks);

        if (distance <= HIT_RADIUS) {
            // Player found the hidden ghost
            setGameStatus("revealing");

            // Play sudden ghost scream
            if (screamRef.current) {
                screamRef.current.currentTime = 0;

                screamRef.current.play().catch((error) => {
                    console.error("Ghost scream failed:", error);
                });
            }

            // Show victory screen after jump scare
            revealTimerRef.current = setTimeout(() => {
                setGameStatus("won");
                revealTimerRef.current = null;
            }, 2200);

            return;
        }

        // Player used all five attempts
        if (nextClicks >= MAX_CLICKS) {
            setGameStatus("lost");
        }
    }

    // Clean up when leaving the game
    useEffect(() => {
        return () => {
            if (revealTimerRef.current) {
                clearTimeout(revealTimerRef.current);
            }

            if (screamRef.current) {
                screamRef.current.pause();
                screamRef.current.currentTime = 0;
            }
        };
    }, []);

    return (
        <main className="find-ghost-page">
            <div className="find-ghost-overlay"></div>

            {/* INTRO SCREEN */}
            {gameStatus === "intro" && (
                <section className="find-ghost-intro">
                    <p className="find-ghost-eyebrow">
                        FEAR LAB PRESENTS
                    </p>

                    <h1>FIND THE GHOST</h1>

                    <p className="find-ghost-tagline">
                        Something is hiding. Can you find it?
                    </p>

                    <div className="find-ghost-instructions">
                        <h2>YOUR MISSION</h2>

                        <p>
                            A ghost is hiding somewhere in this haunted room.
                            Find its hidden location before you run out of attempts.
                        </p>

                        <ul>
                            <li>The ghost is completely invisible.</li>
                            <li>Click anywhere in the haunted room.</li>
                            <li>You have only five attempts.</li>
                            <li>Find the ghost to win.</li>
                        </ul>

                        <p className="find-ghost-warning">
                            IT IS HIDING RIGHT IN FRONT OF YOU.
                        </p>
                    </div>

                    <button
                        className="find-ghost-start-button"
                        onClick={startGame}
                    >
                        START SEARCH
                    </button>

                    <Link
                        to="/fear-lab"
                        className="find-ghost-back-button"
                    >
                        ← BACK TO FEAR LAB
                    </Link>
                </section>
            )}

            {/* SEARCH GAME */}
            {gameStatus === "playing" && (
                <section
                    className="find-ghost-game"
                    onClick={handleScreenClick}
                >
                    <div className="find-ghost-game-header">
                        <div>
                            <p className="find-ghost-eyebrow">
                                FEAR LAB CHALLENGE
                            </p>

                            <h2>FIND THE GHOST</h2>
                        </div>

                        <div className="find-ghost-stats">
                            <div className="find-ghost-stat">
                                <span>
                                    {clicksUsed}/{MAX_CLICKS}
                                </span>
                                <small>CLICKS USED</small>
                            </div>

                            <div className="find-ghost-stat">
                                <span>
                                    {MAX_CLICKS - clicksUsed}
                                </span>
                                <small>ATTEMPTS LEFT</small>
                            </div>
                        </div>
                    </div>

                    <p className="find-ghost-hint">
                        CLICK ANYWHERE. FIND THE HIDDEN GHOST.
                    </p>

                    <div className="find-ghost-search-message">
                        <span>THE ROOM IS WATCHING YOU...</span>

                        <small>
                            Every click counts. Choose carefully.
                        </small>
                    </div>

                    <div className="find-ghost-attempts">
                        {Array.from({ length: MAX_CLICKS }, (_, index) => (
                            <span
                                key={index}
                                className={
                                    index < clicksUsed
                                        ? "attempt-used"
                                        : ""
                                }
                            >
                                {index < clicksUsed ? "×" : "?"}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* GHOST JUMP SCARE */}
            {gameStatus === "revealing" && (
                <div className="find-ghost-jumpscare">
                    <img
                        src="/images/fear-lab/find-the-ghost-character.webp"
                        alt="The hidden ghost revealed"
                    />

                    <h2>YOU FOUND ME!</h2>
                </div>
            )}

            {/* RESULT SCREEN */}
            {(gameStatus === "won" || gameStatus === "lost") && (
                <section className="find-ghost-result">
                    <p className="find-ghost-eyebrow">
                        FEAR LAB RESULT
                    </p>

                    <h2>
                        {gameStatus === "won"
                            ? "YOU FOUND THE GHOST"
                            : "THE GHOST ESCAPED"}
                    </h2>

                    <p>
                        {gameStatus === "won"
                            ? "You discovered its hiding place. You survived the haunted room."
                            : "You used all five attempts. The ghost remains hidden in the darkness."}
                    </p>

                    <div className="find-ghost-final-stats">
                        <span>CLICKS USED</span>
                        <strong>
                            {clicksUsed}/{MAX_CLICKS}
                        </strong>
                    </div>

                    <button
                        className="find-ghost-start-button"
                        onClick={startGame}
                    >
                        PLAY AGAIN
                    </button>

                    <Link
                        to="/fear-lab"
                        className="find-ghost-back-button"
                    >
                        ← BACK TO FEAR LAB
                    </Link>
                </section>
            )}
        </main>
    );
}

export default FindTheGhost;
