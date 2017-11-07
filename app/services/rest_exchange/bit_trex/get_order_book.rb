class RestExchange::BitTrex::GetOrderBook < RestExchange::BitTrex::Base

  def initialize currency_pair
    super()
    @currency_pair = currency_pair
    @path = "/api/v1.1/public/getorderbook?market=#{@currency_pair}&type=both"
  end

  def call
    pair = @exchange.pairs.find_by(name: @currency_pair)
    raise "pair could not be found" unless pair
    request = HttpRequest.new(@base_url)
    response = request.get(@path)
    json_res = JSON.parse(response)

    order_book = OrderBook.create!(
      bids: json_res["result"]["sell"],
      asks: json_res["result"]["buy"],
      pair_id: pair.id
    )
    return order_book
  end

end
