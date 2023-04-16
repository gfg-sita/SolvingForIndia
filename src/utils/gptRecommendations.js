const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

async function gptRecommendation (prompt_request) {
const completion = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: prompt_request,
  max_tokens: 150
});
const reply = completion.data.choices[0].text;
return reply;
}

exports.gptRecommendation = gptRecommendation;