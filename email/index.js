import Twig from 'twig';
import EmailBuilder from 'email-builder-core';

const emailBuilder = new EmailBuilder();
emailBuilder.inlineCss('./mail.twig')
  .then(function(html) {
    console.log(html.toString());
  });

// const data = {
//   title: 'První nový hyení newsletter',
//   posts: [
//     {
//       url: 'https://cynickehyeny.cz/posts/31c47288-f211-49ea-b332-faa193a88a6c',
//       title: 'Vláda opět rozhodla o kroku, který nikoho nezajímá',
//       image: 'https://backoffice.cynickehyeny.cz/assets/48dbf7c2-fd3a-4b6e-929b-9b5b0d9b4ac3',
//       lead: 'Vláda se opět rozhodla učinit krok, který má pouze symbolický význam a na který nikdo nečekal. Tento krok je zcela zbytečný a pouze zbytečně zatěžuje veřejné finance, a navíc nijak neřeší skutečné problémy, kterými se naše společnost potýká.',
//     },
//     {
//       url: 'https://cynickehyeny.cz/posts/31c47288-f211-49ea-b332-faa193a88a6c',
//       title: 'Vláda opět rozhodla o kroku, který nikoho nezajímá',
//       image: 'https://backoffice.cynickehyeny.cz/assets/48dbf7c2-fd3a-4b6e-929b-9b5b0d9b4ac3',
//       lead: 'Vláda se opět rozhodla učinit krok, který má pouze symbolický význam a na který nikdo nečekal. Tento krok je zcela zbytečný a pouze zbytečně zatěžuje veřejné finance, a navíc nijak neřeší skutečné problémy, kterými se naše společnost potýká.',
//     },
//   ],
// }

// Twig.renderFile('./mail.twig', data, (err, html) => {
//   console.log(html);
// });