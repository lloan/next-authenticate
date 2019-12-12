module.exports = {
  redirects: {
    "/": {redirect: false},
    "/welcome": {redirect: "/dashboard"},
    "/confirmation": {redirect: "/dashboard"},
    "/logged-out": {redirect: "/dashboard"},
    "/auth": {redirect: "/dashboard"},
  },
  unprotected: ["/", "/auth", "/logged-out", "/welcome", "/confirmation"],
};
