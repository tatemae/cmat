class Map < ActiveRecord::Base
  validates_presence_of :title
  belongs_to :user

  scope :by_newest, -> { order(created_at: :desc) }

end
