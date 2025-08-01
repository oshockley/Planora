import React, { useState } from 'react';
import './Questionnaire.css';

const Questionnaire = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    destination: '',
    duration: '',
    budget: '',
    vibe: '',
    pace: '',
    interests: [],
    travelStyle: '',
    accommodationType: '',
    transportPreference: '',
    groupSize: '',
    dietaryRestrictions: [],
    accessibility: []
  });

  const questions = [
    {
      id: 'destination',
      type: 'text',
      question: 'Where are you planning to travel?',
      placeholder: 'e.g., Paris, Tokyo, New York'
    },
    {
      id: 'duration',
      type: 'select',
      question: 'How long is your trip?',
      options: [
        { value: '1-2', label: '1-2 days' },
        { value: '3-5', label: '3-5 days' },
        { value: '6-10', label: '6-10 days' },
        { value: '11-14', label: '11-14 days' },
        { value: '15+', label: '2+ weeks' }
      ]
    },
    {
      id: 'budget',
      type: 'select',
      question: 'What\'s your budget range per day?',
      options: [
        { value: 'budget', label: '$0-50 (Budget)' },
        { value: 'mid', label: '$51-150 (Mid-range)' },
        { value: 'luxury', label: '$151-300 (Luxury)' },
        { value: 'premium', label: '$300+ (Premium)' }
      ]
    },
    {
      id: 'vibe',
      type: 'multiselect',
      question: 'What\'s your travel vibe? (Select all that apply)',
      options: [
        { value: 'chill-scenic', label: 'Chill & Scenic' },
        { value: 'bougie-foodie', label: 'Bougie Foodie' },
        { value: 'urban-explorer', label: 'Urban Explorer' },
        { value: 'adventure-seeker', label: 'Adventure Seeker' },
        { value: 'culture-vulture', label: 'Culture Vulture' },
        { value: 'nightlife-lover', label: 'Nightlife Lover' },
        { value: 'wellness-retreat', label: 'Wellness & Retreat' },
        { value: 'family-fun', label: 'Family Fun' }
      ]
    },
    {
      id: 'pace',
      type: 'slider',
      question: 'What\'s your preferred travel pace?',
      min: 1,
      max: 5,
      labels: ['Super Chill', 'Relaxed', 'Balanced', 'Active', 'Non-stop']
    },
    {
      id: 'interests',
      type: 'multiselect',
      question: 'What are you most interested in?',
      options: [
        { value: 'museums', label: 'Museums & Art' },
        { value: 'food', label: 'Local Cuisine' },
        { value: 'shopping', label: 'Shopping' },
        { value: 'nature', label: 'Nature & Outdoors' },
        { value: 'history', label: 'Historical Sites' },
        { value: 'nightlife', label: 'Nightlife' },
        { value: 'architecture', label: 'Architecture' },
        { value: 'local-life', label: 'Local Life & People' },
        { value: 'photography', label: 'Photography Spots' },
        { value: 'festivals', label: 'Events & Festivals' }
      ]
    },
    {
      id: 'travelStyle',
      type: 'select',
      question: 'How do you prefer to travel?',
      options: [
        { value: 'solo', label: 'Solo Adventure' },
        { value: 'couple', label: 'Romantic Getaway' },
        { value: 'friends', label: 'With Friends' },
        { value: 'family', label: 'Family Trip' },
        { value: 'business', label: 'Business + Leisure' }
      ]
    },
    {
      id: 'accommodationType',
      type: 'select',
      question: 'Where would you like to stay?',
      options: [
        { value: 'hotel', label: 'Hotels' },
        { value: 'boutique', label: 'Boutique Hotels' },
        { value: 'hostel', label: 'Hostels' },
        { value: 'airbnb', label: 'Vacation Rentals' },
        { value: 'luxury', label: 'Luxury Resorts' },
        { value: 'local', label: 'Local Guesthouses' }
      ]
    }
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderQuestion = (question) => {
    const currentAnswer = answers[question.id];

    switch (question.type) {
      case 'text':
        return (
          <input
            type="text"
            value={currentAnswer}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
            placeholder={question.placeholder}
            className="questionnaire-input"
          />
        );

      case 'select':
        return (
          <div className="options-grid">
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(question.id, option.value)}
                className={`option-button ${currentAnswer === option.value ? 'selected' : ''}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        );

      case 'multiselect':
        return (
          <div className="options-grid">
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  const currentValues = Array.isArray(currentAnswer) ? currentAnswer : [];
                  const newValues = currentValues.includes(option.value)
                    ? currentValues.filter(v => v !== option.value)
                    : [...currentValues, option.value];
                  handleAnswer(question.id, newValues);
                }}
                className={`option-button ${
                  Array.isArray(currentAnswer) && currentAnswer.includes(option.value) ? 'selected' : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        );

      case 'slider':
        return (
          <div className="slider-container">
            <input
              type="range"
              min={question.min}
              max={question.max}
              value={currentAnswer || 3}
              onChange={(e) => handleAnswer(question.id, parseInt(e.target.value))}
              className="questionnaire-slider"
            />
            <div className="slider-labels">
              {question.labels.map((label, index) => (
                <span key={index} className="slider-label">{label}</span>
              ))}
            </div>
            <div className="slider-value">
              {question.labels[currentAnswer - 1] || question.labels[2]}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="questionnaire-container">
      <div className="questionnaire-header">
        <h2>Let's Plan Your Perfect Trip ✈️</h2>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="progress-text">
          {currentStep + 1} of {questions.length}
        </span>
      </div>

      <div className="question-container">
        <h3 className="question-title">{currentQuestion.question}</h3>
        {renderQuestion(currentQuestion)}
      </div>

      <div className="questionnaire-navigation">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="nav-button secondary"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="nav-button primary"
          disabled={!answers[currentQuestion.id] || 
            (Array.isArray(answers[currentQuestion.id]) && answers[currentQuestion.id].length === 0)}
        >
          {currentStep === questions.length - 1 ? 'Generate Itinerary' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
