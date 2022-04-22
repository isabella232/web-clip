import { useEffect, useState } from 'react';

import {
  Options,
  save as saveOptions,
  load as loadOptions,
} from './optionsStorageApi';

interface AsyncLoadingState<T> {
  loading: boolean;
  value?: T;
}

export const useOptions = () => {
  const [{ loading, value }, setState] = useState<AsyncLoadingState<Options>>({
    loading: true,
    value: null,
  });
  const [saved, setSaved] = useState<boolean>(false);

  useEffect(() => {
    loadOptions().then((options) => {
      setState({
        loading: false,
        value: options,
      });
    });
  }, []);
  const setProviderUrl = (url: string) => {
    setState((state) => ({
      ...state,
      value: {
        ...state.value,
        providerUrl: url,
      },
    }));
  };

  const save = () => saveOptions(value).then(() => setSaved(true));

  return {
    loading,
    ...value,
    setProviderUrl,
    save,
    saved,
  };
};