const btn = document.querySelector('.menu-btn');
const sideBar = document.querySelector('.sidebar__mobile');

btn.addEventListener('click', () => {
    if (sideBar.classList.contains('hidden')) {
        sideBar.classList.remove('hidden');
        sideBar.classList.add('shown');
    } else {
        sideBar.classList.remove('shown');
        sideBar.classList.add('hidden');
    }
});

