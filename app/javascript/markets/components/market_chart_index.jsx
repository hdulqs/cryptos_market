import React, { Component } from 'react'
import MarketChart from './market_chart';
import axios from 'axios'

import { TypeChooser } from "react-stockcharts/lib/helper";
import { timeParse } from "d3-time-format";

export default class MarketChartIndex extends Component {

  constructor(props){
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount(){
    this.getChartData(this.props.market)
  }

  getChartData = (market) => {
    this.retrieve_ohcl(market, 0)
  }

  retrieve_ohcl = (market, intent_nb) => {
    //let intent_nb = 0
    //let market_param = market.name.split("-").reverse().join("").toLowerCase()
    let market_param = market.name.split("-").join("").toLowerCase()
    let exchange_param = market.pairs[intent_nb].exchange_name
    //let yesterday = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date).getTime()
    //let start_timestamp = new Date().getTime() - (24 * 60 * 60 * 1000)
    axios.get('https://cors-anywhere.herokuapp.com/https://api.cryptowat.ch/markets/' + exchange_param + '/' + market_param + '/ohlc?periods=900', {responseType: 'json', "Access-Control-Allow-Origin": "*"})
      .then((response) => {
        let res = response.data
        let json = res["result"][900]
        let arr = []
        json.map((item) => {
          let obj = {
            date: new Date(item[0] * 1000),
            open: item[1],
            high: item[2],
            low: item[3],
            close: item[4],
            volume: item[5],
          }
          arr.push(obj)
        })
        //console.log(arr)
        this.setState({data: arr})
        //return true
        //dispatch(markets_fetched(response.data.markets))
      })
      .catch((error) => {
        if(error.response.status === 400){
          if(intent_nb < 4){
            intent_nb = intent_nb + 1
            this.retrieve_ohcl(market, intent_nb)
          }
        }
      })
  }

  render() {
    if (this.state.data.length === 0) {
			return (
        <div className="text-center">Loading Chart...</div>
      )
		}
		return (
			<MarketChart data={this.state.data} />
		)
	}

}
