class TickersFetcherJob < ApplicationJob
  queue_as :tickers_fetcher_job

  rescue_from(StandardError) do |exception|
    Rails.logger.error "[#{self.class.name}] Failed : #{exception.to_s}"
    logger.info "[#{self.class.name}] Failed : #{exception.to_s}"
  end

  def perform exchange_name
    exchange = Exchange.find_by(name: exchange_name)
    exchange.get_tickers
    #random_sec = Random.rand(30..80)
    #next_request = DateTime.current + (90 + random_sec).seconds
    #TickersFetcherJob.set(wait_until: next_request).perform_later(exchange_name)
  end

end
