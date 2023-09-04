import {Entity, Column, PrimaryColumn} from "typeorm"

@Entity({name: "profiles"})
export class Profile {

    @PrimaryColumn({name: "player_id"})
    playerId: number

    @Column("text")
    biography: string

    constructor(playerId: number, biography: string) {
        this.playerId = playerId;
        this.biography = biography;
    }

}
