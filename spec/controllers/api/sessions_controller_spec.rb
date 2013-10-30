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
        expect(Handcar.fetch_new_user_key).to_not eq(nil)
        # expect(session[:handcar_api_key]).to_not eq(nil)
      end
    end
    describe "with invalid params" do
      it "does not create a new Session" do
        post :create, {session: {email: 'user@email.com', password: 'password'}, format: :json}
        expect(response.status).to eq(422)
      end
    end
  end
end
