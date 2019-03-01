import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from './utils';

export default class Appointment extends React.Component {
  constructor (props) {
  	super(props)
  	this.state = {
  	  appointment: props.appointment	
  	}
  }

  static propTypes = {
  	appointment: PropTypes.object.isRequired
  }

  static defaultProps = {
  	appointment: {} 
  }

  componentDidMount()
  { 
  	if (this.props.match){
	    $.ajax(
	    {
	  	  type: "GET",
	  	  url: `/appointments/${this.props.match.params.id}`,
	  	  dataType: "JSON"
	  	}
	  	).done((data) => {
	  	  this.setState({appointment: data});
	  	})
	  }  	

  }

  render () {
  	return (
  	  <div className = "appointment">
	    {/*Create a Link to this specific appointment*/}
	    <Link to={`/appointments/${this.state.appointment.id}`}>
	    {/*Shows the appointment description*/}
	    <h3>{this.state.appointment.title}</h3>
	    </Link>
	    {/*Format the date with this function located in utils.js*/}
	    <p>{formatDate(this.state.appointment.appt_time)}</p>
      <Link to={`/appointments/${this.state.appointment.id}/edit`}>
        Edit
        </Link>
	  </div>
  	)
  }

}

    
	  
	
