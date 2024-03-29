---
title: kind=password-register
---

## POST users/{user}?kind=password-register

通过用户名和密码注册一个用户。

例如：

```
POST users/xieyuheng?kind=password-register

{
  "password": "123456",
  "data": {
    "username": "xieyuheng",
    "name": "Xie Yuheng"
  }
}
```

请求成功后，会创建如下数据文件：

```
users/xieyuheng/index.json
users/xieyuheng/.password/index.json
users/xieyuheng/.token-issuer/index.json
```

`users/xieyuheng/index.json`
是用请求中的 `data` 属性初始化的用户数据：

```
{
  "username": "xieyuheng",
  "name": "Xie Yuheng",
  "@path": "users/xieyuheng",
  "@revision": "1b0d4dc0b6e68853aa0005b03c059a47",
  "@createdAt": 1681389842021,
  "@updatedAt": 1681389842021
}
```

`users/xieyuheng/.password/index.json`
是用 [brcryt](https://en.wikipedia.org/wiki/Bcrypt) 安全地保存的密码：

```
{
  "hash": "$2b$10$HpzyzH0jUr/h5H27Z9F4mew9ijI6cbPldhH9OYJOXqXK.O.qxuKfW",
  "@path": "users/xieyuheng/.password",
  "@revision": "ae937631eeec83a8edd2cbd381763274",
  "@createdAt": 1681389842021,
  "@updatedAt": 1681389842021
}
```

`users/xieyuheng/.token-issuer/index.json`
记录这个用户的用户名与所在的用户组：

```
{
  "user": "xieyuheng",
  "groups": [ "user" ],
  "@path": "users/xieyuheng/.token-issuer",
  "@revision": "66937631eeec83a8edd2cbd381763274",
  "@createdAt": 1681389842021,
  "@updatedAt": 1681389842021
}
```
