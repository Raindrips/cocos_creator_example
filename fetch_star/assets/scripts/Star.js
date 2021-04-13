cc.Class({
    extends: cc.Component,
    
    properties: {
        // 星星和主角之间的距离小于这个数值时，就会完成收集
        pickRadius: 0,
    },

    reuse(game) {
        this.game = game;
        this.enabled = true;
        this.node.opacity = 255;
    },

    unuse() {
        // 因为回收时不执行任何操作，所以该方法可以不写
    },

    getPlayerDistance: function () {
        // 根据 player 节点位置判断距离
        var playerPos = this.game.player.getPosition();
        // 根据两点位置计算两点之间距离
        var dist = this.node.position.sub(playerPos).mag();
        return dist;
    },

    onPicked: function() {
        var pos = this.node.getPosition();
        // 调用 Game 脚本的得分方法
        this.game.gainScore(pos);
        // 然后销毁当前星星节点
        this.game.despawnStar(this.node);
    },

    update: function (dt) {
        // 每帧判断和主角之间的距离是否小于收集距离
        if (this.getPlayerDistance() < this.pickRadius) {
            // 调用收集行为
            this.onPicked();
            return;
        }
        
        // 根据 Game 脚本中的计时器更新星星的透明度
        var opacityRatio = 1 - this.game.timer/this.game.starDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    },
});
