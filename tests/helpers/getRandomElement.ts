export default function getRandomElement(arr: any[]) {
    const random = Math.floor(Math.random() * arr.length);
    return arr[random];
}
