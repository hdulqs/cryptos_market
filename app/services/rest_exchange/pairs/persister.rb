class RestExchange::Pairs::Persister

  def initialize exchange, pairs_array
    @exchange = exchange
    @pairs_array = pairs_array
  end

  def call
    @pairs_array.each do |pair_payload|
      existing_pair = @exchange.pairs.find_by(name: pair_payload[mapping['name']])
      #binding.pry
      unless existing_pair
        # Create market if does not yet exists
        existing_market = Market.find_by(base_currency: pair_payload[mapping[:base_currency]], quote_currency: pair_payload[mapping[:quote_currency]])
        unless existing_market
          #binding.pry
          existing_market = Market.create!(
            name: "#{pair_payload[mapping[:base_currency]]}-#{pair_payload[mapping[:quote_currency]]}",
            base_currency: pair_payload[mapping[:base_currency]],
            quote_currency: pair_payload[mapping[:quote_currency]]
          )
        end
        pair = Pair.new(
          name: pair_payload[mapping[:name]],
          base_currency: pair_payload[mapping[:base_currency]],
          quote_currency: pair_payload[mapping[:quote_currency]],
          min_trade_size: pair_payload[mapping[:min_trade_size]],
          is_active: pair_payload[mapping[:is_active]],
          is_frozen: pair_payload[mapping[:is_frozen]],
          original_payload: pair_payload[:original_payload],
          exchange_id: @exchange.id,
          market_id: existing_market.id
        )
        pair.save!
      end
    end
    return @exchange.pairs.count
  end

  private
  def mapping
    @exchange.pair_data_map.with_indifferent_access
  end

end
