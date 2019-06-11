import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleDateInputSubmit, handleUpperBackSwitcher, determineReservedSlots } from '../actions';
import { calculateReservedSlots, convertMlsToYYYYmmDD, convertYYYYmmDDToMls } from '../functions'
import { DateInputContainer, DateInput, SearchIconContainer, SearchIcon} from '../styles'

class DateSearch extends Component {
	state = {
		dateInput: ''
	}

	componentWillMount() {
		if (window.screen.width <= 480 && this.state.dateInput === '') {
			this.setState({dateInput:convertMlsToYYYYmmDD(new Date(this.props.dateInput).getTime(), 'yyyy-MM-dd')})
		}
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
			this.props.handleDateInputSubmit(convertYYYYmmDDToMls(this.state.dateInput))
			this.props.determineReservedSlots(calculateReservedSlots(this.props.tickets, this.props.halls, convertYYYYmmDDToMls(this.state.dateInput)))
			if (window.screen.width > 480) {
				this.setState({ dateInput: '' })
			}
		} else if (inputtedDay > today) {
			this.props.handleUpperBackSwitcher('active')
			this.props.handleDateInputSubmit(convertYYYYmmDDToMls(this.state.dateInput))
			this.props.determineReservedSlots(calculateReservedSlots(this.props.tickets, this.props.halls, convertYYYYmmDDToMls(this.state.dateInput)))
			if (window.screen.width > 480) {
				this.setState({ dateInput: '' })
			}
		}
	}

	render() {
		return (
			<DateInputContainer className="ui input">
				<DateInput
					type='date'
					min={this.dateLimit()}
					value={this.state.dateInput}
					onChange={(e) => this.setState({ dateInput: e.target.value })}
				/>
				<SearchIconContainer>
					<SearchIcon className={"search icon "}
						onClick={() => {
							this.handleDateInputSubmit(convertYYYYmmDDToMls(this.state.dateInput))
						}}>
					</SearchIcon>
				</SearchIconContainer>
			</DateInputContainer>
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
})(DateSearch);