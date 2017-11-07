class Poloniex::GetOrderBook

  def initialize currency_pair
    @currency_pair = currency_pair
  end

  def call
    exchange = Exchange.find_by(name: 'poloniex')
    pair = exchange.pairs.find_by(name: @currency_pair)
    raise "pair could not be found" unless pair
    request = HttpRequest.new('https://poloniex.com', '')
    response = request.get("/public?command=returnOrderBook&currencyPair=#{@currency_pair.split("-").join("_")}&depth=10") # depth defines maximum number of asks / bids. Default vaule is 10.
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
