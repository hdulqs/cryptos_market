class RestExchange::BitFinex::Base

  def initialize
    @base_url = 'https://api.bitfinex.com'
    @exchange = Exchange.find_by(name: 'bitfinex')
  end

end
