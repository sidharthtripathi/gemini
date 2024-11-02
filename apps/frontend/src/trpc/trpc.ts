import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type {AppRouter} from '../../../backend/src/index'
const url = import.meta.env.VITE_TRPC_BACKEND_URL
export const client = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url,
    }),
  ],
});