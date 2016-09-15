make:
	echo "Building..."
	mkdir -p build
	cd src && npm install && node build.js
