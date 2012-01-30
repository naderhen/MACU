class SubmissionMailer < ActionMailer::Base
	default from: 'macuquiz@gmail.com'
	def confirmation(submission)
		@submission = submission
		mail(to: submission.email, subject: 'MACU Prize Confirmation')
	end
end
