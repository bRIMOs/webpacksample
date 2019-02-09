import React, { Component } from 'react';
//import logo from './logo.svg';
import './main.scss';
import Notification from './component/Notificiation'
import pic from '../public/images/dev.png'

class App extends Component {
  handleCLick  =  (e) => {
    Notification.log(e);
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <img src={pic} />
            Hello moto ! allah yer7am ...!ssssssss
            <br />test
        </header>
        <button onClick={(e) => this.handleCLick(e)}>Click</button>
      </div>
    );
  }
}

export default App;