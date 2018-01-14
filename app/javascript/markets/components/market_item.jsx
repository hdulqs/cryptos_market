import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Glyphicon } from 'react-bootstrap'
import MarketTable from './market_table'
//import ReactTable from 'react-table'
import MarketChartIndex from './market_chart_index'
import ReactDOM from 'react-dom'

const styles = {
  market_item: {
    //'alignContent': 'center',
    //'minWidth': 'calc(100% / 12 * 3)',
    //'display': 'block',
    //'width': '20em',
    //'border': '1px solid #737300',
    //'padding': '0em 0.5em',
    //'maxHeight': '14em',
    //'overflow': 'scroll',
    'overflow': 'hidden',
    //position: 'relative'
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
  button_more: {
    //position: 'absolute',
    //bottom: '1px'
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

export default class MarketItem extends Component {

  constructor(props){
    super(props)
    this.state = {
      style: styles,
      show_chart: false
    }
  }

  get_style = () => {
    return this.state.style.market_item
    /*if(this.state.show_extra){
      return this.state.style.market_item_full
    }else{
      return this.state.style.market_item
    }*/
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
      {/*<button className="btn btn-warning btn-block" onClick={this.show_more}>{this.state.show_chart ? "Unload" : "Load"} <Glyphicon glyph="plus" /></button>*/}
      { this.state.show_chart ?
          ( <MarketChartIndex market={this.props.market}></MarketChartIndex> )
          :
          ( <MarketTable pairs={this.props.market.pairs}></MarketTable> )
      }

    </div>
  )
  }
}
