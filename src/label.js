export const defaultLabel = "United States of America";

export function getLabel(state, fips) {
	if(!state || !fips) { return defaultLabel; }

	var
		countyName = state.getIn(['data', 'counties', fips]),
		stateName  = state.getIn(['data', 'states', fips])
	;
	return countyName || stateName || defaultLabel;
}
