"use strict";
const add = document.querySelector("#add");
const remove = document.querySelector("#remove");
const reset = document.querySelector("#reset");
const container = document.querySelector("#container");
const log = document.querySelector("#log");
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
    newItem.textContent = `clicked x: ${e.x}, y: ${e.y}`;
    container.append(newItem);
});
document.addEventListener('input', e => {
    const target = e.target || HTMLTextAreaElement || null;
    if (!target)
        return;
    if (target.type === "password")
        return;
    const newItem = document.createElement("li");
    newItem.textContent = `typed x: ${target.value}`;
    container.append(newItem);
});
document.addEventListener('keydown', (e) => {
    const target = e.target || null;
    if (!target)
        return;
    if (e.key == "Enter") {
        const newItem = document.createElement("li");
        newItem.textContent = `entered x: ${target.value}`;
        container.append(newItem);
    }
});
const observer = new MutationObserver((records, observer) => {
    for (const record of records) {
        switch (record.type) {
            case "childList":
                for (const addedNode of record.addedNodes) {
                    console.log("Node added:", addedNode);
                    log.textContent = `Node added: ${addedNode.nodeName}\n${log.textContent}`;
                }
                for (const removedNode of record.removedNodes) {
                    console.log("Node removed:", removedNode);
                    log.textContent = `Node removed: ${removedNode.nodeName}\n${log.textContent}`;
                }
                break;
            case "attributes":
                console.log(`Attribute changed: ${record.attributeName} on`, record.target);
                log.textContent = `Attribute changed: ${record.attributeName}\n${log.textContent}`;
                break;
            case "characterData":
                console.log("Character data changed in", record.target);
                log.textContent = `Text changed: ${record.target.textContent}\n${log.textContent}`;
                break;
        }
    }
});
observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true
});
