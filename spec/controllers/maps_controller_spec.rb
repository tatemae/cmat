require 'spec_helper'

describe Api::MapsController do

  # This should return the minimal set of attributes required to create a valid
  # Api::Map. As you add validations to Api::Map, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) { { title: 'foo' } }

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # Api::MapsController. Be sure to keep this updated too.
  let(:valid_session) { {} }

  describe "GET index" do
    it "assigns all api_maps as @api_maps" do
      map = Map.create! valid_attributes
      get :index, {format: :json}, valid_session
      assigns(:maps).should eq([map])
    end
  end

  describe "GET show" do
    it "assigns the requested api_map as @api_map" do
      map = Map.create! valid_attributes
      get :show, {:id => map.to_param, format: :json}, valid_session
      assigns(:map).should eq(map)
    end
  end

  describe "POST create" do
    describe "with valid params" do
      it "creates a new Map" do
        expect {
          post :create, {:map => valid_attributes, format: :json}, valid_session
        }.to change(Map, :count).by(1)
      end

      it "assigns a newly created map as @map" do
        post :create, {:map => valid_attributes, format: :json}, valid_session
        assigns(:map).should be_a(Map)
        assigns(:map).should be_persisted
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved map as @map" do
        # Trigger the behavior that occurs when invalid params are submitted
        Map.any_instance.stub(:save).and_return(false)
        post :create, {:map => { fake: "param" }, format: :json}, valid_session
        assigns(:map).should be_a_new(Map)
      end
    end
  end

  describe "PUT update" do
    describe "with valid params" do
      it "updates the requested map" do
        map = Map.create! valid_attributes
        # Assuming there are no other api_maps in the database, this
        # specifies that the Map created on the previous line
        # receives the :update_attributes message with whatever params are
        # submitted in the request.
        Map.any_instance.should_receive(:update).with({ "title" => "a title" })
        put :update, {:id => map.id, :map => { "title" => "a title" }, format: :json}, valid_session
      end

      it "assigns the requested map as @map" do
        map = Map.create! valid_attributes
        put :update, {:id => map.to_param, :map => valid_attributes, format: :json}, valid_session
        assigns(:map).should eq(map)
      end
    end

    describe "with invalid params" do
      it "assigns the map as @map" do
        map = Map.create! valid_attributes
        # Trigger the behavior that occurs when invalid params are submitted
        Map.any_instance.stub(:save).and_return(false)
        put :update, {:id => map.id, :map => { fake: "param" }, format: :json}, valid_session
        assigns(:map).should eq(map)
      end
    end
  end

  describe "DELETE destroy" do
    it "destroys the requested map" do
      map = Map.create! valid_attributes
      expect {
        delete :destroy, {:id => map.to_param, format: :json}, valid_session
      }.to change(Map, :count).by(-1)
    end
  end

end
