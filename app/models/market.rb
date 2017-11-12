class Market < ApplicationRecord
  has_many :pairs
  has_many :exchanges, through: :pairs
  has_many :reports
  validates :name, uniqueness: true


end
