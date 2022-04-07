import colors from "colors";
import * as borsh from "borsh";
import { Boy, Father, Girl, Son } from "./utils/structs";
import { SCHEMA } from "./utils/schema";

// 1
console.log(colors.blue("Serialize A Gril named 'Lucy'"));
console.log("Result: ", borsh.serialize(SCHEMA, new Girl({ name: "Lucy" })));

/*
	Result: <Buffer 04 00 00 00 4c 75 63 79>
	这个结果可以分为两个部分看:

	1. 04 00 00 00 
	表示后续数据的长度, 值为4.
	这里的进位是从左到右, 最大 2^32 - 1 = 4294967295.
	255 00 00 00 => 255
	00  01 00 00 => 256

	2.4c 75 63 79 
	表示后续数据的内容, 值为"Lucy".
*/

// 2
console.log(
  colors.blue("\nSerialize Grils 'Lucy' && 'Catherine' as Tom's girlFriends")
);
console.log(
  "Result: ",
  borsh.serialize(
    SCHEMA,
    new Son({
      name: "Tom",
      age: 17,
      girlFriends: [
        new Girl({ name: "Lucy" }),
        new Girl({ name: "Catherine" }),
      ],
    })
  )
);

/*
	Result:  <Buffer 03 00 00 00 54 6f 6d 11 02 00 00 00 04 00 00 00 4c 75 63 79 09 00 00 00 43 61 74 68 65 72 69 6e 65 00>

	因为我们上面的属性赋值是按照 SCHEMA 中的顺序来的, 所以知道Buffer整体会分为三个部分, 且顺序为: name , age , girlFriends
 
	1. 03 00 00 00 54 6f 6d
	'Tom'长度为3, 值为'Tom'.

	2. 11
	age是一个u8, 只占一位, 值为17. hex下表示为11.

	3. 02 00 00 00 04 00 00 00 4c 75 63 79 09 00 00 00 43 61 74 68 65 72 69 6e 65
	girlFriends是一个数组, 其中有两个元素, 分别为'Lucy'和'Catherine'.
  
	第一部分 02 00 00 00 表示是一个数组, 其中有两个元素, 分别为'Lucy'和'Catherine'.
	第二部分 04 00 00 00 4c 75 63 79 09, 表示'Lucy'的长度为4, 值为'Lucy'.
	第三部分 09 00 00 00 43 61 74 68 65 72 69 6e 65, 表示'Catherine'的长度为9, 值为'Catherine'.

	4. 00(最后)
	表示这里有个option的字段(mates), 其值为null.
 */

// 2.1
console.log(
  colors.blue(
    "\nSerialize Grils 'Lucy' && 'Catherine' as Tom's girlFriends and Tom has only one mate named 'Jimy'"
  )
);
console.log(
  "Result: ",
  borsh.serialize(
    SCHEMA,
    new Son({
      name: "Tom",
      age: 17,
      girlFriends: [
        new Girl({ name: "Lucy" }),
        new Girl({ name: "Catherine" }),
      ],
      mates: [new Boy({ name: "Jimy" })],
    })
  )
);

/*
	Result:  <Buffer 03 00 00 00 54 6f 6d 11 02 00 00 00 04 00 00 00 4c 75 63 79 09 00 00 00 43 61 74 68 65 72 69 6e 65 01 01 00 00 00 04 00 00 00 4a 69 6d 79>

	前面的结果和上面的结果是一样的, 只是mates的值为一个数组, 其中有一个元素, 为'Jimy'.
	可以看到同样是数组, 设置是否可选会影响序列化之后的结果长度(是否包含一个前置的option标志位)
	这里序列化和反序列化的地方(链上的Program/Smart Contract)需要保持对属性的是否可选性要保持一样,不然会无法反序列化.

	1. 01 
	这里在上面是 00, 这里是 01 表示有值

	2. 01 00 00 00 04 00 00 00 4a 69 6d 79
	mates的值为一个数组, 其中有一个元素, 为'Jimy'.
*/
