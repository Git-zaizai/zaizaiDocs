import { useStore } from '@/store'
import { useRef } from 'react'

export default () => {
  const { store, setstate, theme, setTheme } = useStore()
  const input = useRef()
  const updateUserName = () => {
    setstate(state => {
      return {
        ...state,
        userInfo: {
          name: input.current.value
        }
      }
    })
  }
  return (
    <>
      <div>
        <h1>用户名：{store.userInfo.name}</h1>
        <input type='text' ref={input} />
        <button onClick={updateUserName}></button>
        <h2>当前主题：{theme === 'ligth' ? '亮色' : '暗色'}</h2>
        <button onClick={() => setTheme('dark')}></button>
      </div>
    </>
  )
}
