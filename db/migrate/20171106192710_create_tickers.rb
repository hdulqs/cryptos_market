class CreateTickers < ActiveRecord::Migration[5.1]
  def change
    create_table :tickers do |t|
      t.string :bid
      t.string :ask
      t.string :last
      t.references :pair, foreign_key: true
      t.timestamps
    end
  end
end
