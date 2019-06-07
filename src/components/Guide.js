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
                        Log in to <b>make reservations</b>.
                    </p>

                : null
                }
                    <p className="manual-par">
                        <b>9"</b> means 9:00-9:59.
                    </p>
                    {
                        (history.location.pathname === "/booking")
                            ?
                            <span>
                            <p className='manual-par'>
                                Having selected the slots to book
                            </p>
                            <p className='manual-par'>
                                click <b>PAYMENT</b> button.
                            </p>
                            </span>
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