const routes = [];

function Route({ path, component }) {
  routes.push({ path, component });
  return null; // nothing to render directly
}

function Router({ rootId }) {
  const root = document.getElementById(rootId);

  function onLocationChange() {
    const path = window.location.pathname;
    const route = routes.find(r => r.path === path);
    if (route) {
      render(route.component(), root);
    }
  }

  window.addEventListener("popstate", onLocationChange);
  onLocationChange(); // initial render
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