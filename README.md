# DI-1024：深度强化学习 + 1024游戏

> 1024 游戏有时也被称为 [2048](https://en.wikipedia.org/wiki/2048_(video_game))。

是人机协作共同解密，还是人机对抗捕捉 AI 背后的的种种虫（Bug）。欢迎一起回味二的幂次方，体验极客瞬间~

P.S. 路过记得点个 star ![stars - di-1024](https://img.shields.io/github/stars/opendilab/di-1024?style=social) ，持续更新ing。

P.S.S. 想了解更多深度强化学习相关知识？快来 [DI-engine](https://github.com/opendilab/DI-engine) 和 [LightZero](https://github.com/opendilab/LightZero) 训练自己的智能体。

<div align="center">
    <a href="https://github.com/opendilab/DI-1024"><img width="500px" height="auto" src="https://github.com/opendilab/DI-1024/blob/main/assets/di1024_demo.png"></a>
</div>

# News
[WeChat] [今日忌加班，宜玩1024](https://opendilab.net/1024)

# 使用指南

- 在线网页版试玩 -> [传送门](https://opendilab.net/1024)

# 训练指南

先用以下命令安装依赖的包：

```bash
pip3 install -r requirements.txt
```

### MuZero 智能体训练

在 1024 环境上快速训练一个 [MuZero](https://github.com/opendilab/LightZero/blob/main/lzero/policy/muzero.py) 智能体：

```bash
cd DI-1024
python3 -u agent/config/muzero_2048_config.py
```

### StochasticMuZero 智能体训练

在 1024 环境上快速训练一个 [StochasticMuZero](https://github.com/opendilab/LightZero/blob/main/lzero/policy/stochastic_muzero.py) 智能体：

```bash
cd DI-1024
python3 -u agent/config/stochastic_muzero_2048_config.py
```

### 训练曲线

![img.png](assets/2048_benchmark.png)


# 更新计划

- [x] 网页在线版试玩
- [x] 完整强化学习训练样例
- [x] 结合 Stochastic MuZero 的最强 1024 游戏智能体
- [ ] 提供可供本地试玩的模型权重
- [ ] 设计更有趣的人机对抗算法

# 致谢
- JS 前端部分主要基于 https://github.com/xwjdsh/2048-ai 进行魔改，请大家也多多支持这个 repo 


# License
DI-1024 is released under the Apache 2.0 license.
