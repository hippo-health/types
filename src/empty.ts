import {
    AdminUser,
    DataType,
    Event,
    HippoItem,
    Hospital,
    ItemType,
    Journey,
    Metric,
    MetricDefinition,
    PatientUser,
    ResourceType,
    Stage,
    Track,
    Ward
  } from "./interfaces";
  
  const emptyItem = {
    id: "",
    createdAt: 0,
    updatedAt: 0
  };
  
  const emptyResource = {
    ...emptyItem,
    version: 1,
    entityName: "",
    description: "",
    active: false
  };
  
  const emptyHospital: Hospital = {
    ...emptyResource,
    itemType: ResourceType.Hospital,
    wardIds: [],
    eventIds: [],
    metricDefinitionIds: [],
    stageIds: [],
    trackIds: [],
    address: {
      state: "",
      postcode: "",
      street: "",
      country: ""
    },
    contact: {},
    hoursOfOperation: { allDay: false, daysOfWeek: [] }
  };
  
  const emptyWard: Ward = {
    ...emptyResource,
    itemType: ResourceType.Ward,
    capacity: 0
  };
  
  const emptyTrack: Track = {
    ...emptyResource,
    itemType: ResourceType.Track,
    metricDefinitionIds: [],
    stageIds: []
  };
  
  const emptyStage: Stage = {
    ...emptyResource,
    itemType: ResourceType.Stage,
    metricDefinitionIds: [],
    eventIds: [],
    wardId: null,
    summary: "",
    information: []
  };
  
  const emptyEvent: Event = {
    ...emptyResource,
    itemType: ResourceType.Event,
    metricDefinitionIds: [],
    eventType: "other"
  };
  
  const emptyMetricDefinition: MetricDefinition = {
    ...emptyResource,
    itemType: ResourceType.MetricDefinition,
    hospitalId: "",
    displayText: "",
    minValue: 0,
    maxValue: 5,
    hasText: false
  };
  
  const emptyJourney: Journey = {
    ...emptyItem,
    itemType: DataType.Journey,
    hospitalId: "",
    currentStageId: "",
    trackId: "",
    nextStageId: null,
    lastEventId: null,
    completedEventIds: [],
    completedAt: null,
    userId: ""
  };
  
  const emptyMetric: Metric = {
    ...emptyItem,
    itemType: DataType.Metric,
    metricDefinitionId: "",
    journeyId: "",
    resourceId: "",
    forResourceType: ResourceType.Stage,
    value: 0,
    text: null
  };
  
  const emptyAdminUser: AdminUser = {
    ...emptyItem,
    itemType: DataType.AdminUser,
    hospitalId: "",
    pwHash: "",
    firstName: "",
    lastName: "",
    email: "",
    lastSeen: 0
  };
  
  const emptyPatientUser: PatientUser = {
    ...emptyItem,
    itemType: DataType.PatientUser,
    journeyIds: [],
    lastJourneyId: null,
    currentWardId: null,
    address: null,
    pwHash: "",
    firstName: "",
    lastName: "",
    email: "",
    age: 0,
    esl: false,
    gender: null,
    lastSeen: 0
  };
  
  const emptyItems = {
    [DataType.AdminUser]: emptyAdminUser,
    [DataType.PatientUser]: emptyPatientUser,
    [DataType.Metric]: emptyMetric,
    [DataType.Journey]: emptyJourney,
    [ResourceType.Event]: emptyEvent,
    [ResourceType.Hospital]: emptyHospital,
    [ResourceType.MetricDefinition]: emptyMetricDefinition,
    [ResourceType.Stage]: emptyStage,
    [ResourceType.Track]: emptyTrack,
    [ResourceType.Ward]: emptyWard
  };
  
  function getEmptyItem(type: ItemType, id?: string): HippoItem {
    return {
      ...emptyItems[type],
      id: id ? id : ""
    };
  }
  
  export const getEmpty = (type: ItemType, id?: string) => {
    if (id) {
      return getEmptyItem(type, id);
    } else {
      return getEmptyItem(type);
    }
  };
  