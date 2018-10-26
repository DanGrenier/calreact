import moment from 'moment'

//Utilities library
//Format Date function that uses the moment.js library to format 
//our appointment date properly
export const formatDate = function(d){
	return moment(d).format('MMMM DD YYYY , h:mm:ss a');
}