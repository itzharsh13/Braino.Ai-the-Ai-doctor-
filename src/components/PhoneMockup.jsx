import React from 'react';

/** Roobinium-style floating mobile mockup with neon rim glow. */
export default function PhoneMockup({ variant = 'primary', onStartChat }) {
  const isPrimary = variant === 'primary';

  return (
    <div
      className={`phone-mockup ${isPrimary ? 'phone-mockup--primary' : 'phone-mockup--secondary'}`}
      onClick={onStartChat}
      role={onStartChat ? 'button' : undefined}
      tabIndex={onStartChat ? 0 : undefined}
      onKeyDown={onStartChat ? (e) => e.key === 'Enter' && onStartChat() : undefined}
    >
      <div className="phone-mockup__glow" aria-hidden="true" />
      <div className="phone-mockup__frame">
        <div className="phone-mockup__notch" />
        <div className="phone-mockup__screen">
          <div className="phone-app-header">
            <span className="phone-app-dot" />
            <span>Braino AI</span>
            <span className="web3-badge-sm">Live</span>
          </div>
          <div className="phone-chat">
            <div className="phone-bubble phone-bubble--bot">
              Hi 👋 How are you feeling today?
            </div>
            <div className="phone-bubble phone-bubble--user">
              A bit anxious lately...
            </div>
            <div className="phone-bubble phone-bubble--bot">
              I hear you. Let&apos;s try a 4-7-8 breathing exercise together.
            </div>
          </div>
          <div className="phone-input-bar">
            <span>Message Braino...</span>
            <span className="phone-send">↑</span>
          </div>
        </div>
      </div>
    </div>
  );
}
