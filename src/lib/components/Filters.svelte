<style lang="postcss">
  .filters {
    background-color: var(--color-background);
    display: grid;
    gap: 0;
    grid-template-columns: 65% repeat(2, 1fr);
    width: 100%;

    & fieldset {
      border: 0;
      margin: 0;
      padding: 0;
    }
  }

  @media (max-width: 40em) {
    :global(.filters form + form:not(:last-child)) {
      border-inline-end: 1px solid var(--color-accent);
    }

    :global(.filters fieldset) {
      position: relative;
    }

    :global(.filters form:not(.search) label) {
      align-items: center;
      appearance: none;
      background-color: var(--color-post);
      border-block-start: 1px solid var(--color-accent);
      color: var(--color-link);
      display: inline-block;
      font-family: inherit;
      font-size: 0.8rem;
      font-weight: 500;
      height: var(--form-element-height);
      left: 0;
      margin: 0;
      padding: 0.75em 1.5em;
      pointer-events: none;
      position: absolute;
      text-align: center;
      text-decoration: none;
      top: 0;
      width: 100%;
      z-index: 1;
    }

    :global(.filters select) {
      opacity: 0;
    }

    :global(.filters .search input) {
      border-block-end: 0;
      border-inline-start: 0;
    }

    :global(.filters .search .btn) {
      border-block-end: 0;
    }

    :global(.filters .search label) {
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      height: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }
  }

  @media (min-width: 40em) {
    .filters {
      border-block-start: 1px solid var(--color-accent);
      gap: var(--gutter);
      grid-template-columns: repeat(3, minmax(auto, 20em));
      padding-block: calc(var(--gutter) / 2);
      padding-inline: var(--gutter);

      & fieldset {
        align-items: center;
        display: flex;
        gap: var(--gutter);
        justify-content: flex-start;

        & input,
        & select,
        & .search__group {
          width: 100%;
        }
      }
    }
  }
</style>

<!-- @hmr:keep-all -->

<script lang="ts">
  import { push, querystring } from 'svelte-spa-router'

  import Nav from './Nav.svelte'
  import Sort from './Sort.svelte'
  import Search from './Search.svelte'
  import parseSortFromURL from '../utilities/parseSortFromURL'
  import parseSubredditFromURL from '../utilities/parseSubredditFromURL'

  $: subreddit = parseSubredditFromURL($querystring)
  $: sort = parseSortFromURL($querystring)

  let search = ''

  $: {
    if (search && search !== '') {
      push(`/?subreddit=${search}&sort=best`)
    }
  }

  $: {
    if (subreddit && subreddit !== '') {
      push(`/?subreddit=${subreddit}&sort=${parseSortFromURL($querystring)}`)
    }
  }

  $: {
    if (sort) {
      push(`/?subreddit=${parseSubredditFromURL($querystring)}&sort=${sort}`)
    }
  }
</script>

<footer class="filters">
  <Search bind:search="{search}" id="suggestions" />
  <Nav bind:value="{subreddit}" />
  <Sort bind:value="{sort}" />
</footer>
