const Block = require('./Block.js');
const crypto = require('crypto');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis];
        this.difficulty = 3;
    }

    // 获取最新区块
    get latestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // 获取整条链
    get() {
        return this.chain;
    }

    // 计算哈希
    calculateHash(index, previousHash, timestamp, data, nonce) {
        const str = index + previousHash + timestamp + JSON.stringify(data) + nonce;
        return crypto.createHash('sha256').update(str).digest('hex');
    }

    // 挖矿
    mine(data) {
        const index = this.latestBlock.index + 1;
        const previousHash = this.latestBlock.hash;
        let timestamp = Date.now();
        let nonce = 0;
        let hash;
        const prefix = "0".repeat(this.difficulty);

        while (true) {
            hash = this.calculateHash(index, previousHash, timestamp, data, nonce);
            if (hash.startsWith(prefix)) {
                break;
            }
            nonce++;
        }
        const newBlock = new Block(index, previousHash, timestamp, data, hash, nonce);
        this.chain.push(newBlock);
        return newBlock;
    }

    // 校验下一个区块是否合法
    isNextBlockValid(newBlock, prevBlock) {
        if (prevBlock.index + 1 !== newBlock.index) return false;
        if (prevBlock.hash !== newBlock.previousHash) return false;
        if (!newBlock.hash.startsWith("0".repeat(this.difficulty))) return false;
        if (newBlock.hash !== this.calculateHash(newBlock.index, newBlock.previousHash, newBlock.timestamp, newBlock.data, newBlock.nonce)) return false;
        return true;
    }
}

module.exports = Blockchain;


module.exports = Blockchain;
