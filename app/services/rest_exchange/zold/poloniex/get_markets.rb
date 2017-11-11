class RestExchange::Poloniex::GetMarkets < RestExchange::Poloniex::Base

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
        pair = Pair.new(
          name: key.split("_").join("-"),
          base_currency: key.split("_").first,
          quote_currency: key.split("_").last,
          is_frozen: ticker["isFrozen"]
        )
        @exchange.pairs << pair
      end
    end
    return json_res.count
  end

end
