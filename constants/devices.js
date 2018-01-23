export const DESKTOP_HD = 'desktop HD';
export const DESKTOP = 'desktop';
export const TABLET = 'tablet';
export const MOBILE = 'mobile';
export const TEAPOT = 'teapot';

export default {
	[TEAPOT]: {min: 0, max: 479, id: 0, name: TEAPOT, tag: 'xs'},
	[MOBILE]: {min: 480, max: 768, id: 1, name: MOBILE, tag: 's'},
	[TABLET]: {min: 769, max: 980, id: 2, name: TABLET, tag: 'm'},
	[DESKTOP]: {min: 980, max: 1199, id: 3, name: DESKTOP, tag: 'l'},
	[DESKTOP_HD]: {min: 1200, max: 99999, id: 4, name: DESKTOP_HD, tag: 'xl'},
}
