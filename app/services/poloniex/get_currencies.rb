class Poloniex::GetCurrencies

  def initialize
  end

  def call
    request = HttpRequest.new('https://poloniex.com', '')
    response = request.get('/public?command=returnCurrencies')
    json_res = JSON.parse(response)
    exchange = Exchange.find_by(name: 'poloniex')
    json_res.each do |currency|
      existing_asset = exchange.assets.find_by(iso_4217: currency.first)
      unless existing_asset
        asset = Asset.new(
          name: currency.last["name"],
          iso_4217: currency.first,
          min_confirmation: currency.last["minConf"],
          tx_fee: currency.last["txFee"],
          is_active: currency.last["IsActive"],
          is_disabled: currency.last["disabled"],
          is_delisted: currency.last["delisted"],
          is_frozen: currency.last["frozen"]
        )
        exchange.assets << asset
      end
    end
    return json_res.count
  end

end
