class RestExchange::BitTrex::GetTicker < RestExchange::BitTrex::Base

  def initialize currency_pair
    super()
    @currency_pair = currency_pair
  end

  def call
    pair = @exchange.pairs.find_by(name: @currency_pair)
    raise "pair could not be found" unless pair
    request = HttpRequest.new(@base_url)
    response = request.get("/api/v1.1/public/getticker?market=#{@currency_pair}")
    json_res = JSON.parse(response)

    ticker = Ticker.create!(
      bid: json_res["result"]["Bid"],
      ask: json_res["result"]["Ask"],
      last: json_res["result"]["Last"],
      pair_id: pair.id
    )
    return ticker
  end

end
