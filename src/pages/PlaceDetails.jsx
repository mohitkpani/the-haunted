
import { useParams, Link, useNavigate } from "react-router-dom";
import places from "../data/places";
import "../styles/place-details.css";

function PlaceDetails() {
    const { placeId } = useParams();
    const navigate = useNavigate();

    const place = places.find((item) => item.id === placeId);

    if (!place) {
        return (
            <main className="place-not-found">
                <h1>LOCATION NOT FOUND</h1>
                <p>This location has disappeared into the darkness.</p>
                <Link to="/haunted-places">
                    ← BACK TO HAUNTED PLACES
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
                    onClick={() => navigate("/haunted-places")}
                >
                    ← BACK TO HAUNTED PLACES
                </button>

                <div className="place-details-image">
                    <img src={place.image} alt={place.name} />
                </div>

                <div className="place-details-content">
                    <p className="place-details-category">
                        {place.category}
                    </p>

                    <h1>{place.name}</h1>

                    <p className="place-details-location">
                        {place.location}
                    </p>

                    <div className="place-details-divider"></div>

                    <p className="place-details-description">
                        {place.description}
                    </p>

                    <div className="place-info-section">
                        <h2>ABOUT THE PLACE</h2>
                        <p>{place.about || "Information coming soon."}</p>
                    </div>

                    <div className="place-info-section">
                        <h2>THE HAUNTED LEGEND</h2>
                        <p>{place.legend || "Legend coming soon."}</p>
                    </div>

                    <div className="place-info-section">
                        <h2>REPORTED PARANORMAL ACTIVITIES</h2>
                        <p>
                            {place.reportedActivity || "Reports coming soon."}
                        </p>
                    </div>

                    <div className="place-info-section quick-facts">
                        <h2>QUICK FACTS</h2>

                        {place.quickFacts &&
                            Object.entries(place.quickFacts).map(([key, value]) => (
                                <div className="quick-fact-row" key={key}>
                                    <span>{key}</span>
                                    <span>{value}</span>
                                </div>
                            ))}
                    </div>

                    <Link
                        to="/haunted-places"
                        className="place-back-button"
                    >
                        EXPLORE MORE LOCATIONS →
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default PlaceDetails;
