class RestExchange::BitFinex::GetOrderBook < RestExchange::BitFinex::Base

  def initialize currency_pair
    super()
    @pair = @exchange.pairs.find_by(name: currency_pair)
    raise "pair could not be found" unless @pair
    @path = "/v1/book/#{currency_pair.sub('-', '')}"
  end

  def call
    request = HttpRequest.new(@base_url)
    response = request.get(@path)
    json_res = JSON.parse(response)
    order_book = OrderBook.create!(
      bids: json_res["bids"],
      asks: json_res["asks"],
      is_frozen: json_res["isFrozen"].to_i,
      pair_id: @pair.id
    )
    return order_book
  end

end
