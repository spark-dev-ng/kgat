export const authHeader = () => {
	// return authorization header with jwt token
	let token = JSON.parse(localStorage.getItem('token'));
	// console.error({authHeaderwe:user});
	// if (token) {
		return {
			'Authorization': 'Bearer ' + token,
			'Content-Type': 'application/json',
			'X-Requested-With': 'XMLHttpRequest'
		};
	// } else {
	// 	return {
	// 		'Content-Type': 'application/json',
	// 		'X-Requested-With': 'XMLHttpRequest'
	// 	};
	// }
}