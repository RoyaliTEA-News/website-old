const changePage = (pagename) => {
    history.pushState('', '', pagename);
    checkPage();
};

const checkPage = () => {
    $.undim();
    $('.nav-link').removeClass('active');
    $(`.nav-link[href="${window.location.pathname}"]`).addClass('active');
    $.get(`/api/pagerouter?page=${location.pathname.slice(1)}&nocache=${new Date().getTime()}`, (res) => {
        $('.page-content').html(res.data);
    })
    .fail((err) => {
    });
};

$(`.nav-link[href="${window.location.pathname}"]`).addClass('active');
window.onpopstate = checkPage;