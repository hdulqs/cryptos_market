class CreateQuotations < ActiveRecord::Migration[5.1]
  def change
    create_table :quotations do |t|
      t.decimal :price
      t.references :asset_exchange, foreign_key: true
      t.timestamps
    end
  end
end
