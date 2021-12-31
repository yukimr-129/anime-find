# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :favorites, dependent: :destroy

  mount_uploader :image, ImageUploader

  def self.already_liked?(api_id)
    current_api_v1_user.favorites.exists?(api_id: api_id)
  end

end
