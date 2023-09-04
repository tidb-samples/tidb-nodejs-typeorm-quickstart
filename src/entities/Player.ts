import Decimal from "decimal.js";
import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, Index} from "typeorm"
import {DecimalTransformer} from "../transformers/DecimalTransformer";
import {Profile} from "./Profile";

@Entity({name: "players"})
export class Player {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 50})
    @Index("uk_players_on_name", {unique: true})
    name: string

    @Column({type: "decimal", transformer: new DecimalTransformer()})
    coins: Decimal

    @Column("int")
    goods: number

    @Column({name: "created_at", type: "datetime"})
    createdAt: Date

    @OneToOne(() => Profile, {cascade: true})
    @JoinColumn({ name: "profile_id", foreignKeyConstraintName: "fk_profiles_on_player_id" })
    profile: Profile | undefined

    constructor(name: string, coins: Decimal, goods: number) {
        this.name = name;
        this.coins = coins;
        this.goods = goods;
        this.createdAt = new Date();
    }

}
