import React, { Component } from 'react';
import { decode } from 'jsonwebtoken';

import Navbar from './components/Navbar';
import Home from './components/Home';
import UserContext from './utils/user-context';

class App extends Component {
  state = {
    user: null,
  };

  /* eslint-disable no-console, react/destructuring-assignment */
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!this.state.user && token) {
      this.loginUsingJWT(token);
    }
  }

  loginUsingJWT = (token) => {
    const decoded = decode(token);
    const tokenIsValid = decoded !== null;
    if (tokenIsValid) {
      const expired = decoded.iat < new Date().getTime();
      if (expired) {
        console.log('token expired');
        this.removeTokenFromLocalStorage();
      }
      this.login({ id: decoded.id, username: decoded.username });
    } else {
      this.removeTokenFromLocalStorage();
    }
  };

  removeTokenFromLocalStorage = () => {
    localStorage.removeItem('token');
  };

  logout() {
    this.removeTokenFromLocalStorage();
    this.setState({
      user: null,
    });
  }

  login(user) {
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const login = this.login.bind(this);
    const logout = this.logout.bind(this);

    return (
      <UserContext.Provider value={{ user, login, logout }}>
        <Navbar />
        <Home />
      </UserContext.Provider>
    );
  }
}

export default App;
