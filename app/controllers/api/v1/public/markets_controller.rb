class Api::V1::Public::MarketsController < Api::V1::BaseController

  def index
    @markets = Market.of_interest.take(10)
    render 'api/v1/public/markets/index.json'
  end

  def show
    @market = Market.find_by(name: params[:id])
    render 'api/v1/public/markets/show.json'
  end
  
end
