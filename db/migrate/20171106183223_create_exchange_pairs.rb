class CreateExchangePairs < ActiveRecord::Migration[5.1]
  def change
    create_table :exchange_pairs do |t|
      t.references :exchange, foreign_key: true
      t.references :pair, foreign_key: true
      t.timestamps
    end
    add_index(:exchange_pairs, [:pair_id, :exchange_id], unique: true)
  end
end
