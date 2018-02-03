class PortfolioAsset < ApplicationRecord
  belongs_to :portfolio
  belongs_to :asset_info
end
