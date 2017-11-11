class RestExchange::BitFinex::GetCurrencies < RestExchange::BitFinex::Base

  def initialize
    super()
    @path = '/v1/symbols'
  end

  def call
    request = HttpRequest.new(@base_url)
    response = request.get(@path)
    json_res = JSON.parse(response)

    json_res.each do |currency|
      existing_asset = @exchange.assets.find_by(iso_4217: currency[0..2].upcase)
      unless existing_asset
        asset = Asset.new(
          name: currency[0..2],
          iso_4217: currency[0..2].upcase
        )
        @exchange.assets << asset
      end
    end

    json_res.each do |currency|
      existing_asset = @exchange.assets.find_by(iso_4217: currency[3..5].upcase)
      unless existing_asset
        asset = Asset.new(
          name: currency[3..5],
          iso_4217: currency[3..5].upcase
        )
        @exchange.assets << asset
      end
    end

    return @exchange.assets.count
  end

end
