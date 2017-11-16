export function colorRect ( gameContext, topLeftX, topLeftY, boxWidth, boxHeight, fillColor = 'red'){
  gameContext.fillStyle = fillColor;
  gameContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
};

export function colorCircle  (centerX, centerY, radius, color = 'blue', gameContext) {
  gameContext.fillStyle = color;
  gameContext.beginPath();
  gameContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  gameContext.fill();
};
