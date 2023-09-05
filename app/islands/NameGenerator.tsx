import { useEffect, useState } from "preact/hooks";

const adjectives = [
  "Adoring",
  "Amazing",
  "Angry",
  "Awesome",
  "Blissful",
  "Bold",
  "Boring",
  "Brave",
  "Busy",
  "Charming",
  "Clever",
  "Cool",
  "Compassionate",
  "Determined",
  "Distracted",
  "Dreamy",
  "Eager",
  "Ecstatic",
  "Eloquent",
  "Fervent",
  "Focused",
  "Friendly",
  "Furious",
  "Gigantic",
  "Happy",
  "Inspiring",
  "Jolly",
  "Keen",
  "Lonely",
  "Loving",
  "Lucid",
  "Modest",
  "Mystifying",
  "Naughty",
  "Nostalgic",
  "Peaceful",
  "Quirky",
  "Relaxed",
  "Silly",
  "Sleepy",
  "Stoic",
  "Stupefied",
  "Suspicious",
  "Tender",
  "Thirsty",
  "Trusting",
];

const artistNames = [
  "Picasso",
  "Vangogh",
  "Davinci",
  "Michelangelo",
  "Rembrandt",
  "Warhol",
  "Monet",
  "Kahlo",
  "Matisse",
  "Pollock",
  "Kandinsky",
  "Hokusai",
  "Dali",
  "Cezanne",
  "Gauguin",
  "Vermeer",
  "Caravaggio",
  "Manet",
  "Okeeffe",
  "Basquiat",
];

function getRandomElement(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRandomName(): string {
  return `${getRandomElement(adjectives)} ${getRandomElement(artistNames)}`;
}

function generateRandomBrightColor() {
  // Generate each color component with high intensity to ensure brightness
  const red = Math.floor(Math.random() * 128 + 128).toString(16); // Between 128 and 255
  const green = Math.floor(Math.random() * 128 + 128).toString(16); // Between 128 and 255
  const blue = Math.floor(Math.random() * 128 + 128).toString(16); // Between 128 and 255

  // Combine them into a full color hex code
  return `#${red}${green}${blue}`;
}

function RandomNameComponent() {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    // Try to get the name from localStorage
    let storedName = localStorage.getItem("randomName");
    let storedColor = localStorage.getItem("randomColor");

    // If there's no name in localStorage, generate a new one
    if (!storedName) {
      storedName = generateRandomName();
      localStorage.setItem("randomName", storedName);
    }
    // If there's no color in localStorage, generate a new one
    if (!storedColor) {
      storedColor = generateRandomBrightColor();
      localStorage.setItem("randomColor", storedColor);
    }
    // Set the name in component state
    setName(storedName);
    setColor(storedColor);
  }, []);

  return (
    <div>
      <p>
        Hi, you are <span style={{ color }}>{name}</span>
      </p>
    </div>
  );
}

export default RandomNameComponent;
