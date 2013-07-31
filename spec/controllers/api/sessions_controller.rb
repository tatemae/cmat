require 'spec_helper'

describe Api::SessionsController do

  let(:valid_attributes) { { title: 'test' } }

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # SessionsController. Be sure to keep this updated too.
  let(:valid_session) { {} }

  describe "POST create" do
    describe "with valid params" do
      it "creates a new Session" do
        expect {
          post :create, {:session => valid_attributes, format: :json}, valid_session
        }.to change(Session, :count).by(1)
      end

      it "assigns a newly created session as @session" do
        post :create, {:session => valid_attributes, format: :json}, valid_session
        assigns(:session).should be_a(Session)
        assigns(:session).should be_persisted
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved session as @session" do
        # Trigger the behavior that occurs when invalid params are submitted
        Session.any_instance.stub(:save).and_return(false)
        post :create, {:session => { fake: "param" }, format: :json}, valid_session
        assigns(:session).should be_a_new(Session)
      end
    end
  end

  describe "DELETE destroy" do
    it "destroys the requested session" do
      session = Session.create! valid_attributes
      expect {
        delete :destroy, {:id => session.to_param, format: :json}, valid_session
      }.to change(Session, :count).by(-1)
    end
  end

end
