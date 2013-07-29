ActiveSupport.on_load(:active_model_serializers) do
  ActiveRecord::Base.include_root_in_json = true
  ActiveModel::Serializer.root = true
  ActiveModel::ArraySerializer.root = true
end