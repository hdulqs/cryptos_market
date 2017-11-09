# Exchange.create!(name: 'bittrex')
# bit_trex_currency_nb = RestExchange::BitTrex::GetCurrencies.new.call
# puts("Retrieved #{bit_trex_currency_nb} BitTrex Currencies")
# bit_trex_market_nb = RestExchange::BitTrex::GetMarkets.new.call
# puts("Retrieved #{bit_trex_market_nb} BitTrex Markets")
#
# Exchange.create!(name: 'poloniex')
# poloniex_currency_nb = RestExchange::Poloniex::GetCurrencies.new.call
# puts("Retrieved #{poloniex_currency_nb} Poloniex Currencies")
# poloniex_market_nb = RestExchange::Poloniex::GetMarkets.new.call
# puts("Retrieved #{poloniex_market_nb} Poloniex Markets")
#
# Exchange.create!(name: 'bitfinex')
# bitfinex_currency_nb = RestExchange::BitFinex::GetCurrencies.new.call
# puts("Retrieved #{bitfinex_currency_nb} BitFinex Currencies")
# bitfinex_market_nb = RestExchange::BitFinex::GetMarkets.new.call
# puts("Retrieved #{bitfinex_market_nb} BitFinex Markets")

# poloniex = Exchange.create!(
#   name: 'poloniex',
#   base_url: 'https://poloniex.com',
#   get_assets_path: '/public?command=returnCurrencies',
#   get_pairs_path: '/public?command=returnTicker',
#   get_order_book_path: '/public?command=returnOrderBook&currencyPair=CURRENCY_PAIR_PARAM&depth=10',
#   get_tickers_path: '/public?command=returnTicker',
#   get_trade_history_path: '/public?command=returnTradeHistory&currencyPair=CURRENCY_PAIR_PARAM',
#   has_tickers_endpoint: true,
#   has_ticker_endpoint: false,
#   has_assets_endpoint: true,
#   asset_data_map: {
#     name: "name",
#     iso_4217: "iso_4217",
#     min_confirmation: "minConf",
#     tx_fee: "txFee",
#     is_active: "",
#     coin_type: "",
#     is_frozen: "frozen",
#     is_delisted: "delisted",
#     is_disabled: "disabled"
#   }.with_indifferent_access,
#   pair_data_map: {
#     name: "name",
#     base_currency: "base_currency",
#     quote_currency: "quote_currency",
#     min_trade_size: "",
#     is_active: "",
#     is_frozen: "is_frozen"
#   }.with_indifferent_access,
#   order_book_data_map: {
#     asks: "asks",
#     bids: "bids",
#     is_frozen: "isFrozen"
#   }.with_indifferent_access,
#   tickers_data_map: {
#     ask: "lowestAsk",
#     bid: "highestBid",
#     last: "Last",
#     base_volume: "baseVolume",
#     volume: "",
#     quote_volume: "quoteVolume",
#     percent_change: "percentChange"
#   }.with_indifferent_access,
#   trade_history_data_map: {
#     order_type: "type",
#     amount: "amount",
#     price: "rate",
#     total: "total",
#     fill_type: ""
#   }.with_indifferent_access
# )
# puts "Created Poloniex Exchange"
# puts poloniex.inspect
# poloniex_assets_count = poloniex.get_assets
# puts ""
# puts("Retrieved #{poloniex_assets_count} Poloniex Assets")
# puts ""
# poloniex_pairs_count = poloniex.get_pairs
# puts ""
# puts("Retrieved #{poloniex_pairs_count} Poloniex Currency Pairs")
# puts ""
#
# bittrex = Exchange.create!(
#   name: 'bittrex',
#   base_url: 'https://bittrex.com',
#   get_assets_path: '/api/v1.1/public/getcurrencies',
#   get_pairs_path: '/api/v1.1/public/getmarkets',
#   get_order_book_path: '/api/v1.1/public/getorderbook?market=CURRENCY_PAIR_PARAM&type=both', # Cannot specify depth with BitTrex
#   get_ticker_path: '/api/v1.1/public/getticker?market=CURRENCY_PAIR_PARAM',
#   get_trade_history_path: '/api/v1.1/public/getmarkethistory?market=CURRENCY_PAIR_PARAM',
#   has_assets_endpoint: true,
#   has_tickers_endpoint: false,
#   has_ticker_endpoint: true,
#   asset_data_map: {
#     name: "CurrencyLong",
#     iso_4217: "Currency",
#     min_confirmation: "MinConfirmation",
#     tx_fee: "TxFee",
#     is_active: "IsActive",
#     coin_type: "CoinType",
#     is_frozen: "",
#     is_delisted: "",
#     is_disabled: ""
#   }.with_indifferent_access,
#   pair_data_map: {
#     name: "MarketName",
#     base_currency: "BaseCurrency",
#     quote_currency: "MarketCurrency",
#     min_trade_size: "MinTradeSize",
#     is_active: "IsActive",
#     is_frozen: ""
#   }.with_indifferent_access,
#   order_book_data_map: {
#     asks: "buy",
#     bids: "sell",
#     is_frozen: ""
#   }.with_indifferent_access,
#   ticker_data_map: {
#     ask: "Ask",
#     bid: "Bid",
#     last: "Last",
#     base_volume: "",
#     volume: "",
#     quote_volume: "",
#     percent_change: ""
#   }.with_indifferent_access,
#   trade_history_data_map: {
#     order_type: "OrderType",
#     amount: "Quantity",
#     price: "Price",
#     total: "Total",
#     fill_type: "FillType"
#   }.with_indifferent_access
# )
# puts "Created Bittrex Exchange"
# puts bittrex.inspect
# bittrex_assets_count = bittrex.get_assets
# puts ""
# puts("Retrieved #{bittrex_assets_count} Bittrex Assets")
# puts ""
# bittrex_pairs_count = bittrex.get_pairs
# puts ""
# puts("Retrieved #{bittrex_pairs_count} Bittrex Currency Pairs")
# puts ""
#
# bitfinex = Exchange.create!(
#   name: 'bitfinex',
#   base_url: 'https://api.bitfinex.com',
#   get_assets_path: '/v1/symbols',
#   get_pairs_path: '/v1/symbols_details',
#   get_order_book_path: '/v1/book/CURRENCY_PAIR_PARAM', #limit_bids && limit_asks does not work...
#   get_ticker_path: '/v1/pubticker/CURRENCY_PAIR_PARAM',
#   get_trade_history_path: '/v1/trades/CURRENCY_PAIR_PARAM?limit_trades=50',
#   has_tickers_endpoint: false,
#   has_ticker_endpoint: true,
#   has_assets_endpoint: false,
#   asset_data_map: {
#     name: "name",
#     iso_4217: "iso_4217",
#     min_confirmation: "",
#     tx_fee: "",
#     is_active: "",
#     coin_type: "",
#     is_frozen: "",
#     is_delisted: "",
#     is_disabled: ""
#   }.with_indifferent_access,
#   pair_data_map: {
#     name: "name",
#     base_currency: "base_currency",
#     quote_currency: "quote_currency",
#     min_trade_size: "minimum_order_size",
#     is_active: "",
#     is_frozen: ""
#   }.with_indifferent_access,
#   order_book_data_map: {
#     asks: "asks",
#     bids: "bids",
#     is_frozen: ""
#   }.with_indifferent_access,
#   ticker_data_map: {
#     ask: "ask",
#     bid: "bid",
#     last: "last_price",
#     base_volume: "",
#     volume: "volume",
#     quote_volume: "",
#     percent_change: ""
#   }.with_indifferent_access,
#   trade_history_data_map: {
#     order_type: "type",
#     amount: "amount",
#     price: "price",
#     total: "",
#     fill_type: ""
#   }.with_indifferent_access
# )
# puts "Created Bitfinex Exchange"
# puts bitfinex.inspect
# bitfinex_assets_count = bitfinex.get_assets
# puts ""
# puts("Retrieved #{bitfinex_assets_count} Bitfinex Assets")
# puts ""
# bitfinex_pairs_count = bitfinex.get_pairs
# puts ""
# puts("Retrieved #{bitfinex_pairs_count} Bitfinex Currency Pairs")
# puts ""
# puts ""
# puts "#{Exchange.count} Exchanges Created"







