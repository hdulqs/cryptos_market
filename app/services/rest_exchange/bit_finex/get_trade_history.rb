class RestExchange::BitFinex::GetTradeHistory < RestExchange::BitFinex::Base

  def initialize currency_pair
    super()
    @pair = @exchange.pairs.find_by(name: currency_pair)
    raise "pair could not be found" unless @pair
    @path = "/v1/trades/#{currency_pair.sub('-', '')}"
  end

  def call
    request = HttpRequest.new(@base_url)
    response = request.get(@path)
    json_res = JSON.parse(response)
    events = json_res

    events.each do |event|
      trade_history = TradeHistory.create!(
        order_type: event["type"],
        amount: event["amount"],
        price: event["price"],
        pair_id: @pair.id
        #total: event["Total"],
        #fill_type: event["FillType"],
      )
    end

    return events
  end

end
