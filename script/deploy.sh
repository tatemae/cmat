#!/usr/bin/env bash

ember build

git add -f app/assets/javascripts/application.js

git commit -m "add application.js"

git push -f heroku master

git reset --hard HEAD^
