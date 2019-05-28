import React from 'react'
import ButtonAppBar from './components/UpperBar'
import HomeGuide from './components/HomeGuide'
import Halls from './components/Halls'
import { Redirect } from 'react-router-dom'
import './css/Home.css'

export default class Home extends React.Component {

    render() {
        return (
            (typeof sessionStorage.getItem('LoggedIn') !== "string")
                ?
                <div className='main'>
                    <ButtonAppBar />    
                    <HomeGuide />
                    <Halls />



                    End of Home
                </div>
                :
                <Redirect to='/booking' />
        );
    }
}