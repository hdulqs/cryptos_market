class RestExchange::Poloniex::Base

  def initialize
    @base_url = 'https://poloniex.com'
    @exchange = Exchange.find_by(name: 'poloniex')
  end
  
end
