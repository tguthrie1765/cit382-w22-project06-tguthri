import "./styles.css";
import { Text } from "./text";
import React, { useEffect, useState } from "react";

export default function App() {
  const [inputParent, setInputParent] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [value, setValue] = useState(0);
  const [css, setCSS] = useState("light");
  const [count, setCount] = useState(0);

  function darkMode() {
    let element = document.body;
    element.classList.toggle("dark");
  }

  console.log("end time=", endTime);

  useEffect(() => {
    if (startTime != null && endTime == null) {
      setTimeout(() => {
        setCount((count) => count + 1);
      }, 1000);
    }
  }, [count, startTime, endTime]);

  return (
    <div className="App">
      <div>
        <h1>
          Typing Speed Test
          <button
            className={css === "dark" ? "topButtonDark" : "topButtonLight"}
            onClick={() => {
              darkMode();
              css === "dark" ? setCSS("light") : setCSS("dark");
            }}
          >
            {css === "dark" ? "Dark" : "Light"}
          </button>
        </h1>
      </div>
      <hr />
      <h3>Start typing to take test, and press END to get results</h3>
      <TextDisplay
        value={value}
        setValue={setValue}
        inputParent={inputParent}
        css={css}
      />
      <br />
      <TextInput
        startTime={startTime}
        setStartTime={setStartTime}
        inputParent={inputParent}
        setInputParent={setInputParent}
        css={css}
      />
      <br />
      {/*need to record time when clicked*/}
      <button
        className={css === "dark" ? "button" : "buttonLight"}
        onClick={() => {
          setEndTime(new Date());
        }}
      >
        END
      </button>
      <button
        className={css === "dark" ? "button" : "buttonLight"}
        onClick={() => {
          setInputParent("");
          setEndTime(null);
          setStartTime(null);
          setCount(0);
        }}
      >
        RESET
      </button>
      <br />
      <Stats
        value={value}
        inputParent={inputParent}
        startTime={startTime}
        endTime={endTime}
        count={count}
      />
    </div>
  );
}

function TextDisplay(props) {
  const { value, setValue, inputParent, css } = props;
  //https://www.w3schools.com/js/js_random.asp
  function randNum() {
    let num = Math.floor(Math.random() * 10);
    if (num !== value) {
      return setValue(num);
    } else {
      randNum();
    }
  }
  function getTextCompare(source, compare) {
    const s = source.slice(0, compare.length);
    const formattedSource = [...s].map((letter, index) => (
      <span className="match">
        {letter !== compare[index] ? (
          <span className="matchError">{letter}</span>
        ) : (
          letter
        )}
      </span>
    ));
    return (
      <div>
        {formattedSource}
        {source.slice(compare.length)}
      </div>
    );
  }
  return (
    <div>
      <button
        className={css === "dark" ? "button" : "buttonLight"}
        onClick={() => {
          console.log("change text clicked");
          console.log("text value=", value);
          randNum();
        }}
      >
        Change text
      </button>
      <>{getTextCompare(Text[value], inputParent)}</>
    </div>
  );
}

//displays input text, saves state and time
function TextInput(props) {
  const { inputParent, setInputParent, startTime, setStartTime, css } = props;

  console.log("start time=", startTime);
  // needs to record time when start
  useEffect(() => {
    if (inputParent.length === 1 && startTime === null) {
      setStartTime(new Date());
    }
  }, [inputParent, startTime]);
  return (
    <div>
      <textarea
        className={css === "dark" ? "textAreaDark" : "textAreaLight"}
        placeholder="Start typing to begin"
        onChange={(e) => setInputParent(e.target.value)}
        value={inputParent}
      />
    </div>
  );
}

// recieves text, input and start/end time
//does stat math and displays
function Stats(props) {
  const { value, inputParent, startTime, endTime, count } = props;
  let text = Text[value];
  function countErrors(s, t) {
    // Generate an array from text where new array contains true if
    // matches character in second string, or false if does not match,
    // and count (reduce) the number of array elements with false
    return [...t]
      .map((letter, index) => letter === s[index])
      .reduce((badTotal, val) => (!val ? badTotal + 1 : badTotal), 0);
  }
  function countWordsPerSecond(compare, seconds) {
    if (seconds > 0) {
      const count = compare.split(/\s+/).length;
      return (count / seconds).toFixed(2);
    } else {
      return 0;
    }
  }

  function timeSeconds(b, e) {
    return endTime && startTime != null ? ((e - b) / 1000).toFixed(2) : 0;
  }

  return (
    <div>
      <h3>Results</h3>
      <div>
        Elapsed Time (seconds):{" "}
        {endTime == null ? count : timeSeconds(startTime, endTime)}
      </div>
      <div>
        Mistakes:{" "}
        {/*endTime && startTime != null ? countErrors(text, inputParent) : 0*/}
        {countErrors(text, inputParent)}
      </div>
      <div>
        {/*timeSeconds(startTime, endTime)*/}
        Words Per min:{" "}
        {(countWordsPerSecond(inputParent, count) * 60).toFixed(2)}
      </div>
    </div>
  );
}
