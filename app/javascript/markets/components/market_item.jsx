import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'
//import MarketPair from './market_pair'
import MarketTable from './market_table'
import ReactTable from 'react-table'
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
      show_extra: false
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
    this.state.show_extra ? this.setState({show_extra: false}) : this.setState({show_extra: true})
  }

  render(){
  return(
    <div style={this.get_style()}>
      <div style={this.state.style.item_header}>
      <h4 style={this.state.style.title}>{this.props.market.name}</h4>
      <h4 style={this.state.style.header_price}>{getHighestPrice(this.props.market.pairs)}</h4>
      </div>
      <MarketTable pairs={this.props.market.pairs}></MarketTable>
      {/*<button style={this.state.style.button_more} onClick={this.show_more}>More</button>*/}
    </div>
  )
  }
}
