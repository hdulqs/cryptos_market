class CreatePairs < ActiveRecord::Migration[5.1]
  def change
    create_table :pairs do |t|
      t.string :name
      t.string :quote_currency
      t.string :base_currency
      t.decimal :min_trade_size
      t.boolean :is_active#, default: true
      t.boolean :is_frozen#, default: false
      t.references :exchange, foreign_key: true
      t.timestamps
    end
  end
end
