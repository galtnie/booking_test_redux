import '../css/Guide.css'
import React from 'react'
import { RedFree, RedBusy, RedChosen } from './Rooms'
import history from '../history'

export default function Guide() {
    return (
        <div>
            <div className="manual">
                <div>
                {
                        (history.location.pathname !== "/booking") ?
                    <p className="manual-par">
                        Only <b>logged in users</b> can <b>make reservations</b>.
                    </p>

: null
}
                    <p className="manual-par">
                        <b>9"</b> means <b>9:00-10:00</b>; 10" means 10:00-11:00.
                    </p>
                    {
                        (history.location.pathname === "/booking")
                            ?
                            <p className='manual-par'>
                                Once you have selected all the rooms to book
                                click <b>PAYMENT</b> button
                    </p>
                            : null
                    }

                </div>
                <div>
                    <div className="manual-div">
                        <RedFree guide={true}/>
                        <span className="manual-par">
                            The red room is <b>FREE</b> now.
                        </span>
                    </div>
                    <div className="manual-div">
                        <RedBusy guide={true} />
                        <span className="manual-par">
                            The red room is <b> RESERVED </b> now.
                        </span>
                    </div>
                    {
                        (history.location.pathname === "/booking")
                            ?
                            <div className="manual-div">
                                <RedChosen guide={true} /> <span className="manual-par"> The red room is <b>SELECTED</b>, but not reserved yet. </span>
                            </div>
                            : null
                    }
                </div>
            </div>
        </div>
    );
} 