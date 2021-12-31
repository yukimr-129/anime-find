class Api::AnnictsController < ApplicationController
  def index
    url = ENV["ANNICT_BASE_URL"]
    query = {access_token: ENV["ANNICT_API_KEY"], filter_season: params[:filter_season], per_page: 50}
    client = HTTPClient.new
    #一旦SSL証明書を無視
    client.ssl_config.verify_mode = OpenSSL::SSL::VERIFY_NONE
    response = client.get(url, query: query)
    render json: JSON.parse(response.body)
  end

  private
  def annict_params
    
  end
end
