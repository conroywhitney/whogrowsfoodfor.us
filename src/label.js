export const defaultLabel = "United States of America";

export function getLabel(state, fips) {
	if(!state || !fips) { return defaultLabel; }

	var
		stateName  = state.getIn(['data', 'states', fips, 'name']),
		countyName = state.getIn(['data', 'counties', fips])
	;
	return countyName || stateName || defaultLabel;
}
