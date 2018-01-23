
import React, { Component } from 'react'
import AboutContainer from './containers/about_container'
import AboutNavBar from './about_nav_bar'

const AboutApp = () => {
  return (
    <nav>
      <AboutNavBar />
      <AboutContainer />
    </nav>
  )
}

export default AboutApp
