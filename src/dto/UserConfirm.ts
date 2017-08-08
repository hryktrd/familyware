/*
*   ユーザー情報取得用DTO（承認情報付き）
*
 */

export class  UserConfirm {
    id: number;
    name: string;
    uuid: string;
    confirm: number;
}