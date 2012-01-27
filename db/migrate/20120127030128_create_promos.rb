class CreatePromos < ActiveRecord::Migration
  def change
    create_table :promos do |t|
      t.string :code
      t.string :prize
      t.string :redeemed_by

      t.timestamps
    end
  end
end
