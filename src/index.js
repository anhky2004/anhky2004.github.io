import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


//khoanh các ô khi thắng
function Square(props) {
    let style = {
      backgroundColor: 'green'
    };
    if (props.winner) {
      return (
        <button className="square" style={style} onClick={() => props.onClick()}>
          {props.value}
        </button>
      );        
    } else {
      return (
        <button className="square" onClick={() => props.onClick()}>
          {props.value}
        </button>
      );        
    }
  }



class Board extends React.Component {
  renderSquare(i, col, row, win) {
    return <Square key={i} winner={win} value={this.props.value[i]} onClick={() => this.props.onClick(i, col, row)}/>;
  }


  render() {
    let squares = [];
    let num = 0;
    let col = [];
    let win = false;
   //lồng 2 vòng loop
    for(let i = 1; i <= 8; i++) {
      col = [];
      for(let j = 1; j <= 8; j++) {

        if (this.props.value.winSquares) {
          win = this.props.value.winSquares.indexOf(num) != -1 ? true : false;  
        }
        
        col.push(this.renderSquare(num, i, j, win));
        num++;
      }
      squares.push(<div key={num} className="board-row">{col}</div>);
    }

    return (
      <div>
        {squares}
      </div>
    );
  }
}

class Game extends React.Component {

  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(64).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0,
      clicked: null,
      ascendingOrder: true
    };
  } 

  handleClick(i, col, row) {
    let history = this.state.history.slice(0, this.state.stepNumber + 1);
    let current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
        clicked: [row, col]
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  }

  jumpTo(i) {
    this.setState({
      stepNumber: i,
      xIsNext: (i % 2) === 0
    });
  }

  toggleOrder() {
    this.setState({
      ascendingOrder: !this.state.ascendingOrder
    });
  }

  render() {
    
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      current.squares.winSquares = winner[5];
      status = 'Winner: ' + winner[0];
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    const moves = history.map((step, move) => {
      
    let desc = 'Go to game start';
    let col = null;
    let row = null;
    let fulldesc= desc;

      if (move) {
        desc = 'Go to move: #'+move;
        col = '('+this.state.history[move].clicked[0]+', ';
        row = this.state.history[move].clicked[1]+')';

        fulldesc = desc+col+row;
      }
        
        //bôi đen move list của địa điểm được cilck
  		return (
  			<li key={move}>
  				<a href="#" onClick={() => this.jumpTo(move)}>
  					{move === this.state.stepNumber ? <b>{fulldesc}</b> :fulldesc}
  					
  				</a>
  			</li>
  		);
    })

 
  if (!this.state.ascendingOrder) {
    moves.sort(function(a,b) {
        return b.key - a.key;
      });
  } 

    return (
      <div className="game">
        <div className="game-board">
          <Board value={current.squares} onClick={(i, col, row) => this.handleClick(i, col, row)}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
          <button onClick={() => this.toggleOrder()}>Toggle Button</button>
        </div>
      </div>
    );
  }
}



ReactDOM.render(
  <Game />,
  document.getElementById('root'));

function calculateWinner(squares) {
  const lines = [
    [0,1,2,3,4],
    [1,2,3,4,5],
    [2,3,4,5,6],
    [3,4,5,6,7],
    [8,9,10,11,12],
    [9,10,11,12,13],
    [10,11,12,13,14],
    [11,12,13,14,15],
    [16,17,18,19,20],
    [17,18,19,20,21],
    [18,19,20,21,22],
    [19,20,21,22,23],
    [24,25,26,27,28],
    [25,26,27,28,29],
    [26,27,28,29,30],
    [27,28,29,30,31],
    [32,33,34,35,36],
    [33,34,35,36,37],
    [34,35,36,37,38],
    [35,36,37,38,39],
    [40,41,42,43,44],
    [41,42,43,44,45],
    [42,43,44,45,46],
    [43,44,45,46,47],
    [48,49,50,51,52],
    [49,50,51,52,53],
    [50,51,52,53,54],
    [51,52,53,54,55],
    [56,57,58,59,60],
    [57,58,59,60,61],
    [58,59,60,61,62],
    [59,60,61,62,63],
    [0,8,16,24,32],
    [8,16,24,32,40],
    [16,24,32,40,48],
    [24,32,40,48,56],
    [1,9,17,25,33],
    [9,17,25,33,41],
    [17,25,33,41,49],
    [25,33,41,49,57],
    [2,10,18,26,34],
    [10,18,26,34,42],
    [18,26,34,42,50],
    [26,34,42,50,58],
    [3,11,19,27,35],
    [11,19,27,35,43],
    [19,27,35,43,51],
    [27,35,43,51,59],
    [4,12,20,28,36],
    [12,20,28,36,44],
    [20,28,36,44,52],
    [28,36,44,52,60],
    [5,13,21,29,37],
    [13,21,29,37,45],
    [21,29,37,45,53],
    [29,37,45,53,61],
    [6,14,22,30,38],
    [14,22,30,38,46],
    [22,30,38,46,54],
    [30,38,46,54,62],
    [7,15,23,31,39],
    [15,23,31,39,47],
    [23,31,39,47,55],
    [31,39,47,55,63],
    [4,11,18,25,32],
    [5,12,19,26,33],
    [12,19,26,33,40],
    [6,13,20,27,34],
    [13,20,27,34,41],
    [20,27,34,41,48],
    [7,14,21,28,35],
    [14,21,28,35,42],
    [21,28,35,42,49],
    [28,35,42,49,56],
    [15,22,29,36,43],
    [22,29,36,43,50],
    [29,36,43,50,57],
    [23,30,37,44,51],
    [30,37,44,51,58],
    [31,38,45,53,60],
    [3,12,21,30,39],
    [2,11,20,29,38],
    [11,20,29,38,47],
    [1,10,19,28,37],
    [10,19,28,37,46],
    [19,28,37,46,55],
    [0,9,18,27,36],
    [9,18,27,36,45],
    [18,27,36,45,54],
    [27,36,45,54,63],
    [8,17,26,35,44],
    [17,26,35,44,53],
    [26,35,44,53,62],
    [16,25,34,43,52],
    [25,34,43,52,61],
    [24,33,42,51,60],
      
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c, d, e] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {
      return [squares[a],squares[b],squares[c],squares[d],squares[e],lines[i]];
    }
  }
  return null;
}