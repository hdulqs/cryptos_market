class RestExchange::Poloniex::GetCurrencies < RestExchange::Poloniex::Base

  def initialize
    super()
    @path = '/public?command=returnCurrencies'
  end

  def call
    request = HttpRequest.new(@base_url)
    response = request.get(@path)
    json_res = JSON.parse(response)
    
    json_res.each do |currency|
      existing_asset = @exchange.assets.find_by(iso_4217: currency.first)
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
        @exchange.assets << asset
      end
    end
    return json_res.count
  end

end
