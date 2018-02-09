class TickersFetcherJob < ApplicationJob
  queue_as :tickers_fetcher_job

  def perform exchange_id
    exchange = Exchange.find(exchange_id)
    exchange.get_tickers
    random_sec = Random.rand(1..50)
    next_request = DateTime.current + (90 + random_sec).seconds
    TickersFetcherJob.set(wait_until: next_request).perform_later(exchange_id)
  end

end
