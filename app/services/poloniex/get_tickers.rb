class Poloniex::GetTickers

  def initialize
  end

  def call
    request = HttpRequest.new('https://poloniex.com', '')
    response = request.get('/public?command=returnTicker')
    json_res = JSON.parse(response)
    exchange = Exchange.find_by(name: 'poloniex')
    json_res.each do |key, ticker|
      existing_pair = exchange.pairs.find_by(name: key)
      unless existing_pair
        # Should not happen
        pair = Pair.new(
          name: key,
          base_currency: key.split("_").first,
          quote_currency: key.split("_").last,
          is_frozen: ticker["isFrozen"]
        )
        exchange.pairs << pair
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
