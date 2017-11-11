class RestExchange::BitFinex::GetMarkets < RestExchange::BitFinex::Base

  def initialize
    super()
    @path = '/v1/symbols_details'
  end

  def call
    request = HttpRequest.new(@base_url)
    response = request.get(@path)
    json_res = JSON.parse(response)

    json_res.each do |currency_pair|
      std_pair = currency_pair["pair"].upcase[0..2] + "-" + currency_pair["pair"].upcase[3..5]
      existing_pair = @exchange.pairs.find_by(name: std_pair)
      unless existing_pair
        pair = Pair.new(
          name: std_pair,
          base_currency: std_pair.split("-").first,
          quote_currency: std_pair.split("-").last,
          min_trade_size: currency_pair["minimum_order_size"]
        )
        @exchange.pairs << pair
      end
    end
    return json_res.count
  end

end
