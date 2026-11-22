
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/dont-blink.css";

function DontBlink() {
    const [started, setStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [survived, setSurvived] = useState(false);
    const [ghostVisible, setGhostVisible] = useState(false);

    const timeLeftRef = useRef(30);
    const ghostScreamRef = useRef(null);
    const footstepsRef = useRef(null);
    const whisperRef = useRef(null);

    const audioContextRef = useRef(null);
    const ambientNodesRef = useRef([]);
    const footstepTimerRef = useRef(null);
    const whisperTimerRef = useRef(null);

    // Load Bloody Mary scream sound
    useEffect(() => {
        const scream = new Audio("/sounds/bloody-marry.mp3");
        scream.volume = 1;
        scream.preload = "auto";

        ghostScreamRef.current = scream;

        return () => {
            scream.pause();
            scream.currentTime = 0;
            ghostScreamRef.current = null;
        };
    }, []);

    // Load real footsteps MP3
    useEffect(() => {
        const footsteps = new Audio("/sounds/footsteps.mp3");
        footsteps.volume = 0.75;
        footsteps.preload = "auto";

        footstepsRef.current = footsteps;

        return () => {
            footsteps.pause();
            footsteps.currentTime = 0;
            footstepsRef.current = null;
        };
    }, []);

    // Load female whisper MP3
    useEffect(() => {
        const whisper = new Audio("/sounds/female-whisper.mp3");
        whisper.volume = 0.55;
        whisper.preload = "auto";

        whisperRef.current = whisper;

        return () => {
            whisper.pause();
            whisper.currentTime = 0;
            whisperRef.current = null;
        };
    }, []);

    // Play sudden ghost scream
    function playGhostScream() {
        const scream = ghostScreamRef.current;

        if (!scream) return;

        scream.currentTime = 0;

        scream.play().catch((error) => {
            console.error("Ghost scream playback failed:", error);
        });
    }

    // Create audio context
    function getAudioContext() {
        if (!audioContextRef.current) {
            const AudioContextClass =
                window.AudioContext || window.webkitAudioContext;

            if (!AudioContextClass) return null;

            audioContextRef.current = new AudioContextClass();
        }

        return audioContextRef.current;
    }

    // Start background horror ambience
    async function startAtmosphere() {
        const audioContext = getAudioContext();

        if (!audioContext || ambientNodesRef.current.length > 0) return;

        try {
            await audioContext.resume();

            const master = audioContext.createGain();
            master.gain.value = 0.035;
            master.connect(audioContext.destination);

            const oscillator1 = audioContext.createOscillator();
            const oscillator2 = audioContext.createOscillator();

            oscillator1.type = "sine";
            oscillator2.type = "sine";

            oscillator1.frequency.value = 45;
            oscillator2.frequency.value = 49;

            oscillator1.connect(master);
            oscillator2.connect(master);

            oscillator1.start();
            oscillator2.start();

            ambientNodesRef.current = [
                oscillator1,
                oscillator2,
                master
            ];
        } catch (error) {
            console.error("Atmosphere audio failed:", error);
        }
    }

    // Play downloaded footsteps MP3
    function playFootstep() {
        const footsteps = footstepsRef.current;

        if (!footsteps) return;

        footsteps.currentTime = 0;

        footsteps.play().catch((error) => {
            console.error("Footsteps playback failed:", error);
        });
    }

    // Schedule random footsteps
    function scheduleFootsteps() {
        const elapsed = 30 - timeLeftRef.current;

        const delay = Math.max(
            650,
            2600 - elapsed * 60
        ) + Math.random() * 900;

        footstepTimerRef.current = setTimeout(() => {
            if (timeLeftRef.current <= 0) return;

            playFootstep();
            scheduleFootsteps();
        }, delay);
    }

    // Play female whisper
    function playWhisper() {
        const whisper = whisperRef.current;

        if (!whisper || !whisper.paused) return;

        whisper.currentTime = 0;

        whisper.play().catch((error) => {
            console.error("Whisper playback failed:", error);
        });
    }

    // Schedule random female whispers
    function scheduleWhispers() {
        const delay = 6000 + Math.random() * 7000;

        whisperTimerRef.current = setTimeout(() => {
            if (timeLeftRef.current <= 0) return;

            playWhisper();
            scheduleWhispers();
        }, delay);
    }

    // Stop ambience and all background sounds
    function stopAtmosphere() {
        if (footstepTimerRef.current) {
            clearTimeout(footstepTimerRef.current);
            footstepTimerRef.current = null;
        }

        if (whisperTimerRef.current) {
            clearTimeout(whisperTimerRef.current);
            whisperTimerRef.current = null;
        }

        if (footstepsRef.current) {
            footstepsRef.current.pause();
            footstepsRef.current.currentTime = 0;
        }

        if (whisperRef.current) {
            whisperRef.current.pause();
            whisperRef.current.currentTime = 0;
        }

        const nodes = ambientNodesRef.current;

        if (nodes.length > 0) {
            nodes[0].stop();
            nodes[1].stop();

            ambientNodesRef.current = [];
        }
    }

    // Keep track of the latest countdown value
    useEffect(() => {
        timeLeftRef.current = timeLeft;
    }, [timeLeft]);

    // 30-second survival timer
    useEffect(() => {
        if (!started || survived) return;

        if (timeLeft === 0) {
            setSurvived(true);
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft((previous) => previous - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [started, timeLeft, survived]);

    // Random Bloody Mary appearances
    useEffect(() => {
        if (!started || survived) {
            setGhostVisible(false);
            return;
        }

        let appearanceTimer;
        let hideTimer;

        function scheduleGhost() {
            const elapsed = 30 - timeLeftRef.current;

            const baseDelay = Math.max(
                900,
                4500 - elapsed * 110
            );

            const randomDelay = baseDelay + Math.random() * 1500;

            appearanceTimer = setTimeout(() => {
                setGhostVisible(true);
                playGhostScream();

                hideTimer = setTimeout(() => {
                    setGhostVisible(false);
                    scheduleGhost();
                }, 1600);

            }, randomDelay);
        }

        scheduleGhost();

        return () => {
            clearTimeout(appearanceTimer);
            clearTimeout(hideTimer);
            setGhostVisible(false);
        };
    }, [started, survived]);

    // Stop atmosphere when the game finishes
    useEffect(() => {
        if (survived) {
            stopAtmosphere();

            if (ghostScreamRef.current) {
                ghostScreamRef.current.pause();
                ghostScreamRef.current.currentTime = 0;
            }
        }
    }, [survived]);

    // Start game
    function startGame() {
        stopAtmosphere();

        setTimeLeft(30);
        timeLeftRef.current = 30;
        setSurvived(false);
        setGhostVisible(false);
        setStarted(true);

        startAtmosphere();
        scheduleFootsteps();
        scheduleWhispers();
    }

    // Restart game
    function restartGame() {
        stopAtmosphere();

        setTimeLeft(30);
        timeLeftRef.current = 30;
        setSurvived(false);
        setGhostVisible(false);
        setStarted(false);

        if (ghostScreamRef.current) {
            ghostScreamRef.current.pause();
            ghostScreamRef.current.currentTime = 0;
        }
    }

    // Clean up audio when leaving the page
    useEffect(() => {
        return () => {
            if (footstepTimerRef.current) {
                clearTimeout(footstepTimerRef.current);
            }

            if (whisperTimerRef.current) {
                clearTimeout(whisperTimerRef.current);
            }

            if (footstepsRef.current) {
                footstepsRef.current.pause();
                footstepsRef.current.currentTime = 0;
            }

            if (whisperRef.current) {
                whisperRef.current.pause();
                whisperRef.current.currentTime = 0;
            }

            const nodes = ambientNodesRef.current;

            if (nodes.length > 0) {
                nodes[0].stop();
                nodes[1].stop();
            }

            ambientNodesRef.current = [];

            if (audioContextRef.current) {
                audioContextRef.current.close();
                audioContextRef.current = null;
            }
        };
    }, []);

    return (
        <main
            className={`dont-blink-page
        ${ghostVisible ? "ghost-scare-active" : ""}
        ${started && !survived ? "game-active" : ""}`}
        >
            <div className={`dont-blink-overlay ${ghostVisible ? "red-flash-active" : ""}`}></div>

            {!started ? (
                <section className="dont-blink-intro">
                    <p className="dont-blink-eyebrow">
                        FEAR LAB PRESENTS
                    </p>

                    <h1>DON'T BLINK</h1>

                    <p className="dont-blink-tagline">
                        Whatever you do... don't look away.
                    </p>

                    <div className="dont-blink-instructions">
                        <h2>YOUR MISSION</h2>

                        <p>
                            Something is waiting at the end of this corridor.
                            Survive for 30 seconds without giving in to fear.
                        </p>

                        <ul>
                            <li>Keep your eyes on the screen.</li>
                            <li>Watch the shadows carefully.</li>
                            <li>Don't let the darkness fool you.</li>
                        </ul>

                        <p className="dont-blink-warning">
                            YOU ARE NOT ALONE.
                        </p>
                    </div>

                    <button
                        className="dont-blink-start-button"
                        onClick={startGame}
                    >
                        START GAME
                    </button>

                    <Link
                        to="/fear-lab"
                        className="dont-blink-back-button"
                    >
                        ← BACK TO FEAR LAB
                    </Link>
                </section>
            ) : (
                <section className="dont-blink-game">
                    {!survived ? (
                        <>
                            <p className="dont-blink-game-warning">
                                DON'T LOOK AWAY
                            </p>

                            <div className="dont-blink-timer">
                                <span>{timeLeft}</span>
                                <small>SECONDS REMAINING</small>
                            </div>

                            <p className="dont-blink-game-message">
                                Something is watching you...
                            </p>

                            {/* Bloody Mary jump scare */}
                            <div
                                className={`dont-blink-ghost ${ghostVisible ? "ghost-visible" : ""
                                    }`}
                            >
                                <img
                                    src="/images/fear-lab/dont-blink-ghost.webp"
                                    alt="Bloody Mary ghost appearing in the corridor"
                                />
                            </div>
                        </>
                    ) : (
                        <div className="dont-blink-result">
                            <p className="dont-blink-eyebrow">
                                FEAR LAB RESULT
                            </p>

                            <h2>YOU SURVIVED</h2>

                            <p>
                                You made it through the darkness.
                                But are you really safe?
                            </p>

                            <button
                                className="dont-blink-start-button"
                                onClick={restartGame}
                            >
                                PLAY AGAIN
                            </button>

                            <Link
                                to="/fear-lab"
                                className="dont-blink-back-button"
                            >
                                ← BACK TO FEAR LAB
                            </Link>
                        </div>
                    )}
                </section>
            )}
        </main>
    );
}

export default DontBlink;
