const Block = require('./Block');
const crypto = require('crypto');

class Blockchain{
    // 初始化一个新的区块链
    constructor() {
        this.blockchain = [Block.genesis]; // 初始化区块链中的第一个区块
        this.difficulty = 3; // 难度值，控制哈希的生成难度
    }

    // 获取区块链中的所有区块数组
    get() {
        return this.blockchain;
    }

    // 获取区块链中最新的区块（整条链的最末端）
    get latestBlock() {
        return this.blockchain[this.blockchain.length - 1]
    }

    // 验证哈希值是否满足难度要求的函数
    isValidHashDifficulty(hash) {
        var i = 0;
        for (; i < hash.length; i++) {
            if (hash[i] !== '0') {
                break;
            }
        }
        return i >= this.difficulty;
    }

    //为一个区块对象计算哈希值
    calculateHashForBlock(block) {
        const {
            index,
            previousHash,
            timestamp,
            data,
            nonce
        } = block;
        return this.calculateHash(index, previousHash, timestamp, data, nonce);
    }

    //通用的计算哈希值函数的方法
    calculateHash(index, previousHash, timestamp, data, nonce) {
        return crypto.createHash('sha256').update(index + previousHash + timestamp + data + nonce).digest('hex');
    }

    //挖矿方法--创建新的区块并添加到区块链中
    mine(data) {
        const newBlock = this.generateNextBlock(data);
        try {
            this.addBlock(newBlock);
        } catch (error) {
            throw error;
        }
    }

    //生成下一个区块的方法---执行工作量证明（挖矿）
    generateNextBlock(data) {
        const nextIndex = this.latestBlock.index + 1;
        const previousHash = this.latestBlock.hash;
        let timestamp = new Date().getTime();
        let nonce = 0;
        let nextHash = this.calculateHash(nextIndex, previousHash, timestamp, data, nonce);
        while (!this.isValidHashDifficulty(nextHash)) {
            nonce = nonce + 1;
            timestamp = new Date().getTime();
            nextHash = this.calculateHash(nextIndex, previousHash, timestamp, data, nonce);
        }
        const nextBlock = new Block(
            nextIndex,
            previousHash,
            timestamp,
            data,
            nextHash,
            nonce
        );
        return nextBlock;
    }

    //添加区块到区块链的方法
    addBlock(newBlock) {
        if (this.isValidNextBlock(newBlock, this.latestBlock)) {
            this.blockchain.push(newBlock);
        } else {
            throw "Error: Invalid Block";
        }
    }

    //校验新区块是否合法
    isValidNextBlock(newBlock, previousBlock) {
        if (newBlock.index !== previousBlock.index + 1) {
            return false;
        }
        if (newBlock.previousHash !== previousBlock.hash) {
            return false;
        }
        if (this.calculateHashForBlock(newBlock) !== newBlock.hash) {
            return false;
        }
        if (!this.isValidHashDifficulty(newBlock.hash)) {
            return false;
        }
        return true;
    }
}

module.exports = Blockchain;
