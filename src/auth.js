export const isAuth = user => user!=undefined;

export const hasRole = (user, roles) =>
    roles.some(role => user.user_roles.includes(role));

export const loginUser = (user, app) =>
    app.setState({user: user});