# clean up:
# rm -rf ~/.bundle/ ~/.gem/; rm -rf $GEM_HOME/bundler/ $GEM_HOME/cache/bundler/; rm -rf .bundle/; rm -rf vendor/cache/; rm -rf Gemfile.lock
# If bundler hangs try this:
# http://stackoverflow.com/questions/9467756/bundler-when-attempting-to-update-or-install-will-hang-forever

source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.0.0'

# Use postgresql as the database for Active Record
gem 'pg'

# Use SCSS for stylesheets
gem 'sass-rails', '~> 4.0.0'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'

# Use jquery as the JavaScript library
gem 'jquery-rails'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 1.2'

gem 'unicorn'

# User Auth
gem 'devise', '>=3.0.0'

group :doc do
  # bundle exec rake doc:rails generates the API under doc/api.
  gem 'sdoc', require: false
end

# Ember stuff
gem 'ember-rails'
gem 'ember-source', '1.0.0'

gem 'active_model_serializers' # Make Rails generate json that ember likes.

gem 'bootstrap-sass-rails', '>= 2.3.1.2'
gem 'font-awesome-sass-rails'

group :development, :test do
  gem 'factory_girl_rails', '~> 3.2.0'
  gem 'debugger'
  gem 'rspec-rails', '~> 2.0'
  gem 'guard'
  gem 'guard-shell'
end
