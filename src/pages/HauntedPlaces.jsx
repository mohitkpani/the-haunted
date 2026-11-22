
import { useState } from "react";
import { Link } from "react-router-dom";
import places from "../data/places";
import "../styles/haunted-places.css";

function HauntedPlaces() {
    const [category, setCategory] = useState("ALL");

    const categories = [
        "ALL",
        ...new Set(places.map((place) => place.category)),
    ];

    const filteredPlaces = places.filter((place) => {
        return category === "ALL" || place.category === category;
    });

    return (
        <main className="haunted-places-page">
            {/* Main heading */}
            <section className="places-heading">
                <p>EXPLORE THE UNKNOWN</p>
                <h1>HAUNTED PLACES</h1>
                <div className="places-divider"></div>
                <span>
                    Discover the world's most mysterious and eerie locations.
                </span>
            </section>

            <section className="places-section">

                {/* Category filters */}
                <div className="haunted-place-filter">
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

                {/* Location cards */}
                <div className="places-grid">
                    {filteredPlaces.length > 0 ? (
                        filteredPlaces.map((place) => (
                            <article className="place-card" key={place.id}>
                                <div className="place-image">
                                    <img
                                        src={place.image}
                                        alt={place.name}
                                        loading="lazy"
                                    />
                                    <span>{place.category}</span>
                                </div>

                                <div className="place-content">
                                    <h3>{place.name}</h3>

                                    <p className="place-location">
                                        <span>⌖</span> {place.location}
                                    </p>

                                    <p className="place-description">
                                        {place.description}
                                    </p>

                                    <Link
                                        to={`/haunted-places/${place.id}`}
                                        className="place-explore-button"
                                    >
                                        EXPLORE LOCATION →
                                    </Link>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="places-empty">
                            <h3>NO HAUNTED PLACES FOUND</h3>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}

export default HauntedPlaces;
