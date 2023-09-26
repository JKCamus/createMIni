import { InjectionKey, Ref, ToRefs } from 'vue'

interface UserInfoType {
  userName: string
  userId: number
}


// 提供响应式数据
export type ReadOnlyReactiveUserInfoType = Readonly<UserInfoType>


export type ChangeUserNameType = (val: string) => void

//Vue 提供了一个 InjectionKey 接口，该接口是扩展了 Symbol 的泛型类型。它可用于在生产者和消费者之间同步 inject 值的类型：
export const ReadOnlyReactiveUserInfoKey: InjectionKey<ReadOnlyReactiveUserInfoType> = Symbol()

export const ChangeReadOnlyReactiveUserNameKey: InjectionKey<ChangeUserNameType> = Symbol()


// 写法二

// 提供ref响应式数据，区别在与ref常用于基础类型，需要通过.value去读取和修改数据。
// 对象可以考虑reactive，不需要写.value，但是需要通过toRef转为响应式数据
export type RefUserInfoType = Ref<{
  userName: string
  userId: number
}>

export type ReadOnlyRefUserInfoType=Readonly<RefUserInfoType>

export const ReadOnlyUserInfoKey:InjectionKey<ReadOnlyRefUserInfoType>=Symbol()
export const ChangeReadOnlyUserNameRefKey:InjectionKey<ChangeUserNameType>=Symbol()





