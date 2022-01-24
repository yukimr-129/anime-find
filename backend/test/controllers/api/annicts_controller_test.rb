require "test_helper"

class Api::AnnictsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_annicts_index_url
    assert_response :success
  end
end
