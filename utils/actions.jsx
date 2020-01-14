// @format
export const addSection = (to, from) => ({
  type: 'ADD_SECTION',
  target: to,
  section: from,
});

export const linkVertex = (to, from) => ({
  type: 'LINK_VERTEX',
  target: to,
  source: from,
});

export const unlinkVertex = (to, from) => ({
  type: 'UNLINK_VERTEX',
  target: to,
  source: from,
});
