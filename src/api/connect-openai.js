import OpenAI from "openai";

const apiKey = import.meta.env.VITE_OPEN_AI_KEY;

const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true,
});

export default openai;
