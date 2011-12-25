class Answer < ActiveRecord::Base
	belongs_to :question

	def name
		content
	end
end
