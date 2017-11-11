class RestExchange::Pairs::Adapter
  # returns an Array of Hash

  def initialize exchange, response_payload
    @exchange = exchange
    @response_payload = response_payload
  end

  def call
    if @exchange.name == 'poloniex'
      @response_payload.map do |pair|
        { name: pair.first, base_currency: pair.first.split("_").first, quote_currency: pair.first.split("_").last, is_frozen: pair.last["isFrozen"], original_payload: pair }.with_indifferent_access
      end
    elsif @exchange.name == 'bittrex'
      @response_payload['result'].map do |pair|
        pair[:original_payload] = pair.with_indifferent_access
        pair.with_indifferent_access
      end
    elsif @exchange.name == 'bitfinex'
      @response_payload.map do |pair|
        { name: pair['pair'], base_currency: pair["pair"][0..2].upcase, quote_currency: pair["pair"][3..5].upcase, minimum_order_size: pair["minimum_order_size"], original_payload: pair }.with_indifferent_access
      end
    elsif @exchange.name == 'kraken'
      #binding.pry
      @response_payload["result"].map do |k,v|
        { name: k, base_currency: v['altname'][0..2], quote_currency: v['altname'][3..5], original_payload: {key: k, value: v} }.with_indifferent_access
      end
    elsif @exchange.name == 'bitstamp'
      @response_payload.map do |pair|
        { name: pair['url_symbol'], base_currency: pair["name"].split("/").first, quote_currency: pair["name"].split("/").last, minimum_order_size: pair["minimum_order"], original_payload: pair }.with_indifferent_access
      end
    elsif @exchange.name == 'quoine'
      #binding.pry
      @response_payload.map do |pair|
        { name: pair['id'], base_currency: pair["base_currency"], quoted_currency: pair["quoted_currency"], original_payload: pair }.with_indifferent_access
      end
    elsif @exchange.name == 'hibtc'
      @response_payload.map do |pair|
        pair[:original_payload] = pair.with_indifferent_access
        pair.with_indifferent_access
      end
    else
      @response_payload.map do |pair|
        pair[:original_payload] = pair.with_indifferent_access
        pair.with_indifferent_access
      end
    end
  end

end
