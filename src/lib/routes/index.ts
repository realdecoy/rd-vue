export const auth = `{
    name: "Login",
    path: "/login",
    component: require('@/pages/auth/login').default
},
{
    name: "Register",
    path: "/register",
    component: require('@/pages/auth/register').default
},
{
    name: "ForgetPassword",
    path: "/forget-password",
    component: require('@/pages/auth/forget-password').default
}`;
