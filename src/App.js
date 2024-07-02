import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function NumDisplay({num}) {
  return (
    <div>
      {num}
    </div>
  );
}


function NumPadButton({bigNum, setBigNum, num}) {
  function handleClick() {
    console.log('clicked');
    if (num == bigNum) {
      console.log('clicked bignum');
      setBigNum(generateBigNum);
    }
  }
  return (
    <button onClick={handleClick}>{num}</button>
  );
}

function NumPad(props) {
  function handleKeyEvent (event) {
    if (event.key == props.bigNum) {
      props.setBigNum(generateBigNum);
    }
  }

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

function generateBigNum() {
  return Math.floor(Math.random() * 10);
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
