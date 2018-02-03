class AdminConstraint
  def matches?(request)
    return false unless request.session["warden.user.backend_admin.key"]
    return true
  end
end

Rails.application.routes.draw do

  require 'sidekiq/web'
  mount Sidekiq::Web => '/backend/sidekiq', :constraints => AdminConstraint.new

  mount ActionCable.server, at: '/cable'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :backend do
    root to: "home#index"
    resources :exchanges do
      resources :exchange_pairs, only: [:index, :show]
    end
    devise_for :admins, :controllers => { :sessions => "backend/admins/sessions", registrations: "backend/admins/registrations" }
    devise_for :users, controllers: { :sessions => "backend/users/sessions", registrations: "backend/users/registrations" }
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

  namespace :api do
    namespace :v1 do
      namespace :public do
        resources :markets, only: [:index, :show]
        resources :asset_infos, only: [:index, :show]
        resources :exchanges, only: [:index]
      end
      namespace :private do
        resources :portfolio, only: [:index]
      end
      resources :sessions, only: [:create]
    end
  end

  namespace :frontend do
    root to: "home#index"
  end

  root to: "frontend/home#index"
  get "*path", to: "frontend/home#index"

end
