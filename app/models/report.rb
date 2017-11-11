class Report < ApplicationRecord
  belongs_to :market

  after_save do
    #ReportChannel.broadcast_to(
    #  self,
    #  rendered_report: rendered_report(self),
    #  report: self
    #)
  end

  private
  def rendered_report(report)
    ApplicationController.renderer.render(partial: 'reports/report', locals: { report: report })
  end
end
