import Header from "./components/Header";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Levels from "./components/Levels";
import Values from "./components/Values";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import CommunityBanner from "./components/CommunityBanner";

export default function App() {
  return (
    <>
      <Header />
      <main id="inicio">
        <Hero />
        <Intro />
        <Levels />
        <Values />
        <CommunityBanner />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
