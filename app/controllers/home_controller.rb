class HomeController < ApplicationController
	require 'digest'
	
	def index
		@users = User.all
		@questions = Question.all.sample(6)
		@feeds = Feed.all
		@indices = {
			1 => 'a',
			2 => 'b',
			3 => 'c',
			4 => 'd'
		}

		@submission = Submission.new
	end
end
