class RestExchange::Pairs::Fetcher < RestExchange::Base

  def initialize exchange
    @exchange = exchange
  end

  def call
    response_payload = perform_request(@exchange.base_url, @exchange.get_pairs_path)
    pairs_array = RestExchange::Pairs::Adapter.new(@exchange, response_payload).call
    exchange_pairs_count = RestExchange::Pairs::Persister.new(@exchange, pairs_array).call
    return exchange_pairs_count
  end

end
