const add = document.querySelector("#add") as HTMLButtonElement;
const remove = document.querySelector("#remove") as HTMLButtonElement;
const reset = document.querySelector("#reset") as HTMLButtonElement;
const container = document.querySelector("#container") as HTMLUListElement;
const log = document.querySelector("#log") as HTMLElement;

let namePrefix = 0;

add.addEventListener("click", () => {
    const newItem = document.createElement("li");
    newItem.textContent = `item ${namePrefix}`;
    container.appendChild(newItem);
    namePrefix++;
});


remove.addEventListener("click", () => {
    const itemToRemove = document.querySelector("li");
    if (itemToRemove && itemToRemove.parentNode) {
        itemToRemove.parentNode.removeChild(itemToRemove);
    }
});

reset.addEventListener("click", () => {
    document.location.reload();
});

document.addEventListener('click', e => {
    const newItem = document.createElement("li");
    newItem.textContent = `clicked x: ${e.x}, y: ${e.y}`
    container.append(newItem)
})

document.addEventListener('input', e => {
    const target = e.target as HTMLInputElement || HTMLTextAreaElement || null

    if (!target) return

    if (target.type === "password") return

    const newItem = document.createElement("li");
    newItem.textContent = `typed x: ${target.value}`
    container.append(newItem)
})

document.addEventListener('keydown', (e: KeyboardEvent) => {
    const target = e.target as HTMLInputElement || null

    if (!target) return

    if (e.key == "Enter") {
        const newItem = document.createElement("li");
        newItem.textContent = `entered x: ${target.value}`
        container.append(newItem)
    }
})

const observer = new MutationObserver((records) => {
    console.log('DOM Changed')

    const snapshot = document.documentElement.outerHTML;
    console.log("Snapshot: " + snapshot)
})

observer.observe(container, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true
})