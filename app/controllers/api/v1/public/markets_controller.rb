class Api::V1::Public::MarketsController < Api::V1::BaseController

  def index
    if params[:market_search].present?
      @markets = Market.of_interest.where("base_currency ~* ?", params[:market_search])
                  .or(Market.of_interest.where("quote_currency ~* ?", params[:market_search]))
    else
      @markets = Market#.of_interest.find([306, 305, 329, 383, 378, 262]) #Market.of_interest.first(8)
                    .of_interest
                    .left_joins(:pairs)
                    .group(:id)
                    .order('COUNT(pairs.id) DESC')
                    .page(params[:page]).per(15)
    end
    render 'api/v1/public/markets/index.json'
  end

  def show
    @market = Market.find_by(name: params[:id])
    render 'api/v1/public/markets/show.json'
  end

end
