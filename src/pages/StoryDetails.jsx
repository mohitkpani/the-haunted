
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import stories from "../data/stories";
import comicPages from "../data/comicPages";

import "../styles/story-details.css";

function StoryDetails() {
    const { storyId } = useParams();

    const story = stories.find((item) => item.id === storyId);
    const pages = comicPages[storyId] || [];

    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        setCurrentPage(0);
    }, [storyId]);


    useEffect(() => {
        function handleKeyDown(event) {
            // Don't change pages while typing in an input
            if (
                event.target.tagName === "INPUT" ||
                event.target.tagName === "TEXTAREA"
            ) {
                return;
            }

            if (event.key === "ArrowRight") {
                setCurrentPage((page) =>
                    Math.min(page + 1, pages.length - 1)
                );
            }

            if (event.key === "ArrowLeft") {
                setCurrentPage((page) =>
                    Math.max(page - 1, 0)
                );
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [pages.length]);


    if (!story) {
        return (
            <main className="story-not-found">
                <h1>STORY NOT FOUND</h1>
                <p>This story has disappeared into the darkness.</p>
                <Link to="/stories">← BACK TO STORIES</Link>
            </main>
        );
    }

    if (pages.length === 0) {
        return (
            <main className="story-details-page">
                <h1>{story.title}</h1>
                <p>Comic pages are coming soon...</p>
                <Link to="/stories">← BACK TO STORIES</Link>
            </main>
        );
    }

    const isFirstPage = currentPage === 0;
    const isLastPage = currentPage === pages.length - 1;

    function handlePrevious() {
        if (!isFirstPage) {
            setCurrentPage((page) => page - 1);
        }
    }

    function handleNext() {
        if (!isLastPage) {
            setCurrentPage((page) => page + 1);
        }
    }

    return (
        <main className="story-details-page">
            <div className="story-details-overlay"></div>

            <section className="comic-reader">
                <Link to="/stories" className="back-to-stories">
                    ← BACK TO STORIES
                </Link>

                <div className="comic-heading">
                    <p>{story.category}</p>
                    <h1>{story.title}</h1>
                    <span>{story.description}</span>
                </div>

                <div className="comic-page-container">
                    <img
                        key={pages[currentPage]}
                        src={pages[currentPage]}
                        alt={`${story.title} - Page ${currentPage + 1}`}
                        className="comic-page-image"
                    />
                </div>

                <div className="comic-navigation">
                    <button
                        onClick={handlePrevious}
                        disabled={isFirstPage}
                        className="comic-nav-button"
                    >
                        ← PREVIOUS
                    </button>

                    <span className="comic-page-counter">
                        PAGE {currentPage + 1} / {pages.length}
                    </span>

                    {isLastPage ? (
                        <Link to="/stories" className="comic-nav-button finish-reading">
                            FINISH READING →
                        </Link>
                    ) : (
                        <button
                            onClick={handleNext}
                            className="comic-nav-button"
                        >
                            NEXT →
                        </button>
                    )}
                </div>
            </section>
        </main>
    );
}

export default StoryDetails;
