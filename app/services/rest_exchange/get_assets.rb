class RestExchange::GetAssets < RestExchange::Base

  def initialize exchange
    @exchange = exchange
  end

  def call
    response_payload = perform_request(@exchange.base_url, @exchange.get_assets_path)
    assets_array = normalize_assets_response(response_payload)

    assets_array.each do |asset_payload|
      existing_asset = @exchange.assets.find_by(iso_4217: asset_payload[mapping[:iso_4217]])
      unless existing_asset
        asset = Asset.new(
          name: asset_payload[mapping[:name]],
          iso_4217: asset_payload[mapping[:iso_4217]],
          min_confirmation: asset_payload[mapping[:min_confirmation]],
          tx_fee: asset_payload[mapping[:tx_fee]],
          coin_type: asset_payload[mapping[:coin_type]],
          is_active: asset_payload[mapping[:is_active]],
          is_disabled: asset_payload[mapping[:is_disabled]],
          is_delisted: asset_payload[mapping[:is_delisted]],
          is_frozen: asset_payload[mapping[:is_frozen]],
          exchange_id: @exchange.id
        )
        @exchange.assets << asset
      end
    end

    return @exchange.assets.count
  end

  private
  def mapping
    @exchange.asset_data_map.with_indifferent_access
  end

  def bitfinex_transform payload
    Transformers::PairsArrayToAssetsArray.new(payload).run
  end

  def normalize_assets_response response_payload
    # We must return an Array of Hash
    if @exchange.name == 'poloniex'
      # Poloniex returns a hash with asset being the key...
      response_payload.map{|k,v| v["iso_4217"] = k ; v}
    elsif @exchange.name == 'bittrex'
      # BiTrex makes a good job...
      response_payload["result"]
    elsif @exchange.name == 'bitfinex'
      # Bitfiniex does not have an endpoint to get Currencies so we get them through pairs...
      bitfinex_transform(response_payload)
    else
      response_payload
    end
  end

end
