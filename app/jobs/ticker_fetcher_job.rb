class TickerFetcherJob < ApplicationJob
  queue_as :ticker_fetcher_job

  def perform pair_id
    pair = Pair.find(pair_id)
    pair.get_ticker
  end

end
