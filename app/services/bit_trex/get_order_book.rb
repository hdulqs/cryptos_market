class BitTrex::GetOrderBook

  def initialize currency_pair
    @currency_pair = currency_pair
  end

  def call
    exchange = Exchange.find_by(name: 'bittrex')
    pair = exchange.pairs.find_by(name: @currency_pair)
    raise "pair could not be found" unless pair
    request = HttpRequest.new('https://bittrex.com', '')
    response = request.get("/api/v1.1/public/getorderbook?market=#{@currency_pair}&type=both")
    json_res = JSON.parse(response)
    order_book = OrderBook.create!(
      bids: json_res["result"]["sell"],
      asks: json_res["result"]["buy"],
      pair_id: pair.id
    )
    return order_book
  end

end