kraken = Exchange.create!(
  name: 'kraken',
  base_url: 'https://api.kraken.com',
  get_assets_path: '/0/public/Assets',
  get_pairs_path: '/0/public/AssetPairs',
  get_order_book_path: '/0/public/Depth?pair=CURRENCY_PAIR_PARAM',
  get_ticker_path: '/0/public/Ticker?pair=CURRENCY_PAIR_PARAM',
  get_trade_history_path: '/0/public/Trades?pair=CURRENCY_PAIR_PARAM',
  has_tickers_endpoint: false,
  has_ticker_endpoint: true,
  has_assets_endpoint: false,
  asset_data_map: {
    name: "name",
    iso_4217: "altname",
    min_confirmation: "",
    tx_fee: "",
    is_active: "",
    coin_type: "",
    is_frozen: "",
    is_delisted: "",
    is_disabled: ""
  }.with_indifferent_access,
  pair_data_map: {
    name: "name",
    base_currency: "base_currency",
    quote_currency: "quote_currency",
    min_trade_size: "",
    is_active: "",
    is_frozen: ""
  }.with_indifferent_access,
  order_book_data_map: {
    asks: "asks",
    bids: "bids",
    is_frozen: ""
  }.with_indifferent_access,
  ticker_data_map: {
    ask: "ask",
    bid: "bid",
    last: "last_price",
    base_volume: "",
    volume: "volume",
    quote_volume: "",
    percent_change: ""
  }.with_indifferent_access,
  trade_history_data_map: {
    order_type: "order_type",
    amount: "amount",
    price: "price",
    total: "",
    fill_type: ""
  }.with_indifferent_access
)
puts "Created Kraken Exchange"
puts kraken.inspect
kraken_assets_count = kraken.get_assets
puts ""
puts("Retrieved #{kraken_assets_count} Kraken Assets")
puts ""
kraken_pairs_count = kraken.get_pairs
puts ""
puts("Retrieved #{kraken_pairs_count} Kraken Currency Pairs")
puts ""
puts ""
puts "#{Exchange.count} Exchanges Created"
