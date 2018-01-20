class RestExchange::AssetsInfo::Fetcher < RestExchange::Base

  def initialize

  end

  def call
    begin
      response_payload = perform_request("https://api.coinmarketcap.com", "/v1/ticker/?limit=0")
    rescue
      sleep(2)
      retry
    end
    assets_array = RestExchange::AssetsInfo::Adapter.new(response_payload).call
    asset_infos = RestExchange::AssetsInfo::Persister.new(assets_array).call
    return asset_infos
  end

end
