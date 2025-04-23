import { useState, useRef, useEffect } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import Die from "./components/Die.jsx";
import Timer from "./components/Timer.jsx";

function App() {
  const [dice, setDice] = useState(() => rollDiceStart());
  const [rollCount, setRollCount] = useState(1);

  const gameWon =
    dice.every((die) => die.isHeld === true) &&
    dice.every((die) => die.value === dice[0].value);

  const { width, height } = useWindowSize;

  const rollButton = useRef(null);
  useEffect(() => {
    gameWon && rollButton.current.focus();
  }, [gameWon]);

  function rollDiceStart() {
    const DICE_COUNT = 10;
    return new Array(DICE_COUNT).fill(0).map((die, index) => {
      return {
        id: index,
        value: rollDie(),
        isHeld: false,
      };
    });
  }

  function rollDice() {
    const newDice = dice.map((die) => {
      return die.isHeld ? die : { ...die, value: rollDie(), isHeld: false };
    });

    return newDice;
  }

  function rollDie() {
    const MIN_DIE = 1;
    const MAX_DIE = 6;

    return MIN_DIE + Math.floor(MAX_DIE * Math.random());
  }

  function handleNewDice() {
    if (gameWon) {
      setRollCount(1);
      setDice(rollDiceStart());
    } else {
      setRollCount(rollCount + 1);
      setDice((prevDice) => rollDice(prevDice));
    }
  }

  function hold(id) {
    const found = dice.find((die) => die.id === id);
    found.isHeld = !found.isHeld;
    setDice((prevDice) => [...prevDice]);
  }

  const diceElements = dice.map((die, index) => (
    <Die
      id={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={hold}
      gameWon={gameWon}
      key={index}
    />
  ));

  return (
    <main className="container">
      <div className="sr-only" aria-live="polite">
        <p>Congratulations! You won. Press "New game" to start again.</p>
      </div>
      {gameWon ? <Confetti width={width} height={height} /> : null}
      <h1>Tenzies</h1>
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <p>
        <strong>Roll #{rollCount}</strong>
      </p>
      {!gameWon && <Timer/>}
      <section className="dice--container">{diceElements}</section>
      <button className="btn" onClick={handleNewDice} ref={rollButton}>
        {gameWon ? "New game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
