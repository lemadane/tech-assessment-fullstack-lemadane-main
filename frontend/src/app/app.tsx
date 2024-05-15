import styled from '@emotion/styled'
import './app.css'

import NxWelcome from './nx-welcome'
import { useContext } from 'react'
import { LoginContext } from '../contexts/LoginContext'
import Weather from '../components/Weather'
import Login from '../components/Login'


const StyledApp = styled.div`
  // Your style here
`

export function App() {
  const { loggedIn } = useContext(LoginContext)
  return (
    <StyledApp>
      <div className='app'>

        <h1>Weather App</h1>
        {loggedIn ? <Weather /> : <Login />}

      </div>
    </StyledApp>
  )
}

export default App
