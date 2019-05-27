import '../css/DateInput.css'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { controlDateInput, handleDateInputSubmit } from '../actions';

class DateInput extends Component {
	// state = {
	// 	dateInput: ''
	// }

	dateLimit() {
		let date1 = new Date();
		let minLimit = (date1.getDate())
		date1.setDate(minLimit)
		return (date1.toISOString().split("T")[0])
	}

	render() {
		return (
			<div className="date-input-container ui input">
				<input
					className='date-input'
					type='date' 
					min={this.dateLimit()} 
					value={this.props.dateInput} 
					onChange={(e) => this.props.controlDateInput(e.target.value)} 
				/>
				<div className='search-icon-container'>
					<i className={"search-icon search icon "}
						onClick={() => {
							this.props.handleDateInputSubmit()
						}
						}></i>
				</div>
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	console.log(state)
    return { dateInput: state.dateInput }; // state properties
};

export default connect (mapStateToProps, { controlDateInput, handleDateInputSubmit })(DateInput);


