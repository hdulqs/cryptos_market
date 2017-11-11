class Normalizer::Asset

  def initialize exchange, assets_array, hash_map
    @exchange = exchange
    @assets = assets_array
    @hash_map = hash_map
  end

  def call
    @assets.each do |asset_payload|
      create_asset(asset_payload)
    end
  end

  private
  def create_asset asset_payload
    add_asset_to_exchange(asset_payload) unless @exchange.assets.find_by(iso_4217: asset_payload[@hash_map[:iso_4217]])
  end

  def add_asset_to_exchange asset_payload
    asset = Asset.new(
      name: asset_payload[@hash_map[:name]],
      iso_4217: asset_payload[@hash_map[:iso_4217]],
      min_confirmation: asset_payload[@hash_map[:min_confirmation]],
      tx_fee: asset_payload[@hash_map[:tx_fee]],
      is_active: asset_payload[@hash_map[:is_active]],
      coin_type: asset_payload[@hash_map[:coin_type]]
    )
    @exchange.assets << asset
  end

end
