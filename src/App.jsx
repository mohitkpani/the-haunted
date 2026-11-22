
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import WebsiteMusic from "./components/WebsiteMusic";
import Stories from "./pages/Stories";
import StoryDetails from "./pages/StoryDetails";
import HauntedPlaces from "./pages/HauntedPlaces";
import PlaceDetails from "./pages/PlaceDetails";
import Paranormal from "./pages/Paranormal";
import ParanormalDetails from "./pages/ParanormalDetails";
import FearLab from "./pages/FearLab";
import HauntMe from "./pages/HauntMe";
import DontBlink from "./pages/DontBlink";
import FindTheGhost from "./pages/FindTheGhost";
import EscapeRoom from "./pages/EscapeRoom";
import FearTest from "./pages/FearTest";

function ComingSoon({ title }) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050304",
        color: "#f1eaea",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px"
      }}
    >
      <h1 style={{ fontFamily: "Cinzel, serif" }}>
        {title}
      </h1>

      <p style={{ color: "#a49a9c" }}>
        This section is coming soon...
      </p>
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <WebsiteMusic />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/stories" element={<Stories />} />
        <Route path="/stories/:storyId" element={<StoryDetails />} />

        <Route path="/haunted-places" element={<HauntedPlaces />} />
        <Route path="/haunted-places/:placeId" element={<PlaceDetails />} />

        <Route path="/paranormal" element={<Paranormal />} />
        <Route path="/paranormal/:id" element={<ParanormalDetails />} />

        <Route path="/fear-lab" element={<FearLab />} />
        <Route path="/fear-lab/haunt-me" element={<HauntMe />} />
        <Route path="/fear-lab/dont-blink" element={<DontBlink />} />
        <Route path="/fear-lab/find-the-ghost" element={<FindTheGhost />} />
        <Route path="/fear-lab/escape-room" element={<EscapeRoom />} />
        <Route path="/fear-lab/fear-test" element={<FearTest />} />

        <Route
          path="*"
          element={<ComingSoon title="404 - LOST IN DARKNESS" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
