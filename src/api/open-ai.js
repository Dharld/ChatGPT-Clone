import openai from "./connect-openai";

const conversation = [{ role: "system", content: "You are a math tutor." }];

const generateResponse = async function (message) {
  try {
    // Add the message to the conversation
    conversation.push({ role: "user", content: message });
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: conversation,
      temperature: 0.7, // adjust the temperature to control the response's creativity
    });
    const text = response.choices[0].message.content;

    // Add the AI response to the conversation array
    conversation.push({ role: "assistant", content: text });

    return text;
  } catch (error) {
    console.error(error);
    return "Sorry, I couldn't generate a response. Please try again!";
  }
};

const getConversation = () => {
  return conversation.slice(1);
};

export { generateResponse, getConversation };
