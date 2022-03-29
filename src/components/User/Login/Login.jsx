import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import StoreContext from '../../../Store/Context.js';
import UIButton from '../../Button/Button.jsx';
import instance from '../../../shared/services/axios.config.ts';

import './Login.css';

function initialState() {
  return {email: 'example123@mail.com', password: 'A1sdert@'}
}

async function login({email, password}) {
  const result = await instance.post('/authenticate',{email, password})
  if (result.data.auth_token) {
    console.log('gg');
    return { authToken: result.data.auth_token } 
  }
  return { error: 'Unauthorized' }

}

const UserLogin = () => {
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState(null);
  const { setToken } = useContext(StoreContext);
  const history = useHistory();

  function onChange(event) {
    const { value, name } = event.target;

    setValues({
      ...values,
      [name]: value
    });
  }

 async function onSubmit(event) {
    event.preventDefault();

    const { authToken, error } = await login(values);

  console.log('----');
  console.log(authToken);
  console.log(error);
    if(authToken) {
      setToken(authToken);
      return history.push('/');
    }

    setError(error);
    setValues(initialState());
  }

  return (
    <div className="user-login">
      <h1 className="user-login__title">Login</h1>
      <form onSubmit={onSubmit}>
        <div className="user-login__form-control">
          <label htmlFor="email">E-mail</label>
          <input id="email" type="text" name="email" autoComplete="off" onChange={onChange} value={values.email} />
        </div>
        <div className="user-login__form-control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" onChange={onChange} value={values.password} />
        </div>
        <UIButton
          type="submit"
          theme="contained-green"
          className="user-login__submit-button"
          rounded
        >
          Entrar
        </UIButton>
      </form>
    </div>
  );
};

export default UserLogin;
