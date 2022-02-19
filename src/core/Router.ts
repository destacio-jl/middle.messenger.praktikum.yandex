import Block from "./Block";
import Route from "./Route";
import { BlockConstructor, PopStateEventType } from "./types";

class Router {
  routes: Route[] = [];

  history: History = window.history;

  _currentRoute: Route = null;

  constructor() {
    if (Router.__instance) {
      return Router.__instance as Router;
    }

    Router.__instance = this;
  }

  use(pathname: string, block: BlockConstructor<Block>) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEventType) => {
      this._onRoute(event.currentTarget.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    route.render(route, pathname);
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}

export default Router;
