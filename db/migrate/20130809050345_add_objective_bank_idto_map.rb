class AddObjectiveBankIdtoMap < ActiveRecord::Migration
  def change
    add_column :maps, :objective_bank_id, :string
  end
end
