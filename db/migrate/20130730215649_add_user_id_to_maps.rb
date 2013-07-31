class AddUserIdToMaps < ActiveRecord::Migration
  def change
    add_column :maps, :user_id, :integer
    add_index :maps, :user_id
  end
end
