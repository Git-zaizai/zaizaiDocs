# axios

## http 原生错误判断

```js
if (error.message.includes('code 401')) {
  window.$message.warning('无权限 : 401' + error.response.data);
  return Promise.reject(error);
}

if (error?.response?.status === 404) {
  window.$message.error('404 ' + error.response.data);
}

if (error.message.includes('Network Error')) {
  window.$message.error('意外错误！(￣３￣)  ' + error.response.data);
}

if (error.message.includes('ERR_NETWORK')) {
  window.$message.error('无法连接后台，意外错误！ ' + error.response.data);
}

if (error.message.includes('timeout')) {
  // 判断请求异常信息中是否含有超时timeout字符串
  window.$message.error('网络超时！ ' + error.response.data);
}
if (error.message.includes('code 500')) {
  window.$message.error('http:返回码 500 (￣３￣)  ' + error.response.data);
}
```
