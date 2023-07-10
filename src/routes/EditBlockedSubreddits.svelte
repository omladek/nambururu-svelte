<script lang="ts">
  import type { FormEventHandler } from 'svelte/elements'

  import Storage from '../lib/constants/storage'
  import getDefaultValue from '../lib/utilities/getDefaultValue'
  import Tags from '../lib/components/Tags.svelte'
  import Search from '../lib/components/Search.svelte'

  const formId = 'editBlockedSubreddits'
  let isSaved = false

  $: myBlockedSubreddits = getDefaultValue(Storage.BLOCKED_SUBREDDITS)

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    event,
  ): Promise<void> => {
    event.preventDefault()

    isSaved = false

    const entries = [...new FormData(event.currentTarget).entries()]

    entries.forEach(([key, value]) => {
      localStorage.setItem(key, value.toString())
    })

    await new Promise((resolve) => {
      setTimeout(() => resolve(undefined), 500)
    })

    isSaved = true
  }

  $: selectedTag = ''

  $: {
    if (selectedTag && selectedTag !== '') {
      myBlockedSubreddits = myBlockedSubreddits
        .split(',')
        .filter(Boolean)
        .filter((tag) => tag !== selectedTag)
        .join(',')
    }
  }

  let search = ''

  $: {
    if (search && search !== '') {
      myBlockedSubreddits = [
        ...myBlockedSubreddits.split(',').filter(Boolean),
        search,
      ].join(',')
    }
  }
</script>

<main class="main">
  <h1 class="title">Blocked subreddits</h1>
  <div class="block">
    <form action="" id="{formId}" method="GET" on:submit="{handleSubmit}">
      <fieldset>
        <label for="{Storage.BLOCKED_SUBREDDITS}"> blocked subreddits </label>
        <p>
          comma separated subreddit names which should not be shown in the
          best/top/hot list(s)
        </p>
        <textarea
          id="{Storage.BLOCKED_SUBREDDITS}"
          name="{Storage.BLOCKED_SUBREDDITS}"
          on:change="{(event) => {
            myBlockedSubreddits = event.currentTarget.value
            isSaved = false
          }}"
          value="{myBlockedSubreddits}"></textarea>
        <Tags bind:selectedTag="{selectedTag}" value="{myBlockedSubreddits}" />
      </fieldset>
    </form>

    <Search id="{Storage.BLOCKED_SUBREDDITS}" bind:search="{search}" />

    <button class="btn" form="{formId}" type="submit"> Save </button>
    {#if isSaved}
      <p>Changes were saved.</p>
    {/if}
  </div>
</main>
