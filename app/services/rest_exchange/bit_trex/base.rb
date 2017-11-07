class RestExchange::BitTrex::Base

  def initialize
    @base_url = 'https://bittrex.com'
    @exchange = Exchange.find_by(name: 'bittrex')
  end

end
