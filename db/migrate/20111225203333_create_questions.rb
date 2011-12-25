class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.text :content
      t.integer :correct_answer_id
      t.text :correct_answer_response
      t.text :wrong_answer_response

      t.timestamps
    end
  end
end
