import React, { Component } from 'react'
import ResponsiveAppBar from '../Components/ResponsiveAppBar'
import CourseOverview from './CourseOverview'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
 
export default function LogoutTest() {
  const navigate = useNavigate()
  const { account } = useSelector((state) => state.auth)
  useEffect(() => {
    if (account === null) {
      navigate('/login')
    }
  }, [account, navigate])
  
    return (
      <div>
        <ResponsiveAppBar />
        <CourseOverview />
      </div>
    )
  
}
