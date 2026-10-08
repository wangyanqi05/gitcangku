const Block = require("./Block");
const Blockchain = require("./Blockchain");
console.log("============区块链测试开始==============");
try{
    //1.测试创世区块
    console.log("1. 测试创世区块：");
    const genesis = Block.genesis;
    console.log(genesis.index, genesis.previousHash, genesis.timestamp, genesis.data, genesis.hash, genesis.nonce);
    console.log("=========创世区块创建成功==============");

    //2.测试初始化区块链
    console.log("2. 测试初始化区块链：");
    const blockchain = new Blockchain();
    console.log("区块链长度：", blockchain.get().length);
    console.log("最新区块索引：", blockchain.latestBlock.index);
    console.log("挖矿难度：", blockchain.difficulty);
    console.log("=========区块链初始化成功==============");

    //3.测试哈希难度验证
    console.log("3. 测试哈希难度验证：");
    console.log("当前难度要求：", blockchain.difficulty, "个前导0");
    const validHash = "000abc123def";
    const invalidHash = "00abc123def";
    console.log("-- \"" + validHash + "\" 是否有效: ", blockchain.isValidHashDifficulty(validHash));
    console.log("-- \"" + invalidHash + "\" 是否有效: ", blockchain.isValidHashDifficulty(invalidHash));
    console.log("=========哈希难度验证成功==============");

    //4.测试哈希计算
    console.log("4. 测试哈希计算：");
    const testHash = blockchain.calculateHash(8, "0", 1234567890, "测试", 0);
    console.log("- 计算的哈希值：", testHash);
    console.log("- 哈希长度：", testHash.length, "字符");
    console.log("\n√ 哈希计算正常\n");

} catch(err){
    console.log(err);
}
