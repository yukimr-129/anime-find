class ApplicationController < ActionController::API
        include DeviseTokenAuth::Concerns::SetUserByToken
        include ActionController::Helpers
        include ActionController::RequestForgeryProtection

        protect_from_forgery with: :exception
        skip_before_action :verify_authenticity_token, if: :devise_controller?
        helper_method :current_api_v1_user, :user_signed_in?

        def set_csrf_token_header
                response.set_header('X-CSRF-Token', form_authenticity_token)
        end
end
