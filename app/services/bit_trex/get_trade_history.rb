class BitTrex::GetTradeHistory

  def initialize currency_pair
    @currency_pair = currency_pair
  end

  def call
    exchange = Exchange.find_by(name: 'bittrex')
    pair = exchange.pairs.find_by(name: @currency_pair)
    raise "pair could not be found" unless pair
    request = HttpRequest.new('https://bittrex.com', '')
    response = request.get("/api/v1.1/public/getmarkethistory?market=#{@currency_pair}")
    json_res = JSON.parse(response)
    events = json_res["result"]
    events.each do |event|
      trade_history = TradeHistory.create!(
        order_type: event["OrderType"],
        amount: event["Quantity"],
        price: event["Price"],
        total: event["Total"],
        fill_type: event["FillType"],
        pair_id: pair.id
      )
    end
  end

end
