import React, { Component } from 'react'
import { ActionCableProvider } from 'react-actioncable-provider'
import MarketContainer from '../markets/market_container'
import ActionCable from 'actioncable'


//const cable = ActionCable.createConsumer('ws://localhost:3000/cable')

export default class MainContainer extends Component {

  render(){
    return (
      <MarketContainer />
    )
  }

}

/*
const cable = ActionCable.createConsumer('ws://localhost:3000/cable')

class MainContainer extends Component {

  constructor(props){
    super(props)
  }

  render(){
    return (
      <ActionCableProvider cable={cable}>
        <MarketContainer />
      </ActionCableProvider>
    )
  }

}

export default MainContainer
*/
