class Backend::TickersController < Backend::BaseController


  def index
    @pair = Pair.find(params[:pair_id])
    @tickers = @pair.tickers
  end

  def show
    @ticker = Ticker.find(params[:id])
  end


end
