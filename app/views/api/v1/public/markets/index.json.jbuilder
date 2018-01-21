json.markets @markets do |market|
  json.id market.id
  json.name market.name
  json.base_currency market.base_currency
  json.quote_currency market.quote_currency
  json.base_currency_logo market.base_currency_logo.url(:thumb)
  json.quote_currency_logo market.quote_currency_logo.url(:thumb)
  json.pairs market.pairs.where(is_watched: true) do |pair|
    json.id pair.id
    json.exchange_name pair.exchange.name
    json.last_to_be_updated false
    json.last_ticker do
      json.id pair.tickers.last ? pair.tickers.last.id : nil
      json.market_name market.name
      json.ask pair.tickers.last ? pair.tickers.last.ask : nil
      json.bid pair.tickers.last ? pair.tickers.last.bid : nil
      json.last pair.tickers.last ? pair.tickers.last.last : nil
      json.percent_change pair.tickers.last ? pair.tickers.last.percent_change : nil
      json.volume pair.tickers.last ? pair.tickers.last.volume : (pair.tickers.last ? pair.tickers.last.base_volume : nil)
    end
  end
end
