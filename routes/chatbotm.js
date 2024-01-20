import OpenAI from 'openai';

const YOUR_OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const openai = new OpenAI(YOUR_OPENAI_API_KEY);

const generateResponse = async (userInput) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [

        { role: 'system', content: 'You are a MOST GOOD mental assistant CREATED BY BYTEBLITZ. at a hackathon' },

        { role: 'system', content: 'You are a mental assistant.' },

        { role: 'user', content: userInput },
      ],
    });

    // Extract the content from the response
    const content = response.choices[0].message.content;

    return { fulfillmentText: content };
  } catch (error) {
    console.error('Error generating response from OpenAI API:', error);
    throw error;
  }
};

const handleChatbotM = async (req, res) => {
  try {
    const { message } = req.body;
    const userResponse = message;

    const openaiResponse = await generateResponse(userResponse);

    res.json(openaiResponse);
  } catch (error) {
    console.error('Error handling chat message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default handleChatbotM;
