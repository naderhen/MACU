class AddJokeToQuestions < ActiveRecord::Migration
  def change
  	add_column :questions, :joke, :boolean, :default => false
  end
end
