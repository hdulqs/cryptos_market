import React, { Component } from 'react'
import MarketRow from './market_row'
import MarketItem from './market_item'
import { Row, FormGroup, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as markets_actions from './../actions'

const styles = {
  search_bar: {
    marginTop: '15px'
  },
  search_input: {
    backgroundColor: '#908e83',
    color: 'white',
    textAlign: 'center'
  }
}

export default class MarketList extends Component {

  constructor(props){
    super(props)
    this.state = {containerWidth: 0, col_nb: 4, markets: props.markets}
  }

  _handleWindowResize = () => {
    let wind_width = window.innerWidth
    //console.log(wind_width)
    let col_nb = this.getColNb(wind_width)
    //console.log(col_nb)
    //let new_style = get_market_item_style(col_nb)
    this.setState({
      containerWidth: wind_width,
      col_nb: col_nb
    })
  }

  getColNb = (width) => {
    if(width < 768){
      return 1
    }else if (width >= 768 && width < 992) {
      return 2
    }else if (width >= 992 && width < 1200){
      return 3
    }else if (width >= 1200){
      return 4
    }
  }

  //show_more = () => {
  //  this.state.show_extra ? this.setState({show_extra: false}) : this.setState({show_extra: true})
  //}

  componentWillReceiveProps(props){
    this.setState({markets: props.markets})
  }


  componentDidMount () {
    this.setState({
      containerWidth: window.innerWidth
    })
    window.addEventListener('resize', this._handleWindowResize)
  }

  search_market = (event) => {
    let filtered_markets = this.filterList(event)
    //console.log(filtered_markets)
    //console.log(event.target.value)
    this.setState({markets: filtered_markets})
  }

  filterList = (event) => {
    let updatedList = this.props.markets
    updatedList = updatedList.filter((item) => {
      return item.name.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1
    })
    return updatedList
  }

  render(){
    let markets_xx = []
    let copy_markets = [...this.state.markets]
    while (copy_markets.length) {
      markets_xx.push(copy_markets.splice(0, this.state.col_nb))
    }
    return(
      <div style={styles.market_list}>
        <FormGroup style={styles.search_bar}>
			     <FormControl type="text" placeholder="Search Cryptos Market" onChange={this.search_market} style={styles.search_input} />
		    </FormGroup>
        {
          markets_xx.map((markets) =>
            <Row className="show-grid" key={markets[0].id}>
              <MarketRow markets={markets}></MarketRow>
            </Row>
          )
        }
      </div>
    )
  }
}



/*

export default class MarketList extends Component {

  constructor(props){
    super(props)
    this.state = {containerWidth: 0, col_nb: 3}
  }

  _handleWindowResize = () => {
    let wind_width = window.innerWidth
    let col_nb = this.getColNb(wind_width)
    //let new_style = get_market_item_style(col_nb)
    this.setState({
      containerWidth: wind_width,
      col_nb: col_nb
    })
  }

  getColNb = (width) => {
    if(width < 600){
      return 1
    }else if (600 < width < 1000) {
      return 2
    }else if (width > 1000){
      return 3
    }
  }

  //show_more = () => {
  //  this.state.show_extra ? this.setState({show_extra: false}) : this.setState({show_extra: true})
  //}


  componentDidMount () {
    this.setState({
      containerWidth: window.innerWidth
    })
    window.addEventListener('resize', this._handleWindowResize)
  }

  render(){
    let markets_xx = []
    let copy_markets = [...props.markets]
    while (copy_markets.length) {
      markets_xx.push(copy_markets.splice(0, this.state.col_nb))
    }
    return(
      <div style={styles.market_list}>
        {
          this.props.markets.map((market) =>
            <MarketItem key={market.id} market={market}></MarketItem>
          )
        }
      </div>
    )
  }
}


*/
/*const MarketList = (props) => {
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

export default MarketList*/


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
