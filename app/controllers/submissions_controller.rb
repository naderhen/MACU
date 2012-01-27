class SubmissionsController < InheritedResources::Base


	def create
		@submission = Submission.new(params[:submission])

	    respond_to do |format|
	      if @submission.save
	        format.html { redirect_to @submission, notice: 'Submission was successfully created.' }
	        format.js { render json: @submission, status: :created, location: @submission }
	      else
	        format.html { render action: "new" }
	        format.js { render json: @submission.errors }
	      end
	    end
	end

	def bucket_list
		@submission = Submission.find(params[:id])

		respond_to do |format|
			if @submission.update_attributes( bucket_list: params[:content])
				format.js { render json: true }
			else
				format.js { render json: false }
			end
		end
	end
end
