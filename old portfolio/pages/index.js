import CanvasBG from '../components/CanvasBG';
// import SpidermanSwing from '../components/SpidermanSwing';
import Chatbot from '../components/Chatbot';
import ContactSection from '../components/ContactSection';
import DownloadSection from '../components/DownloadSection';
import HeroSection from '../components/HeroSection';
import LearningJourney from '../components/LearningJourney';
import NavBar from '../components/NavBar';
// import PikachuGuide from '../components/PikachuGuide';
import SkillsSection from '../components/SkillsSection';
import VideoSection from '../components/VideoSection';

export default function Home() {
  return (
    <div className="App">
      {/* <PikachuGuide /> */}
      <CanvasBG />
      {/* <SpidermanSwing /> */}
      <NavBar />
      <main>
        <HeroSection />
        <VideoSection />
        <SkillsSection />
        <LearningJourney />
        <DownloadSection />
        <ContactSection />
      </main>
      <Chatbot />
    </div>
  );
} 