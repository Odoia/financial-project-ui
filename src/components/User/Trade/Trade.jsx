import React, { Component } from 'react';
import instance from '../../../shared/services/axios.config.ts';

import './Home.css';

async function onClick(event) {
// http://localhost:3000/api/v1/bank_account/7/trades
 const result =  await instance.get('bank_account/7/trades')
  console.log('------');
  console.log(event.id);
  console.log(result.data.data);
}


class Trades extends Component{
  state = {
    banks: [],
  }
  async componentDidMount() {
    const result = await instance.get('/bank_account')
    if(result) {
      this.setState({ banks: result.data.data });
    }

    return { error: 'Unauthorized' }
  }

  render() {

    const { banks } = this.state;
    return(
      <div>
        <ul>
          <h1> list of bank </h1>
          <ul>
            {banks.map(bank => (
              <li key={ bank.id }>
                bank id: {bank.id + ' '}
                amount: {bank.amount + ' '}

                <button type="button" onClick={onClick}>
                  See trades
                </button>
              </li> 
            ))}
          </ul>
        </ul>
      </div>
    )
  }

}

export default Trades;
