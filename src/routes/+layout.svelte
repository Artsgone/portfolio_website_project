<script>
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';

  const GA_ID = 'G-BL8ZL12VTN';

  onMount(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };

    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { page_path: window.location.pathname });
  });

  afterNavigate(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', GA_ID, { page_path: window.location.pathname });
    }
  });
</script>

<slot />