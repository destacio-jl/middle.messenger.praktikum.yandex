import EventBus, { IEventBus } from "./EventBus";
import { v4 as makeUUID } from "uuid";
import { compile } from "handlebars";
import { Callback } from "./types";

type Props = {
  [key: string]: unknown;
};

export type BlockSettings = {
  withInternalID?: boolean;
  className?: string | string[];
  attributes?: { [key: string]: string };
  style?: string;
};

type Meta = {
  tagName: string;
  settings: BlockSettings;
};

export interface IBlock {
  _id?: string;
  props: Props;
  eventBus: () => IEventBus;
  init: () => void;
  componentDidMount: (oldProps: Props) => void;
  dispatchComponentDidMount: () => void;
  componentDidUpdate: (oldProps: Props, newProps: Props) => boolean;
  setProps: (newProps: Props) => void;
  render: () => void;
  getContent: () => HTMLElement | null;
}

class Block implements IBlock {
  props: Props;

  eventBus: () => IEventBus;

  _eventBus: () => IEventBus;

  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
  };

  _element: HTMLElement = null;

  _id: string = null;

  _meta: Meta = null;

  children: { [key: string]: IBlock } = {};

  constructor(
    tagName = "div",
    propsAndChildren: Props = {},
    settings: BlockSettings = {}
  ) {
    const { children, props } = this._getChildren(propsAndChildren);

    this.children = children;

    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
      settings,
    };

    const { withInternalID } = settings;

    if (withInternalID) {
      this._id = String(makeUUID());
      this.props = this._makePropsProxy({ ...props, __id: this._id });
      this.children = this._makePropsProxy({ ...children });
    } else {
      this.props = this._makePropsProxy(props);
      this.children = this._makePropsProxy({ ...children });
    }

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: IEventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this) as Callback);
    eventBus.on(
      Block.EVENTS.FLOW_CDM,
      this._componentDidMount.bind(this) as Callback
    );
    eventBus.on(
      Block.EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this) as Callback
    );
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this) as Callback);
  }

  _createResources() {
    const {
      tagName,
      settings: { className },
    } = this._meta;
    this._element = this._createDocumentElement(tagName, className);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount();

    // Object.values(this.children).forEach((child) => {
    //   child.dispatchComponentDidMount();
    // });
  }

  componentDidMount(oldProps?: Props) {
    // console.log("did mount, props:", oldProps);
  }

  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
  }

  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    const { children, props } = this._getChildren(nextProps);

    Object.assign(this.props, props);
    Object.assign(this.children, children);

    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  };

  get element() {
    return this._element;
  }

  _render() {
    if (!this._element) return;

    const block = this.render();

    this._removeEvents();

    if (typeof block === "string") {
      this._element.innerHTML = block;
    } else {
      this._element.replaceChildren(block.content);
    }

    this._addEvents();
  }

  render(): string | HTMLTemplateElement {
    return this.element;
  }

  getContent() {
    return this.element;
  }

  compile(
    template: HandlebarsTemplateDelegate,
    props: Props
  ): HTMLTemplateElement {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.reduce((result: string, block: Block) => {
          return result + `<div data-id="${block._id}"></div>`;
        }, ``);
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    const fragment = document.createElement("template");

    const compiledTemplate = compile(template);
    fragment.innerHTML = compiledTemplate(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((block: Block) => {
          const stub = fragment.content.querySelector(
            `[data-id="${block._id}"]`
          );
          stub.replaceWith(block.getContent());
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        stub.replaceWith(child.getContent());
      }
    });

    return fragment;
  }

  _makePropsProxy(props: Props): Props {
    const proxyProps = new Proxy<Props>(props, {
      set: (target, prop, value) => {
        target[prop] = value;
        this._render();
        return true;
      },
      deleteProperty() {
        throw new Error(`Удаление запрещено`);
      },
    });

    return proxyProps;
  }

  _createDocumentElement(tagName: string, className?: string) {
    const { attributes, style } = this._meta.settings;
    const element = document.createElement(tagName);

    if (attributes)
      Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, String(value));
      });

    if (className && typeof className === "string")
      element.classList.add(className);
    if (Array.isArray(className))
      className.forEach((cl: string) => {
        element.classList.add(cl);
      });
    if (this._id) element.setAttribute("data-id", this._id);
    if (style) element.style.cssText = style;
    return element;
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(
        eventName,
        events[eventName] as EventListenerOrEventListenerObject,
        true
      );
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(
        eventName,
        events[eventName] as EventListenerOrEventListenerObject
      );
    });
  }

  _getChildren(propsAndChildren: Props) {
    const children = {};
    const props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      const isBlock = value instanceof Block;
      const isBlockArray =
        Array.isArray(value) && value[0] && value[0] instanceof Block;

      if (isBlock || isBlockArray) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  unmount() {
    this._removeEvents();
    this.getContent().remove();
  }
}

export default Block;
