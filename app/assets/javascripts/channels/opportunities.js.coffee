@opportunities_subscription = ->
  App.cable.subscriptions.create { channel: "OpportunitiesChannel" },
    connected: ->
      console.log("connected to OpportunitiesChannel")
    received: (data) ->
      # console.log(data)
      $("section.opportunities_table").html(data.opportunities)
