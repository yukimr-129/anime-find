class AddApiIdToFavorites < ActiveRecord::Migration[6.1]
  def change
    add_column :favorites, :api_id, :integer
  end
end
