var view_layer="view-home";

var myApp = new Framework7({
    modalTitle: 'Gaa Project',
    material: true,
    // pushState: true,
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

// Add views
var viewHome = myApp.addView('#view-home',{
    animatePages:true,
    preloadPreviousPage:true,
    // domCache:true

});
var viewNotification = myApp.addView('#view-notification', {
    animatePages:true,
    preloadPreviousPage:true,
    // domCache:true
});

var viewProfile = myApp.addView('#view-profile',{
    animatePages:true,
    preloadPreviousPage:true,
    // domCache:true
});
var viewOption = myApp.addView('#view-option',{
    animatePages:true,
    preloadPreviousPage:true,
    // domCache:true
});


var viewPanelLeft = myApp.addView('#panel-left',{
    animatePages:true,
    preloadPreviousPage:true,
    // domCache:true

});

// load page main
viewOption.router.loadPage('pages/option/option-index.html');
viewHome.router.loadPage('pages/home/home-index.html');
viewProfile.router.loadPage('pages/profile/profile-index.html');
viewNotification.router.loadPage('pages/notif/notif-index.html');

