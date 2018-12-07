/**
 * AngularJS应用任何一个部分，无论它渲染在哪个上下文中，都有父级作用域存在。对于ng-app
 * 所处的层级来讲，它的父级作用域就是$rootScope.
 * 
 * 有一个例外:在指定内部创建的作用域被称作孤立作用域。
 * 
 * 除了孤立作用域外，所有的作用域都通过原型继承而来，也就是说它们都可以访问父级作用域。
 * 
 * 默认情况下，AngularJS在当前作用域中无法找到某个属性时，便会在父级作用域中进行查找。
 * 如果AngularJS找不到对应的属性，会顺着父级作用域一直向上寻找，直到抵达$rootScope为止。
 * 如果在$rootScope中也找不到，程序会继续运行，但视图无法更新。
 */