Rails.application.routes.draw do
  get '/favorites', to: 'favorites#index'
  get '/favorites/confirm/:api_id', to: 'favorites#confirm'
  post '/favorites/create', to: 'favorites#create'
  delete '/favorites/destroy/:api_id', to: 'favorites#destroy'

  namespace :api do
    get '/annicts/search', to: 'annicts#index'
   
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
          registrations: 'api/v1/auth/registrations'
      }
  
      namespace :auth do
        resources :sessions, only: %i(index)
      end
    end
  end
end
