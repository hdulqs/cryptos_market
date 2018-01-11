import React, { Component } from 'react'
import MarketRow from './market_row'
import MarketItem from './market_item'
import { Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as markets_actions from './../actions'

const styles = {
  market_list: {
    display: 'flex',
    'flexWrap': 'wrap'
  }
}


const MarketList = (props) => {
  //let markets_x4 = []
  //let copy_markets = [...props.markets]
  //while (copy_markets.length) {
  //  markets_x4.push(copy_markets.splice(0, 4));
  //}
  return(
    <div style={styles.market_list}>
      {
        props.markets.map((market) =>
          <MarketItem key={market.id} market={market}></MarketItem>
        )
      }
    </div>
  )
}

export default MarketList


/*class MarketList extends Component {
markets_x4.map((markets) =>
  <Row className="show-grid" key={markets[0].id}>
    <MarketRow markets={markets}></MarketRow>
  </Row>
)
  render(){
    let markets_x4 = []
    let copy_markets = [...this.props.markets]
    while (copy_markets.length) {
      markets_x4.push(copy_markets.splice(0, 4));
    }
    return(
      <div>
        {
          markets_x4.map((markets) =>
            <Row className="show-grid" key={markets[0].id}>
              <MarketRow markets={markets}></MarketRow>
            </Row>
          )
        }
      </div>
    )
  }

}*/

/*const mapStateToProps = (state) => {
 return {
   markets: state.MarketsReducer.markets
 }
}

const mapDispatchToProps = (dispatch) => {
 return bindActionCreators(markets_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketList)*/
