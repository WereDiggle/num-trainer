import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';

function NumDisplay({num, lastInput}) {
  return (
    <div className="display-container">
      <div>
        {num}
      </div>
      <InputGhost lastInput={lastInput}/>
    </div>
  );
}

// 👻
function InputGhost({lastInput}) {
  let ghostCells = Array.from(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, null],
    (n, _) => {
      if (n === null) {
        return (<div className='ghost-cell black'></div>);
      } else if (lastInput == n) {
        return (<div className='ghost-cell active'></div>);
      } else {
        return (<div className='ghost-cell'></div>);
      }
    }
  );
  return (
    <div className='overlay'>
      {ghostCells}
    </div>
  );
}

// We don't have to pass all this stuff into the numpad button.
// Just the value, and handleClick function
function NumPadButton({value, handleClick}) {
  return (
    <button className='dark-bg' onClick={handleClick}>{value}</button>
  );
}

/* 

{
  targetValue: what you're trying to input
}

*/

// 🔢
function NumPad({handleClick}) {
  
  useEffect(() => {
    const handleKeyPress = (event) => {
      console.log('key pressed ' + event.key);
      handleClick(event.key);
    }
    window.addEventListener("keydown", handleKeyPress);
    
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleClick]);

  let numPadButtons = Array.from(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, null],
    (n, _) => {
      if (n === null) {
        return (<div></div>);
      } else {
        return (<NumPadButton handleClick={() => handleClick(n)} value={n}/>);
      }
    }
  );

  return (
    <div className='num-pad'>
      {numPadButtons}
    </div>
  );
}

function App() {
  const [bigNum, setBigNum] = useState(generateBigNum());
  const [lastInput, setLastInput] = useState(null);

  function handleClick(value) {
    if (value == bigNum) {
      setBigNum(generateBigNum(bigNum));
    }
    setLastInput(value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <NumDisplay num={bigNum} lastInput={lastInput}/>
      </header>
      <NumPad handleClick={handleClick}/>
    </div>
  );
}

function generateBigNum(curNum) {
  let randNum;
  do {
    randNum = Math.floor(Math.random() * 10);
  } while (curNum == randNum);

  return randNum;
}


export default App;
