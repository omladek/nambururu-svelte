<style lang="postcss">
  .list {
    contain-intrinsic-size: 1px 5000px;
    content-visibility: auto;
    display: grid;
    gap: var(--gutter);
  }

  @media (min-width: 40em) {
    .list {
      grid-template-columns: repeat(auto-fill, minmax(25em, 1fr));
      padding-inline: var(--gutter);
    }
  }

  .load-more-area {
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 20em;
    text-align: center;
  }

  .load-more-area.done {
    grid-column: 1 / -1;
  }

  .message {
    align-items: center;
    display: grid;
    justify-content: center;
    min-height: 50vh;
    padding-inline: var(--gutter);
  }

  .end {
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: 5rem;
    text-align: center;
  }
</style>

<!-- @hmr:keep-all -->

<script lang="ts">
  import { querystring } from 'svelte-spa-router'
  import { createInfiniteQuery } from '@tanstack/svelte-query'
  import IntersectionObserver from 'svelte-intersection-observer'

  import getSubreddit from '../utilities/getSubreddit'
  import Loader from './Loader.svelte'
  import Post from './Post.svelte'
  import transformListData from '../utilities/transformListData'
  import parseSubredditFromURL from '../utilities/parseSubredditFromURL'
  import parseSortFromURL from '../utilities/parseSortFromURL'

  $: subreddit = parseSubredditFromURL($querystring)
  $: sort = parseSortFromURL($querystring)

  let element: HTMLDivElement

  const lazyLoadingLimit = window.matchMedia('(min-width: 40em)').matches
    ? 4
    : 1

  const postsPerPage = lazyLoadingLimit * 2

  $: query = createInfiniteQuery({
    queryKey: ['subreddit', subreddit, sort],
    queryFn: getSubreddit,
    getNextPageParam: (lastPage) => lastPage.after || undefined,
    select: transformListData,
    enabled: !!subreddit,
  })

  $: posts = $query?.data?.pages || []
  $: postsTotal = posts.length

  $: visiblePostsLimit = postsPerPage

  $: visiblePosts = posts.slice(0, visiblePostsLimit)

  $: {
    if (subreddit) {
      visiblePostsLimit = postsPerPage
    }
  }

  $: {
    if (sort) {
      visiblePostsLimit = postsPerPage
    }
  }
</script>

{#if $query.isLoading}
  <Loader isFullScreen />
{:else if $query.isError}
  <div class="message" role="alert">
    <p>
      An error has occurred:
      {#if $query.error instanceof Error}
        <span>{$query.error.message}</span>
      {/if}
    </p>
  </div>
{:else if $query.isSuccess}
  {#if $query.data.pages.length}
    <div class="list">
      {#each visiblePosts as post, postIndex (post.id)}
        <Post
          post="{post}"
          mediaLoading="{postIndex + 1 <= lazyLoadingLimit ? 'eager' : 'lazy'}"
        />
      {/each}

      <IntersectionObserver
        element="{element}"
        on:observe="{({ detail }) => {
          if (detail.isIntersecting && visiblePostsLimit < postsTotal) {
            const next = visiblePostsLimit + postsPerPage

            if (next >= postsTotal) {
              visiblePostsLimit = postsTotal
            } else {
              visiblePostsLimit = next
            }
          } else if (
            detail.isIntersecting &&
            visiblePostsLimit === postsTotal &&
            !$query.isFetchingNextPage &&
            $query.hasNextPage
          ) {
            $query.fetchNextPage()
          }
        }}"
      >
        <div class="load-more-area" bind:this="{element}">
          {#if $query.hasNextPage}
            {#if $query.isFetchingNextPage}
              <Loader />
            {/if}
          {:else}
            <div class="end">
              <p>That&apos;s all</p>
            </div>
          {/if}
        </div>
      </IntersectionObserver>
    </div>
  {:else}
    <div class="message" role="alert">
      <p>No results.</p>
    </div>
  {/if}
{/if}
