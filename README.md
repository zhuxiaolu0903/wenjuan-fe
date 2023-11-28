# 项目启动
npm start
# 项目打包
npm run build
# 检查语法
npm run lint
# 格式化
npm run format
# git 提交
git commint -m "[commit-subject]: xxx"
commit-subject:
+ 'build'
+ 'chore'
+ 'ci'
+ 'docs'
+ 'feat'
+ 'fix'
+ 'perf'
+ 'refactor'
+ 'revert'
+ 'style'
+ 'test'

# 技能点
redux-persist 实现持久化存储
react-redux 

# 问题集锦
1. ```控制台报错：A non-serializable value was detected in an action...```
在创建store的参数中增加下方代码：
```javascript
middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
        serializableCheck: false
    })
]
```
2. ```ts报错：Argument of type 'AsyncThunkAction' is not assignable to parameter of type 'AnyAction'```
解决办法：
> 用getDefaultMiddleware().concat而不是[...getDefaultMiddleware(),...]
```javascript
const store = configureStore ({
    reducer:rootReducer,
    // 不要用展开运算符这种写法 middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog, changeLanguage],
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(actionLog,changeLanguage), 
    devTools:true
});
```