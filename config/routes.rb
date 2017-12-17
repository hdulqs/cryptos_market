Rails.application.routes.draw do
  get 'home/index'
  require 'sidekiq/web'
  Sidekiq::Web.set :session_secret, Rails.application.secrets[:secret_key_base]
  mount Sidekiq::Web => '/sidekiq'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "home#index"
  namespace :backend do
    resources :exchanges
    devise_for :admins, :controllers => { :sessions => "backend/admins/sessions", registrations: "backend/admins/registrations" }
    resources :markets, only: [:index, :show] do
      resources :reports, only: [:index, :show]
      resources :pairs, only: [:index, :show] do
        member do
          patch :unwatch
        end
        resources :tickers, only: [:index, :show]
        resources :order_books, only: [:index, :show]
        resources :trade_histories, only: [:index, :show]
      end
    end
  end
end
