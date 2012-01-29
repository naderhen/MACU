class CreateFeeds < ActiveRecord::Migration
  def change
    create_table :feeds do |t|
      t.text :content
      t.string :byline

      t.timestamps
    end
  end
end
