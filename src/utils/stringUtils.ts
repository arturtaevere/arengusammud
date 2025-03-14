
/**
 * Get initials from a person's name
 * @param name Full name
 * @returns Uppercase initials
 */
export const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};
