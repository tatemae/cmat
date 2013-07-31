require 'spec_helper'

describe Map do

  it "is invalid without a title" do
    FactoryGirl.build(:map, title: nil).should_not be_valid
  end

end
