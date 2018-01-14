import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Glyphicon } from 'react-bootstrap'
import MarketTable from './market_table'
import MarketChartIndex from './market_chart_index'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as markets_actions from './../actions'

const styles = {
  market_item: {
    'overflow': 'hidden',
  },
  title: {
    'color': '#adf96c'
  },
  item_header: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  header_price: {
    color: 'gold'
  },
  chart_glyph: {
    marginTop: '0.7em'
  }
}

const getHighestPrice = (pairs) => {
  let a = []
  pairs.map((pair) => a.push(pair.last_ticker.last) )
  let b = a.filter((x) => x !== null )
  let c = b.map((nb) => parseFloat(nb))
  return Math.max(...c)
}

class MarketItem extends Component {

  constructor(props){
    super(props)
    this.state = {
      style: styles,
      show_chart: false
    }
  }

  get_style = () => {
    return this.state.style.market_item
  }

  show_more = () => {
    this.state.show_chart ? this.setState({show_chart: false}) : this.setState({show_chart: true})
  }

  render(){
    return(
      <div style={this.get_style()}>
        <div style={this.state.style.item_header}>
        <div style={styles.chart_glyph} onClick={this.show_more}>{this.state.show_chart ? (<Glyphicon glyph="list" />) : (<Glyphicon glyph="stats" />)}</div>
        <h4 style={this.state.style.title}>{this.props.market.name + this.props.market.id}</h4>
        <h4 style={this.state.style.header_price}>{getHighestPrice(this.props.market.pairs)}</h4>
        </div>
        { this.state.show_chart ?
            ( <MarketChartIndex market={this.props.market} charts_data={this.props.charts_data}></MarketChartIndex> )
            :
            ( <MarketTable pairs={this.props.market.pairs}></MarketTable> )
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(MarketItem)
