class BitTrex::GetTicker

  def initialize currency_pair
    @currency_pair = currency_pair
  end

  def call
    exchange = Exchange.find_by(name: 'bittrex')
    pair = exchange.pairs.find_by(name: @currency_pair)
    raise "pair could not be found" unless pair
    request = HttpRequest.new('https://bittrex.com', '')
    response = request.get("/api/v1.1/public/getticker?market=#{@currency_pair}", '')
    json_res = JSON.parse(response)
    ticker = Ticker.create!(
      bid: json_res["result"]["Bid"],
      ask: json_res["result"]["Ask"],
      last: json_res["result"]["Last"],
      pair_id: pair.id
    )
    puts ticker.inspect
  end

end
