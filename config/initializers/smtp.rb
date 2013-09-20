unless Rails.env.test? # we don't want tests attempting to send out email
ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.smtp_settings = {
  :user_name => ENV['email_user_name'],
  :password => ENV['email_password'],
  :domain => ENV['email_server_address'],
  :address => 'smtp.sendgrid.net',
  :port => 587,
  :authentication => :plain,
  :enable_starttls_auto => true
}
ActionMailer::Base.default_url_options[:host] = ENV['application_url']
end
