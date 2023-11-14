//
//
//

const regions = Array.from(document.querySelectorAll('[tabindex="0"]'));
const navEl = Array.from(document.querySelectorAll("#ulCont a"));
const pBar_MLinks = Array.from(document.querySelectorAll("#profileBar a"));
const pBar_QLinks = Array.from(document.querySelectorAll("#linkPagesCont a"));

const navTypes = navEl.map((op) => op.innerHTML);
const mLinksTypes = pBar_MLinks.map((op) => op.innerHTML);
const qLinksTypes = pBar_QLinks.map((op) => op.innerHTML);

const moveFocus = (region, item) => {
    if (region.length > 0) {
        const lastItem = region.length - 1;

        if (item < 0) {
            // If the current item is at the beginning, set focus to the last item
            region[lastItem].focus();
        } else if (item <= lastItem) {
            // Set focus to the item within valid range
            region[item].focus();
        } else {
            logInput(item);
            console.error("Invalid currentItem index:", item);
        }
    }
};

const handleArrowEvent = (e, items, currentRegion) => {
    if (!currentRegion) {
        return; // No need to proceed if currentRegion is null
    }

    let currentItem = 0;
    const regionItems = Array.from(currentRegion.children);
    regionItems.forEach((child) => {
        items.push(child);
    });

    if (
        e.code === "ArrowDown" ||
        e.code === "ArrowLeft" ||
        e.code === "ArrowUp" ||
        e.code === "ArrowRight" ||
        e.code === "KeyW" ||
        e.code === "KeyA" ||
        e.code === "KeyS" ||
        e.code === "KeyD"
    ) {
        e.preventDefault();
        e.stopPropagation();

        currentItem = items.indexOf(e.target);
        const lastItem = items.length - 1;

        if (
            e.code === "ArrowDown" ||
            e.code === "ArrowRight" ||
            e.code === "KeyS" ||
            e.code === "KeyD"
        ) {
            currentItem = currentItem === lastItem ? 0 : currentItem + 1;
        } else if (
            e.code === "ArrowUp" ||
            e.code === "ArrowLeft" ||
            e.code === "KeyW" ||
            e.code === "KeyA"
        ) {
            currentItem = currentItem === 0 ? lastItem : currentItem - 1;
        }

        logInput(regionItems, currentItem);
        moveFocus(regionItems, currentItem);
    }
};

const handleClick = (e) => {
    logInput(e.target.innerHTML);
};

const handleKeyEvent = (e) => {
    const items = [];
    const currentRegion = e.target.closest('[role="region"]');

    if (
        e.code === "ArrowDown" ||
        e.code === "ArrowLeft" ||
        e.code === "ArrowUp" ||
        e.code === "ArrowRight" ||
        e.code === "KeyW" ||
        e.code === "KeyA" ||
        e.code === "KeyS" ||
        e.code === "KeyD"
    ) {
        handleArrowEvent(e, items, currentRegion);
        logInput(e.key);
    }
};

const logInput = (input) => {
    console.log(input);
};

(() => {
    window.addEventListener("keydown", handleKeyEvent);

    navEl.forEach((a) => a.addEventListener("click", handleClick));
})();
