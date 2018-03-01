class RestExchange::AssetsInfo::Persister

  def initialize assets_array
    @assets_array = assets_array
  end

  def call
    @assets_array.each do |asset_payload|
      asset = AssetInfo.find_by(name: asset_payload[:name])
      if asset
        asset_payload[:volume_usd_24h] = asset_payload["24h_volume_usd"]
        asset_payload.except!("id", "24h_volume_usd")
        asset.update_attributes(asset_payload)
      else
        asset = AssetInfo.new(
          original_id: asset_payload[:id],
          rank: asset_payload[:rank],
          name: asset_payload[:name],
          symbol: asset_payload[:symbol],
          price_usd: asset_payload[:price_usd],
          price_btc: asset_payload[:price_btc],
          volume_usd_24h: asset_payload["24h_volume_usd"],
          market_cap_usd: asset_payload[:market_cap_usd],
          available_supply: asset_payload[:available_supply],
          total_supply: asset_payload[:total_supply],
          max_supply: asset_payload[:max_supply],
          percent_change_1h: asset_payload[:percent_change_1h],
          percent_change_24h: asset_payload[:percent_change_24h],
          percent_change_7d: asset_payload[:percent_change_7d],
          last_updated: asset_payload[:last_updated],
          original_payload: asset_payload[:original_payload]
        )
        asset.save!
      end
    end
  end

end
