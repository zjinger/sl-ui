/**
 * 度数转换 xx°xx′xx″
 * @param {*} value
 * @returns
 */

import * as L from 'leaflet';
/**
 * 度数转换带有类型 N E S W
 * @param lat 
 * @param lng 
 * @param sDecimal 秒的小数点位数，默认两位
 * @returns latlngStr: 度分秒格式 38°23′45″N 118°23′42″E, 
 * latlngStr2: 度分格式,例如 38°23.33′N 118°23.44′E
 */
export const transformPosUnit = (lat: number, lng: number, sDecimal: number = 2): { lat: { d: number, m: number, s: number }, lng: { d: number, m: number, s: number }, latStr: string, lngStr: string, latlngStr: string, latlngStr2: string } => {
  const latUnit = lat < 0 ? 'S' : 'N';
  const lngUnit = lng < 0 ? 'W' : 'E';
  const latObj = latlngToDMS(Number(Math.abs(lat)).toFixed(8), sDecimal, 2)!;
  const lngObj = latlngToDMS(Number(Math.abs(lng)).toFixed(8), sDecimal, 2)!;
  return {
    lat: latObj,
    lng: lngObj,
    latStr: `${latObj.d}°${latObj.m}′${latObj.s}″${latUnit}`,
    lngStr: `${lngObj.d}°${lngObj.m}′${lngObj.s}″${lngUnit}`,
    latlngStr: `${latObj.d}°${latObj.m}′${latObj.s}″${latUnit} ${lngObj.d}°${lngObj.m}′${lngObj.s}″${lngUnit}`,
    latlngStr2: `${latObj.d}°${latObj.m2}′${latUnit} ${lngObj.d}°${lngObj.m2}′${lngUnit}`,
  }
};
/**
 * 废弃
 * @param latlng 
 * @param sDecimal 
 * @param mDecimal 
 * @returns 
 */
export const transFormPosToNumber = (
  latlng: string | number, sDecimal = 4, mDecimal = 4
): { d: number; m: number; s: number, m2: number } => {
  let d = 0, m = 0, s = 0, m2 = 0
  // 第一次分离出度位整数，分（可能带有小数）
  let [integerN, decimalN] = calculateUnit(latlng)
  d = integerN
  // 第二次分离出分位整数，秒（可能带有小数）
  if (decimalN) {
    m2 = parseFloat(Number(decimalN).toFixed(mDecimal))
    let [integerN2, decimalN2] = calculateUnit(decimalN)
    m = integerN2
    s = parseFloat(Number(decimalN2).toFixed(sDecimal))
  }
  return { d, m, s, m2 }
};

/**
 * 
/**
 * 带有格式的坐标字符串转为度分秒
 * 例1： "22°27′33.3497″N" 
 * 例2： "115°2′1.3989″E"
 * @param str 
 *  @returns 
 */
export const latlngWithFormatToDMS = (str: string) => {
  const len = str.length
  const unit = str[len - 1]
  const latlng = str.substring(0, len - 1)
  const [d, msStr] = latlng.split('°')
  const [m, sStr] = msStr.split('′')
  const [s] = sStr.split('″')
  return { d: parseInt(d), m: parseInt(m), s: parseFloat(s), type: unit }
}

/**
 * 坐标转转为度分秒
 * @param latlng 38.34543221N  117.23424442E
 * @param sDecimal 保留的小数点位数
 * @param mDecimal 保留的小数点位数
 * @returns d：分 m 度 s 秒 m2：返回带有小数的分
 */
export const latlngToDMS = (
  latlng: string | number, sDecimal = 4, mDecimal = 4
): { d: number; m: number; s: number, m2: number } => {
  let d = 0, m = 0, s = 0, m2 = 0
  // 第一次分离出度位整数，分（可能带有小数）
  let [integerN, decimalN] = calculateUnit(latlng)
  d = integerN
  // 第二次分离出分位整数，秒（可能带有小数）
  if (decimalN) {
    m2 = parseFloat(Number(decimalN).toFixed(mDecimal))
    let [integerN2, decimalN2] = calculateUnit(decimalN)
    m = integerN2
    s = parseFloat(Number(decimalN2).toFixed(sDecimal))
  }
  return { d, m, s, m2 }
};


