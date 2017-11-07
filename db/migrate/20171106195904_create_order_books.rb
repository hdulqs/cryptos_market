class CreateOrderBooks < ActiveRecord::Migration[5.1]
  def change
    create_table :order_books do |t|
      t.jsonb :asks, null: false, default: '{}'
      t.jsonb :bids, null: false, default: '{}'
      t.boolean :is_frozen, default: false
      t.references :pair, foreign_key: true
      t.timestamps
    end
  end
end
