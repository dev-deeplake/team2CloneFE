import CryptoJS from "crypto-js";

// AES: 양방향 암호화 방식 : 암호화, 복화화에 동일한 KEY값 사용
// 미국 연방 정보 처리 표준(FIPS).
// 15개의 경쟁, 5년 간의 과정을 거쳐 선정.
// AES-128, AES-192 및 AES-256을 지원.
// 전달한 키의 크기에 따라 변형할 수 있다.
// => AES-128 : 16자리 Key, AES-256 : 32자리 Key

export const cryptoKey = process.env.REACT_APP_CRYPTO_KEY;

export const encrypt = (data, key) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
};

export const decrypt = (text, key) => {
  try {
    const bytes = CryptoJS.AES.decrypt(text, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8)).email;
  } catch (err) {
    console.log(err);
  }
};
