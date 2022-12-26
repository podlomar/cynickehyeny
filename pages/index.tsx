import React from 'react';
import { GetServerSidePropsResult } from 'next';
import clientPromise, { getAllPosts } from '../lib/mongodb';
import PostPreview from '../components/PostPreview';

// const posts = [
//   {
//     slug: 'vlada-opet-rozhodla-o-kroku-ktery-nikoho-nezajima',
//     title: 'Vláda opět rozhodla o kroku, který nikoho nezajímá',
//     lead: 'Vláda se opět rozhodla učinit krok, který má pouze symbolický význam a na který nikdo nečekal. Tento krok je zcela zbytečný a pouze zbytečně zatěžuje veřejné finance, a navíc nijak neřeší skutečné problémy, kterými se naše společnost potýká.',
//   },
//   {
//     slug: 'celebrity-se-zase-nechaly-nachytat-pri-plagiatorstvi',
//     title: 'Celebrity se zase nechaly nachytat při plagiátorství',
//     lead: 'Stejně jako v minulosti se i tentokrát nechaly nachytat celebrity při plagiátorství a vyvolaly tak další skandál. Je to opět důkaz toho, že mnoho celebrit se snaží využít své slávy k tomu, aby dosáhly většího úspěchu a bohatství, aniž by se o to skutečně zasloužily.',
//   },
//   {
//     slug: 'politicke-strany-se-opet-predhaneji-v-nesmyslnych-slibech',
//     title: 'Politické strany se opět předhánějí v nesmyslných slibech',
//     lead: 'Před volbami se politické strany opět předhánějí v nesmyslných slibech, které nemají šanci splnit. Je to smutné, že tito lidé se snaží získat voliče pouze tím, že jim slibují věci, které vědí, že nemohou splnit.',
//   },
//   {
//     slug: 'miliardari-zase-zvysuji-sve-bohatstvi-na-ukor-ostatnich',
//     title: 'Miliardáři zase zvyšují své bohatství na úkor ostatních',
//     lead: 'Miliardáři se opět snaží zvýšit své bohatství na úkor ostatních, a to prostřednictvím různých finančních machinací. Je to smutné, že takoví lidé jsou schopni využívat svého bohatství a moci k tomu, aby dosáhli ještě většího bohatství.',
//   },
//   {
//     slug: 'soudy-opet-rozhodly-ve-prospech-bohatych-a-mocnych',
//     title: 'Soudy opět rozhodly ve prospěch bohatých a mocných',
//     lead: 'Soudy se opět rozhodly ve prospěch bohatých a mocných, a to navzdory faktům a právním předpisům. Je to další důkaz toho, že naše justice není skutečně spravedlivá a že bohatí a mocní jsou schopni ovlivňovat výsledky soudních rozhodnutí ve svůj prospěch.',
//   },
// ];

interface Post {
  slug: string,
  title: string,
  lead: string,
};

interface Props {
  posts: Post[],
}

export const getServerSideProps = async (): Promise<GetServerSidePropsResult<Props>> => {
  const posts = await getAllPosts();
  return {
    props: { posts },
  }
}

const HomePage = ({ posts }: Props): JSX.Element => {
  return (
    <div className="container">
      <img src="banner.svg" className="banner" />
      <h1>Cynické hyeny</h1>
      { posts.map((post) => (
        <PostPreview 
          key={post.slug}
          slug={post.slug}
          title={post.title}
          lead={post.lead} 
        />
      ))}
    </div>
  );
};

export default HomePage;
