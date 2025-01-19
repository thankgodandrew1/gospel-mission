import slugify from 'slugify';
import Post from ' @/models/Post'; // Adjust the path based on your project structure

export const generateUniqueSlug = async (title: string): Promise<string> => {
  const baseSlug = slugify(title, { lower: true, strict: true });
  let uniqueSlug = baseSlug;
  let count = 1;

  // Check for existing slugs in the database
  while (await Post.exists({ slug: uniqueSlug })) {
    uniqueSlug = `${baseSlug}-${count}`;
    count++;
  }

  return uniqueSlug;
};
