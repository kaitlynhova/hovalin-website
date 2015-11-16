var frontend    = require('../controllers/frontend'),
    config      = require('../config'),
    express     = require('express'),
    utils       = require('../utils'),

    frontendRoutes;

    var Mailgun = require('mailgun').Mailgun;
    var mg = new Mailgun(process.env.MAILGUN_KEY);
    var recaptcha  = require('nodejs-nocaptcha-recaptcha');

frontendRoutes = function frontendRoutes(middleware) {
    var router = express.Router(),
        subdir = config.paths.subdir,
        routeKeywords = config.routeKeywords,
        indexRouter = express.Router(),
        tagRouter = express.Router({mergeParams: true}),
        authorRouter = express.Router({mergeParams: true}),
        rssRouter = express.Router({mergeParams: true}),
        privateRouter = express.Router();
        router.get('/blog', frontend.blog);

    // ### Admin routes
    router.get(/^\/(logout|signout)\/$/, function redirectToSignout(req, res) {
        /*jslint unparam:true*/
        res.set({'Cache-Control': 'public, max-age=' + utils.ONE_YEAR_S});
        res.redirect(301, subdir + '/ghost/signout/');
    });
    router.get(/^\/signup\/$/, function redirectToSignup(req, res) {
        /*jslint unparam:true*/
        res.set({'Cache-Control': 'public, max-age=' + utils.ONE_YEAR_S});
        res.redirect(301, subdir + '/ghost/signup/');
    });

    // redirect to /ghost and let that do the authentication to prevent redirects to /ghost//admin etc.
    router.get(/^\/((ghost-admin|admin|wp-admin|dashboard|signin|login)\/?)$/, function redirectToAdmin(req, res) {
        /*jslint unparam:true*/
        res.redirect(subdir + '/ghost/');
    });

    // password-protected frontend route
    privateRouter.route('/')
        .get(
            middleware.privateBlogging.isPrivateSessionAuth,
            frontend.private
        )
        .post(
            middleware.privateBlogging.isPrivateSessionAuth,
            middleware.spamPrevention.protected,
            middleware.privateBlogging.authenticateProtection,
            frontend.private
        );

    rssRouter.route('/rss/').get(frontend.rss);
    rssRouter.route('/rss/:page/').get(frontend.rss);
    rssRouter.route('/feed/').get(function redirect(req, res) {
        /*jshint unused:true*/
        res.set({'Cache-Control': 'public, max-age=' + utils.ONE_YEAR_S});
        res.redirect(301, subdir + '/rss/');
    });

    // Index
    indexRouter.route('/').get(frontend.homepage);
    indexRouter.route('/' + routeKeywords.page + '/:page/').get(frontend.homepage);
    indexRouter.use(rssRouter);

    // Tags
    tagRouter.route('/').get(frontend.tag);
    tagRouter.route('/' + routeKeywords.page + '/:page/').get(frontend.tag);
    tagRouter.use(rssRouter);

    // Authors
    authorRouter.route('/').get(frontend.author);
    authorRouter.route('/' + routeKeywords.page + '/:page/').get(frontend.author);
    authorRouter.use(rssRouter);

    // Mount the Routers
    router.use('/' + routeKeywords.private + '/', privateRouter);
    router.use('/' + routeKeywords.author + '/:slug/', authorRouter);
    router.use('/' + routeKeywords.tag + '/:slug/', tagRouter);
    router.use('/', indexRouter);

    // Post Live Preview
    router.get('/' + routeKeywords.preview + '/:uuid', frontend.preview);

    router.post('/mailgun_contact', function(req, res, next){
      recaptcha(req.body["g-recaptcha-response"], process.env.RECAPTCHA_KEY, function (success){
        if(!success){
          res.send("Captcha failed, sorry.");
        } else {
          var email = req.body.email;
          var msg = req.body.msg;
          if (email && msg) {
            try {
              mg.sendText(
                email,
                ['The Hovalin <thehovalin@gmail.com>'],
                'Hovalin Contact Form',
                msg,
                process.env.MAILGUN_ADDRESS,
                {},
                function(err) {
                  if (err) {
                    res.send("Email not sent. Error");
                  } else {
                    res.send("Email successfully sent");
                  }
                }
              );
            } catch(ex) {
              res.send("Email not sent. Error");
            }
          } else {
            res.send("Need to provide email, subject, and text fields");
          }
        }
      });
    });

    // Default
    router.get('*', frontend.single);

    return router;
};

module.exports = frontendRoutes;