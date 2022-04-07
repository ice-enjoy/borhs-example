export class Father {
  son: Son;
  age: number;
  constructor(args: Father) {
    this.son = args.son;
    this.age = args.age;
  }
}

export class Son {
  name: string;
  age: number;
  // 支持数组, 定长/不定长
  girlFriends: Girl[] = [];
  // 支持可选参数
  mates?: Boy[] | null;
  constructor(args: Son) {
    this.name = args.name;
    this.age = args.age;
    this.girlFriends = args.girlFriends;
    this.mates = args.mates || null;
  }
}

export class Girl {
  name: string;
  constructor(args: Girl) {
    this.name = args.name;
  }
}

export class Boy {
  name: string;
  constructor(args: Boy) {
    this.name = args.name;
  }
}
