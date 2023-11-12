'use client'

import { persistStore } from 'redux-persist'
import { store } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

export function Providers({ children }: { children: React.ReactNode }) {
    let persister = persistStore(store)
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persister}>
                {children}
            </PersistGate>
        </Provider>
    )
}
