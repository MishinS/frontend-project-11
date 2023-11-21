install:
	npm ci

lint:
	npx eslint .

server:
	npx webpack serve
	
prod server:
	rm -rf dist NODE_ENV=production npx webpack


