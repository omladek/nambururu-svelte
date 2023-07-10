<!-- @hmr:keep-all -->

<script lang="ts">
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
  import Router from 'svelte-spa-router'
  import { wrap } from 'svelte-spa-router/wrap'

  import Home from './routes/Home.svelte'
  import PageLoader from './lib/components/PageLoader.svelte'
  import Header from './lib/components/Header.svelte'

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  })

  const routes = {
    '/settings': wrap({
      asyncComponent: () => import('./routes/Settings.svelte'),
      loadingComponent: PageLoader,
    }),
    '/lists': wrap({
      asyncComponent: () => import('./routes/Lists.svelte'),
      loadingComponent: PageLoader,
    }),
    '/edit/:list?': wrap({
      asyncComponent: () => import('./routes/EditList.svelte'),
      loadingComponent: PageLoader,
    }),
    '/blocked-title-keywords': wrap({
      asyncComponent: () => import('./routes/EditBlockedTitleKeywords.svelte'),
      loadingComponent: PageLoader,
    }),
    '/blocked-subreddits': wrap({
      asyncComponent: () => import('./routes/EditBlockedSubreddits.svelte'),
      loadingComponent: PageLoader,
    }),
    '/:subreddit?/:sort?': Home,
  }
</script>

<QueryClientProvider client="{queryClient}">
  <Header />
  <Router routes="{routes}" />
</QueryClientProvider>
