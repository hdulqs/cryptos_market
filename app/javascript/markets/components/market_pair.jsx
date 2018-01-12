import React, { Component } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import history from './../../main/history'

const styles = {
  red_flash: {
    color: 'red'
  }
}

const MarketPair = (props) => {

  const navigateToShowMarket = () => {
    history.push('/' + props.pair.exchange_name + '/' + props.pair.last_ticker.market_name)
  }

  let css = props.pair.last_to_be_updated ? styles.red_flash : {}
  return(
    <tr key={props.pair.id} style={css} onClick={navigateToShowMarket}>
      <td>{props.pair.exchange_name + props.pair.id}</td>
      <td>{props.pair.last_ticker.last}</td>
      <td>{props.pair.last_ticker.volume}</td>
    </tr>
  )

}

export default MarketPair


/*export default class MarketPair extends Component {

  navigateToShowMarket = () => {
    history.push('/' + this.props.pair.exchange_name + '/' + this.props.pair.last_ticker.market_name)
  }

  render(){
    let css = this.props.pair.last_to_be_updated ? styles.red_flash : {}
    return(
          <tr key={this.props.pair.id} style={css} onClick={this.navigateToShowMarket}>
            <td>{this.props.pair.exchange_name + this.props.pair.id}</td>
            <td>{this.props.pair.last_ticker.last}</td>
            <td>{this.props.pair.last_ticker.volume}</td>
          </tr>
    )
  }
}*/

/*const MarketPair = (props) => {
  if(props.pair.last_ticker.ask){
    let css = props.pair.last_to_be_updated ? styles.red_flash : {}
    return(
      <div>
      <thead>
        <tr>
          <th>Exchange</th>
          <th>Ask</th>
          <th>Bid</th>
          <th>Last</th>
        </tr>
      </thead>
      <tbody>
        <tr style={css}>
          <td>{props.pair.exchange_name}</td>
          <td>{props.pair.last_ticker.ask}</td>
          <td>{props.pair.last_ticker.bid}</td>
          <td>{props.pair.last_ticker.last}</td>
        </tr>
      </tbody>
      </div>
    )
  }else{
    return(
      <tbody>
        <tr>
        </tr>
      </tbody>
    )
  }
}

export default MarketPair
<Link to={`/${props.pair.exchange_name}/${props.pair.last_ticker.market_name}`} activeClassName="active">
*/

/*const Button = withRouter(({ history }) => (
  <button
    type='button'
    onClick={() => { history.push('/poloniex/ETH-ZEC') }}
  >
    Click Me!
  </button>
))
*/
/*const goToShowMarket = (pair) => {
  const { router } = this.context
  router.transitionTo('/' + props.pair.exchange_name + '/' + props.pair.last_ticker.market_name)
}*/

/*const MarketPair = (props) => {

  //render(){
    let css = props.pair.last_to_be_updated ? styles.red_flash : {}
    return(
          <tr key={props.pair.id} style={css} onClick={goToShowMarket(props.pair)}>
            <td>{props.pair.exchange_name + props.pair.id}</td>
            <td>{props.pair.last_ticker.last}</td>
            <td>{props.pair.last_ticker.volume}</td>
          </tr>
    )
  //}

}*/
