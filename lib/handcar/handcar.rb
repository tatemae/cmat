require 'open-uri'

module Handcar
  URL = 'https://mc3-demo.mit.edu/handcar/services/authentication/agentkeys/'

  def self.fetch_new_user_key
    url = "#{URL}#{ENV['agent_id']}?proxyname=#{ENV['agent_key']}"
    open(url)
  end
end
