class RestExchange::AssetsInfo::Adapter
  # returns an Array of Hash

  def initialize response_payload
    @response_payload = response_payload
  end

  def call
    @response_payload.map do |asset|
      asset[:original_payload] = asset.with_indifferent_access
      asset.with_indifferent_access
    end
  end

end
