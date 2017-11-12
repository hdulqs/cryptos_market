@market_subscription = (market_id) ->
  App.cable.subscriptions.create { channel: "MarketChannel", id: market_id },
    connected: ->
      console.log("connected to MarketChannel")
    received: (data) ->
      # Triggered by market callback after_create
      # console.log(data)
      $('.table tbody').prepend(data.rendered_report)
