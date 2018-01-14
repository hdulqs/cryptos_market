class Api::V1::Public::MarketsController < Api::V1::BaseController

  def index
    @markets = Market.find([306, 305, 329])#Market.of_interest.first(4)
                    #.of_interest
                    #.left_joins(:pairs)
                    #.group(:id)
                    #.order('COUNT(pairs.id) DESC')
    render 'api/v1/public/markets/index.json'
  end

  def show
    @market = Market.find_by(name: params[:id])
    render 'api/v1/public/markets/show.json'
  end

end
