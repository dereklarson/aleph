// @format
export const addSection = (location, to, from) => ({
  type: 'ADD_SECTION',
  location: location,
  target: to,
  section: from,
});

export const linkVertex = (location, to, from) => ({
  type: 'LINK_VERTEX',
  location: location,
  target: to,
  source: from,
});

export const unlinkVertex = (location, to, from) => ({
  type: 'UNLINK_VERTEX',
  location: location,
  target: to,
  source: from,
});
