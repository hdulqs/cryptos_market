class Quotation < ApplicationRecord
  belongs_to :asset_exchange
  # May not be used
  # Would contain quotation for every currency (coming from tickers..)
end
