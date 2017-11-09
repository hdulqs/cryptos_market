class RestExchange::GetPairs < RestExchange::Base

  def initialize exchange
    @exchange = exchange
  end

  def call
    response_payload = perform_request(@exchange.base_url, @exchange.get_pairs_path)
    pairs_array = normalize_pairs_response(response_payload)

    pairs_array.each do |pair_payload|
      existing_asset = @exchange.assets.find_by(name: pair_payload[mapping['name']])
      unless existing_asset
        pair = Pair.new(
          name: pair_payload[mapping[:name]],
          base_currency: pair_payload[mapping[:base_currency]],
          quote_currency: pair_payload[mapping[:quote_currency]],
          min_trade_size: pair_payload[mapping[:min_trade_size]],
          is_active: pair_payload[mapping[:is_active]],
          is_frozen: pair_payload[mapping[:is_frozen]],
          exchange_id: @exchange.id
        )
        @exchange.pairs << pair
      end
    end

    return @exchange.pairs.count
  end

  private
  def mapping
    @exchange.pair_data_map.with_indifferent_access
  end

  def normalize_pairs_response response_payload
    # We must return an Array of Hash
    if @exchange.name == 'poloniex'
      response_payload.map do |pair|
        { name: pair.first, base_currency: pair.first.split("_").first, quote_currency: pair.first.split("_").last, is_frozen: pair.last["isFrozen"] }.with_indifferent_access
      end
    elsif @exchange.name == 'bittrex'
      response_payload['result']
    elsif @exchange.name == 'bitfinex'
      response_payload.map do |pair|
        { name: pair['pair'], base_currency: pair["pair"][0..2].upcase, quote_currency: pair["pair"][3..5].upcase, minimum_order_size: pair["minimum_order_size"] }.with_indifferent_access
      end
    elsif @exchange.name == 'kraken'
      #binding.pry
      response_payload["result"].map do |k,v|
        { name: k, base_currency: v['altname'][0..2], quote_currency: v['altname'][3..5] }.with_indifferent_access
      end
    else
      response_payload
    end
  end


end
