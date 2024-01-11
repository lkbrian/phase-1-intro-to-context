// Your code here
const createEmployeeRecord = ([firstName, familyName, title, payPerHour]) => {
    return {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  };
  
  const createEmployeeRecords = array => {
    return array.map(createEmployeeRecord);
  };
  
  const createTimeInEvent = (employeeRecord, date) => {
    let time = date.split(' ');
    const timeInEvent = {
      type: "TimeIn",
      date: time[0],
      hour: parseInt(time[1], 10)
    };
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
  };
  
  const createTimeOutEvent = (employeeRecord, date) => {
    let time = date.split(' ');
    const timeOutEvent = {
      type: "TimeOut",
      date: time[0],
      hour: parseInt(time[1], 10)
    };
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
  };
  
  const hoursWorkedOnDate = (employeeRecord, date) => {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return Math.round(hoursWorked);
  };
  
  let wagesEarnedOnDate = (employeeRecord, date) => {
    let wages = hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
    return parseFloat(wages.toString());
  };
  
  let allWagesFor = employeeRecord => {
    let dates = employeeRecord.timeInEvents.map(e => e.date);
    let pay = dates.reduce((totalWages, date) => {
      return totalWages + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
  
    return pay;
  };

  const calculatePayroll = employeeRecord => {
    return employeeRecord.reduce((elem,payment) => {
        return elem +allWagesFor(payment)
    },0)
  };
  