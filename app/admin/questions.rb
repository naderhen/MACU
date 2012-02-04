ActiveAdmin.register Question do
	index do
		column :id
		column :content
		column :correct_answer_id do |question|
			question.correct_answer
		end
		column :correct_answer_response
		column :wrong_answer_response
		column :joke
		default_actions
	end

  	form do |f|
	  f.inputs "Details" do
	  	f.input :content, :as => :string
	  	f.input :correct_answer_id, :as => :select, :collection => f.object.answers
	  	f.input :correct_answer_response, :input_html => { :rows => 2 }
	  	f.input :joke
	  end

	  f.has_many :answers do |answer|
	     answer.input :content, :as => :string
	  end

	  f.buttons
	end
end
