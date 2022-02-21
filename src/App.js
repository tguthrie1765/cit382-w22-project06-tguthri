import "./styles.css";
import { Text } from "./text";
import React, { useState } from "react";

export default function App() {
  const [inputParent, setInputParent] = useState("");
  return (
    <div className="App">
      <h1>Typing Speed Test</h1>
      <h3>Start typing to take test, and press END to get results</h3>
      <TextDisplay />
      <br />
      <TextInput inputParent={inputParent} setInputParent={setInputParent} />
      <>{inputParent}</>
      <br />
      <button>END</button>
      <br />
      <Stats />
    </div>
  );
}

function TextDisplay() {
  const [value, setValue] = useState(0);
  //TODO call randNum when button clicked
  // and display a diffent text value

  return (
    <div>
      <button>Change text</button>
      <p>{Text[value]}</p>
    </div>
  );
}

function randNum() {
  let num = Math.floor(Math.random() * 4);
  return num;
}

function TextInput(props) {
  const { inputParent, setInputParent } = props;

  return (
    <div>
      <input
        type="text"
        placeholder="Start typing to begin"
        onChange={(e) => setInputParent(e.target.value)}
        value={inputParent}
      />
    </div>
  );
}

function Stats() {
  return (
    <div>
      <h3>Stats</h3>
      <div>Elapsed Time: </div>
      <div>Mistakes: </div>
    </div>
  );
}
