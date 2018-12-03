/**
 * 指令作用域
 * 为了完全理解指令定义对象剩下的参数，需要先介绍指令作用域是如何工作的
 */

 //$rootScoep这个特殊的对象会在DOM中声明ng-app时被创建
 <div ng-app="myApp" ng-init="someProperty='some data'"></div>
 <div ng-init="siblingProperty='more data'">
    Inside Div Two
    <div ng-init="aThirdProperty"></div>
 </div>

 /**
  * 上面的代码中，我们在应用的根作用域中设置了三个属性:someProperty、siblingProperty和anotherSiblingProperty
  * 
  * 从这里开始，DOM中每个指令调用时都可能会
  * 1)直接调用相同的作用域对象;
  * 2)从当前作用域对象继承一个新的作用域对象;
  * 3)创建一个同当前作用域相隔离的作用域对象。
  * 
  * 上面的例子展示的是第一种情况。前面两个div是兄弟元素，可以通过get和set访问$rootScope。第二个div内部的div
  * 同样可以通过get和set访问相同的根作用域。
  * 
  * 指令嵌套并不一定意味着需要改变它的作用域。默认情况下，子指令会被赋予访问父DOM元素对应的作用域的能力，这样做的原因可以
  * 通过介绍指令的scope参数来理解，scope参数默认是false.
  */

  /**
   * scope参数(布尔型或对象)
   * 
   * scope参数是可选的，可以被设置为true或一个对象。默认值是false。
   * 当scope设置为true时，会从父作用域继承并创建一个新的作用域对象。
   * 如果一个元素上有多个指令使用了隔离作用域，其中只有一个可以生效。只有指令模板中的根元素
   * 可以获得一个新的作用域。因此，对于这些对象来说scope默认被设置为true。
   * 
   * 内置指令ng-controller的作用，就是从父级作用域继承并创建一个新的子作用域。它会创建一个新的从父作用域
   * 继承而来的子作用域。
   * 
   * 作用域的继承机制是向下而非向上进行的
   */

   /**
    * 绑定策略：
    * 本地作用域属性:使用@符号将本地作用域同DOM属性的值进行绑定。指令内部的作用域可以使用外部作用域的变量
    * 
    * 双向绑定:通过=可以将本地作用域上的属性同父级作用域上的属性进行双向的数据绑定。就像普通的数据绑定一样，
    * 本地属性会反映出父数据模型中所发生的改变。
    * 
    * 父级作用域绑定:通过&符号可以对父级作用域进行绑定，以便在其中运行函数。意味着者对这个值进行设置时会生成一个
    * 指向父级作用域的包装函数。
    * 
    * 要使调用带有一个参数的父方法，我们需要传递一个对象，这个对象的键是参数的名称，值是要传递给参数的内容。
    */

    /**
     * transclude:
     * transclude是一个可选的参数。如果设置了，其值必须为true，它的默认值是false。
     * 只有当你希望创建一个可以包含任意内容的指令时，才使用transclude: true。
     */

     /**
      * controller
      * controller参数可以是一个字符串或者一个函数。当设置为字符串时，会以字符串的值为名字，来查找注册在应用中的控制器的构造函数
      * 可以在指令内部通过匿名构造函数的方式来定义一个内联的控制器
      * 
      * 指令的控制器和link函数可以进行互换。控制器主要用来提供可在指令间复用的行为，但链接函数只能在当前内部指令中定义行为，且无法在
      * 指令间复用。
      * 
      * link函数可以将指令互相隔离开来，而controller则定义可复用的行为。
      * 
      * 由于指令可以require其他指令所使用的控制器，因此控制器常用来放置多个指令间共享的动作。
      * 
      * 如果我们希望将当前指令的API暴露给其他指令使用，可以使用controller参数，否则可以使用link来构造当前指令元素的功能性。
      * 如果我们使用了scope.$watch()或者想要与DOM元素做实时交互，使用链接会是更好的选择。
      * 
      * 技术上讲，$scope会在DOM元素被实际渲染之前传入到控制器中。在某些情况下，例如使用了嵌入，控制器中的作用域所反映的
      * 作用域可能与我们所期望的不一样，这种情况下，$scope对象无法保证可以被正常更新。
      * 
      * 当想要同当前屏幕上的作用域交互时，可以使用被传入到link函数中的scope参数。
      */

      /**
       * controllerAs(字符串)
       * controllerAs参数是用来设置控制器的别名，可以以此为名来发布控制器，并且作用域可以访问
       * controllerAs。这样就可以在视图中引用控制器，甚至无需注入$scope。
       */

       /**
        * require:
        * require参数可以被设置为字符串或数组，字符串代表另外一个指令的名字。require会将控制器注入到其值所指定的指令中，
        * 并作为当前指令的链接函数的第四个参数。
        * 
        * 字符串或数组元素的值是会在当前指令的作用域中使用的指令名称。
        * 
        * scope会影响指令作用域的指向，是一个隔离作用域，一个有依赖的作用域或者完全没有作用域。在任何情况下，AngularJS
        * 编译器在查找子控制器时都会参考当前指令的模板。
        * 
        * 如果不使用^前缀，指令只会在自身的元素上查找控制器。
        * 
        * require参数的值可以在下面的前缀进行修饰，这会改变查找控制器时的行为
        * ?如果当前指令中没有找到所需要的控制器，会将null作为传给link函数的第四个参数。
        * ^如果添加了^前缀，指令会在上游的指令链中查找require参数指令的控制器。
        * ?^将前面两个选项的行为组合起来，我们可选择地加载需要的指令并在父指令链中进行查找。
        * 没有前缀:指令将会在自身所提供的控制器中进行查找，如果没有找到任何控制器(或具有指定的名字的指令)就抛出一个错误。
        */


        /**
         * AngularJS的生命周期:
         * 一旦对指令和其中的子模板进行遍历或编译，编译后的模板会返回一个叫做模板函数的函数。我们有机会再指令的模板函数被返回前，对编译后的DOM
         * 树进行修改。
         * 
         * 在这个时间点DOM树海没有进行数据绑定，意味着如果此时对DOM树进行操作只会有很少的性能开销。基于此点，ng-repeat和ng-transclude等内置指令
         * 会在这个时候，也就是还未与任何作用域进行绑定时对DOM进行操作。
         * 
         * 以ng-repeat为例，它会遍历指定的数组或对象，在数据绑定之前构建出对应的DOM结构。
         * 
         * 如果我们用ng-repeat来创建无序列表，其中的每一个<li>都会被ng-click指令所修饰，这个过程会使得性能比手动创建列表要快得多，尤其是列表中含有上百个元素时。
         * 
         * 与克隆<li>元素，再将其与数据进行链接，然后对每个元素都循环进行此操作的过程不同，我们仅需要先将无需列表构造出来，
         * 然后将新的DOM（编译后的DOM）传递给指令生命周期中的下一个阶段，即链接阶段
         * 
         * 一个指令的表现一旦编译完成，马上就可以通过编译函数对其进行访问，编译函数的签名包含有访问指令声明所在的元素（tElemente）及该元素其他属性（tAttrs）的方法
         * 这个编译函数返回前面提到的模板函数，其中含有完整的解析树。
         * 
         * 由于每个指令都可以有自己的模板和编译函数，每个模板返回的也都是自己的模板函数。链条顶部的指令会将内部子指令的模板合并在一起成为一个模板函数并返回
         * 但在树的内部，只能通过模板函数访问其所处的分支。
         * 
         * 最后，模板函数被传递给编译后的DOM树中每个指令定义规则中指定的链接函数
         */

         /**
          * compile(对象或函数)
          * compile选项本身并不会被频繁使用，但是link函数则会被经常使用。本质上，当我们设置了link选项，实际上是创建了一个postLink()链接函数，以便compile()函数可以定义链接函数。
          * 通常情况下，如果设置了compile函数，说明我们希望在指令和实时数据被放到DOM中之前进行DOM操作，在这个函数中进行诸如添加和删除节点等DOM操作是安全的。
          * compile和link选项是互斥的。如果同时设置了这两个选项，那么会把compile所返回的函数当作链接函数，而link选项本身则会被忽略。
          */