class RestExchange::GetTradeHistory < RestExchange::Base

  def initialize currency_pair
    @currency_pair = currency_pair
  end

  def call
    trade_history_payload = perform_request(@currency_pair.exchange.base_url, trade_history_api_path)
    std_trade_history = normalized_trade_history(trade_history_payload)

    std_trade_history.each do |event|
      #binding.pry
      trade_history = TradeHistory.create!(
        order_type: event[mapping[:order_type]],
        amount: event[mapping[:amount]],
        price: event[mapping[:price]],
        total: event[mapping[:total]],
        fill_type: event[mapping[:fill_type]],
        event_timestamp: event[mapping[:event_timestamp]],
        original_payload: event[:original_payload],
        pair_id: @currency_pair.id
      )
    end
  end

  private
  def mapping
    @currency_pair.exchange.trade_history_data_map.with_indifferent_access
  end

  def trade_history_api_path
    @currency_pair.exchange.get_trade_history_path.sub('CURRENCY_PAIR_PARAM', @currency_pair.name)
  end

  def normalized_trade_history trade_history_payload
    if @currency_pair.exchange.name == 'bittrex'
      trade_history_payload['result']
    elsif @currency_pair.exchange.name == 'poloniex'
      trade_history_payload.map{|l| l["event_timestamp"] = Time.parse(l["date"]).to_i ; l}
    elsif @currency_pair.exchange.name == 'bitfinex'
      trade_history_payload
    elsif @currency_pair.exchange.name == 'kraken'
      th_array = trade_history_payload['result'][trade_history_payload['result'].keys.first]
      th_array.map do |event|
        {price: event[0], amount: event[1], event_timestamp: event[2], order_type: event[3] }.with_indifferent_access
      end
    else
      trade_history_payload
    end
  end

end
