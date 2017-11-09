class RestExchange::GetTickers < RestExchange::Base

  def initialize exchange
    @exchange = exchange
  end

  def call
    tickers_payload = perform_request(@exchange.base_url, @exchange.get_tickers_path)
    std_tickers = normalized_tickers(tickers_payload)

    std_tickers.each do |key, ticker|
      existing_pair = @exchange.pairs.find_by(name: key)
      unless existing_pair
        # Should not happen
        raise "Pair does not exists"
        # pair = Pair.new(
        #   name: key,
        #   base_currency: key.split("_").first,
        #   quote_currency: key.split("_").last,
        #   is_frozen: ticker["isFrozen"]
        # )
        # @exchange.pairs << pair
      else
        ticker = Ticker.create!(
          bid: ticker[mapping[:bid]],
          ask: ticker[mapping[:ask]],
          last: ticker[mapping[:last]],
          base_volume: ticker[mapping[:base_volume]],
          quote_volume: ticker[mapping[:quote_volume]],
          percent_change: ticker[mapping[:percent_change]],
          pair_id: existing_pair.id
        )
      end
    end

  end

  private
  def mapping
    @exchange.tickers_data_map.with_indifferent_access
  end

  def normalized_tickers tickers_payload
    if @exchange.name == 'poloniex'
      tickers_payload
    else
      tickers_payload
    end
  end

end
