import React, { useEffect, useRef, useState } from 'react';

const RobotIcon = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="34" height="34" rx="17" fill="#fff" stroke="#111" strokeWidth="3"/>
    <rect x="11" y="16" width="16" height="10" rx="5" fill="#bfc4ca" stroke="#111" strokeWidth="2.2"/>
    <circle cx="15.5" cy="21" r="2" fill="#fff" stroke="#111" strokeWidth="2"/>
    <circle cx="22.5" cy="21" r="2" fill="#fff" stroke="#111" strokeWidth="2"/>
    <rect x="17.5" y="10" width="3" height="6" rx="1.5" fill="#bfc4ca" stroke="#111" strokeWidth="2"/>
    <rect x="8" y="13" width="3" height="3" rx="1.5" fill="#fff" stroke="#111" strokeWidth="2"/>
    <rect x="27" y="13" width="3" height="3" rx="1.5" fill="#fff" stroke="#111" strokeWidth="2"/>
  </svg>
);

function getOrCreateSessionId() {
  if (typeof window === "undefined") return null;
  let sessionId = localStorage.getItem('chatbot_session_id');
  if (!sessionId) {
    sessionId = Math.random().toString(36).slice(2) + Date.now();
    localStorage.setItem('chatbot_session_id', sessionId);
    console.log('New session ID created:', sessionId);
  } else {
    console.log('Existing session ID found:', sessionId);
  }
  return sessionId;
}

const Chatbot = () => {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('gemini');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({ name: null, email: null, contact: null });
  const sessionId = useRef(getOrCreateSessionId());

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedUserData = localStorage.getItem('chatbot_user_data');
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      setUserData(parsedData);
      console.log('User data loaded from localStorage:', parsedData);
    } else {
      console.log('No saved user data found');
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(msgs => [...msgs, { text: userMsg, from: 'user' }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMsg, 
          bot: model, 
          sessionId: sessionId.current,
          userData: userData 
        })
      });
      const data = await res.json();
      
      // Update user data if provided
      if (data.userData) {
        setUserData(data.userData);
        localStorage.setItem('chatbot_user_data', JSON.stringify(data.userData));
      }
      
      setMessages(msgs => [...msgs, { text: data.response, from: 'bot' }]);
    } catch (e) {
      setMessages(msgs => [...msgs, { text: 'Server error!', from: 'bot' }]);
    }
    setLoading(false);
  };

  return (
    <>
      {open ? (
        <div id="chatbot">
          <div id="chatbot-header" onClick={() => setOpen(false)} aria-expanded={open} style={{ cursor: 'pointer' }}>
            <h2>Chatbot</h2>
            <span id="toggle-icon" style={{ transform: open ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 0.3s' }}>▼</span>
          </div>
          <div id="chatbot-content">
            <label htmlFor="model-choice">Choose a Model:</label>
            <select id="model-choice" value={model} onChange={e => setModel(e.target.value)}>
              <option value="gemini">Gemini</option>
              <option value="chatgpt">DeepSeek</option>
            </select>
            <div id="chat-window-container" style={{ position: 'relative', minHeight: 120, maxHeight: 220 }}>
              {/* Comic Spiderman web SVG background */}
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 350 220"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 0,
                  opacity: 0.13,
                  pointerEvents: 'none',
                }}
                preserveAspectRatio="none"
              >
                <ellipse cx="175" cy="110" rx="160" ry="90" fill="none" stroke="#1976d2" strokeWidth="4" />
                <ellipse cx="175" cy="110" rx="120" ry="60" fill="none" stroke="#e53935" strokeWidth="3" />
                <ellipse cx="175" cy="110" rx="80" ry="30" fill="none" stroke="#111" strokeWidth="2.5" />
                {/* Radial lines */}
                {[...Array(8)].map((_, i) => {
                  const angle = (i / 8) * 2 * Math.PI;
                  const x = 175 + 160 * Math.cos(angle);
                  const y = 110 + 90 * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1="175"
                      y1="110"
                      x2={x}
                      y2={y}
                      stroke="#111"
                      strokeWidth="2"
                    />
                  );
                })}
              </svg>
              <div id="chat-window" style={{ minHeight: 120, maxHeight: 220, overflowY: 'auto', position: 'relative', zIndex: 1 }}>
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={msg.from}
                    style={{
                      textAlign: msg.from === 'user' ? 'right' : 'left',
                      margin: '8px 0',
                      color: msg.from === 'user' ? '#1976d2' : '#232946',
                      fontWeight: msg.from === 'user' ? 600 : 500
                    }}
                  >
                    {msg.text}
                  </div>
                ))}
                {loading && <div className="bot" style={{ color: '#888' }}>Bot is typing...</div>}
              </div>
            </div>
            <div id="chatbot-input-area">
              <textarea
                id="user-input"
                rows="3"
                placeholder="Type your message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              />
              <button onClick={handleSend} disabled={loading}>Send</button>
            </div>
          </div>
        </div>
      ) : (
        <button
          aria-label="Open Chatbot"
          style={{
            position: 'fixed',
            bottom: 28,
            right: 28,
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            border: '3px solid #111',
            boxShadow: '3px 3px 0 #111',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1001,
            cursor: 'pointer',
            transition: 'box-shadow 0.18s, background 0.18s',
          }}
          onClick={() => setOpen(true)}
        >
          <RobotIcon />
        </button>
      )}
    </>
  );
};

export default Chatbot; 