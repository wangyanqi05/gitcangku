const messageType = {
    REQUEST_LATEST_BLOCK: 0, // 请求最新区块
    RECEIVE_LATEST_BLOCK: 1, // 响应最新区块
    REQUEST_LAREST_BLOCKCHAIN: 2, // 请求整个区块链
    RECEIVE_LAREST_BLOCKCHAIN: 3, // 响应整个区块链
    HANDSHAKE: 4, // 握手消息
};
module.exports = messageType;
