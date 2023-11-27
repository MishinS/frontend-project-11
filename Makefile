install:
	npm ci

lint:
	npx eslint .

server:
	npx webpack serve
	
prodserver:
	rm -rf dist NODE_ENV=production npx webpack


