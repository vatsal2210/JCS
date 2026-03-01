async function loadJson(path) {
    try {
        const response = await fetch(path);
        return await response.json();
    } catch (error) {
        console.error(`Error loading ${path}:`, error);
        return null;
    }
}

function createTeamMemberCard(member) {
    const card = document.createElement("article");
    card.className = "community-team-member";

    const imageValue = typeof member.image === "string" ? member.image.trim() : "";
    const isBootstrapIcon = /^<i\b[^>]*><\/i>$/i.test(imageValue);

    if (isBootstrapIcon) {
        const iconWrapper = document.createElement("div");
        iconWrapper.className = "member-icon-avatar";
        iconWrapper.innerHTML = imageValue;
        const icon = iconWrapper.querySelector("i");
        if (icon) {
            icon.classList.add("member-icon");
            icon.setAttribute("aria-hidden", "true");
        }
        card.appendChild(iconWrapper);
    } else {
        const image = document.createElement("img");
        image.src = imageValue;
        image.alt = member.name || "Community member";
        if (member.photoClass) {
            image.classList.add(member.photoClass);
        }
        card.appendChild(image);
    }

    const name = document.createElement("h4");
    if (member.linkedin) {
        const nameLink = document.createElement("a");
        nameLink.href = member.linkedin;
        nameLink.target = "_blank";
        nameLink.rel = "noopener noreferrer";
        nameLink.textContent = member.name || "";
        name.appendChild(nameLink);
    } else {
        name.textContent = member.name || "";
    }

    const title = document.createElement("p");
    title.textContent = member.title || "Volunteer";

    card.appendChild(name);
    card.appendChild(title);

    return card;
}

function renderTeamGroup(members, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        return;
    }

    container.innerHTML = "";

    members.forEach((member) => {
        container.appendChild(createTeamMemberCard(member));
    });
}

function setupTeamTabs() {
    const buttons = Array.from(document.querySelectorAll(".team-switch-btn"));
    const leadershipSection = document.getElementById("leadershipTeamSection");
    const volunteersSection = document.getElementById("volunteersTeamSection");
    if (!buttons.length || !leadershipSection || !volunteersSection) {
        return;
    }

    const showTab = (tabName) => {
        const showLeadership = tabName === "leadership";
        leadershipSection.classList.toggle("d-none", !showLeadership);
        volunteersSection.classList.toggle("d-none", showLeadership);

        buttons.forEach((button) => {
            const active = button.dataset.teamTab === tabName;
            button.classList.toggle("active", active);
            button.setAttribute("aria-selected", active ? "true" : "false");
        });
    };

    buttons.forEach((button) => {
        button.addEventListener("click", () => showTab(button.dataset.teamTab));
    });

    showTab("leadership");
}

document.addEventListener("DOMContentLoaded", async () => {
    const leadershipGrid = document.getElementById("leadershipTeamGrid");
    const volunteersGrid = document.getElementById("volunteersTeamGrid");
    if (!leadershipGrid || !volunteersGrid) {
        return;
    }

    const [leadershipData, volunteersData] = await Promise.all([
        loadJson("assets/js/leadership.json"),
        loadJson("assets/js/volunteers.json")
    ]);

    const leadershipWithImages = (leadershipData?.leadership || []).filter(
        (member) => member.image && member.image.trim() !== ""
    );
    const volunteersWithImages = (volunteersData?.volunteers || []).filter(
        (member) => member.image && member.image.trim() !== ""
    );

    renderTeamGroup(leadershipWithImages, "leadershipTeamGrid");
    renderTeamGroup(volunteersWithImages, "volunteersTeamGrid");
    setupTeamTabs();
});
