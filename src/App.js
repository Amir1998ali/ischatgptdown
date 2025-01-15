import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import * as animationDataUp from './LottieAnimations/congratulations.json';  // Up animation
import * as animationDataDown from './LottieAnimations/sadface.json';      // Down animation

const App = () => {
  const [status, setStatus] = useState('Checking...');
  const [isUp, setIsUp] = useState(null); // true for up, false for down

  useEffect(() => {
    const checkChatGPTStatus = async () => {
      try {
        const response = await fetch('https://api.openai.com/v1/models', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}` // API Key via env variable
          }
        });

        if (response.ok) {
          setStatus("ChatGPT is up!");
          setIsUp(true);
        } else {
          setStatus("ChatGPT is down!");
          setIsUp(false);
        }
      } catch (error) {
        setStatus("ChatGPT is down!");
        setIsUp(false);
      }
    };

    checkChatGPTStatus();
  }, []);

  // Lottie animation options
  const upOptions = {
    loop: true,
    autoplay: true,
    animationData: animationDataUp,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const downOptions = {
    loop: true,
    autoplay: true,
    animationData: animationDataDown,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  // Refresh page function
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div style={styles.container}>
      <div style={styles.statusContainer}>
        <h1 style={styles.title}>Is ChatGPT Down?</h1>
        <p style={styles.statusText}>{status}</p>

        {isUp === null ? (
          <div style={styles.loadingText}>Loading...</div>
        ) : isUp ? (
          <Lottie options={upOptions} height={200} width={200} />
        ) : (
          <Lottie options={downOptions} height={200} width={200} />
        )}

        {/* Refresh Button */}
        <button style={styles.refreshButton} onClick={refreshPage}>
          Refresh
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #a0c4ff, #ffb3b3)', // Calming gradient background
    margin: 0,
    color: '#333',
  },
  statusContainer: {
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
    width: '350px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
    color: '#4e73df',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    animation: 'fadeIn 2s ease-out',
  },
  statusText: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
    transition: 'all 0.3s ease',
  },
  loadingText: {
    fontSize: '20px',
    fontStyle: 'italic',
    color: '#aaa',
    marginBottom: '20px',
  },
  refreshButton: {
    backgroundColor: '#4e73df', // Button color matching the theme
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    marginTop: '20px',
  },
};

// Adding some keyframe animations for smooth fade-in effect
const fadeInAnimation = `
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

document.styleSheets[0].insertRule(fadeInAnimation, 0);

export default App;
