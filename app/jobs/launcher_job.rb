class LauncherJob < ApplicationJob
  # Runs Once at startup !
  #sidekiq_options :retry => false
  queue_as :launcher_job

  def perform
    # Cleaner.reset_sidekiq
    markets_of_interest = Market.of_interest
    pairs_of_interest = markets_of_interest.map(&:pairs).flatten

    pairs_of_interest.each do |pair|
      if(pair.exchange.has_ticker_endpoint && !pair.exchange.has_tickers_endpoint)
        pair_id = pair.id
        random_sec = Random.rand(1..30)
        moment = DateTime.current + random_sec.seconds
        TickerFetcherJob.set(wait_until: moment).perform_later(pair_id)
      end
    end

    Exchange.where(has_tickers_endpoint: true).each do |exchange|
      exchange_id = exchange.id
      TickersFetcherJob.perform_later(exchange_id)
    end
  end

end
