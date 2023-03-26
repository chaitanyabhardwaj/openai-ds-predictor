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

  const msg = req.body.msg || '';
  const temp = req.body.temp || false;
  if (msg.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "You don't need a data structure for this",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(msg, temp),
      temperature: (temp)?1:0
    });
    res.status(200).json({
      result: completion.data.choices[0].text,
      temp1: temp
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

function generatePrompt(msg, temp) {
  const capitalized =
    msg[0].toUpperCase() + msg.slice(1).toLowerCase();
    if(temp) {
      return `Suggest 1 or more data structures with lowest time complexity and/or lowest space complexity, for the following situations: 
      Q: Searching all matching words in a large list
      A: Trie or Hash table or Array
      Q: To find the shortest path available from one point to another.
      A: Graphs 
      Q: To find kth largest element in a list
      A: Max heap or Priority queue
      Q: ${capitalized}
      A: `;
    }
  return `Suggest a data structure with lowest time complexity, for the following situations: 
  Q: Searching all matching words in a large list
  A: Trie
  Q: To find the shortest path available from one point to another.
  A: Graphs
  Q: To find kth largest element in a list
  A: Max heap or Priority queue
  Q: ${capitalized}
  A: `;
}
