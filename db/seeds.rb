# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Exchange.create!(name: 'bittrex')
bit_trex_currency_nb = RestExchange::BitTrex::GetCurrencies.new.call
puts("Retrieved #{bit_trex_currency_nb} BitTrex Currencies")
bit_trex_market_nb = RestExchange::BitTrex::GetMarkets.new.call
puts("Retrieved #{bit_trex_market_nb} BitTrex Markets")

Exchange.create!(name: 'poloniex')
poloniex_currency_nb = RestExchange::Poloniex::GetCurrencies.new.call
puts("Retrieved #{poloniex_currency_nb} Poloniex Currencies")
poloniex_market_nb = RestExchange::Poloniex::GetMarkets.new.call
puts("Retrieved #{poloniex_market_nb} Poloniex Markets")

Exchange.create!(name: 'bitfinex')
bitfinex_currency_nb = RestExchange::BitFinex::GetCurrencies.new.call
puts("Retrieved #{bitfinex_currency_nb} BitFinex Currencies")
bitfinex_market_nb = RestExchange::BitFinex::GetMarkets.new.call
puts("Retrieved #{bitfinex_market_nb} BitFinex Markets")
