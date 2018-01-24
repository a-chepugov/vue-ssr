export default function (Component = {}, fnName, args) {
	let promises = [];

	function recursive(Component = {}) {
		const {[fnName]: fn, components} = Component;
		if (fn instanceof Function) {
			promises.push(fn(args));
		}

		if (components instanceof Object) {
			Object
				.values(components)
				.forEach((item) => recursive(item))
		}
	}

	recursive(Component);
	return Promise.all(promises)
}
