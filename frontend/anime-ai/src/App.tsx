import { useState } from 'react';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4c1d95 0%, #1e3a8a 50%, #312e81 100%)'
    }}>
      {/* Header */}
      <nav className="navbar navbar-expand-lg justify-content-center" style={{
        backgroundColor: 'rgba(0,0,0,0.2)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div className="px-4 py-2" style={{
          backgroundColor: '#a855f7',
          borderRadius: '25px'
        }}>
          <h1 className="h3 mb-0 fw-bold text-white">AnimeRec</h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="d-flex align-items-center justify-content-center" style={{
        minHeight: 'calc(100vh - 80px)',
        padding: '2rem 1rem'
      }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              
              {/* Hero Title */}
              <h2 className="display-1 fw-bold text-white mb-4" style={{
                background: 'linear-gradient(45deg, #a855f7, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Discover Your Next
                <br />
                Favorite Anime
              </h2>

              {/* Description */}
              <div className="row justify-content-center mb-5">
                <div className="col-lg-8">
                  <p className="lead text-white mb-4" style={{ opacity: '0.9' }}>
                    Chat with our AI to get personalized anime recommendations. Just tell us what you're in the mood for, 
                    and our smart chatbot will suggest the perfect anime for you.
                  </p>
                  <p className="text-white" style={{ opacity: '0.7' }}>
                    Whether you want something action-packed, heartwarming, or totally weird - just describe it and let our AI do the rest.
                  </p>
                </div>
              </div>

              {/* Main CTA Button */}
              <button 
                className="btn btn-lg px-5 py-3 mb-5 fw-bold" 
                style={{
                  background: 'linear-gradient(45deg, #8b5cf6, #ec4899)',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '1.2rem',
                  color: 'white',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                }}
              >
                Chat with AI Now
              </button>

              {/* Features */}
              <div className="row g-4 mt-5">
                <div className="col-md-4">
                  <div className="card h-100" style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '15px'
                  }}>
                    <div className="card-body text-center p-4">
                      <div className="d-flex align-items-center justify-content-center mx-auto mb-3" style={{
                        width: '50px',
                        height: '50px',
                        backgroundColor: '#a855f7',
                        borderRadius: '50%'
                      }}>
                        <span style={{ color: 'white', fontSize: '20px' }}>★</span>
                      </div>
                      <h5 className="card-title text-white fw-semibold">Personalized</h5>
                      <p className="card-text text-white small" style={{ opacity: '0.8' }}>
                        Get recommendations based on what you actually like
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="card h-100" style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '15px'
                  }}>
                    <div className="card-body text-center p-4">
                      <div className="d-flex align-items-center justify-content-center mx-auto mb-3" style={{
                        width: '50px',
                        height: '50px',
                        backgroundColor: '#a855f7',
                        borderRadius: '50%'
                      }}>
                        <span style={{ color: 'white', fontSize: '20px' }}>💬</span>
                      </div>
                      <h5 className="card-title text-white fw-semibold">AI Chat</h5>
                      <p className="card-text text-white small" style={{ opacity: '0.8' }}>
                        Just describe what you want - "something like Naruto but shorter"
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="card h-100" style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '15px'
                  }}>
                    <div className="card-body text-center p-4">
                      <div className="d-flex align-items-center justify-content-center mx-auto mb-3" style={{
                        width: '50px',
                        height: '50px',
                        backgroundColor: '#a855f7',
                        borderRadius: '50%'
                      }}>
                        <span style={{ color: 'white', fontSize: '20px' }}>▶</span>
                      </div>
                      <h5 className="card-title text-white fw-semibold">No Spoilers</h5>
                      <p className="card-text text-white small" style={{ opacity: '0.8' }}>
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