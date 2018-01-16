class Ticker < ApplicationRecord
  belongs_to :pair
  before_create :get_spread

  after_create do
    TickersChannel.broadcast_to(
      'all',
      ticker: render_ticker(self)
    )
  end


  private
  def get_spread
    self.spread = ( (ask - bid) / (ask + bid) ) * 100 rescue 0
  end

  def render_ticker ticker
    ApplicationController.renderer.render(template: 'api/v1/public/tickers/show', assigns: { ticker: ticker })
  end
end
