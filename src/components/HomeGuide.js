import '../css/Guide.css'
import React from 'react'
import { RedFree, RedBusy } from './Rooms'

export default function HomeGuide() {
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
                </div>
                <div>
                    <div className="manual-div">
                        <RedFree />
                        <span className="manual-par">
                            The red room is <b>free</b> at this time
                        </span>
                    </div>
                    <div className="manual-div">
                        <RedBusy />
                        <span className="manual-par">
                        The red room is <b> reserved </b> at this time
                        </span>
                    </div>
                </div>
            </div> 
        </div>
    );
} 