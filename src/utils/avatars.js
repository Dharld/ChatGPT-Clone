import { generateBlob } from "./images";

export const addAvatar = async (supabase, email) => {
  const bucketName = "avatars";
  const firstLetter = email.charAt(0).toUpperCase();
  const blob = await generateBlob(firstLetter);

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(`${email}.png`, blob, {
      contentType: "image/png",
    });

  if (error) {
    throw error;
  }

  return data;
};
