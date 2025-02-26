import React from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./KeyboardStyles.css"; // Import custom styles

const KeyboardComponent = ({ setInput, layout, input }) => {
  const layouts = {
    english: {
      default: [
        "` 1 2 3 4 5 6 7 8 9 0 - = {backspace}",
        "{tab} q w e r t y u i o p [ ] \\",
        "{capslock} a s d f g h j k l ; ' {enter}",
        "{shift} z x c v b n m , . / {shift}",
        "ctrl win space win ctrl",
      ],
    },
    hindi: {
      default: [
        "१ २ ३ ४ ५ ६ ७ ८ ९ ० - = {backspace}",
        "{tab} क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण",
        "{capslock} त थ द ध न प फ ब भ म य र ल व {enter}",
        "{shift} श ष स ह ळ क्ष ज्ञ , . / {shift}",
        "ctrl win space win ctrl",
      ],
    },
    marathi: {
      default: [
        "१ २ ३ ४ ५ ६ ७ ८ ९ ० - = {backspace}",
        "{tab} अ आ इ ई उ ऊ ए ऐ ओ औ अं अः",
        "{capslock} क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण {enter}",
        "{shift} त थ द ध न प फ ब भ म य र ल व {shift}",
        "ctrl win space win ctrl",
      ],
    },
    gujarati: {
      default: [
        "૧ ૨ ૩ ૪ ૫ ૬ ૭ ૮ ૯ ૦ - = {backspace}",
        "{tab} ક ખ ગ ઘ ઙ ચ છ જ ઝ ઞ ટ ઠ ડ ઢ ણ",
        "{capslock} ત થ દ ધ ન પ ફ બ ભ મ ય ર લ વ {enter}",
        "{shift} શ ષ સ હ ળ ક્ષ જ્ઞ , . / {shift}",
        "ctrl win space win ctrl",
      ],
    },
  };

  const handleKeyPress = (button) => {
    if (button === "{backspace}") {
      setInput((prev) => prev.slice(0, -1)); // Remove last character
    } else if (button === "{enter}") {
      setInput((prev) => prev + "\n"); // Handle enter as newline
    } else if (!button.startsWith("{")) {
      setInput((prev) => prev + button); // Append characters
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Multilingual Keyboard</h2>

      {/* Virtual Keyboard */}
      <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-lg">
        <Keyboard
          layout={layouts[layout]}
          theme="hg-theme-default myKeyboardTheme"
          onKeyPress={handleKeyPress} // Handle key press events properly
        />
      </div>
    </div>
  );
};

export default KeyboardComponent;
