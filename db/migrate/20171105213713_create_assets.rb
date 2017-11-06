class CreateAssets < ActiveRecord::Migration[5.1]
  def change
    create_table :assets do |t|
      t.string :name
      t.string :iso_4217
      t.integer :min_confirmation
      t.decimal :tx_fee # decimal might not be enough ..?
      t.boolean :is_active, default: true
      t.string :coin_type
      t.timestamps
    end
  end
end
