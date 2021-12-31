class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController

    # def update
    #     user = current_api_v1_user.update(account_update_params)
    #     render json: user
    # end

    # protected
    # def update_resource(resource, params)
    #   resource.update_without_current_password(params)
    # end

    private
    def sign_up_params
        params.permit(:email, :password, :password_confirmation, :name)
    end

    def account_update_params
        params.permit(:name, :email, :image)
    end
end
