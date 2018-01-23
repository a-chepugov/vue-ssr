/**
 * Возвращает позицию для элемента закольцованного массива (элементы 1 и N + 1 идентичны)
 * @param {number} i - позиция элемента
 * @param {number} N - количество элементов в массиве
 * @returns {number} - откорректированная позиция в массиве
 */
export default function (i, N) {
	return ((i % N) + N) % N
}
