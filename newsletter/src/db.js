import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

export const findNewsletter = async (context, id) => {
  const newsletter = await context.database('newsletters')
    .where({ id })
    .first();
  
  return newsletter;
};

export const buildEmailData = async (context, newsletter) => {
  const posts = await context.database('posts')
    .where({ newsletter: newsletter.id })
    .orderBy('order_in_newsletter')
    .select();
  
  return {
    title: newsletter.title,
    intro: md.render(newsletter.intro),
    posts: posts.map(post => ({
      url: `https://cynickehyeny.cz/posts/${post.id}`,
      title: post.title,
      image: `https://backoffice.cynickehyeny.cz/assets/${post.image}`,
      lead: md.render(post.lead),
      body: md.render(post.body),
    })),
  };
};

export const markAsSent = async (context, id) => {
  await context.database('newsletters')
    .where({ id })
    .update({ published: true });
};

export const getAllSubscribers = async (context) => context.database('subscribers').select();

export const getTestSubscribers = async (context, id) => context
  .database('newsletters_subscribers')
  .innerJoin('subscribers', 'newsletters_subscribers.subscribers_id', 'subscribers.id')
  .where('newsletters_id', id);
