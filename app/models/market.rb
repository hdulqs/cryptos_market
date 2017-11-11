class Market < ApplicationRecord
  has_many :pairs
  has_many :exchanges, through: :pairs
  validates :name, uniqueness: true
end
