function Die({ id, value, isHeld, hold, gameWon }) {
  function handleClick() {
    hold(id);
  }

  let dieClassName = isHeld || gameWon ? "die die__held" : "die";
  dieClassName += " die" + value;
  return (
    <button
      className={dieClassName}
      onClick={handleClick}
      aria-pressed={isHeld}
      aria-label={`A dice with value of ${value}`}
    >
    </button>
  );
}

export default Die;
