import React from "react";

const defaultValue = {
    user: {},
    setUser: (user) => {
        this.user = user;
    }
};

const UserContext = React.createContext(defaultValue);

export function withUserContext(Component) {
    return function WrapperComponent(props) {
        return (
            <UserContext.Consumer>
                {state => <Component {...props}  context={state} />}
            </UserContext.Consumer>
        )
    }
}

export default UserContext;
