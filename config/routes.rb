Cmat::Application.routes.draw do
  namespace :api do
    resources :maps
    resources :users do
      resources :maps
    end
  end

  root :to => "default#index"
end
