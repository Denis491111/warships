import axios, {AxiosResponse} from "axios";
import i18n from "@/i18n";
import {dataUrl, keyFavorite} from "@/common/const";

export enum IGetShipsListSortingEnum {
    POPULAR = 1,
    NAME = 2,
    LEVEL= 3
}

export interface IGetShipsListPayload {
    query?: string;
    limit: number;
    offset: number;
    tagname?: string;
    sorting_field: IGetShipsListSortingEnum;
    sorting_desc: boolean;
    is_only_favorite?: boolean;
}

interface ExtShipLocalizationItem {
    cs: string;
    de: string;
    en: string;
    es: string;
    es_mx: string;
    fr: string;
    it: string;
    ja: string;
    ko: string;
    nl: string;
    pl: string;
    pt_br: string;
    ru: string;
    th: string;
    tr: string;
    uk: string;
    zh_cn: string;
    zh_sg: string;
    zh_tw: string;
}

export interface ExtShip {
    id: string;
    level: number;
    name: string;
    nation: string;
    tags: Array<string>;
    icons: {
        contour: string;
        contour_alive: string;
        contour_dead: string;
        default: string;
        large: string;
        local_contour: string;
        local_contour_alive: string;
        local_contour_dead: string;
        local_small: string;
        medium: string;
        small: string;
    };
    localization: {
        description: ExtShipLocalizationItem;
        mark: ExtShipLocalizationItem;
        shortmark: ExtShipLocalizationItem;
    };
}

export interface ExtShipsListResponse {
    items: Array<ExtShip>;
    count: number;
};

export function getShipsList(payload: IGetShipsListPayload) {
    return axios.get(dataUrl).then((response: AxiosResponse) => {
        // Эта логика расположена здесь, т.к. данный функционал обычно реализуется на стороне BE, и когда она там появится, понадобится минимум доработок, а структура данных (объект вместо массива объектов) явно ошибочна
        let result: Array<ExtShip> = Object.keys(((response || {}).data || {}).data).map((item: any) => {
            return {...((response || {}).data || {}).data[item], id: item};
        });

        // Высчитываем count (соответствует SELECT COUNT при формировании данных для пагинации на стороне BE
        let count = result.length;

        // Фильтруем
        if(!!payload.query) {
            result = result.filter((item: ExtShip) => {
                return item.name.toLocaleLowerCase().includes((payload.query as string).toLocaleLowerCase()) ||
                    (item.localization.mark as any)[i18n.global.locale].toLocaleLowerCase().includes((payload.query as string).toLocaleLowerCase());
            });
            count = result.length;
        }
        if(!!payload.tagname) {
            result = result.filter((item: ExtShip) => {
                return item.tags.includes(payload.tagname as string);
            });
            count = result.length;
        }
        const currentFavoriteList = localStorage.getItem(keyFavorite) ? JSON.parse(localStorage.getItem(keyFavorite) as string) : [];
        if(!!payload.is_only_favorite && !!currentFavoriteList) {
            result = result.filter((item: ExtShip) => {
                return currentFavoriteList.includes(item.id);
            });
            count = result.length;
        }

        // Сортируем результат
        if(payload.sorting_field === IGetShipsListSortingEnum.LEVEL) {
            result = result.sort((a: ExtShip, b: ExtShip) => {
                return a.level - b.level;
            })
        }
        if(payload.sorting_field === IGetShipsListSortingEnum.NAME) {
            result = result.sort((a: ExtShip, b: ExtShip) => {
                const nameA = (a.localization.mark as any)[i18n.global.locale] || a.name;
                const nameB = (b.localization.mark as any)[i18n.global.locale] || b.name;
                return nameA > nameB ? 1 : -1;
            })
        }
        if(payload.sorting_desc) {
            result = result.reverse();
        }

        // Пагинируем
        result = result.slice(payload.offset || 0, payload.offset + payload.limit);

        // Возвращаем результат
        const summary = {
            items: result,
            count: count

        };
        return summary;
    });
}
