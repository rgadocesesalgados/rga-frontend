import { AuthProvider } from './Authcontext'
import { ProviderAddress } from './dataContexts/addressContext'
import { ProviderCategorys } from './dataContexts/categorysContext'
import { ProviderClient } from './dataContexts/clientesContext'
import { ProviderOrders } from './dataContexts/ordersContext'
import { ProviderProduct } from './dataContexts/productsContext'
import { ProviderRecheios } from './dataContexts/recheios'
import { ProviderCakeDelete } from './delete-cake'
import { ProviderModal } from './modal'
import { ProviderView } from './view'

export const ProvidersContext = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthProvider>
        <ProviderCategorys>
          <ProviderClient>
            <ProviderAddress>
              <ProviderOrders>
                <ProviderRecheios>
                  <ProviderProduct>
                    <ProviderModal>
                      <ProviderView>
                        <ProviderCakeDelete>{children}</ProviderCakeDelete>
                      </ProviderView>
                    </ProviderModal>
                  </ProviderProduct>
                </ProviderRecheios>
              </ProviderOrders>
            </ProviderAddress>
          </ProviderClient>
        </ProviderCategorys>
      </AuthProvider>
    </>
  )
}
