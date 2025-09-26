const routes = [];

function Route({ path, component }) {
  routes.push({ path, component });
  return null; // nothing to render directly
}

function Router({ children }) {
  const container = document.createElement("div");

  function onLocationChange() {
    const path = window.location.pathname;
    const route = routes.find((r) => r.path === path);
    if (route) {
      // Clear the container and render the matched route's component
      container.innerHTML = "";
      container.appendChild(route.component());
    }
  }

  // Attach event listener for popstate (browser navigation)
  window.addEventListener("popstate", onLocationChange);

  // Initial render
  onLocationChange();

  // Render children (e.g., Links) inside the Router container
  children.flat().forEach((child) => {
    if (child instanceof Node) {
      container.appendChild(child);
    }
  });

  return container;
}

function Link({ to, children }) {
  const a = document.createElement("a");
  a.href = to;
  a.onclick = (e) => {
    e.preventDefault();
    window.history.pushState(null, "", to);
    window.dispatchEvent(new Event("popstate"));
  };
  a.append(...children);
  return a;
}

export { Router, Route, Link };