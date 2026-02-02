import { Column, Entity, JoinColumn, PrimaryColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { NeighborhoodEntity } from "../../neighborhoods/entity/neighborhoods.entity"
import { typeProperty } from "../../../../../domain/models/enums/property-type";

@Entity('properties')
export class PropertyEntity {
    @PrimaryColumn('uuid')
    id: string

    @Column('varchar', { length: 255 })
    address: string;

    @Column({
        type: 'enum',
        enum: typeProperty
    })
    type: typeProperty;

    @Column('int')
    rooms: number;

    @Column('decimal', { precision: 10, scale: 2, name: 'total_surface' })
    totalSurface: number;

    @Column('decimal', { precision: 10, scale: 2, name: 'covered_surface' })
    coveredSurface: number;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column('int', { name: 'construction_year' })
    constructionYear: number;

    @ManyToOne(() => NeighborhoodEntity, (neighborhood) => neighborhood.properties)
    @JoinColumn({ name: 'neighborhood_id' })
    neighborhood: NeighborhoodEntity

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @Column({ type: 'tsvector', select: false })
    search_vector: any;
}