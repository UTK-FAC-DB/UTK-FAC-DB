export interface CremationInventory {
    id: string;
    Cremation_DBID: string;
    UTID: string;
    DateReceived: Date;
    ContactedBy: string;
    ContactFacility: string;
    ContactDate: Date;
    DonatedBy: string;
    Relationship: string;
    TotalWeight: number;
    TotalWeightUnit: string;
    LabWeight: number;
    InventoryWeightUnit: string;
    CurrentLabWeight: number;
    CurrentLabWeightUnit: string;	
    RemovedLabWeight: number;
    RemovedWeightUnit: string;
    CrematedRemainsProcess: string;
    ProstheticsRemoved: string;
    TagPlaced_By: string;
    TagPlaced_Date: Date;
    ReleasedFromDept_By: string;
    ReleasedFromDept_Date: Date;
    ReceivedIntoCollection_By: string;
    ReceivedIntoCollection_date: Date;
}