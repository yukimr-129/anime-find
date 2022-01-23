class Api::V1::ReviewsController < ApplicationController
  protect_from_forgery
  
  def index
    # reviews = Review.joins(:user).select('reviews.*, users.image, users.id, users.name').where(anime_id: params[:anime_id]).order(created_at: "DESC")
    reviews = Review.where(anime_id: params[:anime_id]).order(created_at: "DESC")
    reviews_list = Review.factory_list(reviews)
    
    render json: reviews_list
  end

  def create
    duplicate_check = Review.exists?(user_id: review_params[:user_id], anime_id: review_params[:anime_id])
    if !duplicate_check
      review = Review.create(review_params)
      render json: {review: review, confirm: true}
    else
      render json: {confirm: false}
    end
  end

  def count
    review = Review.where(anime_id: params[:anime_id])
    render json: { review_count: review.count, average_rate: review.avg_score}
  end

  private

  def review_params
    params.require(:review).permit(:user_id, :title, :comment, :rate, :anime_id)
  end
end
