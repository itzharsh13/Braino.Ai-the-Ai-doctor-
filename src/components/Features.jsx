import React from 'react';

const listings = [
  {
    id: 'chat',
    tag: 'Core',
    tagColor: 'cyan',
    title: 'AI Chat Companion',
    price: 'Free',
    description: '24/7 emotional support with symptom-aware ML responses and crisis detection.',
    icon: '💬',
    featured: true,
  },
  {
    id: 'mood',
    tag: 'Tracker',
    tagColor: 'blue',
    title: 'Mood Tracker',
    price: 'Free',
    description: 'Log feelings, view trends, and sync offline when you reconnect.',
    icon: '📊',
  },
  {
    id: 'emotion',
    tag: 'Camera',
    tagColor: 'pink',
    title: 'Face Emotion Scanner',
    price: 'Free',
    description: 'Live webcam emotion detection with confidence bars — save to mood or open chat.',
    icon: '📷',
    featured: true,
  },
  {
    id: 'wellness',
    tag: 'Tools',
    tagColor: 'purple',
    title: 'Wellness Routines',
    price: 'Free',
    description: 'AI-generated daily routines, reminders, and inner-critic exercises.',
    icon: '🧘',
  },
  {
    id: 'games',
    tag: 'Play',
    tagColor: 'pink',
    title: 'Mind Games',
    price: 'Free',
    description: 'Breathing, memory, focus grids — quick breaks for your mental reset.',
    icon: '🎮',
  },
  {
    id: 'resources',
    tag: 'Library',
    tagColor: 'green',
    title: 'Health Resources',
    price: '150+',
    description: 'Searchable library of conditions, symptoms, and evidence-based solutions.',
    icon: '📚',
  },
  {
    id: 'audio',
    tag: 'Heal',
    tagColor: 'cyan',
    title: '432Hz Soundscape',
    price: 'Free',
    description: 'Ambient healing tone player — calm your nervous system in one tap.',
    icon: '🎧',
  },
];

const tagClass = {
  cyan: 'tag-cyan',
  blue: 'tag-blue',
  purple: 'tag-purple',
  pink: 'tag-pink',
  green: 'tag-green',
};

const viewMap = {
  mood: 'mood',
  emotion: 'emotion',
  wellness: 'wellness',
  games: 'games',
  resources: 'resources',
};

const Features = ({ setView, onStartChat }) => {
  const openModule = (id) => {
    if (id === 'chat') onStartChat?.();
    else if (viewMap[id]) setView?.(viewMap[id]);
  };
  return (
    <section className="page-section py-16 pb-28" id="marketplace">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-head">
          <span className="web3-badge">Marketplace</span>
          <h2 className="section-head__title">
            Explore the <span className="text-neon-cyan">Braino</span> ecosystem
          </h2>
          <p className="section-head__sub">
            Social wellness tools — pick what you need, all connected through one AI core.
          </p>
        </div>

        <div className="marketplace-grid">
          {listings.map((item) => (
            <article
              key={item.id}
              className={`market-card ${item.featured ? 'market-card--featured' : ''}`}
            >
              <div className="market-card__visual">
                <span className="market-card__emoji">{item.icon}</span>
                <div className="market-card__shine" />
              </div>
              <div className="market-card__body">
                <div className="market-card__meta">
                  <span className={`market-tag ${tagClass[item.tagColor]}`}>{item.tag}</span>
                  <span className="market-price">{item.price}</span>
                </div>
                <h3 className="market-card__title">{item.title}</h3>
                <p className="market-card__desc">{item.description}</p>
                <button type="button" className="market-card__cta" onClick={() => openModule(item.id)}>
                  Open module <span>→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
