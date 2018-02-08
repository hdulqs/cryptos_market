json.markets @markets do |market|
  json.id market.id
  json.name market.name
  json.base_currency market.base_currency
  json.quote_currency market.quote_currency
  json.base_currency_logo market.base_currency_logo.url(:thumb)
  json.quote_currency_logo market.quote_currency_logo.url(:thumb)
  json.pairs market.pairs.watched do |pair| #.with_recent_ticker
    json.id pair.id
    json.exchange_name pair.exchange.name
    json.last_to_be_updated false
    json.last_ticker do
      json.id pair.last_ticker_id ? pair.last_ticker.id : nil
      json.market_name market.name
      json.ask pair.last_ticker_id ? pair.last_ticker.ask : nil
      json.bid pair.last_ticker_id ? pair.last_ticker.bid : nil
      json.last pair.last_ticker_id ? pair.last_ticker.last : nil
      json.percent_change pair.last_ticker_id ? pair.last_ticker.percent_change : nil
      json.volume pair.last_ticker_id ? pair.last_ticker.volume : (pair.last_ticker_id ? pair.last_ticker.base_volume : nil)
    end
  end
end
