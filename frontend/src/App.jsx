import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";
import ChatInterface from "./components/ChatInterface";
import WellnessTools from "./components/WellnessTools";
import MindGames from "./components/MindGames";
import AudioPlayer from "./components/AudioPlayer";
import MentalHealthResources from "./components/MentalHealthResources";
import MoodTracker from "./components/MoodTracker";
import FaceEmotionScanner from "./components/FaceEmotionScanner";
import Scene3D from "./components/Scene3D";
import AmbientBackground from "./components/AmbientBackground";

function App() {
  const [showChat, setShowChat] = useState(false);
  const [view, setView] = useState("home");

  useEffect(() => {
    document.documentElement.classList.add("dark");
    const handleHashChange = () => {
      if (window.location.hash === "#wellness") setView("wellness");
      else if (window.location.hash === "#games") setView("games");
      else if (window.location.hash === "#resources") setView("resources");
      else if (window.location.hash === "#mood") setView("mood");
      else if (window.location.hash === "#emotion") setView("emotion");
      else setView("home");
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="app-shell">
      <AmbientBackground />
      <Scene3D darkMode />
      <div className="relative z-10">
        {showChat ? (
          <ChatInterface
            onClose={() => setShowChat(false)}
            onOpenEmotionScanner={() => {
              setShowChat(false);
              setView("emotion");
              window.location.hash = "#emotion";
            }}
          />
        ) : (
          <>
            <Navbar
              onStartChat={() => setShowChat(true)}
              setView={setView}
              activeView={view}
            />

            {view === "wellness" ? (
              <WellnessTools />
            ) : view === "games" ? (
              <MindGames />
            ) : view === "resources" ? (
              <MentalHealthResources />
            ) : view === "mood" ? (
              <MoodTracker />
            ) : view === "emotion" ? (
              <FaceEmotionScanner onStartChat={() => setShowChat(true)} />
            ) : (
              <>
                <Hero onStartChat={() => setShowChat(true)} />
                <Features setView={setView} onStartChat={() => setShowChat(true)} />
              </>
            )}

            <Footer />
            <AudioPlayer />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
