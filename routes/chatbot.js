import OpenAI from 'openai';

// Access API key from environment securely
const YOUR_OPENAI_API_KEY = process.env.OPENAI_API_KEY || ''; // Handle missing key gracefully

// Create the OpenAI client instance
const openai = new OpenAI(YOUR_OPENAI_API_KEY);

const generateResponse = async (userInput) => {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a best ayurvedic medicine assistant. created by ByteBlitz at a hackathon' },
          { role: 'user', content: userInput }
        ],
      });
      const content = response.choices[0].message.content;
      // Split the response into lines
      return { fulfillmentText: content };
    } catch (error) {
      console.error('Error generating response from OpenAI API:', error);
      throw error; // Re-throw to propagate the error up the call stack
    }
  };

const handleChatbot = async (req, res) => {
  try {
    const { message } = req.body;
    const userResponse = message;

    const openaiResponse = await generateResponse(userResponse);

    res.json({ openaiResponse });
  } catch (error) {
    console.error('Error handling chat message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handleChatbot;