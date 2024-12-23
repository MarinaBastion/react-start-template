/**
 * Здесь код с ошибками типов. Нужно их устранить
 * */

// // Мы это не проходили, но по тексту ошибки можно понять, как это починить
export interface IFakeApiResponse {
    userId: number
    id: number
    title: string
    completed: boolean
}
export const getFakeApi = async (): Promise<IFakeApiResponse> => {
    const result: IFakeApiResponse = await fetch(
        'https://jsonplaceholder.typicode.com/todos/1'
    ).then((response) => response.json())
    return result
    console.log(result)
}

// // Мы это не проходили, но по тексту ошибки можно понять, как это починить
export class SomeClass {
    set: Set<number>
    channel: BroadcastChannel
    constructor() {
        this.set = new Set([1])
        this.channel = new BroadcastChannel('test-broadcast-channel')
    }
}
//
export type Data = {
    type: 'Money' | 'Percent'
    value: DataValue
}
//
export type DataValue = Money | Percent

export type Money = {
    currency: string
    amount: number
}

export type Percent = {
    percent: number
}

export const isMoney = (dataValue: Money | Percent): dataValue is Money =>
    'amount' in dataValue

// Здесь, возможно, нужно использовать as, возможно в switch передавать немного по-другому
const getDataAmount = (data: Data): number => {
    switch (data.type) {
        case 'Money': {
            if (isMoney(data.value)) {
                return data.value.amount
            } else {
                return data.value.percent
            }
        }
        case 'Percent': {
            if (!isMoney(data.value)) {
                return data.value.percent
            } else {
                return data.value.amount
            }
        }

        default: {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const unhandled: never = data.type // здесь, возможно, нужно использовать нечто другое. :never должен остаться
            throw new Error(`unknown type: ${unhandled}`)
        }
    }
}
