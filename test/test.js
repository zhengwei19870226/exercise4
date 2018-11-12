describe('this', function () {
  it('setTimeout', function (done) {
    var obj = {
      say: function () {
        setTimeout(() => {
          // this 是什么？想想为什么？
          //setTimeout不指定作用域的话，this是指向全局的，这里setTimeout在声明函数时使用了箭头函数=>,而箭头函数不绑定this，是声明时所在的父作用域，所以这里指向的是obj本身
          this.should.equal(obj)
          done()
        }, 0)
      }
    }
    obj.say()
  }) 

  it('global', function () {
    function test() {
      // this 是什么？想想为什么？
      //全局调用函数，指向全局，这里是nodejs的全局global,如果是在浏览器中，全局是window,严格模式下是undefined
      this.should.equal(global)
    }
    test()
  })

  describe('bind', function () {
    it('bind undefined', function () {
      var obj = {
        say: function () {
          function _say() {
            // this 是什么？想想为什么？
            //func.bind(context)函数会修改函数内部的this指向为context，使得函数不论在何时调用，其内部都指向context
            //say是立即执行函数，obj的赋值过程从右到左，在say函数执行的时候obj的赋值还没有完成，所以bind(obj)相当于bind(undefined)，所以this指向全局global
            this.should.equal(global)
          }
          return _say.bind(obj)
        }()
      }
      obj.say()
    })

    it('bind normal', function () {
      var obj = {}
      obj.say = function () {
        function _say() {
          // this 是什么？想想为什么？
          //首先完成obj的赋值，bind(obj)使this指向obj
          this.should.equal(obj)
        }
        return _say.bind(obj)
      }()
      obj.say()
    })
  })
})