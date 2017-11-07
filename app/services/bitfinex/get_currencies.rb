class Bitfinex::GetCurrencies

  def initialize
  end

  def call
    request = HttpRequest.new('https://api.bitfinex.com', '')
    response = request.get('/v1/symbols')
    json_res = JSON.parse(response)
    exchange = Exchange.find_by(name: 'bitfinex')

    json_res.each do |currency|
      existing_asset = exchange.assets.find_by(iso_4217: currency[0..2].upcase)
      unless existing_asset
        asset = Asset.new(
          name: currency[0..2],
          iso_4217: currency[0..2].upcase#,
          #min_confirmation: currency.last["minConf"],
          #tx_fee: currency.last["txFee"],
          #is_active: currency.last["IsActive"],
          #is_disabled: currency.last["disabled"],
          #is_delisted: currency.last["delisted"],
          #is_frozen: currency.last["frozen"]
        )
        exchange.assets << asset
      end
    end

    json_res.each do |currency|
      existing_asset = exchange.assets.find_by(iso_4217: currency[3..5].upcase)
      unless existing_asset
        asset = Asset.new(
          name: currency[3..5],
          iso_4217: currency[3..5].upcase#,
          #min_confirmation: currency.last["minConf"],
          #tx_fee: currency.last["txFee"],
          #is_active: currency.last["IsActive"],
          #is_disabled: currency.last["disabled"],
          #is_delisted: currency.last["delisted"],
          #is_frozen: currency.last["frozen"]
        )
        exchange.assets << asset
      end
    end

    return exchange.assets.count
  end

end
