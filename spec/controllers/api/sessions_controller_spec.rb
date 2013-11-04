require 'spec_helper'
require 'handcar/handcar'

describe Api::SessionsController do

  describe "POST create" do
    describe "with valid params" do
      let(:user) {FactoryGirl.create(:user)}
      it "creates a new Session" do
        post :create, {session: {email: user.email, password: user.password}, format: :json}
        expect(response.status).to eq(201)
      end
      it "puts a users handcar api key in the session" do
        post :create, {session: {email: user.email, password: user.password}, format: :json}
        expect(cookies[:handcar_api_key][0..8]).to eq("AGENT_KEY")
      end
    end
    describe "with invalid params" do
      it "does not create a new Session" do
        post :create, {session: {email: 'user@email.com', password: 'password'}, format: :json}
        expect(response.status).to eq(422)
      end
    end
    describe "DELETE destroy" do
      let(:user) {FactoryGirl.create(:user)}
      it "removes the handcar api cookie" do
        expect(cookies[:handcar_api_key]).to eq(nil)
        post :create, {session: {email: user.email, password: user.password}, format: :json}
        expect(cookies[:handcar_api_key][0..8]).to eq("AGENT_KEY")
        delete :destroy, id: 'foo'
        expect(cookies[:handcar_api_key]).to eq(nil)
      end
    end
  end
end
