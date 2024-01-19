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
          { role: 'system', content: 'You are a mental assistant.' },
          { role: 'user', content: userInput }
        ],
      });
  
      // Split the response into lines
      const lines = response.choices[0].message.content.split('\n');
  
      // Map each line to a field in a JSON object
      const responseObject = lines.reduce((obj, line, index) => {
        obj[`Point ${index + 1}`] = line;
        return obj;
      }, {});
  
      return responseObject;
    } catch (error) {
      console.error('Error generating response from OpenAI API:', error);
      throw error; // Re-throw to propagate the error up the call stack
    }
  };

const handleChatbotM = async (req, res) => {
  try {
    const { message } = req.body;
    const userResponse = message;

    const openaiResponse = await generateResponse(userResponse);

    res.json({ fulfillmentText: openaiResponse });
  } catch (error) {
    console.error('Error handling chat message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handleChatbotM;