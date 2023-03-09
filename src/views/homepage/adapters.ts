import {ExtShip} from "@/infrastructure/ships/get-ships-list";
import {IShipShort} from "@/views/homepage/types";
import i18n from "@/i18n";
import {ImagePrefixUrl} from "@/common/const";

export function adapterShipsList(list: Array<ExtShip>): Array<IShipShort> {
    return list.map((item: ExtShip) => {
        const desc = ((item.localization.description as any)[i18n.global.locale] || item.localization.description.en).replaceAll("&nbsp;", " ");
        const nameFromTopField = item.name.replaceAll("_", " ");
        return {
            link: `/ships/${item.id}`,
            name: (item.localization.mark as any)[i18n.global.locale] || item.localization.mark.en || nameFromTopField,
            image: `${ImagePrefixUrl}${item.icons.small}`,
            description: desc.length > 180 ? desc.slice(0,180) + "..." : desc,
            level: String(item.level) || ""
        };
    })
}
