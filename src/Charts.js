import './css/Chart.css'
import React from 'react';
import { connect } from 'react-redux';
import UpperBar from './components/UpperBar';
import Title from './components/Title'
import { Doughnut, Bar } from 'react-chartjs-2';
import { fetchTickets, fetchHalls, determineReservedSlots } from './actions';
import { calculateReservedSlots, convertToUKdate, convertTimeIntoMonth } from './functions'
import Select from 'react-select'; 


class Charts extends React.Component {
    state= {
        period: 'day',
    }
    
    componentWillMount(){
        if (this.props.halls === null) {this.props.fetchHalls()}
        if (this.props.tickets === null) {this.props.fetchTickets()}
        if (this.props.slots === null) {
            this.props.determineReservedSlots(calculateReservedSlots(this.props.tickets, this.props.halls, this.props.date))
        }
        this.calculatePercentage(this.props.halls, this.props.slots);
    }

    calculatePercentage = (halls, slots) => {
        let percentage = []
        halls.forEach(element => {
            let arr = slots.filter(i => i.slice(25, 28) === element.colour)
            percentage.push(arr.length) 
        });
        this.setState({ datasets : percentage  })
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.date !== this.props.date ) {
            this.calculatePercentage(this.props.halls, nextProps.slots)   
        }
        if (nextProps.slots !== this.props.slots ) {
            this.calculatePercentage(this.props.halls, nextProps.slots)   
        }
    }

    calculateTimeUsedPerMonth(time, tickets, halls){    
        let month = new Date(time).getMonth()
        let start = new Date(new Date(new Date(new Date(new Date(time).setDate(1)).setHours(0)).setMinutes(0)).setSeconds(0)).setMilliseconds(0)
        let end = new Date(start).setMonth(month + 1)
        let sortedTicketsPerHalls = []

        for (let i = 0; i < halls.length; i++){
            sortedTicketsPerHalls.push({
                hall_id: halls[i]._id,
                tickets: []
            })
        }
        for (let i = 0; i < tickets.length; i++){
            for (let j = 0; j < sortedTicketsPerHalls.length; j++) {
                if (tickets[i].hall_id === sortedTicketsPerHalls[j].hall_id) {
                    sortedTicketsPerHalls[j].tickets.push(tickets[i])
                } 
            }
        }
        let newArr = []
        for (let j = 0; j < sortedTicketsPerHalls.length; j++) {           
            newArr[j] = sortedTicketsPerHalls[j].tickets.filter(i => i.to > start)
        }
        for (let j = 0; j < newArr.length; j++) {           
            sortedTicketsPerHalls[j].tickets = newArr[j]
        }
        for (let j = 0; j < sortedTicketsPerHalls.length; j++) {           
            newArr[j] = sortedTicketsPerHalls[j].tickets.filter(i => i.from < end)
        }
        for (let j = 0; j < newArr.length; j++) {           
            sortedTicketsPerHalls[j].tickets = newArr[j]
        }
        for (let j = 0; j < sortedTicketsPerHalls.length; j++) {
          for(let i = 0; i < sortedTicketsPerHalls[j].tickets.length; i++) {
            if (sortedTicketsPerHalls[j].tickets[i].from < start) {
              sortedTicketsPerHalls[j].tickets[i].from = start
            }
            if (sortedTicketsPerHalls[j].tickets[i].to > end) {
                sortedTicketsPerHalls[j].tickets[i].to = end
            }
        }}
        newArr = []
        for (let j = 0; j < sortedTicketsPerHalls.length; j++) {
            sortedTicketsPerHalls[j].totalHours = 0
            for(let i = 0; i < sortedTicketsPerHalls[j].tickets.length; i++) {
                sortedTicketsPerHalls[j].totalHours += (sortedTicketsPerHalls[j].tickets[i].to - sortedTicketsPerHalls[j].tickets[i].from)
            }
            sortedTicketsPerHalls[j].totalHours /= 3600000
            newArr.push(Math.round(sortedTicketsPerHalls[j].totalHours))
        }
         return newArr
    } 

    handleSelectChange = selectedOption => {
        console.log(selectedOption)
        this.setState({ period: selectedOption.value });
    }


    render() {

        const { selectedOption } = this.state.period;
        const options = [
            { value: 'day', label: 'day' },
            { value: 'month', label: 'month' },
          ];

        const DoghnutChartData = {
            labels: [
                this.props.halls[0].title,
                this.props.halls[1].title,
                this.props.halls[2].title,
                this.props.halls[3].title,
            ],
            datasets: [{
                data: [
                    this.state.datasets[0], 
                    this.state.datasets[1], 
                    this.state.datasets[2], 
                    this.state.datasets[3]
                ],
                backgroundColor: [
                'rgba(108, 92, 231, 0.9)',
                'rgba(19, 55, 11, 0.8)',
                'rgba(178, 34, 34, 0.9)',
                'rgba(18, 11, 120, 0.9)',
                ],
                hoverBackgroundColor: [
                'rgba(108, 92, 231, 1)',
                'rgba(19, 55, 11, 0.9)',
                'rgba(178, 34, 34, 1)',
                'rgba(18, 11, 120, 1)',
                ]
            }]
        };

        const BarChartData = {
            labels: [
                this.props.halls[0].title,
                this.props.halls[1].title,
                this.props.halls[2].title,
                this.props.halls[3].title,
            ],
          datasets: [
            {
              label: 'reserved hours per month',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: this.calculateTimeUsedPerMonth(this.props.date, this.props.tickets, this.props.halls)
            }
          ]
        }


        this.calculateTimeUsedPerMonth(this.props.date, this.props.tickets, this.props.halls)

        return(
            <div>
                <UpperBar />
                <Title />
                
                <div className='charts-select-container'>
                    Choose the period
                    <Select 
                        className='charts-select'
                        value={selectedOption}
                        onChange={this.handleSelectChange}
                        options={options}
                        menuPlacement='top'
                    />
                </div>

                <div className={`${this.state.period}-doghnut-chart-container`}>
                    <div className='chart-title'>
                        Halls Use on <b>{(convertToUKdate(this.props.date).slice(0, -7))}</b> 
                    </div>
                    <Doughnut data={DoghnutChartData} width={100} height={200} options={{ maintainAspectRatio: false }} />
                </div>

                <div  className={`${this.state.period}-bar-chart-container`}>
                    <div className='chart-title'>
                            Total sum of reserved hours in <b>{(convertTimeIntoMonth(this.props.date))}</b> 
                    </div>
                <Bar
                    data={BarChartData}
                    width={100}
                    height={50}
                    options={{
                    maintainAspectRatio: false
                    }}
                />
                </div>
            </div>
        );    
    }
} 

const mapStateToProps = (state) => {
    return {
        tickets: state.tickets,
        halls: state.halls,
        date: state.dateInput,
        slots: state.reservedSlots,
    }
}

export default connect(mapStateToProps, {fetchTickets, fetchHalls, determineReservedSlots, })(Charts)