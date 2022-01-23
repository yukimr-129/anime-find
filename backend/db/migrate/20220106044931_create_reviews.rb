class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.text :title, null: false
      t.text :comment, null: false
      t.integer :rate, null: false
      t.integer :anime_id, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
