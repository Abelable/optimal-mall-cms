import { useEffect, useRef, useState } from "react";

export const toNumber = (value: unknown) =>
  isNaN(Number(value)) ? 0 : Number(value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    if (isVoid(result[key])) delete result[key];
  });
  return result;
};

export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) document.title = oldTitle;
    };
  }, [keepOnUnmount, oldTitle]);
};

export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [delay, value]);

  return debouncedValue;
};

export const getVideoDuration = async (file: File) =>
  new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const audio = new Audio(url);
    audio.addEventListener("loadedmetadata", () =>
      resolve(Math.round(audio.duration))
    );
  });

export const fileToBase64 = async (file: File) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.readAsDataURL(file);
  });

export const expressOptions = [
  { name: "中通快递", value: "ZTO" },
  { name: "圆通速递", value: "YTO" },
  { name: "韵达速递", value: "YD" },
  { name: "申通快递", value: "STO" },
  { name: "顺丰速运", value: "SF" },
  { name: "京东快递", value: "JD" },
  { name: "邮政快递包裹", value: "YZPY" },
  { name: "EMS", value: "EMS" },
  { name: "极兔速递", value: "JTSD" },
  { name: "德邦快递", value: "DBL" },
  { name: "丰网速运", value: "FWX" },
  { name: "百世快递", value: "HTKY" },
  { name: "优速快递", value: "UC" },
  { name: "众邮快递", value: "ZYE" },
  { name: "宅急送", value: "ZJS" },
];
