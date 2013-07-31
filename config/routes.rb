Cmat::Application.routes.draw do

  root :to => "default#index"

  devise_for :users

  namespace :api do
    resources :maps, except: [:new, :edit]
    resources :sessions, only: [:create, :destroy]
    resources :users, only: [:show, :create, :update] do
      resources :maps, except: [:new, :edit]
    end
  end

  get 'saml', to: 'saml#index'
  get 'saml/metadata', to: 'saml#metadata'
  post 'saml/consume', to: 'saml#consume'

end
