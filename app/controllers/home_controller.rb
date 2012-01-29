class HomeController < ApplicationController
	require 'digest'
	
	def index
		@users = User.all
		@questions = Question.all.sample(5)
		@feed = Feed.all.sample(1).first
		@indices = {
			1 => 'a',
			2 => 'b',
			3 => 'c',
			4 => 'd'
		}

		@submission = Submission.new
	end
end
