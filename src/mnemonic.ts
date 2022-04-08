import * as bip39 from "bip39";
import randombytes from "randombytes";
import createHash from "create-hash";

// console.log(bip39.generateMnemonic(128));
// console.log(bip39.generateMnemonic(160));
// console.log(bip39.generateMnemonic(192));
// console.log(bip39.generateMnemonic(224));
// console.log(bip39.generateMnemonic(256));

function lpad(str: any, padString: any, length: any) {
  while (str.length < length) {
    str = padString + str;
  }
  return str;
}

function bytesToBinary(bytes: any) {
  return bytes.map((x: any) => lpad(x.toString(2), "0", 8)).join("");
}

const mnemonic =
  "champion ignore garage duck that vicious equal finish jump soft slice once";

// console.log(mnemonic.normalize("NFKD"));
// console.log(bip39.mnemonicToSeedSync(mnemonic, "123").toString("hex"));
console.log(bip39.mnemonicToEntropy(mnemonic));

// const rng = randombytes(128 / 8);
// console.log(rng, Array.from(rng), bytesToBinary(Array.from(rng)));
// console.log(randombytes(33 / 8).length);
// console.log(randombytes(64 / 8).length);

// console.log(createHash("sha256").digest().toString("hex"));
// console.log(createHash("sha256").digest().toString("hex"));

// console.log("123456789123456789".match(/(.{1,11})/g));
// console.log("123456789123456789".match(/(.{1,11})/g));

// const buf = randombytes(128 / 8);
// console.log(`${buf.length} bytes of random data: ${buf.toString("hex")}`);
