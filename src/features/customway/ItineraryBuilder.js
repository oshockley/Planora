import React, { useState, useEffect } from 'react';
import './ItineraryBuilder.css';

const ItineraryBuilder = ({ userPreferences, onItineraryGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [adjustments, setAdjustments] = useState({
    weather: null,
    traffic: null,
    fatigue: null
  });
  const [realTimeData, setRealTimeData] = useState({
    weather: null,
    traffic: {},
    userLocation: null
  });

  // Mock AI service for itinerary generation
  const generateItinerary = async (preferences) => {
    setIsGenerating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const vibeActivities = {
      'chill-scenic': ['scenic viewpoints', 'peaceful gardens', 'lakeside walks', 'sunset spots'],
      'bougie-foodie': ['michelin restaurants', 'wine tastings', 'cooking classes', 'food markets'],
      'urban-explorer': ['street art tours', 'rooftop bars', 'local neighborhoods', 'hidden gems'],
      'adventure-seeker': ['hiking trails', 'water sports', 'extreme activities', 'outdoor adventures'],
      'culture-vulture': ['museums', 'historical sites', 'art galleries', 'cultural centers'],
      'nightlife-lover': ['clubs', 'bars', 'live music', 'night markets'],
      'wellness-retreat': ['spas', 'yoga classes', 'meditation centers', 'wellness resorts'],
      'family-fun': ['family attractions', 'kid-friendly activities', 'parks', 'interactive museums']
    };

    const duration = parseInt(preferences.duration.split('-')[0]) || 3;
    const selectedVibes = Array.isArray(preferences.vibe) ? preferences.vibe : [preferences.vibe];
    
    const mockItinerary = {
      destination: preferences.destination,
      duration: `${duration} days`,
      totalBudget: calculateBudget(preferences.budget, duration),
      vibe: selectedVibes,
      days: generateDays(duration, selectedVibes, vibeActivities, preferences)
    };

    setItinerary(mockItinerary);
    setIsGenerating(false);
    onItineraryGenerated(mockItinerary);
  };

  const calculateBudget = (budgetRange, days) => {
    const budgetMap = {
      'budget': 50,
      'mid': 100,
      'luxury': 200,
      'premium': 400
    };
    return (budgetMap[budgetRange] || 100) * days;
  };

  const generateDays = (duration, vibes, vibeActivities, preferences) => {
    const days = [];
    
    for (let i = 1; i <= duration; i++) {
      const dayVibes = vibes[Math.floor(Math.random() * vibes.length)];
      const activities = vibeActivities[dayVibes] || vibeActivities['urban-explorer'];
      
      days.push({
        day: i,
        theme: dayVibes,
        morning: {
          time: '9:00 AM',
          activity: activities[0] || 'Local exploration',
          location: `${preferences.destination} ${generateLocationSuffix()}`,
          duration: '2-3 hours',
          cost: '$' + (Math.floor(Math.random() * 50) + 10),
          description: generateActivityDescription(activities[0], 'morning')
        },
        afternoon: {
          time: '1:00 PM',
          activity: activities[1] || 'Cultural experience',
          location: `${preferences.destination} ${generateLocationSuffix()}`,
          duration: '3-4 hours',
          cost: '$' + (Math.floor(Math.random() * 80) + 20),
          description: generateActivityDescription(activities[1], 'afternoon')
        },
        evening: {
          time: '7:00 PM',
          activity: activities[2] || 'Dinner experience',
          location: `${preferences.destination} ${generateLocationSuffix()}`,
          duration: '2-3 hours',
          cost: '$' + (Math.floor(Math.random() * 100) + 30),
          description: generateActivityDescription(activities[2], 'evening')
        },
        tips: generateDayTips(dayVibes, preferences),
        alternatives: generateAlternatives(activities)
      });
    }
    
    return days;
  };

  const generateLocationSuffix = () => {
    const suffixes = ['Downtown', 'Old Town', 'City Center', 'Historic District', 'Waterfront', 'Arts Quarter'];
    return suffixes[Math.floor(Math.random() * suffixes.length)];
  };

  const generateActivityDescription = (activity, timeOfDay) => {
    const descriptions = {
      'morning': 'Start your day with this refreshing experience that energizes you for the adventures ahead.',
      'afternoon': 'Perfect for the main part of your day when energy is high and you\'re ready to dive deep.',
      'evening': 'Wind down with this relaxing activity that caps off your day beautifully.'
    };
    
    return descriptions[timeOfDay] || 'A wonderful experience awaits you.';
  };

  const generateDayTips = (vibe, preferences) => {
    const tips = {
      'chill-scenic': ['Bring a camera for amazing photo opportunities', 'Pack comfortable walking shoes'],
      'bougie-foodie': ['Make reservations in advance', 'Ask locals for hidden gem recommendations'],
      'urban-explorer': ['Download offline maps', 'Keep some cash for street vendors'],
      'adventure-seeker': ['Check weather conditions', 'Bring proper gear and safety equipment'],
      'culture-vulture': ['Book tickets online to avoid queues', 'Consider guided tours for deeper insights'],
      'nightlife-lover': ['Start early to hit multiple spots', 'Stay hydrated and pace yourself'],
      'wellness-retreat': ['Book spa treatments in advance', 'Bring comfortable, breathable clothing'],
      'family-fun': ['Check age restrictions', 'Plan for rest breaks between activities']
    };
    
    return tips[vibe] || ['Stay flexible and enjoy the moment', 'Ask locals for recommendations'];
  };

  const generateAlternatives = (activities) => {
    return activities.slice(0, 2).map(activity => `Alternative ${activity}`);
  };

  // Auto-adjustment logic for weather, traffic, and fatigue
  const adjustItinerary = (reason, data) => {
    if (!itinerary) return;

    let adjustedItinerary = { ...itinerary };
    
    switch (reason) {
      case 'weather':
        if (data.condition === 'rain') {
          adjustedItinerary = adjustForWeather(adjustedItinerary, 'indoor');
        } else if (data.condition === 'extreme_heat') {
          adjustedItinerary = adjustForWeather(adjustedItinerary, 'shaded');
        }
        break;
        
      case 'traffic':
        adjustedItinerary = adjustForTraffic(adjustedItinerary, data);
        break;
        
      case 'fatigue':
        adjustedItinerary = adjustForFatigue(adjustedItinerary, data.level);
        break;
    }
    
    setItinerary(adjustedItinerary);
    setAdjustments(prev => ({ ...prev, [reason]: data }));
  };

  const adjustForWeather = (itinerary, condition) => {
    const indoorAlternatives = {
      'scenic viewpoints': 'art galleries with city views',
      'outdoor markets': 'covered markets or shopping centers',
      'hiking trails': 'museum tours',
      'beach activities': 'aquarium visits'
    };
    
    return {
      ...itinerary,
      days: itinerary.days.map(day => ({
        ...day,
        morning: condition === 'indoor' ? adjustActivityForIndoor(day.morning, indoorAlternatives) : day.morning,
        afternoon: condition === 'indoor' ? adjustActivityForIndoor(day.afternoon, indoorAlternatives) : day.afternoon
      }))
    };
  };

  const adjustActivityForIndoor = (activity, alternatives) => {
    const newActivity = alternatives[activity.activity] || activity.activity;
    return {
      ...activity,
      activity: newActivity,
      description: `Adjusted for weather: ${activity.description}`
    };
  };

  const adjustForTraffic = (itinerary, trafficData) => {
    return {
      ...itinerary,
      days: itinerary.days.map(day => ({
        ...day,
        morning: { ...day.morning, time: adjustTimeForTraffic(day.morning.time, trafficData.delay) },
        afternoon: { ...day.afternoon, time: adjustTimeForTraffic(day.afternoon.time, trafficData.delay) },
        evening: { ...day.evening, time: adjustTimeForTraffic(day.evening.time, trafficData.delay) }
      }))
    };
  };

  const adjustTimeForTraffic = (originalTime, delayMinutes) => {
    const [time, period] = originalTime.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    
    let totalMinutes = hours * 60 + minutes + delayMinutes;
    if (period === 'PM' && hours !== 12) totalMinutes += 12 * 60;
    if (period === 'AM' && hours === 12) totalMinutes -= 12 * 60;
    
    const newHours = Math.floor(totalMinutes / 60) % 24;
    const newMinutes = totalMinutes % 60;
    const newPeriod = newHours >= 12 ? 'PM' : 'AM';
    const displayHours = newHours > 12 ? newHours - 12 : (newHours === 0 ? 12 : newHours);
    
    return `${displayHours}:${newMinutes.toString().padStart(2, '0')} ${newPeriod}`;
  };

  const adjustForFatigue = (itinerary, fatigueLevel) => {
    if (fatigueLevel === 'high') {
      return {
        ...itinerary,
        days: itinerary.days.map(day => ({
          ...day,
          afternoon: {
            ...day.afternoon,
            activity: 'relaxing cafe visit',
            duration: '1-2 hours',
            description: 'Take a break and recharge with a relaxing afternoon.'
          }
        }))
      };
    }
    return itinerary;
  };

  // Simulate real-time data updates
  useEffect(() => {
    if (itinerary) {
      const interval = setInterval(() => {
        // Simulate weather updates
        const weatherConditions = ['sunny', 'cloudy', 'rain', 'extreme_heat'];
        const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
        
        if (randomWeather === 'rain' && !adjustments.weather) {
          adjustItinerary('weather', { condition: 'rain' });
        }
        
        // Simulate traffic updates
        if (Math.random() > 0.8) {
          adjustItinerary('traffic', { delay: Math.floor(Math.random() * 30) + 15 });
        }
      }, 30000); // Check every 30 seconds
      
      return () => clearInterval(interval);
    }
  }, [itinerary, adjustments]);

  useEffect(() => {
    if (userPreferences) {
      generateItinerary(userPreferences);
    }
  }, [userPreferences]);

  if (isGenerating) {
    return (
      <div className="itinerary-loading">
        <div className="loading-spinner"></div>
        <h3>🤖 AI is crafting your perfect itinerary...</h3>
        <p>Analyzing your preferences and finding the best experiences</p>
      </div>
    );
  }

  if (!itinerary) {
    return null;
  }

  return (
    <div className="itinerary-container">
      <div className="itinerary-header">
        <h2>Your Personalized {itinerary.destination} Adventure</h2>
        <div className="itinerary-summary">
          <div className="summary-item">
            <span className="summary-label">Duration:</span>
            <span className="summary-value">{itinerary.duration}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Budget:</span>
            <span className="summary-value">${itinerary.totalBudget}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Vibe:</span>
            <span className="summary-value">{itinerary.vibe.join(', ')}</span>
          </div>
        </div>
      </div>

      {Object.values(adjustments).some(adj => adj !== null) && (
        <div className="adjustment-banner">
          <h4>🔄 Auto-Adjustments Made</h4>
          {adjustments.weather && <p>Weather: Switched to indoor alternatives due to {adjustments.weather.condition}</p>}
          {adjustments.traffic && <p>Traffic: Adjusted times by +{adjustments.traffic.delay} minutes</p>}
          {adjustments.fatigue && <p>Fatigue: Added relaxation breaks</p>}
        </div>
      )}

      <div className="days-container">
        {itinerary.days.map((day) => (
          <div key={day.day} className="day-card">
            <div className="day-header">
              <h3>Day {day.day}</h3>
              <span className="day-theme">{day.theme.replace('-', ' & ')}</span>
            </div>
            
            <div className="activities">
              {['morning', 'afternoon', 'evening'].map((timeOfDay) => (
                <div key={timeOfDay} className="activity">
                  <div className="activity-time">
                    <span className="time">{day[timeOfDay].time}</span>
                    <span className="period">{timeOfDay}</span>
                  </div>
                  <div className="activity-content">
                    <h4>{day[timeOfDay].activity}</h4>
                    <p className="activity-location">📍 {day[timeOfDay].location}</p>
                    <p className="activity-description">{day[timeOfDay].description}</p>
                    <div className="activity-details">
                      <span className="duration">⏱️ {day[timeOfDay].duration}</span>
                      <span className="cost">💰 {day[timeOfDay].cost}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="day-tips">
              <h5>💡 Pro Tips</h5>
              <ul>
                {day.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
            
            <div className="alternatives">
              <h5>🔄 Alternatives</h5>
              <div className="alternative-buttons">
                {day.alternatives.map((alt, index) => (
                  <button key={index} className="alternative-btn">
                    {alt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="itinerary-actions">
        <button className="action-btn primary">📱 Save to Phone</button>
        <button className="action-btn secondary">📤 Share Itinerary</button>
        <button className="action-btn secondary">🗺️ Download Offline Maps</button>
        <button className="action-btn secondary">🔄 Regenerate</button>
      </div>
    </div>
  );
};

export default ItineraryBuilder;
