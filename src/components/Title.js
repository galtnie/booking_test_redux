import React from 'react'
import '../css/Title.css'

export default class Title extends React.Component{

    render() {
        
        return(
            <div className='title'>   {/*  style={this.state.myClasses.title} */}
                <div>
                    <h1 className="ui header" style={{ color: 'inherit' }}>Conference Venue Booking</h1>
                </div>
            </div>

        );
    }
}