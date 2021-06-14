/**
 * Zpruhledneni barvy
 *
 * @param {string} color Barva
 * @param {number} opacity Mira pruhlednosti
 * @returns {string} Pruhledna barva
 */
export function opacify(color: string, opacity: number): string {
	return color + Math.round(255 * opacity).toString(16);
}
