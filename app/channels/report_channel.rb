class ReportChannel < ApplicationCable::Channel
  # Called when the consumer has successfully
  # become a subscriber of this channel.
  def subscribed
    report = Report.find(params[:id])
    stream_for report
  end

end
