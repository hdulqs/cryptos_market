class BitTrex::GetMarkets

  def initialize
  end

  def call
    request = HttpRequest.new('https://bittrex.com', '')
    response = request.get('/api/v1.1/public/getmarkets')
    json_res = JSON.parse(response)
    exchange = Exchange.find_by(name: 'bittrex')
    json_res["result"].each do |pair|
      existing_pair = exchange.pairs.find_by(name: pair["MarketName"])
      unless existing_pair
        pair = Pair.new(
          name: pair["MarketName"],
          base_currency: pair["BaseCurrency"],
          quote_currency: pair["MarketCurrency"],
          min_trade_size: pair["MinTradeSize"],
          is_active: pair["IsActive"]
        )
        exchange.pairs << pair
      end
    end
    return json_res["result"].count
  end

end
