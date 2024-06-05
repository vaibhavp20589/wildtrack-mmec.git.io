// AlertForm.js

import React, { useState } from 'react';

const AlertForm = () => {
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [alertSent, setAlertSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/send-alert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipient, message }),
      });
      const data = await response.json();
      console.log(data);
      setAlertSent(true);
    } catch (error) {
      console.error('Error sending alert:', error);
    }
  };

  return (
    <div>
      <h2>Wildlife Tracking Alert System</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="recipient">Recipient Phone Number:</label><br />
        <input type="text" id="recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)} required /><br /><br />
        <label htmlFor="message">Alert Message:</label><br />
        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required /><br /><br />
        <button type="submit">Send Alert</button>
      </form>
      {alertSent && <p>Alert sent successfully!</p>}
    </div>
  );
};

export default AlertForm;