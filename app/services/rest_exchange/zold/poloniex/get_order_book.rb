class RestExchange::Poloniex::GetOrderBook < RestExchange::Poloniex::Base

  def initialize currency_pair
    super()
    @currency_pair = currency_pair
    @path = "/public?command=returnOrderBook&currencyPair=#{@currency_pair.split("-").join("_")}&depth=10" # depth defines maximum number of asks / bids. Default vaule is 10.
  end

  def call
    pair = @exchange.pairs.find_by(name: @currency_pair)
    raise "pair could not be found" unless pair
    request = HttpRequest.new(@base_url)
    response = request.get(@path)
    json_res = JSON.parse(response)
    order_book = OrderBook.create!(
      bids: json_res["bids"],
      asks: json_res["asks"],
      is_frozen: json_res["isFrozen"].to_i,
      pair_id: pair.id
    )
    return order_book
  end

end
