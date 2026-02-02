import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { PropertyEntity } from "../../properties/entity/property.entity";

@Entity('neighborhoods')
export class NeighborhoodEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'jsonb' })
    geometry: {
        type: string;
        coordinates: any;
    }

    @OneToMany(
        () => PropertyEntity,
        (property) => property.neighborhood
    )
    properties: PropertyEntity[]
}   