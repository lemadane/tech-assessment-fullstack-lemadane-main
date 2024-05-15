import { createContext, useState } from 'react'
import { LoginContextProviderProps, LoginContextType } from '../common/types'


export const LoginContext = createContext<LoginContextType>(
    {} as LoginContextType
)

export const LoginContextProvider = (props: LoginContextProviderProps) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [accessToken, setAccessToken] = useState('')
    const [refreshToken, setRefreshToken] = useState('')
    

    const value = { 
        loggedIn, setLoggedIn,
        accessToken, setAccessToken,
        refreshToken, setRefreshToken 
    }

    return (
        <LoginContext.Provider value={value}>
            {props.children}
        </LoginContext.Provider>
    )
}
