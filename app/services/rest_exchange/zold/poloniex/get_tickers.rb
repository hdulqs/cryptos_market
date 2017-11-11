class RestExchange::Poloniex::GetTickers < RestExchange::Poloniex::Base

  def initialize
    super()
    @path = '/public?command=returnTicker'
  end

  def call
    request = HttpRequest.new(@base_url)
    response = request.get(@path)
    json_res = JSON.parse(response)
    json_res.each do |key, ticker|
      existing_pair = @exchange.pairs.find_by(name: key)
      unless existing_pair
        # Should not happen
        pair = Pair.new(
          name: key,
          base_currency: key.split("_").first,
          quote_currency: key.split("_").last,
          is_frozen: ticker["isFrozen"]
        )
        @exchange.pairs << pair
      else
        ticker = Ticker.create!(
          bid: ticker["highestBid"],
          ask: ticker["lowestAsk"],
          last: ticker["Last"],
          base_volume: ticker["baseVolume"],
          quote_volume: ticker["quoteVolume"],
          percent_change: ticker["percentChange"],
          pair_id: existing_pair.id
        )
      end
    end
  end

end
