import React from 'react';
import Head from 'next/head';
import PostPreview from '../components/PostPreview';

const posts = [
  {
    title: 'Vláda opět rozhodla o kroku, který nikoho nezajímá',
    lead: 'Vláda se opět rozhodla učinit krok, který má pouze symbolický význam a na který nikdo nečekal. Tento krok je zcela zbytečný a pouze zbytečně zatěžuje veřejné finance, a navíc nijak neřeší skutečné problémy, kterými se naše společnost potýká.',
  },
  {
    title: 'Celebrity se zase nechaly nachytat při plagiátorství',
    lead: 'Stejně jako v minulosti se i tentokrát nechaly nachytat celebrity při plagiátorství a vyvolaly tak další skandál. Je to opět důkaz toho, že mnoho celebrit se snaží využít své slávy k tomu, aby dosáhly většího úspěchu a bohatství, aniž by se o to skutečně zasloužily.',
  },
  {
    title: 'Politické strany se opět předhánějí v nesmyslných slibech',
    lead: 'Před volbami se politické strany opět předhánějí v nesmyslných slibech, které nemají šanci splnit. Je to smutné, že tito lidé se snaží získat voliče pouze tím, že jim slibují věci, které vědí, že nemohou splnit.',
  },
  {
    title: 'Miliardáři zase zvyšují své bohatství na úkor ostatních',
    lead: 'Miliardáři se opět snaží zvýšit své bohatství na úkor ostatních, a to prostřednictvím různých finančních machinací. Je to smutné, že takoví lidé jsou schopni využívat svého bohatství a moci k tomu, aby dosáhli ještě většího bohatství.',
  },
  {
    title: 'Soudy opět rozhodly ve prospěch bohatých a mocných',
    lead: 'Soudy se opět rozhodly ve prospěch bohatých a mocných, a to navzdory faktům a právním předpisům. Je to další důkaz toho, že naše justice není skutečně spravedlivá a že bohatí a mocní jsou schopni ovlivňovat výsledky soudních rozhodnutí ve svůj prospěch.',
  },
];

const HomePage = (): JSX.Element => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@200;300&display=swap"
        />
        <title>Cynické hyeny</title>
      </Head>

      <div className="container">
        <div className="banner" />
        <h1>Cynické hyeny</h1>
        { posts.map((post) => <PostPreview title={post.title} lead={post.lead} />) }
      </div>
    </>
  );
};

export default HomePage;
