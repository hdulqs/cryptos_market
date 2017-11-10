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
      original_payload: std_ticker[:original_payload],
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

  def normalized_ticker ticker_payload
    if @currency_pair.exchange.name == 'bittrex'
      ticker = ticker_payload['result'].with_indifferent_access
      ticker[:original_payload] = ticker_payload
      ticker.with_indifferent_access
    elsif @currency_pair.exchange.name == 'poloniex'
      ticker = ticker_payload.with_indifferent_access
      ticker[:original_payload] = ticker_payload
      ticker.with_indifferent_access
    elsif @currency_pair.exchange.name == 'bitfinex'
      ticker = ticker_payload.with_indifferent_access
      ticker[:original_payload] = ticker_payload
      ticker.with_indifferent_access
    elsif @currency_pair.exchange.name == 'kraken'
      ticker = ticker_payload["result"][ticker_payload["result"].keys.first]
      { original_payload: ticker_payload, ask: ticker["a"].first, bid: ticker["b"].first, last: ticker["c"].first, base_volume: "", volume: ticker["v"].last, quote_volume: "", percent_change: "" }.with_indifferent_access
    else
      ticker = ticker_payload.with_indifferent_access
      ticker[:original_payload] = ticker_payload
      ticker.with_indifferent_access
    end
  end

end
