import HeroOverlay from './HeroOverlay.jsx';
import Navbar from './Navbar.jsx';

/**
 * `pages={2.4}` gives the scroll-driven focus animation (idle -> focus cow
 * -> attach devices -> hold) enough scroll distance to breathe. Everything
 * inside <Scroll html> scrolls at normal document speed and sits above the
 * pinned 3D canvas underneath it.
 */
export default function HeroSection({ onLogin, onSignup, onEnterPlatform }) {
  return (
    <section className="relative z-10 hero-stage hero-video-stage min-h-[760px] overflow-hidden">
      <video
        className="hero-background-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>
      <div className="hero-video-fallback" aria-hidden="true" />
      <div className="hero-video-shade" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <Navbar onLogin={onLogin} onSignup={onSignup} onEnterPlatform={onEnterPlatform} />
      <HeroOverlay />
      <div className="hero-scroll-cue" aria-hidden="true">
        <span>Explore the signal</span>
        <span className="hero-scroll-line" />
      </div>
    </section>
  );
}
