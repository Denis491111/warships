export interface IShipDetail {
    name: string;
    description: string;
    preview: string;
    image: string;
    country: string;
    level: number;
    tags: Array<{name: string; link: string;}>
}
