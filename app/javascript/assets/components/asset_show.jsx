import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { TypeChooser } from "react-stockcharts/lib/helper"
import CandleChart from './candle_chart'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as assets_actions from './../actions'
import { Glyphicon } from 'react-bootstrap'

class AssetShow extends Component {

  constructor(props){
    super(props)
    this.state = {
      asset_chart: []
    }
  }

  componentDidMount(){
    //this.getMarket(this.props.match.params.market)
    this.retrieve_ohcl(this.props.match.params.symbol)
  }

  // getMarket = (market) => {
  //   axios.get("/api/v1/public/markets/" + market, {responseType: 'json'})
  //     .then((response) => {
  //       this.setMarket(response.data.market)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     });
  // }

  setMarket = (chart_data) => {
    this.setState({asset_chart: chart_data})
  }


  retrieve_ohcl = (symbol) => {
    // histohour ==> 7 last days with 3 hours step
    // histoday ==> 7 last months with 3 days step
    // histominute ==> 3 last hours with 3 minutes step
    let limit = 300
    axios.get('https://min-api.cryptocompare.com/data/histominute?tsym=USD&limit=' + limit + '&fsym=' + symbol, {responseType: 'json'})
      .then((response) => {
        let res = response.data
        let json_arr = res["Data"]
        let arr = []
        json_arr.forEach((item) => {
          let obj = {
            date: new Date(item.time * 1000),
            open: item.open,
            high: item.high,
            low: item.low,
            close: item.close,
            volume: item.volumeto + item.volumefrom
          }
          arr.push(obj)
        })
        this.setState({asset_chart: arr})
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
    // let charts_data = this.props.charts_data[this.props.match.params.market] === undefined ?
    //                   [] :
    //                   this.props.charts_data[this.props.match.params.market]
    if (this.state.asset_chart.length === 0) {
			return (
        <div className="loader"><Glyphicon glyph="btc" /><Glyphicon glyph="eur" /><Glyphicon glyph="usd" /></div>
      )
		}
    return(
      <div>
        <h2 className='text-center'>{this.props.match.params.symbol}-USD</h2>
        <CandleChart data={this.state.asset_chart} />
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    asset_charts_data: state.AssetsReducer.asset_charts_data
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(assets_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetShow)
