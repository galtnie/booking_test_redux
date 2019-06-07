import React from 'react';
import { connect } from 'react-redux';
import UpperBar from './components/UpperBar';
import Title from './components/Title'
// import { Chart } from "react-google-charts";
import { Doughnut, Line, Radar } from 'react-chartjs-2';
import { fetchTickets, fetchHalls, determineReservedSlots } from './actions';
import { calculateReservedSlots, convertToUKdate, convertTimeIntoMonth } from './functions'



class Charts extends React.Component {
    
    
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

    calculateLabelsForChart2 (time){
        let arr = []
        for (let i = 0; i < convertTimeIntoMonth(time).days; i++) {
            arr.push(i+1)
        }
        return arr
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
        

        // ive got initial time span and end time span
        // array of tickets per halls


        for (let j = 0; j < sortedTicketsPerHalls.length; j++)
            for(let i = 0; i < sortedTicketsPerHalls[j].tickets.length; i++) {

            if (sortedTicketsPerHalls[j].tickets.to < start || sortedTicketsPerHalls[j].tickets[i].from > end ) {
                sortedTicketsPerHalls[j].tickets.splice(i, 1); 
                i--;
            }

            if (sortedTicketsPerHalls[j].tickets[i].from < start && sortedTicketsPerHalls[j].tickets[i].to > start) {
                sortedTicketsPerHalls[j].tickets[i].from = start
            }

            if (sortedTicketsPerHalls[j].tickets[i].from < end && sortedTicketsPerHalls[j].tickets[i].to > end) {
                sortedTicketsPerHalls[j].tickets[i].to = end
            }
        }

        console.log(sortedTicketsPerHalls)

    }


    render() {
        const data2 = {
            labels: this.calculateLabelsForChart2(this.props.date),
            datasets: [
              {
                label: this.props.halls[0].title,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(108, 92, 231, 0.9)',
                borderColor: 'rgba(108, 92, 231, 1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(108, 92, 231, 1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(108, 92, 231, 1)',
                pointHoverBorderColor: 'rgba(108, 92, 231, 1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40]
              },

              {
                label: this.props.halls[1].title,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(19, 55, 11, 0.8)',
                borderColor: 'rgba(19, 55, 11, 0.9)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(19, 55, 11, 0.9)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(19, 55, 11, 0.9)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [10, 23, 80, 81, 56, 55, 40]
              },

              {
                label: this.props.halls[2].title,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(178, 34, 34, 0.9)',
                borderColor: 'rgba(178, 34, 34, 1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(178, 34, 34, 1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(178, 34, 34, 1)',
                pointHoverBorderColor: 'rgba(178, 34, 34, 1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [20, 13, 70, 51, 5, 51, 20]
              },

              {
                label: this.props.halls[3].title,
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(18, 11, 120, 0.8)',
                borderColor: 'rgba(18, 11, 120, 0.9)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(18, 11, 120, 0.9)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(18, 11, 120, 0.9)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [100, 23, 80, 81, 56, 55, 40]
              }
            ]
        };

        const chart1data = {
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

        this.calculateTimeUsedPerMonth(this.props.date, this.props.tickets, this.props.halls)

        return(
            <div>
                <UpperBar />
                <Title />
                
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    

                }}>
                    <p style={{ textAlign:'center',  fontSize:'1.5em', marginTop: '2em', marginBottom: '1em' }}>
                        Halls Use on <b>{(convertToUKdate(this.props.date).slice(0, -7))}</b> 
                    </p>
                    <Doughnut 
                        data={chart1data}
                        width={100}
                        height={200}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>


                <div>
                    <p style={{ textAlign:'center',  fontSize:'1.5em', marginTop: '2em', marginBottom: '1em' }}>
                        All Halls Use per <b>{(convertToUKdate(this.props.date).slice(0, -7))}</b> 
                    </p>
                    <Line data={data2} />
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