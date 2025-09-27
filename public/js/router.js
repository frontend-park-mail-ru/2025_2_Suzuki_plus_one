let globalReact;

export function setGlobalReact(react) {
    globalReact = react;
    window.globalReact = react;
}

export function Route({ path, component }) {
    if (globalReact && globalReact.state.currentPage === path) {
        return component();
    }
    return null;
}

export function Router({ children }) {
    const container = document.createElement('div');
    children.flat().forEach((child) => {
        if (child instanceof Node) {
            container.appendChild(child);
        }
    });
    return container;
}

// export function Link({ to, children }) {
//     const a = document.createElement('a');
//     a.href = '#';
//     a.onclick = (e) => {
//         e.preventDefault();
//         if (globalReact) {
//             globalReact.setPage(to);
//         }
//     };
//     a.append(...children);
//     return a;
// }