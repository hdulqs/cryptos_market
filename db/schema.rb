# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171106201436) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "asset_exchanges", force: :cascade do |t|
    t.bigint "asset_id"
    t.bigint "exchange_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["asset_id", "exchange_id"], name: "index_asset_exchanges_on_asset_id_and_exchange_id", unique: true
    t.index ["asset_id"], name: "index_asset_exchanges_on_asset_id"
    t.index ["exchange_id"], name: "index_asset_exchanges_on_exchange_id"
  end

  create_table "assets", force: :cascade do |t|
    t.string "name"
    t.string "iso_4217"
    t.integer "min_confirmation"
    t.decimal "tx_fee"
    t.boolean "is_active"
    t.string "coin_type"
    t.boolean "is_disabled"
    t.boolean "is_delisted"
    t.boolean "is_frozen"
    t.bigint "exchange_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["exchange_id"], name: "index_assets_on_exchange_id"
  end

  create_table "exchange_pairs", force: :cascade do |t|
    t.bigint "exchange_id"
    t.bigint "pair_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["exchange_id"], name: "index_exchange_pairs_on_exchange_id"
    t.index ["pair_id", "exchange_id"], name: "index_exchange_pairs_on_pair_id_and_exchange_id", unique: true
    t.index ["pair_id"], name: "index_exchange_pairs_on_pair_id"
  end

  create_table "exchanges", force: :cascade do |t|
    t.string "name"
    t.string "base_url"
    t.string "get_assets_path"
    t.string "get_pairs_path"
    t.string "get_order_book_path"
    t.string "get_tickers_path"
    t.string "get_ticker_path"
    t.string "get_trade_history_path"
    t.boolean "has_assets_endpoint"
    t.boolean "has_ticker_endpoint"
    t.boolean "has_tickers_endpoint"
    t.jsonb "asset_data_map", default: "{}", null: false
    t.jsonb "pair_data_map", default: "{}", null: false
    t.jsonb "order_book_data_map", default: "{}", null: false
    t.jsonb "tickers_data_map", default: "{}", null: false
    t.jsonb "ticker_data_map", default: "{}", null: false
    t.jsonb "trade_history_data_map", default: "{}", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["asset_data_map"], name: "index_exchanges_on_asset_data_map", using: :gin
    t.index ["order_book_data_map"], name: "index_exchanges_on_order_book_data_map", using: :gin
    t.index ["pair_data_map"], name: "index_exchanges_on_pair_data_map", using: :gin
    t.index ["ticker_data_map"], name: "index_exchanges_on_ticker_data_map", using: :gin
    t.index ["tickers_data_map"], name: "index_exchanges_on_tickers_data_map", using: :gin
    t.index ["trade_history_data_map"], name: "index_exchanges_on_trade_history_data_map", using: :gin
  end

  create_table "order_books", force: :cascade do |t|
    t.jsonb "asks", default: "{}", null: false
    t.jsonb "bids", default: "{}", null: false
    t.boolean "is_frozen"
    t.bigint "pair_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["asks"], name: "index_order_books_on_asks", using: :gin
    t.index ["bids"], name: "index_order_books_on_bids", using: :gin
    t.index ["pair_id"], name: "index_order_books_on_pair_id"
  end

  create_table "pairs", force: :cascade do |t|
    t.string "name"
    t.string "quote_currency"
    t.string "base_currency"
    t.decimal "min_trade_size"
    t.boolean "is_active"
    t.boolean "is_frozen"
    t.bigint "exchange_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["exchange_id"], name: "index_pairs_on_exchange_id"
  end

  create_table "quotations", force: :cascade do |t|
    t.decimal "price"
    t.bigint "asset_exchange_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["asset_exchange_id"], name: "index_quotations_on_asset_exchange_id"
  end

  create_table "tickers", force: :cascade do |t|
    t.string "bid"
    t.string "ask"
    t.string "last"
    t.decimal "volume"
    t.decimal "base_volume"
    t.decimal "quote_volume"
    t.decimal "percent_change"
    t.bigint "pair_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["pair_id"], name: "index_tickers_on_pair_id"
  end

  create_table "trade_histories", force: :cascade do |t|
    t.bigint "pair_id"
    t.string "order_type"
    t.decimal "amount"
    t.decimal "price"
    t.decimal "total"
    t.string "fill_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["pair_id"], name: "index_trade_histories_on_pair_id"
  end

  add_foreign_key "asset_exchanges", "assets"
  add_foreign_key "asset_exchanges", "exchanges"
  add_foreign_key "assets", "exchanges"
  add_foreign_key "exchange_pairs", "exchanges"
  add_foreign_key "exchange_pairs", "pairs"
  add_foreign_key "order_books", "pairs"
  add_foreign_key "pairs", "exchanges"
  add_foreign_key "quotations", "asset_exchanges"
  add_foreign_key "tickers", "pairs"
  add_foreign_key "trade_histories", "pairs"
end
