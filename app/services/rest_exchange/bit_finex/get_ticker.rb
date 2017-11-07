class RestExchange::BitFinex::GetTicker < RestExchange::BitFinex::Base

  def initialize currency_pair
    super()
    @currency_pair = currency_pair
  end

  def call
    pair = @exchange.pairs.find_by(name: @currency_pair)
    raise "pair could not be found" unless pair
    request = HttpRequest.new(@base_url)
    response = request.get("/v1/pubticker/#{@currency_pair.sub('-', '').downcase}")
    json_res = JSON.parse(response)
    ticker = Ticker.create!(
      bid: json_res["bid"],
      ask: json_res["ask"],
      last: json_res["last_price"],
      volume: json_res["volume"],
      pair_id: pair.id
    )
    return ticker
  end

end
