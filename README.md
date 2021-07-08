# 井字棋

该项目是在React官网的[示例项目](https://react.docschina.org/tutorial/tutorial.html)，在其基础上做了一点小改进


## 改进

- [x] 在游戏历史记录列表显示每一步棋的坐标，格式为 (列号, 行号)
- [x] 在历史记录列表中加粗显示当前选择的项目
- [x] 使用两个循环来渲染出棋盘的格子，而不是在代码里写死（hardcode）
- [x] 添加一个可以升序或降序显示历史记录的按钮
- [x] 每当有人获胜时，高亮显示连成一线的 3 颗棋子
- [x] 当无人获胜时，显示一个平局的消息
- [x] 优化UI

## 运行

先执行 `npm install` 安装依赖，再执行 `npm start` 后在 [http://localhost:3000](http://localhost:3000) 查看效果

## 修复的bug记录

- 胜利后状态显示错误

    这里是因为修改了 calculateWinner 函数的返回而在界面显示的地方没有做对应改动。

- 点击 Go to step 按钮高亮棋子样式还存在

- 点击 Go to step 按钮无法显示三连棋高亮

    这里是因为悔棋后想再跳回之前胜利的步骤而出错。这个原因很简单，只是因为我在 jumpTo 方法中拿 history 数组时使用了 slice，其实直接获取整个 state 中的 history 数组就行了，既可以跳回过去又能跳到未来。
