<script lang='typescript'>
	import {onMount} from 'svelte';
	import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg';

        const ffmpeg = createFFmpeg({
            corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',
            log: true, 
        });
        onMount(async()=> {
            await ffmpeg.load();
        });

</script>
  
<style>

</style>

  
