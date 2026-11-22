
import { useParams, Link, useNavigate } from "react-router-dom";
import entities from "../data/entities";
import "../styles/place-details.css";

function ParanormalDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const entity = entities.find((item) => item.id === id);

    if (!entity) {
        return (
            <main className="place-not-found">
                <h1>ENTITY NOT FOUND</h1>
                <p>This mysterious entity has disappeared into the darkness.</p>
                <Link to="/paranormal">
                    ← BACK TO PARANORMAL
                </Link>
            </main>
        );
    }

    return (
        <main className="place-details-page">
            <section className="place-details-container">

                <button
                    type="button"
                    className="place-back-link"
                    onClick={() => navigate("/paranormal")}
                >
                    ← BACK TO PARANORMAL
                </button>

                <div className="place-details-image">
                    <img src={entity.image} alt={entity.name} />
                </div>

                <div className="place-details-content">

                    <p className="place-details-category">
                        {entity.category}
                    </p>

                    <h1>{entity.name}</h1>

                    <p className="place-details-location">
                        {entity.location}
                    </p>

                    <div className="place-details-divider"></div>

                    <p className="place-details-description">
                        {entity.description}
                    </p>

                    <div className="place-info-section">
                        <h2>ABOUT THE ENTITY</h2>
                        <p>
                            {entity.about || "Information coming soon."}
                        </p>
                    </div>

                    <div className="place-info-section">
                        <h2>LEGEND & ORIGIN</h2>
                        <p>
                            {entity.legend || "Legend coming soon."}
                        </p>
                    </div>

                    <div className="place-info-section">
                        <h2>REPORTED PARANORMAL ACTIVITIES</h2>
                        <p>
                            {entity.reportedActivity || "Reports coming soon."}
                        </p>
                    </div>

                    <div className="place-info-section quick-facts">
                        <h2>QUICK FACTS</h2>

                        {entity.quickFacts &&
                            Object.entries(entity.quickFacts).map(
                                ([key, value]) => (
                                    <div
                                        className="quick-fact-row"
                                        key={key}
                                    >
                                        <span>{key}</span>
                                        <span>{value}</span>
                                    </div>
                                )
                            )}
                    </div>

                    <Link
                        to="/paranormal"
                        className="place-back-button"
                    >
                        EXPLORE MORE PARANORMAL →
                    </Link>

                </div>
            </section>
        </main>
    );
}

export default ParanormalDetails;
