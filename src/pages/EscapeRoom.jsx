
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/escape-room.css";

const randomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

function generatePuzzles() {
    const paintingA = randomNumber(1, 5);
    const paintingB = randomNumber(1, 4);
    const clockA = randomNumber(1, 3);
    const clockB = randomNumber(1, 3);
    const bookshelfStart = randomNumber(1, 3);
    const bookshelfStep = randomNumber(1, 2);
    const tableA = randomNumber(1, 3);
    const tableB = randomNumber(1, 3);

    return [
        {
            id: "painting",
            name: "Cursed Painting",
            question: `A strange inscription reads: "I am ${paintingA} more than ${paintingB}. What number am I?"`,
            answer: String(paintingA + paintingB),
            hint: `Add ${paintingA} and ${paintingB}.`,
        },
        {
            id: "clock",
            name: "Broken Clock",
            question: `The clock whispers: "Take ${clockA} and multiply it by ${clockB}. What number remains?"`,
            answer: String(clockA * clockB),
            hint: `Multiply ${clockA} by ${clockB}.`,
        },
        {
            id: "bookshelf",
            name: "Forbidden Bookshelf",
            question: `A sequence is carved into the shelf: ${bookshelfStart}, ${bookshelfStart + bookshelfStep}, ${bookshelfStart + bookshelfStep * 2}, ?. What comes next?`,
            answer: String(bookshelfStart + bookshelfStep * 3),
            hint: "The same number is added each time. Find the difference.",
        },
        {
            id: "table",
            name: "Mysterious Table",
            question: `A note says: "I have ${tableA} groups of ${tableB} candles. How many candles are there altogether?"`,
            answer: String(tableA * tableB),
            hint: `Multiply ${tableA} by ${tableB}.`,
        },
    ];
}

