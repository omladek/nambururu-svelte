<script lang="ts">
  import Link from '../lib/components/Link.svelte'
  import parseStorage from '../lib/utilities/parseStorage'
  import Storage from '../lib/constants/storage'
</script>

<main class="main">
  <h1 class="title">Settings</h1>
  <div class="block">
    <ul>
      <li>
        <Link href="/nambururu-svelte/#/lists/">My lists</Link> (
        {parseStorage('lists').length})
      </li>
      <li>
        <Link href="/nambururu-svelte/#/blocked-subreddits/"
          >Blocked subreddits</Link
        >
        ({parseStorage(Storage.BLOCKED_SUBREDDITS).length})
      </li>
      <li>
        <Link href="/nambururu-svelte/#/blocked-title-keywords/">
          Blocked title keywords
        </Link>
        ({parseStorage(Storage.BLOCKED_TITLE_KEYWORDS).length})
      </li>
    </ul>
  </div>
</main>
