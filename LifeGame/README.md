## 生命游戏

英文名称:game of life conway

### 规则

每一个方格细胞可以被看作是一个生命体，且有两种生命状态：live生存（黑色），或 dead死亡（白色）

任意一个方格四周围绕的8个方格成为该方格的邻居（neighbours）

**1.** **出生** | 当周围有3个存活细胞时，则迭代后该细胞变成存活状态（模拟繁殖）

**2.** **孤独而亡** | 当前细胞为存活状态时，当周围的邻居细胞低于两个(不包含两个)存活时，该细胞变成死亡状态. （模拟生命数量稀少）

**3.** **拥挤而亡**| Death by overcrowding: Each live cell with four or more live neighbours will die in the next generation. （模拟生命数量过多）

\4. **生存** | Survival: Each live cell with either two or three live neighbours will remain alive for the next generation.