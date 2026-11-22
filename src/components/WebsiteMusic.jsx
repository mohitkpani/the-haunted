
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

function WebsiteMusic() {
    const audioRef = useRef(null);
    const userMutedRef = useRef(false);
    const resumeAfterGameRef = useRef(false);
    const isGamePageRef = useRef(false);

    const [soundEnabled, setSoundEnabled] = useState(false);
    const [isMobile, setIsMobile] = useState(
        window.innerWidth <= 600
    );

    const location = useLocation();

    const gamePaths = [
        "/fear-lab/haunt-me",
        "/fear-lab/dont-blink",
        "/fear-lab/find-the-ghost",
        "/fear-lab/escape-room",
        "/fear-lab/fear-test"
    ];

    const isGamePage = gamePaths.includes(location.pathname);
    const isHomePage = location.pathname === "/";

    isGamePageRef.current = isGamePage;

    // Detect mobile screen size
    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 600);
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Create music and attempt autoplay
    useEffect(() => {
        const audio = new Audio("/sounds/website-horror-ambient.mp3");

        audio.loop = true;
        audio.volume = 0.18;
        audioRef.current = audio;

        function startMusic() {
            if (
                userMutedRef.current ||
                isGamePageRef.current ||
                !audio.paused
            ) {
                return;
            }

            audio.play()
                .then(() => {
                    if (!userMutedRef.current) {
                        setSoundEnabled(true);
                    }
                })
                .catch(() => {
                    setSoundEnabled(false);
                });
        }

        // Try autoplay when the website opens
        if (!isGamePageRef.current) {
            startMusic();
        }

        // Fallback if the browser blocks autoplay
        function handleFirstInteraction(event) {
            if (
                event.target instanceof Element &&
                event.target.closest(".website-music-toggle")
            ) {
                return;
            }

            startMusic();
        }

        document.addEventListener("pointerdown", handleFirstInteraction);
        document.addEventListener("keydown", handleFirstInteraction);

        return () => {
            document.removeEventListener(
                "pointerdown",
                handleFirstInteraction
            );
            document.removeEventListener(
                "keydown",
                handleFirstInteraction
            );

            audio.pause();
            audio.currentTime = 0;
            audioRef.current = null;
        };
    }, []);

    // Pause inside games and resume when returning
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isGamePage) {
            resumeAfterGameRef.current =
                !audio.paused && !userMutedRef.current;

            audio.pause();
            setSoundEnabled(false);
        } else if (
            resumeAfterGameRef.current &&
            !userMutedRef.current
        ) {
            audio.play()
                .then(() => setSoundEnabled(true))
                .catch(() => { });

            resumeAfterGameRef.current = false;
        }
    }, [isGamePage]);

    // Music ON / OFF
    function toggleSound() {
        const audio = audioRef.current;

        if (!audio || isGamePage) return;

        if (!audio.paused) {
            userMutedRef.current = true;
            audio.pause();
            setSoundEnabled(false);
        } else {
            userMutedRef.current = false;

            audio.play()
                .then(() => setSoundEnabled(true))
                .catch(() => setSoundEnabled(false));
        }
    }

    // Responsive circular button
    const buttonSize = isMobile ? "32px" : "42px";

    const buttonStyle = {
        position: "fixed",
        right: "14px",
        bottom: "14px",
        top: "auto",
        left: "auto",
        zIndex: 99999,

        width: buttonSize,
        height: buttonSize,
        minWidth: buttonSize,
        padding: "0",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        background: "rgba(12, 5, 7, 0.95)",
        color: soundEnabled ? "#ff526d" : "#f5eeee",
        border: "1px solid #9b0025",
        borderRadius: "50%",

        fontSize: isMobile ? "8px" : "10px",
        fontWeight: "800",
        letterSpacing: "0.5px",

        cursor: "pointer",
        boxShadow: "0 0 10px rgba(160, 0, 25, 0.35)",
        transition: "all 0.3s ease"
    };

    // Show button only on Home
    if (!isHomePage) {
        return null;
    }

    return (
        <button
            type="button"
            className="website-music-toggle"
            style={buttonStyle}
            onClick={toggleSound}
            title={soundEnabled ? "Turn music off" : "Turn music on"}
            aria-label={soundEnabled ? "Turn music off" : "Turn music on"}
        >
            {soundEnabled ? "ON" : "OFF"}
        </button>
    );
}

export default WebsiteMusic;
