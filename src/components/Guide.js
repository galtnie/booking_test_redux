import '../css/Guide.css'
import React from 'react'
import { RedFree, RedBusy, RedChosen } from './Rooms'
import history from '../history'

export default function Guide() {
    return (
        <div>
            <div className='title'>   {/*  style={this.state.myClasses.title} */}
                <div>
                    <h1 className="ui header" style={{ color: 'inherit' }}>Conference Venue Booking</h1>
                </div>
            </div>
            <div className="manual">
                <div>
                    <p className="manual-par">
                        Only <b>logged in users</b> can <b>make reservations</b>.
                    </p>
                    <p className="manual-par">
                        <b>9"</b> means <b>9:00-10:00</b>; 10" means 10:00-11:00.
                    </p>
                    {
                    (history.location.pathname === "/booking")
                    ?
                    <p className='manual-par'>
                                Once you have selected all the rooms you would like to book
                                click <b>payment</b> button 
                    </p>   
                    : null 
                    }

                </div>
                <div>
                    <div className="manual-div">
                        <RedFree />
                        <span className="manual-par">
                            The red room is <b>free</b> now.
                        </span>
                    </div>
                    <div className="manual-div">
                        <RedBusy />
                        <span className="manual-par">
                        The red room is <b> reserved </b> now.
                        </span>
                    </div>
{
    (history.location.pathname === "/booking")
    ?
                    <div className="manual-div">
                                <RedChosen /> <span className="manual-par"> The red room is <b>selected</b>, but <b>not reserved</b> yet. </span>
                    </div>
  : null 
}
                </div>
            </div> 
        </div>
    );
} 