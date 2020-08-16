const x = jQuery(".test");
x.siblings().print();
// 这就是链式操作
// 函数用对象来调用，这个对象就是this
// obj.fn(p1)===obj.fn.call(this,p1)
//jQuery提供一个函数，该函数提供一个选择器，然后获取元素，返回一个对象（API），
//对象（API）里的函数可以操纵获取到的元素
//jQuery是一个特殊的构造函数（不需要用new构造对象）
//jQuery对象指的是jQuery构造出来的对象
