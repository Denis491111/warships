import axios, {AxiosResponse} from "axios";
import {ExtShip} from "@/infrastructure/ships/get-ships-list";
import {dataUrl} from "@/common/const";

export function getShip(id: string) {
    return axios.get(dataUrl).then((response: AxiosResponse) => {
        // Эта логика расположена здесь, т.к. данный функционал обычно реализуется на стороне BE, и когда она там появится, понадобится минимум доработок, а структура данных (объект вместо массива объектов) явно ошибочна
        return ((response.data || {}).data || {})[id] as ExtShip || null;
    });
}
