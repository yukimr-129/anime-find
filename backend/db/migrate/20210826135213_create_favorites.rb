class CreateFavorites < ActiveRecord::Migration[6.1]
  def change
    create_table :favorites do |t|
      t.references  :user, foreign_key: true
      t.string      :title
      t.string      :official_url
      t.string      :image_url
      t.string      :twitter_username
      t.string      :season
      t.timestamps
    end
  end
end
