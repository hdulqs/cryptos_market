import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'
//import MarketPair from './market_pair'
import MarketTable from './market_table'
import ReactTable from 'react-table'
import ReactDOM from 'react-dom'

const styles = {
  market_item: {
    'alignContent': 'center',
    'minWidth': 'calc(100% / 12 * 3)',
    'display': 'block',
    'width': '20em',
    'border': '1px solid #737300',
    'padding': '0em 0.5em',
    'maxHeight': '16.6em',
    'overflow': 'scroll',
    //'overflow': 'hidden',
    position: 'relative'
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
    position: 'absolute',
    bottom: '1px'
  }
}

/*const get_market_item_style = (width) => {
  return {
    market_item: {
      alignContent: 'center',
      minWidth: width + '%',
      display: 'block',
      width: '20em',
      border: '1px solid #737300',
      padding: '0em 0.5em',
      maxHeight: '16.6em',
      overflow: 'scroll',
      //'overflow': 'hidden',
      position: 'relative'
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
      position: 'absolute',
      bottom: '1px'
    }
  }
}*/

const getHighestPrice = (pairs) => {
  let a = []
  pairs.map((pair) => a.push(pair.last_ticker.last) )
  let b = a.filter((x) => x !== null )
  let c = b.map((nb) => parseFloat(nb))
  return Math.max(...c)
}

export default class MarketItem extends Component {
//const MarketItem = (props) => {
  //const market_size = props.market.pairs.length
  //const highest_price = getHighestPrice(props.market.pairs)
  constructor(props){
    super(props)
    this.state = {
      style: styles/*,
      show_extra: false,
      containerWidth: 0*/
    }
  }

  /*_handleWindowResize = () => {
    let wind_width = window.innerWidth
    let col_nb = this.getColNb(wind_width)
    let new_style = get_market_item_style(col_nb)
    this.setState({
      containerWidth: wind_width,
      style: new_style
    })
  }

  show_more = () => {
    this.state.show_extra ? this.setState({show_extra: false}) : this.setState({show_extra: true})
  }

  getColNb = (width) => {
    if(width < 600){
      return 100
    }else if (600 < width < 1000) {
      return 50
    }else if (width > 1000){
      return 33
    }
  }

  componentDidMount () {
    this.setState({
      containerWidth: window.innerWidth
    })
    window.addEventListener('resize', this._handleWindowResize)
  }*/

  get_style = () => {
    //let styl = ...this.state.style.market_item
    /*if(this.state.show_extra){
      return this.state.style.market_item_full
    }else{
      return this.state.style.market_item
    }*/
    //let col_nb = this.getColNb(this.state.containerWidth)

    //return get_market_item_style(col_nb)
    return this.state.style.market_item
  }

  render(){
  return(
    <div style={this.get_style()}>
      <div style={this.state.style.item_header}>
      <h4 style={this.state.style.title}>{this.props.market.name}</h4>
      <h4 style={this.state.style.header_price}>{getHighestPrice(this.props.market.pairs)}</h4>
      </div>
      <MarketTable pairs={this.props.market.pairs}></MarketTable>
      {/*<button  style={this.state.style.button_more} onClick={this.show_more}>More</button>*/}

    </div>
  )
  }
}

//export default MarketItem


/*export default class MarketItem extends Component {

  render(){
    return(
      <div>
        <h4>{this.props.market.id} : {this.props.market.name}</h4>
        <ul>
          {
            this.props.market.pairs.map((pair) =>
              <MarketPair key={pair.id} pair={pair}></MarketPair>
            )
          }
        </ul>
      </div>
    )
  }
  return(
    <div style={styles.market_item}>

      <h4 style={styles.title}>{props.market.id} : {props.market.name}</h4>

      <table>
        {
          props.market.pairs.map((pair) =>
            <MarketPair key={pair.id} pair={pair}></MarketPair>
          )
        }
      </table>
    </div>
  )

  <div>
          <ReactTable
            data={props.market.pairs}
            showPagination={false}
            columns={[
              {
                columns: [
                  {
                    Header: "Exchange",
                    accessor: "exchange_name"
                  },
                  {
                    Header: "Ask",
                    accessor: "last_ticker.ask"
                  },
                  {
                    Header: "Bid",
                    accessor: "last_ticker.bid"
                  },
                  {
                    Header: "Last",
                    id: "last_price",
                    accessor: "last_ticker.last"
                  }
                ]
              }
            ]}
            defaultSorted={[
              {
                id: "last_price",
                desc: true
              }
            ]}
            defaultPageSize={market_size}
            className="-striped -highlight"
          />
          <br />

        </div>
}*/
