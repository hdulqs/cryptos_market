class Asset < ApplicationRecord
  has_many :asset_exchanges
  has_many :exchanges, through: :asset_exchanges
  belongs_to :exchange

  def quotations
    asset_exchanges.map(&:quotations).flatten
  end
end
