import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class MarketShow extends Component {

  constructor(props){
    super(props)
    this.state = {
      market: {}
    }
  }

  componentWillMount(){
    this.getMarket(this.props.match.params.market)
  }

  getMarket = (market) => {
    axios.get("/api/v1/public/markets/" + market, {responseType: 'json'})
      .then((response) => {
        this.setMarket(response.data.market)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  setMarket = (market) => {
    this.setState({market: market})
  }

  render(){
    return(
      <div>
        <h2>Market Details</h2>
        {this.state.market ? this.state.market.id : ''}: {this.state.market ? this.state.market.name : ''}
      </div>
    )
  }
}
