class Pair < ApplicationRecord
  has_many :exchange_pairs
  has_many :exchanges, through: :exchange_pairs
  has_many :tickers
end
