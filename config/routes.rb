Cmat::Application.routes.draw do
  namespace :api do
    resources :maps
  end

  root :to => "default#index"
end
