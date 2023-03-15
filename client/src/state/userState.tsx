import { atom } from 'recoil';

const userState = atom({
  key: 'user',
  default: { id: '', firstName: '', lastName: '', userName: '' }
});

export { userState };
