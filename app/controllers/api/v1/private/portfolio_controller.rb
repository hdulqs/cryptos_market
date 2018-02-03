class Api::V1::Private::PortfolioController < Api::V1::Private::BaseController
  def index
    #binding.pry
    ordered_by_total = current_user.portfolio.portfolio_assets.map{|l| {symbol: l.symbol, portfolio_asset_id: l.id, total: l.asset_info.price_usd * l.amount}}.sort_by { |hsh| hsh[:total] }
    @portfolio_assets = current_user.portfolio.portfolio_assets
    arr = []
    ordered_by_total.each do |asset|
      arr << @portfolio_assets.find_by(symbol: asset[:symbol])
    end
    @portfolio_assets = arr.reverse
    render 'api/v1/private/portfolio/index.json'
  end
end
