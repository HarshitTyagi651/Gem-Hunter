import { useEffect, useState } from "react";
import "./App.css";
import acheivement from './audios/acheivement.mp3';
import gameover from './audios/gameover.mp3';
import bomb from "./images/bomb.png";
import diamond from "./images/diamond.png";
import rupee from "./images/trophy.png";

function App() {
  let initialArray = [
    1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1,
  ];
  let [arr, setArr] = useState(initialArray);
  let [highestScore, setHighestScore] = useState(0);
  let [score, setScore] = useState(0);
  let [restart, setRestart] = useState(false);
  let [animation, setAnimation] = useState("");
  let [clicked, setClicked] = useState(Array(initialArray.length).fill(false));
  let [gameOver, setGameOver] = useState(false);

  const handleRestart = () => {
    let arrayCopy = [...arr];
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    setArr(arrayCopy);
    setClicked(Array(initialArray.length).fill(false));
    setScore(0);
    setRestart(false);
    setGameOver(false);
  };

  const handleReveal = (index, value) => {
    if (!clicked[index] && !gameOver) {
      if (value === 1) {
        let temp = score;
        temp = temp + 100;
        setScore(parseFloat(temp.toFixed(2)));
        new Audio(acheivement).play();
      } else {
        if (score > highestScore) {
          setHighestScore(score);
        }
        setAnimation("zoom");
        new Audio(gameover).play();
        setGameOver(true);
        setRestart(true);
      }
      const newClicked = [...clicked];
      newClicked[index] = true;
      setClicked(newClicked);
    }
  };

  const handleRevealAll = () => {
    setClicked(Array(initialArray.length).fill(true));
  };

  useEffect(() => {
    handleRestart();
  }, []);

  return (
    <div className="App">
      <nav>
        <h1>Gem Hunter</h1>
        <div className="amount">
          <img src={rupee} alt="Rupee" />
          <span>{highestScore}</span>
        </div>
      </nav>
      <main>
        <div className="game-box">
          {arr.map((item, i) => (
            <div key={i}>
              {clicked[i] ? (
                <img
                  src={item === 1 ? diamond : bomb}
                  alt={item === 1 ? "Diamond" : "Bomb"}
                  draggable="false"
                  style={{
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                  className={item === 0 ? animation : null}
                />
              ) : (
                <div
                  className="hidden-box"
                  onClick={() => handleReveal(i, item)}
                ></div>
              )}
            </div>
          ))}
        </div>
      </main>
      <footer>
        <span id="score">Your Score: {score}</span>
        {restart ? (
          <div className="restart">
            <button onClick={handleRestart}>Restart</button>
            <button id="reveal-all" onClick={handleRevealAll}>
              Reveal all
            </button>
          </div>
        ) : null}
      </footer>
      <span id="credits">By Harshit Tyagi</span>
    </div>
  );
}

export default App;
