
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/fear-test.css";

const QUESTION_TIME = 15;

const questions = [
    {
        question: "You wake up at 3 AM. Someone is standing beside your bed. What do you do?",
        answers: [
            { text: "Turn on the light immediately", score: 0 },
            { text: "Hide under the blanket", score: 5 },
            { text: "Scream and run away", score: 10 },
            { text: "Stay still and stare at it", score: 15 },
        ],
    },
    {
        question: "You hear your name being whispered from an empty room.",
        answers: [
            { text: "Ignore it and continue sleeping", score: 0 },
            { text: "Check the room carefully", score: 5 },
            { text: "Call someone for help", score: 10 },
            { text: "Walk towards the voice", score: 15 },
        ],
    },
    {
        question: "Your reflection smiles when you don't.",
        answers: [
            { text: "Look away immediately", score: 0 },
            { text: "Rub your eyes and look again", score: 5 },
            { text: "Run away from the mirror", score: 10 },
            { text: "Touch the mirror", score: 15 },
        ],
    },
    {
        question: "You are alone in a dark house. Someone knocks on the window.",
        answers: [
            { text: "Close the curtains", score: 0 },
            { text: "Look through the window", score: 5 },
            { text: "Lock every door", score: 10 },
            { text: "Open the window", score: 15 },
        ],
    },
    {
        question: "An elevator stops between floors. The lights go out.",
        answers: [
            { text: "Press the emergency button", score: 0 },
            { text: "Call someone", score: 5 },
            { text: "Try to force the doors open", score: 10 },
            { text: "Climb through the ceiling", score: 15 },
        ],
    },
    {
        question: "You receive a message from your own number: DON'T TURN AROUND.",
        answers: [
            { text: "Put the phone away", score: 0 },
            { text: "Check behind you quickly", score: 5 },
            { text: "Run out of the room", score: 10 },
            { text: "Slowly turn around", score: 15 },
        ],
    },
    {
        question: "A child's voice is coming from an abandoned basement.",
        answers: [
            { text: "Stay outside", score: 0 },
            { text: "Call for help", score: 5 },
            { text: "Enter with a flashlight", score: 10 },
            { text: "Go downstairs alone", score: 15 },
        ],
    },
    {
        question: "You see a shadow following you, but nobody is there.",
        answers: [
            { text: "Go somewhere crowded", score: 0 },
            { text: "Turn on every light", score: 5 },
            { text: "Try to confront it", score: 10 },
            { text: "Follow the shadow", score: 15 },
        ],
    },
    {
        question: "At midnight, your locked bedroom door slowly opens.",
        answers: [
            { text: "Lock it again and call someone", score: 0 },
            { text: "Switch on the lights", score: 5 },
            { text: "Hide behind the bed", score: 10 },
            { text: "Stand in front of the doorway", score: 15 },
        ],
    },
    {
        question: "A voice behind you whispers: YOU ARE NOT ALONE.",
        answers: [
            { text: "Leave immediately", score: 0 },
            { text: "Call someone you trust", score: 5 },
            { text: "Look around nervously", score: 10 },
            { text: "Whisper: I KNOW", score: 15 },
        ],
    },
];

function getFearResult(score) {
    if (score <= 30) {
        return {
            title: "FEARLESS",
            description: "Fear has very little control over you. Darkness doesn't seem to bother you.",
        };
    }

    if (score <= 60) {
        return {
            title: "BRAVE SOUL",
            description: "You feel fear, but you know how to keep yourself together.",
        };
    }

    if (score <= 90) {
        return {
            title: "NERVOUS SURVIVOR",
            description: "You are brave sometimes, but the darkness gets inside your head.",
        };
    }

    if (score <= 120) {
        return {
            title: "TERRIFIED",
            description: "Your imagination makes every shadow look dangerous.",
        };
    }

    return {
        title: "PURE NIGHTMARE",
        description: "Fear has taken over. You might not survive another night alone.",
    };
}

