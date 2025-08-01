import React, { useState, useEffect } from 'react';
import './OfflineSupport.css';

const OfflineSupport = ({ itinerary, userLocation }) => {
  const [offlineData, setOfflineData] = useState({
    maps: [],
    itinerary: null,
    budget: null,
    emergency: null,
    translation: null
  });
  const [downloadStatus, setDownloadStatus] = useState({
    maps: 'idle', // idle, downloading, completed, error
    itinerary: 'idle',
    budget: 'idle',
    emergency: 'idle',
    translation: 'idle'
  });
  const [storageUsage, setStorageUsage] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Calculate storage usage
  useEffect(() => {
    calculateStorageUsage();
  }, [offlineData]);

  const calculateStorageUsage = () => {
    let totalSize = 0;
    
    // Calculate approximate sizes
    if (offlineData.maps.length > 0) {
      totalSize += offlineData.maps.length * 15; // ~15MB per map area
    }
    
    if (offlineData.itinerary) {
      totalSize += 0.5; // ~500KB for itinerary data
    }
    
    if (offlineData.budget) {
      totalSize += 0.1; // ~100KB for budget data
    }
    
    if (offlineData.emergency) {
      totalSize += 0.2; // ~200KB for emergency info
    }
    
    if (offlineData.translation) {
      totalSize += 5; // ~5MB for basic translation data
    }
    
    setStorageUsage(totalSize);
  };

  const downloadMaps = async (destination) => {
    setDownloadStatus(prev => ({ ...prev, maps: 'downloading' }));
    
    try {
      // Simulate map download process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mapAreas = [
        {
          id: 'city-center',
          name: 'City Center',
          bounds: { north: 40.7831, south: 40.7489, east: -73.9441, west: -74.0060 },
          size: '15.2 MB',
          downloadedAt: new Date().toISOString()
        },
        {
          id: 'tourist-district',
          name: 'Tourist District',
          bounds: { north: 40.7831, south: 40.7489, east: -73.9441, west: -74.0060 },
          size: '12.8 MB',
          downloadedAt: new Date().toISOString()
        },
        {
          id: 'transport-hubs',
          name: 'Transport Hubs',
          bounds: { north: 40.7831, south: 40.7489, east: -73.9441, west: -74.0060 },
          size: '8.5 MB',
          downloadedAt: new Date().toISOString()
        }
      ];
      
      setOfflineData(prev => ({ ...prev, maps: mapAreas }));
      setDownloadStatus(prev => ({ ...prev, maps: 'completed' }));
      
      // Store in localStorage for persistence
      localStorage.setItem('planora_offline_maps', JSON.stringify(mapAreas));
      
    } catch (error) {
      setDownloadStatus(prev => ({ ...prev, maps: 'error' }));
      console.error('Failed to download maps:', error);
    }
  };

  const downloadItinerary = async (itineraryData) => {
    setDownloadStatus(prev => ({ ...prev, itinerary: 'downloading' }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const offlineItinerary = {
        ...itineraryData,
        downloadedAt: new Date().toISOString(),
        offline: true,
        mapPins: generateMapPins(itineraryData),
        walkingDirections: generateWalkingDirections(itineraryData),
        publicTransport: generateTransportInfo(itineraryData.destination)
      };
      
      setOfflineData(prev => ({ ...prev, itinerary: offlineItinerary }));
      setDownloadStatus(prev => ({ ...prev, itinerary: 'completed' }));
      
      localStorage.setItem('planora_offline_itinerary', JSON.stringify(offlineItinerary));
      
    } catch (error) {
      setDownloadStatus(prev => ({ ...prev, itinerary: 'error' }));
    }
  };

  const downloadBudget = async (budgetData) => {
    setDownloadStatus(prev => ({ ...prev, budget: 'downloading' }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const offlineBudget = {
        totalBudget: budgetData.totalBudget,
        dailyBudget: budgetData.totalBudget / parseInt(budgetData.duration),
        expenseCategories: {
          food: 0.4,
          activities: 0.3,
          transport: 0.2,
          shopping: 0.1
        },
        localCurrency: await fetchCurrencyInfo(budgetData.destination),
        exchangeRate: await fetchExchangeRate(budgetData.destination),
        tipCalculator: generateTipCalculator(budgetData.destination),
        expenseTracker: [],
        downloadedAt: new Date().toISOString()
      };
      
      setOfflineData(prev => ({ ...prev, budget: offlineBudget }));
      setDownloadStatus(prev => ({ ...prev, budget: 'completed' }));
      
      localStorage.setItem('planora_offline_budget', JSON.stringify(offlineBudget));
      
    } catch (error) {
      setDownloadStatus(prev => ({ ...prev, budget: 'error' }));
    }
  };

  const downloadEmergencyInfo = async (destination) => {
    setDownloadStatus(prev => ({ ...prev, emergency: 'downloading' }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const emergencyInfo = {
        destination,
        emergencyNumbers: {
          police: getEmergencyNumber(destination, 'police'),
          medical: getEmergencyNumber(destination, 'medical'),
          fire: getEmergencyNumber(destination, 'fire'),
          tourist: getEmergencyNumber(destination, 'tourist')
        },
        embassies: generateEmbassyInfo(destination),
        hospitals: generateHospitalInfo(destination),
        safetyTips: generateSafetyTips(destination),
        commonPhrases: generateEmergencyPhrases(destination),
        downloadedAt: new Date().toISOString()
      };
      
      setOfflineData(prev => ({ ...prev, emergency: emergencyInfo }));
      setDownloadStatus(prev => ({ ...prev, emergency: 'completed' }));
      
      localStorage.setItem('planora_offline_emergency', JSON.stringify(emergencyInfo));
      
    } catch (error) {
      setDownloadStatus(prev => ({ ...prev, emergency: 'error' }));
    }
  };

  const downloadTranslation = async (destination) => {
    setDownloadStatus(prev => ({ ...prev, translation: 'downloading' }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const translationData = {
        destination,
        language: getDestinationLanguage(destination),
        commonPhrases: generateCommonPhrases(destination),
        foodTerms: generateFoodTerms(destination),
        directionsPhrases: generateDirectionsPhrases(destination),
        shoppingPhrases: generateShoppingPhrases(destination),
        pronunciationGuide: generatePronunciationGuide(destination),
        offlineTranslator: 'basic', // Basic offline translation capability
        downloadedAt: new Date().toISOString()
      };
      
      setOfflineData(prev => ({ ...prev, translation: translationData }));
      setDownloadStatus(prev => ({ ...prev, translation: 'completed' }));
      
      localStorage.setItem('planora_offline_translation', JSON.stringify(translationData));
      
    } catch (error) {
      setDownloadStatus(prev => ({ ...prev, translation: 'error' }));
    }
  };

  // Helper functions for generating offline data
  const generateMapPins = (itinerary) => {
    const pins = [];
    itinerary.days.forEach(day => {
      ['morning', 'afternoon', 'evening'].forEach(timeOfDay => {
        pins.push({
          id: `${day.day}-${timeOfDay}`,
          title: day[timeOfDay].activity,
          location: day[timeOfDay].location,
          coordinates: generateCoordinates(), // Mock coordinates
          time: day[timeOfDay].time,
          type: timeOfDay
        });
      });
    });
    return pins;
  };

  const generateCoordinates = () => ({
    lat: 40.7589 + (Math.random() - 0.5) * 0.1,
    lng: -73.9851 + (Math.random() - 0.5) * 0.1
  });

  const generateWalkingDirections = (itinerary) => {
    const directions = [];
    itinerary.days.forEach(day => {
      const dayActivities = ['morning', 'afternoon', 'evening'];
      for (let i = 0; i < dayActivities.length - 1; i++) {
        directions.push({
          from: day[dayActivities[i]].location,
          to: day[dayActivities[i + 1]].location,
          distance: `${Math.floor(Math.random() * 20) + 5} min walk`,
          steps: [
            'Head north on Main Street',
            'Turn right on Central Avenue',
            'Continue for 3 blocks',
            'Destination will be on your left'
          ]
        });
      }
    });
    return directions;
  };

  const generateTransportInfo = (destination) => ({
    subway: {
      available: true,
      ticketPrice: '$2.75',
      dayPass: '$33',
      stations: ['Central Station', 'Tourist Hub', 'City Center']
    },
    bus: {
      available: true,
      ticketPrice: '$2.25',
      routes: ['Route 1', 'Route 5', 'Tourist Loop']
    },
    taxi: {
      baseRate: '$3.50',
      perMile: '$2.50',
      apps: ['Uber', 'Lyft', 'Local Taxi']
    }
  });

  const fetchCurrencyInfo = async (destination) => {
    // Mock currency data
    const currencies = {
      'Paris': { code: 'EUR', symbol: '€', name: 'Euro' },
      'Tokyo': { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
      'New York': { code: 'USD', symbol: '$', name: 'US Dollar' }
    };
    return currencies[destination] || { code: 'USD', symbol: '$', name: 'US Dollar' };
  };

  const fetchExchangeRate = async (destination) => {
    // Mock exchange rate
    return Math.random() * 2 + 0.5;
  };

  const generateTipCalculator = (destination) => ({
    restaurants: { min: 15, max: 20, description: 'Standard restaurant tip' },
    bars: { min: 10, max: 15, description: 'Per drink or 10-15% of bill' },
    taxis: { min: 10, max: 15, description: 'Round up to nearest dollar' },
    hotels: { min: 2, max: 5, description: 'Per bag for bellhop, per day for housekeeping' }
  });

  const getEmergencyNumber = (destination, type) => {
    const numbers = {
      'Paris': { police: '17', medical: '15', fire: '18', tourist: '+33 1 43 17 30 00' },
      'Tokyo': { police: '110', medical: '119', fire: '119', tourist: '+81 3 3201 3331' },
      'New York': { police: '911', medical: '911', fire: '911', tourist: '+1 212 484 1200' }
    };
    return numbers[destination]?.[type] || '911';
  };

  const generateEmbassyInfo = (destination) => [
    { country: 'United States', phone: '+1 xxx xxx xxxx', address: '123 Embassy Street' },
    { country: 'United Kingdom', phone: '+44 xxx xxx xxxx', address: '456 Consulate Ave' }
  ];

  const generateHospitalInfo = (destination) => [
    { name: 'City General Hospital', address: '789 Medical Center Blvd', phone: 'xxx-xxx-xxxx' },
    { name: 'International Medical Center', address: '321 Health Plaza', phone: 'xxx-xxx-xxxx' }
  ];

  const generateSafetyTips = (destination) => [
    'Keep copies of important documents',
    'Avoid displaying expensive items',
    'Stay in well-lit areas at night',
    'Keep emergency numbers easily accessible'
  ];

  const generateEmergencyPhrases = (destination) => ({
    'Help': 'Help! / Au secours! / Tasukete!',
    'Emergency': 'Emergency / Urgence / Kyūkyū',
    'Police': 'Police / Police / Keisatsu',
    'Hospital': 'Hospital / Hôpital / Byōin'
  });

  const getDestinationLanguage = (destination) => {
    const languages = {
      'Paris': 'French',
      'Tokyo': 'Japanese',
      'New York': 'English'
    };
    return languages[destination] || 'English';
  };

  const generateCommonPhrases = (destination) => ({
    'Hello': 'Hello / Bonjour / Konnichiwa',
    'Thank you': 'Thank you / Merci / Arigatou gozaimasu',
    'Please': 'Please / S\'il vous plaît / Onegaishimasu',
    'Excuse me': 'Excuse me / Excusez-moi / Sumimasen'
  });

  const generateFoodTerms = (destination) => ({
    'Menu': 'Menu / Carte / Menyū',
    'Bill': 'Check / Addition / Okaikei',
    'Water': 'Water / Eau / Mizu',
    'Vegetarian': 'Vegetarian / Végétarien / Bejitarian'
  });

  const generateDirectionsPhrases = (destination) => ({
    'Where is': 'Where is / Où est / Doko desu ka',
    'Left': 'Left / Gauche / Hidari',
    'Right': 'Right / Droite / Migi',
    'Straight': 'Straight / Tout droit / Massugu'
  });

  const generateShoppingPhrases = (destination) => ({
    'How much': 'How much / Combien / Ikura desu ka',
    'Too expensive': 'Too expensive / Trop cher / Takai desu',
    'Discount': 'Discount / Remise / Waribiki',
    'Size': 'Size / Taille / Saizu'
  });

  const generatePronunciationGuide = (destination) => ({
    'Hello': '[heh-LOH] / [bone-ZHOOR] / [kon-nee-chee-wah]',
    'Thank you': '[thank-YOO] / [mer-SEE] / [ah-ree-gah-toh goh-zah-ee-mahs]'
  });

  const deleteOfflineData = (type) => {
    setOfflineData(prev => ({ ...prev, [type]: null }));
    setDownloadStatus(prev => ({ ...prev, [type]: 'idle' }));
    localStorage.removeItem(`planora_offline_${type}`);
  };

  const downloadAll = async () => {
    if (!itinerary) return;
    
    await Promise.all([
      downloadMaps(itinerary.destination),
      downloadItinerary(itinerary),
      downloadBudget(itinerary),
      downloadEmergencyInfo(itinerary.destination),
      downloadTranslation(itinerary.destination)
    ]);
  };

  // Load offline data from localStorage on component mount
  useEffect(() => {
    const loadOfflineData = () => {
      const keys = ['maps', 'itinerary', 'budget', 'emergency', 'translation'];
      const newOfflineData = { ...offlineData };
      const newDownloadStatus = { ...downloadStatus };
      
      keys.forEach(key => {
        const stored = localStorage.getItem(`planora_offline_${key}`);
        if (stored) {
          newOfflineData[key] = JSON.parse(stored);
          newDownloadStatus[key] = 'completed';
        }
      });
      
      setOfflineData(newOfflineData);
      setDownloadStatus(newDownloadStatus);
    };
    
    loadOfflineData();
  }, []);

  return (
    <div className="offline-support-container">
      <div className="offline-header">
        <div className="connection-status">
          <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
            {isOnline ? '🟢' : '🔴'}
          </div>
          <span className="status-text">
            {isOnline ? 'Online' : 'Offline Mode'}
          </span>
        </div>
        
        <h2>📱 Offline Travel Kit</h2>
        <p>Download everything you need for your trip - no internet required!</p>
        
        <div className="storage-info">
          <div className="storage-bar">
            <div 
              className="storage-used" 
              style={{ width: `${Math.min((storageUsage / 100) * 100, 100)}%` }}
            ></div>
          </div>
          <span className="storage-text">
            {storageUsage.toFixed(1)} MB of 100 MB used
          </span>
        </div>
      </div>

      <div className="download-actions">
        <button 
          onClick={downloadAll}
          className="download-all-btn"
          disabled={!itinerary || Object.values(downloadStatus).some(status => status === 'downloading')}
        >
          📦 Download Complete Travel Kit
        </button>
      </div>

      <div className="offline-items">
        {/* Maps */}
        <div className="offline-item">
          <div className="item-header">
            <div className="item-info">
              <h3>🗺️ Offline Maps</h3>
              <p>Interactive maps with your itinerary pins</p>
            </div>
            <div className="item-actions">
              {downloadStatus.maps === 'completed' ? (
                <button 
                  onClick={() => deleteOfflineData('maps')}
                  className="delete-btn"
                >
                  Delete
                </button>
              ) : (
                <button 
                  onClick={() => downloadMaps(itinerary?.destination)}
                  disabled={!itinerary || downloadStatus.maps === 'downloading'}
                  className="download-btn"
                >
                  {downloadStatus.maps === 'downloading' ? 'Downloading...' : 'Download'}
                </button>
              )}
            </div>
          </div>
          
          {downloadStatus.maps === 'completed' && offlineData.maps.length > 0 && (
            <div className="item-details">
              <h4>Downloaded Areas:</h4>
              <ul>
                {offlineData.maps.map(area => (
                  <li key={area.id}>
                    {area.name} ({area.size})
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className={`status-badge ${downloadStatus.maps}`}>
            {downloadStatus.maps === 'completed' && '✅'}
            {downloadStatus.maps === 'downloading' && '⏳'}
            {downloadStatus.maps === 'error' && '❌'}
            {downloadStatus.maps === 'idle' && '📥'}
          </div>
        </div>

        {/* Itinerary */}
        <div className="offline-item">
          <div className="item-header">
            <div className="item-info">
              <h3>📋 Complete Itinerary</h3>
              <p>Your full schedule with walking directions</p>
            </div>
            <div className="item-actions">
              {downloadStatus.itinerary === 'completed' ? (
                <button 
                  onClick={() => deleteOfflineData('itinerary')}
                  className="delete-btn"
                >
                  Delete
                </button>
              ) : (
                <button 
                  onClick={() => downloadItinerary(itinerary)}
                  disabled={!itinerary || downloadStatus.itinerary === 'downloading'}
                  className="download-btn"
                >
                  {downloadStatus.itinerary === 'downloading' ? 'Downloading...' : 'Download'}
                </button>
              )}
            </div>
          </div>
          
          <div className={`status-badge ${downloadStatus.itinerary}`}>
            {downloadStatus.itinerary === 'completed' && '✅'}
            {downloadStatus.itinerary === 'downloading' && '⏳'}
            {downloadStatus.itinerary === 'error' && '❌'}
            {downloadStatus.itinerary === 'idle' && '📥'}
          </div>
        </div>

        {/* Budget Tracker */}
        <div className="offline-item">
          <div className="item-header">
            <div className="item-info">
              <h3>💰 Budget & Currency Tools</h3>
              <p>Expense tracker, tip calculator, exchange rates</p>
            </div>
            <div className="item-actions">
              {downloadStatus.budget === 'completed' ? (
                <button 
                  onClick={() => deleteOfflineData('budget')}
                  className="delete-btn"
                >
                  Delete
                </button>
              ) : (
                <button 
                  onClick={() => downloadBudget(itinerary)}
                  disabled={!itinerary || downloadStatus.budget === 'downloading'}
                  className="download-btn"
                >
                  {downloadStatus.budget === 'downloading' ? 'Downloading...' : 'Download'}
                </button>
              )}
            </div>
          </div>
          
          <div className={`status-badge ${downloadStatus.budget}`}>
            {downloadStatus.budget === 'completed' && '✅'}
            {downloadStatus.budget === 'downloading' && '⏳'}
            {downloadStatus.budget === 'error' && '❌'}
            {downloadStatus.budget === 'idle' && '📥'}
          </div>
        </div>

        {/* Emergency Info */}
        <div className="offline-item">
          <div className="item-header">
            <div className="item-info">
              <h3>🚨 Emergency Information</h3>
              <p>Emergency numbers, embassies, hospitals</p>
            </div>
            <div className="item-actions">
              {downloadStatus.emergency === 'completed' ? (
                <button 
                  onClick={() => deleteOfflineData('emergency')}
                  className="delete-btn"
                >
                  Delete
                </button>
              ) : (
                <button 
                  onClick={() => downloadEmergencyInfo(itinerary?.destination)}
                  disabled={!itinerary || downloadStatus.emergency === 'downloading'}
                  className="download-btn"
                >
                  {downloadStatus.emergency === 'downloading' ? 'Downloading...' : 'Download'}
                </button>
              )}
            </div>
          </div>
          
          <div className={`status-badge ${downloadStatus.emergency}`}>
            {downloadStatus.emergency === 'completed' && '✅'}
            {downloadStatus.emergency === 'downloading' && '⏳'}
            {downloadStatus.emergency === 'error' && '❌'}
            {downloadStatus.emergency === 'idle' && '📥'}
          </div>
        </div>

        {/* Translation */}
        <div className="offline-item">
          <div className="item-header">
            <div className="item-info">
              <h3>🗣️ Language Pack</h3>
              <p>Common phrases, pronunciation guide</p>
            </div>
            <div className="item-actions">
              {downloadStatus.translation === 'completed' ? (
                <button 
                  onClick={() => deleteOfflineData('translation')}
                  className="delete-btn"
                >
                  Delete
                </button>
              ) : (
                <button 
                  onClick={() => downloadTranslation(itinerary?.destination)}
                  disabled={!itinerary || downloadStatus.translation === 'downloading'}
                  className="download-btn"
                >
                  {downloadStatus.translation === 'downloading' ? 'Downloading...' : 'Download'}
                </button>
              )}
            </div>
          </div>
          
          <div className={`status-badge ${downloadStatus.translation}`}>
            {downloadStatus.translation === 'completed' && '✅'}
            {downloadStatus.translation === 'downloading' && '⏳'}
            {downloadStatus.translation === 'error' && '❌'}
            {downloadStatus.translation === 'idle' && '📥'}
          </div>
        </div>
      </div>

      {!isOnline && (
        <div className="offline-mode-info">
          <h3>🌐 You're Currently Offline</h3>
          <p>Using your downloaded travel data. Some features may be limited.</p>
          <div className="offline-capabilities">
            <div className="capability">
              <span className={downloadStatus.maps === 'completed' ? 'available' : 'unavailable'}>
                {downloadStatus.maps === 'completed' ? '✅' : '❌'} Maps & Navigation
              </span>
            </div>
            <div className="capability">
              <span className={downloadStatus.itinerary === 'completed' ? 'available' : 'unavailable'}>
                {downloadStatus.itinerary === 'completed' ? '✅' : '❌'} Full Itinerary
              </span>
            </div>
            <div className="capability">
              <span className={downloadStatus.budget === 'completed' ? 'available' : 'unavailable'}>
                {downloadStatus.budget === 'completed' ? '✅' : '❌'} Budget Tracking
              </span>
            </div>
            <div className="capability">
              <span className={downloadStatus.emergency === 'completed' ? 'available' : 'unavailable'}>
                {downloadStatus.emergency === 'completed' ? '✅' : '❌'} Emergency Info
              </span>
            </div>
            <div className="capability">
              <span className={downloadStatus.translation === 'completed' ? 'available' : 'unavailable'}>
                {downloadStatus.translation === 'completed' ? '✅' : '❌'} Translation
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfflineSupport;
