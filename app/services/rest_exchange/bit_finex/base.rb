class RestExchange::BitFinex::Base

  # Ratelimit: between 5 and 60 req/min according to the endpoint
  # https://docs.bitfinex.com/v1/reference#rest-public-ticker
  # 60 for OrderBook and Ticker ; 45 for TradeHistory
  def initialize
    @base_url = 'https://api.bitfinex.com'
    @exchange = Exchange.find_by(name: 'bitfinex')
  end

end
