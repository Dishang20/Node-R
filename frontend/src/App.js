import React, { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [message, setMessage] = useState('');
  const [apiMessage, setApiMessage] = useState('');

  useEffect(() => {
    fetch('/msg')
      .then(res => res.json())
      .then(data => setMessage(data.message));
    fetch('/api')
      .then(res => res.json())
      .then(data => setApiMessage(data.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{message}</p>
        <p>{apiMessage}</p>
      </header>
    </div>
  );
}

export default App;
