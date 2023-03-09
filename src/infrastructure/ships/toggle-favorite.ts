import {keyFavorite} from "@/common/const";

export function toggleFavorite(id: string) {
    // Эта логика расположена здесь, т.к. данный функционал обычно реализуется на стороне BE, и когда она там появится, понадобится минимум доработок
    let currentFavorite = localStorage.getItem(keyFavorite) ? JSON.parse(localStorage.getItem(keyFavorite) as string) : [];
    if(currentFavorite.includes(id)) {
        currentFavorite.splice(currentFavorite.indexOf(id), 1);
    } else {
        currentFavorite.push(id);
    }
    localStorage.setItem(keyFavorite, JSON.stringify(currentFavorite));
}
