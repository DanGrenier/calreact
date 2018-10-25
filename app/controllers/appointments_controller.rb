class AppointmentsController < ApplicationController
  def index
  #Out of the same page, we load the appointment history
  #as well as a new appointment
  	@appointments = Appointment.order('appt_time ASC')
  	@appointment = Appointment.new
  end

  def create
    #Populate the appointment attributes sent by the React Post function
  	@appointment = Appointment.new(appointment_params)
    #If it saves properly
    if @appointment.save
      #We render/return the appointment info as json back to React
      render json: @appointment
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  	
  end

  private
    def appointment_params
    	params.require(:appointment).permit(:title,:appt_time)
    end
end
