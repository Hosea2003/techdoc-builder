export type Project = {
    id:number;
    name:string;
    client:string;
    date:string;
    equipments?:Equipment[]
};

export type EquipmentType = "HVAC"|"LIGHT"|"SENSOR";
export const equipmentTypes:EquipmentType[] = ["HVAC", "LIGHT", "SENSOR"];

export type Equipment = {
    id:number;
    type:EquipmentType;
    room:string;
    model:string;
    quantity:number;
}