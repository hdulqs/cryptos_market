class AssetsLogoRetriever

  def initialize
  end

  def call

    request = HttpRequest.new('https://www.cryptocompare.com')
    response = request.get('/api/data/coinlist/')
    res = JSON.parse(response)["Data"]

    res.each do |infos|
      asset_info = AssetInfo.find_by(symbol: infos.first)
      if asset_info
        path = infos.last["ImageUrl"]
        return unless path
        asset_info.logo = 'https://www.cryptocompare.com' + path
        asset_info.save!
      else
        puts 'no asset info for ' + infos.first
      end
    end

  end

end
