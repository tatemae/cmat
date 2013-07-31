require 'factory_girl'

FactoryGirl.define do

  sequence :email do |n|
    "somebody#{n}@example.com"
  end

  sequence :login do |n|
    "inquire#{n}"
  end

  sequence :password do |n|
    "password#{n}"
  end

  sequence :name do |n|
    "a_name#{n}"
  end

  sequence :title do |n|
    "a_title#{n}"
  end

  sequence :abbr do |n|
    "a#{n}"
  end

  sequence :uri do |n|
    "n#{n}.example.com"
  end

  sequence :description do |n|
    "This is the description: #{n}"
  end

  sequence :locale do |n|
    "a#{n}"
  end

  sequence :address do |n|
    "#{n} West #{n} South"
  end

  factory :user do
    name { FactoryGirl.generate(:name) }
    email { FactoryGirl.generate(:email) }
    password { FactoryGirl.generate(:password) }
    #after_build { |user| user.confirm! }
  end

  factory :map do
    user
    title { FactoryGirl.generate(:title) }
  end

end


