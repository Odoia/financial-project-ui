import React, { Component, useState } from 'react';
import instance from '../../../shared/services/axios.config.ts';
import Modal from '../../Modal/Modal.jsx';

import './Home.css';

class PageHome extends Component{

  state = {
    banks: [],
    trades: [],
    show: false,
  }

  async tradeByBank(bankId) {
    const result =  await instance.get(`bank_account/${bankId}/trades`)
    if(result.data.data[0] != null) {
      this.setState({trades: result.data.data});
      this.setState({show: true});
    } else {
      this.setState({show: false});
    }
  }

  async componentDidMount() {
    const result = await instance.get('/bank_account')
    if(result) {
      this.setState({ banks: result.data.data });
    }

    return { error: 'Unauthorized' }
  }

  render() {
    const { banks, show, trades } = this.state;
    return(
      <div>
        <ul>
          <h1> list of bank </h1>
          <ul>
            {banks.map(bank => (
              <li key={ bank.id }>
                bank id: {bank.id + ' '}
                amount: {bank.amount + ' '}

                <button type="button" onClick={() => this.tradeByBank(bank.id) }>
                  See trades
                </button>
              </li> 
            ))}
          </ul>
        </ul>
        <Modal title="Trades" onClose={()=> this.setState({show: false})} show={show} >
          { trades.map(trade => (
            <li key={ trade.id }>
              id: { trade.id + ' | ' }
              type: { trade.trade_type + ' | ' }
              price: { trade.price + ' | ' }
              status: { trade.state + ' ' }
              { (trade.state === 'pending') ? <button type="button">edit</button> : ''}
            </li>
          ))}
        </Modal>
      </div>
    )
  }
}

export default PageHome;
