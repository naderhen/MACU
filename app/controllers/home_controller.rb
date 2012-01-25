class HomeController < ApplicationController
	require 'digest'
	
	def index
		@users = User.all
		@questions = Question.all
		@indices = {
			1 => 'a',
			2 => 'b',
			3 => 'c',
			4 => 'd'
		}
	end
end
