class Poloniex::GetMarkets

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
        pair = Pair.new(
          name: key.split("_").join("-"),
          base_currency: key.split("_").first,
          quote_currency: key.split("_").last,
          is_frozen: ticker["isFrozen"]
        )
        exchange.pairs << pair
      end
    end
    return json_res.count
  end

end
