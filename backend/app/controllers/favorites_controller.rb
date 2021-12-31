class FavoritesController < ApplicationController
    protect_from_forgery

    def index
        favorite = current_api_v1_user.favorites
        render json: favorite
    end

    def create
        favorite = Favorite.create(favorite_params)
        render json: favorite
    end

    def destroy
        favorite = Favorite.find_by(api_id: params[:api_id])
        favorite.destroy
        render json: favorite
    end

    def confirm
        # is_like = User.already_liked?(params[:api_id])
        is_like = current_api_v1_user.favorites.exists?(api_id: params[:api_id])
        render json: is_like
    end    

    private

    def favorite_params
        params.require(:favorite).permit(:user_id, :title, :official_url, :image_url, :twitter_username, :season, :api_id)
    end

    
end
