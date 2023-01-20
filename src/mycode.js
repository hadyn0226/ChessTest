import { useRef, useState } from 'react';
import {Chess}  from 'chess.js';
import { Chessboard } from 'react-chessboard';
//const chess = new Chess();
export default function ClickMove({boardWidth}){
    const chessboardRef = useRef();

    const [chess, setChess] = useState(new Chess());

    const [optionSquares, setOptionSquares] = useState({});
    const [moveSquares, setMoveSquares] = useState({});
    const [rightClickedSquares, setRightClickedSquares] = useState({});

    const [moveFrom, setMoveFrom] = useState('');
    
    function onSquareClick(square){
        moveMain(square);
    }
    function onSquareRightClick(square){
        
    }

    function displayMoves(square){
        const umoves = chess.moves({
            square,
            verbose: true
        });
        if(umoves.length === 0){
            return;
        }

        const newSquares = {};
        umoves.map((umove) => {
            newSquares[umove.to] = {
                background:
                    chess.get(umove.to) && chess.get(umove.to).color !== chess.get(square).color
                     ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
                     : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
                    borderRadius: '50%'
            }
            return umove;
        });
        newSquares[square] = {
            background: 'rgba(255, 255, 0, 0.4)'
        };
        setOptionSquares(newSquares);
    }

    function moveMain(square){
        let peiceName = "";
        setRightClickedSquares({});
        function beforeMove(square){
            if(chess.turn() === chess.get(square).color)
            {
                setMoveFrom(square);
                displayMoves(square);
            }
        }
        console.log("out beforeMove moveFrom = " + moveFrom);
        if(!moveFrom){
            beforeMove(square);
            console.log("from = " + square);
            return;
        }

        function sanTranslat(square, moveFrom, game){
            let san = "";
            let peiceName = game.get(moveFrom).type;
            let moveFromFile = String(moveFrom).substring(0, 1);
        if(peiceName !== 'p'){
            if(!game.get(square)){
                san = String(peiceName).toUpperCase() + String(square);
            }else if(game.get(moveFrom).color !== game.get(square).color)
            {
                san = String(peiceName).toUpperCase() + 'x' + String(square);
            }
            /*if(game.get(moveFrom).color != (game.get(square).color))
            {
                san = String(peiceName).toUpperCase() + 'x' + String(square);
            }
            else{
                san = String(peiceName).toUpperCase() + String(square);
            }*/
        }
        else{
            if(!game.get(square)){
                san = String(square);
            }else if(game.get(moveFrom).color !== game.get(square).color){
                san = moveFromFile + 'x' + String(square); 
            }
            /*if(game.get(moveFrom).color != (game.get(square).color))
            {
                san = moveFromFile + 'x' + String(square); 
                
            }
            else{
                san = String(square);
            }*/
        }
        return san;
        }
        const game = chess;
        console.log(sanTranslat(square, moveFrom, game));
        console.log(sanTranslat(square, moveFrom, game));
        game.move(sanTranslat(square, moveFrom, game));
        setChess(game);

        if (game.move === null) {
            beforeMove(square);
            return;
          }

        setMoveFrom('');
        setOptionSquares({});
    }

    
    return(
        <div>
            <Chessboard
                id="ClickToMove"
                animationDuration={200}
                arePiecesDraggable={false}
                boardWidth={boardWidth}
                position={chess.fen()}
                onSquareClick={onSquareClick}
                onSquareRightClick={onSquareRightClick}
                customBoardStyle={{
                  borderRadius: '4px',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
                }}
                customSquareStyles={{
                    ...moveSquares,
                    ...optionSquares,
                    ...rightClickedSquares
                  }}
                ref={chessboardRef}
            />
        </div>
    );
}