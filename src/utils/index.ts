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
  { name: "东骏快捷物流", value: "DNWL" },
  { name: "FEDEX联邦（国内）", value: "FEDEX" },
  { name: "日日顺物流", value: "RRS" },
  { name: "安能快运/物流", value: "ANEKY" },
  { name: "中通快运", value: "ZTOKY" },
  { name: "安能快递", value: "ANE" },
  { name: "顺心捷达", value: "SX" },
  { name: "百世快运", value: "BTWL" },
  { name: "信丰物流", value: "XFEX" },
  { name: "壹米滴答", value: "YMDD" },
  { name: "京广速递", value: "JGSD" },
  { name: "德邦快运/德邦物流", value: "DBLKY" },
  { name: "跨越速运", value: "KYSY" },
  { name: "京东快运", value: "JDKY" },
  { name: "韵达快运", value: "YDKY" },
  { name: "特急送", value: "TJS" },
  { name: "UPS", value: "UPS" },
  { name: "顺丰快运", value: "SHUNFENGKUAIYUN" },
  { name: "源安达快递", value: "YAD" },
  { name: "安得物流", value: "ANNTO" },
  { name: "联昊通速递", value: "LHT" },
  { name: "耀飞快递", value: "YF" },
  { name: "USPS美国邮政", value: "USPS" },
  { name: "DHL-中国件", value: "DHL" },
  { name: "速派快递", value: "FASTGO" },
  { name: "汇森速运", value: "HSSY" },
  { name: "加运美", value: "JYM" },
  { name: "中通国际", value: "ZTOGLOBAL" },
  { name: "天地华宇", value: "HOAU" },
  { name: "明通国际快递", value: "TNJEX" },
  { name: "DPD(UK)", value: "DPDUK" },
  { name: "D速物流", value: "DSWL" },
  { name: "圆通快运", value: "YUANTONGKUAIYUN" },
  { name: "EWE", value: "EWE" },
  { name: "盛辉物流", value: "SHWL" },
  { name: "云聚物流", value: "YJWL" },
  { name: "飞洋快递", value: "ZY_FY" },
  { name: "宇鑫物流", value: "YXWL" },
  { name: "平安达腾飞快递", value: "PADTF" },
  { name: "优邦国际速运", value: "UBONEX" },
  { name: "中铁飞豹", value: "ZHONGTIEWULIU" },
  { name: "宏递快运", value: "HDWL" },
  { name: "疯狂快递", value: "CRAZY" },
  { name: "速腾快递", value: "STWL" },
  { name: "长通物流", value: "CTWL" },
  { name: "泛捷快递", value: "PANEX" },
  { name: "龙邦快递", value: "LB" },
  { name: "百腾物流", value: "BETWL" },
  { name: "澳邮中国快运AuExpress", value: "AUEXPRESS" },
  { name: "卓志速运", value: "ESDEX" },
  { name: "盛丰物流", value: "SFWL" },
  { name: "日本邮政", value: "JP" },
  { name: "中远快运", value: "ZY100" },
  { name: "徽托邦物流", value: "HTB56" },
  { name: "洋包裹", value: "YBG" },
  { name: "中铁物流", value: "ZTWL" },
  { name: "中环国际快递", value: "ZHONGHUAN" },
  { name: "鸿泰物流", value: "HTWL" },
  { name: "百城通物流", value: "BCTWL" },
  { name: "苏宁物流", value: "SNWL" },
  { name: "运联科技", value: "TU" },
  { name: "特宝专送", value: "TBZS" },
  { name: "富腾达", value: "FTD" },
  { name: "九曳供应链", value: "JIUYE" },
  { name: "畅顺通达", value: "CSTD" },
  { name: "海信物流", value: "HISENSE" },
  { name: "澳德物流", value: "AUODEXPRESS" },
  { name: "国际邮政包裹", value: "GJYZBG" },
  { name: "一路发物流", value: "YLFWL" },
  { name: "武汉晓毕物流", value: "WHXBWL" },
  { name: "余氏东风", value: "YSDF" },
  { name: "捷安达", value: "JAD" },
  { name: "澳货通", value: "AUEX" },
  { name: "速必达物流", value: "SUBIDA" },
  { name: "佳旺达物流", value: "SYJWDX" },
  { name: "RoyalMail", value: "ROYALMAIL" },
  { name: "方舟国际速递", value: "FZGJ" },
  { name: "新杰物流", value: "XJ" },
  { name: "TNT国际快递", value: "TNT" },
  { name: "速递中国", value: "SENDCN" },
  { name: "EMS包裹", value: "EMSBG" },
  { name: "大田物流", value: "DTWL" },
  { name: "递四方速递", value: "D4PX" },
  { name: "大韩通运", value: "CJKOREAEXPRESS" },
  { name: "景光物流", value: "JGWL" },
  { name: "长江国际速递", value: "CJEXPRESS" },
  { name: "城市映急", value: "CITY56" },
  { name: "诚和通", value: "CHT361" },
  { name: "一速递", value: "ONEEXPRESS" },
  { name: "迅达速递", value: "XDEXPRESS" },
  { name: "笨鸟国际", value: "BN" },
  { name: "新顺丰国际速递", value: "NSF" },
  { name: "韩国邮政", value: "EPOST" },
  { name: "聚盟共建", value: "JUMSTC" },
  { name: "Yamato宅急便", value: "TAQBINJP" },
  { name: "转运四方", value: "A4PX" },
  { name: "德坤", value: "DEKUN" },
  { name: "COE东方快递", value: "COE" },
  { name: "达发物流", value: "DFWL" },
  { name: "铁中快运", value: "TZKY" },
  { name: "联运通物流", value: "LYT" },
  { name: "DHL全球货运", value: "DHLGLOBALLOGISTICS" },
  { name: "瑞典邮政", value: "SWEDENPOST" },
  { name: "锋鸟物流", value: "BEEBIRD" },
  { name: "春风物流", value: "CFWL" },
  { name: "佳怡物流", value: "JYWL" },
  { name: "西邮寄", value: "XYJ" },
  { name: "领送送", value: "LINGSONG" },
  { name: "四季安物流", value: "SJA56" },
  { name: "微特派", value: "WTP" },
  { name: "豪翔物流", value: "HAOXIANGWULIU" },
  { name: "新竹物流HCT", value: "HCT" },
  { name: "速邮达物流", value: "SUYD56" },
  { name: "优拜物流", value: "YBWL" },
  { name: "中远e环球", value: "COSCO" },
  { name: "时安达速递", value: "GOEX" },
  { name: "澳大利亚邮政", value: "IADLYYZ" },
  { name: "联昊通", value: "LHTEX" },
  { name: "新易泰", value: "LNET" },
  { name: "万家物流", value: "WJWL" },
  { name: "安迅物流", value: "AX" },
  { name: "CCES/国通快递", value: "CCES" },
  { name: "DPD", value: "DPD" },
  { name: "全家快递", value: "FAMIPORT" },
  { name: "汇捷物流", value: "HJWL" },
  { name: "泰联物流", value: "HNTLWL" },
  { name: "环球速运", value: "HQSY" },
  { name: "J&TExpress", value: "JTEXPRESS" },
  { name: "科捷物流", value: "KEJIE" },
  { name: "科紫物流", value: "KZWL" },
  { name: "民航快递", value: "MHKD" },
  { name: "同城快寄", value: "SHPOST" },
  { name: "新加坡邮政", value: "SINGAPOREPOST" },
  { name: "新加坡特快专递", value: "SINGAPORESPEEDPOST" },
  { name: "三态速递", value: "STSD" },
  { name: "UPS-全球件", value: "UPSEN" },
  { name: "万家康", value: "WJK" },
  { name: "迅驰物流", value: "XCWL" },
  { name: "贝海国际速递", value: "XLOBO" },
  { name: "优优速递", value: "YYSD" },
  { name: "优速快递", value: "UC" },
  { name: "众邮快递", value: "ZYE" },
  { name: "宅急送", value: "ZJS" },
];
