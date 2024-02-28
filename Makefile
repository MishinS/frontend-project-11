install:
	npm ci

lint:
	npx eslint .

server:
	npx webpack serve
	
build:
	NODE_ENV=production npx webpack


