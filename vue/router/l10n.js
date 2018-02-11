import langs from '../../constants/langs';

export default function (routes) {
	let routesLocalized = routes.reduce((result, item) => {
		let {name, path = '', component, redirect} = item;
		langs.forEach(({code: langCode, id: langId}) => {
			let itemLocalized = {
				name: name ? `${name}---${langCode}` : undefined,
				path: `/${langCode}${path}`,
				props: true,
				meta: {langId}
			};

			if (redirect) {
				itemLocalized.redirect = `/${langCode}${redirect}`;
			} else {
				itemLocalized.component = component;
			}
			result.push(itemLocalized);
		});
		return result;
	}, []);

	return routes.concat(routesLocalized)
}
