require 'spec_helper'

describe "Maps" do
  describe "GET /maps" do
    it "retrieves an collection of maps" do
      Map.create! title: 'foo1'
      Map.create! title: 'foo2'
      get api_maps_path format: :json
      expect(JSON.parse(response.body)['maps'].count).to eq(2)
    end
  end

  describe "GET /maps/:id" do
    it "retrieves a map" do
      @map = Map.create! title: 'foo'
      get api_map_path(@map.id), format: :json
      expect(JSON.parse(response.body)['id']).to eq(@map.id)
    end
  end

  describe "POST /maps" do
    it "creates a map" do
      post api_maps_path, map: { title: "foo" }, format: :json
      expect(JSON.parse(response.body)['title']).to eq('foo')
    end
  end

  describe "DELETE /maps/:id" do
    it "deletes a map" do
      Map.create! title: 'foo'
      @map = Map.create! title: 'foo2'
      expect{delete api_map_path(@map.id), format: :json}.to change{Map.all.count}.by(-1)
    end
  end

  describe "PUT /maps/:id" do
    it "updates a map" do
      map = Map.create! title: 'foobar'
      put api_map_path(map.id), map: { title: 'bar', cargo: "hold" }, format: :json
      expect(map.reload.title).to eq('bar')
    end
  end
end
