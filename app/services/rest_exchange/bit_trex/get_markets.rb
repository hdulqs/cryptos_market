class RestExchange::BitTrex::GetMarkets < RestExchange::BitTrex::Base

  def initialize
    super()
    @path = '/api/v1.1/public/getmarkets'
  end

  def call
    response = perform_request
    persist_pairs(response)
  end

  private
  def mapping
    {
      name: "MarketName",
      base_currency: "BaseCurrency",
      quote_currency: "MarketCurrency",
      min_trade_size: "MinTradeSize",
      is_active: "IsActive"
    }
  end

  def perform_request
    request = HttpRequest.new(@base_url)
    response = request.get(@path)
    JSON.parse(response)
  end

  def persist_pairs payload
    pairs_array = payload["result"]
    Normalizer::Pair.new(@exchange, pairs_array, mapping).call
    return pairs_array.count
  end

end
