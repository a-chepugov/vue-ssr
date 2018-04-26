const cache = {};

function importAll(r) {
	console.dir(r.keys(), {colors: true, depth: null});
	r.keys().forEach(key => {
		const [,id] = key.match(/(?:\.\/)?([^\/]+)/) || [];
			console.log('DEBUG:wasmLoader.js():7 =>', id);
		cache[id] = r(key);
	});
}
importAll(require.context('./rust/', true, /.rs$/));

export default (name, fallback)=> {
	console.log('DEBUG:wasmLoader.js():14 =>', name);
	console.dir(cache[name], {colors: true, depth: null});
	// return cache[name]()
}
