class RestExchange::GetOrderBook < RestExchange::Base

  def initialize currency_pair
    @currency_pair = currency_pair
  end

  def call
    order_book_payload = perform_request(@currency_pair.exchange.base_url, order_book_api_path)
    std_order_book = normalized_order_book(order_book_payload)

    order_book = OrderBook.create!(
      bids: std_order_book[mapping[:bids]],
      asks: std_order_book[mapping[:asks]],
      is_frozen: std_order_book[mapping[:is_frozen]],
      original_payload: std_order_book[:original_payload],
      pair_id: @currency_pair.id
    )
    return order_book
  end

  private
  def mapping
    @currency_pair.exchange.order_book_data_map.with_indifferent_access
  end

  def order_book_api_path
    @currency_pair.exchange.get_order_book_path.sub('CURRENCY_PAIR_PARAM', @currency_pair.name)
  end

  def normalized_order_book order_book_payload
    if @currency_pair.exchange.name == 'poloniex'
      order_book = order_book_payload['result'].with_indifferent_access
      order_book[:original_payload] = order_book_payload
      order_book.with_indifferent_access
    elsif @currency_pair.exchange.name == 'bitfinex'
      order_book = order_book_payload.with_indifferent_access
      order_book[:original_payload] = order_book_payload
      order_book.with_indifferent_access
    elsif @currency_pair.exchange.name == 'bittrex'
      order_book = order_book_payload.with_indifferent_access
      order_book[:original_payload] = order_book_payload
      order_book.with_indifferent_access
    elsif @currency_pair.exchange.name == 'kraken'
      order_book = order_book_payload['result'][order_book_payload['result'].keys.first].with_indifferent_access
      order_book[:original_payload] = order_book_payload
      order_book.with_indifferent_access
    else
      order_book = order_book_payload.with_indifferent_access
      order_book[:original_payload] = order_book_payload
      order_book.with_indifferent_access
    end
  end

end
