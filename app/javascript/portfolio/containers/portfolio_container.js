import React, { Component } from 'react'
import Cable from 'actioncable'
import axios from 'axios'
//import AssetList from './../components/asset_list'
import { Grid, Glyphicon } from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//import * as assets_actions from './../actions'
import store from './../../main/store'

class PortfolioContainer extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){

  }



  render() {
    return(
      <Grid fluid={true}>
        <h2 className='text-center'>Assets Portfolio Overview</h2>
      </Grid>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    assets: state.AssetsReducer.assets,
    current_page: state.AssetsReducer.current_page,
    is_assets_loading: state.AssetsReducer.is_assets_loading
  }
}

//const mapDispatchToProps = (dispatch) => {
//  return bindActionCreators(assets_actions, dispatch)
//}

//export default connect(mapStateToProps, mapDispatchToProps)(PortfolioContainer)
export default connect(mapStateToProps)(PortfolioContainer)
