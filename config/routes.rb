Cmat::Application.routes.draw do

  root :to => "default#index"

  devise_for :users, :controllers => { :sessions => "sessions" }
  as :user do
    get     'sign_out'              => 'sessions#destroy'
  end

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