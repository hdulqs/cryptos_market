class Exchange < ApplicationRecord
  has_many :asset_exchanges
  has_many :assets, through: :asset_exchanges
  has_many :exchange_pairs
  has_many :pairs, through: :exchange_pairs
  validates :name, uniqueness: true
  validates :name, presence: true
end
