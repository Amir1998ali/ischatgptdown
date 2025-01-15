import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import * as animationDataUp from './LottieAnimations/congratulations.json';  // Up animation
import * as animationDataDown from './LottieAnimations/sadface.json';      // Down animation
import * as animationDataRocket from './LottieAnimations/rocket.json';     // Rocket animation

// Import the logo image
import chatGptLogo from './chatgpt-logo.png';

const App = () => {
  const [status, setStatus] = useState('Checking...');
  const [isUp, setIsUp] = useState(null); // true for up, false for down
  const [showRocket, setShowRocket] = useState(false); // State for showing rocket animation

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
          setShowRocket(true); // Show rocket when ChatGPT is up
        } else {
          setStatus("ChatGPT is down!");
          setIsUp(false);
          setShowRocket(false); // Hide rocket when ChatGPT is down
        }
      } catch (error) {
        setStatus("ChatGPT is down!");
        setIsUp(false);
        setShowRocket(false); // Hide rocket when there's an error
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

  const rocketOptions = {
    loop: true,
    autoplay: true,
    animationData: animationDataRocket,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  // Refresh page function
  const refreshPage = () => {
    // Simply reload the page
    window.location.reload();
  };

  return (
    <div style={styles.container}>
      {/* Logo and Rocket container with white background */}
      <div style={styles.logoRocketContainer}>
        <div style={styles.logoRocketInnerContainer}>
          {/* ChatGPT logo */}
          <img src={chatGptLogo} alt="ChatGPT Logo" style={styles.logo} />

          {/* Rocket animation */}
          {showRocket && (
            <Lottie options={rocketOptions} height={100} width={100} />
          )}
        </div>
      </div>

      {/* Content container with separate background color */}
      <div style={styles.statusContentContainer}>
        {/* Creative Introduction Text */}
        <p style={styles.introText}>
          With the growing demand for ChatGPT, it's important to check whether it's available in real time. This tool helps you instantly know if ChatGPT is up or down, saving you time!
        </p>

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

      {/* Footer Text */}
      <div style={styles.footerText}>
        <p>© 2025 ChatGPT Status | Developed by Amirali Mohseni</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #a0c4ff, #ffb3b3)', // Calming gradient background
    margin: 0,
    color: '#333',
  },
  logoRocketContainer: {
    textAlign: 'center',
    backgroundColor: 'transparent',  // Set background to transparent
    padding: '15px',  // Reduced padding to make the container more compact
    borderRadius: '15px',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0)', // Keep shadow for visibility
    width: '200px', // Adjust width to fit the logo and rocket properly
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoRocketInnerContainer: {
    display: 'flex',
    alignItems: 'center', // Align logo and rocket horizontally
    justifyContent: 'center',
    backgroundColor: 'transparent', // White background for logo and rocket container
    padding: '10px',
    borderRadius: '10px',
  },
  logo: {
    width: '40px',  // Adjust logo size to be smaller
    height: 'auto',
    marginRight: '15px', // Space between logo and rocket
  },
  statusContentContainer: {
    textAlign: 'center',
    backgroundColor: 'white',  // Light blue background for the content
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
    fontSize: '30px',
    marginBottom: '20px',
    color: '#4e73df',  // Darker color for title
    fontWeight: 'bold',
    textTransform: 'uppercase',
    animation: 'fadeIn 2s ease-out',
  },
  introText: {
    fontSize: '15px',
    color: 'black',  // White text color for better contrast
    marginBottom: '20px',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: '0',
    maxWidth: '80%',
  },
  statusText: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',  // Darker text color for status
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
  footerText: {
    backgroundColor: 'transparent',  // No background for footer
    padding: '10px 0',
    marginTop: '30px',
    fontSize: '14px',
    textAlign: 'center',
    color: '#333',
    width: '100%',
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
