class RestExchange::BitTrex::GetCurrencies < RestExchange::BitTrex::Base

  def initialize
    super()
    @path = '/api/v1.1/public/getcurrencies'
  end

  def call
    request = HttpRequest.new(@base_url)
    response = request.get(@path)
    persist_assets(JSON.parse(response))
  end

  def persist_assets payload
    currency_array = payload["result"]
    Normalizer::Asset.new(@exchange, currency_array, mapping).call
    return currency_array.count
  end

  private
  def mapping
    {
      name: "CurrencyLong",
      iso_4217: "Currency",
      min_confirmation: "MinConfirmation",
      tx_fee: "TxFee",
      is_active: "IsActive",
      coin_type: "CoinType",
      is_frozen: "",
      is_delisted: "",
      is_disabled: ""
    }
  end

end
