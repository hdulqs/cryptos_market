class Pair < ApplicationRecord
  has_many :exchange_pairs
  has_many :exchanges, through: :exchange_pairs
  has_many :tickers
  has_many :order_books
  has_many :trade_histories
end
