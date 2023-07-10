<!-- @hmr:keep-all -->

<script lang="ts">
  import { querystring, location, replace } from 'svelte-spa-router'

  import List from '../lib/components/List.svelte'
  import Filters from '../lib/components/Filters.svelte'
  import parseSubredditFromURL from '../lib/utilities/parseSubredditFromURL'
  import parseSortFromURL from '../lib/utilities/parseSortFromURL'
  import parseStorage from '../lib/utilities/parseStorage'
  import basicSubreddits from '../lib/constants/basicSubreddits'

  $: selectedSubreddit = parseSubredditFromURL($querystring)
  $: selectedSort = parseSortFromURL($querystring)

  $: {
    if ((!selectedSubreddit || selectedSubreddit == '') && $location === '/') {
      const subredditFallback = parseStorage('lists')[0] || basicSubreddits[0]
      replace(`/?subreddit=${subredditFallback}&sort=best`)
    }
  }
</script>

<main class="main">
  <h1 class="title">
    {selectedSubreddit} ({selectedSort})
  </h1>
  <List />
</main>
<Filters />
