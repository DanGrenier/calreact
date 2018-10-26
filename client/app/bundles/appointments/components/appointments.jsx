import React from 'react';
import AppointmentForm from './appointment_form';
import { AppointmentList }from './appointment_list'; //In curly braces because its a named export
import update from 'immutability-helper';
export default class Appointments extends React.Component{

  //Calling the constructor to set the initial state for the component attributes
  constructor(props, _railsContext){
    super(props)
  	this.state = {
  	  appointments: this.props.appointments,   //List of appointments from Rails/View
  	  title: '',
  	  appt_time: ''
  	}
  }
  //This function handles the form submission
  //It creates an appointment params object from the attributes state
  //And then Posts the info to the /appointments endpoint (our appointments controller)
  //Once done, it calls the addNewAppointment function with the returned json 
  //from the controller
  handleFormSubmit(){
    const appointment = {title: this.state.title, appt_time: this.state.appt_time};
   $.post('/appointments',
          {appointment: appointment})
          .done((data) =>{
            this.addNewAppointment(data);
          });

  }
  //This function updates the state of the attriubutes
  handleUserInput(obj){
  	this.setState(obj);
  }
  //This is the function that will add this new appointment to our appointment list
  //Without having to refresh the page or reload data from the database
  addNewAppointment(appointment){
    //create a new appointment list by making a copy of the current one
    //and then pushing the new appointment into this array using the Reac addons
    const appointments = update(this.state.appointments, {$push: [appointment]});
    //Set new state of appointments attribute by sorting that new appointment list
    this.setState({appointments: appointments.sort(function(a,b){
      return new Date(a.appt_time) - new Date(b.appt_time);
    })
  });

  }
  //This is what the component is actually rendering
  render() {
	return(
    //React components MUST be enclosed between an html tag
		<div>
      {/*Comments inside a rendered React component must be formatted like so*/}
      {/*Render our form component and assign title and appt_time to current state */}
      {/*Create callback functions onUserInput and onFormSubmit and tie them to local functions*/}
		  <AppointmentForm title = {this.state.title}
		  appt_time = {this.state.appt_time}
		  onUserInput={(obj)=>this.handleUserInput(obj)}
      onFormSubmit={()=>this.handleFormSubmit()} />
      {/*Render the appointment list component and pass it the list of appointments*/}
		  <AppointmentList appointments={this.state.appointments} />
		</div>
  	  )
	}
}
