import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const ds = req.body.ds || '';
  if (ds.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Null data structure implemented successfully!",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(ds),
      temperature: 0,
      max_tokens: 2048
    });
    res.status(200).json({
      result: completion.data.choices[0].text,
    });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(ds) {
  const capitalized = ds[0].toUpperCase() + ds.slice(1).toLowerCase();
  return `Here is a complete working example of the ${capitalized} data structure:`;
}
