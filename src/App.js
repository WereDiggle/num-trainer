import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';

function NumDisplay({num}) {
  return (
    <div>
      <div>
        {num}
      </div>
      <InputGhost num={num}/>
    </div>
  );
}

// 👻
function InputGhost({num}) {
  let ghostCells = Array.from(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, null],
    (n, _) => {
      if (n === null) {
        return (<div className='ghost-cell black'></div>);
      } else if (num == n) {
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


function NumPadButton({bigNum, setBigNum, num}) {
  function handleClick() {
    if (num == bigNum) {
      setBigNum(generateBigNum(bigNum));
    }
  }
  return (
    <button className='dark-bg' onClick={handleClick}>{num}</button>
  );
}

/* 

{
  targetValue: what you're trying to input
}

*/

// 🔢
function NumPad(props) {
  
  useEffect(() => {
    const handleKeyPress = (event) => {
      console.log('key pressed ' + event.key);
      if (event.key == props.bigNum) { // props is only captured once
        props.setBigNum(generateBigNum(props.bigNum));
      }
    }
    console.log('use effect');
    console.log(window);
    window.addEventListener("keydown", handleKeyPress);
    
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [props.bigNum]);

  return (
    <div className='num-pad'>
      <NumPadButton {...props} num='1'/>
      <NumPadButton {...props} num='2'/>
      <NumPadButton {...props} num='3'/>
      <NumPadButton {...props} num='4'/>
      <NumPadButton {...props} num='5'/>
      <NumPadButton {...props} num='6'/>
      <NumPadButton {...props} num='7'/>
      <NumPadButton {...props} num='8'/>
      <NumPadButton {...props} num='9'/>
      <div></div>
      <NumPadButton {...props} num='0'/>
      <div></div>
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

function App() {
  const [bigNum, setBigNum] = useState(generateBigNum());

  return (
    <div className="App">
      <header className="App-header">
        <NumDisplay num={bigNum}/>
      </header>
      <NumPad setBigNum={setBigNum} bigNum={bigNum}/>
    </div>
  );
}

export default App;
