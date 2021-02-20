export function base64_encode(value) {
    const encodedString = Buffer.from(value).toString('base64');
    return encodedString;
}