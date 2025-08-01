import React, { useState } from 'react';
import './VibeSelector.css';

const VibeSelector = ({ onVibeSelected, selectedVibes = [] }) => {
  const [customVibe, setCustomVibe] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const predefinedVibes = [
    {
      id: 'chill-scenic',
      name: 'Chill & Scenic',
      icon: '🌅',
      description: 'Peaceful moments, beautiful views, and relaxing experiences',
      colors: ['#74b9ff', '#0984e3'],
      activities: ['Sunset viewing', 'Nature walks', 'Cafes with views', 'Gardens'],
      mood: 'Zen and peaceful'
    },
    {
      id: 'bougie-foodie',
      name: 'Bougie Foodie',
      icon: '🍷',
      description: 'Fine dining, wine tastings, and gourmet experiences',
      colors: ['#fd79a8', '#e84393'],
      activities: ['Michelin restaurants', 'Wine bars', 'Cooking classes', 'Food markets'],
      mood: 'Sophisticated and indulgent'
    },
    {
      id: 'urban-explorer',
      name: 'Urban Explorer',
      icon: '🏙️',
      description: 'Street art, hidden gems, and authentic local experiences',
      colors: ['#a29bfe', '#6c5ce7'],
      activities: ['Street art tours', 'Local neighborhoods', 'Rooftop bars', 'Pop-up events'],
      mood: 'Curious and adventurous'
    },
    {
      id: 'adventure-seeker',
      name: 'Adventure Seeker',
      icon: '⛰️',
      description: 'Thrilling activities and outdoor adventures',
      colors: ['#00b894', '#00a085'],
      activities: ['Hiking', 'Water sports', 'Extreme activities', 'Outdoor challenges'],
      mood: 'Adrenaline-fueled'
    },
    {
      id: 'culture-vulture',
      name: 'Culture Vulture',
      icon: '🏛️',
      description: 'Museums, history, art, and intellectual experiences',
      colors: ['#fdcb6e', '#e17055'],
      activities: ['Museums', 'Historical sites', 'Art galleries', 'Cultural centers'],
      mood: 'Intellectually curious'
    },
    {
      id: 'nightlife-lover',
      name: 'Nightlife Lover',
      icon: '🍸',
      description: 'Bars, clubs, live music, and late-night adventures',
      colors: ['#e17055', '#d63031'],
      activities: ['Rooftop bars', 'Live music', 'Dance clubs', 'Night markets'],
      mood: 'Energetic and social'
    },
    {
      id: 'wellness-retreat',
      name: 'Wellness & Retreat',
      icon: '🧘‍♀️',
      description: 'Spas, meditation, yoga, and self-care experiences',
      colors: ['#81ecec', '#00cec9'],
      activities: ['Spa treatments', 'Yoga classes', 'Meditation', 'Wellness centers'],
      mood: 'Rejuvenating and mindful'
    },
    {
      id: 'family-fun',
      name: 'Family Fun',
      icon: '👨‍👩‍👧‍👦',
      description: 'Kid-friendly activities and family bonding experiences',
      colors: ['#fab1a0', '#e17055'],
      activities: ['Theme parks', 'Interactive museums', 'Family shows', 'Kid activities'],
      mood: 'Joyful and inclusive'
    }
  ];

  const handleVibeToggle = (vibeId) => {
    const newSelectedVibes = selectedVibes.includes(vibeId)
      ? selectedVibes.filter(id => id !== vibeId)
      : [...selectedVibes, vibeId];
    
    onVibeSelected(newSelectedVibes);
  };

  const handleCustomVibeSubmit = () => {
    if (customVibe.trim()) {
      const customVibeObj = {
        id: `custom-${Date.now()}`,
        name: customVibe,
        icon: '✨',
        description: 'Your custom travel vibe',
        colors: ['#667eea', '#764ba2'],
        activities: ['Custom experiences based on your description'],
        mood: 'Personalized'
      };
      
      onVibeSelected([...selectedVibes, customVibeObj.id]);
      setCustomVibe('');
      setShowCustomInput(false);
    }
  };

  const getVibeIntensity = () => {
    if (selectedVibes.length === 0) return 'Select your travel vibe';
    if (selectedVibes.length === 1) return 'Focused journey';
    if (selectedVibes.length === 2) return 'Balanced adventure';
    if (selectedVibes.length === 3) return 'Diverse experience';
    return 'Maximum variety';
  };

  const getMoodDescription = () => {
    const selectedVibeObjects = predefinedVibes.filter(vibe => selectedVibes.includes(vibe.id));
    if (selectedVibeObjects.length === 0) return '';
    
    const moods = selectedVibeObjects.map(vibe => vibe.mood);
    if (moods.length === 1) return moods[0];
    if (moods.length === 2) return `${moods[0]} meets ${moods[1]}`;
    return `A blend of ${moods.slice(0, -1).join(', ')} and ${moods[moods.length - 1]}`;
  };

  return (
    <div className="vibe-selector-container">
      <div className="vibe-header">
        <h2>What's Your Travel Vibe? ✨</h2>
        <p>Choose one or mix multiple vibes to create your perfect journey</p>
        
        <div className="vibe-intensity">
          <div className="intensity-bar">
            <div 
              className="intensity-fill" 
              style={{ width: `${Math.min((selectedVibes.length / 4) * 100, 100)}%` }}
            ></div>
          </div>
          <span className="intensity-label">{getVibeIntensity()}</span>
          {selectedVibes.length > 0 && (
            <p className="mood-description">{getMoodDescription()}</p>
          )}
        </div>
      </div>

      <div className="vibes-grid">
        {predefinedVibes.map((vibe) => (
          <div
            key={vibe.id}
            className={`vibe-card ${selectedVibes.includes(vibe.id) ? 'selected' : ''}`}
            onClick={() => handleVibeToggle(vibe.id)}
            style={{
              '--primary-color': vibe.colors[0],
              '--secondary-color': vibe.colors[1]
            }}
          >
            <div className="vibe-icon">{vibe.icon}</div>
            <h3 className="vibe-name">{vibe.name}</h3>
            <p className="vibe-description">{vibe.description}</p>
            
            <div className="vibe-activities">
              <h4>Activities include:</h4>
              <ul>
                {vibe.activities.slice(0, 3).map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </div>
            
            <div className="vibe-mood">
              <span>Mood: {vibe.mood}</span>
            </div>
            
            {selectedVibes.includes(vibe.id) && (
              <div className="selected-indicator">
                <span>✓ Selected</span>
              </div>
            )}
          </div>
        ))}

        <div className="custom-vibe-card">
          {!showCustomInput ? (
            <div 
              className="add-custom-vibe"
              onClick={() => setShowCustomInput(true)}
            >
              <div className="custom-icon">➕</div>
              <h3>Create Custom Vibe</h3>
              <p>Describe your unique travel style</p>
            </div>
          ) : (
            <div className="custom-vibe-input">
              <div className="custom-icon">✨</div>
              <h3>Describe Your Vibe</h3>
              <textarea
                value={customVibe}
                onChange={(e) => setCustomVibe(e.target.value)}
                placeholder="e.g., 'Mysterious historian with a love for underground speakeasies and forgotten stories'"
                className="custom-vibe-textarea"
                rows="4"
              />
              <div className="custom-vibe-actions">
                <button 
                  onClick={handleCustomVibeSubmit}
                  disabled={!customVibe.trim()}
                  className="submit-custom-btn"
                >
                  Add Custom Vibe
                </button>
                <button 
                  onClick={() => {
                    setShowCustomInput(false);
                    setCustomVibe('');
                  }}
                  className="cancel-custom-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedVibes.length > 0 && (
        <div className="vibe-summary">
          <h3>Your Vibe Mix</h3>
          <div className="selected-vibes">
            {selectedVibes.map((vibeId) => {
              const vibe = predefinedVibes.find(v => v.id === vibeId);
              return vibe ? (
                <div key={vibeId} className="selected-vibe-chip">
                  <span className="chip-icon">{vibe.icon}</span>
                  <span className="chip-name">{vibe.name}</span>
                  <button 
                    onClick={() => handleVibeToggle(vibeId)}
                    className="chip-remove"
                  >
                    ×
                  </button>
                </div>
              ) : null;
            })}
          </div>
          
          <div className="vibe-preview">
            <h4>Your trip will feature:</h4>
            <div className="preview-activities">
              {selectedVibes.map((vibeId) => {
                const vibe = predefinedVibes.find(v => v.id === vibeId);
                return vibe ? vibe.activities.slice(0, 2) : [];
              }).flat().slice(0, 6).map((activity, index) => (
                <span key={index} className="preview-activity">{activity}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="vibe-tips">
        <h4>💡 Pro Tips</h4>
        <ul>
          <li>Mix 2-3 vibes for the most dynamic experience</li>
          <li>Single vibes create focused, deep experiences</li>
          <li>Custom vibes help our AI understand your unique style</li>
          <li>Don't worry - you can always adjust later!</li>
        </ul>
      </div>
    </div>
  );
};

export default VibeSelector;
