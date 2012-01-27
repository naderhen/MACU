class AddFieldsToSubmissions < ActiveRecord::Migration
  def change
  	add_column :submissions, :promo_code, :string
  	add_column :submissions, :bucket_list, :text
  end
end
