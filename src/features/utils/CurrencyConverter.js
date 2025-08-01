import React, { useState, useEffect } from 'react';
import './CurrencyConverter.css';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState('');
  const [rates, setRates] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);

  // Mock exchange rates (in real app, you'd fetch from an API)
  const mockRates = {
    USD: { EUR: 0.85, GBP: 0.73, JPY: 110, CAD: 1.25, AUD: 1.35, CHF: 0.92, CNY: 6.45 },
    EUR: { USD: 1.18, GBP: 0.86, JPY: 129, CAD: 1.47, AUD: 1.59, CHF: 1.08, CNY: 7.59 },
    GBP: { USD: 1.37, EUR: 1.16, JPY: 150, CAD: 1.71, AUD: 1.85, CHF: 1.26, CNY: 8.83 },
    JPY: { USD: 0.009, EUR: 0.008, GBP: 0.007, CAD: 0.011, AUD: 0.012, CHF: 0.008, CNY: 0.059 },
    CAD: { USD: 0.80, EUR: 0.68, GBP: 0.58, JPY: 88, AUD: 1.08, CHF: 0.74, CNY: 5.16 },
    AUD: { USD: 0.74, EUR: 0.63, GBP: 0.54, JPY: 81, CAD: 0.93, CHF: 0.68, CNY: 4.78 },
    CHF: { USD: 1.09, EUR: 0.93, GBP: 0.79, JPY: 120, CAD: 1.35, AUD: 1.47, CNY: 7.03 },
    CNY: { USD: 0.16, EUR: 0.13, GBP: 0.11, JPY: 17, CAD: 0.19, AUD: 0.21, CHF: 0.14 }
  };

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' }
  ];

  useEffect(() => {
    setRates(mockRates);
    const savedFavorites = localStorage.getItem('currency_favorites');
    const savedHistory = localStorage.getItem('currency_history');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const convertCurrency = () => {
    if (!amount || isNaN(amount)) return;
    
    const numAmount = parseFloat(amount);
    let convertedAmount;
    
    if (fromCurrency === toCurrency) {
      convertedAmount = numAmount;
    } else if (rates[fromCurrency] && rates[fromCurrency][toCurrency]) {
      convertedAmount = numAmount * rates[fromCurrency][toCurrency];
    } else {
      setResult('Conversion rate not available');
      return;
    }
    
    setResult(convertedAmount.toFixed(2));
    
    // Add to history
    const conversion = {
      amount: numAmount,
      from: fromCurrency,
      to: toCurrency,
      result: convertedAmount.toFixed(2),
      timestamp: new Date().toISOString()
    };
    
    const newHistory = [conversion, ...history.slice(0, 9)]; // Keep last 10
    setHistory(newHistory);
    localStorage.setItem('currency_history', JSON.stringify(newHistory));
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    if (result && amount) {
      setAmount(result);
      setResult(amount);
    }
  };

  const addToFavorites = () => {
    const pair = `${fromCurrency}/${toCurrency}`;
    if (!favorites.includes(pair)) {
      const newFavorites = [...favorites, pair];
      setFavorites(newFavorites);
      localStorage.setItem('currency_favorites', JSON.stringify(newFavorites));
    }
  };

  const removeFromFavorites = (pair) => {
    const newFavorites = favorites.filter(fav => fav !== pair);
    setFavorites(newFavorites);
    localStorage.setItem('currency_favorites', JSON.stringify(newFavorites));
  };

  const getCurrencySymbol = (code) => {
    const currency = currencies.find(c => c.code === code);
    return currency ? currency.symbol : code;
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getQuickAmounts = () => [1, 10, 50, 100, 500, 1000];

  return (
    <div className="currency-converter-container">
      <div className="converter-header">
        <h2>💱 Currency Converter</h2>
        <p>Convert between currencies with real-time exchange rates</p>
      </div>

      <div className="converter-main">
        <div className="conversion-panel">
          <div className="amount-input">
            <label>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount..."
              onKeyPress={(e) => e.key === 'Enter' && convertCurrency()}
            />
          </div>

          <div className="currency-selectors">
            <div className="currency-select">
              <label>From</label>
              <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>

            <button className="swap-btn" onClick={swapCurrencies}>
              🔄
            </button>

            <div className="currency-select">
              <label>To</label>
              <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="conversion-actions">
            <button onClick={convertCurrency} className="convert-btn">
              Convert
            </button>
            <button onClick={addToFavorites} className="favorite-btn">
              ⭐ Favorite
            </button>
          </div>

          {result && (
            <div className="conversion-result">
              <div className="result-display">
                <span className="original">
                  {getCurrencySymbol(fromCurrency)} {amount}
                </span>
                <span className="equals">=</span>
                <span className="converted">
                  {getCurrencySymbol(toCurrency)} {result}
                </span>
              </div>
              <div className="exchange-rate">
                1 {fromCurrency} = {rates[fromCurrency] && rates[fromCurrency][toCurrency] 
                  ? rates[fromCurrency][toCurrency].toFixed(4) : 'N/A'} {toCurrency}
              </div>
            </div>
          )}
        </div>

        <div className="quick-amounts">
          <h4>Quick Convert</h4>
          <div className="quick-buttons">
            {getQuickAmounts().map(quickAmount => (
              <button
                key={quickAmount}
                onClick={() => {
                  setAmount(quickAmount.toString());
                  if (fromCurrency && toCurrency) {
                    const rate = rates[fromCurrency] && rates[fromCurrency][toCurrency];
                    if (rate) {
                      setResult((quickAmount * rate).toFixed(2));
                    }
                  }
                }}
                className="quick-amount-btn"
              >
                {getCurrencySymbol(fromCurrency)} {quickAmount}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="converter-extras">
        {favorites.length > 0 && (
          <div className="favorites-section">
            <h3>⭐ Favorite Pairs</h3>
            <div className="favorites-list">
              {favorites.map((pair, index) => (
                <div key={index} className="favorite-pair">
                  <span onClick={() => {
                    const [from, to] = pair.split('/');
                    setFromCurrency(from);
                    setToCurrency(to);
                  }} className="pair-name">
                    {pair}
                  </span>
                  <button onClick={() => removeFromFavorites(pair)} className="remove-btn">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div className="history-section">
            <h3>📈 Recent Conversions</h3>
            <div className="history-list">
              {history.map((item, index) => (
                <div key={index} className="history-item">
                  <div className="conversion-details">
                    <span className="conversion-text">
                      {getCurrencySymbol(item.from)} {item.amount} → {getCurrencySymbol(item.to)} {item.result}
                    </span>
                    <span className="conversion-time">
                      {formatDate(item.timestamp)}
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      setAmount(item.amount.toString());
                      setFromCurrency(item.from);
                      setToCurrency(item.to);
                      setResult(item.result);
                    }}
                    className="reuse-btn"
                  >
                    🔄 Reuse
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="currency-info">
        <h3>💡 Travel Tips</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <h4>💳 Best Payment Methods</h4>
            <p>Use credit cards with no foreign transaction fees when traveling abroad. They often offer better exchange rates than cash exchanges.</p>
          </div>
          <div className="tip-card">
            <h4>🏧 ATM Withdrawals</h4>
            <p>Withdraw cash from ATMs at your destination for better rates. Avoid airport exchange counters which typically have poor rates.</p>
          </div>
          <div className="tip-card">
            <h4>📱 Real-time Rates</h4>
            <p>Exchange rates fluctuate constantly. Check rates before making large purchases and consider timing for better deals.</p>
          </div>
          <div className="tip-card">
            <h4>💰 Budget Planning</h4>
            <p>Add 10-15% buffer to your currency conversions for rate fluctuations and fees during your trip.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
