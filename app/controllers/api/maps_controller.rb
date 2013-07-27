class Api::MapsController < ApplicationController

  respond_to :json

  skip_before_filter :verify_authenticity_token
  #before_filter :authenticate_user!, only: [:create, :destroy, :update]
  before_action :set_map, only: [:show, :update, :destroy]

  def index
    if params[:user_id]
      @maps = User.find(params[:user_id]).maps
    else
      @maps = Map.all
    end
    respond_with(@maps)
  end

  def show
    respond_with(@map)
  end

  def create
    @map = Map.create!(map_params)
    respond_with(@map, location: api_map_url(@map))
  end

  def update
    @map.update(map_params)
    respond_with(@map)
  end

  def destroy
    @map.destroy
    respond_with(@map)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_map
      @map = Map.find(params[:id])
    end

    def map_params
      params.require(:map).permit(:title, :payload)
    end

end
