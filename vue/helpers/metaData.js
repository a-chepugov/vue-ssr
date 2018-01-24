import singleton from '../../helpers/singleton';

export default function (meta) {
	let fromContextMeta = function () {
		return meta.inject()
	};

	return new Proxy(
		{getInstance: singleton(fromContextMeta)},
		{
			get (target, property) {
				let instance = target.getInstance();
				let {[property]: key} = instance || {};
				return (
					key && (typeof key.text === 'function' || key.text instanceof Function) ?
						key.text() :
						key
				)
			}
		});
}
