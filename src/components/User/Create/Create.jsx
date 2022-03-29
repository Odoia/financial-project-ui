import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UIButton from '../../Button/Button.jsx';
import instance from '../../../shared/services/axios.config.ts';

import './Create.css';

function initialState() {
  return {email: '', password: '', name: '', surname: ''}
}

async function create({email, password, name, surname}) {
  const result = await instance.post('/user',{user:{email, password, name, surname}})
  if (result) {
    return { user: result } 
  }
  return { error: 'Not Found' }

}

const UserCreate = () => {
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState(null);
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

    const { user, error } = await create(values);

    if(user) {
      return history.push('/login');
    }

    setError(error);
    setValues(initialState());
  }

  return (
    <div className="user-create">
      <h1 className="user-create__title">Create</h1>
      <form onSubmit={onSubmit}>
        <div className="user-create__form-control">
          <label htmlFor="email">E-mail</label>
          <input id="email" type="text" name="email" autoComplete="off" onChange={onChange} value={values.email} />
        </div>
        <div className="user-create__form-control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" onChange={onChange} value={values.password} />
        </div>
        <div className="user-create__form-control">
          <label htmlFor="name">Name</label>
          <input id="name" type="text" name="name" onChange={onChange} value={values.name} />
        </div>
        <div className="user-create__form-control">
          <label htmlFor="surname">Surname</label>
          <input id="surname" type="text" name="surname" onChange={onChange} value={values.surname} />
        </div>
        <UIButton
          type="submit"
          theme="contained-green"
          className="user-create__submit-button"
          rounded
        >
          Entrar
        </UIButton>
      </form>
    </div>
  );
};

export default UserCreate;
