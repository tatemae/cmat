require "spec_helper"

describe Api::MapsController do
  describe "routing" do

    it "routes to #index" do
      get("/api/maps").should route_to("api/maps#index")
    end

    it "routes to #new" do
      get("/api/maps/new").should route_to("api/maps#new")
    end

    it "routes to #show" do
      get("/api/maps/1").should route_to("api/maps#show", :id => "1")
    end

    it "routes to #edit" do
      get("/api/maps/1/edit").should route_to("api/maps#edit", :id => "1")
    end

    it "routes to #create" do
      post("/api/maps").should route_to("api/maps#create")
    end

    it "routes to #update" do
      put("/api/maps/1").should route_to("api/maps#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/api/maps/1").should route_to("api/maps#destroy", :id => "1")
    end

  end
end
