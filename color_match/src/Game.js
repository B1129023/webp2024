import React, { Component } from 'react';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      targetColor: '',
      gameOver: false,
      score: 0,
      timeLeft: 5 // 5秒倒數
    };
  }


  tick = () => {
    const { gameStarted, timeLeft } = this.state;
    if (gameStarted && timeLeft > 0) {
      this.setState(prevState => ({ timeLeft: prevState.timeLeft - 1 }));
    } else if (gameStarted && timeLeft === 0) {
      this.endGame();
    }
  }

  startGame = () => {
    this.timerID = setInterval(this.tick, 1000); // 每秒更新一次時間
    const targetColor = this.getRandomColor();
    this.setState({
      gameStarted: true,
      targetColor: targetColor,
      gameOver: false,
      score: 0,
      targetColorName: targetColor,
      timeLeft: 5 // 重新設置倒數時間
    });
  }

  handleBlockClick = (clickedColor) => {
    const { targetColor } = this.state;
    if (clickedColor === targetColor) {
      this.setState(prevState => ({
        targetColor: this.getRandomColor(),
        score: prevState.score + 1,
        timeLeft: 5 // 重新設置倒數時間
      }));
    } else {
      this.setState({ gameOver: true });
    }
  }

  endGame = () => {
    clearInterval(this.timerID);
    this.setState({ gameOver: true });
  }

  getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  }

  getRandomPosition = () => {
    const top = Math.floor(Math.random() * 40) + 30; // Random top position between 30% and 70%
    const left = Math.floor(Math.random() * 40) + 30; // Random left position between 30% and 70%
    return {
      position: 'absolute',
      top: `${top}%`,
      left: `${left}%`,
      width: '100px',
      height: '100px'
    };
  }

  restartGame = () => {
    clearInterval(this.timerID);
    this.setState({
      gameStarted: false,
      gameOver: false,
      score: 0
    });
  }

  render() {
    const { gameStarted, targetColor, gameOver, score, timeLeft } = this.state;
    return (
      <div>
        {gameStarted === false && (
          <button onClick={this.startGame}>Start Game</button>
        )}
        {gameStarted && gameOver === false && (
          <div>
            <h2>Time Left: {timeLeft}</h2>
            <h2>targetColor : </h2>
            <div style={{ backgroundColor: targetColor, width: '100px', height: '100px'}}></div>
            <div style={{ backgroundColor: targetColor, ...this.getRandomPosition() }} onClick={() => this.handleBlockClick(targetColor)}></div>
            <div style={{ backgroundColor: this.getRandomColor(), ...this.getRandomPosition() }} onClick={() => this.handleBlockClick()}></div>
            <div style={{ backgroundColor: this.getRandomColor(), ...this.getRandomPosition() }} onClick={() => this.handleBlockClick()}></div>
            <div>Score: {score}</div>
          </div>
        )}
        {gameOver && (
          <div>
            <div>Game Over!</div>
            <div>Final Score: {score}</div>
            <button onClick={this.restartGame}>Restart Game</button>
          </div>
        )}
      </div>
    );
  }
}

export default Game;

