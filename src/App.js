import React, { Component } from 'react';
import './App.css';
import GameView from "./view";

class App extends Component {

  constructor() {
    super();

    this.state={
      width:12,
      height:12,
      snake:[[1,2]],
      direction:1,
      apple:[
        [1,5]
      ]
    }
  }

  getNewApple(snake,apple){
      apple = [];
      let el = [];
      let count = 0;

      do {
        el[0] = Math.round(Math.random() * (this.state.height - 1));
        el[1] = Math.round(Math.random() * (this.state.width - 1));

        for(let i=0;i<snake.length;i++){
          if ((snake[i][0] === el[0]) && (snake[i][1] === el[1])) {
            count = 1;
            break;
          } else {
            count=0;
          }
        }

      } while (count===1);

    apple.unshift(el);

    return apple;
  };

  checkapple(apple, snake){
    return ((snake[0][0]===apple[0][0])&&(snake[0][1]===apple[0][1]));
  }

  checkloss(snake){
    for (let i=1;i<snake.length;i++){
      if ((snake[0][0]===snake[i][0])&&(snake[0][1]===snake[i][1])){
        alert('Вы проиграли. Нажмите ok чтобы начать сначала');
        return true;
      }
    }
    return false;
  }

  moveUp(snake){
    snake.unshift([snake[0][0],snake[0][1]]);
    snake[0][0]--;
    return snake
  };

  moveDown(snake){
    snake.unshift([ snake[0][0],snake[0][1]]);
    snake[0][0]++;
    return snake;
  };

  moveRight(snake){
    snake.unshift([snake[0][0],snake[0][1]]);
    snake[0][1]++;
    return snake;
  };

  moveLeft(snake){
    snake.unshift([snake[0][0],snake[0][1]]);
    snake[0][1]--;
    return snake;
  };

  checkwin(snake) {
    return snake.length === (this.state.width * this.state.height)
  }

  move(){
    setInterval(function () {
      let snake = [...this.state.snake];
      let direction = this.state.direction;
      let apple = this.state.apple;

      switch (direction){
        // вправо
        case 1:{
          if(snake[0][1]===(this.state.width-1)){
            alert('Вы проиграли. Нажмите ok чтобы начать сначала');
            snake = [[1,2]];
            direction = 1;
          } else {
            if (snake.length === 1) {
              snake[0][1]++;

              if(this.checkapple(apple,snake)){
                apple = this.getNewApple(snake,apple);
                snake = this.moveRight(snake);
              }

            } else if (snake[0][1] >= snake[1][1]) {

              snake = this.moveRight(snake);

              if(this.checkapple(apple,snake)){
                apple = this.getNewApple(snake,apple);
              }else{
                snake.pop();
              }

              } else {
              direction = 2;
            }
          }
          break;
        }
        // влево
        case 2:{
          if(snake[0][1]===0){
            alert('Вы проиграли. Нажмите ok чтобы начать сначала');
            snake = [[1,2]];
            direction = 1;
          }else {
            if (snake.length === 1) {
              snake[0][1]--;

              if(this.checkapple(apple,snake)){
                apple = this.getNewApple(snake,apple);
                snake = this.moveLeft(snake);
              }

            } else if (snake[0][1] <= snake[1][1]){

              this.moveLeft(snake);

              if(this.checkapple(apple,snake)){
                apple = this.getNewApple(snake,apple);
              }else{
                snake.pop();
              }

            } else {
              direction = 1;
            }
          }
          break;
        }
        // верх
        case 3:{
          if(snake[0][0]===0){
            alert('Вы проиграли. Нажмите ok чтобы начать сначала');
            snake = [[1,2]];
            direction = 1;
          } else {
            if (snake.length === 1) {
              snake[0][0]--;

              if(this.checkapple(apple,snake)){
                apple = this.getNewApple(snake,apple);
                snake = this.moveUp(snake);
              }

            } else if (snake[0][0]<=snake[1][0]){

              this.moveUp(snake);

              if(this.checkapple(apple,snake)){
                apple = this.getNewApple(snake,apple);
              }else{
                snake.pop();
              }

            } else {
              direction = 4;
            }
          }
          break;
        }
        // низ
        case 4: {
          if (snake[0][0] === (this.state.height-1)) {
            alert('Вы проиграли. Нажмите ok чтобы начать сначала');
            snake = [[1, 2]];
            direction = 1;
          } else {
            if (snake.length === 1) {
            snake[0][0]++;

            if(this.checkapple(apple,snake)){
              apple = this.getNewApple(snake,apple);
              snake = this.moveDown(snake);
            }

          } else if (snake[0][0]>=snake[1][0]) {

              this.moveDown(snake);

              if(this.checkapple(apple,snake)){
                apple = this.getNewApple(snake,apple);
              }else{
                snake.pop();
              }

          } else {
              direction = 3;
            }
        }
          break;
        }

        default : break;
      }

      if (this.checkloss(snake)){
        snake = [[1,2]];
        direction = 1;
      }

      if(this.checkwin(snake)){
        alert('Поздравляем вы выграли!. Нажмите ok чтобы начать сначала');
        snake = [[1,2]];
        direction = 1;
      }

      this.setState({
        snake,direction,apple
      });
    }.bind(this),90);
  };

  componentDidMount(){
    this.move();
    document.addEventListener("keydown", this.action, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.action, false);
  }

  action = (e) => {

    switch (e.keyCode) {
      case 38: {
        let direction = 3;
        this.setState({
          direction
        });
        break;
      }
      case 39: {
        let direction = 1;
        this.setState({
          direction
        });
        break;
      }
      case 40: {
        let direction = 4;
        this.setState({
          direction
        });
        break;
      }
      case 37:{
        let direction = 2;
        this.setState({
          direction
        });
        break;
      }
      default:{
        break;
      }
    }
  };


  render() {
    return (
      <div className='field'>
        <GameView data={this.state} />
      </div>
    );
  }
}

export default App;
