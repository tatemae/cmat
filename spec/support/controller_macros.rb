# From https://github.com/plataformatec/devise/wiki/How-To:-Controllers-and-Views-tests-with-Rails-3-(and-rspec)
module ControllerMacros
  def login_admin
    before(:each) do
      @request.env["devise.mapping"] = Devise.mappings[:admin]
      @admin ||= FactoryGirl.create(:user)
      @admin.add_to_role('administrator')
      sign_in @admin
    end
  end

  def login_user(admin=false)
    before(:each) do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      @user ||= FactoryGirl.create(:user)
      @user.add_to_role('administrator') if admin == true
      sign_in @user
    end
  end
end