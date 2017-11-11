class Normalizer::Pair

  def initialize exchange, pairs_array, hash_map
    @exchange = exchange
    @pairs = pairs_array
    @hash_map = hash_map
  end

  def call
    @pairs.each do |pair_payload|
      create_pair(pair_payload)
    end
  end

  private
  def create_pair pair_payload
    add_pair_to_exchange(pair_payload) unless @exchange.pairs.find_by(name: pair_payload[@hash_map[:name]])
  end

  def add_pair_to_exchange pair_payload
    pair = Pair.new(
      name: pair_payload[@hash_map[:name]],
      base_currency: pair_payload[@hash_map[:base_currency]],
      quote_currency: pair_payload[@hash_map[:quote_currency]],
      min_trade_size: pair_payload[@hash_map[:min_trade_size]],
      is_active: pair_payload[@hash_map[:is_active]]
    )
    @exchange.pairs << pair
  end

end
