class Pair < ApplicationRecord
  has_many :tickers
  has_many :order_books
  has_many :trade_histories
  belongs_to :exchange
  belongs_to :market

  scope :active, -> { where(is_active: true) }
  scope :watched, -> { where(is_watched: true) }

  def get_order_book
    RestExchange::OrderBook::Fetcher.new(self).call
  end

  def get_trade_history
    RestExchange::TradeHistory::Fetcher.new(self).call
  end

  def get_ticker
    if exchange.has_ticker_endpoint
      RestExchange::Ticker::Fetcher.new(self).call
    else
      puts("There is no ticker endpoint for #{exchange.name}")
    end
  end

  def last_ticker
    tickers.last
  end

end
