const paletteContainer = document.getElementById("palette");
const generateBtn = document.getElementById("generateBtn");
const customColorInputs = document.querySelectorAll("#customColors input");

// Generate a random HEX color
function generateColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase()
  );
}

// Check if the color name or hex is valid
function isValidColor(strColor) {
  const s = new Option().style;
  s.color = strColor;
  return s.color !== "";
}

// Get computed hex value of a color name
function getComputedHex(colorName) {
  const temp = document.createElement("div");
  temp.style.color = colorName;
  document.body.appendChild(temp);
  const computedColor = getComputedStyle(temp).color;
  document.body.removeChild(temp);

  const rgb = computedColor.match(/\d+/g);
  if (!rgb) return null;

  return (
    "#" +
    rgb
      .map((x) => parseInt(x).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

// Create a color box element
function createColorBox(color) {
  const box = document.createElement("div");
  box.className = "color-box";
  box.style.backgroundColor = color;
  box.textContent = color;

  box.addEventListener("click", () => {
    navigator.clipboard.writeText(color);
    alert(`Copied ${color} to clipboard!`);
  });

  return box;
}

// Generate palette based on inputs or random
function generatePalette() {
  paletteContainer.innerHTML = "";

  customColorInputs.forEach((input) => {
    const userInput = input.value.trim();
    let finalColor = "";

    if (userInput === "") {
      // Empty → random color
      finalColor = generateColor();
    } else if (isValidColor(userInput)) {
      // If valid name or hex
      finalColor = getComputedHex(userInput);
    } else {
      // Invalid → fallback to random
      finalColor = generateColor();
    }

    const box = createColorBox(finalColor);
    paletteContainer.appendChild(box);
  });
}

// Initial palette on page load
generatePalette();

// Regenerate on button click
generateBtn.addEventListener("click", generatePalette);

function getContrastColor(hexColor) {
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);

  // Calculate brightness (0–255)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return black for light colors, white for dark
  return brightness > 128 ? '#000000' : '#FFFFFF';
}

function createColorBox(color) {
  const box = document.createElement("div");
  box.className = "color-box";
  box.style.backgroundColor = color;

  // Get best contrast color for text
  const textColor = getContrastColor(color);
  box.style.color = textColor;

  box.textContent = color;

  box.addEventListener("click", () => {
    navigator.clipboard.writeText(color);
    alert(`Copied ${color} to clipboard!`);
  });

  return box;
}


