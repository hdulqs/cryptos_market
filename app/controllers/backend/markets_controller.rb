class Backend::MarketsController < Backend::BaseController


  def index
    @markets = Market.all
  end

  def show
    @market = Market.find(params[:id])
  end


end
