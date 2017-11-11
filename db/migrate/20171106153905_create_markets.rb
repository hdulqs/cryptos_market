class CreateMarkets < ActiveRecord::Migration[5.1]
  def change
    create_table :markets do |t|
      t.string :name
      t.string :base_currency
      t.string :quote_currency
      t.timestamps
    end
  end
end
