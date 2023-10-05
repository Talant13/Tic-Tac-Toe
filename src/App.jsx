import { useEffect, useState } from "react";
import "./App.scss";
import "animate.css";

function App() {
  const [data, setData] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  const [forX, setForX] = useState([]);
  const [forO, setForO] = useState([]);
  const [symbol, setSymbol] = useState("");
  const [flag, setFlag] = useState(false);
  const [winner, setWinner] = useState("");
  const [isDisable, setDisable] = useState(false);

  const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const addSymbol = (item) => {
    let newData = [...data];
    if (flag) {
      newData[item] = "X";
      setForX([...forX, item]);
    } else {
      newData[item] = "O";
      setForO([...forO, item]);
    }
    setFlag(!flag);
    setData(newData);
  };

  function checkWinner(arr1, arr2) {
    let cnt = 0;
    for (let i of arr2) {
      if (arr1.includes(i)) {
        cnt++;
      }
    }
    return cnt === 3 ? true : false;
  }

  useEffect(() => {
    if (forO.length > 4 || forX.length > 4) {
      setWinner("draw");
    }
    for (let i of winningCombo) {
      if (checkWinner(i, forO)) {
        setWinner("O");
        setDisable(true);
      } else if (checkWinner(i, forX)) {
        setWinner("X");
        setDisable(true);
      }
    }
  }, [forO, forX]);

  const handleReset = () => {
    setData([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    setForX([]);
    setForO([]);
    setSymbol("");
    setFlag(false);
    setWinner("");
    setDisable(false);
  };

  return (
    <div className="container animate__rubberBand">
      <div>
        <h1>TIC-TAC-TOE</h1>
      </div>
      <div
        className="wrapper"
        style={{ pointerEvents: isDisable ? "none" : "" }}>
        {data.map((item) => {
          return (
            <div
              className="block"
              style={{
                color: typeof item === "number" ? "transparent" : "#ffff",
                pointerEvents: typeof item === "string" ? "none" : "auto",
              }}
              onClick={() => addSymbol(item)}>
              {item}
            </div>
          );
        })}
      </div>
      <button className="shadow__btn" onClick={() => handleReset()}>
        Reset
      </button>
      {winner ? <p>Winner is {winner}</p> : null}
    </div>
  );
}

export default App;
