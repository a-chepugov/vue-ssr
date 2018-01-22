export default function (constructor) {
	let instance;
	return function (data) {
		return (
			instance ?
				instance :
				(this && this.constructor === constructor) ?
					instance = this :
					instance = new constructor(data)
		)
	}
};
