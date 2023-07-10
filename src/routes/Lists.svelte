<style lang="postcss">
  .lists {
    border: 1px solid var(--color-accent);
    table-layout: fixed;

    & th {
      border: 0;
      border-bottom: 1px solid var(--color-accent);
      text-align: left;
    }

    & th,
    & td {
      padding: 0.25em 0.5em;
    }

    & td {
      border: 0;
    }

    & tbody tr {
      border-bottom: 1px solid var(--color-accent);
    }
  }

  .lists:not(:last-child) {
    margin-block-end: var(--gutter);
  }

  .lists__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;

    & .btn {
      flex: 1;
      white-space: nowrap;
      width: 100%;
    }
  }
</style>

<script lang="ts">
  import AddList from '../lib/components/AddList.svelte'
  import Link from '../lib/components/Link.svelte'
  import getSortedList from '../lib/utilities/getSortedList'
  import parseStorage from '../lib/utilities/parseStorage'

  let lists = getSortedList(parseStorage('lists'))

  const getSubredditsTotalByList = (id: string): number => {
    return parseStorage(id).length
  }

  const removeFromLists = (id: string): void => {
    // eslint-disable-next-line no-restricted-globals, no-alert
    const result = confirm('Are you sure?')

    if (!result) {
      return
    }

    const nextLists = lists.filter((list) => list !== id).filter(Boolean)

    localStorage.setItem('lists', nextLists.join(','))

    localStorage.removeItem(id)

    lists = nextLists
  }

  let listId: string

  $: {
    if (listId && listId !== '') {
      const nextLists = getSortedList([...lists, listId])

      localStorage.setItem('lists', nextLists.join(','))

      lists = nextLists
    }
  }
</script>

<main class="main">
  <h1 class="title">My lists</h1>
  <div class="block">
    {#if lists.length}
      <table class="lists">
        <thead>
          <tr>
            <th>title</th>
            <th>subreddits</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {#each lists as list (list)}
            <tr>
              <td>{list}</td>
              <td>{getSubredditsTotalByList(list)}</td>
              <td class="lists__actions">
                <Link
                  className="btn"
                  href="{`/nambururu-svelte/#/edit/?list=${list}`}"
                >
                  edit
                </Link>
                <button
                  class="btn"
                  on:click="{() => removeFromLists(list)}"
                  type="button"
                >
                  delete
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    {:else}
      <p>No lists.</p>
    {/if}

    {#key lists.join('-')}
      <AddList lists="{lists}" bind:listId="{listId}" />
    {/key}
  </div>
</main>
