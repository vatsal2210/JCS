(function () {
    function renderAdminNavLink() {
        const settings = window.JCSContentStore?.getSiteSettings?.();
        if (!settings || !settings.adminPageVisible) {
            return;
        }

        const navList = document.querySelector(".navbar-nav");
        if (!navList || navList.querySelector('[data-admin-nav-link="true"]')) {
            return;
        }

        const item = document.createElement("li");
        item.className = "nav-item";
        item.innerHTML = '<a class="nav-link admin-nav-link" href="/admin.html" data-admin-nav-link="true">Admin</a>';
        navList.appendChild(item);
    }

    document.addEventListener("DOMContentLoaded", renderAdminNavLink);
})();
