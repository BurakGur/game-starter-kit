import {useRecoilCallback} from 'recoil';

const actions = {};

export default function RecoilActions() {
  actions.get = useRecoilCallback(
    ({snapshot}) =>
      atom => {
        return snapshot.getLoadable(atom).contents;
      },
    [],
  );

  actions.getType = useRecoilCallback(
    ({snapshot}) =>
      state => {
        return snapshot.getInfo_UNSTABLE(state).type;
      },
    [],
  );

  actions.getPromise = useRecoilCallback(
    ({snapshot}) =>
      atom => {
        return snapshot.getPromise(atom);
      },
    [],
  );

  actions.set = useRecoilCallback(
    ({transact_UNSTABLE}) =>
      (atom, value) => {
        transact_UNSTABLE(({set}) => set(atom, value));
      },
    [],
  );

  actions.reset = useRecoilCallback(({reset}) => reset, []);

  actions.refresh = useRecoilCallback(({refresh}) => refresh, []);

  return null;
}

export const getRecoil = atom => actions.get(atom);
export const getRecoilType = state => actions.getType(state);
export const getRecoilPromise = atom => actions.getPromise(atom);
export const setRecoil = (atom, value) => actions.set(atom, value);
export const resetRecoil = state => actions.reset(state);
export const refreshRecoil = selector => actions.refresh(selector);
