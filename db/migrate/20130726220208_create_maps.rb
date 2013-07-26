class CreateMaps < ActiveRecord::Migration
  def change
    create_table :maps do |t|
      t.string :title
      t.text :payload
      t.timestamps
    end
  end
end
