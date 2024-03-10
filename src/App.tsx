//styles
import { useEffect, useState } from "react";
import "./App.css";

//assets
import holeImg from "./assets/hole.png";
import moleImg from "./assets/mole.png";

//components

function App() {
  const [moles, setMoles] = useState<boolean[]>(new Array(9).fill(false));
  const [score, setScore] = useState<number>(0);
  const [time, setTime] = useState<number>(30);

  function setMoleVisibility(index: number, isVisible: boolean) {
    setMoles((prevMoles) => {
      const newMoles = [...prevMoles];
      newMoles[index] = isVisible;
      return newMoles;
    });
  }

  function wackMole(index: number) {
    if (moles[index]) {
      setScore((prevScore) => prevScore + 1);
      setMoleVisibility(index, false);
    }
  }

  useEffect(() => {
    if (time > 0) {
      const moleInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * moles.length);
        setMoleVisibility(randomIndex, true);

        setTimeout(() => {
          setMoleVisibility(randomIndex, false);
          setTime(time - 1);
        }, 500);
      }, 1000);

      return () => clearInterval(moleInterval);
    }
  }, [moles, time]);

  return (
    <div className="App">
      <h1>Whack a mole</h1>
      <div className="flex">
        <h2>Time: {time}</h2>
        <h2>Score: {score}</h2>
      </div>

      <div className="grid">
        {moles.map((isMole, index) => {
          return (
            <img
              draggable="false"
              key={index}
              src={isMole ? moleImg : holeImg}
              onClick={() => {
                wackMole(index);
              }}
              alt="mole"
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
