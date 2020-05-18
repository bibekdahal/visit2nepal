window.addEventListener('scroll', function (e) {
    var nav = document.getElementsByTagName('nav').item(0);
    if (document.documentElement.scrollTop > 128) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});
