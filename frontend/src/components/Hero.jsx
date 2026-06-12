import React from 'react';
import PhoneMockup from './PhoneMockup';
import StatsRow from './StatsRow';

const Hero = ({ onStartChat }) => {
  return (
    <section className="hero-web3 page-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pb-24">
        <div className="hero-web3__grid">
          <div className="hero-web3__copy">
            <div className="web3-badge">
              <span className="web3-badge__dot" />
              Powered by AI · Mental Wellness Platform
            </div>

            <h1 className="hero-web3__title">
              <span className="hero-web3__line">Your social</span>
              <span className="hero-web3__line hero-web3__line--accent">
                wellness marketplace
              </span>
            </h1>

            <p className="hero-web3__subtitle">
              Chat, track mood, play mind games, and access 150+ mental health resources —
              all in one cyber-secure AI companion. Web & mobile ready.
            </p>

            <div className="hero-web3__actions">
              <button type="button" onClick={onStartChat} className="btn-web3-primary">
                Start free chat
              </button>
              <a href="#marketplace" className="btn-web3-outline">
                Explore tools
              </a>
            </div>

            <StatsRow />
          </div>

          <div className="hero-web3__phones">
            <PhoneMockup variant="secondary" />
            <PhoneMockup variant="primary" onStartChat={onStartChat} />
            <div className="hero-web3__orbit" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
