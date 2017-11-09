class RestExchange::GetTicker < RestExchange::Base

  def initialize currency_pair
    @currency_pair = currency_pair
  end

  def call
    ticker_payload = perform_request(@currency_pair.exchange.base_url, ticker_api_path)
    std_ticker = normalized_ticker(ticker_payload)

    ticker = Ticker.create!(
      bid: std_ticker[mapping[:bid]],
      ask: std_ticker[mapping[:ask]],
      last: std_ticker[mapping[:last]],
      base_volume: std_ticker[mapping[:base_volume]],
      volume: std_ticker[mapping[:volume]],
      quote_volume: std_ticker[mapping[:quote_volume]],
      percent_change: std_ticker[mapping[:percent_change]],
      pair_id: @currency_pair.id
    )
    return ticker
  end

  private
  def mapping
    @currency_pair.exchange.ticker_data_map.with_indifferent_access
  end

  def ticker_api_path
    @currency_pair.exchange.get_ticker_path.sub('CURRENCY_PAIR_PARAM', @currency_pair.name)
  end

  def normalized_ticker order_book_payload
    if @currency_pair.exchange.name == 'bittrex'
      order_book_payload['result']
    elsif @currency_pair.exchange.name == 'bitfinex'
      order_book_payload
    else
      order_book_payload
    end
  end

end
