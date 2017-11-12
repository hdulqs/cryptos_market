class MarketsFetcherJob < ApplicationJob
  queue_as :markets_fetcher_job

  def perform
    markets = Market
      .left_joins(:pairs)
      .group(:id)
      .order('COUNT(pairs.id) DESC')
      .limit(15)
    markets.each do |market|
      market.pairs.each do |pair|
        pair_id = pair.id
        TickerFetcherJob.set.perform_later(pair_id)
      end
    end
  end

end
