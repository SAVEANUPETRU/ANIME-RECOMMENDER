import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hi there! I'm your anime recommendation bot. Tell me what kind of anime you're looking for - maybe something action-packed, romantic, or mysterious? Or describe your mood and I'll suggest something perfect!"
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleStartChat = () => {
    setCurrentPage('chat');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
  };

  const sendMessageToBackend = async (message) => {
  try {
    const response = await fetch('http://localhost:8000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error sending message:', error);
    return 'Sorry, I had trouble connecting to the server. Please try again.';
  }
};


  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInputValue('');

    // Send to backend and get response
    const botResponse = await sendMessageToBackend(userMessage);
    setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (currentPage === 'landing') {
    return (
      <div className="app-bg">
        {/* Header */}
        <nav className="app-navbar p-3">
          <div className="container">
            <h1 className="h3 mb-0 fw-bold text-white">AnimeRec</h1>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container py-5 text-center">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              
              {/* Title */}
              <h2 className="app-title fw-bold text-white mb-4">
                Discover Your Next
                <br />
                Favorite Anime
              </h2>

              {/* Description */}
              <div className="row justify-content-center mb-5">
                <div className="col-lg-8">
                  <p className="lead text-white mb-3" style={{opacity: 0.9}}>
                    Chat with our AI to get personalized anime recommendations. Just tell us what you're in the mood for, 
                    and our smart chatbot will suggest the perfect anime for you.
                  </p>
                  <p className="text-white" style={{opacity: 0.8}}>
                    Whether you want something action-packed, heartwarming, or totally weird - just describe it and let our AI do the rest.
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <button className="app-btn btn text-white px-4 py-3 fs-5 fw-bold mb-5" onClick={handleStartChat}>
                Chat with AI Now
              </button>

              {/* Features */}
              <div className="row g-4 mt-4">
                <div className="col-md-4">
                  <div className="app-card card h-100 border-0">
                    <div className="card-body text-center p-4">
                      <div className="app-icon mb-3">★</div>
                      <h5 className="card-title text-white fw-semibold">Personalized</h5>
                      <p className="card-text text-white small" style={{opacity: 0.8}}>
                        Get recommendations based on what you actually like
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="app-card card h-100 border-0">
                    <div className="card-body text-center p-4">
                      <div className="app-icon mb-3">💬</div>
                      <h5 className="card-title text-white fw-semibold">AI Chat</h5>
                      <p className="card-text text-white small" style={{opacity: 0.8}}>
                        Just describe what you want - "something like Naruto but shorter"
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="app-card card h-100 border-0">
                    <div className="card-body text-center p-4">
                      <div className="app-icon mb-3">▶</div>
                      <h5 className="card-title text-white fw-semibold">No Spoilers</h5>
                      <p className="card-text text-white small" style={{opacity: 0.8}}>
                        Discover new shows without ruining the surprises
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  // Chat Page
  return (
    <div className="app-bg">
      {/* Chat Header */}
      <nav className="chat-header p-3 d-flex align-items-center justify-content-between">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="h3 mb-0 fw-bold text-white">AnimeRec Chat</h1>
            <button className="back-btn btn text-white px-3 py-2" onClick={handleBackToLanding}>
              ← Back
            </button>
          </div>
        </div>
      </nav>

      {/* Chat Container */}
      <div className="chat-container d-flex flex-column mx-auto p-4">
        
        {/* Messages */}
        <div className="messages-area p-4 mb-4" style={{flex: 1, overflowY: 'auto'}}>
          {messages.map((message, index) => (
            <div key={index} className={`d-flex mb-4 ${message.type === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
              <div className={`message-bubble text-white p-3 ${message.type}`}>
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="d-flex" style={{gap: '1rem'}}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tell me what kind of anime you want..."
            className="chat-input form-control px-4 py-3"
            style={{flex: 1}}
          />
          <button onClick={handleSendMessage} className="send-btn btn text-white px-4 py-3 fw-bold">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;