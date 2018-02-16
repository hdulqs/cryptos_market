#require 'sidekiq/api'

class TickersFetcherJob
  include Sidekiq::Worker
  sidekiq_options :queue => :tickers_fetcher_job, :retry => 1, :backtrace => true
    #queue_as :tickers_fetcher_job

  # rescue_from(StandardError) do |exception|
  #   Rails.logger.error "[#{self.class.name}] Failed : #{exception.to_s}"
  #   logger.info "[#{self.class.name}] Failed : #{exception.to_s}"
  # end

  def perform exchange_name
    # queue = Sidekiq::Queue.new("tickers_fetcher_job")
    # if queue.map{|job| job.args[0]["arguments"][0]}.include?(exchange_name)
    #   # A job that is executing is not enqueued anymore. The Sidekiq process has already popped it off the queue and is executing it. The queue is empty but the job is not finished yet.
    #   logger.info "Job with argument #{exchange_name} already exists in queue" && return
    # end

      exchange = Exchange.find_by(name: exchange_name)
      logger.info "#{exchange.name} is already being fetched for tickers" and return if exchange.is_fetching_tickers

      begin
        exchange.update_column(:is_fetching_tickers, true)
        exchange.get_tickers
      rescue => error
        logger.info error
        raise error
        #exchange.update_column(:is_fetching_tickers, false)
      ensure
        exchange.update_column(:is_fetching_tickers, false)
      end

    #random_sec = Random.rand(30..80)
    #next_request = DateTime.current + (90 + random_sec).seconds
    #TickersFetcherJob.set(wait_until: next_request).perform_later(exchange_name)
  end

end







#
# class TickersFetcherJob < ApplicationJob
#   queue_as :tickers_fetcher_job
#
#   rescue_from(StandardError) do |exception|
#     Rails.logger.error "[#{self.class.name}] Failed : #{exception.to_s}"
#     logger.info "[#{self.class.name}] Failed : #{exception.to_s}"
#   end
#
#   def perform exchange_name
#     # queue = Sidekiq::Queue.new("tickers_fetcher_job")
#     # if queue.map{|job| job.args[0]["arguments"][0]}.include?(exchange_name)
#     #   # A job that is executing is not enqueued anymore. The Sidekiq process has already popped it off the queue and is executing it. The queue is empty but the job is not finished yet.
#     #   logger.info "Job with argument #{exchange_name} already exists in queue" && return
#     # end
#
#     exchange = Exchange.find_by(name: exchange_name)
#     return if exchange.is_fetching_tickers
#
#     begin
#       exchange.update_column(:is_fetching_tickers, true)
#       exchange.get_tickers
#     rescue => error
#       logger.info error
#       #exchange.update_column(:is_fetching_tickers, false)
#     ensure
#       exchange.update_column(:is_fetching_tickers, false)
#     end
#
#     #random_sec = Random.rand(30..80)
#     #next_request = DateTime.current + (90 + random_sec).seconds
#     #TickersFetcherJob.set(wait_until: next_request).perform_later(exchange_name)
#   end
#
# end
