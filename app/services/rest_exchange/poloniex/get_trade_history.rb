class RestExchange::Poloniex::GetTradeHistory < RestExchange::Poloniex::Base

  def initialize currency_pair
    super()
    @currency_pair = currency_pair
  end

  def call
    pair = @exchange.pairs.find_by(name: @currency_pair)
    raise "pair could not be found" unless pair
    request = HttpRequest.new('https://poloniex.com', '')
    # Returns the past 200 trades for a given market, or up to 50,000 trades between a range specified in UNIX timestamps
    response = request.get("/public?command=returnTradeHistory&currencyPair=#{@currency_pair.split("-").join("_")}") # &start=1410158341&end=1410499372
    json_res = JSON.parse(response)
    json_res.each do |event|
      trade_history = TradeHistory.create!(
        order_type: event["type"],
        amount: event["amount"],
        price: event["rate"],
        total: event["total"],
        pair_id: pair.id
      )
    end
  end

end
