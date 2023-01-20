import './App.css';
import { Chessboard } from "react-chessboard";
import { useState } from "react";
import { Chess} from 'chess.js';
import ClickMove from './mycode';


const chess = new Chess();

function App() {
  return (
    <div className="App">
      {<ClickMove/>}
      {/*<ClickToMove/>*/}
    </div>
  );
}

export default App;
