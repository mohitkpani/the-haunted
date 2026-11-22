
import { useState } from "react";
import { Link } from "react-router-dom";
import entities from "../data/entities";
import "../styles/paranormal.css";

function Paranormal() {
    const [category, setCategory] = useState("ALL");

    // Only two main categories
    const categories = [
        "ALL",
        "GHOSTS & SPIRITS",
        "HAUNTED OBJECTS",
    ];

    // Filter entities based on selected category
    const filteredEntities = entities.filter((entity) => {
        return category === "ALL" || entity.category === category;
    });

    return (
        <main className="paranormal-page">

            {/* Page Header */}
            <section className="paranormal-header">
                <p className="paranormal-subtitle">
                    BEYOND THE EXPLANATION
                </p>

                <h1>PARANORMAL</h1>

                <p className="paranormal-intro">
                    Explore mysterious entities, haunted objects,
                    unexplained activities and stories from the
                    supernatural world.
                </p>
            </section>

            <section className="paranormal-content">

                {/* Category Filters */}
                <div className="paranormal-filter">
                    {categories.map((item) => (
                        <button
                            key={item}
                            type="button"
                            className={category === item ? "active" : ""}
                            onClick={() => setCategory(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {/* Paranormal Cards */}
                <div className="paranormal-grid">

                    {filteredEntities.length > 0 ? (
                        filteredEntities.map((entity) => (
                            <article
                                className="paranormal-card"
                                key={entity.id}
                            >

                                {/* Entity Image */}
                                <div className="paranormal-image">
                                    <img
                                        src={entity.image}
                                        alt={entity.name}
                                        loading="lazy"
                                    />

                                    <span>{entity.category}</span>
                                </div>

                                {/* Entity Information */}
                                <div className="paranormal-card-content">

                                    <h2>{entity.name}</h2>

                                    <p className="paranormal-location">
                                        <span>⌖</span> {entity.location}
                                    </p>

                                    <p className="paranormal-description">
                                        {entity.description}
                                    </p>

                                    <Link
                                        to={`/paranormal/${entity.id}`}
                                        className="paranormal-explore-button"
                                    >
                                        EXPLORE ENTITY →
                                    </Link>

                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="paranormal-empty">
                            <h2>NO ENTITIES FOUND</h2>
                            <p>More paranormal entries coming soon.</p>
                        </div>
                    )}

                </div>
            </section>
        </main>
    );
}

export default Paranormal;
