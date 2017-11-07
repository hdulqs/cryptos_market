class RestExchange::BitTrex::GetMarketSummary < RestExchange::BitTrex::Base

  def initialize currency_pair
    super()
    @currency_pair = currency_pair
  end

  def call
    pair = @exchange.pairs.find_by(name: @currency_pair)
    raise "pair could not be found" unless pair
    request = HttpRequest.new(@base_url)
    response = request.get("/api/v1.1/public/getmarketsummary?market=#{@currency_pair}&type=both")
    market_summary = JSON.parse(response)["result"].first
    return market_summary
  end

end
