window.jQuery = function (selectorOrArrayOrTemplate) {
  let elements;
  if (typeof selectorOrArrayOrTemplate === "string") {
    if (selectorOrArrayOrTemplate[0] === "<") {
      //判断传入参数的是否为标签
      //创建div
      elements = [createElement(selectorOrArrayOrTemplate)];
    } else {
      //查找div
      elements = document.querySelectorAll(selectorOrArrayOrTemplateOrTemplate);
    }
  } else if (selectorOrArrayOrTemplateOrTemplate instanceof Array) {
    elements = selectorOrArrayOrTemplate;
  }
  function createElement(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  }

  return {
    oldApi: selectorOrArrayOrTemplate.oldApi,
    //这里的return是因为想要操纵获取到的元素
    addClass(className) {
      //elements 和 addClass() 构成闭包
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.add(className);
      }
      //这里的return是想要重复操纵那些元素
      return this; //这里就是要返回调用该函数的对象
    },
    find(selector) {
      let array = [];
      for (let i = 0; i < elements.length; i++) {
        const elements2 = Array.from(elements[i].querySelectorAll(selector));
        array = array.concat(elements2);
      }
      array.oldApi = this; //this指向旧的API
      return jQuery(array);
    },
    end() {
      return this.oldApi; //this指向新的API
    },
    each(fn) {
      for (let i = 0; i < elements.length; i++) {
        fn.call(null, elements[i], i);
      }
      return this;
    },
    parent() {
      const array = [];
      this.each((node) => {
        if (array.indexOf(node.parentNode) === -1) {
          //爸爸可能是同一个爸爸，所以需要上述步骤除去重复的爸爸
          array.push(...node.parentNode);
        }
      });
      return jQuery(array);
    },
    children() {
      const array = [];
      this.each((node) => {
        array.push(...node.children); //儿子不可能是同一个儿子
      });
      return jQuery(array);
    },
    siblings() {
      const array = [];
      this.each((node) => {
        array.concat(
          Array.from(node.parentNode.children).filter((n) => n !== node)
        );
      }); //兄弟姐妹里要排除自己
      return jQuery(array);
    },
    prev() {
      const array = [];
      this.each((node) => {
        if (Array.indexOf(node.previousSibling) === -1) {
          array.push(...node.previousSibling);
        }
      });
      return jQuery(array);
    },
    next() {
      const array = [];
      this.each((node) => {
        if (Array.indexOf(node.nextSibling) === -1) {
          array.push(...node.nextSibling);
        }
      });
      return jQuery(array);
    },
    index() {
      const array = [];
      this.each((node) => {
        array = node.parentNode.children;
        let i;
        for (i = 0; i < array.length; i++) {
          if (array[i] === node) {
            break;
          }
        }
        return i;
      });
      return jQuery(array);
    },
    print() {
      console.log(elements);
    },
  };
};
