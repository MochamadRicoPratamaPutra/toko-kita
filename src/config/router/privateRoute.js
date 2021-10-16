import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Footer from '../../components/layout/footer'
import Navbar from '../../components/layout/navbar'

const PrivateRoute = ({ component: Component, ...rest}) => {
    const isAuth = localStorage.getItem('token')
    return (
    <Route {...rest} render={(props)=>{
        return(
            isAuth ? (
            <>
                <Navbar/>
                <Component {...props}/> 
                <Footer />
            </>
            ): <Redirect to="/auth" />
            )
        }}/>
    )
}

export default PrivateRoute