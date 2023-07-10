<script lang="ts">
  export let size: 'xs' | 'md' | 'lg' = 'lg'
  export let isFullScreen = false

  const classNames = [
    'loader',
    `loader--${size}`,
    isFullScreen && 'loader--fullscreen',
  ]
    .filter(Boolean)
    .join(' ')
</script>

<span class="{classNames}">loading&hellip;</span>
