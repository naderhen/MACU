class AddPrizeToSubmission < ActiveRecord::Migration
  def change
  	add_column :submissions, :prize, :string
  end
end
