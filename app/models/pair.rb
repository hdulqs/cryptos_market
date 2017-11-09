class Pair < ApplicationRecord
  has_many :exchange_pairs
  has_many :exchanges, through: :exchange_pairs
  has_many :tickers
  has_many :order_books
  has_many :trade_histories
  belongs_to :exchange

  def get_order_book
    RestExchange::GetOrderBook.new(self).call
  end

  def get_ticker
    if exchange.has_ticker_endpoint
      RestExchange::GetTicker.new(self).call
    else
      puts("There is no ticker endpoint for #{exchange.name}")
    end
  end

end
