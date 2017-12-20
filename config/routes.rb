Rails.application.routes.draw do
  get 'home/index'
  require 'sidekiq/web'
  Sidekiq::Web.set :session_secret, Rails.application.secrets[:secret_key_base]
  mount Sidekiq::Web => '/sidekiq'
  mount ActionCable.server, at: '/cable'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "home#index"
  namespace :backend do
    resources :exchanges do
      resources :exchange_pairs, only: [:index, :show]
    end
    devise_for :admins, :controllers => { :sessions => "backend/admins/sessions", registrations: "backend/admins/registrations" }
    resources :opportunities, only: [:index, :show]
    resources :markets, only: [:index, :show] do
      collection do
        get :all
      end
      member do
        patch :unwatch
        patch :watch
      end
      resources :reports, only: [:index, :show]
      resources :pairs, only: [:index, :show, :edit, :update] do
        member do
          patch :unwatch
          patch :watch
        end
        resources :tickers, only: [:index, :show]
        resources :order_books, only: [:index, :show]
        resources :trade_histories, only: [:index, :show]
      end
    end
  end
end
