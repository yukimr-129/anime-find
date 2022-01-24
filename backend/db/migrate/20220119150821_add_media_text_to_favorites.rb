class AddMediaTextToFavorites < ActiveRecord::Migration[6.1]
  def change
    add_column :favorites, :media_text, :string
  end
end
