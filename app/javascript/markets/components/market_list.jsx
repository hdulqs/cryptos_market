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
    this.state = {containerWidth: 0, col_nb: 3, markets: props.markets}
  }

  _handleWindowResize = () => {
    let wind_width = window.innerWidth
    let col_nb = this.getColNb(wind_width)
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
      return 2
    }else if (width >= 1200){
      return 3
    }
  }

  componentWillReceiveProps(props){
    if(props.markets.length > 0)
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
