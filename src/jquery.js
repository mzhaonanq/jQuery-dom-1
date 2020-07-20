window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
  let elements;
  if (typeof selectorOrArrayOrTemplate === "string") {
    if (selectorOrArrayOrTemplate[0] === "<") {
      //判断是否想要添加元素
      elements = [createElement(selectorOrArrayOrTemplate)];
    } else {
      elements = document.querySelectorAll(selectorOrArrayOrTemplate);
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    elements = selectorOrArrayOrTemplate;
  }
  function createElement(string) {
    const container = document.createElement("template");
    container.innerHTML = string;
    return container.content.firstChild;
  }
  const api = Object.create(jQuery.prototype);
  //将api的原型指向jQuery.prototype
  Object.assign(api, {
    //将后面的一个匿名对象复制到目标对象（api），返回新的目标对象
    elements: elements,
    oldApi: selectorOrArrayOrTemplate.oldApi,
  });
  return api;
};

jQuery.fn = jQuery.prototype = {
  constructor: jQuery,
  jquery: true,
  get(index) {
    return this.elements[index];
  },
  each(fn) {
    for (let i = 0; i < this.elements.length; i++) {
      fn.call(null, this.elements[i], i);
    }
    return this;
  },
  appendTo(node) {
    //调用方加入参数方
    if (node instanceof Element) {
      this.each((el) => node.appendChild(el));
    } else if (node.jquery === true) {
      //判断node是否为调用jquery()后返回的api
      this.each((el) => node.get(0).appendChild(el));
      //如果是就往node可操纵的第一个元素里添加子元素
      //添加的子元素为调用appendTo方法的api所操纵的元素
    }
  },
  append(children) {
    //参数方加入调用方
    if (children instanceof Element) {
      this.get(0).appendChild(children);
    } else if (children instanceof HTMLAllCollection) {
      for (let i = 0; i < children.length; i++) {
        this.get(0).appendChild(children[0]);
      }
    } else if (children.jquery === true) {
      children.each((node) => this.get(0).appendChild(node));
    }
  },
  find(selector) {
    let array = [];
    for (let i = 0; i < this.elements.length; i++) {
      const elements2 = Array.from(this.elements[i].querySelectorAll(selector));
      array = array.concat(elements2);
    }
    array.oldApi = this; // this 就是 旧 api
    return jQuery(array);
  },
  end() {
    return this.oldApi; //this是新的api
  },
  parent() {
    const array = [];
    this.each((node) => {
      if (array.indexOf(node.parentNode) === -1) {
        array.push(node.parentNode);
      }
    });
    return jQuery(array);
  },
  children() {
    const array = [];
    this.each((node) => {
      array.push(...node.children);
    });
    return jQuery(array);
  },
  print() {
    console.log(this.elements);
  },
  addClass(className) {
    for (let i = 0; i < this.elements.length; i++) {
      const element = this.elements[i];
      element.classList.add(className);
    }
    return this;
  },
};
