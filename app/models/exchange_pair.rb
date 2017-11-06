class ExchangePair < ApplicationRecord
  belongs_to :exchange
  belongs_to :pair
end
