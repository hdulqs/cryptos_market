class CreateReports < ActiveRecord::Migration[5.1]
  def change
    create_table :reports do |t|
      t.references :market, index: true, foreign_key: true
      t.jsonb :pairs, null: false, default: '{}'
      t.decimal :price_difference
      t.timestamps
    end
    add_index :reports, :pairs, using: :gin
  end
end
