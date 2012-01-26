class CreateSubmissions < ActiveRecord::Migration
  def change
    create_table :submissions do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :branch
      t.integer :score
      t.string :prize_code

      t.timestamps
    end
  end
end
