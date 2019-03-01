import React, { PropTypes } from 'react';
import { AppointmentList }from './appointment_list'; //In curly braces because its a named export
import AppointmentForm from './appointment_form';
import update from 'immutability-helper';

//import { validations } from './validations';

import moment from 'moment';
export default class Appointments extends React.Component{
  static propTypes = {
   appointments: PropTypes.array.isRequired 
  }

  static defaultProps = {
    appointments: []
  }

  //Calling the constructor to set the initial state for the component attributes
  constructor(props, _railsContext){
    super(props)
  	this.state = {
  	  appointments: this.props.appointments   //List of appointments from Rails/View
  	  
  	}
  }


  componentDidMount()
  { 
    if (this.props.match){
      $.ajax(
      {
        type: "GET",
        url: '/appointments',
        dataType: "JSON"
      }
      ).done((data) => {
        this.setState({appointments: data});
      });
  }   

  }
  
  //This is the function that will add this new appointment to our appointment list
  //Without having to refresh the page or reload data from the database
  addNewAppointment = (appointment) =>{
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
      {/*We show form errors if any*/}
    
      {/*Comments inside a rendered React component must be formatted like so*/}
      {/*Render our form component and assign title and appt_time to current state */}
      {/*Create callback functions onUserInput and onFormSubmit and tie them to local functions*/}
		  <AppointmentForm handleNewAppointment ={this.addNewAppointment}/>
      {/*Render the appointment list component and pass it the list of appointments*/}
		  <AppointmentList appointments={this.state.appointments} />
		</div>
  	  )
	}
}
