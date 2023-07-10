<script lang="ts">
  import { querystring } from 'svelte-spa-router'
  import type { FormEventHandler } from 'svelte/elements'

  import getDefaultValue from '../lib/utilities/getDefaultValue'
  import Tags from '../lib/components/Tags.svelte'
  import Search from '../lib/components/Search.svelte'
  import parseListIdFromURL from '../lib/utilities/parseListIdFromURL'

  $: id = parseListIdFromURL($querystring) || 'listId'
  $: formId = `form-${id}`
  $: state = getDefaultValue(id)

  let isSaved = false

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
      state = state
        .split(',')
        .filter(Boolean)
        .filter((tag) => tag !== selectedTag)
        .join(',')
    }
  }

  let search = ''

  $: {
    if (search && search !== '') {
      state = [...state.split(',').filter(Boolean), search].join(',')
    }
  }
</script>

<main class="main">
  <h1 class="title">Edit list</h1>
  <div class="block">
    <form id="{formId}" on:submit="{handleSubmit}">
      <fieldset>
        <label for="{id}">List {id}</label>
        <p>comma separated subreddit names</p>
        <textarea
          id="{id}"
          name="{id}"
          on:change="{(event) => {
            state = event.currentTarget.value
            isSaved = false
          }}"
          required
          value="{state}"></textarea>
        <Tags bind:selectedTag="{selectedTag}" value="{state}" />
      </fieldset>
    </form>

    <Search id="{id}" bind:search="{search}" />

    <button class="btn" form="{formId}" type="submit"> Save </button>

    {#if isSaved}
      <p>Changes were saved.</p>
    {/if}
  </div>
</main>
