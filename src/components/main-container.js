import React, { Component } from 'react';
import _ from 'lodash';
import Card from './card';
import axios from 'axios';

export default class MainContainer extends Component {
  constructor() {
    super();
    this.state = {
      coins: [],
    };
    this.url = 'https://thingproxy.freeboard.io/fetch/https://api.coinone.co.kr/ticker?currency=all';
    this.headers = {
      'content-type': 'application/json',
      'accept': 'application/json',
    };

    this.options = {
      headers: this.headers,
      timeout: 5000,
    };
  }

  getData = () => {
    axios
      .get(this.url, this.options)
      .then((result) => {
        const data = result.data;
        const coins = [];

        // Use forEach instead of map for side-effects
        Object.keys(data).forEach((k) => {
          if (data[k].last) {
            coins.push(data[k]);
          }
        });

        this.setState({ coins });
      })
      .catch((error) => {
        console.error('Error fetching data:', error.message);
      });
  };

  componentDidMount() {
    this.intervalId = setInterval(this.getData, 2000); // Timer to fetch data every 2 seconds
    this.getData(); // Initial fetch
  }

  componentWillUnmount() {
    clearInterval(this.intervalId); // Clear interval on component unmount
  }

  renderCoinCard = () => {
    return _.map(this.state.coins, (coin) => (
      <Card key={coin.currency} coin={coin} />
    ));
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="section">
              <h3 className="header">Cryptocurrency Monitor</h3>
            </div>
          </div>
        </div>
        <div className="row">
          {this.state.coins.length > 0 ? (
            this.renderCoinCard()
          ) : (
            <p>Loading cryptocurrency data...</p>
          )}
        </div>
      </div>
    );
  }
}
