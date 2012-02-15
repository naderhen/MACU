class PromosController < InheritedResources::Base

	def check
		@promo = Promo.where(code: params[:code].upcase, active: true)
		@submission = Submission.find(params[:user_id])

		if @promo.any? &&
			@promo.first.update_attributes(active: false)
			if @submission.update_attributes(promo_code: @promo.first.code, prize: @promo.first.prize)
				SubmissionMailer.confirmation(@submission).deliver
			end
			respond_to do |format|
		        format.html { redirect_to @promo.first, notice: 'Submission was successfully created.' }
		        format.js { render json: @promo.first, status: :created, location: @promo.first }
		    end
		else
			respond_to do |format|
		        format.html { render action: "new" }
		        format.js { render json: false }
		    end
		end
	end

end
