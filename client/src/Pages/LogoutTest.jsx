import React, { Component } from 'react'
import ResponsiveAppBar from '../Components/ResponsiveAppBar'
import CourseOverview from './CourseOverview'
 
export default class LogoutTest extends Component {
  render() {
    return (
      <div>
        <ResponsiveAppBar />
        <CourseOverview />
      </div>
    )
  }
}
