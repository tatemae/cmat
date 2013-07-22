# A sample Guardfile
# More info at https://github.com/guard/guard#readme
notification :off
interactor :off

guard :shell do
  watch(%r{^app/assets/javascripts/(.+)\.js$}) { `ember build` }
  ignore /application.js/
end
