require 'lib/handcar/handcar'

describe Handcar do
  it "fetches a new user key" do
    expect( Handcar.fetch_user_key[0..8] ).to eq("AGENT_KEY")
  end

end
