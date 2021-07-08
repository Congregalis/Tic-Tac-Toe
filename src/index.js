import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function allFilled(squares) {
  for (let i = 0; i < squares.length; i++) {
    const square = squares[i];
    if (square == null) {
      return false;
    }
  }
  return true;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i]
      }      
    }
  }
  return null;
}

class Board extends React.Component {
  
  renderSquare(i) {
    const line = this.props.winnerLines;
    const [a, b, c] = line;
    let className =  (i === a || i === b || i === c) ? 'squareWinner' : 'square';

    return (
      <Square
        key={i}
        className={className}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {

    let row = [0, 1, 2];
    let cell = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ];
    let checkerboard = row.map((item, index) => (
      <div className="board-row" key={index}>
        {
          cell.map((item1, index1) => 
            index === index1 ? 
              item1.map((item2, index2) => (
                this.renderSquare(item2)
              )) :
              ""
          )
        }
      </div>
    ));

    return (
      checkerboard
      // <div>
      //   <div className="board-row">
      //     {this.renderSquare(0)}
      //     {this.renderSquare(1)}
      //     {this.renderSquare(2)}
      //   </div>
      //   <div className="board-row">
      //     {this.renderSquare(3)}
      //     {this.renderSquare(4)}
      //     {this.renderSquare(5)}
      //   </div>
      //   <div className="board-row">
      //     {this.renderSquare(6)}
      //     {this.renderSquare(7)}
      //     {this.renderSquare(8)}
      //   </div>
      // </div>
    );
  }
}

class Game extends React.Component {
  
  constructor(props) {
    super(props);
    this.state =  {
      history: [{
        squares: Array(9).fill(null),
        currStep: '',
      }],
      stepNumber: 0,
      xIsNext: true,
      isAscendingOrder: true,
      winnerLines: [], // 存储胜利时需要高亮的三连棋
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    // const currStep = '(' + (i/3+1) ', ' + (i%3+1) '' + ')';
    const currStep = '(' + Math.floor(i/3+1) + ', ' + (i%3+1) + ')';
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    // 如果出现了胜利者，更新三连棋使其高亮
    if (calculateWinner(squares)) {
      this.setState({
        winnerLines: calculateWinner(squares).line
      })
    }
    this.setState({
      history: history.concat([{
        squares: squares,
        currStep: currStep,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  
  jumpTo(step) {
    const history = this.state.history;
    const current = history[step];
    const squares = current.squares.slice();
    let line = calculateWinner(squares) ? calculateWinner(squares).line : [];

    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      winnerLines: line
    });
  }

  reverseHistory = () => {
    const isAscendingOrder = this.state.isAscendingOrder;
    this.setState({
      isAscendingOrder: !isAscendingOrder
    })
  }
  
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares) ? calculateWinner(current.squares).winner : null;
    const moves = history.map((step, move) => {
      const desc = move ?
            'Go to step #' + move :
            'Go to game start';
      
      return (
        <li 
          key={move} 
          style={{fontWeight: (move === this.state.stepNumber) ? "bold" : ""}}
          >
          <button className='button' onClick={() => this.jumpTo(move)}>{desc}</button>
          &nbsp;&nbsp;
          <span>{step['currStep'] ? 'coordinate: ' + step['currStep'] : '' }</span>
        </li>
      );
    })
    if (!this.state.isAscendingOrder) {
      moves.reverse()
    }
    
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = allFilled(current.squares) ?
        'Draw ' : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }
    
    return (
      <div>
        <h1> Tic-Tac-Toe </h1>
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
              winnerLines={this.state.winnerLines}
            />
          </div>
          <div className="game-info">
            <div className="info-top">
              <div className='status'>{status}</div>
              <button
                className='reverse-button'
                onClick={() => this.reverseHistory()}
              >
                {this.state.isAscendingOrder ? 'Descend' : 'Ascend'}
              </button>
            </div>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
