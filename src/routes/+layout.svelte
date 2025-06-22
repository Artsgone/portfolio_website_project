<script>
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';

  const GA_ID = 'G-BL8ZL12VTN';

  onMount(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=G-BL8ZL12VTN`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_ID, { page_path: window.location.pathname });

    afterNavigate(() => {
      gtag('config', GA_ID, { page_path: window.location.pathname });
    });
  });
</script>

<slot />