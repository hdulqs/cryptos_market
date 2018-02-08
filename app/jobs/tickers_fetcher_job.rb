class TickersFetcherJob < ApplicationJob
  queue_as :tickers_fetcher_job

  def perform exchange_id
    exchange = Exchange.find(exchange_id)
    exchange.get_tickers
    next_request = DateTime.current + 50.seconds
    TickersFetcherJob.set(wait_until: next_request).perform_later(exchange_id)
  end

end
