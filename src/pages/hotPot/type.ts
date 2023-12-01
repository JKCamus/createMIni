export enum MenuType {
  Meat = '肉类',
  Beef = '牛肉',
  Seafood = '河海鲜',
  Vegetables = '蔬菜',
  BeanProducts = '豆制品',
  Mushrooms = '菌菇',
  StapleFood = '主食',
  CustomHistory = '曾经'
}


export interface List {
  food: string
  time: number
}

export type CookingItem = List & {
  id: number
  completedAt?: number
}

export interface MenuList {
  type: MenuType
  list: List[]
}

export interface ShowFunctionParams {
  message: string
  type: 'error' | 'success'
}

export interface UToastType {
  show: (params: ShowFunctionParams) => void
}

export  const  menuListData= [
  {
    type: MenuType.Meat,
    list: [
      { food: '鸭血', time: 6 * 60 },
      { food: '黄喉', time: 1 * 60 },
      { food: '肥牛', time: 20 },
      { food: '毛肚', time: 15 },
      { food: '鸭肠', time: 20 },
      { food: '鲜切牛肉', time: 30 },
      { food: '千层毛肚', time: 3 * 60 },
      { food: '鹌鹑蛋', time: 3 * 60 }
    ]
  },
  {
    type: MenuType.Beef,
    list: [
      { food: '嫩牛', time: 10 },
      { food: '三花趾', time: 10 },
      { food: '五花趾', time: 10 },
      { food: '匙柄', time: 8 },
      { food: '匙仁', time: 8 },
      { food: '脖仁', time: 10 },
      { food: '吊龙伴', time: 8 },
      { food: '吊龙', time: 8 },
      { food: '肥胼', time: 12 },
      { food: '胸口油', time: 2 * 60 },
      { food: '牛舌', time: 10 },
      { food: '牛百叶', time: 8 },
      { food: '手锤牛肉丸', time: 10 * 60 }
    ]
  },
  {
    type: MenuType.Seafood,
    list: [
      { food: '虾滑', time: 3 * 60 },
      { food: '巴沙鱼片', time: 3 * 60 },
      { food: '鲜虾', time: 3 * 60 }
    ]
  },
  {
    type: MenuType.Vegetables,
    list: [
      { food: '娃娃菜', time: 2 * 60 },
      { food: '菠菜', time: 30 },
      { food: '冬瓜', time: 3 * 60 },
      { food: '山药', time: 3 * 60 }
    ]
  },
  {
    type: MenuType.CustomHistory,
    list: []
  }
]