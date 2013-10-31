require 'open-uri'

class Handcar
  URL = 'https://mc3-demo.mit.edu/handcar/services/authentication/agentkeys/'

  def self.fetch_new_user_key
    open("#{URL}#{ENV['agent_id']}?proxyname=#{ENV['agent_key']}").read
  end
end
