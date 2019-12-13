const redirects: any = {
    "/": {redirect: false},
    "/welcome": {redirect: "/dashboard"},
    "/confirmation": {redirect: "/dashboard"},
    "/logged-out": {redirect: "/dashboard"},
    "/auth": {redirect: "/dashboard"},
};

const unprotected: Array<string> = ["/", "/auth", "/logged-out", "/welcome", "/confirmation"];

export {redirects, unprotected}