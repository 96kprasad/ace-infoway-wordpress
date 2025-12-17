export const formatDate = (dateString) => {
  if (!dateString) return 'Date not available';
  
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};