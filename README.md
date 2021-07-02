# 井字棋

该项目是在React官网的[示例项目](https://react.docschina.org/tutorial/tutorial.html)，在其基础上做了一点小改进


## 改进

- [x] 在游戏历史记录列表显示每一步棋的坐标，格式为 (列号, 行号)
- [x] 在历史记录列表中加粗显示当前选择的项目
- [ ] 使用两个循环来渲染出棋盘的格子，而不是在代码里写死（hardcode）
- [ ] 添加一个可以升序或降序显示历史记录的按钮
- [ ] 每当有人获胜时，高亮显示连成一线的 3 颗棋子
- [x] 当无人获胜时，显示一个平局的消息
- [ ] 优化UI

## 运行

执行 `npm start` 命令后在[http://localhost:3000](http://localhost:3000)查看效果