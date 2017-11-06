class CreateAssetExchanges < ActiveRecord::Migration[5.1]
  def change
    create_table :asset_exchanges do |t|
      t.references :asset, foreign_key: true
      t.references :exchange, foreign_key: true
      t.timestamps
    end
    add_index(:asset_exchanges, [:asset_id, :exchange_id], unique: true)
  end
end
