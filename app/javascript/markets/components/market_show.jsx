import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { TypeChooser } from "react-stockcharts/lib/helper"
import CandleChart from './candle_chart'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as markets_actions from './../actions'

class MarketShow extends Component {

  constructor(props){
    super(props)
    this.state = {
      market: {}
    }
  }

  componentDidMount(){
    this.getMarket(this.props.match.params.market)
    this.retrieve_ohcl(this.props.match.params.market, 0)
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


  retrieve_ohcl = (market) => {
    //let intent_nb = 0
    //let market_param = market.name.split("-").reverse().join("").toLowerCase()
    let market_param = market.split("-").join("").toLowerCase()
    let exchange_param = this.props.match.params.exchange_name
    //let yesterday = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date).getTime()
    //let start_timestamp = new Date().getTime() - (24 * 60 * 60 * 1000)
    //axios.get('https://cors-anywhere.herokuapp.com/https://api.cryptowat.ch/markets/' + exchange_param + '/' + market_param + '/ohlc?periods=900', {responseType: 'json', "Access-Control-Allow-Origin": "*"})
    axios.get('https://cors-anywhere.herokuapp.com/https://api.cryptowat.ch/markets/' + exchange_param + '/' + market_param + '/ohlc?periods=900', {responseType: 'json'})
      .then((response) => {
        let res = response.data
        let json = res["result"][900]
        let arr = []
        json.forEach((item) => {
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
        let obj = {}
        obj.market_name = market
        obj.charts_data = arr
        this.props.got_hocl(obj)
      })
      .catch((error) => {
        if(error.response.status === 429){
          return false
        }
        if(error.response.status === 400){
          //if(intent_nb < 4){
          //  intent_nb = intent_nb + 1
          //  this.retrieve_ohcl(market, intent_nb)
          //}
        }
      })
  }

  render(){
    let charts_data = this.props.charts_data[this.props.match.params.market] === undefined ?
                      [] :
                      this.props.charts_data[this.props.match.params.market]
    if (charts_data.length === 0) {
			return (
        <div className="loader-small"></div>
      )
		}
    return(
      <div>
        <h2 className='text-center'>{this.state.market ? this.state.market.name : ''}</h2>
        <CandleChart data={charts_data} />
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    charts_data: state.MarketsReducer.charts_data
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(markets_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketShow)
