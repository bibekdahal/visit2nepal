window.addEventListener('scroll', function (e) {
    var nav = document.getElementsByTagName('nav').item(0);
    if (document.documentElement.scrollTop > 32) {
        nav.classList.add('elevated');
    } else {
        nav.classList.remove('elevated');
    }
});
