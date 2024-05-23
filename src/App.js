import React, { useState } from 'react';
import { Fade, Zoom } from 'react-reveal'; // Import Zoom effect from react-reveal library
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [passwordStrength, setPasswordStrength] = useState(10);
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    const length = passwordStrength;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@&_.";
    let newPassword = "";
    for (let i = 0; i < length; ++i) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    setPassword(newPassword);
  };

  const handleStrengthChange = (event) => {
    setPasswordStrength(parseInt(event.target.value));
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password).then(() => {
      toast.success(
        <Zoom> {/* Wrap the toast message with Zoom effect */}
          <div>Password copied successfully!</div>
        </Zoom>,
        {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
        }
      );
    }, (error) => {
      console.error("Error copying password:", error);
      alert("Error copying password!");
    });
  };

  return (
    <div className="App">
      <Zoom>
        <h1>Password Generator</h1>
      </Zoom>
      <Fade left>
        <input
          type="range"
          min="6"
          max="20"
          value={passwordStrength}
          onChange={handleStrengthChange}
        />
      </Fade>
      <p>Password Strength: {passwordStrength}</p>
      <Fade right>
        <button onClick={generatePassword}>Generate</button>
      </Fade>
      <p className="password-display">{password}</p>
      {password && (
        <button onClick={handleCopyPassword}>Copy</button>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
