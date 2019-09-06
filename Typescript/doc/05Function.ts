/// 函数定义
function add(x: number, y: number): number {
  return x + y;
}

let myAdd = function (x: number, y: number): number { return x + y; };

// 详细定义类型
let myAdd2: (baseValue: number, increment: number) => number =
  function (x: number, y: number): number { return x + y; };

// 自动推断
let myAdd3: (baseValue: number, increment: number) => number =
  function (x, y) { return x + y; };



/// 可选参数
// 可选参数必需在（必需参数）后面
function buildName(firstName: string, lastName?: string) {
  if (lastName)
    return firstName + " " + lastName;
  else
    return firstName;
}

/// 默认参数
function buildName2(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName;
}

// *** 以上 可选参数 和 默认参数 类型都是一样的，共享同样的类型 (firstName: string, lastName?: string) => string

// 默认参数可以放在前面，但是必需明确传 undefined
function buildName3(firstName = "Will", lastName: string) {
  return firstName + " " + lastName;
}

// let result1 = buildName3("Bob");                  // error, too few parameters
let result3 = buildName3("Bob", "Adams");         // okay and returns "Bob Adams"
let result4 = buildName3(undefined, "Adams");     // okay and returns "Will Adams"



/// 剩余参数
// 函数类型为：(fname: string, ...rest: string[]) => string
function buildName4(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName4("Joseph", "Samuel", "Lucas", "MacKinzie");





/// this
interface Card {
  suit: string;
  card: number;
}
interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}

let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker0: function () {
    return function () {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);
      // error： this 没有绑定到deck上
      // 在外部调用时，会把this当成 window(浏览器) 或 undefined(严格模式) 来处理
      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    }
  },
  createCardPicker1: function () {
    // 箭头函数能保存函数创建时的 this值，而不是调用时的值，但是此时 this 的类型依然是 any
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    }
  },
  // 把this当参数，指明 this 的类型
  createCardPicker: function (this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(pickedCard / 13);

      return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
    }
  }
}

// this放进回调函数中

interface UIElement {
  // this: void  明确表示不需要this参数（不捕获）
  addClickListener(onclick: (this: void, e: Event) => void): void;
}

interface Event {
  message: string;
}

class Handler {
  info: string = "";
  // error: 会传递自身的this参数, 导致报错
  onClickBad(this: Handler, e: Event) {
    // oops, used this here. using this callback would crash at runtime
    this.info = e.message;
  };

  // ok: 不传递this，但是函数内不能使用this访问属性
  onClickGood1(this: void, e: Event) {
    // can't use this here because it's of type void!
    console.log('clicked!');
  };

  // ok: 使用箭头函数保存this
  // 缺点是每个 Handler对象都会创建一个箭头函数。 
  // 另一方面，方法只会被创建一次，添加到 Handler的原型链上。 它们在不同 Handler对象间是共享的。
  onClickGood2 = (e: Event) => { this.info = e.message }
}

let h = new Handler();
uiElement.addClickListener(h.onClickBad); // error!
uiElement.addClickListener(h.onClickGood1); // ok
uiElement.addClickListener(h.onClickGood2); // ok



/// 重载: 同名，但是参数类型不同
function pickCard(x: { suit: string; card: number; }[]): number;
function pickCard(x: number): { suit: string; card: number; };