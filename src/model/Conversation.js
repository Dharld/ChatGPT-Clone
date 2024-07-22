import { supabase } from "../api/connect";
import { v4 as uuidv4 } from "uuid";

export const Conversation = function (title) {
  this.title = title;
  this.chats = [];
};

Conversation.from = function (conv) {
  const c = new Conversation(conv.title);
  c.chats = conv.chats.slice();
  return c;
};

Conversation.prototype.addChat = function (chat) {
  this.chats = this.chats.concat(chat); // Create a new array by spreading the existing chats and adding the new message
};

Conversation.prototype.getChats = function () {
  return [...this.chats];
};

Conversation.prototype.getLatestChat = function () {
  if (this.chats.length === 0) {
    return null;
  }
  return this.chats[this.chats.length - 1];
};

Conversation.prototype.save = async function () {
  const { data, error } = await supabase.from("Conversation").upsert([this]);

  if (error) {
    console.error("Error adding conversation:", error);
    return null;
  }

  console.log("Conversation added successfully:", data);
  return data;
};
