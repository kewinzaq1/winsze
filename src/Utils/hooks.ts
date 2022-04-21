/* eslint-disable @typescript-eslint/no-explicit-any */
import { DocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const useLocalStorageState = (name: string, initValue: unknown) => {
  const getValueFromLocalStorage = window.localStorage.getItem(name);

  const [state, setState] = React.useState(
    getValueFromLocalStorage ? JSON.parse(getValueFromLocalStorage) : initValue
  );

  useEffect(() => {
    if (state) {
      window.localStorage.setItem(name, JSON.stringify(state));
    } else {
      window.localStorage.removeItem(name);
    }
  }, [name, state]);

  return [state, setState];
};

const useStatus = (initStatus?: string) => {
  const [status, setStatus] = useState<string>(initStatus ?? "");

  const isSuccess = status === "";
  const isError = status === "error";
  const isLoading = status === "loading";

  return { status, setStatus, isSuccess, isError, isLoading };
};

const useStream = (streamFn: unknown) => {
  const [streamData, setStreamData] = useState<any>();
  const { setStatus } = useStatus();

  useEffect(() => {
    if (typeof streamFn === "function") {
      const unsubscribe = streamFn(
        (querySnapshot: QuerySnapshot) => {
          const updatedData = querySnapshot.docs.map(
            (docSnapshot: DocumentSnapshot) => docSnapshot.data()
          );
          setStreamData(updatedData);
        },
        () => setStatus("error")
      );
      return unsubscribe;
    }
  }, [setStatus, streamFn]);

  return streamData;
};

export { useLocalStorageState, useStatus, useStream };
