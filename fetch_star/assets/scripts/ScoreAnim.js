cc.Class({
    extends: cc.Component,

    reuse(game) {
        this.game = game;
    },

    despawn() {
        this.game.despawnAnimRoot();
    }
});
