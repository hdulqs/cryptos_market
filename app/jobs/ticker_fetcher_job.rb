class TickerFetcherJob < ApplicationJob
  queue_as :ticker_fetcher_job

  # We need to make sure not to get banned !!

  def perform pair_id
    pair = Pair.find(pair_id)
    if pair.market.is_watched && pair.is_watched
      random_sec = Random.rand(1..9)
      if pair.exchange.last_ticker_request && (pair.exchange.last_ticker_request > (DateTime.current - 15.seconds)) # last_ticker_request Happened less than 30 seconds ago
        # Too early to perform request yet
        next_request = DateTime.current + 15.seconds  # Trying to fullfill its destiny every 15 seconds
      else
        pair.get_ticker
        next_request = DateTime.current + 15.seconds + random_sec.seconds # Request to exchange for pair_id every 3 minutes
      end
      TickerFetcherJob.set(wait_until: next_request).perform_later(pair_id)
    end
  end

end
