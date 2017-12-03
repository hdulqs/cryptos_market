class Ticker < ApplicationRecord
  belongs_to :pair
  before_create :get_spread
  private
  def get_spread
    self.spread = ( (ask - bid) / (ask + bid) ) * 100
  end
end
