class Api::MapsController < ApplicationController

  respond_to :json

  skip_before_filter :verify_authenticity_token
  #before_filter :authenticate_user!, only: [:create, :destroy, :update]
  before_action :set_map, only: [:show, :update, :destroy]

  def index
    if params[:user_id]
      @maps = User.find(params[:user_id]).maps.by_newest
    else
      @maps = []
    end
    respond_with(:api, @maps)
  end

  def show
    respond_with(:api, @map)
  end

  def create
    if current_user
      @map = current_user.maps.create(map_params)
    else
      @map = Map.create(map_params)
    end
    respond_with(:api, @map)
  end

  def update
    @map.update(map_params)
    respond_with(:api, @map)
  end

  def destroy
    @map.destroy
    respond_with(:api, @map)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_map
      @map = Map.find(params[:id])
    end

    def map_params
      params.require(:map).permit(:title, :payload, :user_id)
    end

end
