import { Boy, Father, Girl, Son } from "./structs";

export const SCHEMA = new Map<any, any>([
  [
    Father,
    {
      kind: "struct",
      fields: [
        ["son", Son],
        ["age", "u8"],
      ],
    },
  ],
  [
    Son,
    {
      kind: "struct",
      fields: [
        ["name", "string"],
        ["age", "u8"],
        ["girlFriends", [Girl]],
        ["mates", { kind: "option", type: [Boy] }],
      ],
    },
  ],
  [
    Girl,
    {
      kind: "struct",
      fields: [["name", "string"]],
    },
  ],
  [
    Boy,
    {
      kind: "struct",
      fields: [["name", "string"]],
    },
  ],
]);
