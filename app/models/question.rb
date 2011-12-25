class Question < ActiveRecord::Base
	has_many :answers
	accepts_nested_attributes_for :answers

	def correct_answer
		if correct_answer_id.blank?
			return 'No Answer Selected!'
		else
			@answer = Answer.find(correct_answer_id)
			return @answer.content
		end
	end

	def name
		content
	end
end
