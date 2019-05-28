import '../css/DateInput.css'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleDateInputSubmit, handleUpperBackSwitcher } from '../actions';

class DateInput extends Component {
	state = {
		dateInput: ''
	}

	dateLimit() {
		let date1 = new Date();
		let minLimit = (date1.getDate())
		date1.setDate(minLimit)
		return (date1.toISOString().split("T")[0])
	}

	handleDateInputSubmit() {

		let today = new Date(new Date(new Date(new Date(new Date().setHours(0)).setMinutes(0)).setSeconds(0)).setMilliseconds(0))
		let inputtedDay = new Date(this.state.dateInput)

		if (inputtedDay < today) {
			alert('The searched date cannot be erenow ')
			this.setState({ dateInput: '' })

		} else if (inputtedDay.getDate() === today.getDate()) {
			this.props.handleUpperBackSwitcher('inactive')
			this.props.handleDateInputSubmit(this.state.deteInput)
			this.setState({ dateInput: '' })
			// .then(()=> this.calculateSlotsReserved())

		} else if (inputtedDay > today) {
			this.props.handleUpperBackSwitcher('active')
			this.props.handleDateInputSubmit(this.state.dateInput)
			this.setState({ dateInput: '' })
			//   .then(()=> this.calculateSlotsReserved())

		}

	}
	render() {
		return (
			<div className="date-input-container ui input">
				<input
					className='date-input'
					type='date'
					min={this.dateLimit()}
					value={this.state.dateInput}
					onChange={(e) => this.setState({ dateInput: e.target.value })}
				/>
				<div className='search-icon-container'>
					<i className={"search-icon search icon "}
						onClick={() => {
							this.handleDateInputSubmit(this.state.dateInput)
							this.setState({ dateInput: '' })
						}}>
					</i>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { dateInput: state.dateInput };
};
export default connect(mapStateToProps, { handleDateInputSubmit, handleUpperBackSwitcher })(DateInput);