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

  return (
    <div style={styles.container}>
      <div style={styles.statusContainer}>
        <h1 style={styles.title}>Is ChatGPT Down?</h1>
        <p style={styles.statusText}>{status}</p>

        {isUp === null ? (
          <div>Loading...</div>
        ) : isUp ? (
          <Lottie options={upOptions} height={200} width={200} />
        ) : (
          <Lottie options={downOptions} height={200} width={200} />
        )}
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
    backgroundColor: '#f0f0f0',
    margin: 0,
  },
  statusContainer: {
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
    width: '300px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '15px',
  },
  statusText: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px',
  }
};

export default App;
