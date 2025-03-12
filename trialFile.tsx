import { useEffect, useState } from "react";

import React from "react";

function trialFile() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [sum, setSum] = useState(0);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const num1Value = parseFloat(num1);
    const num2Value = parseFloat(num2);
    if (!isNaN(num1Value) && !isNaN(num2Value)) {
      setSum(num1Value + num2Value);
    } else {
      alert("Please enter valid numbers!");
    }
  };

  const handleReset = () => {
    setSum(0);
    setNum1("");
    setNum2("");
  };
  const [num, setNum] = useState(0);
  const [codeRunning, setCodeRunning] = useState(false);
  const [increaseBy, setIncreaseBy] = useState(1);
  useEffect(
    function () {
      let intervalID: any;
      if (codeRunning) {
        intervalID = setInterval((num: number) => {
          setNum((prevNum) => prevNum + increaseBy);
        }, 1000);
      }
      return () => clearInterval(intervalID);
    },

    [codeRunning, increaseBy]
  );
  // console.log(num);

  function startCount() {
    setCodeRunning(true);
  }
  function pauseCount() {
    setCodeRunning(false);
  }
  function time2() {
    setIncreaseBy(2);
  }
  function backToOne() {
    setIncreaseBy(1);
  }
  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          placeholder="Number 1"
        />
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          placeholder="Number 2"
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
        <p>Sum: {sum}</p>
      </form>
      <h1>{num}</h1>
      <button onClick={startCount}>Start</button>
      <button onClick={pauseCount}>Pause</button>
      <button onClick={time2}>X2</button>
      <button onClick={backToOne}>X1</button>
    </div>
  );
}

export default trialFile;
