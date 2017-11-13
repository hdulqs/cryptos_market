class Report < ApplicationRecord
  belongs_to :market

  after_create do
    MarketChannel.broadcast_to(
      self.market,
      rendered_report: rendered_report(self),
      report: self
    )
  end

  after_commit do
    market = self.market
    diff = self.price_difference || 0
    #market.price_difference = diff
    #market.save!
    market.update_column(:price_difference, diff)
  end

  private
  def rendered_report(report)
    ApplicationController.renderer.render(partial: 'backend/reports/report', locals: { report: report })
  end
end
