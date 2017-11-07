# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Exchange.create!(name: 'bittrex')
bit_trex_currency_nb = BitTrex::GetCurrencies.new.call
puts("Retrieved #{bit_trex_currency_nb} BitTrex Currencies...")
bit_trex_market_nb = BitTrex::GetMarkets.new.call
puts("Retrieved #{bit_trex_market_nb} BitTrex Markets...")

Exchange.create!(name: 'poloniex')
poloniex_currency_nb = Poloniex::GetCurrencies.new.call
puts("Retrieved #{poloniex_currency_nb} BitTrex Currencies...")
poloniex_market_nb = Poloniex::GetMarkets.new.call
puts("Retrieved #{poloniex_market_nb} BitTrex Markets...")

Exchange.create!(name: 'bitfinex')
bitfinex_currency_nb = Bitfinex::GetCurrencies.new.call
puts("Retrieved #{bitfinex_currency_nb} Bitfinex Currencies...")
