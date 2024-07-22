import { createCanvas } from "canvas";
import { getRandomColor } from "../utils/colors.js";

export const generateBlob = async function (text) {
  const canvas = createCanvas(32, 32);
  const ctx = canvas.getContext("2d");
  // Generate a random background color
  const backgroundColor = getRandomColor();
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = "bold 24px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#FFFFFF"; // white text color
  ctx.fillText(text, 16, 16);

  const base64String = canvas.toDataURL("image/png");
  const base64Blob = await fetch(base64String).then((res) => res.blob());
  return base64Blob;
};
