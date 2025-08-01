import React, { useState } from 'react';
import Questionnaire from './Questionnaire';
import VibeSelector from './VibeSelector';
import ItineraryBuilder from './ItineraryBuilder';
import OfflineSupport from './OfflineSupport';
import './CustomWay.css';

const CustomWay = () => {
  const [currentStep, setCurrentStep] = useState('questionnaire'); // questionnaire, vibe, itinerary, offline
  const [userPreferences, setUserPreferences] = useState(null);
  const [selectedVibes, setSelectedVibes] = useState([]);
  const [generatedItinerary, setGeneratedItinerary] = useState(null);

  const handleQuestionnaireComplete = (preferences) => {
    setUserPreferences(preferences);
    setCurrentStep('vibe');
  };

  const handleVibeSelected = (vibes) => {
    setSelectedVibes(vibes);
    // Auto-advance to itinerary generation when vibes are selected
    if (vibes.length > 0) {
      const completePreferences = {
        ...userPreferences,
        vibe: vibes
      };
      setUserPreferences(completePreferences);
      setCurrentStep('itinerary');
    }
  };

  const handleItineraryGenerated = (itinerary) => {
    setGeneratedItinerary(itinerary);
  };

  const handleStepNavigation = (step) => {
    setCurrentStep(step);
  };

  const renderStepIndicator = () => {
    const steps = [
      { id: 'questionnaire', label: 'Questions', icon: '❓' },
      { id: 'vibe', label: 'Vibe', icon: '✨' },
      { id: 'itinerary', label: 'Itinerary', icon: '📋' },
      { id: 'offline', label: 'Offline', icon: '📱' }
    ];

    return (
      <div className="step-indicator">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`step ${currentStep === step.id ? 'active' : ''} ${
              getStepIndex(currentStep) > index ? 'completed' : ''
            }`}
            onClick={() => {
              // Allow navigation to previous steps
              if (getStepIndex(currentStep) > index) {
                handleStepNavigation(step.id);
              }
            }}
          >
            <div className="step-icon">{step.icon}</div>
            <div className="step-label">{step.label}</div>
          </div>
        ))}
      </div>
    );
  };

  const getStepIndex = (stepId) => {
    const stepOrder = ['questionnaire', 'vibe', 'itinerary', 'offline'];
    return stepOrder.indexOf(stepId);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'questionnaire':
        return (
          <Questionnaire 
            onComplete={handleQuestionnaireComplete}
          />
        );
        
      case 'vibe':
        return (
          <VibeSelector 
            onVibeSelected={handleVibeSelected}
            selectedVibes={selectedVibes}
          />
        );
        
      case 'itinerary':
        return (
          <div className="itinerary-step">
            <ItineraryBuilder 
              userPreferences={userPreferences}
              onItineraryGenerated={handleItineraryGenerated}
            />
            {generatedItinerary && (
              <div className="itinerary-actions">
                <button 
                  onClick={() => setCurrentStep('offline')}
                  className="next-step-btn"
                >
                  📱 Set Up Offline Access
                </button>
              </div>
            )}
          </div>
        );
        
      case 'offline':
        return (
          <OfflineSupport 
            itinerary={generatedItinerary}
            userLocation={userPreferences?.location}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="customway-container">
      <div className="customway-header">
        <div className="brand">
          <h1>🛫 Planora</h1>
          <p>AI Itinerary Builder</p>
        </div>
        
        {renderStepIndicator()}
        
        <div className="tagline">
          <p>No more overplanning or Googling — just vibes + AI execution</p>
        </div>
      </div>

      <div className="customway-content">
        {renderCurrentStep()}
      </div>

      <div className="customway-features">
        <div className="feature">
          <div className="feature-icon">🤖</div>
          <h3>AI-Powered Planning</h3>
          <p>Answer a few questions, get an instant multi-day itinerary</p>
        </div>
        
        <div className="feature">
          <div className="feature-icon">🔄</div>
          <h3>Auto-Adjusts</h3>
          <p>Adapts for rain, traffic, or fatigue in real-time</p>
        </div>
        
        <div className="feature">
          <div className="feature-icon">📱</div>
          <h3>Works Offline</h3>
          <p>Access maps and budgets without internet</p>
        </div>
        
        <div className="feature">
          <div className="feature-icon">✨</div>
          <h3>Your Vibe</h3>
          <p>Plug in your style: "chill & scenic," "bougie foodie," "urban explorer"</p>
        </div>
      </div>

      <div className="customway-footer">
        <p>Built for people who hate rigid tours or endless planning</p>
        <div className="social-proof">
          <span>🌟 Trusted by thousands of travelers worldwide</span>
        </div>
      </div>
    </div>
  );
};

export default CustomWay;