function EscapeRoom() {
    const [gameStarted, setGameStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(180);
    const [message, setMessage] = useState("Find a way to escape...");
    const [puzzles, setPuzzles] = useState([]);
    const [solved, setSolved] = useState([]);
    const [activePuzzle, setActivePuzzle] = useState(null);
    const [answer, setAnswer] = useState("");
    const [showChest, setShowChest] = useState(false);
    const [chestUnlocked, setChestUnlocked] = useState(false);
    const [hasKey, setHasKey] = useState(false);
    const [doorUnlocked, setDoorUnlocked] = useState(false);
    const [finalCode, setFinalCode] = useState("");
    const [inventory, setInventory] = useState([]);
    const [showJumpScare, setShowJumpScare] = useState(false);
    const [wrongAnswerCount, setWrongAnswerCount] = useState(0);

    // AUDIO REFERENCES
    const ambientAudioRef = useRef(null);
    const jumpScareAudioRef = useRef(null);
    const whisperAudioRef = useRef(null);
    const chestAudioRef = useRef(null);
    const timeUpAudioRef = useRef(null);
    const hideTimerRef = useRef(null);

    const gameOver = timeLeft <= 0 && !doorUnlocked;

    // LOAD SOUND EFFECTS
    useEffect(() => {
        const sounds = {
            jumpScare: new Audio("/sounds/bloody-marry.mp3"),
            whisper: new Audio("/sounds/creepy-whisper.mp3"),
            chest: new Audio("/sounds/chest-open.mp3"),
            timeUp: new Audio("/sounds/time-up-scream.mp3"),
        };

        sounds.jumpScare.volume = 1;
        sounds.whisper.volume = 0.8;
        sounds.chest.volume = 0.9;
        sounds.timeUp.volume = 1;

        Object.values(sounds).forEach((audio) => {
            audio.preload = "auto";
        });

        jumpScareAudioRef.current = sounds.jumpScare;
        whisperAudioRef.current = sounds.whisper;
        chestAudioRef.current = sounds.chest;
        timeUpAudioRef.current = sounds.timeUp;

        return () => {
            Object.values(sounds).forEach((audio) => {
                audio.pause();
                audio.currentTime = 0;
            });
        };
    }, []);

    // PLAY SOUND
    const playSound = (audioRef) => {
        const audio = audioRef.current;

        if (!audio) return;

        audio.currentTime = 0;
        audio.play().catch((error) => {
            console.log("Sound playback failed:", error);
        });
    };

    // STOP SOUND
    const stopSound = (audioRef) => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    // BACKGROUND MUSIC
    const startAmbientMusic = () => {
        stopAmbientMusic();

        const audio = new Audio("/sounds/escape-room-ambient.mp3");
        audio.loop = true;
        audio.volume = 0.35;

        ambientAudioRef.current = audio;

        audio.play().catch((error) => {
            console.log("Background music playback failed:", error);
        });
    };

    const stopAmbientMusic = () => {
        if (ambientAudioRef.current) {
            ambientAudioRef.current.pause();
            ambientAudioRef.current.currentTime = 0;
            ambientAudioRef.current = null;
        }
    };

    const stopAllEffects = () => {
        stopSound(jumpScareAudioRef);
        stopSound(whisperAudioRef);
        stopSound(chestAudioRef);
        stopSound(timeUpAudioRef);
    };

    // TIMER
    useEffect(() => {
        if (!gameStarted || doorUnlocked || gameOver) return;

        const timer = setInterval(() => {
            setTimeLeft((previous) => Math.max(0, previous - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, [gameStarted, doorUnlocked, gameOver]);

    // TIME UP
    useEffect(() => {
        if (gameOver) {
            stopAmbientMusic();
            stopSound(jumpScareAudioRef);
            playSound(timeUpAudioRef);
        }
    }, [gameOver]);

    // RANDOM JUMP SCARE — ONCE PER GAME
    useEffect(() => {
        if (!gameStarted || gameOver || doorUnlocked) return;

        const randomDelay = randomNumber(18000, 35000);

        const jumpScareTimer = setTimeout(() => {
            setShowJumpScare(true);
            playSound(jumpScareAudioRef);

            hideTimerRef.current = setTimeout(() => {
                setShowJumpScare(false);
                hideTimerRef.current = null;
            }, 1500);
        }, randomDelay);

        return () => {
            clearTimeout(jumpScareTimer);

            if (hideTimerRef.current) {
                clearTimeout(hideTimerRef.current);
                hideTimerRef.current = null;
            }
        };
    }, [gameStarted, gameOver, doorUnlocked]);

    // CLEANUP WHEN LEAVING PAGE
    useEffect(() => {
        return () => {
            stopAmbientMusic();

            if (hideTimerRef.current) {
                clearTimeout(hideTimerRef.current);
            }

            stopAllEffects();
        };
    }, []);

    // START GAME
    const startGame = () => {
        stopAmbientMusic();
        stopAllEffects();

        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current);
            hideTimerRef.current = null;
        }

        setShowJumpScare(false);
        startAmbientMusic();

        setPuzzles(generatePuzzles());
        setSolved([]);
        setActivePuzzle(null);
        setAnswer("");
        setShowChest(false);
        setChestUnlocked(false);
        setHasKey(false);
        setDoorUnlocked(false);
        setFinalCode("");
        setInventory([]);
        setTimeLeft(180);
        setWrongAnswerCount(0);
        setMessage("Something is watching you. Investigate the room...");
        setGameStarted(true);
    };

    // OPEN PUZZLE
    const openPuzzle = (puzzle) => {
        if (solved.includes(puzzle.id)) {
            setMessage("You have already solved this mystery.");
            return;
        }

        setActivePuzzle(puzzle);
        setAnswer("");
    };

    // SUBMIT PUZZLE ANSWER
    const submitAnswer = () => {
        if (!activePuzzle || !answer.trim()) return;

        if (answer.trim() === activePuzzle.answer) {
            setSolved((previous) => [...previous, activePuzzle.id]);

            setInventory((previous) => [
                ...previous,
                `${activePuzzle.name} clue`,
            ]);

            setMessage("Correct! You discovered a hidden code digit.");
            setActivePuzzle(null);
            setAnswer("");
        } else {
            setTimeLeft((previous) => Math.max(0, previous - 10));

            setWrongAnswerCount((previous) => previous + 1);

            setMessage(
                "WRONG ANSWER! The room grows darker. 10 seconds lost!"
            );

            playSound(whisperAudioRef);
            setAnswer("");
        }
    };

    // USE HINT
    const useHint = () => {
        if (!activePuzzle) return;

        if (timeLeft <= 15) {
            setMessage("Not enough time to use a hint!");
            return;
        }

        setTimeLeft((previous) => Math.max(0, previous - 15));
        setMessage(`A whisper gives you a hint: ${activePuzzle.hint}`);
    };

    // OPEN CHEST
    const openChest = () => {
        if (chestUnlocked) {
            setMessage("The chest is already open.");
            return;
        }

        if (solved.length !== 4) {
            setMessage(
                "The chest remains locked. Solve all four mysteries first."
            );
            return;
        }

        setShowChest(true);
        setMessage("All clues discovered. Enter the four-digit code.");
    };

    // UNLOCK CHEST
    const unlockChest = () => {
        const correctCode = puzzles
            .map((puzzle) => puzzle.answer)
            .join("");

        if (finalCode === correctCode) {
            setChestUnlocked(true);
            setHasKey(true);

            setInventory((previous) => [
                ...previous,
                "Old Room Key",
            ]);

            setShowChest(false);
            setFinalCode("");
            setMessage("The chest opens. You found the rusty room key!");

            playSound(chestAudioRef);
        } else {
            setTimeLeft((previous) => Math.max(0, previous - 10));
            setMessage("INCORRECT CODE! 10 seconds lost.");
            setFinalCode("");

            playSound(whisperAudioRef);
        }
    };

    // UNLOCK DOOR
    const unlockDoor = () => {
        if (!hasKey) {
            setMessage("The haunted door is locked. Find the key first.");
            return;
        }

        setDoorUnlocked(true);
        setShowJumpScare(false);

        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current);
            hideTimerRef.current = null;
        }

        stopAllEffects();
        stopAmbientMusic();

        setMessage("The door opens... YOU ESCAPED!");
    };

    // FORMAT TIMER
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;
    };

    return (
        <main
            className={`escape-room-page ${showJumpScare ? "jumpscare-active" : ""
                }`}
        >
            {showJumpScare && (
                <div className="escape-room-jumpscare">
                    <img
                        src="/images/fear-lab/find-the-ghost-character.webp"
                        alt=""
                    />
                </div>
            )}

            {!gameStarted ? (
                <div className="escape-room-intro">
                    <p className="escape-room-eyebrow">
                        FEAR LAB PRESENTS
                    </p>

                    <h1>ESCAPE ROOM</h1>

                    <div className="escape-room-divider"></div>

                    <p className="escape-room-description">
                        Four mysteries. One locked chest.
                        Can your mind escape before the darkness finds you?
                    </p>

                    <button
                        className="escape-room-start"
                        onClick={startGame}
                    >
                        START ESCAPE
                    </button>

                    <Link to="/fear-lab" className="escape-room-back">
                        ← BACK TO FEAR LAB
                    </Link>
                </div>

            ) : doorUnlocked ? (
                <div className="escape-room-result">
                    <h1>YOU ESCAPED!</h1>
                    <p>You survived the haunted room.</p>

                    <button
                        className="escape-room-start"
                        onClick={startGame}
                    >
                        PLAY AGAIN
                    </button>

                    <Link to="/fear-lab" className="escape-room-back">
                        ← BACK TO FEAR LAB
                    </Link>
                </div>

            ) : gameOver ? (
                <div className="escape-room-result">
                    <h1>TIME IS UP!</h1>
                    <p>The room has claimed another victim...</p>

                    <button
                        className="escape-room-start"
                        onClick={startGame}
                    >
                        TRY AGAIN
                    </button>

                    <Link to="/fear-lab" className="escape-room-back">
                        ← BACK TO FEAR LAB
                    </Link>
                </div>

            ) : (
                <section className="escape-room-game">

                    <div className="escape-room-game-header">
                        <h1>THE LAST ROOM</h1>
                        <h2 className={wrongAnswerCount ? "timer-warning" : ""}>
                            TIME: {formatTime(timeLeft)}
                        </h2>
                    </div>

                    <p
                        key={wrongAnswerCount}
                        className={`escape-room-message ${wrongAnswerCount ? "wrong-answer" : ""
                            }`}
                    >
                        {message}
                    </p>

                    <p className="escape-room-progress">
                        MYSTERIES SOLVED: {solved.length}/4
                    </p>

                    <div className="escape-room-objects">
                        {puzzles.map((puzzle) => (
                            <button
                                key={puzzle.id}
                                className={
                                    solved.includes(puzzle.id)
                                        ? "object-discovered"
                                        : ""
                                }
                                onClick={() => openPuzzle(puzzle)}
                            >
                                {puzzle.id === "painting" && "🖼️"}
                                {puzzle.id === "clock" && "🕰️"}
                                {puzzle.id === "bookshelf" && "📚"}
                                {puzzle.id === "table" && "🕯️"}

                                <span>
                                    {solved.includes(puzzle.id)
                                        ? "MYSTERY SOLVED"
                                        : puzzle.name.toUpperCase()}
                                </span>
                            </button>
                        ))}

                        <button
                            className={chestUnlocked ? "object-discovered" : ""}
                            onClick={openChest}
                        >
                            📦
                            <span>
                                {chestUnlocked ? "CHEST OPENED" : "LOCKED CHEST"}
                            </span>
                        </button>

                        <button
                            className={hasKey ? "object-discovered" : ""}
                            onClick={unlockDoor}
                        >
                            🚪
                            <span>HAUNTED DOOR</span>
                        </button>
                    </div>

                    {activePuzzle && (
                        <div className="escape-room-puzzle">
                            <h2>{activePuzzle.name.toUpperCase()}</h2>

                            <p>{activePuzzle.question}</p>

                            <input
                                type="text"
                                inputMode="numeric"
                                value={answer}
                                onChange={(event) =>
                                    setAnswer(
                                        event.target.value.replace(/\D/g, "")
                                    )
                                }
                                placeholder="YOUR ANSWER"
                            />

                            <button onClick={submitAnswer}>
                                SUBMIT ANSWER
                            </button>

                            <button onClick={useHint}>
                                USE HINT (-15 SEC)
                            </button>

                            <button onClick={() => setActivePuzzle(null)}>
                                CLOSE
                            </button>
                        </div>
                    )}

                    {showChest && (
                        <div className="escape-room-puzzle">
                            <h2>UNLOCK THE CHEST</h2>

                            <p>
                                Combine your four discovered digits in order.
                            </p>

                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength="4"
                                value={finalCode}
                                onChange={(event) =>
                                    setFinalCode(
                                        event.target.value.replace(/\D/g, "")
                                    )
                                }
                                placeholder="FOUR-DIGIT CODE"
                            />

                            <button onClick={unlockChest}>
                                UNLOCK CHEST
                            </button>

                            <button onClick={() => setShowChest(false)}>
                                CLOSE
                            </button>
                        </div>
                    )}

                    <div className="escape-room-inventory">
                        <h3>YOUR INVENTORY</h3>

                        {inventory.length === 0 ? (
                            <p>Empty</p>
                        ) : (
                            inventory.map((item) => (
                                <p key={item}>✓ {item}</p>
                            ))
                        )}
                    </div>

                </section>
            )}
        </main>
    );
}

export default EscapeRoom;
