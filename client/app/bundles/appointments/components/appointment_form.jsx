import React, { PropTypes } from 'react';
import Label from './label';
import Datetime from 'react-datetime';
import moment from 'moment';
import { validations } from './validations';
import { FormErrors } from './formerrors';
import update from 'immutability-helper';

export default class AppointmentForm extends React.Component{
  static propTypes = {
    handleNewAppointment: PropTypes.func
  }	

  constructor(props, _railsContext){
    super(props)
  	this.state = {
  	  title: {value: '', valid: false},  // title's value and valid state
  	  appt_time: {value: new Date(), valid: false}, // date and time value and valid state
      formErrors: {},
      formValid: false,
      editing: false
  	}
  }
  
  static formValidations = {
    title: [(s) => {return(validations.checkMinLength(s,3))}],
    appt_time: [(t) => {return(validations.timeShouldBeFuture(t))}]
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
	  	 this.setState({
	  	   title: {value: data.title, valid: true},
	  	   appt_time: {value: data.appt_time, valid: true},
         editing: this.props.match.path === '/appointments/:id/edit'
	  	  });
	  	});
	  }  	

  }	

  //This function handles the form submission
  //It creates an appointment params object from the attributes state
  //And then Posts the info to the /appointments endpoint (our appointments controller)
  //Once done, it calls the addNewAppointment function with the returned json 
  //from the controller
  handleFormSubmit = (e) =>{
  	e.preventDefault();
  	this.state.editing ? this.updateAppointment() : this.addAppointment();
  	}
    

  deleteAppointment = () =>{
    if (confirm("Are you sure you want to delete this appointment?")){
    $.ajax({
      type: "DELETE",
      url: `/appointments/${this.props.match.params.id}`
     }).done((data) => {
      
      this.props.history.push('/');
      this.resetFormErrors();
     })
     .fail((response) =>{
      console.log('appointment deleting failed');
   });
   }
  }  
  updateAppointment() {
  	const appointment = {title: this.state.title.value, appt_time: this.state.appt_time.value};
   $.ajax({
        type: 'PATCH',
   	    url: `/appointments/${this.props.match.params.id}`,
   	    data: {appointment: appointment}
   	    })
        .done((data) =>{
          this.props.history.push('/');
          this.resetFormErrors();
          })
        .fail((response) => {this.setState({formErrors: response.responseJSON, 
          formValid: false})
        });
          //If it fails, we set the forms errors object to the Json response we got
  }

  addAppointment () {
  	const appointment = {title: this.state.title.value, appt_time: this.state.appt_time.value};
   $.post('/appointments',
          {appointment: appointment})
          .done((data) =>{
            this.props.handleNewAppointment(data); //Add new appoitment on screen
            this.resetFormErrors(); //Resets the form errors
          })
          .fail((response) => {this.setState({formErrors: response.responseJSON, 
          	formValid: false})
           });
          //If it fails, we set the forms errors object to the Json response we got

  }

  resetFormErrors() {
    this.setState({formErrors: {}} );
  }

  //This function updates the state of the attriubutes
  handleUserInput = (fieldName, fieldValue, validations) => {
    //This creates a new state for the value of the changed field
  	const newFieldState = update(this.state[fieldName], 
      {value: {$set: fieldValue}});
    //This actually sets the state for that attribute (value) and calls
    //the validation function
    this.setState({[fieldName]: newFieldState},
     () => this.validateField(fieldName,fieldValue,validations) );
  }

  validateField (fieldName,fieldValue,validations){
    let fieldValid;
    let fieldErrors = validations.reduce((errors, v) => {
      let e = v(fieldValue);
      if(e !== ''){
        errors.push(e);
      }
      return(errors);
    },[]);
    //Loop through the validations

    fieldValid = fieldErrors.length === 0;
    
    //Creates the new field state for the field valid attribute
    const newFieldState = update(this.state[fieldName],
                          {valid: {$set: fieldValid}});
    const newFormErrors = update(this.state.formErrors,
                          {$merge: {[fieldName] : fieldErrors}});
    //Sets the state and in turn call the validateForm function
    //which will set the state of our button
    this.setState({[fieldName]: newFieldState,
      formErrors: newFormErrors}, this.validateForm);
  }

  validateForm() {
    //this function sets the state of formValid which is then read
    //by the button to set its disabled feature
    this.setState({formValid: this.state.title.valid &&
                  this.state.appt_time.valid });
  }
    //This is the function that handles change in the form
    handleChange = (e) => {
  	const fieldName = e.target.name;	//get the target name (target = input field)
    const fieldValue = e.target.value; //get the target value
    //Calls the callback function provided, which in turn
    //calls handleUserInput in the parent component
    this.handleUserInput(fieldName, fieldValue,
    	AppointmentForm.formValidations[fieldName]); 

	}
	
	//Function that sets the appointment date and time after it's changed
	setApptTime = (e) =>{
	  const fieldName = 'appt_time'; //This will always be appt_time
	  const fieldValue = e.toDate();
	  this.handleUserInput(fieldName, fieldValue,
	  AppointmentForm.formValidations[fieldName]);  //If successful, it will pass it to the callback
	  

	}
  
  //This is what the component is actually rendering
  render() {
  	const  inputProps = {name: 'appt_time'};
    return(
	  <div>
    <h2>
      {this.state.editing ?
       'Edit appointment' : 'Make a new appointment'}
	    </h2>
	    <FormErrors formErrors={this.state.formErrors} />
	    <Label label= "Enter Date and Time of Appointment" />
	    {/*Create the form and call the handleSubmit on submit*/}
	    <form onSubmit={this.handleFormSubmit}>
	      {/*Input for appointment title/description*/}
	      {/*when changed we call the handleChange function*/}
	      <input name='title' placeholder="Quick description" 
	      
	      value={this.state.title.value}
	      onChange={this.handleChange} />
	      
		  {/*Input for appointment datetime*/}	      
		  {/*This is a DateTime React component from datetime-react*/}	      
		  {/*We dont want it as an input field input={false} */}	      
		  {/*But rather as an opened calendar open={true} */}
		  {/*We pass the input name as inputProps */}	      	      
		  {/*We call setApptTime when input is changed */}	      	      
	      <Datetime inputProps={inputProps} 
	      value={moment(this.state.appt_time.value)}
	       input={false} open={true} 
	       onChange={this.setApptTime} />
	      <input type="submit" value={this.state.editing ? 'Update Appointment' : 'Save Appointment'}
	        className="submit-button" disabled={!this.state.formValid}/>
	    </form>
      {this.state.editing && (
        <p>
          <button onClick={this.deleteAppointment}>
          Delete Appointment
          </button>
        </p>
      )
      }
	  </div>  
  	)
  }
}
