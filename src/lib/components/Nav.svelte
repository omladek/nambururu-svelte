<script lang="ts">
  import getSubredditsFromUserLists from '../utilities/getSubredditsFromUserLists'
  import parseStorage from '../utilities/parseStorage'

  const userLists = parseStorage('lists') || []
  const subreddits = getSubredditsFromUserLists(userLists)

  export let value: string
</script>

<form action="" method="GET">
  <fieldset>
    <label for="subreddit-select">r/</label>
    <select
      id="subreddit-select"
      name="subreddit-select"
      value="{value}"
      on:change="{({ currentTarget }) => (value = currentTarget.value)}"
    >
      <option disabled>choose</option>
      {#if userLists.length}
        <optgroup label="my lists">
          {#each userLists as userList (userList)}
            <option value="{userList}">
              {userList}
            </option>
          {/each}
        </optgroup>
      {/if}

      {#if subreddits.length}
        <optgroup label="subreddits">
          {#each subreddits as subreddit (subreddit)}
            <option value="{subreddit}">
              {subreddit}
            </option>
          {/each}
        </optgroup>
      {/if}
    </select>
  </fieldset>
</form>
