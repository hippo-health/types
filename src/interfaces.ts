// Shared in repos [webhippo, adminhippo, apihippo]
// v0.1.5

interface Item {
    // All things stored in DynamoDB are Items
    id: string;
    itemType: ItemType;
    createdAt: number;
    updatedAt: number;
  }
  
  interface Resource extends Item {
    // Things that make sense to version, iterate and update. More persistent.
    // A Resource is something consumed by the system and is based on user input
    version: number;
    entityName: string;
    description: string;
    itemType: ResourceType;
    active: boolean;
  }
  
  export enum ResourceType {
    Event = "event",
    Hospital = "hospital",
    MetricDefinition = "metric-definition",
    Stage = "stage",
    Track = "track",
    Ward = "ward"
  }
  
  export enum DataType {
    AdminUser = "admin-user",
    PatientUser = "patient-user",
    Journey = "journey",
    Metric = "metric"
  }
  
  export type ItemType = ResourceType | DataType;
  
  export type HippoResource = Event | Hospital | MetricDefinition | Stage | Track | Ward;
  
  export type HippoItem = HippoResource | AdminUser | PatientUser | Metric | Journey;
  
  export interface Address {
    street: string;
    state: string;
    postcode: string;
    country: string;
  }
  
  export interface Hospital extends Resource {
    itemType: ResourceType.Hospital;
    trackIds: string[];
    wardIds: string[];
    eventIds: string[];
    stageIds: string[];
    address: Address;
    metricDefinitionIds: string[];
    hoursOfOperation: {
      daysOfWeek: string[];
      allDay: boolean;
      openingTime?: string;
      closingTime?: string;
    };
    contact: {
      website?: string;
      telephone?: string;
      email?: string;
    };
  }
  
  export interface Ward extends Resource {
    itemType: ResourceType.Ward;
    capacity: number;
  }
  
  export interface Track extends Resource {
    itemType: ResourceType.Track;
    metricDefinitionIds: string[];
    stageIds: string[];
  }
  
  export interface Stage extends Resource {
    itemType: ResourceType.Stage;
    eventIds: string[];
    metricDefinitionIds: string[];
    wardId: string | null;
    summary: string;
    information: any[];
  }
  
  export interface Event extends Resource {
    itemType: ResourceType.Event;
    metricDefinitionIds: string[]
    eventType: "treatment" | "procedure" | "social" | "other";
  }
  
  export interface MetricDefinition extends Resource {
    // A hospital defines these in order to collect information on the patients state
    // Track/Stage/Event types can have attached metrics
    // A metric definition should be attached to a specific hospital
    itemType: ResourceType.MetricDefinition;
    hospitalId: string;
    displayText: string;
    minValue: number;
    maxValue: number;
    hasText: boolean
  }
  
  interface User extends Item {
    pwHash: string;
    firstName: string;
    lastName: string;
    email: string;
    lastSeen: number;
  }
  
  export interface AdminUser extends User {
    itemType: DataType.AdminUser;
    hospitalId: string;
  }
  
  export interface PatientUser extends User {
    itemType: DataType.PatientUser;
    journeyIds: string[];
    lastJourneyId: string | null;
    currentWardId: string | null;
    address: Address | null;
    age: number;
    esl: boolean;
    gender: string | null;
  }
  
  export interface Journey extends Item {
    itemType: DataType.Journey;
    hospitalId: string;
    userId: string;
    trackId: string;
    currentStageId: string;
    nextStageId: string | null;
    lastEventId: string | null;
    completedEventIds: string[];
    completedAt: number | null;
  }
  
  export interface Metric extends Item {
    itemType: DataType.Metric;
    metricDefinitionId: string;
    journeyId: string;
    resourceId: string;
    forResourceType: ResourceType.Stage | ResourceType.Track | ResourceType.Event;
    value: number;
    text: string | null;
  }
  
  export interface HospitalResources {
    hospital: Hospital;
    tracks: Track[];
    wards: Ward[];
    stages: Stage[];
    events: Event[];
    metricDefinitions: MetricDefinition[];
  }
  
  // For use when integrating with hippoanalytics
  export interface AnalyticsFeedback {
    feedbackID: string;
    patientID: string;
    eventID: string;
    stageID: number;
    age: number;
    gender: string;
    esl: number;
    condition: number;
    ward: number;
    wardName: string;
    stageName: string;
    hospital: number;
    date: string;
    type: "Actual" | "Target";
    kpi: string;
    kpiValue: number;
    comment: string;
  }
  