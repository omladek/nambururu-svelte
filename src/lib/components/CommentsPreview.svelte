<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query'
  import Comment from './Comment.svelte'
  import Loader from './Loader.svelte'
  import getCommentsPreview from '../utilities/getCommentsPreview'

  export let id: string

  let showComments = false

  $: query = createQuery({
    queryKey: ['comments', id],
    queryFn: ({ signal }) => getCommentsPreview(id, signal),
    enabled: showComments,
    cacheTime: Infinity,
    staleTime: Infinity,
  })
</script>

{#if !showComments || $query.isLoading}
  <button
    class="{`btn btn--block ${$query.isInitialLoading ? 'is-loading' : ''}`}"
    disabled="{$query.isInitialLoading}"
    on:click="{() => (showComments = true)}"
    type="button"
  >
    {#if $query.isInitialLoading}
      <Loader size="xs" />
    {/if}
    <span class="btn__text">Load comments</span>
  </button>
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
  {#if $query.data.length}
    {#each $query.data as comment (comment.id)}
      <Comment comment="{comment}" />
    {/each}
  {:else}
    <p>No relevant comments.</p>
  {/if}
{/if}
