<style lang="postcss">
  .search__group {
    display: flex;

    & input ~ .btn {
      border-inline-start: 0;
    }
  }
</style>

<script lang="ts">
  import debounce from 'lodash.debounce'
  import type { FormEventHandler } from 'svelte/elements'
  import { createQuery } from '@tanstack/svelte-query'

  import Loader from './Loader.svelte'
  import getSanitizedString from '../utilities/getSanitizedString'

  export let search: string
  export let id: string

  let subreddit: string

  interface RedditNameResponse {
    names: string[]
  }

  const inputId = `search-${id}`
  const listId = `list-${inputId}`

  $: query = createQuery<
    RedditNameResponse,
    { message: string; reason?: string }
  >({
    queryKey: ['subreddit-search', id, subreddit],
    queryFn: ({ signal }) =>
      fetch(
        `https://www.reddit.com/api/search_reddit_names.json?query=${subreddit}`,
        { signal },
      ).then((response) => response.json()),
    enabled: !!subreddit,
  })

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    const nextSubredit = getSanitizedString(
      (new FormData(event.currentTarget).get(inputId)?.toString() || '').trim(),
    )

    if (!nextSubredit) {
      return
    }

    search = nextSubredit
  }

  const handleInput = debounce<FormEventHandler<HTMLInputElement>>((event) => {
    const value = getSanitizedString(event.currentTarget.value.trim())

    if (value.length < 3) {
      return
    }

    subreddit = value
  }, 300)
</script>

<form action="" class="search" method="GET" on:submit="{handleSearchSubmit}">
  <fieldset>
    <label for="{inputId}">search</label>
    <div class="search__group">
      <input
        autoComplete="off"
        id="{inputId}"
        list="{listId}"
        maxLength="{38}"
        name="{inputId}"
        on:input="{handleInput}"
        pattern="[a-zA-Z0-9_\-]+"
        placeholder="search subreddit"
        required
        type="search"
      />
      <datalist id="{listId}">
        {#if $query?.data?.names?.length}
          {#each $query.data.names as option (option)}
            <option value="{option}">
              {option}
            </option>
          {/each}
        {/if}
      </datalist>
      <button
        class="{$query.isLoading && $query.isInitialLoading
          ? 'btn is-loading'
          : 'btn'}"
        type="submit"
      >
        {#if $query.isLoading && $query.isInitialLoading}
          <Loader size="xs" />
        {/if}
        <span class="btn__text">🔍</span>
      </button>
    </div>
  </fieldset>
</form>
