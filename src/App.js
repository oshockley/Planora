import React, { useState, useEffect } from 'react';
import { CustomWay } from './features/customway';
import { Auth } from './features/auth';
import UserProfile from './features/profile/UserProfile';
import WeatherWidget from './features/utils/WeatherWidget';
import CurrencyConverter from './features/utils/CurrencyConverter';
import TravelTips from './features/utils/TravelTips';
import PlanoraLogo from './components/PlanoraLogo';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('itinerary');

  // Check for existing user session on app load
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const savedUser = localStorage.getItem('planora_current_user');
        if (savedUser) {
          const user = JSON.parse(savedUser);
          setCurrentUser(user);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        localStorage.removeItem('planora_current_user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem('planora_current_user');
    setCurrentUser(null);
    setActiveTab('itinerary');
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'itinerary':
        return <CustomWay />;
      case 'profile':
        return <UserProfile user={currentUser} />;
      case 'weather':
        return <WeatherWidget />;
      case 'currency':
        return <CurrencyConverter />;
      case 'tips':
        return <TravelTips />;
      default:
        return <CustomWay />;
    }
  };

  // Show loading spinner while checking auth status
  if (isLoading) {
    return (
      <div className="App">
        <div className="app-loading">
          <div className="loading-spinner"></div>
          <h2>🛫 Planora</h2>
          <p>Loading your travel companion...</p>
        </div>
      </div>
    );
  }

  // Show auth page if user is not logged in
  if (!currentUser) {
    return (
      <div className="App">
        <Auth onAuthSuccess={handleAuthSuccess} />
      </div>
    );
  }

  // Show main app if user is logged in
  return (
    <div className="App">
      <div className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <PlanoraLogo size={50} animated={true} />
            <h1>Planora</h1>
          </div>
          <div className="user-info">
            <span>Welcome, {currentUser.username}! ✨</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
        <nav className="main-nav">
          <button 
            className={`nav-btn ${activeTab === 'itinerary' ? 'active' : ''}`}
            onClick={() => setActiveTab('itinerary')}
          >
            ✈️ Itinerary Builder
          </button>
          <button 
            className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            👤 Profile
          </button>
          <button 
            className={`nav-btn ${activeTab === 'weather' ? 'active' : ''}`}
            onClick={() => setActiveTab('weather')}
          >
            🌤️ Weather
          </button>
          <button 
            className={`nav-btn ${activeTab === 'currency' ? 'active' : ''}`}
            onClick={() => setActiveTab('currency')}
          >
            💱 Currency
          </button>
          <button 
            className={`nav-btn ${activeTab === 'tips' ? 'active' : ''}`}
            onClick={() => setActiveTab('tips')}
          >
            💡 Travel Tips
          </button>
        </nav>
      </div>
      <main>
        {renderActiveTab()}
      </main>
    </div>
  );
}

export default App;
