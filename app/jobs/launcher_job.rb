class LauncherJob < ApplicationJob
  # Runs Once at startup !
  queue_as :launcher_job

  def perform
    markets_of_interest = Market.of_interest
    pairs_of_interest = markets_of_interest.map(&:pairs).flatten

    pairs_of_interest.each do |pair|
      pair_id = pair.id
      random_sec = Random.rand(1..4)
      moment = DateTime.current + random_sec.seconds
      TickerFetcherJob.set(wait_until: moment).perform_later(pair_id)
    end
  end

end
