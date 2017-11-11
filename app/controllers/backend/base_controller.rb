class Backend::BaseController < ApplicationController
  before_action :authenticate_backend_admin!
end
