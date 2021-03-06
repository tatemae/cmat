require 'handcar/handcar'

class Api::SessionsController < ApplicationController

  skip_before_filter :verify_authenticity_token

  respond_to :json

  def create
    user = User.find_for_database_authentication(email: session_params[:email])
    if user && user.valid_password?(session_params[:password])
      sign_in user
      key = Handcar.fetch_user_key
      cookies[:handcar_api_key] = {value: key}
      render json: user, serializer: UserSerializer, status: :created
    else
      render json: {
        errors: {
          message: "Invalid email or password",
          email: true,
          password: true
        }
      }, status: :unprocessable_entity
    end
  end

  def destroy
    cookies.delete :handcar_api_key
    sign_out
    render json: {}, status: :accepted
  end

  private

    def session_params
      params.require(:session).permit(:email, :password)
    end

end
