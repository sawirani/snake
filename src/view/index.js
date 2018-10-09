import React,{Component} from 'react';
import './view.css'

class GameView extends Component {

  isApple(i,j){
    return this.props.data.apple.some(item => {
      if ((item[0]===i)&&(item[1]===j)){
        return true;
      } else {
        return false;
      }
    })
  }

  isSnake(i,j){
    return this.props.data.snake.some( item => {
      if ((item[0] === i) && (item[1] === j)) {
        return true;
      } else {
        return false;
      }
    })
  }

  renderCell(i){
    let ret = [];
  for (let j=0;j<this.props.data.width;j++){
    if (this.isApple(i,j)){
      ret.push(<div className='apple'/>);
    }else if (this.isSnake(i,j)){
      ret.push(<div className='snake'/>);
    } else {
      ret.push(<div className='square'/>);
    }
  }
    return <div className='field2'>{ret}</div>;
  }

  renderField(){
   const ret = [];
   for(let i=0;i<this.props.data.height;i++){
       ret.push(this.renderCell(i));
   }
   return ret;
  }

  render() {

    return (
      <div>
        { this.renderField()}
      </div>
    )

  }
}

export default GameView