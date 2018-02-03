class Api::V1::Private::PortfolioController < Api::V1::Private::BaseController
  def index
    @portfolio_assets = current_user.portfolio.portfolio_assets
    render 'api/v1/private/portfolio/index.json'
  end
end
