class AppointmentsController < ApplicationController
  before_action :authenticate_user!
  def index
  #Out of the same page, we load the appointment history
  #as well as a new appointment
  	@appointments = current_user.appointments.order('appt_time ASC')
  	@appointment = current_user.appointments.new
    render json: @appointments

  end
  
  def show
    @appointment = current_user.appointments.find(params[:id])
    
    render json: @appointment

  end
  
  def edit
    render :index
  end

  def update
    @appointment = current_user.appointments.find(params[:id])
    if @appointment.update(appointment_params)
      render json: @appointment
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end
  
  def create
    #Populate the appointment attributes sent by the React Post function
  	@appointment = current_user.appointments.new(appointment_params)
    #If it saves properly
    if @appointment.save
      #We render/return the appointment info as json back to React
      render json: @appointment
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end

  end

  def destroy
   #Populate the appointment attributes sent by the React Post function
    @appointment = current_user.appointments.find(params[:id])
    #If it saves properly
    if @appointment.destroy
      #We render/return the appointment info as json back to React
      head :no_content, status: :ok
    else
      render json: @appointment.errors, status: :unprocessable_entity
    end
  end

  private
    def appointment_params
    	params.require(:appointment).permit(:title,:appt_time)
    end
end
