json.exchanges @exchanges do |exchange|
  json.id exchange.id
  json.name exchange.name
  json.base_url exchange.base_url
  json.markets_nb exchange.pairs.count
  json.last_ticker_request exchange.last_ticker_request
end