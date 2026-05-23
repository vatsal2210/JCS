(function () {
    function renderQuoteText(element, quote, highlight) {
        if (!highlight) {
            element.textContent = quote;
            return;
        }
        const index = quote.toLowerCase().indexOf(highlight.toLowerCase());
        if (index === -1) {
            element.textContent = quote;
            return;
        }
        const before = quote.slice(0, index);
        const match = quote.slice(index, index + highlight.length);
        const after = quote.slice(index + highlight.length);
        if (before) {
            element.appendChild(document.createTextNode(before));
        }
        const strong = document.createElement("strong");
        strong.className = "success-story-highlight";
        strong.textContent = match;
        element.appendChild(strong);
        if (after) {
            element.appendChild(document.createTextNode(after));
        }
    }

    function createSlide(story, isActive) {
        const slide = document.createElement("div");
        slide.className = "carousel-item" + (isActive ? " active" : "");

        const wrapper = document.createElement("div");
        wrapper.className = "success-story-slide";

        const card = document.createElement("div");
        card.className = "card success-story-card";

        const body = document.createElement("div");
        body.className = "card-body";

        const quoteIcon = document.createElement("div");
        quoteIcon.className = "success-story-quote-icon";
        quoteIcon.innerHTML = '<i class="bi bi-quote" aria-hidden="true"></i>';

        const quote = document.createElement("p");
        quote.className = "success-story-quote";
        renderQuoteText(quote, story.quote || "", story.highlight);

        const author = document.createElement("p");
        author.className = "success-story-author";
        const authorName = story.author || "";
        const location = story.location ? `, ${story.location}` : "";
        author.textContent = `— ${authorName}${location}`;

        body.appendChild(quoteIcon);
        body.appendChild(quote);
        body.appendChild(author);
        card.appendChild(body);
        wrapper.appendChild(card);
        slide.appendChild(wrapper);

        return slide;
    }

    function createIndicator(index, isActive) {
        const button = document.createElement("button");
        button.type = "button";
        button.setAttribute("data-bs-target", "#successStoriesCarousel");
        button.setAttribute("data-bs-slide-to", String(index));
        button.setAttribute("aria-label", `Story ${index + 1}`);
        if (isActive) {
            button.className = "active";
            button.setAttribute("aria-current", "true");
        }
        return button;
    }

    document.addEventListener("DOMContentLoaded", () => {
        const inner = document.getElementById("successStoriesInner");
        const indicators = document.getElementById("successStoriesIndicators");
        const carousel = document.getElementById("successStoriesCarousel");
        if (!inner || !indicators || !carousel) {
            return;
        }

        const data = window.JCS_SUCCESS_STORIES_DATA;
        const stories = (data && Array.isArray(data.stories)) ? data.stories : [];
        if (!stories.length) {
            return;
        }

        inner.innerHTML = "";
        indicators.innerHTML = "";

        stories.forEach((story, index) => {
            const isActive = index === 0;
            inner.appendChild(createSlide(story, isActive));
            indicators.appendChild(createIndicator(index, isActive));
        });

        if (stories.length < 2) {
            carousel.classList.add("single-story");
            carousel.removeAttribute("data-bs-ride");
        }
    });
})();
