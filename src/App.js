import "./styles.css";
import { Text } from "./text";
import React, { useEffect, useState } from "react";

export default function App() {
  const [inputParent, setInputParent] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [value, setValue] = useState(0);
  console.log("end time=", endTime);
  //needs to record time and pass to stats
  return (
    <div className="App">
      <h1>Typing Speed Test</h1>
      <h3>Start typing to take test, and press END to get results</h3>
      <TextDisplay
        value={value}
        setValue={setValue}
        inputParent={inputParent}
      />
      <br />
      <TextInput
        startTime={startTime}
        setStartTime={setStartTime}
        inputParent={inputParent}
        setInputParent={setInputParent}
      />
      <>{inputParent}</>
      <br />
      {/*need to record time when clicked*/}
      <button
        onClick={() => {
          setEndTime(new Date());
        }}
      >
        END
      </button>
      <button
        onClick={() => {
          setInputParent("");
        }}
      >
        RESET
      </button>
      <br />
      <Stats value={value} inputParent={inputParent} />
    </div>
  );
}

//display test text and hadeles change button
function TextDisplay(props) {
  const { value, setValue, inputParent } = props;
  function randNum() {
    let num = Math.floor(Math.random() * 4);
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
  const { inputParent, setInputParent } = props;
  const { startTime, setStartTime } = props;
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
  const { value, inputParent } = props;
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
      return count / seconds;
    } else {
      return 0;
    }
  }

  return (
    <div>
      <h3>Stats</h3>
      <div>Elapsed Time: </div>
      <div>Mistakes: {countErrors(text, inputParent)}</div>
      <div>Words Per min:</div>
    </div>
  );
}
