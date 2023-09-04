import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity({name: "profiles"})
export class Profile {

    @PrimaryGeneratedColumn()
    id: number

    @Column("text")
    biography: string

    constructor(biography: string) {
        this.biography = biography;
    }

}
