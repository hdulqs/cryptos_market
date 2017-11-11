

poloniex = Exchange.create!(
  name: 'poloniex',
  base_url: 'https://poloniex.com',
  get_assets_path: '/public?command=returnCurrencies',
  get_pairs_path: '/public?command=returnTicker',
  get_order_book_path: '/public?command=returnOrderBook&currencyPair=CURRENCY_PAIR_PARAM&depth=10',
  get_tickers_path: '/public?command=returnTicker',
  get_trade_history_path: '/public?command=returnTradeHistory&currencyPair=CURRENCY_PAIR_PARAM',
  has_tickers_endpoint: true,
  has_ticker_endpoint: false,
  has_assets_endpoint: true,
  asset_data_map: {
    name: "name",
    iso_4217: "iso_4217",
    min_confirmation: "minConf",
    tx_fee: "txFee",
    is_active: "",
    coin_type: "",
    is_frozen: "frozen",
    is_delisted: "delisted",
    is_disabled: "disabled"
  }.with_indifferent_access,
  pair_data_map: {
    name: "name",
    base_currency: "base_currency",
    quote_currency: "quote_currency",
    min_trade_size: "",
    is_active: "",
    is_frozen: "is_frozen"
  }.with_indifferent_access,
  order_book_data_map: {
    asks: "asks",
    bids: "bids",
    is_frozen: "isFrozen"
  }.with_indifferent_access,
  tickers_data_map: {
    ask: "lowestAsk",
    bid: "highestBid",
    last: "Last",
    base_volume: "baseVolume",
    volume: "",
    quote_volume: "quoteVolume",
    percent_change: "percentChange",
    high: "high",
    low: "low",
    timestamp: "timestamp",
    market_symbol: "market_symbol"
  }.with_indifferent_access,
  trade_history_data_map: {
    order_type: "type",
    amount: "amount",
    price: "rate",
    total: "total",
    fill_type: "",
    event_timestamp: "event_timestamp"
  }.with_indifferent_access
)
puts "Created Poloniex Exchange"
puts poloniex.inspect
poloniex_assets_count = poloniex.get_assets
puts ""
puts("Retrieved #{poloniex_assets_count} Poloniex Assets")
puts ""
poloniex_pairs_count = poloniex.get_pairs
puts ""
puts("Retrieved #{poloniex_pairs_count} Poloniex Currency Pairs")
puts ""

bittrex = Exchange.create!(
  name: 'bittrex',
  base_url: 'https://bittrex.com',
  get_assets_path: '/api/v1.1/public/getcurrencies',
  get_pairs_path: '/api/v1.1/public/getmarkets',
  get_order_book_path: '/api/v1.1/public/getorderbook?market=CURRENCY_PAIR_PARAM&type=both', # Cannot specify depth with BitTrex
  get_ticker_path: '/api/v1.1/public/getticker?market=CURRENCY_PAIR_PARAM',
  get_trade_history_path: '/api/v1.1/public/getmarkethistory?market=CURRENCY_PAIR_PARAM',
  has_assets_endpoint: true,
  has_tickers_endpoint: false,
  has_ticker_endpoint: true,
  asset_data_map: {
    name: "CurrencyLong",
    iso_4217: "Currency",
    min_confirmation: "MinConfirmation",
    tx_fee: "TxFee",
    is_active: "IsActive",
    coin_type: "CoinType",
    is_frozen: "",
    is_delisted: "",
    is_disabled: ""
  }.with_indifferent_access,
  pair_data_map: {
    name: "MarketName",
    base_currency: "BaseCurrency",
    quote_currency: "MarketCurrency",
    min_trade_size: "MinTradeSize",
    is_active: "IsActive",
    is_frozen: ""
  }.with_indifferent_access,
  order_book_data_map: {
    asks: "sell",
    bids: "buy",
    is_frozen: ""
  }.with_indifferent_access,
  ticker_data_map: {
    ask: "Ask",
    bid: "Bid",
    last: "Last",
    base_volume: "",
    volume: "",
    quote_volume: "",
    percent_change: "",
    high: "high",
    low: "low",
    timestamp: "timestamp",
    market_symbol: "market_symbol"
  }.with_indifferent_access,
  trade_history_data_map: {
    order_type: "OrderType",
    amount: "Quantity",
    price: "Price",
    total: "Total",
    fill_type: "FillType",
    event_timestamp: "date"
  }.with_indifferent_access
)
puts "Created Bittrex Exchange"
puts bittrex.inspect
bittrex_assets_count = bittrex.get_assets
puts ""
puts("Retrieved #{bittrex_assets_count} Bittrex Assets")
puts ""
bittrex_pairs_count = bittrex.get_pairs
puts ""
puts("Retrieved #{bittrex_pairs_count} Bittrex Currency Pairs")
puts ""

