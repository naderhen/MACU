class AddActiveToPromos < ActiveRecord::Migration
  def change
  	add_column :promos, :active, :boolean, :default => true
  end
end
