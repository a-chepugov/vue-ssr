module.exports = function (env = {}) {
	let {target} = env;

	try {
		return require(`./webpack/webpack.config.${target}`)(env)
	} catch (error) {
		console.error(`Ошибка при подключении конфигурация webpack для ${target}`)
	}
};
