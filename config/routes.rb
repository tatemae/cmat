Cmat::Application.routes.draw do
  namespace :api do
    resources :maps, except: [:new, :edit]
    resources :users, except: [:new, :edit] do
      resources :maps, except: [:new, :edit]
    end
  end

  root :to => "default#index"
end
