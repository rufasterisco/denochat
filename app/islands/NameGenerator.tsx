import { useEffect, useState } from "preact/hooks";

const emojiList = [
  "😀",
  "😻",
  "👾",
  "🌺",
  "🍕",
  "🚀",
  "💎",
  "🎨",
  "🎶",
  "📷",
  "🇺🇸",
  "🏳️‍🌈",
  "🍉",
  "⛵",
  "🌈",
  "🔥",
  "🦄",
  "🎃",
  "⭐",
  "🎁",
  "🚴‍♀️",
  "🌍",
  "🌹",
  "🍣",
  "👻",
  "👑",
  "🐶",
  "🦋",
  "🍀",
  "👽",
  "🎀",
  "🏈",
  "🍺",
  "🐢",
  "🌙",
  "🎩",
  "🎮",
  "🌟",
  "🦀",
  "⚽",
  "🧘‍♀️",
  "💡",
  "🎈",
  "🎉",
  "🌵",
  "🦉",
  "📚",
  "🏝",
  "🌮",
  "🏰",
  "🛒",
  "🎹",
  "🛹",
  "🍩",
  "🍌",
  "🍭",
  "🐰",
  "🦖",
  "🤖",
  "💃",
  "🕺",
  "🔮",
  "🏖",
  "🏂",
  "🦅",
  "🧸",
  "🍫",
  "🍷",
  "🦜",
  "🦭",
  "🥳",
  "🍻",
  "🚗",
  "⏰",
  "🧡",
  "🍒",
  "🌞",
  "🍦",
  "🎢",
  "🦈",
  "📝",
  "🎤",
  "📖",
  "🦁",
  "🛩",
  "🦑",
  "🪐",
  "🌶",
  "🦓",
  "🥐",
  "🪁",
  "🎥",
  "🔍",
  "🥇",
  "🐾",
  "🎻",
  "🛶",
  "🍇",
  "🎺",
  "🦚",
];

function RandomNameComponent() {
  const [name, setName] = useState("");

  useEffect(() => {
    // Try to get the name from localStorage
    let storedName = localStorage.getItem("randomName");

    // If there's no name in localStorage, generate a new one
    if (!storedName) {
      storedName = emojiList[Math.floor(Math.random() * emojiList.length)];
      localStorage.setItem("randomName", storedName);
    }
    // If there's no color in localStorage, generate a new one
    // Set the name in component state
    setName(storedName);
  }, []);

  return (
    <div>
      <p>
        Hi, you are <span className="text-4xl font-bold">{name}</span>
      </p>
    </div>
  );
}

export default RandomNameComponent;
