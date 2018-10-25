const Appointment = ({appointment}) =>
  //This is the Appointment component. It renders one signe appointment
  //The props.appointment was passed from the AppointmentList parent component
  //This is what the component actually renders
    
	  <div>
	    {/*Shows the appointment description*/}
	    <h3>{appointment.title}</h3>
	    {/*Format the date with this function located in utils.js*/}
	    <p>{formatDate(appointment.appt_time)}</p>
	  </div>
	

