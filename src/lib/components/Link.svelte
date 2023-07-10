<script lang="ts">
  import { push, location } from 'svelte-spa-router'
  import type { MouseEventHandler } from 'svelte/elements'

  export let className = ''
  export let activeClassName = ''
  export let href: string

  const baseUrl = href.replace('/nambururu-svelte/#/', '/')

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault()

    push(baseUrl)
  }
</script>

<a
  href="{href}"
  class="{`${className} ${baseUrl === $location && activeClassName}`}"
  on:click="{handleClick}"
>
  <slot />
</a>
