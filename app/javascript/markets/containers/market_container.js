import React, { Component } from 'react'
import Cable from 'actioncable'
import axios from 'axios'
import MarketList from './../components/market_list'
import { Grid, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as markets_actions from './../actions'
import store from './../../main/store'

const styles = {}

class MarketContainer extends Component {

  componentDidMount(){
    this.props.fetch_markets()
    this.createSocket()
  }

  createSocket() {
    Cable.createConsumer().subscriptions.create({
        channel: 'TickersChannel'
      }, {
      connected: () => {
        console.log('successfully connected to TickersChannel')
      },
      received: (data) => {
        //console.log(data.ticker)
        this.props.update_markets_ticker(this.props.markets, JSON.parse(data.ticker))
      }
    })
  }

  render() {
    if (this.props.markets.length === 0) {
			return (
        <div className="loader"><Glyphicon glyph="btc" /><Glyphicon glyph="eur" /><Glyphicon glyph="usd" /></div>
      )
		}
    return(
      <Grid fluid={true}>
        <MarketList markets={this.props.markets}></MarketList>
      </Grid>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    markets: state.MarketsReducer.markets
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(markets_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketContainer)
