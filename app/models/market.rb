class Market < ApplicationRecord
  has_many :pairs
  has_many :exchanges, through: :pairs
  has_many :reports
  validates :name, uniqueness: true

  scope :of_interest, -> {
    where(is_watched: true)
  }

  scope :credible, -> {
    where(price_difference: 2..90)
  }

end
