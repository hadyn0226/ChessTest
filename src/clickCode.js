import { useRef, useState } from 'react';
import {Chess}  from 'chess.js';
import { Chessboard } from 'react-chessboard';

export default function onClickToMove({boardWidth}){
    const chessboard = useRef();

    const chessboardRef = useRef();

    const [chess, setChess] = useState(new Chess());

    const [optionSquares, setOptionSquares] = useState({});
    const [moveSquares, setMoveSquares] = useState({});
    const [rightClickedSquares, setRightClickedSquares] = useState({});

    const [moveFrom, setMoveFrom] = useState('');
    
    function onSquareClick(square){
        console.log(square);
        moveMain(square);
    }
    function onSquareRightClick(square){
        console.log("Right Click" + square);
        
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
            //console.log("umove.to = " + chess.get(umove.to));
            //console.log("(umove.to).color = " + chess.get(umove.to).color);
            //console.log("(square).color = " + chess.get(square).color);
            // game.get(move.to) && game.get(move.to).color !== game.get(square).color
            return umove;
        });
        newSquares[square] = {
            background: 'rgba(255, 255, 0, 0.4)'
        };
        setOptionSquares(newSquares);
    }

    function moveMain(square){
        setRightClickedSquares({});
        function beforeMove(square){
            setMoveFrom(square);
            //console.log("in beforeMove moveFrom = " + moveFrom);
            displayMoves(square);
        }

        if(!moveFrom){
            beforeMove(square);
            //console.log("from = " + square);
            return;
        }

        //console.log("to = " + square);


        const game = chess;

        console.log(chess.moves(moveFrom));

        game.move(square);
        //console.log("game.to = " + game.move.to);
        //console.log("gmae.from = " + game.move.from);
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