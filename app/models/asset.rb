class Asset < ApplicationRecord
  has_many :asset_exchanges
  has_many :exchanges, through: :asset_exchanges
  
  def quotations
    asset_exchanges.map(&:quotations).flatten
  end
end
