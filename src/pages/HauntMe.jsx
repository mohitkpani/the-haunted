
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/haunt-me.css";

function HauntMe() {
    const [started, setStarted] = useState(false);
    const [revealed, setRevealed] = useState(false);
    const [countdown, setCountdown] = useState(5);

    const audioContextRef = useRef(null);
    const ambientNodesRef = useRef([]);
    const screamAudioRef = useRef(null);

    // Load ghost scream
    useEffect(() => {
        const scream = new Audio("/sounds/ghost-scream.mp3");
        scream.volume = 0.85;
        scream.preload = "auto";

        screamAudioRef.current = scream;

        return () => {
            scream.pause();
            scream.currentTime = 0;
            screamAudioRef.current = null;
        };
    }, []);

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

    // Background horror ambience
    async function startAmbientSound() {
        const audioContext = getAudioContext();

        if (!audioContext || ambientNodesRef.current.length > 0) return;

        await audioContext.resume();

        const master = audioContext.createGain();
        master.gain.value = 0.035;
        master.connect(audioContext.destination);

        const oscillator1 = audioContext.createOscillator();
        const oscillator2 = audioContext.createOscillator();

        oscillator1.type = "sine";
        oscillator2.type = "sine";

        oscillator1.frequency.value = 48;
        oscillator2.frequency.value = 52;

        oscillator1.connect(master);
        oscillator2.connect(master);

        oscillator1.start();
        oscillator2.start();

        ambientNodesRef.current = [
            oscillator1,
            oscillator2,
            master,
        ];
    }

    // Stop background ambience
    function stopAmbientSound() {
        const nodes = ambientNodesRef.current;

        if (nodes.length === 0) return;

        nodes[0].stop();
        nodes[1].stop();

        ambientNodesRef.current = [];
    }

    // Synthesized horror impact
    async function playScareSound() {
        const audioContext = getAudioContext();

        if (!audioContext) return;

        await audioContext.resume();

        const now = audioContext.currentTime;

        const buffer = audioContext.createBuffer(
            1,
            audioContext.sampleRate,
            audioContext.sampleRate
        );

        const data = buffer.getChannelData(0);

        for (let i = 0; i < data.length; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noise = audioContext.createBufferSource();
        const filter = audioContext.createBiquadFilter();
        const noiseGain = audioContext.createGain();

        noise.buffer = buffer;
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1000, now);
        filter.frequency.exponentialRampToValueAtTime(100, now + 1.2);

        noiseGain.gain.setValueAtTime(0.3, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(audioContext.destination);

        noise.start(now);
        noise.stop(now + 1.2);

        const oscillator = audioContext.createOscillator();
        const impactGain = audioContext.createGain();

        oscillator.type = "triangle";
        oscillator.frequency.setValueAtTime(130, now);
        oscillator.frequency.exponentialRampToValueAtTime(35, now + 1);

        impactGain.gain.setValueAtTime(0.25, now);
        impactGain.gain.exponentialRampToValueAtTime(0.001, now + 1);

        oscillator.connect(impactGain);
        impactGain.connect(audioContext.destination);

        oscillator.start(now);
        oscillator.stop(now + 1);
    }

    // Play ghost scream automatically
    function playGhostScream() {
        const scream = screamAudioRef.current;

        if (!scream) return;

        scream.currentTime = 0;

        scream.play().catch((error) => {
            console.error("Ghost scream playback failed:", error);
        });
    }

    // Countdown and ghost reveal
    useEffect(() => {
        if (!started || revealed) return;

        if (countdown === 0) {
            const revealTimer = setTimeout(() => {
                setRevealed(true);

                playScareSound();
                playGhostScream();
            }, 1200);

            return () => clearTimeout(revealTimer);
        }

        const timer = setTimeout(() => {
            setCountdown((previous) => previous - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [started, revealed, countdown]);

    // Start game and sounds
    function startGame() {
        setStarted(true);
        setRevealed(false);
        setCountdown(5);

        startAmbientSound();
    }

    // Reset game and stop sounds
    function resetGame() {
        stopAmbientSound();

        if (screamAudioRef.current) {
            screamAudioRef.current.pause();
            screamAudioRef.current.currentTime = 0;
        }

        setStarted(false);
        setRevealed(false);
        setCountdown(5);
    }

    // Clean up audio when leaving the page
    useEffect(() => {
        return () => {
            const nodes = ambientNodesRef.current;

            if (nodes.length > 0) {
                nodes[0].stop();
                nodes[1].stop();
            }

            ambientNodesRef.current = [];

            if (screamAudioRef.current) {
                screamAudioRef.current.pause();
                screamAudioRef.current = null;
            }

            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    return (
        <main className="haunt-me-page">

            <div className="haunt-me-background-overlay"></div>

            {!started ? (
                <section className="haunt-me-intro">
                    <p>FEAR LAB PRESENTS</p>
                    <h1>HAUNT ME</h1>

                    <span>
                        Something is waiting in the darkness.
                    </span>

                    <button onClick={startGame}>
                        START EXPERIENCE
                    </button>

                    <Link
                        to="/fear-lab"
                        className="back-to-fear-lab"
                    >
                        ← BACK TO FEAR LAB
                    </Link>
                </section>
            ) : (
                <section className="haunt-me-game">

                    <p className="haunt-me-warning">
                        {revealed ? "TOO LATE..." : "DO NOT LOOK AWAY"}
                    </p>

                    <div
                        className={`haunt-me-scene ${revealed ? "revealed" : ""
                            }`}
                    >
                        {!revealed ? (
                            <div className="haunt-me-darkness">
                                <span>
                                    {countdown > 0 ? countdown : "..."}
                                </span>

                                <p>
                                    {countdown > 0
                                        ? "Something is watching you..."
                                        : "Something is getting closer..."}
                                </p>
                            </div>
                        ) : (
                            <div className="haunt-me-ghost">
                                <img
                                    src="/images/fear-lab/haunt-me-ghost.webp"
                                    alt="Terrifying ghost emerging from the darkness"
                                />

                                <h2>IT FOUND YOU</h2>
                                <p>You were never alone.</p>
                            </div>
                        )}
                    </div>

                    {revealed && (
                        <button onClick={resetGame}>
                            PLAY AGAIN
                        </button>
                    )}

                </section>
            )}

        </main>
    );
}

export default HauntMe;
