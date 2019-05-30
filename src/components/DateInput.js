import '../css/DateInput.css'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleDateInputSubmit, handleUpperBackSwitcher, determineReservedSlots } from '../actions';
import { calculateReservedSlots } from '../functions'


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
			this.props.handleDateInputSubmit(this.state.dateInput)
			this.props.determineReservedSlots(calculateReservedSlots(this.props.tickets, this.props.halls, this.state.dateInput))
			this.setState({ dateInput: '' })

		} else if (inputtedDay > today) {
			this.props.handleUpperBackSwitcher('active')
			this.props.handleDateInputSubmit(this.state.dateInput)
			this.props.determineReservedSlots(calculateReservedSlots(this.props.tickets, this.props.halls, this.state.dateInput))
			this.setState({ dateInput: '' })

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
	return { 
		dateInput: state.dateInput,
		halls: state.halls,
		tickets: state.tickets 
	};
};

export default connect(mapStateToProps, { 
		handleDateInputSubmit, 
		handleUpperBackSwitcher,
		determineReservedSlots 
})(DateInput);