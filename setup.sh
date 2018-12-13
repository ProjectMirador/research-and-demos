#!/bin/bash
npm install
cd packages/mirador3-core
npm install
cd ../mirador3-common
npm install
cd ../mirador3-app-base
npm install
cd ../..
lerna run build --ignore=mirador3-e2e-tests
lerna run lib
cd packages/mirador3-e2e-tests
npm install
npm run build
