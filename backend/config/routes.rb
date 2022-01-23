Rails.application.routes.draw do
  
  namespace :api do
    
    namespace :v1 do
      get '/annicts/search', to: 'annicts#index'

      get '/reviews/:anime_id', to: 'reviews#index'
      get '/reviews/count/:anime_id', to: 'reviews#count'
      post '/reviews/create', to: 'reviews#create'
    
      get '/favorites', to: 'favorites#index'
      get '/favorites/confirm/:api_id', to: 'favorites#confirm'
      post '/favorites/create', to: 'favorites#create'
      delete '/favorites/destroy/:api_id', to: 'favorites#destroy'

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }
  
      namespace :auth do
        resources :sessions, only: %i(index)
      end
    end
  end
end
