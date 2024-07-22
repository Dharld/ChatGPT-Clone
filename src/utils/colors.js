export const getRandomColor = () => {
  const colors = [
    "#FFC080", // Orange
    "#008000", // Green
    "#0000FF", // Blue
    "#FFFF00", // Yellow
    "#FF0000", // Red
    "#800080", // Purple
    "#008080", // Teal
    "#808000", // Brown
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
