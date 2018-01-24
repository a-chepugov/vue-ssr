export default function (Component = {}, fnName, args) {
	let promises = [];

	function recursive(Component = {}, fnName) {
		const {[fnName]: fn, components} = Component;
		if (fn instanceof Function) {
			promises.push(fn(args));
		}

		if (components instanceof Object) {
			Object
				.values(components)
				.forEach((item) => recursive(item, fnName))
		}
	}

	recursive(Component, fnName);
	return Promise.all(promises)
}
