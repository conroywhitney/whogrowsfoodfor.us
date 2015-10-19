export const DEFAULT_LABEL = "The United States of America";

export function getLabel(state, fips) {
	if(!state) { return null; }
	return state.getIn(['data', 'labels', fips, 'long']) || DEFAULT_LABEL;
}
