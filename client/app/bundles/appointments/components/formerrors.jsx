import React, { PropTypes } from 'react';

//This component receives an object with form errors (if any)
export const FormErrors = ({formErrors}) => 
<div>
  {/*Scroll through the object keys (fields)*/}
  {Object.keys(formErrors).map((formErrorField)=> {
    return (
      /*For each object key(field) scroll through the one or many errors*/	
  	  formErrors[formErrorField].map((error)=>{
  	  	/*Format the error message by showing field and error message*/
  	    return (<p>{formErrorField} {error}</p>)
  		}))
  })}

</div>

FormErrors.propTypes = {
 formErrors: PropTypes.object.isRequired	
}
