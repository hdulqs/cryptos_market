class Market < ApplicationRecord
  has_many :pairs
  has_many :exchanges, through: :pairs
  has_many :reports
  validates :name, uniqueness: true

  has_attached_file :base_currency_logo, styles: { medium: "300x300>", thumb: "20x20>" }, default_url: "/system/images/:style/missing.png"
  validates_attachment_content_type :base_currency_logo, content_type: /\Aimage\/.*\z/

  has_attached_file :quote_currency_logo, styles: { medium: "300x300>", thumb: "20x20>" }, default_url: "/system/images/:style/missing.png"
  validates_attachment_content_type :quote_currency_logo, content_type: /\Aimage\/.*\z/

  scope :of_interest, -> {
    where(is_watched: true)
  }

  scope :credible, -> {
    where(price_difference: 2..90)
  }

end
