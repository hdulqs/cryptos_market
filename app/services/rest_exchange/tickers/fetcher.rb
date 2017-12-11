class RestExchange::Tickers::Fetcher < RestExchange::Base

  # Used only by Poloniex which does not provide a Ticker endpoint
  #
  def initialize exchange
    @exchange = exchange
  end

  def call
    tickers_payload = perform_request(@exchange.base_url, @exchange.get_tickers_path)

    @exchange.last_ticker_request = DateTime.current
    @exchange.save!

    std_tickers = normalized_tickers(tickers_payload)

    std_tickers.each do |key, ticker|
      # binding.pry
      existing_pair = @exchange.pairs.find_by(name: key)
      unless existing_pair
        # Should not happen
        #binding.pry
        #raise "Pair does not exists"
         pair = Pair.new(
           name: key,
           base_currency: key.split("_").first,
           quote_currency: key.split("_").last
         )
         @exchange.pairs << pair
      else
        ticker = ::Ticker.create!(
          bid: ticker[mapping[:bid]],
          ask: ticker[mapping[:ask]],
          last: ticker[mapping[:last]],
          high: ticker[mapping[:high]],
          low: ticker[mapping[:low]],
          timestamp: ticker[mapping[:timestamp]],
          market_symbol: ticker[mapping[:market_symbol]],
          volume: ticker[mapping[:volume]],
          base_volume: ticker[mapping[:base_volume]],
          quote_volume: ticker[mapping[:quote_volume]],
          percent_change: ticker[mapping[:percent_change]],
          original_payload: {key: key, ticker: ticker},
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
    elsif @exchange.name == 'exmo'
      tickers_payload
    else
      tickers_payload
    end
  end

end
