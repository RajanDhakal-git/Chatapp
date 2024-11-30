import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');

const App = () => {
  const [mymessage, setmymessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('rec', (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    return () => {
      socket.off('rec'); // Clean up the listener on component unmount
    };
  }, []);

  const sendmsg = () => {
    if (mymessage.trim() !== '') {
      socket.emit('msg', { message: mymessage });
      setmymessage('');
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
