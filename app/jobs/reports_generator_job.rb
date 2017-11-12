class ReportsGeneratorJob < ApplicationJob
  queue_as :reports_generator_job

  def perform
    markets = Market
      .left_joins(:pairs)
      .group(:id)
      .order('COUNT(pairs.id) DESC')
      .limit(15)
    markets.each do |market|
      MarketAnalyser.new.generate_report(market)
    end
  end

end
