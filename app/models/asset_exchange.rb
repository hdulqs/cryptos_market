class AssetExchange < ApplicationRecord
  belongs_to :asset
  belongs_to :exchange
  has_many :quotations
end
