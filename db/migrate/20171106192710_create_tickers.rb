class CreateTickers < ActiveRecord::Migration[5.1]
  def change
    create_table :tickers do |t|
      t.string :bid
      t.string :ask
      t.string :last
      t.decimal :volume
      t.decimal :base_volume
      t.decimal :quote_volume
      t.decimal :percent_change
      t.references :pair, foreign_key: true
      t.timestamps
    end
  end
end
