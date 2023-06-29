/*
 * @Author: nextc 1391040917@qq.com
 * @Date: 2023-06-16 22:15:13
 * @LastEditors: nextc 1391040917@qq.com
 * @LastEditTime: 2023-06-16 23:36:03
 * @FilePath: \table_pro\src\utils\test\index.test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { debounce } from '@/utils/debounce.js'
import { vi, describe, expect, test } from 'vitest'

describe('debounce', () => {
  vi.useFakeTimers() // 使用 vi 提供的 fake timers

  test('应该在指定的持续时间后调用函数', () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 300)

    debouncedFn()
    expect(mockFn).not.toBeCalled()

    // 快进时间
    vi.advanceTimersByTime(300)

    expect(mockFn).toBeCalled()
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  test('应该将参数传递给防抖函数', () => {
    const mockFn = vi.fn()
    const debouncedFn = debounce(mockFn, 300)

    debouncedFn(1, 'hello', true)
    expect(mockFn).not.toBeCalled()

    vi.advanceTimersByTime(300)

    expect(mockFn).toBeCalledWith(1, 'hello', true)
  })

  test('在指定的时间段内多次调用时应该重置计时器', () => {
    const mockFn = vi.fn() // 创建一个模拟函数

    const debouncedFn = debounce(mockFn, 500) // 使用防抖函数包装模拟函数

    // 第一次调用
    debouncedFn()
    expect(mockFn).not.toBeCalled() // 模拟函数不应该被立即调用

    // 快进时间到499ms
    vi.advanceTimersByTime(499)
    debouncedFn()
    expect(mockFn).not.toBeCalled() // 模拟函数不应该被调用

    // 快进时间到500ms
    vi.advanceTimersByTime(500)
    expect(mockFn).toHaveBeenCalledTimes(1) // 模拟函数应该被调用一次

    // 第二次调用
    debouncedFn()
    expect(mockFn).toHaveBeenCalledTimes(1) // 模拟函数不应该被立即调用

    // 快进时间到999ms
    vi.advanceTimersByTime(499)
    debouncedFn()
    expect(mockFn).toHaveBeenCalledTimes(1) // 模拟函数不应该被调用

    // 快进时间到1000ms
    vi.advanceTimersByTime(500)
    expect(mockFn).toHaveBeenCalledTimes(2) // 模拟函数应该被调用两次
  })
})
