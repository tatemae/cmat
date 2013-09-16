class ApplicationController < ActionController::Base

  helper_method :json_for

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  protected

    def json_for(target, options = {})
      options[:scope] ||= self
      options[:url_options] ||= url_options
      target.active_model_serializer.new(target, options).to_json
    end

end
