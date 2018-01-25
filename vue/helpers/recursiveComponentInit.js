export default function (Component = {}, fnName, args) {
	let promises = [];

	function recursive(Component = {}) {
		const {[fnName]: fn, components} = Component;
		if (fn instanceof Function) {
			try {
				const result = fn(args);
				promises.push(result instanceof Promise ? result.catch(console.error) : result);
			} catch (error) {
				console.error(error);
			}
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
