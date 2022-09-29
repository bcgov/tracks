const getAuthHeaders = (state) => state.Auth.headers;

function userHasAnyRole(userRoles, requiredRoles) {
	return userRoles !== undefined && userRoles.filter(v => requiredRoles.includes(v)).length > 0
}


export {getAuthHeaders, userHasAnyRole};