function FearTest() {
    const [gameStatus, setGameStatus] = useState("intro");
    const [questionIndex, setQuestionIndex] = useState(0);
    const [fearScore, setFearScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showJumpScare, setShowJumpScare] = useState(false);

    const timerRef = useRef(null);
    const answerTimerRef = useRef(null);

    // Jump scare references
    const jumpScareAudioRef = useRef(null);
    const jumpScareTimerRef = useRef(null);
    const jumpScareHideRef = useRef(null);
    const jumpScareTriggeredRef = useRef(false);

    const currentQuestion = questions[questionIndex];

    // Load jump scare sound
    useEffect(() => {
        const audio = new Audio("/sounds/bloody-marry.mp3");
        audio.volume = 1;
        audio.preload = "auto";

        jumpScareAudioRef.current = audio;

        return () => {
            audio.pause();
            audio.currentTime = 0;
            jumpScareAudioRef.current = null;

            clearInterval(timerRef.current);
            clearTimeout(answerTimerRef.current);
            clearTimeout(jumpScareTimerRef.current);
            clearTimeout(jumpScareHideRef.current);
        };
    }, []);

    // Stop jump scare
    function stopJumpScare() {
        clearTimeout(jumpScareTimerRef.current);
        clearTimeout(jumpScareHideRef.current);

        jumpScareTimerRef.current = null;
        jumpScareHideRef.current = null;

        setShowJumpScare(false);

        if (jumpScareAudioRef.current) {
            jumpScareAudioRef.current.pause();
            jumpScareAudioRef.current.currentTime = 0;
        }
    }

    // Trigger ghost jump scare
    function triggerJumpScare() {
        if (jumpScareTriggeredRef.current) return;

        jumpScareTriggeredRef.current = true;
        setShowJumpScare(true);

        if (jumpScareAudioRef.current) {
            jumpScareAudioRef.current.currentTime = 0;

            jumpScareAudioRef.current.play().catch((error) => {
                console.error("Jump scare sound failed:", error);
            });
        }

        jumpScareHideRef.current = setTimeout(() => {
            setShowJumpScare(false);
            jumpScareHideRef.current = null;
        }, 1500);
    }

    // Start or restart game
    function startGame() {
        clearInterval(timerRef.current);
        clearTimeout(answerTimerRef.current);

        stopJumpScare();

        jumpScareTriggeredRef.current = false;

        setQuestionIndex(0);
        setFearScore(0);
        setTimeLeft(QUESTION_TIME);
        setSelectedAnswer(null);
        setGameStatus("playing");
    }

    // Finish game
    function finishGame(finalScore) {
        clearInterval(timerRef.current);
        clearTimeout(answerTimerRef.current);

        stopJumpScare();

        setFearScore(finalScore);
        setGameStatus("result");
    }

    // Move to next question
    function nextQuestion(scoreToAdd) {
        const updatedScore = fearScore + scoreToAdd;

        setFearScore(updatedScore);
        setSelectedAnswer(null);

        if (questionIndex === questions.length - 1) {
            finishGame(updatedScore);
            return;
        }

        setQuestionIndex((previous) => previous + 1);
        setTimeLeft(QUESTION_TIME);
    }

    // Select answer
    function chooseAnswer(answer, index) {
        if (selectedAnswer !== null || gameStatus !== "playing") return;

        setSelectedAnswer(index);
        clearInterval(timerRef.current);

        answerTimerRef.current = setTimeout(() => {
            nextQuestion(answer.score);
            answerTimerRef.current = null;
        }, 650);
    }

    // Question countdown
    useEffect(() => {
        if (gameStatus !== "playing") return;

        timerRef.current = setInterval(() => {
            setTimeLeft((previous) => {
                if (previous <= 1) {
                    clearInterval(timerRef.current);
                    return 0;
                }

                return previous - 1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [gameStatus, questionIndex]);

    // Time runs out
    useEffect(() => {
        if (gameStatus !== "playing" || timeLeft !== 0) return;

        nextQuestion(15);
    }, [timeLeft, gameStatus]);

    // Random jump scare once per game
    useEffect(() => {
        if (gameStatus !== "playing" || jumpScareTriggeredRef.current) {
            return;
        }

        const delay = 12000 + Math.random() * 13000;

        jumpScareTimerRef.current = setTimeout(() => {
            triggerJumpScare();
            jumpScareTimerRef.current = null;
        }, delay);

        return () => {
            clearTimeout(jumpScareTimerRef.current);
            jumpScareTimerRef.current = null;
        };
    }, [gameStatus]);

    const result = getFearResult(fearScore);

    return (
        <main className="fear-test-page">
            <div className="fear-test-overlay"></div>

            {gameStatus === "intro" && (
                <section className="fear-test-intro">
                    <p className="fear-test-eyebrow">FEAR LAB PRESENTS</p>

                    <h1>FEAR TEST</h1>

                    <p className="fear-test-tagline">
                        FACE YOUR FEARS. DISCOVER YOUR DARK SIDE.
                    </p>

                    <div className="fear-test-instructions">
                        <h2>ARE YOU READY?</h2>

                        <p>
                            You will face 10 frightening situations.
                            Every decision reveals something about your fear.
                        </p>

                        <div className="fear-test-rules">
                            <span>10 QUESTIONS</span>
                            <span>15 SECONDS EACH</span>
                            <span>NO SECOND CHANCES</span>
                        </div>

                        <p className="fear-test-warning">
                            THINK CAREFULLY. TIME IS RUNNING OUT.
                        </p>
                    </div>

                    <button
                        className="fear-test-button"
                        onClick={startGame}
                    >
                        START FEAR TEST
                    </button>

                    <Link to="/fear-lab" className="fear-test-back">
                        ← BACK TO FEAR LAB
                    </Link>
                </section>
            )}

            {gameStatus === "playing" && (
                <section className="fear-test-game">
                    <p className="fear-test-eyebrow">YOUR NIGHTMARE BEGINS</p>

                    <div className="fear-test-progress">
                        <span>
                            QUESTION {questionIndex + 1} / {questions.length}
                        </span>

                        <span className={timeLeft <= 5 ? "timer-danger" : ""}>
                            {timeLeft}s
                        </span>
                    </div>

                    <div className="fear-test-progress-track">
                        <div
                            style={{
                                width: `${((questionIndex + 1) / questions.length) * 100}%`,
                            }}
                        ></div>
                    </div>

                    <h2>{currentQuestion.question}</h2>

                    <div className="fear-test-answers">
                        {currentQuestion.answers.map((answer, index) => (
                            <button
                                key={index}
                                className={`fear-test-answer ${selectedAnswer === index ? "selected" : ""
                                    }`}
                                disabled={selectedAnswer !== null}
                                onClick={() => chooseAnswer(answer, index)}
                            >
                                <span>{String.fromCharCode(65 + index)}</span>
                                {answer.text}
                            </button>
                        ))}
                    </div>

                    <p className="fear-test-small-warning">
                        THE DARKNESS IS WAITING FOR YOUR ANSWER...
                    </p>
                </section>
            )}

            {gameStatus === "result" && (
                <section className="fear-test-result">
                    <p className="fear-test-eyebrow">YOUR FEAR PROFILE</p>

                    <h2>{result.title}</h2>

                    <div className="fear-test-score">
                        <strong>{fearScore}</strong>
                        <span> / 150 FEAR SCORE</span>
                    </div>

                    <p>{result.description}</p>

                    <p className="fear-test-final-message">
                        YOU HAVE FACED THE DARKNESS. BUT HAS IT LEFT YOU?
                    </p>

                    <button
                        className="fear-test-button"
                        onClick={startGame}
                    >
                        TRY AGAIN
                    </button>

                    <Link to="/fear-lab" className="fear-test-back">
                        ← BACK TO FEAR LAB
                    </Link>
                </section>
            )}

            {/* GHOST JUMP SCARE */}
            {showJumpScare && (
                <div className="fear-test-jumpscare">
                    <img
                        src="/images/fear-lab/find-the-ghost-character.webp"
                        alt="Sudden ghost appearance"
                    />

                    <h2>IT FOUND YOU!</h2>
                </div>
            )}
        </main>
    );
}

export default FearTest;
