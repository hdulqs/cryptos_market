class Exchange < ApplicationRecord
  has_many :asset_exchanges
  has_many :assets, through: :asset_exchanges
  has_many :exchange_pairs
  has_many :pairs, through: :exchange_pairs
  validates :name, uniqueness: true
  validates :name, presence: true

  def get_assets
    RestExchange::GetAssets.new(self).call
  end

  def get_pairs
    RestExchange::GetPairs.new(self).call
  end

  def get_tickers
    if has_tickers_endpoint
      RestExchange::GetTickers.new(self).call
    else
      puts("There is no tickers endpoint for #{name}")
    end
  end

end
