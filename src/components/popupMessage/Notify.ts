import { MessagePopup } from './popupMessage.vue'

interface NotifyOptions extends Partial<MessagePopup> {
  selector?: string
}

const defaultOptions: NotifyOptions = {
  selector: '#message-popup'
}

class Notify {
  private static parseOptions(message: string | NotifyOptions): NotifyOptions {
    if (message == null) {
      return {}
    }
    return typeof message === 'string' ? { message } : message
  }

  private static getContext(): any {
    const pages = getCurrentPages()
    return pages[pages.length - 1]
  }

  public notify(options: string | NotifyOptions) {
    options = {
      ...defaultOptions,
      ...Notify.parseOptions(options)
    }

    const context = Notify.getContext()
    // 获取实例 vue3 需要添加$vm
    const notify = context.selectComponent(options.selector).$vm
    delete options.selector

    if (notify) {
      notify.showMessagePopup(options)
      return notify
    }
    console.warn(
      '未找到 message-popup 节点，请确认 selector 及 context 是否正确'
    )
  }
}

export default new Notify().notify
