var Appointment = createReactClass({
  //This is the Appointment component. It renders one signe appointment
  //The props.appointment was passed from the AppointmentList parent component
  //displayName is important for dev tools
  displayName: 'Appointment',
  //This is what the component actually renders
  render: function() {
    return(
	  <div>
	    {/*Shows the appointment description*/}
	    <h3>{this.props.appointment.title}</h3>
	    {/*Format the date with this function located in utils.js*/}
	    <p>{formatDate(this.props.appointment.appt_time)}</p>
	  </div>
	)
	}
});

