class Ticker < ApplicationRecord
  belongs_to :pair
  before_create :get_spread

  before_create do
    if pair.tickers.count >= 10
      pair.tickers.first.destroy
    end
  end

  before_destroy do
    if pair.last_ticker && pair.last_ticker.id === id
      pair.update_column(:last_ticker_id, nil)
    end
  end

  after_create do
    TickersChannel.broadcast_to(
      'all',
      ticker: render_ticker(self)
    )
  end

  after_commit do
    pair.update_column(:last_ticker_id, id)
    pair.update_market_spread
  end


  private
  def get_spread
    self.spread = ( (ask - bid) / (ask + bid) ) * 100 rescue 0
  end

  def render_ticker ticker
    ApplicationController.renderer.render(template: 'api/v1/public/tickers/show', assigns: { ticker: ticker })
  end
end