/**
 * 分离整数和小数
 * 如果使用 % （取余）的算法，会多导致一次精度的损失
 * L.latlng 获取的的坐标为小数位 8 位
 * 例如：38.34543221N  117.23424442E
 * 通过结构赋值，完整分离整数位和小数位
 * [a,b] = '38.34543221'.split(.)
 * b / 10 ** 8 * 60 (进一位)
 * 
 * @param str 
 * @returns 
 */
const calculateUnit = (str: string | number): [a: number, b: number] => {
  if (typeof str === 'number') {
    str = str + '';
  }
  let integerNum = 0, decimal = 0
  const [a, b] = str.split('.') // 避免精度损失，完整获取到了小数
  integerNum = parseFloat(a)
  if (b !== undefined) {
    const bNum = parseFloat(b)
    if (bNum) { // 小数位不为0
      const len = b.length // 数字的长度
      const power = 10 ** len // 解构时 小数点位数需要处理
      decimal = bNum / power * 60
    }
  }
  return [integerNum, decimal]
}


/**
 * 度分秒转换为坐标值
 * @param d
 * @param m
 * @param s
 */
export const DMSToLatlng = (
  d: number,
  m: number,
  s: number,
  decimals = 5
): number => {
  return parseFloat(Number(d + m / 60 + s / 3600).toFixed(decimals));
};

/**
 * 解析坐标字符串转为数值
 * @param d
 * @param m
 * @param s
 */
export const transCooordinateToPos = (coordinate: string) => {
  const ds = coordinate.split('°');
  const ms = ds[1].split('′');
  const ss = ms[1].split('″');
  return DMSToLatlng(
    parseInt(ds[0]),
    parseInt(ms[0]),
    parseFloat(ss[0])
  );
};

/**
 *
 * 根据距离计算放大级别
 * @param {number} distance
 * @return {*}
 */
export const computedZoomByDistance = (distance: number) => {
  let zoom = [
    50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 25000, 50000, 100000,
    200000, 500000, 1000000, 2000000,
  ];
  for (let i = 0, zoomLen = zoom.length; i < zoomLen; i++) {
    if (zoom[i] - distance > 0) {
      return 18 - i + 3; //之所以会多3，是因为地图范围常常是比例尺距离的10倍以上。所以级别会增加3。
    }
  }
  return 8;
};
/**
 *
 * 获取放大级别
 * @param {L.LatLng} minLatlng
 * @param {L.LatLng} maxLatlng
 * @return {*}
 */
const computedZoom = (minLatlng: L.LatLng, maxLatlng: L.LatLng) => {
  let distance = parseFloat(minLatlng.distanceTo(maxLatlng).toFixed(1));
  return computedZoomByDistance(distance);
};

/**
 * 计算多边心的放大级别和中心点
 * @params  latlngs : 坐标点集合
 * @returns {zoom:number,center:L.Latlng} 放大级别和中心点
 */
export const computedCenterZoom = (latlngs: Array<L.LatLng>) => {
  let maxLng = latlngs[0].lng;
  let minLng = latlngs[0].lng;
  let maxLat = latlngs[0].lat;
  let minLat = latlngs[0].lat;
  let res;
  for (let i = latlngs.length - 1; i >= 0; i--) {
    res = latlngs[i];
    if (res.lng > maxLng) maxLng = res.lng;
    if (res.lng < minLng) minLng = res.lng;
    if (res.lat > maxLat) maxLat = res.lat;
    if (res.lat < minLat) minLat = res.lat;
  }
  const cenLng = (maxLng + minLng) / 2;
  const cenLat = (maxLat + minLat) / 2;
  const zoom = computedZoom(L.latLng(minLat, minLng), L.latLng(maxLat, maxLng));
  return { zoom, center: L.latLng(cenLat, cenLng) };
};
