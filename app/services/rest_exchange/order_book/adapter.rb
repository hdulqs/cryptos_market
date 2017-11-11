class RestExchange::OrderBook::Adapter

  def initialize currency_pair, response_payload
    @currency_pair = currency_pair
    @response_payload = response_payload
  end

  def call
    if @currency_pair.exchange.name == 'poloniex'
      order_book = @response_payload.with_indifferent_access
      order_book[:original_payload] = @response_payload
      order_book.with_indifferent_access
    elsif @currency_pair.exchange.name == 'bitfinex'
      order_book = @response_payload.with_indifferent_access
      order_book[:original_payload] = @response_payload
      order_book.with_indifferent_access
    elsif @currency_pair.exchange.name == 'bittrex'
      order_book = @response_payload['result'].with_indifferent_access
      order_book[:original_payload] = @response_payload
      order_book.with_indifferent_access
    elsif @currency_pair.exchange.name == 'kraken'
      order_book = @response_payload['result'][@response_payload['result'].keys.first].with_indifferent_access
      order_book[:original_payload] = @response_payload
      order_book.with_indifferent_access
    elsif @currency_pair.exchange.name == 'bitstamp'
      order_book = @response_payload.with_indifferent_access
      order_book[:original_payload] = @response_payload
      order_book.with_indifferent_access
    elsif @currency_pair.exchange.name == 'quoine'
      order_book = @response_payload.with_indifferent_access
      order_book[:original_payload] = @response_payload
      order_book.with_indifferent_access
    elsif @currency_pair.exchange.name == 'hibtc'
      order_book = @response_payload.with_indifferent_access
      order_book[:original_payload] = @response_payload
      order_book.with_indifferent_access
    else
      order_book = @response_payload.with_indifferent_access
      order_book[:original_payload] = @response_payload
      order_book.with_indifferent_access
    end
  end


end
