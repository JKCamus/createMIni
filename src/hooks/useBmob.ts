import {
	getCurrentInstance,
} from 'vue';

export default function useBmob() {
	const Bmob = getCurrentInstance()?.appContext.config.globalProperties.$Bmob

	if (!Bmob) throw new Error('Bmob is not provided');
	return Bmob;
}