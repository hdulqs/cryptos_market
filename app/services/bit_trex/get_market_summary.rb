class BitTrex::GetMarketSummary

  def initialize currency_pair
    @currency_pair = currency_pair
  end

  def call
    exchange = Exchange.find_by(name: 'bittrex')
    pair = exchange.pairs.find_by(name: @currency_pair)
    raise "pair could not be found" unless pair
    request = HttpRequest.new('https://bittrex.com', '')
    response = request.get("/api/v1.1/public/getmarketsummary?market=#{@currency_pair}&type=both")
    market_summary = JSON.parse(response)["result"].first
    return market_summary
  end

end
