// chatbot.js
const handleChatbot = (req, res) => {
    try {
      const { message } = req.body;
      const response = `You said: ${message}`;
      res.json({ fulfillmentText: response });
    } catch (error) {
      console.error('Error handling chat message:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = handleChatbot;
  