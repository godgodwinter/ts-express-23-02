export const encode_base64 = (str: string): string => {
    return Buffer.from(str).toString('base64');
}
export const decode_base64 = (str: string): string => {
    return Buffer.from(str, 'base64').toString()
}