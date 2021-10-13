export const authHeader= ()=> {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user')||null);
    // console.error({authHeaderwe:user});
    if (user ) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}