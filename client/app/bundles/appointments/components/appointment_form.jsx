import React from 'react';
import Label from './label';
import Datetime from 'react-datetime';
export default class AppointmentForm extends React.Component{
  //This is the AppointmentForm component	

  //This is the function that handles change in the form
  handleChange(e){
  	const name = e.target.name;	//get the target name (target = input field)
    const obj = {}; //create an empty object
    obj[name] = e.target.value; //creates a key with the object name and value
    //Calls the callback function provided, which in turn
    //calls handleUserInput in the parent component
    this.props.onUserInput(obj); 

	}
	//Function that is called on form submission
	//Cancels the default behavior of the submit
	//And calls the callback function which in turn calls handleFormSubmit in parent component
	handleSubmit(e) {
	  e.preventDefault();
	  this.props.onFormSubmit();

	}
	//Function that sets the appointment date and time after it's changed
	setApptTime(e){
	  const name = 'appt_time'; //This will always be appt_time
	  const obj = {};	//create empty object
	  if(obj[name] = e.toDate()){	//Try to assign the date value to the name key
	  	this.props.onUserInput(obj)  //If successful, it will pass it to the callback
	  }

	}
  
  //This is what the component is actually rendering
  render() {
  	const  inputProps = {
  		name: 'appt_time'
  	};
    return(
	  <div>
	    <h2>Make a new appointment</h2>
	    <Label label= "Enter Date and Time of Appointment" />
	    {/*Create the form and call the handleSubmit on submit*/}
	    <form onSubmit={(event) => this.handleSubmit(event)}>
	      {/*Input for appointment title/description*/}
	      {/*when changed we call the handleChange function*/}
	      <input name='title' placeholder="Quick description" 
	      value={this.props.title}
	      onChange={(event) => this.handleChange(event)} />
		  {/*Input for appointment datetime*/}	      
		  {/*This is a DateTime React component from datetime-react*/}	      
		  {/*We dont want it as an input field input={false} */}	      
		  {/*But rather as an opened calendar open={true} */}
		  {/*We pass the input name as inputProps */}	      	      
		  {/*We call setApptTime when input is changed */}	      	      
	      <Datetime inputProps={inputProps} value={this.props.appt_time}
	       input={false} open={true} onChange={(event) =>this.setApptTime(event)} />
	      <input type="submit" value="Save Appointment" className="submit-button"/>
	    </form>
	  </div>  
  	)
  }
}
