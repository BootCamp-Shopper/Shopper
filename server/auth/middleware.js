// middleware for checking login authentication
// i.e. if not logged in, can't access '/cart' or '/payment' page
function checkAuthAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.role==='admin') {
        console.log('auth - admin');
        return next();
    } else if(req.isAuthenticated() && req.user.role==='member') {
        console.log('auth-member', req.user.id)
        res.redirect(`/api/users/${req.user.id}`);
    } else {
        console.log('NO AUTH FOR YOU')
        res.redirect('/auth/login');
    }
}

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/auth/login');
    }
}

// middleware for checkint login status
// i.e. if logged in already, can't login/register again
function isSignedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/superpowers');
    }
    next();
}

module.exports = { checkAuthAdmin, checkAuth, isSignedIn };