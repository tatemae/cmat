class MapSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :created_at
end
