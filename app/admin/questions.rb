ActiveAdmin.register Question do
	index do
		column :id
		column :content
		column :correct_answer_id do |question|
			question.correct_answer
		end
		column :correct_answer_response
		column :wrong_answer_response
		default_actions
	end

  	form do |f|
	  f.inputs "Details" do
	  	f.input :content
	  	f.input :correct_answer_id, :as => :select, :collection => f.object.answers
	  	f.input :correct_answer_response
	  	f.input :wrong_answer_response
	  end

	  f.has_many :answers do |answer|
	     answer.inputs
	  end

	  f.buttons
	end
end
