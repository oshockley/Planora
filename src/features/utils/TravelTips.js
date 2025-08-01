import React, { useState, useEffect } from 'react';
import './TravelTips.css';

const TravelTips = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [expandedTip, setExpandedTip] = useState(null);

  const travelTips = [
    {
      id: 1,
      category: 'packing',
      title: '📦 Smart Packing Strategies',
      summary: 'Pack efficiently and avoid overpacking',
      content: `
        • Roll clothes instead of folding to save 30% more space
        • Use packing cubes to organize and compress items
        • Pack heaviest items at the bottom of your suitcase
        • Bring a spare day outfit in your carry-on
        • Use the "one week rule" - pack for one week regardless of trip length
        • Stick to a color scheme to mix and match easily
        • Pack versatile shoes that work for multiple occasions
      `,
      tags: ['luggage', 'clothes', 'organization']
    },
    {
      id: 2,
      category: 'safety',
      title: '🛡️ Stay Safe While Traveling',
      summary: 'Essential safety tips for any destination',
      content: `
        • Research your destination's safety situation beforehand
        • Keep copies of important documents in separate places
        • Share your itinerary with trusted friends or family
        • Use hotel safes for valuables and passports
        • Be aware of common tourist scams in your destination
        • Keep emergency contacts and embassy info handy
        • Trust your instincts - if something feels wrong, leave
        • Avoid displaying expensive jewelry or electronics
      `,
      tags: ['security', 'documents', 'scams']
    },
    {
      id: 3,
      category: 'budget',
      title: '💰 Travel on a Budget',
      summary: 'Save money without sacrificing experience',
      content: `
        • Book flights on Tuesday/Wednesday for better deals
        • Use price comparison websites and set fare alerts
        • Travel during shoulder seasons for lower prices
        • Stay in hostels, guesthouses, or use home-sharing
        • Cook some meals instead of always eating out
        • Use public transportation over taxis/rideshares
        • Look for free walking tours and activities
        • Take advantage of student, senior, or group discounts
      `,
      tags: ['money', 'deals', 'accommodation']
    },
    {
      id: 4,
      category: 'health',
      title: '⚕️ Health and Wellness Tips',
      summary: 'Stay healthy during your travels',
      content: `
        • Get necessary vaccinations 4-6 weeks before travel
        • Pack a basic first aid kit with essential medications
        • Stay hydrated, especially on long flights
        • Eat probiotics before and during travel to boost immunity
        • Get travel insurance that covers medical emergencies
        • Research healthcare options at your destination
        • Combat jet lag with light exposure and sleep schedule adjustment
        • Wash hands frequently and carry hand sanitizer
      `,
      tags: ['medical', 'insurance', 'wellness']
    },
    {
      id: 5,
      category: 'technology',
      title: '📱 Tech Tips for Travelers',
      summary: 'Make technology work for you abroad',
      content: `
        • Download offline maps before you go
        • Get an international data plan or local SIM card
        • Bring portable chargers and universal adapters
        • Back up photos to cloud storage regularly
        • Use VPN for secure internet connections
        • Download translation apps for language barriers
        • Keep digital copies of documents in email/cloud
        • Use travel apps for real-time flight updates
      `,
      tags: ['apps', 'internet', 'devices']
    },
    {
      id: 6,
      category: 'culture',
      title: '🌍 Cultural Etiquette Guide',
      summary: 'Respect local customs and traditions',
      content: `
        • Research local customs and dress codes beforehand
        • Learn basic phrases in the local language
        • Understand tipping customs (some cultures find it offensive)
        • Respect religious sites and photography restrictions
        • Be mindful of personal space and greeting customs
        • Try local food and be open to new experiences
        • Be patient and flexible with different time concepts
        • Show appreciation for local culture and traditions
      `,
      tags: ['customs', 'language', 'respect']
    },
    {
      id: 7,
      category: 'transportation',
      title: '🚗 Getting Around Like a Local',
      summary: 'Navigate transportation systems efficiently',
      content: `
        • Research public transportation options and passes
        • Download local transport apps (Uber alternatives)
        • Learn the local traffic rules if renting a car
        • Keep small bills for buses and taxis
        • Ask locals for the best routes and avoid tourist traps
        • Consider bike rentals for short distances
        • Always negotiate taxi fares beforehand if no meter
        • Use airport shuttles instead of expensive taxis
      `,
      tags: ['transit', 'driving', 'local']
    },
    {
      id: 8,
      category: 'accommodation',
      title: '🏨 Choosing the Right Accommodation',
      summary: 'Find the perfect place to stay',
      content: `
        • Read recent reviews, not just overall ratings
        • Check location on map - distance to attractions/transport
        • Look for amenities that matter to you (WiFi, breakfast, AC)
        • Consider neighborhood safety, especially for solo travelers
        • Book directly with hotels for potential upgrades
        • Check cancellation policies before booking
        • Contact accommodation directly with special requests
        • Consider apartment rentals for longer stays
      `,
      tags: ['hotels', 'booking', 'location']
    },
    {
      id: 9,
      category: 'food',
      title: '🍽️ Eating Like a Local',
      summary: 'Discover authentic cuisine safely',
      content: `
        • Follow the locals - eat where they eat
        • Try street food from busy stalls with high turnover
        • Learn food-related phrases and dietary restrictions
        • Be cautious with tap water and ice in some countries
        • Start with milder dishes and work up to spicier ones
        • Respect meal times and dining customs
        • Tip appropriately according to local customs
        • Always carry stomach medication just in case
      `,
      tags: ['cuisine', 'restaurants', 'local food']
    },
    {
      id: 10,
      category: 'planning',
      title: '📋 Trip Planning Essentials',
      summary: 'Plan your trip like a pro',
      content: `
        • Create a rough itinerary but leave room for spontaneity
        • Book accommodations and major attractions in advance
        • Check visa requirements and passport expiration dates
        • Research weather patterns for your travel dates
        • Make copies of all important documents
        • Set up automatic bill payments for while you're away
        • Notify banks of your travel plans to avoid card blocks
        • Research local holidays that might affect opening hours
      `,
      tags: ['itinerary', 'documents', 'preparation']
    }
  ];

  const categories = [
    { id: 'all', name: '🌟 All Tips', icon: '🌟' },
    { id: 'packing', name: '📦 Packing', icon: '📦' },
    { id: 'safety', name: '🛡️ Safety', icon: '🛡️' },
    { id: 'budget', name: '💰 Budget', icon: '💰' },
    { id: 'health', name: '⚕️ Health', icon: '⚕️' },
    { id: 'technology', name: '📱 Technology', icon: '📱' },
    { id: 'culture', name: '🌍 Culture', icon: '🌍' },
    { id: 'transportation', name: '🚗 Transportation', icon: '🚗' },
    { id: 'accommodation', name: '🏨 Accommodation', icon: '🏨' },
    { id: 'food', name: '🍽️ Food', icon: '🍽️' },
    { id: 'planning', name: '📋 Planning', icon: '📋' }
  ];

  useEffect(() => {
    const savedFavorites = localStorage.getItem('travel_tips_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const filteredTips = travelTips.filter(tip => {
    const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
    const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tip.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tip.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (tipId) => {
    let newFavorites;
    if (favorites.includes(tipId)) {
      newFavorites = favorites.filter(id => id !== tipId);
    } else {
      newFavorites = [...favorites, tipId];
    }
    setFavorites(newFavorites);
    localStorage.setItem('travel_tips_favorites', JSON.stringify(newFavorites));
  };

  const toggleExpanded = (tipId) => {
    setExpandedTip(expandedTip === tipId ? null : tipId);
  };

  const getFavoriteTips = () => {
    return travelTips.filter(tip => favorites.includes(tip.id));
  };

  return (
    <div className="travel-tips-container">
      <div className="tips-header">
        <h2>💡 Travel Tips & Guides</h2>
        <p>Essential advice from experienced travelers to make your journey smoother</p>
      </div>

      <div className="tips-controls">
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tips, categories, or tags..."
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>
      </div>

      {favorites.length > 0 && selectedCategory === 'all' && (
        <div className="favorites-section">
          <h3>⭐ Your Favorite Tips</h3>
          <div className="tips-grid">
            {getFavoriteTips().map(tip => (
              <div key={`fav-${tip.id}`} className="tip-card favorite">
                <div className="tip-header">
                  <h4>{tip.title}</h4>
                  <button
                    onClick={() => toggleFavorite(tip.id)}
                    className="favorite-btn active"
                  >
                    ⭐
                  </button>
                </div>
                <p>{tip.summary}</p>
                <button
                  onClick={() => toggleExpanded(tip.id)}
                  className="expand-btn"
                >
                  {expandedTip === tip.id ? 'Show Less' : 'Read More'}
                </button>
                {expandedTip === tip.id && (
                  <div className="tip-content">
                    <pre>{tip.content}</pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="tips-section">
        {selectedCategory !== 'all' && (
          <h3>
            {categories.find(cat => cat.id === selectedCategory)?.icon} {' '}
            {categories.find(cat => cat.id === selectedCategory)?.name} Tips
          </h3>
        )}
        
        <div className="tips-grid">
          {filteredTips.map(tip => (
            <div key={tip.id} className="tip-card">
              <div className="tip-header">
                <h4>{tip.title}</h4>
                <button
                  onClick={() => toggleFavorite(tip.id)}
                  className={`favorite-btn ${favorites.includes(tip.id) ? 'active' : ''}`}
                >
                  {favorites.includes(tip.id) ? '⭐' : '☆'}
                </button>
              </div>
              <p>{tip.summary}</p>
              <div className="tip-tags">
                {tip.tags.map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
              <button
                onClick={() => toggleExpanded(tip.id)}
                className="expand-btn"
              >
                {expandedTip === tip.id ? 'Show Less' : 'Read More'}
              </button>
              {expandedTip === tip.id && (
                <div className="tip-content">
                  <pre>{tip.content}</pre>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {filteredTips.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">🔍</div>
          <h3>No tips found</h3>
          <p>Try adjusting your search or selecting a different category.</p>
        </div>
      )}

      <div className="tips-footer">
        <div className="community-section">
          <h3>🤝 Join the Travel Community</h3>
          <p>Have a great travel tip to share? Connect with fellow travelers and share your experiences!</p>
          <div className="community-stats">
            <div className="stat">
              <strong>10+</strong>
              <span>Expert Tips</span>
            </div>
            <div className="stat">
              <strong>50+</strong>
              <span>Countries Covered</span>
            </div>
            <div className="stat">
              <strong>1000+</strong>
              <span>Happy Travelers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelTips;
