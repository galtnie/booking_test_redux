addingHoursIntoReservation(time1, time2, hall_id, title, newSlotsArray) {
    let date = time1.getDate()
    let fullDate = date.toString().length === 2 ? date : "0" + date;
    let fullMonth = (time1.getMonth() + 1).toString().length === 2 ? (time1.getMonth() + 1) : "0" + (time1.getMonth() + 1);
    let fullYear = time1.getYear().toString().slice(1)
    let hour = time1.getHours()
    let fullHour = String(hour).length === 1 ? "0" + hour : hour;
    let arraysHallsID = this.state.halls.map(i => i._id)
    let hallNumber = arraysHallsID.indexOf(hall_id)
    let slotId = `date:${fullDate}${fullMonth}${fullYear}hour:${fullHour}colour:${this.state.colours[hallNumber]}title:${title}` 
    newSlotsArray = [...newSlotsArray, slotId]
    let firstHour = time1.getHours()
    let secondHour = time2.getHours()

    if (firstHour < secondHour) {
      let nextHour = new Date(time1.setTime(time1.getTime() + (60 * 60 * 1000)))
      newSlotsArray = [...newSlotsArray, ...this.addingHoursIntoReservation(nextHour, time2, hall_id, title, newSlotsArray)]
    }
    return newSlotsArray
  }

  addingDaysIntoReservation(time1, time2, hall_id, title, newSlotsArray) {
    if (time1 < time2 &&
      (time1.getDate() !== time2.getDate() ||
        time1.getMonth() !== time2.getMonth() ||
        time1.getYear() !== time2.getYear()
      )) {

      let sameDayLastHour = new Date(time1.getTime())
      sameDayLastHour = new Date(sameDayLastHour.setHours(23))
      newSlotsArray = [...newSlotsArray, ...this.addingHoursIntoReservation(time1, sameDayLastHour, hall_id, title, newSlotsArray)]

      let tomorrow = this.calculateDate(time1, 1).dateObject
      tomorrow = new Date(tomorrow.setHours(0))
      newSlotsArray = [...newSlotsArray, ...this.addingHoursIntoReservation(tomorrow, time2, hall_id, title, newSlotsArray)]
      return newSlotsArray
    } else {
      newSlotsArray = [...newSlotsArray, ...this.addingHoursIntoReservation(time1, time2, hall_id, title, newSlotsArray)]
      return newSlotsArray
    }
  }

  calculateSlotsReserved() {
    let newReservedSlotsArray = this.state.slotsReserved === undefined ? [] :  this.state.slotsReserved

    for (let i = 0; i < this.state.tickets.length; i++) {
      let fromTime = new Date(this.state.tickets[i].from)
      let toTime = new Date(this.state.tickets[i].to)
      let title = this.state.tickets[i].title

      if (toTime < new Date()) { continue }
      else if (fromTime !== toTime && fromTime < toTime) {
        fromTime = new Date (new Date(new Date(fromTime.setMilliseconds(0)).setSeconds(0)).setMinutes(0))
        toTime = new Date (new Date(new Date(toTime.setMilliseconds(0)).setSeconds(0)).setMinutes(0))

      let dayChosenStart = (new Date(new Date(new Date(new Date (this.state.dayChosen).setHours(0)).setMinutes(0)).setSeconds(0)).setMilliseconds(0))-5
      let dayChosenEnd = (new Date(new Date(new Date(new Date (this.state.dayChosen).setHours(23)).setMinutes(59)).setSeconds(59)).setMilliseconds(999))+5

        if ((fromTime <= dayChosenStart && toTime >= dayChosenStart) || 
        (fromTime >= dayChosenStart && toTime <= dayChosenEnd) || 
        (fromTime <= dayChosenEnd && toTime >= dayChosenEnd )) {
          
          newReservedSlotsArray = [...newReservedSlotsArray, ...this.addingDaysIntoReservation(fromTime, toTime, this.state.tickets[i].hall_id, title, newReservedSlotsArray)]            
        
        
        
        
        
        
        
        }       
      }      
    }