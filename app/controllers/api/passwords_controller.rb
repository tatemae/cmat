class Api::PasswordsController < ApplicationController

  respond_to :json

  def create
    @user = User.send_reset_password_instructions(password_params)
    respond_with(:api, @user)
  end

  private

    def password_params
      params.require(:user).permit(:email)
    end

end