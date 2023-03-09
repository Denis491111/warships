import {ExtShip} from "@/infrastructure/ships/get-ships-list";
import i18n from "@/i18n";
import {ImagePrefixUrl} from "@/common/const";
import {IShipDetail} from "@/views/ship/types";

export function shipAdapter(ship: ExtShip): IShipDetail {
    const nameFromTopField = ship.name.replaceAll("_", " ");
    return {
        name: (ship.localization.mark as any)[i18n.global.locale] || ship.localization.mark.en || nameFromTopField,
        description: ((ship.localization.description as any)[i18n.global.locale] || ship.localization.description.en),
        preview: `${ImagePrefixUrl}${ship.icons.medium}`,
        image: `${ImagePrefixUrl}${ship.icons.large}`,
        country: ship.nation ? ship.nation[0].toLocaleUpperCase() + ship.nation.substring(1) : "",
        level: ship.level,
        tags: (ship.tags || []).map((item) => {
            return {
                name: item,
                link: `/tags/${item}`
            };
        })
    };
}
