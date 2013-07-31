require 'spec_helper'

describe Api::UsersController do

  let(:valid_attributes) { { email: 'testguy@example.com', password: 'password', name: 'test guy' } }

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # UsersController. Be sure to keep this updated too.
  let(:valid_session) { {} }

  describe "GET show" do
    it "assigns the requested user as @user" do
      user = User.create! valid_attributes
      get :show, {:id => user.to_param, format: :json}, valid_session
      assigns(:user).should eq(user)
    end
  end

  describe "POST create" do
    describe "with valid params" do
      it "creates a new User" do
        expect {
          post :create, {:user => valid_attributes, format: :json}, valid_session
        }.to change(User, :count).by(1)
      end

      it "assigns a newly created user as @user" do
        post :create, {:user => valid_attributes, format: :json}, valid_session
        assigns(:user).should be_a(User)
        assigns(:user).should be_persisted
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved user as @user" do
        # Trigger the behavior that occurs when invalid params are submitted
        User.any_instance.stub(:save).and_return(false)
        post :create, {:user => { fake: "param" }, format: :json}, valid_session
        assigns(:user).should be_a_new(User)
      end
    end
  end

  describe "PUT update" do
    describe "with valid params" do
      it "updates the requested user" do
        user = User.create! valid_attributes
        # Assuming there are no other users in the database, this
        # specifies that the User created on the previous line
        # receives the :update_attributes message with whatever params are
        # submitted in the request.
        User.any_instance.should_receive(:update).with({ "name" => "tested guy" })
        put :update, {:id => user.id, :user => { "name" => "tested guy" }, format: :json}, valid_session
      end

      it "assigns the requested user as @user" do
        user = User.create! valid_attributes
        put :update, {:id => user.to_param, :user => valid_attributes, format: :json}, valid_session
        assigns(:user).should eq(user)
      end
    end

    describe "with invalid params" do
      it "assigns the user as @user" do
        user = User.create! valid_attributes
        # Trigger the behavior that occurs when invalid params are submitted
        User.any_instance.stub(:save).and_return(false)
        put :update, {:id => user.id, :user => { fake: "param" }, format: :json}, valid_session
        assigns(:user).should eq(user)
      end
    end
  end

end
