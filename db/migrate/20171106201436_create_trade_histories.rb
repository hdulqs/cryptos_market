class CreateTradeHistories < ActiveRecord::Migration[5.1]
  def change
    create_table :trade_histories do |t|
      t.references :pair, foreign_key: true
      t.string :order_type
      t.decimal :amount
      t.decimal :price
      t.decimal :total
      t.string :fill_type
      t.timestamps
    end
  end
end
