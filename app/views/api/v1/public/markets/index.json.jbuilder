json.markets @markets do |market|
  json.id market.id
  json.name market.name
  json.base_currency market.base_currency
  json.quote_currency market.quote_currency
  json.pairs market.pairs do |pair|
    json.id pair.id
    json.exchange_name pair.exchange.name
    json.last_ticker do
      json.id pair.tickers.last ? pair.tickers.last.id : nil
      json.last pair.tickers.last ? pair.tickers.last.last : nil
      json.ask pair.tickers.last ? pair.tickers.last.ask : nil
      json.bid pair.tickers.last ? pair.tickers.last.bid : nil
    end
  end
end
