import React, { Component } from 'react'
import AssetsContainer from './containers/assets_container'
import AssetsNavBar from './assets_nav_bar'

const AssetsApp = () => {
  return (
    <nav>
      <AssetsNavBar />
      <AssetsContainer />
    </nav>
  )
}

export default AssetsApp
