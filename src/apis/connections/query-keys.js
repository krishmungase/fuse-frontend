export const connectionKeys = {
  all: ['connections'],
  lists: () => [...connectionKeys.all, 'list'],
}
