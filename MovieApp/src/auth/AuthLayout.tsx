import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'


const AuthLayout = ({ children }: any) => {

    const location = useLocation()
    const [showNavBar, setShowNavBar] = useState<boolean>(false)

    useEffect(() => {
        if (location.pathname == '/auth/signup' || location.pathname == '/auth/signin') {
            setShowNavBar(false)
        }
        else {
            setShowNavBar(true)
        }
    })

    return (
        <>
            {showNavBar && children}
        </>
    )
}

export default AuthLayout