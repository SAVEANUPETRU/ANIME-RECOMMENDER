import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app-bg">
      {/* Header */}
      <nav className="app-navbar">
        <div className="app-brand">
          <h1 className="h3 mb-0 fw-bold text-white">AnimeRec</h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="app-main">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              
              {/* Title */}
              <h2 className="app-title">
                Discover Your Next
                <br />
                Favorite Anime
              </h2>

              {/* Description */}
              <div className="row justify-content-center mb-5">
                <div className="col-lg-8">
                  <p className="app-desc lead text-white mb-4">
                    Chat with our AI to get personalized anime recommendations. Just tell us what you're in the mood for, 
                    and our smart chatbot will suggest the perfect anime for you.
                  </p>
                  <p className="app-desc-secondary text-white">
                    Whether you want something action-packed, heartwarming, or totally weird - just describe it and let our AI do the rest.
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <button className="app-btn mb-5">
                Chat with AI Now
              </button>

              {/* Features */}
              <div className="row g-4 mt-5">
                <div className="col-md-4">
                  <div className="app-card h-100">
                    <div className="card-body text-center p-4">
                      <div className="app-icon">
                        <span>★</span>
                      </div>
                      <h5 className="card-title text-white fw-semibold">Personalized</h5>
                      <p className="app-card-text text-white small">
                        Get recommendations based on what you actually like
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="app-card h-100">
                    <div className="card-body text-center p-4">
                      <div className="app-icon">
                        <span>💬</span>
                      </div>
                      <h5 className="card-title text-white fw-semibold">AI Chat</h5>
                      <p className="app-card-text text-white small">
                        Just describe what you want - "something like Naruto but shorter"
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="app-card h-100">
                    <div className="card-body text-center p-4">
                      <div className="app-icon">
                        <span>▶</span>
                      </div>
                      <h5 className="card-title text-white fw-semibold">No Spoilers</h5>
                      <p className="app-card-text text-white small">
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
    </div>
  );
}

export default App;