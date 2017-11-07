class RestExchange::BitTrex::GetTradeHistory < RestExchange::BitTrex::Base

  def initialize currency_pair
    super()
    @currency_pair = currency_pair
    @pair = @exchange.pairs.find_by(name: @currency_pair)
    raise "pair could not be found" unless @pair
    @path = "/api/v1.1/public/getmarkethistory?market=#{@currency_pair}"
  end

  def call
    request = HttpRequest.new(@base_url)
    response = request.get(@path)
    json_res = JSON.parse(response)

    events = json_res["result"]
    events.each do |event|
      trade_history = TradeHistory.create!(
        order_type: event["OrderType"],
        amount: event["Quantity"],
        price: event["Price"],
        total: event["Total"],
        fill_type: event["FillType"],
        pair_id: @pair.id
      )
    end
  end

end
