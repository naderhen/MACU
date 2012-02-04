ActiveAdmin.register Submission do
  index do
  	column :id
  	column :first_name
  	column :last_name
  	column :email
  	column :branch
  	column :created_at
  	column :promo_code
  	column :bucket_list
  	column :prize
    default_actions
  end
end
