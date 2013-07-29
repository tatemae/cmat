require 'spec_helper'

describe Api::MapsController do

  let(:valid_attributes) { { title: 'test' } }

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # MapsController. Be sure to keep this updated too.
  let(:valid_session) { {} }

  describe "GET index" do
    it "assigns all api_maps as @maps" do
      map = Map.create! valid_attributes
      get :index, {}, valid_session
      assigns(:api_maps).should eq([map])
    end
  end

  describe "GET show" do
    it "assigns the requested api_map as @map" do
      map = Map.create! valid_attributes
      get :show, {:id => map.to_param}, valid_session
      assigns(:api_map).should eq(map)
    end
  end

  describe "POST create" do
    describe "with valid params" do
      it "creates a new Map" do
        expect {
          post :create, {:api_map => valid_attributes}, valid_session
        }.to change(Map, :count).by(1)
      end

      it "assigns a newly created api_map as @map" do
        post :create, {:api_map => valid_attributes}, valid_session
        assigns(:api_map).should be_a(Map)
        assigns(:api_map).should be_persisted
      end

      it "redirects to the created api_map" do
        post :create, {:api_map => valid_attributes}, valid_session
        response.should redirect_to(Map.last)
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved api_map as @map" do
        # Trigger the behavior that occurs when invalid params are submitted
        Map.any_instance.stub(:save).and_return(false)
        post :create, {:api_map => {  }}, valid_session
        assigns(:api_map).should be_a_new(Map)
      end

      it "re-renders the 'new' template" do
        # Trigger the behavior that occurs when invalid params are submitted
        Map.any_instance.stub(:save).and_return(false)
        post :create, {:api_map => {  }}, valid_session
        response.should render_template("new")
      end
    end
  end

  describe "PUT update" do
    describe "with valid params" do
      it "updates the requested api_map" do
        map = Map.create! valid_attributes
        # Assuming there are no other api_maps in the database, this
        # specifies that the Map created on the previous line
        # receives the :update_attributes message with whatever params are
        # submitted in the request.
        Map.any_instance.should_receive(:update).with({ "these" => "params" })
        put :update, {:id => map.to_param, :api_map => { "these" => "params" }}, valid_session
      end

      it "assigns the requested api_map as @map" do
        map = Map.create! valid_attributes
        put :update, {:id => map.to_param, :api_map => valid_attributes}, valid_session
        assigns(:api_map).should eq(map)
      end

      it "redirects to the api_map" do
        map = Map.create! valid_attributes
        put :update, {:id => map.to_param, :api_map => valid_attributes}, valid_session
        response.should redirect_to(map)
      end
    end

    describe "with invalid params" do
      it "assigns the api_map as @map" do
        map = Map.create! valid_attributes
        # Trigger the behavior that occurs when invalid params are submitted
        Map.any_instance.stub(:save).and_return(false)
        put :update, {:id => map.to_param, :api_map => {  }}, valid_session
        assigns(:api_map).should eq(map)
      end

      it "re-renders the 'edit' template" do
        map = Map.create! valid_attributes
        # Trigger the behavior that occurs when invalid params are submitted
        Map.any_instance.stub(:save).and_return(false)
        put :update, {:id => map.to_param, :api_map => {  }}, valid_session
        response.should render_template("edit")
      end
    end
  end

  describe "DELETE destroy" do
    it "destroys the requested api_map" do
      map = Map.create! valid_attributes
      expect {
        delete :destroy, {:id => map.to_param}, valid_session
      }.to change(Map, :count).by(-1)
    end

    it "redirects to the api_maps list" do
      map = Map.create! valid_attributes
      delete :destroy, {:id => map.to_param}, valid_session
      response.should redirect_to(api_maps_url)
    end
  end

end
