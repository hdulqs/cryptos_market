import React, { Component } from 'react'
import MarketRow from './market_row'
import { Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as markets_actions from './../actions'

class MarketList extends Component {
  constructor(props){
    super(props)
    //this.state = { markets_x4: [], markets: [] }
  }

  //transform_markets(markets){
  //  let markets_x4 = []
  //  let orginal_markets = [...markets]
  //  while (markets.length) {
  //    markets_x4.push(markets.splice(0, 4));
  //  }
  //  this.setState({ markets_x4: markets_x4, markets: orginal_markets})
  //  //this.props.children ...
  //}

  //componentWillReceiveProps(nxt){
    //console.log(nxt)
    //if(nxt.markets !== this.state.markets_x4)
    //if(nxt.markets.length > 0)
    //  this.transform_markets(nxt.markets)
  //}

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
}


const mapStateToProps = (state) => {
 return {
   markets: state.MarketsReducer.markets
 }
}

const mapDispatchToProps = (dispatch) => {
 return bindActionCreators(markets_actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketList)

//export default MarketList
