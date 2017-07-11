var myApp = new Framework7({
    modalTitle: 'Gaa Project',
    material: true,
    pushState: true,
    materialPageLoadDelay:500,
    cacheIgnoreGetParameters:true,
     onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    },
    materialPreloaderHtml:'<span class="preloader-inner"><span class="preloader-inner-gap"></span><span class="preloader-inner-left"><span class="preloader-inner-half-circle"></span></span><span class="preloader-inner-right"><span class="preloader-inner-half-circle"></span></span></span>'

});

// Export selectors engine
var $$ = Dom7;
var viewAuth = myApp.addView('.view-login',{
    animatePages:true,
    preloadPreviousPage:true,
    // domCache:true

});


viewAuth.router.loadPage('pages/auth/login.html');
