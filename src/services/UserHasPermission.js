import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'

export const  userIsAuthed = connectedRouterRedirect({
    redirectPath: "/login",
    allowRedirectBack: false,
    authenticatedSelector: ({firebase:{ auth }}) => {
        return !auth.isEmpty;
    }
});

export const userIsAdmin = connectedRouterRedirect({ 
    redirectPath: "/",
    allowRedirectBack: false,
    authenticatedSelector: ({firebase: {profile}}) => {
        return !profile.isEmpty && profile.role === 'admin' 
    }

})
