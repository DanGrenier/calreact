var Appointments = createReactClass({
  displayName: 'Appointments',
  getInitialState: function(){
  	return{
  	  appointments: this.props.appointments,
  	  title: 'Team Meeting',
  	  appt_time: '25 January 2018 9am'
  	}
  },
  handleFormSubmit: function(){
    var appointment = {title: this.state.title, appt_time: this.state.appt_time};
   $.post('/appointments',
          {appointment: appointment})
          .done(function(data){
            this.addNewAppointment(data);
          }.bind(this));

  },
  handleUserInput: function(obj){
  	console.log(obj)
  	this.setState(obj);
  },
  addNewAppointment: function(appointment){
    var appointments = React.addons.update(this.state.appointments, {$push: [appointment]});
    this.setState({appointments: appointments.sort(function(a,b){
      return new Date(a.appt_time) - new Date(b.appt_time);
    })
  });

  },
  render: function() {
	return(
		<div>
		  <AppointmentForm title = {this.state.title}
		  appt_time = {this.state.appt_time}
		  onUserInput={this.handleUserInput}
      onFormSubmit={this.handleFormSubmit} />
		  <AppointmentList appointments={this.state.appointments} />
		</div>
  	  )
	}
});
