ActionMailer::Base.smtp_settings = {
  :address              => "smtp.gmail.com",
  :port                 => 587,
  :user_name            => "macuquiz@gmail.com",
  :password             => "budcreativegroup",
  :authentication       => "plain",
  :enable_starttls_auto => true
}