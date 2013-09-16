class Api::UsersController < ApplicationController

  respond_to :json

  skip_before_filter :verify_authenticity_token
  before_action :set_user, only: [:show, :update]

  def show
    respond_with(:api, @user)
  end

  def create
    @user = User.create(user_params)
    sign_in @user if @user.errors.blank?
    respond_with(:api, @user)
  end

  def update
    @user.update(user_params)
    respond_with(:api, @user)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      if params[:id] == 'current'
        @user = current_user
      else
        @user = User.find(params[:id])
      end
    end

    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation, :name)
    end

end
