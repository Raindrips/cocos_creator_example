//类型
export enum CELL_TYPE {
    EMPTY = 0,
    A,
    B,
    C,
    D,
    E,
    F,
    BIRD
}

//格子状态
export enum CELL_STATUS {
    COMMON = '',
    CLICK = 'click',
    LINE = 'line',
    COLUMN = 'column',
    WRAP = 'wrap',
    BIRD = 'bird'
}

//动物
export enum ANITIME {
    TOUCH_MOVE = 0.3,
    DIE = 0.2,
    DOWN = 0.5,
    BOMB_DELAY = 0.3,
    BOMB_BIRD_DELAY = 0.7,
    DIE_SHAKE = 0.4      // 死前抖动
}
