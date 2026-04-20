const generateUsername = () => {
  const usernamePrefix = 'user-';
  const randomChars = Match.random().toString(36).slice(2);
  const username = usernamePrefix + randomChars;
  return username;
};

const generateSlug = (title) => {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]\s-/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  const randomChars = Math.random().toString(36).slice(2);
  const uniqueSlug = `${slug}-${randomChars}`;

  return uniqueSlug;
};

export { generateSlug, generateUsername };
