var AppointmentForm = createReactClass({
  //This is the AppointmentForm component	

  //This is the function that handles change in the form
  handleChange: function(e){
  	var name = e.target.name;	//get the target name (target = input field)
    obj = {}; //create an empty object
    obj[name] = e.target.value; //creates a key with the object name and value
    //Calls the callback function provided, which in turn
    //calls handleUserInput in the parent component
    this.props.onUserInput(obj); 

	},
	//Function that is called on form submission
	//Cancels the default behavior of the submit
	//And calls the callback function which in turn calls handleFormSubmit in parent component
	handleSubmit: function(e) {
	  e.preventDefault();
	  this.props.onFormSubmit();

	},
	//Function that sets the appointment date and time after it's changed
	setApptTime: function(e){
	  var name = 'appt_time'; //This will always be appt_time
	  var obj = {};	//create empty object
	  if(obj[name] = e.toDate()){	//Try to assign the date value to the name key
	  	this.props.onUserInput(obj)  //If successful, it will pass it to the callback
	  }

	},
  //display name is important for dev tools purpose	
  displayName: 'AppointmentForm',
  //This is what the component is actually rendering
  render: function() {
  	var inputProps = {
  		name: 'appt_time'
  	};
    return(
	  <div>
	    <h2>Make a new appointment</h2>
	    {/*Create the form and call the handleSubmit on submit*/}
	    <form onSubmit={this.handleSubmit}>
	      {/*Input for appointment title/description*/}
	      {/*when changed we call the handleChange function*/}
	      <input name='title' placeholder="Quick description" 
	      value={this.props.title}
	      onChange={this.handleChange} />
		  {/*Input for appointment datetime*/}	      
		  {/*This is a DateTime React component from datetime-react*/}	      
		  {/*We dont want it as an input field input={false} */}	      
		  {/*But rather as an opened calendar open={true} */}
		  {/*We pass the input name as inputProps */}	      	      
		  {/*We call setApptTime when input is changed */}	      	      
	      <Datetime inputProps={inputProps} value={this.props.appt_time}
	       input={false} open={true} onChange={this.setApptTime} />
	      <input type="submit" value="Save Appointment" className="submit-button"/>
	    </form>
	  </div>  
  	)
  }
});
