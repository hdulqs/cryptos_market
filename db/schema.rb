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

ActiveRecord::Schema.define(version: 20171106192710) do

  create_table "asset_exchanges", force: :cascade do |t|
    t.integer "asset_id"
    t.integer "exchange_id"
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
    t.boolean "is_active", default: true
    t.string "coin_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "exchange_pairs", force: :cascade do |t|
    t.integer "exchange_id"
    t.integer "pair_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["exchange_id"], name: "index_exchange_pairs_on_exchange_id"
    t.index ["pair_id", "exchange_id"], name: "index_exchange_pairs_on_pair_id_and_exchange_id", unique: true
    t.index ["pair_id"], name: "index_exchange_pairs_on_pair_id"
  end

  create_table "exchanges", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pairs", force: :cascade do |t|
    t.string "name"
    t.string "quote_currency"
    t.string "base_currency"
    t.string "min_trade_size"
    t.boolean "is_active", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "quotations", force: :cascade do |t|
    t.decimal "price"
    t.integer "asset_exchange_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["asset_exchange_id"], name: "index_quotations_on_asset_exchange_id"
  end

  create_table "tickers", force: :cascade do |t|
    t.string "bid"
    t.string "ask"
    t.string "last"
    t.integer "pair_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["pair_id"], name: "index_tickers_on_pair_id"
  end

end
