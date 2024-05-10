import './App.css';

import { Routes, Route, BrowserRouter} from 'react-router-dom'

import Registration from './components/Registration';
import Login from './components/Login';
import Home from './components/Home';
import { Component } from 'react';
import GamingContext from './context/gamingContext';
import RegistrationSuccess from './components/RegistrationSuccess';
import LoginSuccess from './components/LoginSuccess';
import ProfileDetails from './components/ProfileDetails';
import TextSelector from './components/TextData';
import LaughGame from './components/LaughGame';
// import TextSelector from './components/TextData/RandomTextGenerator';

class App extends Component{
  state = {gameId: undefined, token: undefined}

  getGameId = gameId => {
    this.setState({gameId})
  }

  getToken = token => {
    this.setState({token})
  }

  render(){
    const {gameId, token} = this.state

    return (
      <GamingContext.Provider value={{gameId, getGameId: this.getGameId, token, getToken: this.getToken}} >
        <BrowserRouter>
          <Routes>
            <Route exact path='/' Component={Home} />
            <Route exact path='/userdetails' Component={ProfileDetails} />
            <Route exact path='/register' Component={Registration} />
            <Route exact path='/login' Component={Login} />
            <Route exact path='/regSuccess' Component={RegistrationSuccess} />
            <Route exact path='/loginSucces' Component={LoginSuccess} />
            <Route exact path='/typogame' Component={TextSelector} />
            <Route exact path='/laughgame' Component={LaughGame} />
          </Routes>
        </BrowserRouter>
      </GamingContext.Provider>
    )
  }
}
export default App;
