var Appointment = createReactClass({
  displayName: 'Appointment',
  render: function() {
    return(
	  <div>
	    <h3>{this.props.appointment.title}</h3>
	    <p>{formatDate(this.props.appointment.appt_time)}</p>
	  </div>
	)
	}
});

