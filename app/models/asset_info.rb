class AssetInfo < ApplicationRecord
  has_attached_file :logo, styles: { medium: "300x300>", thumb: "20x20>" }#,
    # convert_options: {
    #   thumb: "-quality 100 -thumbnail 20x20"
    # }
  validates_attachment_content_type :logo, content_type: /\Aimage\/.*\z/
end
