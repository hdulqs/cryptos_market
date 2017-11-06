class BitTrex::GetCurrencies

  def initialize
  end

  def call
    request = HttpRequest.new('https://bittrex.com', '')
    response = request.get('/api/v1.1/public/getcurrencies', '')
    json_res = JSON.parse(response)
    exchange = Exchange.find_by(name: 'bittrex')
    json_res["result"].each do |currency|
      existing_asset = exchange.assets.find_by(iso_4217: currency["Currency"])
      unless existing_asset
        asset = Asset.new(
          name: currency["CurrencyLong"],
          iso_4217: currency["Currency"],
          min_confirmation: currency["MinConfirmation"],
          tx_fee: currency["TxFee"],
          is_active: currency["IsActive"],
          coin_type: currency["CoinType"]
        )
        exchange.assets << asset
      end
    end
  end

end
