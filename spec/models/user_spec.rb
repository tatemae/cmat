require 'spec_helper'

describe User do

  before do
    @user = FactoryGirl.create(:user)
    @attr = {
      :name => "Example User",
      :email => "user@example.com",
      :password => "foobar8chars",
      :password_confirmation => "foobar8chars"
    }
  end

  it "should create a new instance given a valid attribute" do
    user = User.new(@attr)
    #user.skip_confirmation!
    user.save!
  end

end
