import React from 'react';
import { Appointment } from './appointment';
//This is a named export (const not a class)
export const AppointmentList = ({appointments}) => 
  //This is the appointment list component
    
  //This is what the Component actually renders
  	  <div>
  	    {/*We take the appointment list passed from the parent component*/}
  	    {/*And map(iterate) through them and for each appointment*/}
  	    {/*we render the Appointment component, passing it the appointment info*/}
  	    {/*And also set a unique key required by React. We use the appointment unique id*/}
  	    {appointments.map(function(appointment){
  	      return (<Appointment appointment={appointment} key={appointment.id} />)
  	    })}  
  	  </div>
  	



