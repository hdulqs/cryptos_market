import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'
//import MarketPair from './market_pair'
import MarketTable from './market_table'
import ReactTable from 'react-table'

const styles = {
  market_item: {
    'alignContent': 'center',
    'minWidth': '25%',
    'display': 'block',
    'width': '20em',
    'border': '1px solid #737300',
    'padding': '0em 0.5em',
    //'maxHeight': '16em',
    //'overflow': 'scroll'
  },
  title: {
    'color': '#adf96c'
  },
  item_header: {
    display: 'flex',
    justifyContent: 'space-around'
  }
}

const getHighestPrice = (pairs) => {
  let a = []
  pairs.map((pair) => a.push(pair.last_ticker.last) )
  let b = a.filter((x) => x !== null )
  let c = b.map((nb) => parseFloat(nb))
  return Math.max(...c)
}

const MarketItem = (props) => {
  //const market_size = props.market.pairs.length
  //const highest_price = getHighestPrice(props.market.pairs)
  return(
    <div style={styles.market_item}>
      <div style={styles.item_header}>
      <h4 style={styles.title}>{props.market.name}</h4>
      <h4>{getHighestPrice(props.market.pairs)}</h4>
      </div>
      <MarketTable pairs={props.market.pairs}></MarketTable>
    </div>
  )
}

export default MarketItem


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
