import React, { useState, useEffect } from 'react';
import './UserProfile.css';

const UserProfile = ({ user, onUpdateUser }) => {
  const [profile, setProfile] = useState({
    personalInfo: {
      fullName: '',
      bio: '',
      age: '',
      nationality: '',
      languages: [],
      emergencyContact: {
        name: '',
        phone: '',
        relationship: ''
      }
    },
    travelPreferences: {
      favoriteDestinations: [],
      travelBudgetDefault: 'mid',
      preferredAccommodation: 'hotel',
      dietaryRestrictions: [],
      accessibility: [],
      travelStyle: 'couple',
      favoriteActivities: []
    },
    travelHistory: [],
    socialSettings: {
      shareItineraries: true,
      findTravelBuddies: false,
      publicProfile: false
    },
    notifications: {
      email: true,
      push: true,
      weatherAlerts: true,
      dealAlerts: true
    }
  });

  const [savedItineraries, setSavedItineraries] = useState([]);
  const [travelStats, setTravelStats] = useState({
    totalTrips: 0,
    countriesVisited: 0,
    totalDays: 0,
    favoriteVibe: 'urban-explorer'
  });

  useEffect(() => {
    if (user) {
      loadUserProfile();
      loadTravelHistory();
    }
  }, [user]);

  const loadUserProfile = () => {
    if (!user) return;
    const savedProfile = localStorage.getItem(`planora_profile_${user.id || user.username}`);
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  };

  const loadTravelHistory = () => {
    if (!user) return;
    const itineraries = localStorage.getItem(`planora_itineraries_${user.id || user.username}`);
    if (itineraries) {
      const parsed = JSON.parse(itineraries);
      setSavedItineraries(parsed);
      calculateTravelStats(parsed);
    }
  };

  const calculateTravelStats = (itineraries) => {
    const countries = new Set();
    let totalDays = 0;
    const vibes = {};

    itineraries.forEach(trip => {
      countries.add(trip.destination);
      totalDays += parseInt(trip.duration) || 0;
      
      if (trip.vibe) {
        trip.vibe.forEach(v => {
          vibes[v] = (vibes[v] || 0) + 1;
        });
      }
    });

    const favoriteVibe = Object.keys(vibes).reduce((a, b) => 
      vibes[a] > vibes[b] ? a : b, 'urban-explorer'
    );

    setTravelStats({
      totalTrips: itineraries.length,
      countriesVisited: countries.size,
      totalDays,
      favoriteVibe
    });
  };

  const saveProfile = () => {
    if (!user) return;
    localStorage.setItem(`planora_profile_${user.id || user.username}`, JSON.stringify(profile));
    if (onUpdateUser) {
      onUpdateUser({ ...user, profile });
    }
  };

  const handleInputChange = (section, field, value) => {
    setProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayToggle = (section, field, value) => {
    setProfile(prev => {
      const currentArray = prev[section][field] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: newArray
        }
      };
    });
  };

  const getTravelPersonality = () => {
    const { favoriteVibe } = travelStats;
    const personalities = {
      'chill-scenic': '🌅 Peaceful Explorer - You seek tranquility and natural beauty',
      'bougie-foodie': '🍷 Culinary Connoisseur - Fine dining and gourmet experiences drive you',
      'urban-explorer': '🏙️ City Navigator - You thrive in bustling urban environments',
      'adventure-seeker': '⛰️ Thrill Seeker - Adrenaline and outdoor challenges excite you',
      'culture-vulture': '🏛️ Cultural Scholar - History and art fascinate you',
      'nightlife-lover': '🍸 Social Butterfly - You love vibrant nightlife and social scenes',
      'wellness-retreat': '🧘‍♀️ Mindful Traveler - Wellness and self-care are priorities',
      'family-fun': '👨‍👩‍👧‍👦 Family Leader - Creating memories with loved ones matters most'
    };

    return personalities[favoriteVibe] || personalities['urban-explorer'];
  };

  // Handle case where user might be undefined
  if (!user) {
    return (
      <div className="user-profile-container">
        <div className="profile-loading">
          <h2>Loading profile...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="profile-info">
            <h2>{profile.personalInfo.fullName || user.username}</h2>
            <p className="user-bio">{profile.personalInfo.bio || 'Travel enthusiast exploring the world'}</p>
            <div className="travel-personality">
              {getTravelPersonality()}
            </div>
          </div>
        </div>

        <div className="travel-stats">
          <div className="stat-card">
            <h3>{travelStats.totalTrips}</h3>
            <p>Trips Planned</p>
          </div>
          <div className="stat-card">
            <h3>{travelStats.countriesVisited}</h3>
            <p>Destinations</p>
          </div>
          <div className="stat-card">
            <h3>{travelStats.totalDays}</h3>
            <p>Days Traveled</p>
          </div>
        </div>
      </div>

      <div className="profile-sections">
        {/* Personal Information */}
        <div className="profile-section">
          <h3>👤 Personal Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={profile.personalInfo.fullName}
                onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                placeholder="Your full name"
              />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea
                value={profile.personalInfo.bio}
                onChange={(e) => handleInputChange('personalInfo', 'bio', e.target.value)}
                placeholder="Tell us about yourself..."
                rows="3"
              />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                value={profile.personalInfo.age}
                onChange={(e) => handleInputChange('personalInfo', 'age', e.target.value)}
                placeholder="Your age"
              />
            </div>
            <div className="form-group">
              <label>Nationality</label>
              <input
                type="text"
                value={profile.personalInfo.nationality}
                onChange={(e) => handleInputChange('personalInfo', 'nationality', e.target.value)}
                placeholder="Your nationality"
              />
            </div>
          </div>

          <div className="languages-section">
            <label>Languages Spoken</label>
            <div className="checkbox-grid">
              {['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Japanese', 'Mandarin', 'Arabic', 'Russian'].map(lang => (
                <label key={lang} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={profile.personalInfo.languages.includes(lang)}
                    onChange={() => handleArrayToggle('personalInfo', 'languages', lang)}
                  />
                  {lang}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Travel Preferences */}
        <div className="profile-section">
          <h3>✈️ Travel Preferences</h3>
          
          <div className="preference-item">
            <label>Default Budget Range</label>
            <select
              value={profile.travelPreferences.travelBudgetDefault}
              onChange={(e) => handleInputChange('travelPreferences', 'travelBudgetDefault', e.target.value)}
            >
              <option value="budget">Budget ($0-50/day)</option>
              <option value="mid">Mid-range ($51-150/day)</option>
              <option value="luxury">Luxury ($151-300/day)</option>
              <option value="premium">Premium ($300+/day)</option>
            </select>
          </div>

          <div className="preference-item">
            <label>Dietary Restrictions</label>
            <div className="checkbox-grid">
              {['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Kosher', 'Lactose-Free', 'Nut Allergies'].map(diet => (
                <label key={diet} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={profile.travelPreferences.dietaryRestrictions.includes(diet)}
                    onChange={() => handleArrayToggle('travelPreferences', 'dietaryRestrictions', diet)}
                  />
                  {diet}
                </label>
              ))}
            </div>
          </div>

          <div className="preference-item">
            <label>Accessibility Needs</label>
            <div className="checkbox-grid">
              {['Wheelchair Access', 'Hearing Assistance', 'Visual Assistance', 'Mobility Support', 'Service Animal'].map(access => (
                <label key={access} className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={profile.travelPreferences.accessibility.includes(access)}
                    onChange={() => handleArrayToggle('travelPreferences', 'accessibility', access)}
                  />
                  {access}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Saved Itineraries */}
        <div className="profile-section">
          <h3>📋 My Itineraries ({savedItineraries.length})</h3>
          <div className="itineraries-grid">
            {savedItineraries.map((itinerary, index) => (
              <div key={index} className="itinerary-card">
                <h4>{itinerary.destination}</h4>
                <p>{itinerary.duration} • {itinerary.vibe?.join(', ')}</p>
                <div className="itinerary-actions">
                  <button className="btn-small">View</button>
                  <button className="btn-small">Edit</button>
                  <button className="btn-small">Share</button>
                </div>
              </div>
            ))}
            {savedItineraries.length === 0 && (
              <div className="empty-state">
                <p>No itineraries yet. Start planning your first trip!</p>
              </div>
            )}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="profile-section">
          <h3>🔔 Notification Settings</h3>
          <div className="notification-options">
            {Object.entries(profile.notifications).map(([key, value]) => (
              <label key={key} className="switch-item">
                <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleInputChange('notifications', key, e.target.checked)}
                />
                <span className="switch"></span>
              </label>
            ))}
          </div>
        </div>

        {/* Social Settings */}
        <div className="profile-section">
          <h3>👥 Social & Privacy</h3>
          <div className="social-options">
            {Object.entries(profile.socialSettings).map(([key, value]) => (
              <label key={key} className="switch-item">
                <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleInputChange('socialSettings', key, e.target.checked)}
                />
                <span className="switch"></span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="profile-actions">
        <button onClick={saveProfile} className="save-btn">
          💾 Save Profile
        </button>
        <button className="export-btn">
          📤 Export Data
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
