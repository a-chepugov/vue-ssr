export default {
	name: 'fw',
	functional: true,
	render: function (h, context) {
		const {data: {attrs: {'data-tag': tag} = {}} = {}} = context;

		try {
			return h(
				tag,
				context.data,
				context.children
			)
		} catch (error) {
			console.error(error);
			return h('div')
		}

	},
}
