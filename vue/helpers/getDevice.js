import devices from '../../constants/devices'

export default function (width) {
	for (let key of Object.keys(devices)) {
		const device = devices[key];
		if (width > device.min && width < device.max) {
			return device.id
		}
	}
}