bitfinex = Exchange.create!(
  name: 'bitfinex',
  base_url: 'https://api.bitfinex.com',
  get_assets_path: '/v1/symbols',
  get_pairs_path: '/v1/symbols_details',
  get_order_book_path: '/v1/book/CURRENCY_PAIR_PARAM', #limit_bids && limit_asks does not work...
  get_ticker_path: '/v1/pubticker/CURRENCY_PAIR_PARAM',
  get_trade_history_path: '/v1/trades/CURRENCY_PAIR_PARAM?limit_trades=50',
  has_tickers_endpoint: false,
  has_ticker_endpoint: true,
  has_assets_endpoint: false,
  asset_data_map: {
    name: "name",
    iso_4217: "iso_4217",
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
    min_trade_size: "minimum_order_size",
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
    percent_change: "",
    high: "high",
    low: "low",
    timestamp: "timestamp",
    market_symbol: "market_symbol"
  }.with_indifferent_access,
  trade_history_data_map: {
    order_type: "type",
    amount: "amount",
    price: "price",
    total: "",
    fill_type: "",
    event_timestamp: "date"
  }.with_indifferent_access
)
puts "Created Bitfinex Exchange"
puts bitfinex.inspect
bitfinex_assets_count = bitfinex.get_assets
puts ""
puts("Retrieved #{bitfinex_assets_count} Bitfinex Assets")
puts ""
bitfinex_pairs_count = bitfinex.get_pairs
puts ""
puts("Retrieved #{bitfinex_pairs_count} Bitfinex Currency Pairs")
puts ""
puts ""
puts "#{Exchange.count} Exchanges Created"

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
    last: "last",
    base_volume: "",
    volume: "volume",
    quote_volume: "",
    percent_change: "",
    high: "high",
    low: "low",
    timestamp: "timestamp",
    market_symbol: "market_symbol"
  }.with_indifferent_access,
  trade_history_data_map: {
    order_type: "order_type",
    amount: "amount",
    price: "price",
    total: "",
    fill_type: "",
    event_timestamp: "event_timestamp"
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
puts ""
puts ""
puts "Cleaning Kraken Pairs..."
Cleaner.kraken



bitstamp = Exchange.create!(
  name: 'bitstamp',
  base_url: 'https://bitstamp.net',
  get_assets_path: '/api/v2/trading-pairs-info/',
  get_pairs_path: '/api/v2/trading-pairs-info/',
  get_order_book_path: '/api/v2/order_book/CURRENCY_PAIR_PARAM/',
  get_ticker_path: '/api/v2/ticker/CURRENCY_PAIR_PARAM/',
  get_trade_history_path: '/api/v2/transactions/CURRENCY_PAIR_PARAM/',
  has_tickers_endpoint: false,
  has_ticker_endpoint: true,
  has_assets_endpoint: false,
  asset_data_map: {
    name: "name",
    iso_4217: "iso_4217",
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
    min_trade_size: "minimum_order",
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
    last: "last",
    base_volume: "",
    volume: "volume",
    quote_volume: "",
    percent_change: "",
    high: "high",
    low: "low",
    timestamp: "timestamp",
    market_symbol: "market_symbol"
  }.with_indifferent_access,
  trade_history_data_map: {
    order_type: "order_type",
    amount: "amount",
    price: "price",
    total: "",
    fill_type: "",
    event_timestamp: "date"
  }.with_indifferent_access
)
puts "Created Bitstamp Exchange"
puts bitstamp.inspect
bitstamp_assets_count = bitstamp.get_assets
puts ""
puts("Retrieved #{bitstamp_assets_count} Bitstamp Assets")
puts ""
bitstamp_pairs_count = bitstamp.get_pairs
puts ""
puts("Retrieved #{bitstamp_pairs_count} Bitstamp Currency Pairs")
puts ""
puts ""
puts "#{Exchange.count} Exchanges Created"



quoine = Exchange.create!(
  name: 'quoine',
  base_url: 'https://api.qryptos.com',
  get_assets_path: '/products',
  get_pairs_path: '/products',
  get_order_book_path: '/products/CURRENCY_PAIR_PARAM/price_levels',
  get_ticker_path: '/products/CURRENCY_PAIR_PARAM',
  get_trade_history_path: '/executions?product_id=CURRENCY_PAIR_PARAM',
  has_tickers_endpoint: false,
  has_ticker_endpoint: true,
  has_assets_endpoint: false,
  asset_data_map: {
    name: "name",
    iso_4217: "iso_4217",
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
    quote_currency: "quoted_currency",
    min_trade_size: "",
    is_active: "",
    is_frozen: ""
  }.with_indifferent_access,
  order_book_data_map: {
    asks: "sell_price_levels",
    bids: "buy_price_levels",
    is_frozen: ""
  }.with_indifferent_access,
  ticker_data_map: {
    ask: "high_market_ask",
    bid: "low_market_bid",
    last: "last_traded_price",
    base_volume: "",
    volume: "volume_24h",
    quote_volume: "",
    percent_change: "",
    high: "high_market_ask",
    low: "low_market_bid",
    timestamp: "timestamp",
    market_symbol: "currency_pair_code"
  }.with_indifferent_access,
  trade_history_data_map: {
    order_type: "taker_side",
    amount: "quantity",
    price: "price",
    total: "",
    fill_type: "",
    event_timestamp: "created_at"
  }.with_indifferent_access
)
puts "Created Quoine Exchange"
puts quoine.inspect
quoine_assets_count = quoine.get_assets
puts ""
puts("Retrieved #{quoine_assets_count} Quoine Assets")
puts ""
quoine_pairs_count = quoine.get_pairs
puts ""
puts("Retrieved #{quoine_pairs_count} Quoine Currency Pairs")
puts ""
puts ""
puts "#{Exchange.count} Exchanges Created"


hibtc = Exchange.create!(
  name: 'hibtc',
  base_url: 'https://api.hitbtc.com/api/2',
  get_assets_path: '/public/currency',
  get_pairs_path: '/public/symbol',
  get_order_book_path: '/public/orderbook/CURRENCY_PAIR_PARAM',
  get_ticker_path: '/public/ticker/CURRENCY_PAIR_PARAM',
  get_trade_history_path: '/public/trades/CURRENCY_PAIR_PARAM',
  has_tickers_endpoint: false,
  has_ticker_endpoint: true,
  has_assets_endpoint: false,
  asset_data_map: {
    name: "id",
    iso_4217: "id",
    min_confirmation: "payinConfirmations",
    tx_fee: "",
    is_active: "",
    coin_type: "",
    is_frozen: "",
    is_delisted: "",
    is_disabled: ""
  }.with_indifferent_access,
  pair_data_map: {
    name: "id",
    base_currency: "baseCurrency",
    quote_currency: "quoteCurrency",
    min_trade_size: "",
    is_active: "",
    is_frozen: ""
  }.with_indifferent_access,
  order_book_data_map: {
    asks: "ask",
    bids: "bid",
    is_frozen: ""
  }.with_indifferent_access,
  ticker_data_map: {
    ask: "ask",
    bid: "bid",
    last: "last",
    base_volume: "volume",
    volume: "",
    quote_volume: "volumeQuote",
    percent_change: "",
    high: "high",
    low: "low",
    timestamp: "c_timestamp",
    market_symbol: "symbol"
  }.with_indifferent_access,
  trade_history_data_map: {
    order_type: "side",
    amount: "quantity",
    price: "price",
    total: "",
    fill_type: "",
    event_timestamp: "timestamp"
  }.with_indifferent_access
)
puts "Created HiBtc Exchange"
puts hibtc.inspect
hibtc_assets_count = hibtc.get_assets
puts ""
puts("Retrieved #{hibtc_assets_count} HiBtc Assets")
puts ""
hibtc_pairs_count = hibtc.get_pairs
puts ""
puts("Retrieved #{hibtc_pairs_count} HiBtc Currency Pairs")
puts ""
puts ""
puts "#{Exchange.count} Exchanges Created"
