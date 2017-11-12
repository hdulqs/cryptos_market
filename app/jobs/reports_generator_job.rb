class ReportsGeneratorJob < ApplicationJob
  queue_as :reports_generator_job

  def perform
    Market.of_interest.each do |market|
      MarketAnalyser.new.generate_report(market)
    end
  end

end
