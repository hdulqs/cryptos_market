import React, { Component } from 'react'
import Cable from 'actioncable'
import axios from 'axios'
import { Grid, Glyphicon } from 'react-bootstrap'


export default class AboutContainer extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){

  }


  render() {

    return(
      <Grid fluid={true}>
        <br/>
        <p className='text-center about'>CryptosMarket is a digital assets data monitoring tool</p>
        {/*<p className='text-center'>info.cryptosmarket@gmail.com</p>*/}
      </Grid>
    )
  }

}
