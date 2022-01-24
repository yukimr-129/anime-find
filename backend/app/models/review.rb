class Review < ApplicationRecord
  belongs_to :user

  validates :comment, presence: true, length: { maximum: 500 }
  validates :title, presence: true, length: { maximum: 20 }
  validates :rate, presence: true
  validates :anime_id, presence: true


  def self.avg_score
    self.average(:rate)&.round || 0
  end

  def self.factory_list(reviews)
    list = []
    reviews.each do |review|
      list << {
        review: review,
        user: User.find_by(id: review.user_id)
      }
    end

    list
  end
end
