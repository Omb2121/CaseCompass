/**
 * CaseCompass — Minimal hash-based SPA router
 */

export class Router {
  constructor(routes, defaultRoute = '/cases') {
    this.routes = routes;
    this.defaultRoute = defaultRoute;
    this.currentRoute = null;
    this.onNavigate = null;

    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }

  getPath() {
    const hash = window.location.hash.slice(1) || this.defaultRoute;
    return hash.startsWith('/') ? hash : `/${hash}`;
  }

  handleRoute() {
    const path = this.getPath();
    const route = this.routes.find(r => r.path === path);

    if (route) {
      this.currentRoute = route;
      if (this.onNavigate) this.onNavigate(route);
    } else {
      this.navigate(this.defaultRoute);
    }
  }

  navigate(path) {
    window.location.hash = path;
  }
}
