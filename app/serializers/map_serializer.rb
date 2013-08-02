class MapSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title, :payload, :created_at
end
