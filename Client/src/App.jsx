import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

// Use the correct backend URL after deployment
const socket = io('https://chatapp-1-18vy.onrender.com'); 

const App = () => {
  const [mymessage, setmymessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('rec', (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('rec');
    };
  }, []);

  const sendmsg = () => {
    if (mymessage.trim() !== '') {
      socket.emit('msg', { message: mymessage }); // Send message to the server
      setmymessage(''); // Clear input
    }
  };

  return (
    <div>
      <input
        type="text"
        value={mymessage}
        onChange={(e) => setmymessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={sendmsg}>Send Message</button>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
